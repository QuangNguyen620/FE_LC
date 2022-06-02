import log from '../ModuleLogger';

const tag = 'AuthStore';
const AuthContext = 'AuthContext';

const AuthInitalState = {
  isAuthen: false,
  isLogout: false,
  tokens: {
    access_token: '',
    refresh_token: '',
  },
};
const AuthActionList = Object.freeze({
  UpdateContext: AuthContext + '/update',
  ResetContext: AuthContext + '/reset',
  UpdateTokens: AuthContext + '/update-tokens',
  SetIsAuth: AuthContext + '/set-is-auth',
  Logout: AuthContext + '/logout',
});
const AuthActions = {};
AuthActions[AuthActionList.UpdateContext] = (state, payload) => {
  log.trace(tag, 'AUTH_UPDATE_CONTEXT', payload);
  return { ...state, AuthContext: payload.data };
};

AuthActions[AuthActionList.UpdateTokens] = (state, payload) => {
  log.trace(tag, 'AUTH_UPDATE_TOKENS', payload);
  return {
    ...state,
    AuthContext: {
      tokens: payload.data,
    },
  };
};
AuthActions[AuthActionList.SetIsAuth] = (state, payload) => {
  log.trace(tag, 'AUTH_UPDATE_IS_AUTH', payload);
  return {
    ...state,
    AuthContext: {
      isAuthen: payload.data,
    },
  };
};
AuthActions[AuthActionList.Logout] = (state, payload) => {
  log.trace(tag, 'AUTH_LOGOUT');
  return {
    ...state,
    AuthContext: {
      isLogout: true,
    },
  };
};
AuthActions[AuthActionList.ResetContext] = (state, payload) => {
  log.trace(tag, 'AUTH_RESET_CONTEXT');
  return { ...state, AuthContext: AuthInitalState };
};

export { AuthContext, AuthActionList, AuthActions, AuthInitalState };
//   case 'AUTH_UPDATE_TOKENS':
//     log.trace(tag, 'AUTH_UPDATE_TOKENS', action.payload);
//     return {
//       ...state,
//       authContext: {
//         tokens: action.payload,
//       },
//     };

//   case 'AUTH_UPDATE_IS_AUTH':
//     log.trace(tag, 'AUTH_UPDATE_IS_AUTH', action.payload);
//     return {
//       ...state,
//       authContext: {
//         isAuthen: action.payload,
//       },
//     };

//   case 'AUTH_LOGOUT':
//     log.trace(tag, 'AUTH_LOGOUT');
//     return {
//       ...initalState,
//       authContext: {
//         isLogout: true,
//       },
//     };

//   case 'AUTH_RESET_CONTEXT':
//     log.trace(tag, 'AUTH_RESET_CONTEXT');
//     return initalState;
//   default:
//     break;
// }
// };

// log.info(tag, 'Initialize store');
// const [useAuthStore, useAuthDispatch] = CreateSlice("authContext",
//   actions,
//   initalState,
// );

// export { initalState, actions };
