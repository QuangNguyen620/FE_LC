export function isAllowSubscription(subscription) {
  return subscription && ['P1', 'P3'].indexOf(subscription) > -1;
}
export function parseAccessToken(accessToken) {
  try {
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
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.log(error);
  }
  return false;
}

export function getUrlLoginGG() {
  return (
    process.env.REACT_APP_KEYCLOAK_ENDPOINT +
    '/realms/' +
    process.env.REACT_APP_KEYCLOAK_REALM +
    '/protocol/openid-connect/auth?client_id=' +
    process.env.REACT_APP_KEYCLOAK_CLIENT_ID +
    '&redirect_uri=' +
    process.env.REACT_APP_DOMAIN +
    '/login&state=' +
    uuidv4() +
    '&response_type=code&scope=openid&kc_idp_hint=google'
  );
}

export function getUrlLoginFB() {
  return (
    process.env.REACT_APP_KEYCLOAK_ENDPOINT +
    '/realms/' +
    process.env.REACT_APP_KEYCLOAK_REALM +
    '/protocol/openid-connect/auth?client_id=' +
    process.env.REACT_APP_KEYCLOAK_CLIENT_ID +
    '&redirect_uri=' +
    process.env.REACT_APP_DOMAIN +
    '/login&state=' +
    uuidv4() +
    '&response_type=code&scope=openid&kc_idp_hint=facebook'
  );
}

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// export default {getUrlLoginGG, getUrlLoginFB}
