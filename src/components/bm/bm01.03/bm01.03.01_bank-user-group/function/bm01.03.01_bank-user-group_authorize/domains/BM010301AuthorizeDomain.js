import { useCallback, useRef } from 'react';
import { useHistory } from 'react-router';
import useA11ContextService from '../services/BM010301ContextService';

export function BM010301Domain() {
  const history = useHistory();
  const [context] = useA11ContextService();

  const initDomain = async () => {
    // khởi tạo nghiệp vụ
  };

  // const addNewUserGroup = async (data) => {
  //   var config = {
  //     method: 'post',
  //     url: process.env.REACT_APP_API_BACKEND + '/admin/group/createUserGroup',
  //     headers: {
  //       Authorization: 'Bearer ' + sessionStorage.getItem('access_token') + '',
  //       'Content-Type': 'application/json',
  //     },
  //     data: data,
  //   };

  //   console.log(config);
  //   return config;
  // };

  const toEditPage = async (id) => {
    history.push(`/bm-home/bank-user-group-management/edit/${id}`);
  };

  const getUserGroupRoles = async (data) => {
    var config = {
      method: 'get',
      url:
        'https://dev-lcapi.xcbt.online/bank/group/getPermissionUserGroup?userGroupCode=' +
        data +
        '',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('access_token') + '',
        'Content-Type': 'application/json',
      },
    };

    console.log(config);
    return config;
  };

  const updateUserGroupRoles = async (userGroupCode, data) => {
    var config = {
      method: 'put',
      url:
        'https://dev-lcapi.xcbt.online/bank/group/updatePermissionUserGroup?userGroupCode=' +
        userGroupCode +
        '',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('access_token') + '',
        'Content-Type': 'application/json',
      },
      data: data,
    };

    console.log(config);
    return config;
  };

  const exitHandler = async (id) => {
    history.push(`/bm-home/bank-user-group-management/view/${id}`);
  };

  const domainInterface = useRef({
    initDomain,

    getUserGroupRoles,
    exitHandler,
    updateUserGroupRoles,
    // getAllUserGroup,
  });
  return [context, domainInterface.current];
}

export default BM010301Domain;
