import axios from 'axios';
import QS from 'core/utils/query-string';
import ServiceBase from 'core/common/ServiceBase';

export const SSOLogoutUrl =
  process.env.REACT_APP_KEYCLOAK_ENDPOINT +
  '/realms/' +
  process.env.REACT_APP_KEYCLOAK_REALM +
  '/protocol/openid-connect/logout';

export const SSOTokenUrl =
  process.env.REACT_APP_KEYCLOAK_ENDPOINT +
  '/realms/' +
  process.env.REACT_APP_KEYCLOAK_REALM +
  '/protocol/openid-connect/token';

const SSOScopes =
  process.env.REACT_APP_KEYCLOAK_SCOPES != null
    ? process.env.REACT_APP_KEYCLOAK_SCOPES.split(' ')
    : '';

const SSOClientId = process.env.REACT_APP_KEYCLOAK_CLIENT_ID;

const ApiServices = Object.create(ServiceBase);

ApiServices.invokeRefreshToken = async (refreshToken) => {
  return await axios({
    method: 'POST',
    url: SSOTokenUrl,
    data: QS.stringify({
      grant_type: 'refresh_token',
      client_id: SSOClientId,
      refresh_token: refreshToken,
    }),
  });
};

ApiServices.getTokenByCode = async (code, redirect_uri) => {
  return await axios({
    method: 'POST',
    url: SSOTokenUrl,
    data: QS.stringify({
      grant_type: 'authorization_code',
      redirect_uri: process.env.REACT_APP_DOMAIN + redirect_uri,
      client_id: SSOClientId,
      code,
    }),
  }).catch((error) => {
    console.log(error);
    return error.response;
  });
};

ApiServices.registerOther = async (data) => {
  let apiUrl = process.env.REACT_APP_API_DOMAIN_P1 + '/user/create-other';
  let method = 'post';

  return await axios({
    method: method,
    url: apiUrl,
    data: QS.stringify(data),
  });
};

ApiServices.invokeSSOLogin = async (email, password) => {
  return axios({
    method: 'POST',
    url: SSOTokenUrl,
    data: QS.stringify({
      grant_type: 'password',
      scope: SSOScopes,
      username: email,
      password: password,
      client_id: SSOClientId,
    }),
  });
};

ApiServices.invokeSSOLogout = async (refreshToken) => {
  return axios({
    method: 'POST',
    url: SSOLogoutUrl,
    headers: {
      common: false,
    },
    data: QS.stringify({
      refresh_token: refreshToken,
      client_id: SSOClientId,
    }),
  });
};

export default ApiServices;
