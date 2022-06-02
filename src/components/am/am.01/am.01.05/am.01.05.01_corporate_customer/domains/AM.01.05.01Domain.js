import { useCallback, useRef } from 'react';
import { useHistory } from 'react-router';
import useA00ContextService from '../services/AM.01.05.01ContextService';
var axios = require('axios');

export function useA00Domain() {
  const history = useHistory();
  const [context] = useA00ContextService();

  const initDomain = async () => {};

  const getAllCorporate = async () => {
    var config = {
      method: 'get',
      url: process.env.REACT_APP_API_BACKEND + '/corporate/getAll',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('access_token') + '',
      },
    };
    return config;
  };

  const toViewPage = async (values) => {
    history.push(`/home/corporate-customer/view/${values}`);
  };

  const toUploadAddPage = async () => {
    history.push('/home/corporate-customer/uploadToAdd');
  };

  const toAddPage = async () => {
    history.push('/home/corporate-customer/add');
  };
  const domainInterface = useRef({
    initDomain,
    toUploadAddPage,
    toAddPage,
    getAllCorporate,
    toViewPage,
  });
  return [context, domainInterface.current];
}

export default useA00Domain;
