
import { Labeled, ArrayInput, SimpleFormIterator, ArrayField, BooleanInput, BulkDeleteButton, Button, ChipField, CloneButton, Create, Datagrid, DateField, DeleteButton, Edit, EditButton, FormDataConsumer, Link, List, ReferenceArrayField, ReferenceArrayInput, ReferenceField, ReferenceInput, required, SelectField, SelectInput, Show, ShowButton, SimpleForm, SimpleShowLayout, SingleFieldList, TextField, TextInput, TopToolbar, useDataProvider, useNotify, useRefresh } from 'react-admin';

import { useEffect, useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';
import HistoryIcon from '@mui/icons-material/History';

import { Box, Stack, Typography, Grid } from '@mui/material';

import { ActionChip, BulkUpdateFormButton, ColoredBooleanField, DefaultPagination, ReferenceNetworks, ReferenceServices } from '../shared/Shared';

import { data, useParams } from "react-router-dom";

const PolicyBulkActionButtons = () => (
    <>
        <BulkDeleteButton mutationMode='pessimistic' />
    </>
);

export const PolicyList = () => (
    <List filters={PolicyListFilters} sort={{ field: 'name', order: 'ASC' }} pagination={<DefaultPagination />} >
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

            <ArrayInput source="terms">
                <SimpleFormIterator getItemLabel={index => `#${index + 1}`}>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <TextInput source="name" validate={required()} fullWidth />
                        </Grid>
                        <Grid item xs={2}>
                            <BooleanInput source="enabled" />
                        </Grid>
                        <Grid item xs={2}>
                            <BooleanInput source="logging" />
                        </Grid>
                        <Grid item xs={4}>
                            <ReferenceInput source="nested_policy_id" reference="policies" />
                        </Grid>
                        <Grid item xs={3}>
                            <SelectInput source="option" choices={[
                                { id: 'established', name: 'Established' },
                                { id: 'is-fragment', name: 'Is Fragment' },
                                { id: 'tcp-established', name: 'TCP Established' },
                                { id: 'tcp-initial', name: 'TCP Initial' }
                            ]} resettable />
                        </Grid>

                        <Grid item xs={3}>
                            <SelectInput source="action" choices={[
                                { id: 'accept', name: 'Accept' },
                                { id: 'deny', name: 'Deny' },
                                { id: 'reject', name: 'Reject' },
                            ]} optionText={<ActionChip />} resettable />
                        </Grid>
                    </Grid>
                    <Typography variant="h7" gutterBottom >
                        Networks
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <ReferenceArrayInput source="source_networks" reference="networks" />
                        </Grid>
                        <Grid item xs={2}>
                            <BooleanInput source="negate_source_networks" label="Negate source" />
                        </Grid>

                        <Grid item xs={4}>
                            <ReferenceArrayInput source="destination_networks" reference="networks" />
                        </Grid>
                        <Grid item xs={2}>
                            <BooleanInput source="negate_destination_networks" label="Negate destination" />
                        </Grid>
                    </Grid>
                    <Typography variant="h7" gutterBottom >
                        Services
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <ReferenceArrayInput source="source_services" reference="services" />
                        </Grid>
                        <Grid item xs={4}>
                            <ReferenceArrayInput source="destination_services" reference="services" />
                        </Grid>
                    </Grid>
                </SimpleFormIterator>
            </ArrayInput>

        </SimpleForm>
    </Edit >
);

export const PolicyCreate = () => (
    <Create redirect="show">
        <SimpleForm>
            <TextInput source="name" validate={required()} />
            <TextInput source="comment" />
            <ReferenceArrayInput source="targets" reference='targets' />
            <ReferenceArrayInput source="tests" reference='tests' />

            <ArrayInput source="terms">
                <SimpleFormIterator getItemLabel={index => `#${index + 1}`}>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <TextInput source="name" validate={required()} fullWidth />
                        </Grid>
                        <Grid item xs={2}>
                            <BooleanInput source="enabled" />
                        </Grid>
                        <Grid item xs={2}>
                            <BooleanInput source="logging" />
                        </Grid>
                        <Grid item xs={4}>
                            <ReferenceInput source="nested_policy_id" reference="policies" />
                        </Grid>
                        <Grid item xs={3}>
                            <SelectInput source="option" choices={[
                                { id: 'established', name: 'Established' },
                                { id: 'is-fragment', name: 'Is Fragment' },
                                { id: 'tcp-established', name: 'TCP Established' },
                                { id: 'tcp-initial', name: 'TCP Initial' }
                            ]} resettable />
                        </Grid>

                        <Grid item xs={3}>
                            <SelectInput source="action" choices={[
                                { id: 'accept', name: 'Accept' },
                                { id: 'deny', name: 'Deny' },
                                { id: 'reject', name: 'Reject' },
                            ]} optionText={<ActionChip />} resettable />
                        </Grid>
                    </Grid>
                    <Typography variant="h7" gutterBottom >
                        Networks
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <ReferenceArrayInput source="source_networks" reference="networks" />
                        </Grid>
                        <Grid item xs={2}>
                            <BooleanInput source="negate_source_networks" label="Negate source" />
                        </Grid>

                        <Grid item xs={4}>
                            <ReferenceArrayInput source="destination_networks" reference="networks" />
                        </Grid>
                        <Grid item xs={2}>
                            <BooleanInput source="negate_destination_networks" label="Negate destination" />
                        </Grid>
                    </Grid>
                    <Typography variant="h7" gutterBottom >
                        Services
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <ReferenceArrayInput source="source_services" reference="services" />
                        </Grid>
                        <Grid item xs={4}>
                            <ReferenceArrayInput source="destination_services" reference="services" />
                        </Grid>
                    </Grid>
                </SimpleFormIterator>
            </ArrayInput>
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
                    <Datagrid bulkActionButtons={false} rowClick={false} empty={<CustomTermEmpty />} >
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
                    </Datagrid>
                </ArrayField>
            </SimpleShowLayout >
            <PolicyUsageReferences />
        </Show >
    );
}

