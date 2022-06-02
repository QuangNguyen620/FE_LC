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

  const updateUser = async (id, data) => {
    var config = {
      method: 'put',
      url: process.env.REACT_APP_API_BACKEND + '/bank/user/update/' + id + '',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('access_token') + '',
        'Content-Type': 'application/json',
      },
      data: data,
    };
    return config;
  };

  const exitHandler = async () => {
    history.push('/bm-home/bank-user-management');
  };

  const domainInterface = useRef({
    initDomain,
    updateUser,
    exitHandler,
    getUser,
  });
  return [context, domainInterface.current];
}

export default BM010302Domain;
