
import HistoryIcon from '@mui/icons-material/History';

import { RevisionList, RevisionCreate, RevisionEdit, RevisionShow } from './Revision';

// import { Policy } from '../types';

export default {
    list: RevisionList,
    create: RevisionCreate,
    edit: RevisionEdit,
    show: RevisionShow,
    icon: HistoryIcon,
    // recordRepresentation: (record: Policy) => `"${record.reference}"`,
};