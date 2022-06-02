import { useCallback, useRef } from 'react';
import { useHistory } from 'react-router';
import useA00ContextService from '../services/AM.01.04.01ContextService';

export function useA00Domain() {
  const history = useHistory();
  const [context] = useA00ContextService();

  const initDomain = async () => {
    // khởi tạo nghiệp vụ
  };

  const toEditPage = async (values) => {
    history.push(`/home/bank-fpt-admin-manage-user/edit/${values}`);
  };

  const exitHandler = async (values) => {
    history.push(`/home/bank-fpt-admin-manage-user`);
  };

  // const toAuthorizePage = async (values) => {
  //   history.push(`/home/bank-fpt-admin-manage/authorize/${values}`);
  // };

  const resetPassword = async (data) => {
    var url = process.env.REACT_APP_API_BACKEND + '/user/resetPasswordUser';
    if (data.userType == 'BANK') {
      var url =
        process.env.REACT_APP_API_BACKEND + '/user/resetPasswordUserBank';
    }
    var dataBody = {
      userId: data.userId,
    };
    var config = {
      method: 'put',
      url: url,
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('access_token') + '',
        'Content-Type': 'application/json',
      },
      data: dataBody,
    };
    console.log(config);
    return config;
  };

  const domainInterface = useRef({
    initDomain,
    toEditPage,
    exitHandler,
    resetPassword,
  });
  return [context, domainInterface.current];
}

export default useA00Domain;
