
import { ArrayField, ArrayInput, ChipField, Create, Datagrid, DateField, Edit, EditButton, InfiniteList, NumberField, NumberInput, ReferenceArrayField, ReferenceArrayInput, required, SelectField, SelectInput, Show, SimpleForm, SimpleFormIterator, SimpleShowLayout, SingleFieldList, TextField, TextInput } from 'react-admin';


import { useParams } from 'react-router-dom';

import { ActionChip, DefaultPagination } from '../shared/Shared';


import { BulkDeleteButton, useNotify, useRefresh } from 'react-admin';

import { DeleteButton, TopToolbar } from 'react-admin';


const TestFilters = [
    <TextInput label="Search" source="q" alwaysOn />,
    // <TextInput label="Cases" source="cases__case" alwaysOn />,
];

const TestBulkActionButtons = () => (
    <>
        <BulkDeleteButton mutationMode='pessimistic' />
    </>
);


export const TestList = () => (
    <InfiniteList perPage={25} filters={TestFilters} pagination={<DefaultPagination />} >
        <Datagrid bulkActionButtons={<TestBulkActionButtons />} >
            <TextField source="name" />
            <DateField source="created_at" />
            <DateField source="updated_at" />
        </Datagrid>
    </InfiniteList>
);

export const TestEdit = () => (
    <Edit redirect="show" mutationMode="pessimistic">
        <SimpleForm>
            <TextInput source="name" validate={required()} />
            <TextInput source="comment" />
            <ReferenceArrayInput source="dynamic_policies" reference="dynamic_policies" />
            <ReferenceArrayInput source="policies" reference="policies" />
            <ArrayInput source="cases">
                <SimpleFormIterator inline>
                    <TextInput source="name" validate={required()} />
                    <TextInput source="source_network" />
                    <TextInput source="destination_network" />
                    <NumberInput source="source_port" />
                    <NumberInput source="destination_port" />
                    <TextInput source="protocol" />
                    <SelectInput source="expected_action" choices={[
                        { id: 'accept', name: 'Accept' },
                        { id: 'deny', name: 'Deny' },
                        { id: 'reject', name: 'Reject' },
                    ]} optionText={<ActionChip />} validate={required()} />
                </SimpleFormIterator>
            </ArrayInput>
        </SimpleForm>
    </Edit>
);

export const TestCreate = () => (
    <Create redirect="show">
        <SimpleForm>
            <TextInput source="name" validate={required()} />
            <TextInput source="comment" />
            <ReferenceArrayInput source="dynamic_policies" reference="dynamic_policies" />
            <ReferenceArrayInput source="policies" reference="policies" />
            <ArrayInput source="cases">
                <SimpleFormIterator inline>
                    <TextInput source="name" validate={required()} />
                    <TextInput source="source_network" />
                    <TextInput source="destination_network" />
                    <NumberInput source="source_port" />
                    <NumberInput source="destination_port" />
                    <TextInput source="protocol" />
                    <SelectInput source="expected_action" choices={[
                        { id: 'accept', name: 'Accept' },
                        { id: 'deny', name: 'Deny' },
                        { id: 'reject', name: 'Reject' },
                    ]} optionText={<ActionChip />} validate={required()} />
                </SimpleFormIterator>
            </ArrayInput>
        </SimpleForm>
    </Create>
);


const TestShowActions = () => {
    return (
        <TopToolbar>
            <EditButton />
            <DeleteButton mutationMode="pessimistic" />
        </TopToolbar>
    );
}




export const TestShow = () => {
    const { id } = useParams();
    const refresh = useRefresh();
    const notify = useNotify();
    return (
        <Show actions={<TestShowActions />}>
            <SimpleShowLayout>
                <TextField source="name" />
                <TextField source="comment" />
                <DateField source="created_at" />
                <DateField source="updated_at" />
            </SimpleShowLayout>
            <SimpleShowLayout>
                <ReferenceArrayField source="dynamic_policies" reference="dynamic_policies" label="Connected Dynamic Policies">
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
                <ArrayField source="cases">
                    <Datagrid bulkActionButtons={false} rowClick={false}>
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


            </SimpleShowLayout>

        </Show >
    );
}

// export const TestCaseCreate = () => {
//     const { id } = useParams();
//     return (
//         <Create resource={"tests/" + id + "/cases"} redirect={"/tests/" + id + "/show"}>
//             <SimpleForm>
//                 <TextInput source="name" validate={required()} />
//                 <TextInput source="source_network" />
//                 <TextInput source="destination_network" />
//                 <NumberInput source="source_port" />
//                 <NumberInput source="destination_port" />
//                 <TextInput source="protocol" />
//                 <SelectInput source="expected_action" choices={[
//                     { id: 'accept', name: 'Accept' },
//                     { id: 'deny', name: 'Deny' },
//                     { id: 'reject', name: 'Reject' },
//                 ]} optionText={<ActionChip />} validate={required()} />
//             </SimpleForm>
//         </Create>
//     );
// }


// export const TestCaseEdit = () => {
//     const { id, caseId } = useParams();
//     return (
//         <Edit resource={"tests/" + id + "/cases"} id={caseId} redirect={"/tests/" + id + "/show"} mutationMode='pessimistic'>
//             <SimpleForm>
// <TextInput source="name" validate={required()} />
// <TextInput source="source_network" />
// <TextInput source="destination_network" />
// <NumberInput source="source_port" />
// <NumberInput source="destination_port" />
// <TextInput source="protocol" />
// <SelectInput source="expected_action" choices={[
//     { id: 'accept', name: 'Accept' },
//     { id: 'deny', name: 'Deny' },
//     { id: 'reject', name: 'Reject' },
// ]} optionText={<ActionChip />} validate={required()} />

//             </SimpleForm>
//         </Edit>
//     );
// };