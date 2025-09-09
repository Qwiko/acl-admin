import { fetchUtils } from "ra-core";
import { Admin, Resource } from 'react-admin';
import { Route } from 'react-router-dom';
import { Layout } from './Layout';
import authProvider from './authProvider';
import dataProvider from './dataProvider';

import deployers from './deployers';
import deployments from './deployments';
import dynamic_policies from './dynamic_policies';
import networks from './networks';
import policies from './policies';
import revisions from './revisions';
import services from './services';
import targets from './targets';
import tests from './tests';

import { TestResultShow } from './tests/TestResultShow';

const apiUrl = import.meta.env.VITE_API_URL;

const httpClient = (url, options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    const { access_token } = JSON.parse(localStorage.getItem('auth'));
    options.headers.set('Authorization', `Bearer ${access_token}`);
    return fetchUtils.fetchJson(url, options);
};

export const App = () => (
    <Admin
        layout={Layout}
        authProvider={authProvider}
        dataProvider={dataProvider(apiUrl, httpClient)}
    >
        <Resource name="targets" {...targets} />
        <Resource name="deployers" {...deployers} />
        <Resource name="networks" {...networks} />
        <Resource name="services" {...services} />
        <Resource name="tests" {...tests} />
        <Resource name="dynamic_policies" {...dynamic_policies} >
            <Route path=":id/test" element={<TestResultShow />} />
            <Route path=":id/test/not_matched" element={<TestResultShow />} />
        </Resource>
        <Resource name="policies" {...policies} >
            <Route path=":id/test" element={<TestResultShow />} />
            <Route path=":id/test/not_matched" element={<TestResultShow />} />
        </Resource>
        <Resource name="revisions" {...revisions} />
        <Resource name="deployments" {...deployments} />
    </Admin>
);

