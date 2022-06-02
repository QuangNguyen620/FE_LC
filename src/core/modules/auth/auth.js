import axios from 'axios';
import { createBrowserHistory } from 'history';
import { logout } from 'components/User/service';
import mqtt from 'core/mqtt/mqtt';
import service from './service/AuthApiService';

let refreshTokenInterval;
export default {
  async init() {
    let refreshToken = localStorage.getItem('authen_refresh_token') || false;

    const history = createBrowserHistory();

    if (refreshToken) {
      let response = await service.invokeRefreshToken(refreshToken);
      // if (res.status == 200) {
      if (service.isSuccess(response)) {
        let verify = await this.verifyUser(
          response.data.access_token,
          response.data.refresh_token,
        );
        if (!verify.success) {
          if (history.location.pathname != '/login') {
            window.location = '/login';
          }
        } else {
          if (history.location.pathname == '/login') {
            window.location = '/';
          }
        }
      } else {
        if (history.location.pathname != '/login') {
          window.location = '/login';
        }
      }
    } else {
      //login
      if (history.location.pathname != '/login') {
        window.location = '/login';
      }
    }

    return true;
  },
  getSubscriptions(accessToken) {
    let subscriptions = [];

    try {
      let base64Url = accessToken.split('.')[1];
      let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      let jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join(''),
      );

      let tokenInfo = JSON.parse(jsonPayload);
      subscriptions = tokenInfo.subscriptions;
    } catch (err) {}
    return subscriptions;
  },
  async verifyUser(accessToken, refreshToken) {
    console.log('xx2');
    var base64Url = accessToken.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join(''),
    );
    let subscriptionVersion = '';

    try {
      let tokenInfo = JSON.parse(jsonPayload);
      // console.log(tokenInfo)

      //save
      let currentVersion =
        localStorage.getItem('subscription_version') || false;

      // console.log(tokenInfo.subscriptions.indexOf(currentVersion))
      if (
        !currentVersion ||
        tokenInfo.subscriptions.indexOf(currentVersion) === -1
      ) {
        subscriptionVersion = tokenInfo.subscriptions[0];
        console.log(subscriptionVersion);
        localStorage.setItem('subscription_version', subscriptionVersion);
      }
    } catch (err) {
      console.log(err);
    }

    // console.log('saveToken')
    let self = this;
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;

    let userResponse = {};
    await Promise.all([
      this.getDanhSachLop(),
      this.getLabelTags(),
      this.getUserInfo(accessToken),
    ]).then(async (res) => {
      userResponse = res[2];
    });

    if (userResponse.data.code == 200) {
      localStorage.setItem('authen_access_token', accessToken);
      localStorage.setItem('authen_refresh_token', refreshToken);

      // console.log('mqtt.init();')
      mqtt.init();

      if (refreshTokenInterval) {
        clearInterval(refreshTokenInterval);
      }
      refreshTokenInterval = setInterval(() => {
        //
        self.init();
        // console.log('refresh token');
      }, 60000 * 5);
    }
    localStorage.setItem('authen_access_token', '');
    localStorage.setItem('authen_refresh_token', '');
    return { success: false, data: userResponse.data };
  },
  async getUserInfo(accessToken) {
    return {};
  },

  logout() {
    logout().then(() => {
      // const history = createBrowserHistory();
      var a00Data = localStorage.getItem('A00Data');
      localStorage.clear();
      localStorage.setItem('A00Data', a00Data);
      mqtt.close();
      window.location = '/login';
    });
  },
};
