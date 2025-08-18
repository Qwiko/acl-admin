import EditIcon from '@mui/icons-material/Edit';
import { Chip, DialogActions } from '@mui/material';
import { InfinitePagination, BooleanField, BooleanFieldProps, ChipField, Pagination, ReferenceArrayField, ReferenceArrayFieldViewProps, SingleFieldList, useRecordContext, useResourceContext } from 'react-admin';

import { Box, Card, Typography, Button, Dialog, DialogContent, DialogTitle } from '@mui/material';

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
const { total } = useListContext();
    return (
        <>
            <InfinitePagination />
            {total > 0 && (
                <Box sx={{ position: "sticky", bottom: 0, textAlign: "center" }}>
                    <Card
                        elevation={2}
                        sx={{ px: 2, py: 1, mb: 1, display: 'inline-block' }}
                    >
                        <Typography variant="body2">{total} results</Typography>
                    </Card>
                </Box>
            )}
        </>
    );
}

