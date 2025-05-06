
import { Admin, Resource } from 'react-admin';
import { Route } from 'react-router-dom';
import { Layout } from './Layout';
import dataProvider from './dataProvider';
import authProvider from './authProvider';
import { fetchUtils } from "ra-core";

import dynamic_policies from './dynamic_policies';
import networks from './networks';
import policies from './policies';
import deployers from './deployers';
import deployments from './deployments';
import revisions from './revisions';
import services from './services';
import targets from './targets';
import tests from './tests';

import { NetworkAddressCreate, NetworkAddressEdit } from './networks/Network';
import { PolicyTermCreate, PolicyTermEdit } from './policies/Policy';
import { ServiceEntryCreate, ServiceEntryEdit } from './services/Service';
import { TestCaseCreate, TestCaseEdit } from './tests/Test';
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
        <Resource name="networks" {...networks} >
            <Route path=":id/addresses/create" element={<NetworkAddressCreate />} />
            <Route path=":id/addresses/:addressId" element={<NetworkAddressEdit />} />
        </Resource>
        <Resource name="services" {...services} >
            <Route path=":id/entries/create" element={<ServiceEntryCreate />} />
            <Route path=":id/entries/:addressId" element={<ServiceEntryEdit />} />
        </Resource>
        <Resource name="tests" {...tests} >
            <Route path=":id/cases/create" element={<TestCaseCreate />} />
            <Route path=":id/cases/:caseId" element={<TestCaseEdit />} />
        </Resource>
        <Resource name="dynamic_policies" {...dynamic_policies} >
            <Route path=":id/test" element={<TestResultShow />} />
            <Route path=":id/test/not_matched" element={<TestResultShow />} />
        </Resource>
        <Resource name="policies" {...policies} >
            <Route path=":id/test" element={<TestResultShow />} />
            <Route path=":id/test/not_matched" element={<TestResultShow />} />
            <Route path=":id/terms/create" element={<PolicyTermCreate />} />
            <Route path=":id/terms/:addressId" element={<PolicyTermEdit />} />
        </Resource>
        <Resource name="revisions" {...revisions} />
        <Resource name="deployments" {...deployments} />
    </Admin>
);

