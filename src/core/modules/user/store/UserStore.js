// import initStore from 'core/store/store';
import log from '../ModuleLogger';

const tag = 'UserStore';
const UserContext = 'UserContext';

const UserActionList = Object.freeze({
  UpdateContext: UserContext + '/update',
  ResetContext: UserContext + '/reset',
});

const UserInitalState = {};

const UserActions = {};

UserActions[UserActionList.UpdateContext] = (state, payload) => {
  log.trace(tag, 'USER_UPDATE_CONTEXT', payload);
  if (UserContext != payload?.slice) {
    log.error(tag, 'context not match', payload?.slice || 'undefined');
    return state;
  }
  return { ...state, UserContext: payload.data };
};

UserActions[UserActionList.ResetContext] = (state, payload) => {
  log.trace(tag, 'USER_RESET_CONTEXT');
  if (UserContext != payload?.slice) {
    log.error(tag, 'context not match', payload?.slice || 'undefined');
    return state;
  }
  return { ...state, ...UserInitalState };
};

export { UserContext, UserActions, UserInitalState, UserActionList };

// const initalState = {
//   userContext: { }
// };

// const reducer = (state, action) => {
//   switch (action.type) {
//     case 'USER_UPDATE_CONTEXT':
//       log.trace(tag, 'USER_UPDATE_CONTEXT', action.payload);
//       return { ...state, userContext: action.payload };
//     case 'USER_RESET_CONTEXT':
//       log.trace(tag, 'USER_RESET_CONTEXT');
//       return initalState;
//     default:
//       break;
//   }
// };

// log.info(tag, 'Initialize store');
// const [UserProvider, useUserStore, useUserDispatch] = initStore(
//   reducer,
//   initalState,
// );

// export { UserProvider, useUserStore, useUserDispatch };
