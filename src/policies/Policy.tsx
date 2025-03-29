
import { useDataProvider, ArrayField, BooleanInput, BulkDeleteButton, Button, ChipField, CloneButton, Create, Datagrid, DateField, DeleteButton, Edit, EditButton, FormDataConsumer, Link, List, ReferenceArrayField, ReferenceArrayFieldViewProps, ReferenceArrayInput, ReferenceField, ReferenceInput, required, SelectField, SelectInput, Show, ShowButton, SimpleForm, SimpleShowLayout, SingleFieldList, TextField, TextInput, TopToolbar, useNotify, useRecordContext, useRefresh } from 'react-admin';

import { useEffect, useState } from 'react';

import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';
import HistoryIcon from '@mui/icons-material/History';
import AddIcon from '@mui/icons-material/Add';

import { Stack, Tooltip, Typography } from '@mui/material';

import { ActionChip, BulkUpdateFormButton, ColoredBooleanField, ReferenceNetworks, ReferenceServices } from '../shared/Shared';

import { useParams } from "react-router-dom";

const PolicyBulkActionButtons = () => (
    <>
        <BulkDeleteButton mutationMode='pessimistic' />
    </>
);

export const PolicyList = () => (
    <List filters={PolicyListFilters} sort={{ field: 'name', order: 'ASC' }}>
        <Datagrid bulkActionButtons={<PolicyBulkActionButtons />}>
            <TextField source="name" />
            <DateField source="created_at" />
            <DateField source="updated_at" />
        </Datagrid>
    </List >
);

export const PolicyEdit = () => (
    <Edit redirect="show" mutationMode='pessimistic'>
        <SimpleForm>
            <TextInput source="name" validate={required()} />
            <TextInput source="comment" />
            <ReferenceArrayInput source="targets" reference='targets' />
            <ReferenceArrayInput source="tests" reference='tests' />
        </SimpleForm>
    </Edit>
);

export const PolicyCreate = () => (
    <Create redirect="show">
        <SimpleForm>
            <TextInput source="name" validate={required()} />
            <TextInput source="comment" />
            <ReferenceArrayInput source="targets" reference='targets' />
            <ReferenceArrayInput source="tests" reference='tests' />
        </SimpleForm>
    </Create>
);

const PolicyShowActions = () => {
    const { id } = useParams();
    if (!id) return;
    return (
        <TopToolbar>
            <Button
                component={Link}
                to={`/policies/${id}/test`}
                startIcon={<ChecklistRtlIcon />}
                label="Test"
            >
                <ChecklistRtlIcon />
            </Button>
            <Button
                component={Link}
                to={`/revisions/create`}
                startIcon={<AddIcon />}
                state={{ record: { policy_id: parseInt(id) } }}
                label="Create Revision"
            >
                <AddIcon />
            </Button>
            <Button
                component={Link}
                to={{
                    pathname: '/revisions',
                    search: `filter=${JSON.stringify({ policy_id: [parseInt(id)] })}`,
                }}
                startIcon={<HistoryIcon />}
                label="Show Revisions"
            >
                <HistoryIcon />
            </Button>
            <EditButton />
            <DeleteButton mutationMode="pessimistic" />
        </TopToolbar>
    );
}

const PolicyListFilters = [
    <TextInput label="Search" source="q" alwaysOn />,
];



const PolicyUsageReferences = () => {
    const { id } = useParams();

    const dataProvider = useDataProvider();

    const [references, setReferences] = useState(null); // null indicates loading state

    useEffect(() => {
        if (!id) return;

        dataProvider.customFetch({
            method: "GET",
            url: `/policies/${id}/usage`
        })
            .then(({ json }) => setReferences(json))
    }, [id, dataProvider]);


    if (!references) return null; // Hide component while loading

    return (
        <>
            {references.policies.length > 0 && (
                <SimpleShowLayout>
                    <ReferenceArrayField record={references} source="policies" reference="policies">
                        <Datagrid>
                            <TextField source="name" />
                            <ShowButton />
                        </Datagrid>
                    </ReferenceArrayField>
                </SimpleShowLayout>
            )}
        </>
    );
};

const CustomTermEmpty = () => <div>No terms found</div>;

const PolicyTermBulkActionButtons = () => {
    const { id } = useParams();
    return (
        <>
            <BulkUpdateFormButton resource={"policies/" + id + "/terms"} >
                <SimpleForm>
                    <SelectInput source="enabled" choices={[
                        { id: "true", name: 'Enabled' },
                        { id: "false", name: 'Disabled' },
                    ]} resettable />
                    <SelectInput source="option" choices={[
                        { id: 'established', name: 'Established' },
                        { id: 'is-fragment', name: 'Is Fragment' },
                        { id: 'tcp-established', name: 'TCP Established' },
                        { id: 'tcp-initial', name: 'TCP Initial' }
                    ]} resettable />
                    <SelectInput source="action" choices={[
                        { id: 'accept', name: 'Accept' },
                        { id: 'deny', name: 'Deny' },
                        { id: 'reject', name: 'Reject' },
                    ]} optionText={<ActionChip />} resettable />
                    <SelectInput source="logging" choices={[
                        { id: "true", name: 'Enable Logging' },
                        { id: "false", name: 'Disable Logging' },
                    ]} resettable />

                </SimpleForm>
            </BulkUpdateFormButton>
            <BulkDeleteButton resource={"policies/" + id + "/terms"} mutationMode="pessimistic" />
        </>
    )
}

