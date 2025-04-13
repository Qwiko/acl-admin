
import { BulkDeleteButton, ChipField, Create, Datagrid, DateField, Edit, EditButton, ReferenceArrayField, ReferenceArrayInput, required, SelectArrayInput, SelectField, SelectInput, SimpleForm, SingleFieldList, TextField, TextInput } from 'react-admin';


import { ReferenceField, ReferenceInput, Show, ShowButton, SimpleShowLayout } from 'react-admin';


import { useNotify, useRefresh } from 'react-admin';
import { useParams } from 'react-router-dom';
import { DeleteButton, TopToolbar } from 'react-admin';
import { List } from 'react-admin';

const PublisherFilters = [
    <TextInput label="Search" source="q" alwaysOn />,
];


const PublisherBulkActionButtons = () => (
    <>
        <BulkDeleteButton mutationMode='pessimistic' />
    </>
);

export const PublisherList = () => (
    <List filters={PublisherFilters}>
        <Datagrid bulkActionButtons={<PublisherBulkActionButtons />}>
            <TextField source="name" />
            <DateField source="created_at" />
            <DateField source="updated_at" />
            <EditButton />
            <ShowButton />
        </Datagrid>
    </List>
);

export const PublisherCreate = () => (
    <Create redirect="show">
        <SimpleForm>
            <TextInput source="name" validate={required()} />
            <ReferenceInput source="target" reference='targets' />

        </SimpleForm>
    </Create>
);

export const PublisherEdit = () => (
    <Edit redirect="show" mutationMode='pessimistic'>
        <SimpleForm>
            <TextInput source="name" validate={required()} />
            <ReferenceInput source="target" reference='targets' />
        </SimpleForm>
    </Edit>
);



const PublisherShowActions = () => {
    return (
        <TopToolbar>
            <EditButton />
            <DeleteButton mutationMode="pessimistic" />
        </TopToolbar>
    );
}


export const PublisherShow = () => {
    return (
        <Show actions={<PublisherShowActions />}>
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
