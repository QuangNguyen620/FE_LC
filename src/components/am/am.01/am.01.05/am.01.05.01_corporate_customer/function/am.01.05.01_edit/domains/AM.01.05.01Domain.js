import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCallback, useRef } from 'react';
import { useHistory } from 'react-router';
import useA00ContextService from '../services/AM.01.05.01ContextService';

export function useA00Domain() {
  const history = useHistory();
  const [context] = useA00ContextService();

  const initDomain = async () => {
    // khởi tạo nghiệp vụ
  };

  const editCorporate = async (id, data) => {
    var config = {
      method: 'put',
      url: process.env.REACT_APP_API_BACKEND + '/corporate/update/' + id + '',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.access_token + '',
        'Content-Type': 'application/json',
      },
      data: data,
    };

    console.log(config);
    return config;
  };

  const getAllUserGroup = async (data) => {
    var config = {
      method: 'get',
      url: process.env.REACT_APP_API_BACKEND + '/user/getAllGroup',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('access_token') + '',
        'Content-Type': 'application/json',
      },
      data: data,
    };

    console.log(config);
    return config;
  };

  const getCorporateByID = async (id) => {
    var config = {
      method: 'get',
      url: process.env.REACT_APP_API_BACKEND + '/corporate/get/' + id + '',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.access_token + '',
        'Content-Type': 'application/json',
      },
    };

    console.log(config);
    return config;
  };

  const deleteCorporateAccount = async (id) => {
    var config = {
      method: 'delete',
      url:
        process.env.REACT_APP_API_BACKEND +
        '/corporate/deleteCorporateAccount?corporateAccountId=' +
        id +
        '',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.access_token + '',
        'Content-Type': 'application/json',
      },
    };

    console.log(config);
    return config;
  };

  const deleteCorporateUser = async (id) => {
    var config = {
      method: 'delete',
      url:
        process.env.REACT_APP_API_BACKEND + '/corporate/user/delete/' + id + '',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.access_token + '',
        'Content-Type': 'application/json',
      },
    };

    console.log(config);
    return config;
  };

  const getOcrIdentify = async (data) => {
    var config = {
      method: 'post',
      url: process.env.REACT_APP_API_BACKEND + '/ocr/getOcrIdentify',
      data: data,
    };
    console.log(config);
    return config;
  };

  const verifyIdentify = async (data) => {
    var config = {
      method: 'post',
      url: process.env.REACT_APP_API_BACKEND + '/ocr/verifyIndentify',
      data: data,
    };
    console.log(config);
    return config;
  };

  const exitHandler = async (id) => {
    history.push('/home/corporate-customer/view/' + id);
  };

  const domainInterface = useRef({
    initDomain,
    getAllUserGroup,
    editCorporate,
    getCorporateByID,
    deleteCorporateAccount,
    deleteCorporateUser,
    exitHandler,
    getOcrIdentify,
    verifyIdentify,
  });
  return [context, domainInterface.current];
}

export default useA00Domain;
