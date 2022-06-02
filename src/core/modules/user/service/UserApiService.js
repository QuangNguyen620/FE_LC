import axios from 'axios';
import ServiceBase from 'core/common/ServiceBase';
import log from '../ModuleLogger';
import QueryString from 'core/utils/query-string';
const tag = 'UserApiService';
const ApiServices = Object.create(ServiceBase);
const baseUrl = '';

ApiServices.invokeGetUserInfo = async () => {
  log.trace(tag, 'invokeGetUserInfo');
  return await axios.get(baseUrl + '/user/info');
};

ApiServices.invokeSaveUser = async (userId, data) => {
  log.trace(tag, 'invokeSaveUser');

  let apiUrl = baseUrl + '/user/save';
  let method = 'post';
  if (userId > 0) {
    apiUrl = baseUrl + '/user/save?id=' + userId;
  }
  return await axios({
    method: method,
    url: apiUrl,
    data: QueryString.stringify(data),
  });
};

export default ApiServices;