export const PolicyShow = () => {
    const { id } = useParams();

    const refresh = useRefresh();
    const notify = useNotify();

    return (
        <Show actions={<PolicyShowActions />}>

            <SimpleShowLayout>
                <TextField source="name" />
                <TextField source="comment" />
            </SimpleShowLayout>
            <SimpleShowLayout direction="row">
                <DateField source="created_at" />
                <DateField source="updated_at" />
            </SimpleShowLayout>


            <SimpleShowLayout >
                <ReferenceArrayField source="targets" reference='targets' label="Connected Targets">
                    <SingleFieldList linkType="show" >
                        <ChipField source="name" />
                    </SingleFieldList>
                </ReferenceArrayField>
            </SimpleShowLayout>

            <SimpleShowLayout >
                <ReferenceArrayField source="tests" reference='tests' label="Connected Tests" >
                    <SingleFieldList linkType="show" >
                        <ChipField source="name" />
                    </SingleFieldList>
                </ReferenceArrayField>
            </SimpleShowLayout>

            <SimpleShowLayout >
                <ArrayField source="terms">
                    <Button
                        component={Link}
                        to={`/policies/${id}/terms/create`}
                        startIcon={<AddIcon />}
                        label="Add Term"
                    >
                        <AddIcon />
                    </Button>
                    <Datagrid bulkActionButtons={<PolicyTermBulkActionButtons />} rowClick={false} empty={<CustomTermEmpty />} >
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
                        <ReferenceField source="nested_policy_id" reference="policies" sortable={false} />
                        <Stack
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            spacing={0}
                        >
                            <Tooltip title="Edit">
                                <EditButton resource={"policies/" + id + "/terms"} label='' size="large" sx={{ "minWidth": "0px", "margin": 0 }} />
                            </Tooltip>
                            <Tooltip title="Clone">
                                <CloneButton resource={"policies/" + id + "/terms"} label='' size="large" sx={{ "minWidth": "0px", "margin": 0 }} />
                            </Tooltip>
                            <Tooltip title="Delete">
                                <DeleteButton resource={"policies/" + id + "/terms"} label='' size="large" sx={{ "minWidth": "0px", "margin": 0 }} mutationMode="pessimistic" redirect="show" mutationOptions={{ onSuccess: () => { refresh(); notify('policy term deleted') } }} />
                            </Tooltip>
                        </Stack>
                    </Datagrid>
                </ArrayField>
            </SimpleShowLayout >
            <PolicyUsageReferences />
        </Show >
    );
}

export const PolicyTermCreate = () => {
    const { id } = useParams();
    return (
        <Create resource={"policies/" + id + "/terms"} redirect={"/policies/" + id + "/show"}>
            <SimpleForm>
                <TextInput source="name" validate={required()} />

                <Typography variant="h6">Insert above term</Typography>
                <ReferenceInput source="position" reference={"policies/" + id + "/terms"} id='position' sort={{ field: 'position', order: 'ASC' }}>
                    <SelectInput optionText="name" optionValue="position" />
                </ReferenceInput>

                <BooleanInput source="enabled" />

                <ReferenceArrayInput source="source_networks" reference="networks" options={{ fullWidth: true }} />
                <BooleanInput source="negate_source_networks" fullWidth />

                <ReferenceArrayInput source="destination_networks" reference="networks" />
                <BooleanInput source="negate_destination_networks" />

                <ReferenceArrayInput source="source_services" reference="services" />
                <ReferenceArrayInput source="destination_services" reference="services" />

                <SelectInput source="option" choices={[
                    { id: 'established', name: 'Established' },
                    { id: 'is-fragment', name: 'Is Fragment' },
                    { id: 'tcp-established', name: 'TCP Established' },
                    { id: 'tcp-initial', name: 'TCP Initial' }
                ]} resettable />

                <SelectInput source="action" choices={[
                    { id: 'accept', name: 'Accept' },
                    { id: 'deny', name: 'Deny' },
                    { id: 'reject', name: 'Reject' },
                ]} optionText={<ActionChip />} resettable />
                <BooleanInput source="logging" />


                <ReferenceInput source="nested_policy_id" reference="policies" />
            </SimpleForm>
        </Create>
    );
}

export const PolicyTermEdit = () => {
    const { id, addressId } = useParams();

    return (
        <Edit resource={"policies/" + id + "/terms"} id={addressId} redirect={"/policies/" + id + "/show"} mutationMode='pessimistic'>
            <SimpleForm>
                <TextInput source="name" validate={required()} />

                <BooleanInput source="move" />

                <FormDataConsumer<{ move: boolean }>>
                    {({ formData }) => formData.move &&
                        <><Typography variant="h6">Move above term</Typography>
                            <ReferenceInput source="position" reference={"policies/" + id + "/terms"} id='position' sort={{ field: 'position', order: 'ASC' }}>
                                <SelectInput optionText="name" optionValue="position" />
                            </ReferenceInput>
                        </>
                    }
                </FormDataConsumer>

                <BooleanInput source="enabled" />

                <ReferenceArrayInput source="source_networks" reference="networks" />
                <BooleanInput source="negate_source_networks" fullWidth />

                <ReferenceArrayInput source="destination_networks" reference="networks" />
                <BooleanInput source="negate_destination_networks" />
                <ReferenceArrayInput source="source_services" reference="services" />
                <ReferenceArrayInput source="destination_services" reference="services" />

                <SelectInput source="option" choices={[
                    { id: 'established', name: 'Established' },
                    { id: 'is-fragment', name: 'Is Fragment' },
                    { id: 'tcp-established', name: 'TCP Established' },
                    { id: 'tcp-initial', name: 'TCP Initial' }
                ]} resettable />

                <SelectInput source="action" choices={[
                    { id: 'accept', name: 'Accept' },
                    { id: 'deny', name: 'Deny' },
                    { id: 'reject', name: 'Reject' },
                ]} resettable />
                <BooleanInput source="logging" />
                <ReferenceInput source="nested_policy_id" reference="policies" />
            </SimpleForm>
        </Edit>
    );
};
