import { useCallback, useRef } from 'react';
import { useHistory } from 'react-router';
import useA00ContextService from '../services/AM.01.04.01ContextService';

export function useA00Domain() {
  const history = useHistory();
  const [context] = useA00ContextService();

  const initDomain = async () => {
    // khởi tạo nghiệp vụ
  };

  const addNewFeeTransaction = async (data) => {
    var config = {
      method: 'post',
      url:
        process.env.REACT_APP_API_BACKEND +
        '/admin/fee/createBankFeeTransaction',
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
    history.push('/home/fee-transaction');
  };

  const domainInterface = useRef({
    initDomain,
    addNewFeeTransaction,
    exitHandler,
  });
  return [context, domainInterface.current];
}

export default useA00Domain;
