import { useCallback, useRef } from 'react';
import { useHistory } from 'react-router';
import useA00ContextService from '../services/AM.01.05.02ContextService';
var axios = require('axios');

export function useA00Domain() {
  const history = useHistory();
  const [context] = useA00ContextService();

  const initDomain = async () => {};

  const toAddPage = async (values) => {
    history.push('/home/corporate-user/add');
  };

  const getAllCorporate = async () => {};

  const toViewPage = async (values) => {
    history.push(`/home/corporate-user/view/${values}`);
  };

  const domainInterface = useRef({
    initDomain,
    getAllCorporate,
    toAddPage,
    toViewPage,
  });
  return [context, domainInterface.current];
}

export default useA00Domain;
