import { useCallback, useRef } from 'react';
import { useHistory } from 'react-router';
import useA11ContextService from '../services/A1ContextService';

export function useA1Domain() {
  const history = useHistory();
  const [context] = useA11ContextService();

  const initDomain = async () => {
    // khởi tạo nghiệp vụ
  };

  const submitHandler = async (values) => {
    history.push('/top/verify');
  };

  const domainInterface = useRef({
    initDomain,
    submitHandler,
  });
  return [context, domainInterface.current];
}

export default useA1Domain;
