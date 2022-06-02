import { useCallback, useRef } from 'react';
import { useHistory } from 'react-router';
import useA00ContextService from '../services/CommonContextService';
var axios = require('axios');

export function useA00Domain() {
  const history = useHistory();
  const [context] = useA00ContextService();

  const initDomain = async () => {
    // khởi tạo nghiệp vụ
  };

  const submitHandler = async (values) => {
    history.push('/home');
  };

  const logoutHandler = async (values) => {
    sessionStorage.clear();
    history.push('/logout');
  };

  const refreshAccessToken = async (values) => {
    var config = {
      method: 'post',
      url:
        process.env.REACT_APP_API_BACKEND +
        ':443/user/refreshToken?refreshToken=' +
        values +
        '',
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data.data.access_token));
        sessionStorage.setItem('access_token', response.data.data.access_token);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const loadUserData = async () => {
    var config = {
      method: 'get',
      url: process.env.REACT_APP_API_BACKEND + '/user/getUserLogin',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.access_token + '',
        'Content-Type': 'application/json',
      },
    };
    axios(config)
      .then(function (response) {
        localStorage.setItem('login_username', response.data.data.userName);
        localStorage.setItem(
          'login_username_bankId',
          response.data.data.bankId,
        );
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const forgetPassHandler = async (values) => {
    history.push('/bm-forgetpass');
  };

  const changePassHandler = async (values) => {
    history.push('/bm-changepass');
  };

  const domainInterface = useRef({
    initDomain,
    submitHandler,
    loadUserData,
    forgetPassHandler,
    logoutHandler,
    changePassHandler,
  });
  return [context, domainInterface.current];
}

export default useA00Domain;
