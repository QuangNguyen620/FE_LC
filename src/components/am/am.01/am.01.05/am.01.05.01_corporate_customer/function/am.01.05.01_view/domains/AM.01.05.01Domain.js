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

  const editHandler = async (id) => {
    history.push(`/home/corporate-customer/edit/${id}`);
  };

  const deleteCorporate = async (id) => {
    var config = {
      method: 'delete',
      url: process.env.REACT_APP_API_BACKEND + '/corporate/delete/' + id + '',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.access_token + '',
        'Content-Type': 'application/json',
      },
    };

    console.log(config);
    return config;
  };

  const exitHandler = async (values) => {
    history.push('/home/corporate-customer');
  };

  const domainInterface = useRef({
    initDomain,
    createNewCorporate,
    getCorporateByID,
    editHandler,
    deleteCorporate,
    exitHandler,
  });
  return [context, domainInterface.current];
}

export default useA00Domain;
