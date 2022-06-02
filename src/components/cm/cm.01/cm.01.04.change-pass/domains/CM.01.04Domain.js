import { useCallback, useRef } from 'react';
import { useHistory } from 'react-router';
import useA00ContextService from '../services/CM.01.04ContextService';

export function useA00Domain() {
  const history = useHistory();
  const [context] = useA00ContextService();

  const initDomain = async () => {
    // khởi tạo nghiệp vụ
  };

  const submitHandler = async (data) => {
    var config = {
      method: 'put',
      url: process.env.REACT_APP_API_BACKEND + '/user/changePasswordUser',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('access_token') + '',
        'Content-Type': 'application/json',
      },
      data: data,
    };
    console.log(config);
    return config;
  };

  const exitHandler = async (values) => {
    history.push('/cm-home');
  };

  const domainInterface = useRef({
    initDomain,
    submitHandler,
    exitHandler,
  });
  return [context, domainInterface.current];
}

export default useA00Domain;
