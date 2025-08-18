
import { ArrayField, ArrayInput, AutocompleteArrayInput, AutocompleteInput, BooleanInput, BulkDeleteButton, Button, ButtonProps, ChipField, Create, Datagrid, DateField, DeleteButton, Edit, EditButton, Form, IconButtonWithTooltip, InfiniteList, Link, ReferenceArrayField, ReferenceArrayInput, ReferenceField, ReferenceInput, required, SelectField, SelectInput, Show, ShowButton, SimpleForm, SimpleFormIterator, SimpleShowLayout, SingleFieldList, TextField, TextInput, TopToolbar, useDataProvider, useNotify, useRefresh, useSimpleFormIterator } from 'react-admin';

import AddIcon from '@mui/icons-material/Add';
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';
import HistoryIcon from '@mui/icons-material/History';
import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from 'react';

import { ActionChip, ColoredBooleanField, DefaultPagination, ReferenceNetworks, ReferenceServices } from '../shared/Shared';

import { useSimpleFormIteratorItem } from 'react-admin';
import { useParams } from "react-router-dom";


const PolicyBulkActionButtons = () => (
    <>
        <BulkDeleteButton mutationMode='pessimistic' />
    </>
);

export const PolicyList = () => (
    <InfiniteList filters={PolicyListFilters} sort={{ field: 'name', order: 'ASC' }} pagination={<DefaultPagination />} >
        <Datagrid bulkActionButtons={<PolicyBulkActionButtons />}>
            <TextField source="name" />
            <DateField source="created_at" />
            <DateField source="updated_at" />
        </Datagrid>
    </InfiniteList >
);


import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle
} from "@mui/material";
import {
    FormDataConsumer,
    useSourceContext
} from "react-admin";
import { useFormContext, useFormState } from "react-hook-form";

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
    const { isDirty } = useFormState();
    const { formState: { errors }, clearErrors, getValues, setValue } = useFormContext();
    const { index } = useSimpleFormIteratorItem();
    const sourceContext = useSourceContext();
    const [open, setOpen] = React.useState(false);


    const handleSave = (field: string, event: any) => {

        var value = ""
        if (Array.isArray(event)) {
            value = event
        }
        else if (Number.isInteger(event)) {
            value = event
        }
        else if ("checked" in (event?.target ?? {}) && event?.target?.value == "on") {
            value = event?.target?.checked
        } else {
            value = event?.target?.value ?? null;
        }

        setValue(sourceContext.getSource(field), value, { shouldValidate: true, shouldDirty: true });
        clearErrors(sourceContext.getSource(field))
    };
    const record = getValues(`terms.[${index}]`)


    return (
        <>
            <RowEditButton onClick={() => setOpen(true)} />

            <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
                <DialogTitle>Edit</DialogTitle>
                <DialogContent>
                    <Form record={record} noValidate onSubmit={() => { }}>
                        <TextInput
                            source={`name`}
                            fullWidth
                            onChange={(e) => handleSave("name", e)}
                            helperText={errors?.terms?.[index]?.name?.message}
                            sx={{
                                '& .MuiFormHelperText-root, & label': {
                                    color: errors?.terms?.[index]?.name ? 'error.main' : undefined
                                }
                            }}
                        />

                        <BooleanInput
                            source="enabled"
                            onChange={(e) => handleSave("enabled", e)}
                            helperText={errors?.terms?.[index]?.enabled?.message}
                            sx={{
                                '& .MuiFormHelperText-root, & label': {
                                    color: errors?.terms?.[index]?.enabled ? 'error.main' : undefined
                                }
                            }}
                        />

                        <BooleanInput
                            source="logging"
                            onChange={(e) => handleSave("logging", e)}
                            helperText={errors?.terms?.[index]?.logging?.message}
                            sx={{
                                '& .MuiFormHelperText-root, & label': {
                                    color: errors?.terms?.[index]?.logging ? 'error.main' : undefined
                                }
                            }}
                        />

                        <ReferenceInput
                            source="nested_policy_id"
                            reference="policies"
                        >
                            <AutocompleteInput
                                label="Nested Policy"
                                onChange={(e) => handleSave("nested_policy_id", e)}
                                helperText={errors?.terms?.[index]?.nested_policy_id?.message}
                                sx={{
                                    '& .MuiFormHelperText-root, & label': {
                                        color: errors?.terms?.[index]?.nested_policy_id ? 'error.main' : undefined
                                    }
                                }}
                            />
                        </ReferenceInput>

                        <SelectInput
                            source="option"
                            choices={[
                                { id: 'established', name: 'Established' },
                                { id: 'is-fragment', name: 'Is Fragment' },
                                { id: 'tcp-established', name: 'TCP Established' },
                                { id: 'tcp-initial', name: 'TCP Initial' }
                            ]}
                            resettable
                            onChange={(e) => handleSave("option", e)}
                            helperText={errors?.terms?.[index]?.option?.message}
                            sx={{
                                '& .MuiFormHelperText-root, & label': {
                                    color: errors?.terms?.[index]?.nested_policy_id ? 'error.main' : undefined
                                }
                            }}
                        />

                        <SelectInput
                            source="action"
                            choices={[
                                { id: 'accept', name: 'Accept' },
                                { id: 'deny', name: 'Deny' },
                                { id: 'reject', name: 'Reject' },
                            ]}
                            optionText={<ActionChip />}
                            resettable
                            onChange={(e) => handleSave("action", e)}
                            helperText={errors?.terms?.[index]?.action?.message}
                            sx={{
                                '& .MuiFormHelperText-root, & label': {
                                    color: errors?.terms?.[index]?.action ? 'error.main' : undefined
                                }
                            }}
                        />

                        <ReferenceArrayInput
                            source="source_networks"
                            reference="networks"
                        >
                            <AutocompleteArrayInput
                                onChange={(e) => {
                                    console.log(e);
                                    handleSave("source_networks", e)
                                }}
                                helperText={errors?.terms?.[index]?.source_networks?.message}
                                sx={{

                                    '& .MuiFormHelperText-root, & label': {
                                        color: errors?.terms?.[index]?.source_networks ? 'error.main' : undefined
                                    }
                                }}
                            />
                        </ReferenceArrayInput>

                        <BooleanInput
                            source="negate_source_networks"
                            label="Negate source"
                            onChange={(e) => handleSave("negate_source_networks", e)}
                            helperText={errors?.terms?.[index]?.negate_source_networks?.message}
                            sx={{

                                '& .MuiFormHelperText-root, & label': {
                                    color: errors?.terms?.[index]?.negate_source_networks ? 'error.main' : undefined
                                }
                            }}
                        />

                        <ReferenceArrayInput
                            source="destination_networks"
                            reference="networks"
                        >
                            <AutocompleteArrayInput
                                onChange={(e) => { console.log(e); handleSave("destination_networks", e) }}
                                helperText={errors?.terms?.[index]?.destination_networks?.message}
                                sx={{

                                    '& .MuiFormHelperText-root, & label': {
                                        color: errors?.terms?.[index]?.destination_networks ? 'error.main' : undefined
                                    }
                                }}
                            />
                        </ReferenceArrayInput>

                        <BooleanInput
                            source="negate_destination_networks"
                            label="Negate destination"
                            onChange={(e) => handleSave("negate_destination_networks", e)}
                            helperText={errors?.terms?.[index]?.negate_destination_networks?.message}
                            sx={{

                                '& .MuiFormHelperText-root, & label': {
                                    color: errors?.terms?.[index]?.negate_destination_networks ? 'error.main' : undefined
                                }
                            }}
                        />

                        <ReferenceArrayInput
                            source="source_services"
                            reference="services"
                        >
                            <AutocompleteArrayInput
                                onChange={(e) => { console.log(e); handleSave("source_services", e) }}
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
                                onChange={(e) => { console.log(e); handleSave("destination_services", e) }}
                                helperText={errors?.terms?.[index]?.destination_services?.message}
                                sx={{

                                    '& .MuiFormHelperText-root, & label': {
                                        color: errors?.terms?.[index]?.destination_services ? 'error.main' : undefined
                                    }
                                }}
                            />
                        </ReferenceArrayInput>
                    </Form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Close</Button>
                </DialogActions>
            </Dialog>
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
                // border: "1px solid",
                // borderColor: "divider",
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
                    <Typography>{scopedFormData?.name || 'Empty'}</Typography>
                )}
            </FormDataConsumer>
            <RowEditor />
        </Box>
    );
};

