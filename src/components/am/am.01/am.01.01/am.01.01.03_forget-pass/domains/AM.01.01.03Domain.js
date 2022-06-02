import useMultiLanguage from 'core/hooks/UseMultiLanguage';
import { useCallback, useRef } from 'react';
import { useHistory } from 'react-router';
import useA00ContextService from '../services/AM.01.01.03ContextService';

export function useA00Domain() {
  const history = useHistory();
  const [context] = useA00ContextService();
  const lang = useMultiLanguage();
  const initDomain = async () => {
    // khởi tạo nghiệp vụ
  };

  const submitHandler = async (data) => {
    var config = {
      method: 'put',
      url: process.env.REACT_APP_API_BACKEND + '/user/forgetPasswordUser',
      headers: {
        // Authorization: 'Bearer ' + sessionStorage.getItem('access_token') + '',
        'Accept-Language' : lang,
        'Content-Type': 'application/json',
      },
      data: data,
    };
    return config;
  };

  const exitHandler = async (values) => {
    history.push('/');
  };

  const domainInterface = useRef({
    initDomain,
    submitHandler,
    exitHandler,
  });
  return [context, domainInterface.current];
}

export default useA00Domain;
