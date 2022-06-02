import { useCallback, useRef } from 'react';
import { useHistory } from 'react-router';
import useA00ContextService from '../services/AM.01.05AContextService';
var axios = require('axios');

export function useA00Domain() {
  const history = useHistory();
  const [context] = useA00ContextService();

  const initDomain = async () => {};

  const toViewPage = async (values) => {
    history.push(`/home/admin-corporate-group/view/${values}`);
  };
  const toAddPage = async (values) => {
    history.push('/home/admin-corporate-group/add');
  };
  const domainInterface = useRef({
    initDomain,
    toAddPage,
    toViewPage,
  });
  return [context, domainInterface.current];
}

export default useA00Domain;
