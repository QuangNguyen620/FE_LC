import { useCallback, useRef } from 'react';
import { useHistory } from 'react-router';
import useA00ContextService from '../services/BM.01.02ContextService';

export function useA00Domain() {
  const history = useHistory();
  const [context] = useA00ContextService();

  const initDomain = async () => {
    // khởi tạo nghiệp vụ
  };

  const loginHandler = async (values) => {
    history.push('/bm-login');
  };

  const domainInterface = useRef({
    initDomain,
    loginHandler,
  });
  return [context, domainInterface.current];
}

export default useA00Domain;
