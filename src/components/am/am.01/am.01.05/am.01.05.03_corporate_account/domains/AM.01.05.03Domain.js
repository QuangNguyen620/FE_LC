import { useRef } from 'react';
import { useHistory } from 'react-router';
import useA00ContextService from '../services/AM.01.05.03ContextService';

export function useA00Domain() {
  const history = useHistory();
  const [context] = useA00ContextService();

  const initDomain = async () => {};

  const getAllCorporate = async () => {};

  const toViewPage = async (values) => {
    history.push(`/home/corporate-account/view/${values}`);
  };

  const domainInterface = useRef({
    initDomain,
    getAllCorporate,
    toViewPage,
  });
  return [context, domainInterface.current];
}

export default useA00Domain;
