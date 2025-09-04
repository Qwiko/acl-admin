
import { ArrayField, ArrayInput, BulkDeleteButton, ChipField, Create, Datagrid, DateField, Edit, EditButton, InfiniteList, ReferenceArrayField, ReferenceArrayInput, ReferenceField, ReferenceInput, required, SelectArrayInput, SelectField, SelectInput, Show, SimpleForm, SimpleFormIterator, SimpleShowLayout, SingleFieldList, TextField, TextInput } from 'react-admin';

import { DeleteButton, TopToolbar } from 'react-admin';
import { DefaultPagination } from '../shared/Shared';
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
    <InfiniteList perPage={25} filters={TargetFilters} pagination={<DefaultPagination />} >
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
        </Datagrid>
    </InfiniteList>
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
            <ArrayInput source="substitutions">
                <SimpleFormIterator inline>
                    <TextInput source="pattern" />
                    <TextInput source="replacement" />
                </SimpleFormIterator>
            </ArrayInput>
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
            <ArrayInput source="substitutions">
                <SimpleFormIterator inline>
                    <TextInput source="pattern" />
                    <TextInput source="replacement" />
                </SimpleFormIterator>
            </ArrayInput>
            <ReferenceArrayInput source="dynamic_policies" reference="dynamic_policies" />
            <ReferenceArrayInput source="policies" reference="policies" />
        </SimpleForm>
    </Create>
);



const TargetShowActions = () => {
    return (
        <TopToolbar>
            <EditButton />
            <DeleteButton mutationMode="pessimistic" />
        </TopToolbar>
    );
}


const CustomSubstitutionEmpty = () => <div>No substitutions found</div>;


export const TargetShow = () => {
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
                <ArrayField source="substitutions" >
                    <Datagrid hover={false} empty={<CustomSubstitutionEmpty />} bulkActionButtons={false} rowClick={false}>
                        <TextField source="pattern" sortable={false} />
                        <TextField source="replacement" sortable={false} />
                    </Datagrid>
                </ArrayField>
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
