import axios from 'axios';
import ServiceBase from 'core/common/ServiceBase';

const ApiServices = Object.create(ServiceBase);
const baseUrl = '';

ApiServices.invokeGetConfig = async () => {
  return await axios.get(baseUrl + '/config/get');
};

ApiServices.invokeGetClasses = async () => {
  return await axios.get(baseUrl + '/class/get-all?fields=id,name,status');
};

ApiServices.invokeGetConfig = async () => {
  return await axios.get(baseUrl + '/config/get');
};

ApiServices.invokeGetSystemConfig = async () => {
  return await axios.get(baseUrl + '/system-config');
};

export default ApiServices;
