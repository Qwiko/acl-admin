import PublishIcon from '@mui/icons-material/Publish';
import { DeployerList, DeployerCreate, DeployerEdit, DeployerShow } from './Deployer';


export default {
    list: DeployerList,
    create: DeployerCreate,
    edit: DeployerEdit,
    show: DeployerShow,
    icon: PublishIcon,
    // recordRepresentation: (record: Deployer) => `"${record.reference}"`,
};
