
import { BulkDeleteButton, ChipField, Create, Datagrid, DateField, Edit, EditButton, ReferenceArrayField, ReferenceArrayInput, required, SelectArrayInput, SelectField, SelectInput, SimpleForm, SingleFieldList, TextField, TextInput } from 'react-admin';


import { ReferenceField, ReferenceInput, Show, ShowButton, SimpleShowLayout } from 'react-admin';


import { useNotify, useRefresh } from 'react-admin';
import { useParams } from 'react-router-dom';
import { DeleteButton, TopToolbar } from 'react-admin';
import { List } from 'react-admin';

const DeployerFilters = [
    <TextInput label="Search" source="q" alwaysOn />,
];


const DeployerBulkActionButtons = () => (
    <>
        <BulkDeleteButton mutationMode='pessimistic' />
    </>
);

export const DeployerList = () => (
    <List filters={DeployerFilters}>
        <Datagrid bulkActionButtons={<DeployerBulkActionButtons />}>
            <TextField source="name" />
            <DateField source="created_at" />
            <DateField source="updated_at" />
            <EditButton />
            <ShowButton />
        </Datagrid>
    </List>
);

export const DeployerCreate = () => (
    <Create redirect="show">
        <SimpleForm>
            <TextInput source="name" validate={required()} />
            <ReferenceInput source="target" reference='targets' />

        </SimpleForm>
    </Create>
);

export const DeployerEdit = () => (
    <Edit redirect="show" mutationMode='pessimistic'>
        <SimpleForm>
            <TextInput source="name" validate={required()} />
            <ReferenceInput source="target" reference='targets' />
        </SimpleForm>
    </Edit>
);



const DeployerShowActions = () => {
    return (
        <TopToolbar>
            <EditButton />
            <DeleteButton mutationMode="pessimistic" />
        </TopToolbar>
    );
}


export const DeployerShow = () => {
    return (
        <Show actions={<DeployerShowActions />}>
            <SimpleShowLayout >
                <TextField source="name" />

            </SimpleShowLayout>
            <SimpleShowLayout direction="row">
                <DateField source="created_at" />
                <DateField source="updated_at" />
            </SimpleShowLayout>
            <SimpleShowLayout>
                <ReferenceField source="target" reference='targets' />
            </SimpleShowLayout>
            <SimpleShowLayout >
                <TextField source="ssh_config.host" label="Host" />
                <TextField source="ssh_config.username" label="Username" />
            </SimpleShowLayout>
        </Show>
    );
}
