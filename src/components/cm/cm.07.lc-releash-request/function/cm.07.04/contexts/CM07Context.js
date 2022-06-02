import log from '../views/ModuleLogger';
import { createSlice } from 'core/store/store';
const CM0702Context = 'CM0702Context';
const tag = CM0702Context;
const CM0702ActionList = Object.freeze({
  UpdateContext: CM0702Context + '/update',
  ResetContext: CM0702Context + '/reset',
});

const CM0702InitalState = {};

const CM0702ContextActions = {};

CM0702ContextActions[CM0702ActionList.UpdateContext] = (state, payload) => {
  log.trace(tag, 'CM0702Context_UPDATE_CONTEXT', payload);
  if (CM0702Context != payload?.slice) {
    log.error(tag, 'context not match', payload?.slice || 'undefined');
    return state;
  }
  return { ...state, CM0702Context: payload.data };
};

CM0702ContextActions[CM0702ActionList.ResetContext] = (state, payload) => {
  log.trace(tag, 'CM0702Context_RESET_CONTEXT');
  if (CM0702Context != payload?.slice) {
    log.error(tag, 'context not match', payload?.slice || 'undefined');
    return state;
  }
  return { ...state, ...CM0702InitalState };
};

const createContext = (dispatcher, data) => {
  createSlice(dispatcher, CM0702Context, CM0702ContextActions, {
    ...CM0702InitalState,
    ...data,
  });
};
export { createContext, CM0702Context, CM0702ContextActions, CM0702ActionList };
