
import AddIcon from '@mui/icons-material/Add';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckIcon from '@mui/icons-material/Check';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import HistoryIcon from '@mui/icons-material/History';
import { Box, DialogContent, Tooltip, Typography } from "@mui/material";
import React, { useEffect, useState } from 'react';
import { ArrayField, ArrayInput, AutocompleteArrayInput, AutocompleteInput, BooleanField, BooleanInput, BulkDeleteButton, Button, ButtonProps, ChipField, Create, Datagrid, DateField, DateInput, DeleteButton, Edit, EditButton, Form, IconButtonWithTooltip, InfiniteList, Link, ReferenceArrayField, ReferenceArrayInput, ReferenceField, ReferenceInput, required, SelectField, SelectInput, Show, ShowButton, SimpleForm, SimpleFormIterator, SimpleShowLayout, SingleFieldList, TextField, TextInput, TopToolbar, useDataProvider, useNotify, useRecordContext, useRefresh, useResourceContext, useSimpleFormIterator } from 'react-admin';

import { ActionChip, ColoredBooleanField, DefaultPagination, ReferenceNetworks, ReferenceServices } from '../shared/Shared';

import { useSimpleFormIteratorItem } from 'react-admin';
import { useLocation, useParams } from "react-router-dom";

import AppBar from '@mui/material/AppBar';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';

const PolicyBulkActionButtons = () => (
    <>
        <BulkDeleteButton mutationMode='pessimistic' />
    </>
);

export const PolicyList = () => (
    <InfiniteList perPage={25} filters={PolicyListFilters} sort={{ field: 'name', order: 'ASC' }} pagination={<DefaultPagination />} >
        <Datagrid bulkActionButtons={<PolicyBulkActionButtons />}>
            <TextField source="name" />
            <TextField source="comment" />
            <BooleanField source="edited" label="Synchronized" valueLabelTrue="No" valueLabelFalse="Yes" TrueIcon={CloseIcon} FalseIcon={CheckIcon} />
            <DateField source="created_at" />
            <DateField source="updated_at" />
        </Datagrid>
    </InfiniteList >
);


import {
    FormDataConsumer,
    useSourceContext
} from "react-admin";
import { useFormContext } from "react-hook-form";

const RowEditButton = React.forwardRef<HTMLButtonElement, { onClick: () => void }>(
    ({ onClick }, ref) => (
        <Button ref={ref} onClick={onClick}>
            Edit
        </Button>
    )
);

import clsx from 'clsx';
const TermsAddButton = (props: ButtonProps) => {
    const { source } = useSimpleFormIterator();
    const { getValues, setValue } = useFormContext();
    const { className } = props;
    return (
        <IconButtonWithTooltip onClick={() => {
            const terms = getValues("terms")
            const newTerms = [...terms]
            newTerms.push({})
            setValue("terms", newTerms)
        }}
            size='small'
            color="primary"
            label={"Add row"}
            className={clsx(`button-add button-add-${source}`, className)}
        >
            <AddIcon
                fontSize="small" />
        </IconButtonWithTooltip >
    );
};


