import { Chip } from '@mui/material';
import { BooleanField, BooleanFieldProps, useRecordContext } from 'react-admin';


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