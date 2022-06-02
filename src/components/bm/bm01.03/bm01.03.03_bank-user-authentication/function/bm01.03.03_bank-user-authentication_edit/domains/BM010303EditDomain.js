import { useCallback, useRef } from 'react';
import { useHistory } from 'react-router';
import useA11ContextService from '../services/BM010303ContextService';

export function BM010303Domain() {
  const history = useHistory();
  const [context] = useA11ContextService();

  const initDomain = async () => {
    // khởi tạo nghiệp vụ
  };

  const getUserAuth = async (id) => {
    var config = {
      method: 'get',
      url:
        process.env.REACT_APP_API_BACKEND +
        '/bank/user/getAuthentication/' +
        id +
        '',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('access_token') + '',
        'Content-Type': 'application/json',
      },
    };
    return config;
  };

  const updateUserAuth = async (id, data) => {
    var config = {
      method: 'put',
      url:
        process.env.REACT_APP_API_BACKEND +
        '/bank/user/updateAuthentication/' +
        id +
        '',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('access_token') + '',
        'Content-Type': 'application/json',
      },
      data: data,
    };
    return config;
  };

  const exitHandler = async (id) => {
    history.push('/bm-home/bank-user-authentication-management/view/' + id);
  };

  const domainInterface = useRef({
    initDomain,
    getUserAuth,
    exitHandler,
    updateUserAuth,
    // getAllUserGroup,
  });
  return [context, domainInterface.current];
}

export default BM010303Domain;
