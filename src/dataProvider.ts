import { stringify } from "query-string";
import { fetchUtils, DataProvider } from "ra-core";

export default (apiUrl, httpClient = fetchUtils.fetchJson): DataProvider => ({
  getList: async (resource, params) => {
    const { page, perPage } = params.pagination || {};
    const { field, order } = params.sort || {};

    const query = {
      ...fetchUtils.flattenObject(params.filter),
      order_by: (order == "ASC" ? "+" : "-") + field,
      page: page ? page : undefined,
      size: perPage ? perPage : undefined,
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;

    const { json } = await httpClient(url, {
      signal: params?.signal,
    });
    // if (!headers.has("x-total-count")) {
    //   throw new Error(
    //     "The X-Total-Count header is missing in the HTTP Response. The jsonServer Data Provider expects responses for lists of resources to contain this header with the total number of results to build the pagination. If you are using CORS, did you declare X-Total-Count in the Access-Control-Expose-Headers header?",
    //   );
    // }
    // const totalString = headers.get("x-total-count")!.split("/").pop();
    // if (totalString == null) {
    //   throw new Error(
    //     "The X-Total-Count header is invalid in the HTTP Response.",
    //   );
    // }
    return { data: json.items, total: json.total };
  },

  getOne: async (resource, params) => {
    let url = `${apiUrl}/${resource}/${params.id}`;
    if (params?.meta?.embed) {
      url += `?_embed=${params.meta.embed}`;
    }
    const { json } = await httpClient(url, { signal: params?.signal });
    return { data: json };
  },

  getMany: async (resource, params) => {
    const query = {
      id__in: params.ids.join(","),
      _embed: params?.meta?.embed,
    };

    const url = `${apiUrl}/${resource}?${stringify(query)}`;
    const { json } = await httpClient(url, { signal: params?.signal });
    return { data: json.items };
  },

  getManyReference: async (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    var flattenParamFilters = fetchUtils.flattenObject(params.filter);

    flattenParamFilters = Object.fromEntries(
      Object.entries(flattenParamFilters).map(([key, value]) => {
        if (typeof (value == "list")) {
          return [key, value.join(",")];
        }

        return [key, value];
      }),
    );

    const query = {
      ...flattenParamFilters,
      [params.target]: params.id,
      order_by: (order == "ASC" ? "+" : "-") + field,
      page: page ? page : undefined,
      size: perPage ? perPage : undefined,
      _embed: params?.meta?.embed,
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;

    const { json } = await httpClient(url, {
      signal: params?.signal,
    });

    return { data: json.items, total: json.total };
  },

  update: async (resource, params) => {
    const { json } = await httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: "PUT",
      body: JSON.stringify(params.data),
    });
    return { data: json };
  },

  // json-server doesn't handle filters on UPDATE route, so we fallback to calling UPDATE n times instead
  updateMany: async (resource, params) => {
    const responses = await Promise.all(
      params.ids.map((id) =>
        httpClient(`${apiUrl}/${resource}/${id}`, {
          method: "PUT",
          body: JSON.stringify(params.data),
        }),
      ),
    );
    return { data: responses.map(({ json }) => json.id) };
  },

  create: async (resource, params) => {
    const { json } = await httpClient(`${apiUrl}/${resource}`, {
      method: "POST",
      body: JSON.stringify(params.data),
    });
    return { data: { ...params.data, ...json } as any };
  },

  delete: async (resource, params) => {
    const { json } = await httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: "DELETE",
    });
    return { data: json };
  },

  // json-server doesn't handle filters on DELETE route, so we fallback to calling DELETE n times instead
  deleteMany: async (resource, params) => {
    const responses = await Promise.all(
      params.ids.map((id) =>
        httpClient(`${apiUrl}/${resource}/${id}`, {
          method: "DELETE",
        }),
      ),
    );
    return { data: responses.map(({ json }) => json.id) };
  },
  customFetch: async ({ method = "GET", url, params = {}, headers = {} }) => {
    const requestHeaders = new Headers({
      Accept: "application/json",
      ...headers,
    });

    const response = await httpClient(`${apiUrl}${url}`, {
      method,
      headers: requestHeaders,
      body: method !== "GET" ? JSON.stringify(params) : undefined,
    });

    return response;
  },
});
