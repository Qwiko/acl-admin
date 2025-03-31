import FormatListNumberedRtlIcon from '@mui/icons-material/FormatListNumberedRtl';

import { PolicyList, PolicyCreate, PolicyEdit, PolicyShow } from './Policy';

// import { Policy } from '../types';

export default {
    list: PolicyList,
    create: PolicyCreate,
    edit: PolicyEdit,
    show: PolicyShow,
    icon: FormatListNumberedRtlIcon,
    // recordRepresentation: (record: Policy) => `"${record.reference}"`,
};