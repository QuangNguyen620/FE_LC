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

  const createNewCorporate = async (data) => {
    var config = {
      method: 'post',
      url: process.env.REACT_APP_API_BACKEND + '/corporate/create',
      headers: {
        // Authorization: 'Bearer ' + sessionStorage.getItem('access_token') + '',
        'Content-Type': 'application/json',
      },
      data: data,
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

  const getAllUserGroup = async (data) => {
    var config = {
      method: 'get',
      url: process.env.REACT_APP_API_BACKEND + '/user/getAllGroup',
      headers: {
        // Authorization: 'Bearer ' + sessionStorage.getItem('access_token') + '',
        'Content-Type': 'application/json',
      },
      data: data,
    };

    console.log(config);
    return config;
  };

  const exitHandler = async () => {
    history.push('/home/corporate-customer');
  };

  const domainInterface = useRef({
    initDomain,
    createNewCorporate,
    getAllUserGroup,
    exitHandler,
    getOcrIdentify,
    verifyIdentify,
  });
  return [context, domainInterface.current];
}

export default useA00Domain;
