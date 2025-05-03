
import { useEffect, useState } from 'react';
import { FunctionField, ArrayField, Datagrid, NumberField, ReferenceField, SelectField, Show, SimpleShowLayout, TabbedShowLayout, TextField, TopToolbar, useDataProvider, useRecordContext, useResourceContext, ShowBase, Title } from 'react-admin';

import { useParams } from "react-router-dom";
import { Identifier, RaRecord } from 'react-admin';
import { ActionChip, ColoredBooleanField, ReferenceNetworks, ReferenceServices } from '../shared/Shared';
import { Card, CardContent, Container } from '@mui/material';

const CustomTestEmpty = () => <div style={{ "padding": "6px" }}>No tests found</ div>;

const TestRowClickRedirect = (id: Identifier, resource: string, record: RaRecord) => (`/tests/${record.test_id}/show`)

const PolicyRowClickRedirect = (id: Identifier, resource: string, record: RaRecord) => (`/policies/${record.policy_id}/show`)

const CustomTestPolicyEmpty = () => <div style={{ "padding": "6px" }}>All policy terms have a matching test</div>;

const TestExpandPanel = () => {
    const record = useRecordContext();
    if (!record) return;
    record.cases = [record.case]
    if (record.matched_term) {
        record.matched_terms = [record.matched_term]
    }
    return (
        <>
            <SimpleShowLayout direction="row" sx={{ px: 0 }}>
                <ReferenceField reference='tests' source="case.test_id" label="Test" />
                {record.matched_term && (
                    <ReferenceField reference='policies' source="matched_term.policy_id" label="Policy" />
                )}
            </SimpleShowLayout>
            <SimpleShowLayout sx={{ px: 0 }}>
                <ArrayField label="Test Case" source="cases" >
                    <Datagrid bulkActionButtons={false} rowClick={TestRowClickRedirect} >
                        <TextField source="name" sortable={false} />
                        <TextField source="source_network" sortable={false} emptyText="Any" />
                        <TextField source="destination_network" sortable={false} emptyText="Any" />
                        <NumberField source="source_port" sortable={false} emptyText="Any" />
                        <NumberField source="destination_port" sortable={false} emptyText="Any" />
                        <TextField source="protocol" sortable={false} emptyText='Any' />
                        <SelectField source="expected_action" choices={[
                            { id: 'accept', name: 'Accept' },
                            { id: 'deny', name: 'Deny' },
                            { id: 'reject', name: 'Reject' },
                        ]} optionText={<ActionChip />} sortable={false} />
                    </Datagrid>
                </ArrayField>
            </SimpleShowLayout >
            {
                record.matched_term && (
                    <SimpleShowLayout sx={{ px: 0 }}>
                        <ArrayField label="Matched Term" source="matched_terms" >
                            <Datagrid bulkActionButtons={false} rowClick={PolicyRowClickRedirect} >
                                <TextField source="name" sortable={false} />
                                <ColoredBooleanField source="enabled" sortable={false} />
                                <ReferenceNetworks source="source_networks" reference="networks" sortable={false} />
                                <ReferenceNetworks source="destination_networks" reference="networks" sortable={false} />
                                <ReferenceServices source="source_services" reference="services" sortable={false} />
                                <ReferenceServices source="destination_services" reference="services" sortable={false} />

                                <SelectField source="option" choices={[
                                    { id: null, name: '' },
                                    { id: 'established', name: 'Established' },
                                    { id: 'is-fragment', name: 'Is Fragment' },
                                    { id: 'tcp-established', name: 'TCP Established' },
                                    { id: 'tcp-initial', name: 'TCP Initial' }
                                ]} sortable={false} />
                                <SelectField source="action" choices={[
                                    { id: 'accept', name: 'Accept' },
                                    { id: 'deny', name: 'Deny' },
                                    { id: 'reject', name: 'Reject' },
                                ]} optionText={<ActionChip />} sortable={false} />
                                <ColoredBooleanField source="logging" sortable={false} />
                            </Datagrid>
                        </ArrayField>
                    </SimpleShowLayout>
                )
            }
        </>
    );
};


