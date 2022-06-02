import { useCallback, useRef } from 'react';
import { useHistory } from 'react-router';
import useA00ContextService from '../services/AM.01.04.01ContextService';

import { TIME_OUT,  } from 'core/utils/constants';


export function useA00Domain() {
  const history = useHistory();
  const [context] = useA00ContextService();

  const initDomain = async () => {
    // khởi tạo nghiệp vụ
  };

  const addNewUser = async (data) => {
    var config = {
      method: 'post',
      url: process.env.REACT_APP_API_BACKEND + '/user/createUser',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('access_token') + '',
        'Content-Type': 'application/json',
      },
      data: data,
      timeout: TIME_OUT,
    };

    console.log(config);
    return config;
  };

  const exitHandler = async (values) => {
    history.push(`/home/bank-fpt-admin-manage-user`);
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
