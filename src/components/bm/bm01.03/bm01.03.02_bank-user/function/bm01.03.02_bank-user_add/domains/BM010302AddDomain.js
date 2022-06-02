import { useCallback, useRef } from 'react';
import { useHistory } from 'react-router';
import useA11ContextService from '../services/BM010302ContextService';

export function BM010301Domain() {
  const history = useHistory();
  const [context] = useA11ContextService();

  const initDomain = async () => {
    // khởi tạo nghiệp vụ
  };

  const addNewUser = async (data) => {
    var config = {
      method: 'post',
      url: process.env.REACT_APP_API_BACKEND + '/bank/user/create',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('access_token') + '',
        'Content-Type': 'application/json',
      },
      data: data,
    };

    console.log(config);
    return config;
  };

  const exitHandler = async () => {
    history.push('/bm-home/bank-user-management');
  };

  const domainInterface = useRef({
    initDomain,
    addNewUser,
    exitHandler,
    // getAllUserGroup,
  });
  return [context, domainInterface.current];
}

export default BM010301Domain;