// export const PolicyTermCreate = () => {
//     const { id } = useParams();
//     const transform = data => {
//         // Calculate the position based on the selected relative position
//         if (data.relative_position === 'below') {
//             data.position = data.position + 1;
//         }
//         // Remove the relative_position field from the data
//         delete data.relative_position;

//         return {
//             ...data,
//         }
//     };
//     return (
//         <Create transform={transform} resource={"policies/" + id + "/terms"} redirect={"/policies/" + id + "/show"}>
//             <SimpleForm sx={{ maxWidth: 500 }}>
//                 <TextInput source="name" validate={required()} />


//                 <Typography variant="h6" gutterBottom>
//                     Position
//                 </Typography>
//                 <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
//                     <Box flex={0.5} mr={{ xs: 0, sm: '0.5em' }}>
//                         <SelectInput source="relative_position" choices={[
//                             { id: 'above', name: 'Above' },
//                             { id: 'below', name: 'Below' },
//                         ]} defaultValue='above' label="Relative Position" validate={required()} />
//                     </Box>
//                     <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
//                         <ReferenceInput source="position" reference={"policies/" + id + "/terms"} id='position' sort={{ field: 'position', order: 'ASC' }}>
//                             <SelectInput optionText="name" optionValue="position" />
//                         </ReferenceInput>
//                     </Box>
//                 </Box>

//                 <Typography variant="h6" gutterBottom>
//                     Networks
//                 </Typography>
//                 <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
//                     <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
//                         <ReferenceArrayInput source="source_networks" reference="networks" options={{ fullWidth: true }} />
//                     </Box>
//                     <Box flex={0.2} ml={{ xs: 0, sm: '0.5em' }}>
//                         <BooleanInput source="negate_source_networks" fullWidth />
//                     </Box>
//                 </Box>

//                 <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
//                     <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
//                         <ReferenceArrayInput source="destination_networks" reference="networks" />
//                     </Box>
//                     <Box flex={0.2} ml={{ xs: 0, sm: '0.5em' }}>
//                         <BooleanInput source="negate_destination_networks" />
//                     </Box>
//                 </Box>

//                 <Typography variant="h6" gutterBottom>
//                     Services
//                 </Typography>
//                 <ReferenceArrayInput source="source_services" reference="services" />
//                 <ReferenceArrayInput source="destination_services" reference="services" />

//                 <Typography variant="h6" gutterBottom>
//                     Options
//                 </Typography>
//                 <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
//                     <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
//                         <SelectInput source="option" choices={[
//                             { id: 'established', name: 'Established' },
//                             { id: 'is-fragment', name: 'Is Fragment' },
//                             { id: 'tcp-established', name: 'TCP Established' },
//                             { id: 'tcp-initial', name: 'TCP Initial' }
//                         ]} resettable />
//                     </Box>
//                     <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>

