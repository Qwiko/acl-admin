import ModeStandbyIcon from '@mui/icons-material/ModeStandby';
import { TargetList, TargetCreate, TargetEdit, TargetShow } from './Target';

// import { Target } from '../types';

export default {
    list: TargetList,
    create: TargetCreate,
    edit: TargetEdit,
    show: TargetShow,
    icon: ModeStandbyIcon,
    // recordRepresentation: (record: Target) => `"${record.reference}"`,
};