const TestResultShowInside = () => {
    const { id } = useParams();
    const resource = useResourceContext();
    const dataProvider = useDataProvider();

    const [tests, setTests] = useState(null);

    useEffect(() => {
        if (!id) return;

        dataProvider.customFetch({
            method: "GET",
            url: `/run_tests?${resource?.replace(/ies$/, 'y_id')}=${id}`, // ?dynamic_policy_id= or ?policy_id=
        })
            .then(({ json }) => setTests(json))
    }, [id, dataProvider]);
    if (!tests) return null;
    return (
        <TabbedShowLayout record={tests} syncWithLocation={false} sx={{ [`& .RaTabbedShowLayout-content`]: { padding: "0px" }, px: 0 }}>
            <TabbedShowLayout.Tab label={`Tests (${tests.tests.length})`}>
                <SimpleShowLayout sx={{ paddingBottom: 0 }}>
                    <FunctionField label="Test Coverage" source="coverage" render={record => `${record.coverage * 100} %`} />
                </SimpleShowLayout>
                <ArrayField source="tests" label="" >
                    <Datagrid bulkActionButtons={false} rowClick="expand" empty={<CustomTestEmpty />} expand={<TestExpandPanel />}>
                        <TextField source="case.name" />
                        <ColoredBooleanField source="passed" />
                        <FunctionField
                            label="Matched Term Name"
                            render={(record) => {
                                if (!record) {
                                    return "No record";
                                }

                                if (record.passed == true && record.matched_term == null) {
                                    return "Dynamic Policy Default Action";
                                }

                                if (record.matched_term && 'name' in record.matched_term) {
                                    return record.matched_term.name;
                                }

                                return "No matched term";
                            }}
                        />
                    </Datagrid>
                </ArrayField>
            </TabbedShowLayout.Tab>
            <TabbedShowLayout.Tab label={`Not matched terms (${tests.not_matched_terms.length})`}>
                <ArrayField source="not_matched_terms" label="" >
                    <Datagrid bulkActionButtons={false} rowClick={PolicyRowClickRedirect} empty={<CustomTestPolicyEmpty />} >
                        <TextField source="name" sortable={false} />
                        <ColoredBooleanField source="enabled" sortable={false} />
                        <ReferenceNetworks source="source_networks" reference="networks" sortable={false} />
                        <ReferenceNetworks source="destination_networks" reference="networks" sortable={false} />
                        <ReferenceServices source="source_services" reference="services" sortable={false} />
                        <ReferenceServices source="destination_services" reference="services" sortable={false} />

                        <SelectField source="option" choices={[
                            { id: null, name: '' },
                            { id: 'established', name: 'Established' },
                            { id: 'is-fragment', name: 'Is Fragment' },
                            { id: 'tcp-established', name: 'TCP Established' },
                            { id: 'tcp-initial', name: 'TCP Initial' }
                        ]} sortable={false} />
                        <SelectField source="action" choices={[
                            { id: 'accept', name: 'Accept' },
                            { id: 'deny', name: 'Deny' },
                            { id: 'reject', name: 'Reject' },
                        ]} optionText={<ActionChip />} sortable={false} />
                        <ColoredBooleanField source="logging" sortable={false} />
                    </Datagrid>
                </ArrayField>
            </TabbedShowLayout.Tab>
        </TabbedShowLayout >
    )
}


export const TestResultShow = () => {
    return (
        <Container disableGutters maxWidth={false} sx={{
            paddingTop: "1em",
            px: 0,
        }} >
            <Title title="Test Results" />
            <Card>
                <CardContent sx={{
                    padding: "0px", margin: "0px", '&:last-child': {
                        paddingBottom: 0,
                    },
                }}>
                    <TestResultShowInside />
                </CardContent>
            </Card>
        </Container>
    );
}


