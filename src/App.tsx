
import { Admin, Resource } from 'react-admin';
import { Route } from 'react-router-dom';
import { Layout } from './Layout';
import dataProvider from './dataProvider';

import dynamic_policies from './dynamic_policies';
import networks from './networks';
import policies from './policies';
import publishers from './publishers';
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

export const App = () => (
    <Admin
        layout={Layout}
        dataProvider={dataProvider(apiUrl)}
    >
        <Resource name="targets" {...targets} />
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
        <Resource name="publishers" {...publishers} />
    </Admin>
);

