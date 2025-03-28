import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';
import { TestList, TestCreate, TestEdit, TestShow } from './Test';

// import { Test } from '../types';

export default {
    list: TestList,
    create: TestCreate,
    edit: TestEdit,
    show: TestShow,
    icon: ChecklistRtlIcon,
    // recordRepresentation: (record: Test) => `"${record.reference}"`,
};
