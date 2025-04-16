
import { BulkDeleteButton, ChipField, Create, Datagrid, DateField, Edit, EditButton, ReferenceArrayField, ReferenceArrayInput, required, SelectArrayInput, SelectField, SelectInput, SimpleForm, SingleFieldList, TextField, TextInput } from 'react-admin';



import { List } from 'react-admin';

const TargetFilters = [
    <TextInput label="Search" source="q" alwaysOn />,
    <ReferenceArrayInput source="generator" reference='target_generators' />,
    <SelectArrayInput source="inet_mode" choices={[
        { id: 'inet', name: 'IPv4' },
        { id: 'inet6', name: 'IPv6' },
        { id: 'mixed', name: 'IPv4 & IPv6' },
    ]} />
];


const TargetBulkActionButtons = () => (
    <>
        <BulkDeleteButton mutationMode='pessimistic' />
    </>
);

export const TargetList = () => (
    <List filters={TargetFilters} pagination={<DefaultPagination />} >
        <Datagrid bulkActionButtons={<TargetBulkActionButtons />}>
            <TextField source="name" />
            <ReferenceField source="generator" reference='target_generators' />
            <SelectField source="inet_mode" choices={[
                { id: null, name: 'Default' },
                { id: 'inet', name: 'IPv4' },
                { id: 'inet6', name: 'IPv6' },
                { id: 'mixed', name: 'IPv4 & IPv6' },
            ]} />
            <DateField source="created_at" />
            <DateField source="updated_at" />
            <EditButton />
            <ShowButton />
        </Datagrid>
    </List>
);

export const TargetEdit = () => (
    <Edit redirect="show" mutationMode='pessimistic'>
        <SimpleForm>
            <TextInput source="name" validate={required()} />
            <ReferenceInput source="generator" reference='target_generators' />
            <SelectInput source="inet_mode" choices={[
                { id: 'inet', name: 'IPv4' },
                { id: 'inet6', name: 'IPv6' },
                { id: 'mixed', name: 'IPv4 & IPv6' },
            ]} resettable />
            <ReferenceArrayInput source="dynamic_policies" reference="dynamic_policies" />
            <ReferenceArrayInput source="policies" reference="policies" />
        </SimpleForm>
    </Edit>
);

export const TargetCreate = () => (
    <Create redirect="show">
        <SimpleForm>
            <TextInput source="name" validate={required()} />
            <ReferenceInput source="generator" reference='target_generators' />
            <SelectInput source="inet_mode" choices={[
                { id: 'inet', name: 'IPv4' },
                { id: 'inet6', name: 'IPv6' },
                { id: 'mixed', name: 'IPv4 & IPv6' },
            ]} resettable />
            <ReferenceArrayInput source="dynamic_policies" reference="dynamic_policies" />
            <ReferenceArrayInput source="policies" reference="policies" />
        </SimpleForm>
    </Create>
);

import { DeleteButton, TopToolbar } from 'react-admin';

const TargetShowActions = () => {
    return (
        <TopToolbar>
            <EditButton />
            <DeleteButton mutationMode="pessimistic" />
        </TopToolbar>
    );
}


import { ReferenceField, ReferenceInput, Show, ShowButton, SimpleShowLayout } from 'react-admin';

import { useParams } from 'react-router-dom';




import { useNotify, useRefresh } from 'react-admin';
import { DefaultPagination } from '../shared/Shared';
export const TargetShow = () => {
    const { id } = useParams();
    const refresh = useRefresh();
    const notify = useNotify();
    return (
        <Show actions={<TargetShowActions />}>
            <SimpleShowLayout >
                <TextField source="name" />
                <ReferenceField source="generator" reference='target_generators' />
                <SelectField source="inet_mode" choices={[
                    { id: null, name: "Default" },
                    { id: 'inet', name: 'IPv4' },
                    { id: 'inet6', name: 'IPv6' },
                    { id: 'mixed', name: 'IPv4 & IPv6' },
                ]} />
            </SimpleShowLayout>
            <SimpleShowLayout direction="row">
                <DateField source="created_at" />
                <DateField source="updated_at" />
            </SimpleShowLayout>
            <SimpleShowLayout>
                <ReferenceArrayField source="dynamic_policies" reference="dynamic_policies" label="Connected Dynamic Policies" >
                    <SingleFieldList linkType="show" >
                        <ChipField source="name" />
                    </SingleFieldList>
                </ReferenceArrayField>
            </SimpleShowLayout>
            <SimpleShowLayout>
                <ReferenceArrayField source="policies" reference="policies" label="Connected Policies">
                    <SingleFieldList linkType="show" >
                        <ChipField source="name" />
                    </SingleFieldList>
                </ReferenceArrayField>
            </SimpleShowLayout>
            <SimpleShowLayout>
                <ReferenceArrayField source="deployers" reference="deployers" label="Connected Deployers">
                    <SingleFieldList linkType="show" >
                        <ChipField source="name" />
                    </SingleFieldList>
                </ReferenceArrayField>
            </SimpleShowLayout>

        </Show>
    );
}
