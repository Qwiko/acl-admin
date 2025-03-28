import SensorsIcon from '@mui/icons-material/Sensors';
import { ServiceList, ServiceCreate, ServiceEdit, ServiceShow } from './Service';

// import { Service } from '../types';

export default {
    list: ServiceList,
    create: ServiceCreate,
    edit: ServiceEdit,
    show: ServiceShow,
    icon: SensorsIcon,
    // recordRepresentation: (record: Service) => `"${record.reference}"`,
};
