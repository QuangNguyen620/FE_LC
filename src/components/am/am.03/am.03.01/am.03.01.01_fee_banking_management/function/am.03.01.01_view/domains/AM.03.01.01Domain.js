import { useCallback, useRef } from 'react';
import { useHistory } from 'react-router';
import useA00ContextService from '../services/AM.03.01.01ContextService';

export function useA00Domain() {
  const history = useHistory();
  const [context] = useA00ContextService();

  const initDomain = async () => {
    // khởi tạo nghiệp vụ
  };

  const getBankFee = async (id) => {
    var config = {
      method: 'get',
      url:
        process.env.REACT_APP_API_BACKEND + '/admin/fee/getBankFee/' + id + '',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('access_token') + '',
        'Content-Type': 'application/json',
      },
    };
    return config;
  };

  const deleteBankFee = async (id) => {
    var config = {
      method: 'delete',
      url:
        process.env.REACT_APP_API_BACKEND +
        '/admin/fee/deleteBankFee/' +
        id +
        '',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('access_token') + '',
        'Content-Type': 'application/json',
      },
    };
    return config;
  };

  const exitHandler = async (values) => {
    history.push('/home/fee-bank-manage');
  };
  const editHandler = async (id) => {
    history.push(`/home/fee-bank-manage/edit/${id}`);
  };

  const domainInterface = useRef({
    initDomain,
    getBankFee,
    deleteBankFee,
    editHandler,
    exitHandler,
  });
  return [context, domainInterface.current];
}

export default useA00Domain;
