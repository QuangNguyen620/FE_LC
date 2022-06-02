import { useCallback, useRef } from 'react';
import { useHistory } from 'react-router';
import useA11ContextService from '../services/BM010303ContextService';

export function BM010303ViewDomain() {
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

  const delUserAuth = async (id) => {
    var config = {
      method: 'delete',
      url:
        process.env.REACT_APP_API_BACKEND +
        '/bank/user/deleteAuthentication/' +
        id +
        '',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('access_token') + '',
        'Content-Type': 'application/json',
      },
    };
    return config;
  };
  const toEditPage = async (id) => {
    history.push(`/bm-home/bank-user-authentication-management/edit/${id}`);
  };

  const exitHandler = async () => {
    history.push('/bm-home/bank-user-authentication-management');
  };

  const domainInterface = useRef({
    initDomain,
    toEditPage,
    getUserAuth,
    exitHandler,
    delUserAuth,
  });
  return [context, domainInterface.current];
}

export default BM010303ViewDomain;
