import { useRef } from 'react';
import { useHistory } from 'react-router';
import useA00ContextService from '../services/AM.01.05.03ContextService';

export function useA00Domain() {
  const history = useHistory();
  const [context] = useA00ContextService();

  const initDomain = async () => {
    // khởi tạo nghiệp vụ
  };

  const exitHandler = async (values) => {
    history.push(`/home/corporate-account`);
  };

  const domainInterface = useRef({
    initDomain,
    exitHandler,
    // toAuthorizePage,
  });
  return [context, domainInterface.current];
}

export default useA00Domain;
