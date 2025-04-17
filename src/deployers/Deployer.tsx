
import { BulkDeleteButton, ChipField, Create, Datagrid, DateField, Edit, EditButton, NumberInput, ReferenceArrayField, ReferenceArrayInput, required, SelectArrayInput, SelectField, SelectInput, SimpleForm, SingleFieldList, TextField, TextInput, useRecordContext } from 'react-admin';


import { ReferenceField, ReferenceInput, Show, ShowButton, SimpleShowLayout } from 'react-admin';


import { useNotify, useRefresh, FormDataConsumer } from 'react-admin';
import { useParams } from 'react-router-dom';
import { DeleteButton, TopToolbar } from 'react-admin';
import { List } from 'react-admin';
import { Typography } from '@mui/material';
import { ClassNames } from '@emotion/react';
import { DefaultPagination } from '../shared/Shared';

const DeployerFilters = [
    <TextInput label="Search" source="q" alwaysOn />,
];


const DeployerBulkActionButtons = () => (
    <>
        <BulkDeleteButton mutationMode='pessimistic' />
    </>
);

export const DeployerList = () => (
    <List filters={DeployerFilters} pagination={<DefaultPagination />} >
        <Datagrid bulkActionButtons={<DeployerBulkActionButtons />}>
            <TextField source="name" />
            <DateField source="created_at" />
            <DateField source="updated_at" />
            <EditButton />
            <ShowButton />
        </Datagrid>
    </List>
);

export const DeployerCreate = () => {
    const transform = (data) => {
        var send_data = {
            name: data.name,
            target: data.target,
            mode: data.mode,
        }
        if (data.mode == "proxmox_nft") {
            send_data = {
                ...send_data,
                config: {
                    host: data.host,
                    username: data.username,
                    port: data.port,
                    password: data.password,
                    ssh_key: data.ssh_key,
                }
            }
        }
        else if (data.mode == "netmiko") {
            send_data = {
                ...send_data,
                config: {
                    host: data.host,
                    username: data.username,
                    port: data.port,
                    password: data.password,
                    enable: data.enable,
                    ssh_key: data.ssh_key,
                }
            }
        }
        else if (data.mode == "git") {
            send_data = {
                ...send_data,
                config: {
                    repo_url: data.repo_url,
                    branch: data.branch,
                    folder_path: data.folder_path,
                    ssh_key: data.ssh_key,
                    auth_token: data.auth_token,
                }
            }
        }
        return send_data;
    };
    return (
        <Create redirect="show" transform={transform} mutationMode='pessimistic'>
            <SimpleForm>
                <TextInput source="name" validate={required()} />
                <ReferenceInput source="target" reference='targets' />
                <SelectInput source="mode" choices={[
                    { id: 'proxmox_nft', name: 'Proxmox Nft' },
                    { id: 'netmiko', name: 'Netmiko' },
                    { id: 'git', name: 'Git' },
                    { id: 'http', name: 'HTTP' },
                    { id: 'custom', name: 'Custom' }
                ]} />
                <FormDataConsumer<{ move: string }>>
                    {({ formData }) => formData.mode == "proxmox_nft" &&
                        <><Typography variant="h6">Config</Typography>
                            <TextInput source="host" label="Host" />
                            <TextInput source="username" label="Username" />
                            <NumberInput source="port" label="Port" />
                            <TextInput source="password" label="Password" />

                            <TextInput source="ssh_key" multiline label="SSH Key" />
                        </>
                    }
                </FormDataConsumer>
                <FormDataConsumer<{ move: string }>>
                    {({ formData }) => formData.mode == "netmiko" &&
                        <><Typography variant="h6">Config</Typography>
                            <TextInput source="host" label="Host" />
                            <TextInput source="username" label="Username" />
                            <NumberInput source="port" label="Port" />
                            <TextInput source="password" label="Password" />
                            <TextInput source="enable" label="Enable Password" />
                            <TextInput source="ssh_key" multiline label="SSH Key" />
                        </>
                    }
                </FormDataConsumer>
                <FormDataConsumer<{ move: string }>>
                    {({ formData }) => formData.mode == "git" &&
                        <><Typography variant="h6">Config</Typography>
                            <TextInput source="repo_url" label="Repo URL" />
                            <TextInput source="branch" label="Branch" />
                            <TextInput source="folder_path" label="Folder Path" />
                            <TextInput source="ssh_key" multiline label="SSH Key" />
                            <TextInput source="auth_token" label="Auth Token" />

                        </>
                    }
                </FormDataConsumer>
            </SimpleForm>
        </Create>
    )
};

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


const DeployerInsideShow = () => {
    const { id } = useParams();
    const record = useRecordContext();
    if (!record) return null;

    if (record.mode == "proxmox_nft" || record.mode == "netmiko") {
        return (
            <SimpleShowLayout>
                <TextField source="config.host" label="Host" />
                <TextField source="config.username" label="Username" />
                <TextField source="config.port" label="Port" />
            </SimpleShowLayout>
        );
    }
    else if (record.mode == "git") {
        return (
            <SimpleShowLayout>
                <TextField source="config.repo_url" label="Repo URL" />
                <TextField source="config.branch" label="Branch" />
                <TextField source="config.folder_path" label="Folder Path" />

            </SimpleShowLayout>
        );
    }
    else if (record.mode == "http") {
        return (
            <SimpleShowLayout>
                <TextField source="config.url" label="URL" />
                <TextField source="config.method" label="Method" />
                <TextField source="config.headers" label="Headers" />
                <TextField source="config.body" label="Body" />
            </SimpleShowLayout>
        );
    }
    else if (record.mode == "custom") {
        return (
            <SimpleShowLayout>
                <TextField source="config.command" label="Command" />
                <TextField source="config.args" label="Args" />
                <TextField source="config.env" label="Env" />
            </SimpleShowLayout>
        );
    }
}

export const DeployerShow = () => {
    return (
        <Show actions={<DeployerShowActions />}>
            <SimpleShowLayout >
                <TextField source="name" />
                <SelectField source="mode" choices={[
                    { id: 'proxmox_nft', name: 'Proxmox Nft' },
                    { id: 'netmiko', name: 'Netmiko' },
                    { id: 'git', name: 'Git' },
                    { id: 'http', name: 'HTTP' },
                    { id: 'custom', name: 'Custom' }
                ]} />
            </SimpleShowLayout>
            <SimpleShowLayout direction="row">
                <DateField source="created_at" />
                <DateField source="updated_at" />
            </SimpleShowLayout>
            <SimpleShowLayout>
                <ReferenceField source="target" reference='targets' />
            </SimpleShowLayout>
            <DeployerInsideShow />

        </Show>
    );
}
