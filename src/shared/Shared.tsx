import EditIcon from '@mui/icons-material/Edit';
import { Chip, DialogActions } from '@mui/material';
import { BooleanField, BooleanFieldProps, ChipField, ReferenceArrayField, ReferenceArrayFieldViewProps, SingleFieldList, useRecordContext, useResourceContext } from 'react-admin';

import { Button, Dialog, DialogContent, DialogTitle } from '@mui/material';
import React, { useState, cloneElement } from 'react';
import { useListContext, useNotify, useRefresh, useUpdate } from 'react-admin';


export const ColoredBooleanField = (props: BooleanFieldProps) => {
    const record = useRecordContext();
    if (!record) return;
    return (
        <BooleanField
            sx={{ color: record[props.source] === true ? 'green' : 'red' }}
            {...props}
        />
    );
};

export const ActionChip = () => {
    const record = useRecordContext();
    if (!record) return;
    var color;
    switch (record.id) {
        case "accept":
            color = "success"
            break;
        case "deny":
            color = "error"
            break;
        default:
            color = "warning"
            break;
    }
    return (
        <Chip color={color} label={record.name} />
    )
};

export const BulkUpdateFormButton = ({ resource, children }) => {
    const { data, selectedIds, onUnselectItems } = useListContext();
    const [isOpen, setOpen] = useState(false);
    const notify = useNotify();
    const refresh = useRefresh();

    const [formValues, setFormValues] = useState({});

    const [update] = useUpdate();

    const handleClick = e => {
        setOpen(true);
        e.stopPropagation();
    };

    const handleClose = () => {
        setOpen(false);
    };


    const handleSubmit = async () => {
        try {
            const mutationPromises = selectedIds.map(
                (id) =>
                    new Promise((resolve, reject) => {
                        update(
                            resource,
                            { id, data: { ...data?.find((obj) => obj.id == id), ...formValues } },
                            {
                                onSuccess: () => {
                                    // notify(`Updated record ${id}`, { type: "success" });
                                    resolve(); // Resolve when the update is successful
                                },
                                onError: (error) => {
                                    // notify(`Error updating record ${id}: ${error.message}`, { type: "warning" });
                                    reject(error); // Reject when there's an error
                                },
                            }
                        );
                    })
            );

            // Wait for all updates to complete
            await Promise.all(mutationPromises);

            refresh();
            notify('Bulk update successful', { type: 'success' });

            onUnselectItems();
            setOpen(false);
            setFormValues({})

        } catch (error) {
            notify(`Error: ${error.message}`, { type: 'warning' });
        }
    };


    const handleInputChange = (child, event) => {
        if (!event) {
            // Handles clear button
            const name = child.props.source
            let oldFormValues = { ...formValues }
            delete oldFormValues[name]

            setFormValues(oldFormValues)
        } else {
            let { name, value } = event.target

            // Hacky workaround for truthy values not messing up the clear button
            if (value === "true" && child.props.choices.filter(obj => ["true", "false"].includes(obj.id).length == 2)) {
                value = true
            } else if (value === "false" && child.props.choices.filter(obj => ["true", "false"].includes(obj.id).length == 2)) {
                value = false
            }

            setFormValues(prev => ({
                ...prev,
                [name]: value,
            }))
        }


    };

    // Clone each child element and pass in onChange handler
    const clonedChildren = React.Children.map(children.props.children, child =>
        cloneElement(child, {
            onChange: (event) => handleInputChange(child, event), // Pass the custom onChange to each child

        })
    );

    return (
        <>
            <Button onClick={handleClick} disabled={selectedIds.length === 0} variant="text" size="small" color="primary" startIcon={<EditIcon />}>
                Bulk Update
            </Button>
            <Dialog open={isOpen} onClose={handleClose}>
                <DialogTitle>Bulk Update</DialogTitle>
                <DialogContent>

                    {cloneElement(children, {
                        onSubmit: handleSubmit,
                        toolbar: false,
                    },
                        clonedChildren)}

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button disabled={Object.keys(formValues).length == 0} onClick={handleSubmit} color="primary" variant="contained">Update</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export const ReferenceNetworks = (props: ReferenceArrayFieldViewProps) => {
    const record = useRecordContext();
    if (!record) return;
    if (record.nested_policy_id) return;
    return (<ReferenceArrayField  {...props} >
        <SingleFieldList empty={<p>Any</p>} linkType="show" >
            <ChipField source="name" sx={{ textDecoration: record["negate_" + props.source] ? 'line-through' : '' }} />
        </SingleFieldList>
    </ReferenceArrayField>)
};




export const ReferenceServices = (props: ReferenceArrayFieldViewProps) => {
    const record = useRecordContext();
    if (!record) return;
    if (record.nested_policy_id) return;
    return (<ReferenceArrayField {...props} >
        <SingleFieldList empty={<p>Any</p>} linkType="show" >
            <ChipField source="name" />
        </SingleFieldList>
    </ReferenceArrayField>)
};
