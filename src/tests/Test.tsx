
import { ArrayField, Show, SimpleShowLayout, Button, ChipField, CloneButton, Create, Datagrid, DateField, Edit, EditButton, Link, NumberField, NumberInput, ReferenceArrayField, ReferenceArrayInput, required, SelectField, SelectInput, ShowButton, SimpleForm, SingleFieldList, TextField, TextInput } from 'react-admin';


import { useParams } from 'react-router-dom';

import { ActionChip, BulkUpdateFormButton, DefaultPagination } from '../shared/Shared';

import AddIcon from '@mui/icons-material/Add';

import { BulkDeleteButton, List, useNotify, useRefresh } from 'react-admin';

import { DeleteButton, TopToolbar } from 'react-admin';
import { Stack } from '@mui/material';


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
    <List filters={TestFilters} pagination={<DefaultPagination />} >
        <Datagrid bulkActionButtons={<TestBulkActionButtons />} >
            <TextField source="name" />
            <DateField source="created_at" />
            <DateField source="updated_at" />
        </Datagrid>
    </List>
);

export const TestEdit = () => (
    <Edit redirect="show">
        <SimpleForm>
            <TextInput source="name" validate={required()} />
            <TextInput source="comment" />
            <ReferenceArrayInput source="dynamic_policies" reference="dynamic_policies" />
            <ReferenceArrayInput source="policies" reference="policies" />
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



const TestCaseBulkActionButtons = () => {
    const { id } = useParams();
    return (
        <>
            <BulkUpdateFormButton resource={"tests/" + id + "/cases"} >
                <SimpleForm>
                    <SelectInput source="expected_action" choices={[
                        { id: 'accept', name: 'Accept' },
                        { id: 'deny', name: 'Deny' },
                        { id: 'reject', name: 'Reject' },
                    ]} optionText={<ActionChip />} resettable />
                </SimpleForm>
            </BulkUpdateFormButton>
            <BulkDeleteButton resource={"tests/" + id + "/cases"} mutationMode="pessimistic" />
        </>
    )
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

                    <Button
                        component={Link}
                        to={`/tests/${id}/cases/create`}
                        startIcon={<AddIcon />}
                        label="Add Case"
                    >
                        <AddIcon />
                    </Button>
                    <Datagrid bulkActionButtons={<TestCaseBulkActionButtons />} rowClick={false}>
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
                        <Stack
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            spacing={0}
                        >
                            <EditButton resource={"tests/" + id + "/cases"} label='' size="large" sx={{ "minWidth": "0px", "margin": 0 }} />
                            <CloneButton resource={"tests/" + id + "/cases"} label='' size="large" sx={{ "minWidth": "0px", "margin": 0 }} />
                            <DeleteButton resource={"tests/" + id + "/cases"} label='' size="large" sx={{ "minWidth": "0px", "margin": 0 }} mutationMode="pessimistic" redirect={"/tests/" + id + "/show"} mutationOptions={{ onSuccess: () => { refresh(); notify('Test case deleted') } }} />
                        </Stack>
                    </Datagrid>
                </ArrayField>


            </SimpleShowLayout>

        </Show >
    );
}

export const TestCaseCreate = () => {
    const { id } = useParams();
    return (
        <Create resource={"tests/" + id + "/cases"} redirect={"/tests/" + id + "/show"}>
            <SimpleForm>
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
            </SimpleForm>
        </Create>
    );
}


export const TestCaseEdit = () => {
    const { id, caseId } = useParams();
    return (
        <Edit resource={"tests/" + id + "/cases"} id={caseId} redirect={"/tests/" + id + "/show"} mutationMode='pessimistic'>
            <SimpleForm>
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

            </SimpleForm>
        </Edit>
    );
};