import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCallback, useRef } from 'react';
import { useHistory } from 'react-router';
import useA00ContextService from '../services/AM.03.01.01ContextService';

export function useA00Domain() {
  const history = useHistory();
  const [context] = useA00ContextService();

  const initDomain = async () => {
    // khởi tạo nghiệp vụ
  };

  const addNewFee = async (data) => {
    var config = {
      method: 'post',
      url: process.env.REACT_APP_API_BACKEND + '/admin/fee/createBankFee',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('access_token') + '',
        'Content-Type': 'application/json',
      },
      data: data,
    };

    console.log(config);
    return config;
  };

  const exitHandler = async (values) => {
    history.push('/home/fee-bank-manage');
  };

  const domainInterface = useRef({
    initDomain,
    addNewFee,
    exitHandler,
  });
  return [context, domainInterface.current];
}

export default useA00Domain;