//                         <SelectInput source="action" choices={[
//                             { id: 'accept', name: 'Accept' },
//                             { id: 'deny', name: 'Deny' },
//                             { id: 'reject', name: 'Reject' },
//                         ]} optionText={<ActionChip />} resettable />
//                     </Box>
//                 </Box>
//                 <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
//                     <BooleanInput source="enabled" />
//                     <BooleanInput source="logging" />
//                 </Box>

//                 <Typography variant="h6" gutterBottom>
//                     Nested Policy
//                 </Typography>
//                 <ReferenceInput source="nested_policy_id" reference="policies" />
//             </SimpleForm>
//         </Create >
//     );
// }

// export const PolicyTermEdit = () => {
//     const { id, addressId } = useParams();
//     const transform = data => {
//         // Calculate the position based on the selected relative position
//         if (data.relative_position === 'below') {
//             data.position = data.position + 1;
//         }
//         // Remove the relative_position field from the data
//         delete data.relative_position;

//         return {
//             ...data,
//         }
//     };
//     return (
//         <Edit transform={transform} resource={"policies/" + id + "/terms"} id={addressId} redirect={"/policies/" + id + "/show"} mutationMode='pessimistic'>
//             <SimpleForm sx={{ maxWidth: 500 }}>
//                 <TextInput source="name" validate={required()} />

//                 <BooleanInput source="move" />

//                 <FormDataConsumer<{ move: boolean }>>
//                     {({ formData }) => formData.move &&
//                         <>
//                             <Typography variant="h6" gutterBottom>
//                                 Position
//                             </Typography>
//                             <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
//                                 <Box flex={0.5} mr={{ xs: 0, sm: '0.5em' }}>
//                                     <SelectInput source="relative_position" choices={[
//                                         { id: 'above', name: 'Above' },
//                                         { id: 'below', name: 'Below' },
//                                     ]} defaultValue='above' label="Relative Position" validate={required()} />
//                                 </Box>
//                                 <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
//                                     <ReferenceInput source="position" reference={"policies/" + id + "/terms"} id='position' sort={{ field: 'position', order: 'ASC' }}>
//                                         <SelectInput optionText="name" optionValue="position" />
//                                     </ReferenceInput>
//                                 </Box>
//                             </Box>
//                         </>
//                     }
//                 </FormDataConsumer>


//                 <Typography variant="h6" gutterBottom>
//                     Networks
//                 </Typography>
//                 <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
//                     <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
//                         <ReferenceArrayInput source="source_networks" reference="networks" options={{ fullWidth: true }} />
//                     </Box>
//                     <Box flex={0.2} ml={{ xs: 0, sm: '0.5em' }}>
//                         <BooleanInput source="negate_source_networks" fullWidth />
//                     </Box>
//                 </Box>

//                 <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
//                     <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
//                         <ReferenceArrayInput source="destination_networks" reference="networks" />
//                     </Box>
//                     <Box flex={0.2} ml={{ xs: 0, sm: '0.5em' }}>
//                         <BooleanInput source="negate_destination_networks" />
//                     </Box>
//                 </Box>

//                 <Typography variant="h6" gutterBottom>
//                     Services
//                 </Typography>
//                 <ReferenceArrayInput source="source_services" reference="services" />
//                 <ReferenceArrayInput source="destination_services" reference="services" />

//                 <Typography variant="h6" gutterBottom>
//                     Options
//                 </Typography>
//                 <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
//                     <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
//                         <SelectInput source="option" choices={[
//                             { id: 'established', name: 'Established' },
//                             { id: 'is-fragment', name: 'Is Fragment' },
//                             { id: 'tcp-established', name: 'TCP Established' },
//                             { id: 'tcp-initial', name: 'TCP Initial' }
//                         ]} resettable />
//                     </Box>
//                     <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>

//                         <SelectInput source="action" choices={[
//                             { id: 'accept', name: 'Accept' },
//                             { id: 'deny', name: 'Deny' },
//                             { id: 'reject', name: 'Reject' },
//                         ]} optionText={<ActionChip />} resettable />
//                     </Box>
//                 </Box>
//                 <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
//                     <BooleanInput source="enabled" />
//                     <BooleanInput source="logging" />
//                 </Box>

//                 <Typography variant="h6" gutterBottom>
//                     Nested Policy
//                 </Typography>
//                 <ReferenceInput source="nested_policy_id" reference="policies" />
//             </SimpleForm>
//         </Edit>
//     );
// };
