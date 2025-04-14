
import {
    BulkDeleteButton,
    Button,
    Confirm,
    Create, Datagrid, DateField, DeleteButton, Edit, EditButton, List, ReferenceArrayInput, ReferenceField, ReferenceInput, required, SimpleForm, TextField, TextInput, TopToolbar,
    useCreate,
    useRecordContext
} from 'react-admin';


import { Show, SimpleShowLayout } from 'react-admin';

import PublishIcon from '@mui/icons-material/Publish';


import { useState } from 'react';
import { useParams } from "react-router-dom";

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


const PublishRevisionButton = () => {
    const { id } = useParams();
    const record = useRecordContext();
    const [open, setOpen] = useState(false);

    const [create, { isPending, error }] = useCreate(`revisions/${id}/publish`, { data: { id: null } });

    const handleClick = () => setOpen(true);
    const handleDialogClose = () => setOpen(false);
    const handleConfirm = () => {
        create();
        setOpen(false);
    };

    return (
        <>
            <Button label="Publish" onClick={handleClick} >
                <PublishIcon />
            </Button>
            <Confirm
                isOpen={open}
                loading={isPending}
                title={`Publish revision #${record && record.id}`}
                content="Are you sure you want to publish this revision?"
                onConfirm={handleConfirm}
                onClose={handleDialogClose}
            />
        </>
    );
};



const RevisionShowActions = () => {
    return (
        <TopToolbar>
            <PublishRevisionButton />
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