const RowEditor = () => {
    const { formState: { errors }, clearErrors, getValues, setValue } = useFormContext();
    const { index } = useSimpleFormIteratorItem();
    const sourceContext = useSourceContext();
    const record = getValues(`terms.[${index}]`)

    // From state open the row conditionally
    const location = useLocation();
    const { openArrayItem, termName } = location.state || {};

    const shouldOpen = openArrayItem && (termName == record?.name)

    const [open, setOpen] = React.useState(shouldOpen);

    const [localValues, setLocalValues] = useState<Record<string, any>>({});

    const handleLocalChange = (field: string, event: any) => {
        let value: any;

        if (Array.isArray(event)) {
            value = event;
        } else if (Number.isInteger(event)) {
            value = event;
        } else if ("checked" in (event?.target ?? {}) && event?.target?.value === "on") {
            value = event?.target?.checked;
        } else {
            value = event?.target?.value ?? null;
        }

        setLocalValues(prev => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSave = () => {
        Object.entries(localValues).forEach(([field, value]) => {
            setValue(sourceContext.getSource(field), value, { shouldValidate: true, shouldDirty: true });
            clearErrors(sourceContext.getSource(field));
        });
        setOpen(false);
    };




    return (
        <>
            <RowEditButton onClick={() => setOpen(true)} />

            <Dialog fullScreen open={open} onClose={() => setOpen(false)} fullWidth>
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={() => setOpen(false)}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Edit Term
                        </Typography>
                        <Button autoFocus color="inherit" onClick={() => handleSave()}>
                            Save
                        </Button>
                    </Toolbar>
                </AppBar>
                <DialogContent>
                    <Form record={record} noValidate onSubmit={() => { }}>
                        <TextInput
                            source={`name`}
                            fullWidth
                            onChange={(e) => handleLocalChange("name", e)}
                            helperText={errors?.terms?.[index]?.name?.message}
                            sx={{
                                '& .MuiFormHelperText-root, & label': {
                                    color: errors?.terms?.[index]?.name ? 'error.main' : undefined
                                }
                            }}
                        />
                        <TextInput
                            source={`comment`}
                            fullWidth
                            onChange={(e) => handleLocalChange("comment", e)}
                            helperText={errors?.terms?.[index]?.comment?.message}
                            sx={{
                                '& .MuiFormHelperText-root, & label': {
                                    color: errors?.terms?.[index]?.comment ? 'error.main' : undefined
                                }
                            }}
                        />
                        <TextInput
                            source={`owner`}
                            fullWidth={false}
                            onChange={(e) => handleLocalChange("owner", e)}
                            helperText={errors?.terms?.[index]?.owner?.message}
                            sx={{
                                '& .MuiFormHelperText-root, & label': {
                                    color: errors?.terms?.[index]?.owner ? 'error.main' : undefined
                                }
                            }}
                        />
                        <Typography variant="h6" gutterBottom>
                            Networks
                        </Typography>
                        <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
                            <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                                <ReferenceArrayInput
                                    source="source_networks"
                                    reference="networks"
                                >
                                    <AutocompleteArrayInput
                                        onChange={(e) => {
                                            console.log(e);
                                            handleLocalChange("source_networks", e)
                                        }}
                                        helperText={errors?.terms?.[index]?.source_networks?.message}
                                        sx={{

                                            '& .MuiFormHelperText-root, & label': {
                                                color: errors?.terms?.[index]?.source_networks ? 'error.main' : undefined
                                            }
                                        }}
                                    />
                                </ReferenceArrayInput>
                            </Box>
                            <Box flex={0.2} ml={{ xs: 0, sm: '0.5em' }}>
                                <BooleanInput
                                    source="negate_source_networks"
                                    label="Negate source"
                                    onChange={(e) => handleLocalChange("negate_source_networks", e)}
                                    helperText={errors?.terms?.[index]?.negate_source_networks?.message}
                                    sx={{

                                        '& .MuiFormHelperText-root, & label': {
                                            color: errors?.terms?.[index]?.negate_source_networks ? 'error.main' : undefined
                                        }
                                    }}
                                />
                            </Box>
                        </Box>
                        <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
                            <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                                <ReferenceArrayInput
                                    source="destination_networks"
                                    reference="networks"
                                >
                                    <AutocompleteArrayInput
                                        onChange={(e) => { console.log(e); handleLocalChange("destination_networks", e) }}
                                        helperText={errors?.terms?.[index]?.destination_networks?.message}
                                        sx={{

                                            '& .MuiFormHelperText-root, & label': {
                                                color: errors?.terms?.[index]?.destination_networks ? 'error.main' : undefined
                                            }
                                        }}
                                    />
                                </ReferenceArrayInput>
                            </Box>
                            <Box flex={0.2} ml={{ xs: 0, sm: '0.5em' }}>
                                <BooleanInput
                                    source="negate_destination_networks"
                                    label="Negate destination"
                                    onChange={(e) => handleLocalChange("negate_destination_networks", e)}
                                    helperText={errors?.terms?.[index]?.negate_destination_networks?.message}
                                    sx={{

                                        '& .MuiFormHelperText-root, & label': {
                                            color: errors?.terms?.[index]?.negate_destination_networks ? 'error.main' : undefined
                                        }
                                    }}
                                />
                            </Box>
                        </Box>
                        <Typography variant="h6" gutterBottom>
                            Services
                        </Typography>
                        <ReferenceArrayInput
                            source="source_services"
                            reference="services"
                        >
                            <AutocompleteArrayInput
                                onChange={(e) => { console.log(e); handleLocalChange("source_services", e) }}
                                helperText={errors?.terms?.[index]?.source_services?.message}
                                sx={{

                                    '& .MuiFormHelperText-root, & label': {
                                        color: errors?.terms?.[index]?.source_services ? 'error.main' : undefined
                                    }
                                }}
                            />
                        </ReferenceArrayInput>
                        <ReferenceArrayInput
                            source="destination_services"
                            reference="services"
                        >
                            <AutocompleteArrayInput
                                onChange={(e) => { console.log(e); handleLocalChange("destination_services", e) }}
                                helperText={errors?.terms?.[index]?.destination_services?.message}
                                sx={{

                                    '& .MuiFormHelperText-root, & label': {
                                        color: errors?.terms?.[index]?.destination_services ? 'error.main' : undefined
                                    }
                                }}
                            />
                        </ReferenceArrayInput>
                        <Typography variant="h6" gutterBottom>
                            Options
                        </Typography>
                        <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
                            <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                                <SelectInput
                                    source="option"
                                    choices={[
                                        { id: 'established', name: 'Established' },
                                        { id: 'is-fragment', name: 'Is Fragment' },
                                        { id: 'tcp-established', name: 'TCP Established' },
                                        { id: 'tcp-initial', name: 'TCP Initial' }
                                    ]}
                                    resettable
                                    onChange={(e) => handleLocalChange("option", e)}
                                    helperText={errors?.terms?.[index]?.option?.message}
                                    sx={{
                                        '& .MuiFormHelperText-root, & label': {
                                            color: errors?.terms?.[index]?.nested_policy_id ? 'error.main' : undefined
                                        }
                                    }}
                                />
                            </Box>
                            <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>

                                <SelectInput
                                    source="action"
                                    choices={[
                                        { id: 'accept', name: 'Accept' },
                                        { id: 'deny', name: 'Deny' },
                                        { id: 'reject', name: 'Reject' },
                                    ]}
                                    optionText={<ActionChip />}
                                    resettable
                                    onChange={(e) => handleLocalChange("action", e)}
                                    helperText={errors?.terms?.[index]?.action?.message}
                                    sx={{
                                        '& .MuiFormHelperText-root, & label': {
                                            color: errors?.terms?.[index]?.action ? 'error.main' : undefined
                                        }
                                    }}
                                />
                            </Box>
                            <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                                <DateInput
                                    source="expiration"
                                    onChange={(e) => handleLocalChange("expiration", e)}
                                    helperText={errors?.terms?.[index]?.expiration?.message}
                                    sx={{
                                        '& .MuiFormHelperText-root, & label': {
                                            color: errors?.terms?.[index]?.expiration ? 'error.main' : undefined
                                        }
                                    }}
                                />
                            </Box>
                        </Box>
                        <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
                            <BooleanInput
                                source="enabled"
                                onChange={(e) => handleLocalChange("enabled", e)}
                                helperText={errors?.terms?.[index]?.enabled?.message}
                                sx={{
                                    '& .MuiFormHelperText-root, & label': {
                                        color: errors?.terms?.[index]?.enabled ? 'error.main' : undefined
                                    }
                                }}
                            />
                            <BooleanInput
                                source="logging"
                                onChange={(e) => handleLocalChange("logging", e)}
                                helperText={errors?.terms?.[index]?.logging?.message}
                                sx={{
                                    '& .MuiFormHelperText-root, & label': {
                                        color: errors?.terms?.[index]?.logging ? 'error.main' : undefined
                                    }
                                }}
                            />
                        </Box>
                        <Typography variant="h6" gutterBottom>
                            Nested Policy
                        </Typography>
                        <ReferenceInput
                            source="nested_policy_id"
                            reference="policies"
                        >
                            <AutocompleteInput
                                label="Nested Policy"
                                onChange={(e) => handleLocalChange("nested_policy_id", e)}
                                helperText={errors?.terms?.[index]?.nested_policy_id?.message}
                                sx={{
                                    '& .MuiFormHelperText-root, & label': {
                                        color: errors?.terms?.[index]?.nested_policy_id ? 'error.main' : undefined
                                    }
                                }}
                            />
                        </ReferenceInput>
                    </Form>
                </DialogContent >
            </Dialog >
        </>
    );
};


const DraggableRow = () => {
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
    const [hoverIndex, setHoverIndex] = useState<number | null>(null);
    const { formState: { errors }, getValues, setValue } = useFormContext();
    const { index } = useSimpleFormIteratorItem();

    const rowErrors = errors?.terms?.[index];
    const hasError = !!rowErrors && Object.keys(rowErrors).length > 0;

    const handleDragStart = (e: React.DragEvent) => {
        setDraggedIndex(index);
        e.dataTransfer.setData("text/plain", index.toString());
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        const fromIndex = parseInt(e.dataTransfer.getData("text/plain"), 10);
        if (!isNaN(fromIndex) && fromIndex !== index) {
            const values = getValues("terms");
            const newArray = [...values];
            const [moved] = newArray.splice(fromIndex, 1);
            newArray.splice(index, 0, moved);
            setValue("terms", newArray, { shouldDirty: true });
        }
        setDraggedIndex(null);
        setHoverIndex(null);
    };
    const handleDragLeave = () => {
        setHoverIndex(null);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setHoverIndex(index);
    };

    return (
        <Box
            draggable
            onDragStart={handleDragStart}
            onDrop={handleDrop}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                p: 1,
                borderRadius: 1,
                mb: 1,
                cursor: "grab",
                width: "100%",
                position: "relative",
                border: hasError ? "1px solid red" : "1px solid transparent",
                backgroundColor:
                    hoverIndex === index && draggedIndex !== index
                        ? "rgba(255,255,255,0.08)" // highlight hover
                        : "transparent",
            }}
        >
            {/* Optional: Drop indicator line above the row */}
            {hoverIndex === index && draggedIndex !== index && (
                <Box
                    sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: 2,
                        backgroundColor: "primary.main",
                    }}
                />
            )}

            <FormDataConsumer>
                {({ scopedFormData }) => (
                    <>
                        <Tooltip title="Name">
                            <Typography>{scopedFormData?.name || 'Empty'}</Typography>
                        </Tooltip>
                        <Tooltip title="Comment">
                            <Typography>{scopedFormData?.comment}</Typography>
                        </Tooltip>
                        {!scopedFormData?.nested_policy_id && (
                            <>
                                <Tooltip title="Source Networks">
                                    <Typography>{(scopedFormData?.negate_source_networks ? 'Not ' : '') + (scopedFormData?.source_networks ? scopedFormData?.source_networks.length + ' networks' : 'Any')}</Typography>
                                </Tooltip>
                                <Tooltip title="Destination Networks">
                                    <Typography>{(scopedFormData?.negate_destination_networks ? 'Not ' : '') + (scopedFormData?.destination_networks ? scopedFormData?.destination_networks.length + ' networks' : 'Any')}</Typography>
                                </Tooltip>
                                <Tooltip title="Source Services">
                                    <Typography>{scopedFormData?.source_services ? scopedFormData?.source_services.length + ' services' : 'Any'}</Typography>
                                </Tooltip>
                                <Tooltip title="Destination Services">
                                    <Typography>{scopedFormData?.destination_services ? scopedFormData?.destination_services.length + ' services' : 'Any'}</Typography>
                                </Tooltip>
                                <Tooltip title="Option">
                                    <Typography sx={{ textTransform: 'capitalize' }}>{scopedFormData?.option}</Typography>
                                </Tooltip>
                                <Tooltip title="Action">
                                    <Typography sx={{ textTransform: 'capitalize' }}>{scopedFormData?.action}</Typography>
                                </Tooltip>
                                <Tooltip title="Logging">
                                    {
                                        (Object.keys(scopedFormData).includes('logging') && scopedFormData?.logging) ?
                                            <CheckCircleIcon color='success' /> : <CancelIcon color='error' />
                                    }
                                </Tooltip>
                            </>
                        )}

                        {scopedFormData?.nested_policy_id && (
                            <ReferenceField source="nested_policy_id" reference="policies" link="show" />
                        )}


                        <Tooltip title="Enabled">
                            {
                                (Object.keys(scopedFormData).includes('enabled') && scopedFormData?.enabled) ?
                                    <CheckCircleIcon color='success' /> : <CancelIcon color='error' />
                            }
                        </Tooltip>
                    </>
                )}
            </FormDataConsumer>
            <RowEditor />
        </Box >
    );
};

