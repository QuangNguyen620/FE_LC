import { useCallback, useRef } from 'react';
import { useHistory } from 'react-router';
import useA11ContextService from '../services/BM010302ContextService';

export function BM010302Domain() {
  const history = useHistory();
  const [context] = useA11ContextService();

  const initDomain = async () => {
    // khởi tạo nghiệp vụ
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

  const toAuthorizePage = async (id) => {
    history.push(`/bm-home/bank-user-management/authorize/${id}`);
  };

  const exitHandler = async () => {
    history.push('/bm-home/bank-user-management');
  };

  const domainInterface = useRef({
    initDomain,
    toEditPage,
    toAuthorizePage,
    getUser,
    exitHandler,
    // getAllUserGroup,
  });
  return [context, domainInterface.current];
}

export default BM010302Domain;
