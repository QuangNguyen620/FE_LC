import { useCallback, useRef } from 'react';
import { useHistory } from 'react-router';
import useA00ContextService from '../services/AM.01.05AContextService';

export function useA00Domain() {
  const history = useHistory();
  const [context] = useA00ContextService();

  const initDomain = async () => {
    // khởi tạo nghiệp vụ
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

  const updatePermission = async (userGroupCode, data) => {
    var config = {
      method: 'put',
      url:
        process.env.REACT_APP_API_BACKEND +
        '/admin/group/updatePermissionUserGroup?userGroupCode=' +
        userGroupCode +
        '',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.access_token + '',
        'Content-Type': 'application/json',
      },
      data: data,
    };
    console.log(config);
    return config;
  };

  const exitHandler = async (values) => {
    history.push(`/home/admin-corporate-group/view/${values}`);
  };

  const domainInterface = useRef({
    initDomain,
    getPermission,
    updatePermission,
    exitHandler,
  });
  return [context, domainInterface.current];
}

export default useA00Domain;
