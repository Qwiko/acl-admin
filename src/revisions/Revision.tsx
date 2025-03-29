
import { BulkDeleteButton, Create, Datagrid, DateField, DeleteButton, Edit, EditButton, List, ReferenceArrayInput, ReferenceField, ReferenceInput, required, SelectArrayInput, SimpleForm, TextField, TextInput, TopToolbar, useRecordContext } from 'react-admin';


import { Show, SimpleShowLayout } from 'react-admin';


import AddIcon from '@mui/icons-material/Add';


import { RevisionCompare } from './RevisionCompare';

const RevisionBulkActionButtons = () => (
    <>
        <BulkDeleteButton mutationMode='pessimistic' />
    </>
);

const RevisionFilters = [
    <TextInput label="Search" source="q" alwaysOn />,
    <ReferenceArrayInput source="policy_id" reference='policies' alwaysOn />,
    <ReferenceArrayInput source="dynamic_policy_id" reference='dynamic_policies' alwaysOn />,
    // <ReferenceArrayInput source="targets__id__in" reference='targets' label="Targets" />,
];

export const RevisionList = () => {
    return (

        <List filters={RevisionFilters} sort={{ field: 'created_at', order: 'DESC' }} >
            <Datagrid bulkActionButtons={<RevisionBulkActionButtons />}>
                <TextField source="comment" />
                <DateField source="created_at" />
                <DateField source="updated_at" />
                <ReferenceField source="dynamic_policy_id" reference="dynamic_policies" />
                <ReferenceField source="policy_id" reference="policies" />
            </Datagrid>
        </List>
    )
}



export const RevisionCreate = () => {
    return (
        <Create redirect="show" >
            <SimpleForm>
                <ReferenceInput source="dynamic_policy_id" reference='dynamic_policies' />
                <ReferenceInput source="policy_id" reference='policies' />
                <TextInput source="comment" validate={required()} />
            </SimpleForm>
        </Create>
    )
}

export const RevisionEdit = () => {
    return (
        <Edit redirect="show" mutationMode='pessimistic'>
            <SimpleForm>
                <TextInput source="comment" validate={required()} />
            </SimpleForm>
        </Edit>
    )
}

const RevisionShowActions = () => {
    return (
        <TopToolbar>
            <EditButton />
            <DeleteButton mutationMode={'pessimistic'} />
        </TopToolbar>
    );
}

const DpShow = () => {
    const record = useRecordContext();
    if (!record) return null;
    return (<SimpleShowLayout>
        {record.dynamic_policy_id &&
            <ReferenceField source="dynamic_policy_id" reference="dynamic_policies" />
        }
        {record.policy_id &&
            <ReferenceField source="policy_id" reference="policies" />
        }
    </SimpleShowLayout>)
}

export const RevisionShow = () => {
    return (
        <Show actions={<RevisionShowActions />}>
            <SimpleShowLayout>
                <TextField source="comment" />
            </SimpleShowLayout>
            <DpShow />
            <RevisionCompare />
        </Show>
    );
}