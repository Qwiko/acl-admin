
import { ArrayInput, SimpleFormIterator, BulkDeleteButton, ChipField, CloneButton, Create, Datagrid, DateField, Edit, EditButton, Link, required, SimpleForm, SingleFieldList, TextField, TextInput } from 'react-admin';

import { DeleteButton, TopToolbar } from 'react-admin';
import { ReferenceArrayField, useDataProvider } from 'react-admin';
import { Tooltip } from '@mui/material';
import { useNotify, useRefresh } from 'react-admin';
import { useEffect, useState } from 'react';

import { ArrayField, ReferenceField, ReferenceInput, Show, SimpleShowLayout } from 'react-admin';

import { useParams } from 'react-router-dom';

import AddIcon from '@mui/icons-material/Add';

import { Button } from 'react-admin';

import { List } from 'react-admin';

const ServiceFilters = [
    <TextInput label="Search" source="q" alwaysOn />,
];

const ServiceBulkActionButtons = () => (
    <>
        <BulkDeleteButton mutationMode='pessimistic' />
    </>
);

export const ServiceList = () => (

    <List filters={ServiceFilters}>
        <Datagrid bulkActionButtons={<ServiceBulkActionButtons />}>
            <TextField source="name" />
            <DateField source="created_at" />
            <DateField source="updated_at" />
        </Datagrid>
    </List>
);

export const ServiceEdit = () => (
    <Edit redirect="show" mutationMode='pessimistic'>
        <SimpleForm>
            <TextInput source="name" validate={required()} />
            <ArrayInput source="entries">
                <SimpleFormIterator inline>
                    <TextInput source="protocol" />
                    <TextInput source="port" />
                    <ReferenceInput source="nested_service_id" reference="services" />
                </SimpleFormIterator>
            </ArrayInput>
        </SimpleForm>
    </Edit>
);

export const ServiceCreate = () => (
    <Create redirect="show">
        <SimpleForm>
            <TextInput source="name" validate={required()} />
            <ArrayInput source="entries">
                <SimpleFormIterator inline>
                    <TextInput source="protocol" />
                    <TextInput source="port" />
                    <ReferenceInput source="nested_service_id" reference="services" />
                </SimpleFormIterator>
            </ArrayInput>
        </SimpleForm>
    </Create>
);


const ServiceShowActions = () => {
    return (
        <TopToolbar>
            <EditButton />
            <DeleteButton mutationMode="pessimistic" />
        </TopToolbar>
    );
}




const ServiceUsageReferences = () => {
    const { id } = useParams();

    const dataProvider = useDataProvider();

    const [references, setReferences] = useState(null); // null indicates loading state

    useEffect(() => {
        if (!id) return;

        dataProvider.customFetch({
            method: "GET",
            url: `/services/${id}/usage`
        })
            .then(({ json }) => setReferences(json))
    }, [id, dataProvider]);


    if (!references) return null; // Hide component while loading

    return (
        <>
            {references.policies.length > 0 && (
                <SimpleShowLayout>
                    <ReferenceArrayField record={references} source="policies" reference="policies" label="Referenced in Policies">
                        <SingleFieldList linkType="show" >
                            <ChipField source="name" />
                        </SingleFieldList>
                    </ReferenceArrayField>
                </SimpleShowLayout>
            )}

            {references.services.length > 0 && (
                <SimpleShowLayout>
                    {/* <Labeled label="Services"> */}
                    <ReferenceArrayField record={references} source="services" reference="services" label="Referenced in Services">
                        <SingleFieldList linkType="show" >
                            <ChipField source="name" />
                        </SingleFieldList>
                    </ReferenceArrayField>
                    {/* </Labeled> */}
                </SimpleShowLayout>
            )}
        </>
    );
};



export const ServiceShow = () => {
    const { id } = useParams();
    const refresh = useRefresh();
    const notify = useNotify();
    return (
        <Show actions={<ServiceShowActions />}>
            <SimpleShowLayout >
                <TextField source="name" />
            </SimpleShowLayout>
            <SimpleShowLayout direction="row">
                <DateField source="created_at" />
                <DateField source="updated_at" />
            </SimpleShowLayout>


            <SimpleShowLayout >
                <ArrayField source="entries">
                    <Datagrid bulkActionButtons={false} rowClick={false}>
                        <TextField source="protocol" />
                        <TextField source="port" />
                        <ReferenceField source="nested_service_id" reference="services" />
                    </Datagrid>
                </ArrayField>
            </SimpleShowLayout>


            <ServiceUsageReferences />


        </Show>
    );
}


// export const ServiceEntryEdit = () => {
//     const { id, addressId } = useParams();
//     return (
//         <Edit resource={"services/" + id + "/entries"} id={addressId} redirect={"/services/" + id + "/show"} mutationMode='pessimistic'>
//             <SimpleForm>
//                 <TextInput source="protocol" />
//                 <TextInput source="port" />
//                 <ReferenceInput source="nested_service_id" reference="services" />
//             </SimpleForm>
//         </Edit >
//     );
// };