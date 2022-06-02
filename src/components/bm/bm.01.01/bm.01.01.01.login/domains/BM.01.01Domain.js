import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useCallback, useRef } from 'react';
import { useHistory } from 'react-router';
import { message } from 'antd';
import useA00ContextService from '../services/BM.01.01ContextService';
var axios = require('axios');
var qs = require('qs');

export function useA00Domain() {
  const history = useHistory();
  const [context] = useA00ContextService();

  const successNotify = () =>
    toast.success('Đăng nhập thành công', {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const errorNotify = () =>
    toast.error('Đăng nhập không  thành công', {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const initDomain = async () => {
    // khởi tạo nghiệp vụ
  };

  const loginHandler = async (username, password) => {
    var data = JSON.stringify({
      password: password,
      username: username,
    });
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
          console.log(JSON.stringify(response.data.data.access_token));
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
          history.push('/bm-home');
          message.info(response.data.message);
        }
        if (!response.data.success) {
          message.error(response.data.message);
        }
      })
      .catch(function (error) {
        console.log(error);
        message.error('Đăng nhập không thành công!');
      });
    // history.push('/bm-home');
  };

  const forgetPassHandler = async (values) => {
    history.push('/bm-forgetpass');
  };

  const domainInterface = useRef({
    initDomain,
    loginHandler,
    forgetPassHandler,
  });
  return [context, domainInterface.current];
}

export default useA00Domain;
