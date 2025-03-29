import RuleIcon from '@mui/icons-material/Rule';


import { PolicyList, PolicyCreate, PolicyEdit, PolicyShow } from './Policy';

// import { Policy } from '../types';

export default {
    list: PolicyList,
    create: PolicyCreate,
    edit: PolicyEdit,
    show: PolicyShow,
    icon: RuleIcon,
    // recordRepresentation: (record: Policy) => `"${record.reference}"`,
};