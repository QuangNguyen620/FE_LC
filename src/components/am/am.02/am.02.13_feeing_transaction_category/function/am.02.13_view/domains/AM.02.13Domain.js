import { useCallback, useRef } from 'react';
import { useHistory } from 'react-router';
import useA00ContextService from '../services/AM.01.04.01ContextService';

export function useA00Domain() {
  const history = useHistory();
  const [context] = useA00ContextService();

  const initDomain = async () => {
    // khởi tạo nghiệp vụ
  };

  const getBankFeeTransaction = async (id) => {
    var config = {
      method: 'get',
      url:
        process.env.REACT_APP_API_BACKEND +
        '/admin/fee/getBankFeeTransaction/' +
        id +
        '',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('access_token') + '',
        'Content-Type': 'application/json',
      },
    };
    return config;
  };

  const deleteBankFeeTransaction = async (id) => {
    var config = {
      method: 'delete',
      url:
        process.env.REACT_APP_API_BACKEND +
        '/admin/fee/deleteBankFeeTransaction/' +
        id +
        '',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('access_token') + '',
        'Content-Type': 'application/json',
      },
    };
    return config;
  };

  const editHandler = async (id) => {
    history.push(`/home/fee-transaction/edit/${id}`);
  };

  const exitHandler = async () => {
    history.push('/home/fee-transaction');
  };

  const domainInterface = useRef({
    initDomain,
    getBankFeeTransaction,
    deleteBankFeeTransaction,
    editHandler,
    exitHandler,
  });
  return [context, domainInterface.current];
}

export default useA00Domain;
