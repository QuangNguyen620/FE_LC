import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useCallback, useRef } from 'react';
import { useHistory } from 'react-router';
import useA00ContextService from '../services/AM.01.01.01ContextService';
import { ErrorsCode } from 'core/utils/constants';
import { message } from 'antd';
import { useTranslation } from 'react-i18next';

var axios = require('axios');
var qs = require('qs');

export function useA00Domain() {
  const history = useHistory();
  const [context] = useA00ContextService();
  const { t } = useTranslation();
  const initDomain = async () => {
    // khởi tạo nghiệp vụ
  };

  const loginHandler = async (data) => {
    var config = {
      method: 'post',
      url: process.env.REACT_APP_API_BACKEND + '/user/login',
      headers: {
        'Content-Type': 'application/json',
        //'accept': '/*'
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(response);
        if (response.data.code == 200) {
          console.log("loginHandler");
          // localStorage.setItem('access_token', response.data.data.access_token);
          sessionStorage.setItem(
            'access_token',
            response.data.data.access_token,
          );

          sessionStorage.setItem(
            'refresh_token',
            response.data.data.refresh_token,
          );

          sessionStorage.setItem('isLoggedIn', true);
          history.push('/home');
          message.info(response.data.message);
        }
        if (!response.data.success) {
          message.info(response.data.message);
        }
      })
      .catch(function (error) {
        console.log(error);
        message.error('Đăng nhập không thành công!');
      });
  };

  const forgetPassHandler = async (values) => {
    history.push('/forgetpassword');
  };

  const domainInterface = useRef({
    initDomain,
    loginHandler,
    forgetPassHandler,
  });
  return [context, domainInterface.current];
}

export default useA00Domain;
