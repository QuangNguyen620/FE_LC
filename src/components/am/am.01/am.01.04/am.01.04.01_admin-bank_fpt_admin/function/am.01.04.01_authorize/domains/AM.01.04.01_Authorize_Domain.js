import { useCallback, useRef } from 'react';
import { useHistory } from 'react-router';
import useAM010401ContextService from '../services/AM.01.04.01ContextService';

export function useAM010401Domain() {
  const history = useHistory();
  const [context] = useAM010401ContextService();

  const initDomain = async () => {
    // khởi tạo nghiệp vụ
  };

  const getUserGroupRoles = async (userGroupCode) => {
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

  const updateUserGroupRoles = async (id, data) => {
    var config = {
      method: 'put',
      url:
        process.env.REACT_APP_API_BACKEND +
        '/admin/group/updatePermissionUserGroup?userGroupCode=' +
        id +
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
    history.push(`/home/bank-fpt-admin-manage/view/${values}`);
  };

  const domainInterface = useRef({
    initDomain,
    getUserGroupRoles,
    updateUserGroupRoles,
    exitHandler,
  });
  return [context, domainInterface.current];
}

export default useAM010401Domain;
