
import { BulkDeleteButton, ChipField, Create, Datagrid, DateField, Edit, EditButton, FunctionField, NumberInput, ReferenceArrayField, ReferenceArrayInput, required, RichTextField, SelectArrayInput, SelectField, SelectInput, SimpleForm, SingleFieldList, TabbedShowLayout, TextArrayInput, TextField, TextInput } from 'react-admin';


import { ReferenceField, ReferenceInput, Show, ShowButton, SimpleShowLayout } from 'react-admin';

import { DefaultPagination } from '../shared/Shared';
import { useNotify, useRefresh } from 'react-admin';
import { useParams } from 'react-router-dom';
import { DeleteButton, TopToolbar } from 'react-admin';
import { List } from 'react-admin';

const DeploymentFilters = [
    <TextInput label="Search" source="q" alwaysOn />,
    <TextArrayInput source="id__in" label="IDs" />,
    <ReferenceArrayInput source="deployer_id__in" reference='deployers' label="Deployers" />,
    <ReferenceArrayInput source="revision_id__in" reference='revisions' label="Revision" />,
];


const DeploymentBulkActionButtons = () => (
    <>
        <BulkDeleteButton mutationMode='pessimistic' />
    </>
);

export const DeploymentList = () => (
    <List filters={DeploymentFilters} pagination={<DefaultPagination />} sort={{ field: 'created_at', order: 'DESC' }}>
        <Datagrid bulkActionButtons={<DeploymentBulkActionButtons />}>
            <FunctionField
                source="status"
                render={record => {
                    const value = record.status;
                    let color = 'default';

                    switch (value) {
                        case 'completed':
                            color = 'success';
                            break;
                        case 'failed':
                            color = 'error';
                            break;
                        case 'pending':
                            color = 'warning';
                            break;
                        default:
                            color = 'default';
                    }

                    return (
                        <Chip
                            label={value.charAt(0).toUpperCase() + value.slice(1)}
                            color={color}
                            sx={{ textTransform: 'capitalize' }}
                        />
                    );
                }}
            />
            <ReferenceField source="deployer" reference="deployers" />
            <ReferenceField source="revision" reference="revisions" >
                <TextField source="comment" />
            </ReferenceField>
            <DateField source="created_at" />
            <DateField source="updated_at" />
            <ShowButton />
        </Datagrid>
    </List>
);



const DeploymentShowActions = () => {
    return (
        <TopToolbar>
            <DeleteButton mutationMode="pessimistic" />
        </TopToolbar>
    );
}

import { Fragment } from 'react/jsx-runtime';
import { Chip } from '@mui/material';

export const DeploymentShow = () => {
    return (
        <Show actions={<DeploymentShowActions />}>
            <TabbedShowLayout>
                <TabbedShowLayout.Tab label="summary">
                    <TextField source="id" />
                    <FunctionField
                        source="status"
                        render={record => {
                            const value = record.status;
                            let color = 'default';

                            switch (value) {
                                case 'completed':
                                    color = 'success';
                                    break;
                                case 'failed':
                                    color = 'error';
                                    break;
                                case 'pending':
                                    color = 'warning';
                                    break;
                                default:
                                    color = 'default';
                            }

                            return (
                                <Chip
                                    label={value.charAt(0).toUpperCase() + value.slice(1)}
                                    color={color}
                                    sx={{ textTransform: 'capitalize' }}
                                />
                            );
                        }}
                    />
                    <ReferenceField source="deployer" reference="deployers" />
                    <ReferenceField source="revision" reference="revisions" >
                        <TextField source="comment" />
                    </ReferenceField>


                    <DateField source="created_at" />
                    <DateField source="updated_at" />

                </TabbedShowLayout.Tab>
                <TabbedShowLayout.Tab label="Output">
                    <FunctionField
                        label=""
                        source="output"
                        sx={{ whiteSpace: 'pre' }}
                        render={record =>
                            record.output?.split('\n').map((line, idx) => (
                                <Fragment key={idx}>
                                    {line}
                                    <br />
                                </Fragment>
                            ))
                        }
                    />
                </TabbedShowLayout.Tab>
            </TabbedShowLayout>
        </Show >
    );
}
