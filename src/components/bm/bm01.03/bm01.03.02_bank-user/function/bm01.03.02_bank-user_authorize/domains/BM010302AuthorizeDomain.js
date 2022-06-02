import { useCallback, useRef } from 'react';
import { useHistory } from 'react-router';
import useA11ContextService from '../services/BM010302ContextService';

export function BM010302Domain() {
  const history = useHistory();
  const [context] = useA11ContextService();

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

  const getUser = async (id) => {
    var config = {
      method: 'get',
      url: process.env.REACT_APP_API_BACKEND + '/bank/user/get/' + id + '',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('access_token') + '',
        'Content-Type': 'application/json',
      },
    };
    return config;
  };

  const toEditPage = async (id) => {
    history.push(`/bm-home/bank-user-management/edit/${id}`);
  };

  const exitHandler = async () => {
    history.push('/bm-home/bank-user-management');
  };

  const domainInterface = useRef({
    initDomain,
    toEditPage,
    exitHandler,
    getUser,
    getUserGroupRoles,
    // getAllUserGroup,
  });
  return [context, domainInterface.current];
}

export default BM010302Domain;
