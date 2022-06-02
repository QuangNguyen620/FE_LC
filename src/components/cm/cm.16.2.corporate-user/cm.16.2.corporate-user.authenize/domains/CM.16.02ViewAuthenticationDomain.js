import { useCallback, useRef } from 'react';
import { useHistory } from 'react-router';
import useA11ContextService from '../services/CM.16.02ViewAuthenticationService';
var axios = require('axios');
export function CM1602Domain() {
  const history = useHistory();
  const [context] = useA11ContextService();

  const initDomain = async () => {
    // khởi tạo nghiệp vụ
  };

  const getCorporateUserByID = async (userId) => {
    var config = {
      method: 'get',
      url:
        process.env.REACT_APP_API_BACKEND +
        '/corporate/user/get/' +
        userId +
        '',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.access_token + '',
        'Content-Type': 'application/json',
      },
    };
    console.log(config);
    return config;
  };

  const getRoles = async () => {
    var config = {
      method: 'get',
      url: process.env.REACT_APP_API_BACKEND + '/user/roles',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.access_token + '',
        'Content-Type': 'application/json',
      },
    };
    console.log(config);
    return config;
  };

  const getPermission = async (userGroupCode) => {
    var config = {
      method: 'get',
      url:
        process.env.REACT_APP_API_BACKEND +
        '/admin/group/getPermissionUserGroup?userGroupCode=' +
        userGroupCode +
        '',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.access_token + '',
        'Content-Type': 'application/json',
      },
    };
    console.log(config);
    return config;
  };

  const toEditPage = async (id) => {
    history.push(`/cm-home/corporate-user-manage/edit/${id}`);
  };

  const exitHandler = async (id) => {
    history.push(`/cm-home/corporate-user-manage/view/${id}`);
  };
  const domainInterface = useRef({
    initDomain,
    getCorporateUserByID,
    toEditPage,
    getRoles,
    getPermission,
    exitHandler,
  });
  return [context, domainInterface.current];
}

export default CM1602Domain;
