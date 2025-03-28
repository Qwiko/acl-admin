import LanIcon from '@mui/icons-material/Lan';
import { NetworkList, NetworkCreate, NetworkEdit, NetworkShow } from './Network';

// import { Network } from '../types';

export default {
    list: NetworkList,
    create: NetworkCreate,
    edit: NetworkEdit,
    show: NetworkShow,
    icon: LanIcon,
    // recordRepresentation: (record: Network) => `"${record.reference}"`,
};
