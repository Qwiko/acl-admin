import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import { DeploymentList, DeploymentShow } from './Deployment';

// import { Deployment } from '../types';

export default {
    list: DeploymentList,
    show: DeploymentShow,
    icon: RocketLaunchIcon,
    // recordRepresentation: (record: Deployment) => `"${record.reference}"`,
};
