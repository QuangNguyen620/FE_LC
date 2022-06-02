import { useCallback, useRef } from 'react';
import { useHistory } from 'react-router';
import useA00ContextService from '../services/AM.01.04.01ContextService';

export function useA00Domain() {
  const history = useHistory();
  const [context] = useA00ContextService();

  const initDomain = async () => {};

  const toAddPage = async (values) => {
    history.push('/home/fee-transaction/add');
  };

  const toViewPage = async (values) => {
    history.push(`/home/fee-transaction/view/${values}`);
  };

  const domainInterface = useRef({
    initDomain,
    toAddPage,

    toViewPage,
  });
  return [context, domainInterface.current];
}

export default useA00Domain;
