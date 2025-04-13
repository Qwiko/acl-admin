
import { CloneButton, AutocompleteArrayInput, ChipField, BulkDeleteButton, Button, Create, Datagrid, DateField, DeleteButton, Edit, EditButton, Link, List, ReferenceArrayField, ReferenceArrayInput, ReferenceField, required, SelectField, SelectInput, Show, ShowButton, SimpleForm, SimpleShowLayout, TextField, TextInput, TopToolbar, useDataProvider, useNotify, useRefresh, useRecordContext, SingleFieldList } from 'react-admin';
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';

import AddIcon from '@mui/icons-material/Add';
import HistoryIcon from '@mui/icons-material/History';
import { useParams } from "react-router-dom";

const DynamicPolicyBulkActionButtons = () => (
    <>
        <BulkDeleteButton mutationMode='pessimistic' />
    </>
);

export const DynamicPolicyList = () => (
    <List filters={DynamicPolicyListFilters}>
        <Datagrid bulkActionButtons={<DynamicPolicyBulkActionButtons />}>
            <TextField source="name" />
            <DateField source="created_at" />
            <DateField source="updated_at" />
        </Datagrid>
    </List>
);

export const DynamicPolicyEdit = () => (
    <Edit redirect="show" mutationMode='pessimistic'>
        <SimpleForm>
            <TextInput source="name" validate={required()} />
            <TextInput source="comment" />
            <SelectInput source="filter_action" choices={[
                { id: 'accept', name: 'Accept' },
                { id: 'deny', name: 'Deny' },
                { id: 'reject', name: 'Reject' },
            ]} resettable />
            <SelectInput source="default_action" choices={[
                { id: 'accept', name: 'Accept' },
                { id: 'accept-log', name: 'Accept Log' },
                { id: 'deny', name: 'Deny' },
                { id: 'deny-log', name: 'Deny Log' },
            ]} resettable />
            <ReferenceArrayInput source="targets" reference='targets' />
            <ReferenceArrayInput source="tests" reference='tests' />
            <ReferenceArrayInput source="source_filters" reference='networks' />
            <ReferenceArrayInput source="destination_filters" reference='networks' />
            <ReferenceArrayInput source="policy_filters" reference='policies' />
        </SimpleForm>
    </Edit>
);

export const DynamicPolicyCreate = () => (
    <Create redirect="show">
        <SimpleForm>
            <TextInput source="name" validate={required()} />
            <TextInput source="comment" />
            <SelectInput source="filter_action" choices={[
                { id: 'accept', name: 'Accept' },
                { id: 'deny', name: 'Deny' },
                { id: 'reject', name: 'Reject' },
            ]} resettable />
            <SelectInput source="default_action" choices={[
                { id: 'accept', name: 'Accept' },
                { id: 'accept-log', name: 'Accept Log' },
                { id: 'deny', name: 'Deny' },
                { id: 'deny-log', name: 'Deny Log' },
            ]} resettable />
            <ReferenceArrayInput source="targets" reference='targets' />
            <ReferenceArrayInput source="tests" reference='tests' />
            <ReferenceArrayInput source="source_filters" reference='networks' />
            <ReferenceArrayInput source="destination_filters" reference='networks' />
            <ReferenceArrayInput source="policy_filters" reference='policies' />
        </SimpleForm>
    </Create>
);

const DynamicPolicyShowActions = () => {
    const { id } = useParams();

    return (
        <TopToolbar>
            <Button
                component={Link}
                to={`/dynamic_policies/${id}/test`}
                startIcon={<ChecklistRtlIcon />}
                label="Test"
            >
                <ChecklistRtlIcon />
            </Button>
            <Button
                component={Link}
                to={`/revisions/create`}
                startIcon={<AddIcon />}
                state={{ record: { dynamic_policy_id: parseInt(id) } }}
                label="Create Revision"
            >
                <AddIcon />
            </Button>
            <Button
                component={Link}
                to={{
                    pathname: '/revisions',
                    search: `filter=${JSON.stringify({ dynamic_policy_id: [parseInt(id)] })}`,
                }}
                startIcon={<HistoryIcon />}
                label="Show Revisions"
            >
                <HistoryIcon />
            </Button>
            <CloneButton />
            <EditButton />
            <DeleteButton mutationMode="pessimistic" />
        </TopToolbar>
    );
}

const DynamicPolicyListFilters = [
    <TextInput label="Search" source="q" alwaysOn />,
];


export const DynamicPolicyShow = () => {
    const { id } = useParams();
    return (
        <Show actions={<DynamicPolicyShowActions />}>
            <SimpleShowLayout>
                <TextField source="name" />
                <TextField source="comment" />
            </SimpleShowLayout>
            <SimpleShowLayout direction="row">
                <DateField source="created_at" />
                <DateField source="updated_at" />
            </SimpleShowLayout>
            <SimpleShowLayout direction="row">
                <SelectField source="filter_action" choices={[
                    { id: null, name: 'Any' },
                    { id: 'accept', name: 'Accept' },
                    { id: 'deny', name: 'Deny' },
                    { id: 'reject', name: 'Reject' },
                ]} />
                <SelectField source="default_action" choices={[
                    { id: null, name: 'None' },
                    { id: 'accept', name: 'Accept' },
                    { id: 'accept-log', name: 'Accept Log' },
                    { id: 'deny', name: 'Deny' },
                    { id: 'deny-log', name: 'Deny Log' },
                ]} />
            </SimpleShowLayout>

            <SimpleShowLayout >
                <ReferenceArrayField source="targets" reference='targets' label="Connected Targets">
                    <SingleFieldList linkType="show" empty={<>None</>}>
                        <ChipField source="name" />
                    </SingleFieldList>
                </ReferenceArrayField>
            </SimpleShowLayout>

            <SimpleShowLayout >
                <ReferenceArrayField source="tests" reference='tests' label="Connected Tests" >
                    <SingleFieldList linkType="show" empty={<>None</>}>
                        <ChipField source="name" />
                    </SingleFieldList>
                </ReferenceArrayField>
            </SimpleShowLayout>

            <SimpleShowLayout>
                <ReferenceArrayField source="source_filters" reference='networks'>
                    <SingleFieldList linkType="show" empty={<>Any</>}>
                        <ChipField source="name" />
                    </SingleFieldList>
                </ReferenceArrayField>
            </SimpleShowLayout>
            <SimpleShowLayout>
                <ReferenceArrayField source="destination_filters" reference='networks'>
                    <SingleFieldList linkType="show" empty={<>Any</>}>
                        <ChipField source="name" />
                    </SingleFieldList>
                </ReferenceArrayField>
            </SimpleShowLayout>
            <SimpleShowLayout>
                <ReferenceArrayField source="policy_filters" reference='policies'>
                    <SingleFieldList linkType="show" empty={<>Any</>}>
                        <ChipField source="name" />
                    </SingleFieldList>
                </ReferenceArrayField>
            </SimpleShowLayout>
        </Show>
    );
}
