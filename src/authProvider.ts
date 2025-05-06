import { AuthProvider } from "react-admin";

const apiUrl = import.meta.env.VITE_API_URL;

const authProvider: AuthProvider = {
  login: ({ username, password }) => {
    const formData = new URLSearchParams();
    formData.append("grant_type", "password");
    formData.append("username", username);
    formData.append("password", password);
    const request = new Request(`${apiUrl}/token`, {
      method: "POST",
      body: formData.toString(),
      headers: new Headers({
        "Content-Type": "application/x-www-form-urlencoded",
      }),
    });

    return fetch(request)
      .then((response) => {
        if (response.status < 200 || response.status >= 300) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((auth) => {
        localStorage.setItem("auth", JSON.stringify(auth));
      })
      .catch(() => {
        throw new Error("Network error");
      });

    // return Promise.resolve();
  },
  logout: () => {
    localStorage.removeItem("auth");
    return Promise.resolve();
  },
  checkAuth: () =>
    localStorage.getItem("auth") ? Promise.resolve() : Promise.reject(),
  checkError: (error) => {
    const status = error.status;
    if (status === 401 || status === 403) {
      localStorage.removeItem("auth");
      return Promise.reject();
    }
    // other error code (404, 500, etc): no need to log out
    return Promise.resolve();
  },
  getIdentity: async () => {
    console.log("HERE GETIDENTITY");

    const url = `${apiUrl}/me`;
    const { access_token } = JSON.parse(localStorage.getItem("auth"));

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    console.log(response);

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const json_data = await response.json();
    return { fullName: json_data.full_name, id: json_data.id };
  },
  getPermissions: () => Promise.resolve(""),
};

export default authProvider;
