// import { useStore } from 'core/store/store';
import axios from 'axios';
import log from '../ModuleLogger';
import { useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { notification } from 'antd';
import DomainResponse from 'core/common/DomainBase';
import { useWebCacheApi } from 'core/hooks/UseWebCacheApi';
// import { useConfigDispatch } from 'core/modules/config/store/ConfigStore';
// import { useUserDispatch } from 'core/modules/user/store/UserStore';
import {
  AuthContext,
  AuthActions,
  AuthInitalState,
  AuthActionList,
} from '../store/AuthStore';
import Service, { SSOLogoutUrl, SSOTokenUrl } from '../service/AuthApiService';
import { useDispatch, useStore, createSlice } from 'core/store/store';
import {
  ConfigActionList,
  ConfigContext,
} from 'core/modules/config/store/ConfigStore';
import { UserActionList, UserContext } from 'core/modules/user/store/UserStore';
import qs from 'qs';

const tag = 'AuthDomain';

function useAuth() {
  const history = useHistory();
  const cache = useWebCacheApi('KTOAuthoring');
  // const [state, dispatcher] = useStore();
  const authContext = useStore()[AuthContext];
  const dispatcher = useDispatch();
  // const state = useAuthStore();
  // const authDispatcher = useAuthDispatch();
  // const userDispatcher = useUserDispatch();
  // const configDispatcher = useConfigDispatch();

  useEffect(() => {
    log.trace(tag, 'did mount');
    if (!authContext) {
      createSlice(dispatcher, AuthContext, AuthActions, AuthInitalState);
    }
    return () => {
      // TODO: remove slice
    };
  }, []);

  const init = async () => {
    log.info(tag, 'initialize domain');
    let result = new DomainResponse();

    // kiểm tra phiên bản hiện tại, nếu không có thì về màn login
    let subscription = getSubscriptionVersion();
    if (!subscription || ['P1', 'P3'].indexOf(subscription) == -1) {
      if (history.location.pathname != '/login') {
        log.trace(tag, 'Không tìm thấy refresh token');
        result.failed('Không tìm thấy refresh token', {
          navigateUrl: '/login',
        });
        return result;
      }
    }
    // Kiểm tra refresh token, nếu không có thì về màn login
    let refreshToken = getRefreshToken();
    if (!refreshToken) {
      if (history.location.pathname != '/login') {
        log.trace(tag, 'Không tìm thấy refresh token');
        result.failed('Không tìm thấy refresh token', {
          navigateUrl: '/login',
        });
      }
      return result;
    }
    // Kiểm tra access token, nếu không có thì dùng refresh token để làm mới access token
    // Trường hợp refresh token hết hạn thì về màn login
    let accessToken = getAccessToken();
    if (!accessToken) {
      // làm mới tokens
      let response = await Service.invokeRefreshToken(refreshToken);
      if (!Service.isSuccess(response)) {
        if (history.location.pathname != '/login') {
          log.trace(tag, 'Refresh token không hợp lệ');
          result.failed('Refresh token không hợp lệ', {
            navigateUrl: '/login',
          });
        }
        return result;
      }
      // cập nhật giá trị
      let { access_token, refresh_token } = response.data;
      setAccessToken(access_token);
      setRefreshToken(refresh_token);
    }
    // tại thời điểm này access token valid, có thể định danh được người dùng
    // nhưng người dùng chưa được xác thực quyền truy cập nên vẫn gán là chưa authen
    dispatcher({
      slice: AuthContext,
      type: AuthActionList.UpdateContext,
      ...{
        isAuthen: false,
        tokens: {
          access_token: getAccessToken(),
          refresh_token: getRefreshToken(),
        },
      },
    });
    // authDispatcher({
    //   type: 'AUTH_UPDATE_CONTEXT',
    //   payload: {
    //     isAuthen: false,
    //     tokens: {
    //       access_token: getAccessToken(),
    //       refresh_token: getRefreshToken(),
    //     },
    //   },
    // });
    // config axios interceptors
    // cấu hình cơ chế lấy access tự động từ local storage
    // cấu hình cơ chế tự làm mới token và quay về login nếu không thành công
    configAxios();
    // return values
    log.trace(tag, 'Success');
    result.success('Sucecss');
    return result;
  };
  const configAxios = () => {
    // Add a request interceptor
    axios.interceptors.request.use(
      (config) => {
        if (config.url == SSOLogoutUrl) {
          return config;
        }
        const token = getAccessToken();
        if (token) {
          config.headers['Authorization'] = 'Bearer ' + token;
        }

        config.paramsSerializer = (params) => qs.stringify(params);

        // config.headers['Content-Type'] = 'application/json';
        return config;
      },
      (error) => {
        Promise.reject(error);
      },
    );

    axios.interceptors.response.use(
      function (response) {
        if (typeof response.data.code == 'undefined') {
          if (response.data === '') {
            response.data = {};
          }
          response.data.code = response.status;
        }
        return response;
      },
      function (error) {
        if (!error.response) {
          notification.error({
            description:
              'Vui lòng kiểm tra lại kết nối mạng và tải lại (F5) website!',
            duration: 5000,
          });
          throw error;
        }
        log.error(tag, error);
        // xử lý lỗi authen với mã 401
        const originalRequest = error.config;
        if (
          [401, 400].includes(error.response.status) &&
          originalRequest.url === SSOTokenUrl
        ) {
          history.push('/login');
          return Promise.reject(error);
        }
        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          const refreshToken = getRefreshToken();

          return Service.invokeRefreshToken(refreshToken).then((response) => {
            if (response.status === 200) {
              let { access_token, refresh_token } = response.data;
              setAccessToken(access_token);
              setRefreshToken(refresh_token);
              axios.defaults.headers.common['Authorization'] =
                'Bearer ' + getAccessToken();
              dispatcher({
                slice: AuthContext,
                type: AuthActionList.UpdateContext,
                data: {
                  isAuthen: true,
                  tokens: {
                    access_token: access_token,
                    refresh_token: refresh_token,
                  },
                },
              });
              return axios(originalRequest);
            }
            return Promise.reject(error);
          });
        }
        if (error.code == 'ECONNABORTED') {
          notification.error({ title: 'Có lỗi xảy ra', description: '' });
          return Promise.reject(error);
        }
        if (typeof error.response != 'undefined') {
          error.response.data.code = error.response.data.status;
        } else {
          error.response = {
            data: {
              code: 400,
            },
          };
        }
        return error.response;
      },
    );
  };
  const getSubscriptionVersion = useCallback(() => {
    return localStorage.getItem('subscription_version') || false;
  }, []);
  const getAccessToken = useCallback(() => {
    return localStorage.getItem('authen_access_token') || false;
  }, []);
  const setAccessToken = useCallback((access_token) => {
    localStorage.setItem('authen_access_token', access_token);
  }, []);
  const getRefreshToken = useCallback(() => {
    return localStorage.getItem('authen_refresh_token') || false;
  }, []);
  const setRefreshToken = useCallback((refresh_token) => {
    localStorage.setItem('authen_refresh_token', refresh_token);
  }, []);
  const cleanup = useCallback(async () => {
    localStorage.setItem('authen_access_token', '');
    localStorage.setItem('authen_refresh_token', '');
    localStorage.setItem('subscription_version', '');
    dispatcher({ slice: AuthContext, type: AuthActionList.ResetContext });
    axios.defaults.headers.common['Authorization'] = '';
  }, []);
  const setIsAuthen = useCallback(async (isAuthen) => {
    dispatcher({
      slice: AuthContext,
      type: AuthActionList.SetIsAuth,
      data: isAuthen,
    });
  }, []);
  const doLogin = useCallback(async (email, password) => {
    let result = new DomainResponse();
    try {
      let response = await Service.invokeSSOLogin(email, password);
      if (!Service.isSuccess(response)) {
        result.failed('Refresh token không hợp lệ');
      }
      let { access_token, refresh_token } = response.data;
      localStorage.setItem('authen_access_token', access_token);
      localStorage.setItem('authen_refresh_token', refresh_token);
      dispatcher({
        slice: AuthContext,
        type: AuthActionList.UpdateContext,
        data: {
          isAuthen: false,
          isLogout: false,
          tokens: {
            access_token: access_token,
            refresh_token: refresh_token,
          },
        },
      });
      // config axios interceptors
      // cấu hình cơ chế lấy access tự động từ local storage
      // cấu hình cơ chế tự làm mới token và quay về login nếu không thành công
      configAxios();
      result.success('Login success', response.data);
      return result;
    } catch (errors) {
      result.failed('Lỗi', errors.response.data);
      return result;
    }
  }, []);
  const doLoginWithTokens = useCallback(async (access_token, refresh_token) => {
    let result = new DomainResponse();
    try {
      localStorage.setItem('authen_access_token', access_token);
      localStorage.setItem('authen_refresh_token', refresh_token);
      dispatcher({
        slice: AuthContext,
        type: AuthActionList.UpdateContext,
        data: {
          isAuthen: false,
          isLogout: false,
          tokens: {
            access_token: access_token,
            refresh_token: refresh_token,
          },
        },
      });
      // config axios interceptors
      // cấu hình cơ chế lấy access tự động từ local storage
      // cấu hình cơ chế tự làm mới token và quay về login nếu không thành công
      configAxios();
      result.success('Login with token success');
      return result;
    } catch (errors) {
      result.failed('Lỗi', errors.response.data);
      return result;
    }
  }, []);
  const doLogout = useCallback(async () => {
    let result = new DomainResponse();
    let response = await Service.invokeSSOLogout(getRefreshToken());
    if (!Service.isSuccess(response)) {
      result.failed('Refresh token không hợp lệ');
    }
    // xoá toàn bộ cache khi logout
    await cache.deleteAllCache();
    // xoá toàn bộ localstorage khi logout, cần giữ lại thông tin checkbox "remember me" ở màn login
    var a00Data = localStorage.getItem('A00Data');
    localStorage.clear();
    localStorage.setItem('A00Data', a00Data);
    // xoá stores
    dispatcher({ slice: AuthContext, type: AuthActionList.ResetContext });
    dispatcher({ slice: UserContext, type: UserActionList.ResetContext });
    dispatcher({ slice: ConfigContext, type: ConfigActionList.ResetContext });
    window.location = '/login';
  }, []);
  return [
    authContext,
    {
      init,
      configAxios,
      doLogin,
      doLoginWithTokens,
      doLogout,
      setIsAuthen,
      cleanup,
      getAccessToken,
      getRefreshToken,
    },
  ];
}
export default useAuth;
