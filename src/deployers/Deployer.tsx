
import { BulkDeleteButton, Create, Datagrid, DateField, Edit, EditButton, NumberInput, required, SelectField, SelectInput, SimpleForm, TextField, TextInput, useRecordContext } from 'react-admin';


import { InfiniteList, ReferenceField, ReferenceInput, Show, SimpleShowLayout } from 'react-admin';


import { Typography } from '@mui/material';
import { DeleteButton, FormDataConsumer, TopToolbar } from 'react-admin';
import { useParams } from 'react-router-dom';
import { DefaultPagination } from '../shared/Shared';

const DeployerFilters = [
    <TextInput label="Search" source="q" alwaysOn />,
    <ReferenceInput source="target_id" reference='targets' resettable />,
    <SelectInput source="mode" choices={[
        { id: 'netmiko', name: 'Netmiko' },
        { id: 'git', name: 'Git' },
        { id: 'http', name: 'HTTP' },
        { id: 'custom', name: 'Custom' }
    ]} resettable />
    // <ReferenceField source="target" reference='targets' />
];


const DeployerBulkActionButtons = () => (
    <>
        <BulkDeleteButton mutationMode='pessimistic' />
    </>
);

export const DeployerList = () => (
    <InfiniteList perPage={25} filters={DeployerFilters} pagination={<DefaultPagination />} >
        <Datagrid bulkActionButtons={<DeployerBulkActionButtons />}>
            <TextField source="name" />
            <ReferenceField source="target" reference='targets' />
            <SelectField source="mode" choices={[
                { id: 'netmiko', name: 'Netmiko' },
                { id: 'git', name: 'Git' },
                { id: 'http', name: 'HTTP' },
                { id: 'custom', name: 'Custom' }
            ]} />
            <DateField source="created_at" />
            <DateField source="updated_at" />
            {/* <EditButton />
            <ShowButton /> */}
        </Datagrid>
    </InfiniteList>
);

export const DeployerCreate = () => {
    const transform = (data) => {
        var send_data = {
            name: data.name,
            target: data.target,
            mode: data.mode,
        }
        if (data.mode == "netmiko") {
            send_data = {
                ...send_data,
                config: {
                    host: data.host,
                    username: data.username,
                    port: data.port,
                    password_envvar: data.password_envvar,
                    enable_envvar: data.enable_envvar,
                    ssh_key_envvar: data.ssh_key_envvar,
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
                    ssh_key_envvar: data.ssh_key_envvar,
                    auth_token_envvar: data.auth_token_envvar,
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
                    { id: 'netmiko', name: 'Netmiko' },
                    { id: 'git', name: 'Git' },
                    { id: 'http', name: 'HTTP' },
                    { id: 'custom', name: 'Custom' }
                ]} />
                <FormDataConsumer<{ move: string }>>
                    {({ formData }) => formData.mode == "netmiko" &&
                        <><Typography variant="h6">Config</Typography>
                            <TextInput source="host" label="Host" />
                            <TextInput source="username" label="Username" />
                            <NumberInput source="port" label="Port" />
                            <TextInput source="password_envvar" label="Password Env var" />
                            <TextInput source="enable_envvar" label="Enable Password Env var" />
                            <TextInput source="ssh_key_envvar" label="SSH Key Env var" />
                        </>
                    }
                </FormDataConsumer>
                <FormDataConsumer<{ move: string }>>
                    {({ formData }) => formData.mode == "git" &&
                        <><Typography variant="h6">Config</Typography>
                            <TextInput source="repo_url" label="Repo URL" />
                            <TextInput source="branch" label="Branch" />
                            <TextInput source="folder_path" label="Folder Path" />
                            <TextInput source="ssh_key_envvar" label="SSH Key Env var" />
                            <TextInput source="auth_token_envvar" label="Auth Token " />

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

    if (record.mode == "netmiko") {
        return (
            <SimpleShowLayout>
                <TextField source="config.host" label="Host" />
                <TextField source="config.username" label="Username" />
                <TextField source="config.port" label="Port" />

                <TextField source="config.password_envvar" label="Password Environment variable" />
                <TextField source="config.enable_envvar" label="Enable Environment variable" />
                <TextField source="config.ssh_key_envvar" label="SSH Key Environment variable" />
            </SimpleShowLayout>
        );
    }
    else if (record.mode == "git") {
        return (
            <SimpleShowLayout>
                <TextField source="config.repo_url" label="Repo URL" />
                <TextField source="config.branch" label="Branch" />
                <TextField source="config.folder_path" label="Folder Path" />

                <TextField source="config.ssh_key_envvar" label="SSH Key Environment variable" />
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
