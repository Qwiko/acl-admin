import PublishIcon from '@mui/icons-material/Publish';
import { PublisherList, PublisherCreate, PublisherEdit, PublisherShow } from './Publisher';

// import { Publisher } from '../types';

export default {
    list: PublisherList,
    create: PublisherCreate,
    edit: PublisherEdit,
    show: PublisherShow,
    icon: PublishIcon,
    // recordRepresentation: (record: Publisher) => `"${record.reference}"`,
};
