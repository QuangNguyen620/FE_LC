import { useCallback, useRef } from 'react';
import { useHistory } from 'react-router';
import useA00ContextService from '../services/AM.01.04.01ContextService';

export function useA00Domain() {
  const history = useHistory();
  const [context] = useA00ContextService();

  const initDomain = async () => {
    // khởi tạo nghiệp vụ
  };

  const getFeeBankCode = async (data) => {
    var config = {
      method: 'get',
      url: process.env.REACT_APP_API_BACKEND + '/admin/fee/getAllBankFee/1',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('access_token') + '',
        'Content-Type': 'application/json',
      },
      data: data,
    };
    console.log(config);
    return config;
  };

  const getAllCurrency = async (data) => {
    var config = {
      method: 'get',
      url: process.env.REACT_APP_API_BACKEND + '/data/currency/getAll',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('access_token') + '',
        'Content-Type': 'application/json',
      },
      data: data,
    };
    console.log(config);
    return config;
  };

  const getAllBankFeeTransactionCode = async (data) => {
    var config = {
      method: 'get',
      url:
        process.env.REACT_APP_API_BACKEND +
        '/admin/fee/getAllBankFeeTransaction',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('access_token') + '',
        'Content-Type': 'application/json',
      },
      data: data,
    };
    console.log(config);
    return config;
  };

  const getAllBankRating = async (data) => {
    var config = {
      method: 'get',
      url:
        process.env.REACT_APP_API_BACKEND +
        '/admin/bankRating/getAllBankRating',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('access_token') + '',
        'Content-Type': 'application/json',
      },
      data: data,
    };
    console.log(config);
    return config;
  };

  const addNewBankFeeRule = async (data) => {
    var config = {
      method: 'post',
      url: process.env.REACT_APP_API_BACKEND + '/admin/fee/createBankFeeRules',
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
    history.push('/home/fee-bank-rule');
  };

  const domainInterface = useRef({
    initDomain,
    getFeeBankCode,
    getAllBankFeeTransactionCode,
    getAllBankRating,
    addNewBankFeeRule,
    exitHandler,
    getAllCurrency,
  });
  return [context, domainInterface.current];
}

export default useA00Domain;
