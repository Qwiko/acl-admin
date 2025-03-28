
import { useEffect, useState } from 'react';
import { ArrayField, useResourceContext, Datagrid, NumberField, ReferenceField, Show, SimpleShowLayout, TextField, useRecordContext, useDataProvider, SelectField, ReferenceArrayField } from 'react-admin';

import { useParams } from "react-router-dom";

import { ActionChip, ColoredBooleanField } from '../shared/Shared';
const CustomTestEmpty = () => <div>No tests found</div>;

import { ReferenceNetworks, ReferenceServices } from '../policies/Policy';

const TestExpandPanel = () => {
    const record = useRecordContext();
    if (!record) return;
    record.case_ids = [record.case_id]
    if (record.matched_term) {
        record.term_ids = [record.matched_term.id]        
    }
    return (
        <>
        <SimpleShowLayout direction="row" >
        <ReferenceField reference='tests' source="test_id" label="Test" />
        <ReferenceField reference='policies' source="matched_term.policy_id" label="Policy" />
        </SimpleShowLayout>
        <SimpleShowLayout>
            <ReferenceArrayField label="Test Case" source="case_ids" reference={`tests/${record.test_id}/cases`} >
                <Datagrid bulkActionButtons={false} rowClick={false} >
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
            </ReferenceArrayField>
        </SimpleShowLayout>
       {record.matched_term && (
        <SimpleShowLayout>
            <ReferenceArrayField label="Matched Term" source="term_ids" reference={`policies/${record.matched_term.policy_id}/terms`} >
                <Datagrid bulkActionButtons={false} rowClick={false} >
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
            </ReferenceArrayField>
        </SimpleShowLayout>
            )} 
        </>
    );
};

const TestResultShowInside = () => {
    const { id } = useParams();
    const resource = useResourceContext();
    const dataProvider = useDataProvider();

    const [tests, setTests] = useState(null); // null indicates loading state

    useEffect(() => {
        if (!id) return;

        dataProvider.customFetch({
            method: "GET",
            url: `/run_tests?${resource?.replace(/ies$/, 'y_id')}=${id}`,
        })
            .then(({ json }) => setTests({ "tests": json }))
    }, [id, dataProvider]);
    if (!tests) return null;
    return (<SimpleShowLayout>
        <ArrayField record={tests} source="tests" >
            <Datagrid bulkActionButtons={false} rowClick="expand" empty={<CustomTestEmpty />} expand={<TestExpandPanel />}>
                <TextField source="case_name" />
                <ColoredBooleanField source="passed" />
                <TextField source="matched_term.name" />
            </Datagrid>
        </ArrayField>
    </SimpleShowLayout>)
}

export const TestResultShow = () => {
    return (
        <Show>
            <TestResultShowInside />
        </Show >
    );
}