export const PolicyEdit = () => (
    <Edit redirect="show" mutationMode='pessimistic'>
        <SimpleForm>
            <TextInput source="name" validate={required()} />
            <TextInput source="comment" />
            <TextInput source="custom_aerleon_header" label="Custom Aerleon Header" />
            <ReferenceArrayInput source="targets" reference='targets' />
            <ReferenceArrayInput source="tests" reference='tests' />

            <ArrayInput source="terms" >
                <SimpleFormIterator
                    inline
                    disableReordering
                    addButton={<TermsAddButton
                    />}
                >
                    <DraggableRow />
                </SimpleFormIterator>
            </ArrayInput>
        </SimpleForm>
    </Edit >
);

export const PolicyCreate = () => (
    <Create redirect="show">
        <SimpleForm>
            <TextInput source="name" validate={required()} />
            {/* <TextInput source="comment" /> */}
            <TextInput source="custom_aerleon_header" label="Custom Aerleon Header" />
            <ReferenceArrayInput source="targets" reference='targets' />
            <ReferenceArrayInput source="tests" reference='tests' />

            <ArrayInput source="terms" >
                <SimpleFormIterator
                    inline
                    disableReordering
                    addButton={<TermsAddButton />}
                >
                    <DraggableRow />
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
    <BooleanInput source="edited" label="Synchronized" format={(value) => !value} parse={(value) => !value} />
];

