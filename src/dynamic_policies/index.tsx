import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import { ListGuesser, EditGuesser, ShowGuesser, } from 'react-admin';


import { DynamicPolicyList, DynamicPolicyCreate, DynamicPolicyEdit, DynamicPolicyShow } from './DynamicPolicy';
// import { Policy } from '../types';

export default {
    list: DynamicPolicyList,
    create: DynamicPolicyCreate,
    edit: DynamicPolicyEdit,
    show: DynamicPolicyShow,
    icon: DynamicFeedIcon,
    // recordRepresentation: (record: Policy) => `"${record.reference}"`,
};
