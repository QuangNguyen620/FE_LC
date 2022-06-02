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

  const deleteDetailBankFeeRule = async (id) => {
    var config = {
      method: 'delete',
      url:
        process.env.REACT_APP_API_BACKEND +
        '/admin/fee/deleteBankFeeRules/' +
        id +
        '',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('access_token') + '',
        'Content-Type': 'application/json',
      },
    };
    return config;
  };

  const getDetailBankFeeRule = async (id) => {
    var config = {
      method: 'get',
      url:
        process.env.REACT_APP_API_BACKEND +
        '/admin/fee/getBankFeeRules/' +
        id +
        '',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('access_token') + '',
        'Content-Type': 'application/json',
      },
    };
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

  const editHandler = async (id) => {
    history.push(`/home/fee-bank-rule/edit/${id}`);
  };

  const exitHandler = async () => {
    history.push('/home/fee-bank-rule');
  };

  const domainInterface = useRef({
    initDomain,
    getFeeBankCode,
    getDetailBankFeeRule,
    getAllBankRating,
    getAllBankFeeTransactionCode,
    deleteDetailBankFeeRule,
    editHandler,
    exitHandler,
  });
  return [context, domainInterface.current];
}

export default useA00Domain;
