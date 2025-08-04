import EditIcon from '@mui/icons-material/Edit';
import { Chip, DialogActions } from '@mui/material';
import { BooleanField, BooleanFieldProps, ChipField, Pagination, ReferenceArrayField, ReferenceArrayFieldViewProps, SingleFieldList, useRecordContext, useResourceContext } from 'react-admin';

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

export const DefaultPagination = () => {
    return (
        <Pagination rowsPerPageOptions={[10, 25, 50, 75, 100]} />
    )
}

