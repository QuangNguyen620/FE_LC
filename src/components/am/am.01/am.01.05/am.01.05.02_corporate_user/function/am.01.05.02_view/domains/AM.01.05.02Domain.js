import { useCallback, useRef } from 'react';
import { useHistory } from 'react-router';
import useA00ContextService from '../services/AM.01.05.02ContextService';

export function useA00Domain() {
  const history = useHistory();
  const [context] = useA00ContextService();

  const initDomain = async () => {
    // khởi tạo nghiệp vụ
  };

  const toEditPage = async (values) => {
    history.push(`/home/corporate-user/edit/${values}`);
  };

  const exitHandler = async (values) => {
    history.push(`/home/corporate-user`);
  };

  const toAuthorizePage = async (values) => {
    history.push(`/home/corporate-user/authorize/${values}`);
  };

  const resetPassword = async (data) => {
    var config = {
      method: 'put',
      url:
        process.env.REACT_APP_API_BACKEND + '/user/resetPasswordUserCorporate',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('access_token') + '',
        'Content-Type': 'application/json',
      },
      data: data,
    };
    console.log(config);
    return config;
  };

  const domainInterface = useRef({
    initDomain,
    exitHandler,
    toEditPage,
    toAuthorizePage,
    resetPassword,
  });
  return [context, domainInterface.current];
}

export default useA00Domain;
