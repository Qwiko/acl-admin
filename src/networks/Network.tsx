
import { Button, Create, CreateButton, Datagrid, DateField, Edit, EditButton, Link, ReferenceArrayField, ReferenceInput, required, ShowButton, SimpleForm, TextField, TextInput } from 'react-admin';


import { BulkDeleteButton, List } from 'react-admin';
import AddIcon from '@mui/icons-material/Add';


const NetworkFilters = [
    <TextInput label="Search" source="q" alwaysOn />,
    <TextInput label="Address" source="addresses__address" alwaysOn />,
];

const NetworkBulkActionButtons = () => (
    <>
        <BulkDeleteButton mutationMode='pessimistic' />
    </>
);


export const NetworkList = () => (
    <List filters={NetworkFilters} >
        <Datagrid bulkActionButtons={<NetworkBulkActionButtons />} >
            <TextField source="name" />
            <DateField source="created_at" />
            <DateField source="updated_at" />
        </Datagrid>
    </List>
);

export const NetworkEdit = () => (
    <Edit redirect="show">
        <SimpleForm>
            <TextInput source="name" validate={required()} />
        </SimpleForm>
    </Edit>
);

export const NetworkCreate = () => (
    <Create redirect="show">
        <SimpleForm>
            <TextInput source="name" validate={required()} />
        </SimpleForm>
    </Create>
);

import { DeleteButton, TopToolbar } from 'react-admin';

const NetworkShowActions = () => {
    return (
        <TopToolbar>
            <EditButton />
            <DeleteButton mutationMode="pessimistic" />
        </TopToolbar>
    );
}


import { ArrayField, ReferenceField, Show, SimpleShowLayout, } from 'react-admin';

import { useParams } from 'react-router-dom';


import { useRedirect } from 'react-admin';



export const NetworkAddressCreate = () => {
    const { id } = useParams();
    return (
        <Create resource={"networks/" + id + "/addresses"} redirect={"/networks/" + id + "/show"}>
            <SimpleForm>
                <TextInput source="address" />
                <TextInput source="comment" />
                <ReferenceInput source="nested_network_id" reference="networks" />
            </SimpleForm>
        </Create>
    );
}

import { useDataProvider } from 'react-admin';

import { useEffect, useState } from 'react';

const NetworkUsageReferences = () => {
    const { id } = useParams();

    const dataProvider = useDataProvider();

    const [references, setReferences] = useState(null); // null indicates loading state

    useEffect(() => {
        if (!id) return;

        dataProvider.customFetch({
            method: "GET",
            url: `/networks/${id}/usage`
        })
            .then(({ json }) => setReferences(json))
    }, [id, dataProvider]);


    if (!references) return null; // Hide component while loading

    return (
        <>
            {references.dynamic_policies.length > 0 && (
                <SimpleShowLayout>
                    <ReferenceArrayField record={references} source="dynamic_policies" reference="dynamic_policies">
                        <Datagrid>
                            <TextField source="name" />
                            <ShowButton />
                        </Datagrid>
                    </ReferenceArrayField>
                </SimpleShowLayout>
            )}

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

            {references.networks.length > 0 && (
                <SimpleShowLayout>
                    <ReferenceArrayField record={references} source="networks" reference="networks">
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


import { useNotify, useRefresh } from 'react-admin';

export const NetworkShow = () => {
    const { id } = useParams();
    const refresh = useRefresh();
    const notify = useNotify();
    return (
        <Show actions={<NetworkShowActions />}>
            <SimpleShowLayout>
                <TextField source="name" />
                <DateField source="created_at" />
                <DateField source="updated_at" />

                <ArrayField source="addresses">

                    <Button
                        component={Link}
                        to={`/networks/${id}/addresses/create`}
                        startIcon={<AddIcon />}
                        label="Add Address"
                    >
                        <AddIcon />
                    </Button>
                    <Datagrid bulkActionButtons={false} rowClick={false}>
                        <TextField source="address" />
                        <TextField source="comment" />
                        <ReferenceField source="nested_network_id" reference="networks" />
                        <EditButton resource={"networks/" + id + "/addresses"} />
                        <DeleteButton resource={"networks/" + id + "/addresses"} mutationMode="pessimistic" redirect={"/networks/" + id + "/show"} mutationOptions={{ onSuccess: () => { refresh(); notify('Network address deleted') } }} />
                    </Datagrid>
                </ArrayField>


            </SimpleShowLayout>

            <NetworkUsageReferences />

        </Show >
    );
}


export const NetworkAddressEdit = () => {
    const { id, addressId } = useParams();
    return (
        <Edit resource={"networks/" + id + "/addresses"} id={addressId} redirect={"/networks/" + id + "/show"} mutationMode='pessimistic'>
            <SimpleForm>
                <TextInput source="address" />
                <TextInput source="comment" />
                <ReferenceInput source="nested_network_id" reference="networks" />
            </SimpleForm>
        </Edit>
    );
};