const PolicyTermExpandPanel = () => {
    const record = useRecordContext();
    if (!record) return;
    return (
        <SimpleShowLayout direction="row">
            <TextField source="comment" />
            <TextField source="owner" />
            <DateField source="expiration" locales="sv-SE" />
        </SimpleShowLayout>
    );
};


export const EditButtonWithState = () => {
    const record = useRecordContext();
    const resource = useResourceContext();

    if (!record) return null;

    return (

        <Button
            component={Link}
            to={`/${resource}/${record?.policy_id}`}
            startIcon={<EditIcon />}
            state={{
                openArrayItem: true,
                termName: record?.name
            }}
            label="Edit"
        >
            <EditIcon />
        </Button>
    );
};


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
                        <SingleFieldList linkType="show" >
                            <ChipField source="name" />
                        </SingleFieldList>
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

            <SimpleShowLayout direction="row">
                <TextField source="name" />
                <TextField source="comment" />
            </SimpleShowLayout>
            <SimpleShowLayout direction="row">
                <DateField source="created_at" />
                <DateField source="updated_at" />
            </SimpleShowLayout>
            <SimpleShowLayout direction="row">
                <BooleanField source="edited" label="Synchronized" valueLabelTrue="no" valueLabelFalse="Yes" TrueIcon={CloseIcon} FalseIcon={CheckIcon} />
                <TextField source="custom_aerleon_header" label="Custom Aerleon Header" />
            </SimpleShowLayout>

            <SimpleShowLayout direction="row">
                <ReferenceArrayField source="targets" reference='targets' label="Connected Targets">
                    <SingleFieldList linkType="show" >
                        <ChipField source="name" />
                    </SingleFieldList>
                </ReferenceArrayField>
                <ReferenceArrayField source="tests" reference='tests' label="Connected Tests" >
                    <SingleFieldList linkType="show" >
                        <ChipField source="name" />
                    </SingleFieldList>
                </ReferenceArrayField>
            </SimpleShowLayout>

            <SimpleShowLayout >
                <ArrayField source="terms">
                    <Datagrid bulkActionButtons={false} rowClick={false} empty={<CustomTermEmpty />} expand={PolicyTermExpandPanel} expandSingle>
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
                        <EditButtonWithState />
                    </Datagrid>
                </ArrayField>
            </SimpleShowLayout >
            <PolicyUsageReferences />
        </Show >
    );
}
