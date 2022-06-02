import { useCallback, useRef } from 'react';
import { useHistory } from 'react-router';
import useA00ContextService from '../services/AM.01.05.02ContextService';

export function useA00Domain() {
  const history = useHistory();
  const [context] = useA00ContextService();

  const initDomain = async () => {
    // khởi tạo nghiệp vụ
  };

  const addNewUser = async (data, corporateId) => {
    var config = {
      method: 'post',
      url:
        process.env.REACT_APP_API_BACKEND +
        '/corporate/user/create/' +
        corporateId,
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
    history.push(`/home/corporate-user`);
  };

  // const toAuthorizePage = async (values) => {
  //   history.push(`/home/bank-fpt-admin-manage/authorize/${values}`);
  // };

  const domainInterface = useRef({
    initDomain,
    exitHandler,
    addNewUser,
    // toAuthorizePage,
  });
  return [context, domainInterface.current];
}

export default useA00Domain;