export const PolicyEdit = () => (
    <Edit redirect="show" mutationMode='pessimistic'>
        <SimpleForm>
            <TextInput source="name" validate={required()} />
            <TextInput source="comment" />
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
            <TextInput source="comment" />
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
];



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

const CustomTermEmpty = () => <div>No terms found</div>;



export const PolicyShow = () => {
    const { id } = useParams();

    const refresh = useRefresh();
    const notify = useNotify();

    return (
        <Show actions={<PolicyShowActions />}>

            <SimpleShowLayout>
                <TextField source="name" />
                <TextField source="comment" />
            </SimpleShowLayout>
            <SimpleShowLayout direction="row">
                <DateField source="created_at" />
                <DateField source="updated_at" />
            </SimpleShowLayout>


            <SimpleShowLayout >
                <ReferenceArrayField source="targets" reference='targets' label="Connected Targets">
                    <SingleFieldList linkType="show" >
                        <ChipField source="name" />
                    </SingleFieldList>
                </ReferenceArrayField>
            </SimpleShowLayout>

            <SimpleShowLayout >
                <ReferenceArrayField source="tests" reference='tests' label="Connected Tests" >
                    <SingleFieldList linkType="show" >
                        <ChipField source="name" />
                    </SingleFieldList>
                </ReferenceArrayField>
            </SimpleShowLayout>

            <SimpleShowLayout >
                <ArrayField source="terms">
                    <Datagrid bulkActionButtons={false} rowClick={false} empty={<CustomTermEmpty />} >
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
                    </Datagrid>
                </ArrayField>
            </SimpleShowLayout >
            <PolicyUsageReferences />
        </Show >
    );
}
