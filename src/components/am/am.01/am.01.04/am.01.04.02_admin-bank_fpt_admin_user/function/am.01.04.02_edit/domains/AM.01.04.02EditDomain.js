import { useCallback, useRef } from 'react';
import { useHistory } from 'react-router';
import useA00ContextService from '../services/AM.01.04.01ContextService';

export function useA00Domain() {
  const history = useHistory();
  const [context] = useA00ContextService();

  const initDomain = async () => {
    // khởi tạo nghiệp vụ
  };

  const exitHandler = async (values) => {
    history.push(`/home/bank-fpt-admin-manage-user/view/${values}`);
  };

  const updateUser = async (id, data) => {
    var config = {
      method: 'put',
      url: process.env.REACT_APP_API_BACKEND + '/user/updateUser?id=' + id + '',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('access_token') + '',
        'Content-Type': 'application/json',
      },
      data: data,
    };

    console.log(config);
    return config;
  };

  const getAllGroup = async () => {
    var config = {
      method: 'get',
      url: process.env.REACT_APP_API_BACKEND + '/user/getAllGroup' + '',
      headers: {},
    };

    console.log(config);
    return config;
  };

  const domainInterface = useRef({
    initDomain,
    exitHandler,
    updateUser,
    getAllGroup,
    // toAuthorizePage,
  });
  return [context, domainInterface.current];
}

export default useA00Domain;
