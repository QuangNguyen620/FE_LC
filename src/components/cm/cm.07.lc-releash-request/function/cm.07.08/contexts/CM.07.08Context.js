import log from '../ModuleLogger';
import { createSlice } from 'core/store/store';
const CM0708Context = 'CM0708Context';
const tag = CM0708Context;
const CM0708ActionList = Object.freeze({
  UpdateContext: CM0708Context + '/update',
  ResetContext: CM0708Context + '/reset',
});

const CM0708InitalState = {};

const CM0708ContextActions = {};

CM0708ContextActions[CM0708ActionList.UpdateContext] = (state, payload) => {
  log.trace(tag, 'CM0701Context_UPDATE_CONTEXT', payload);
  if (CM0708Context != payload?.slice) {
    log.error(tag, 'context not match', payload?.slice || 'undefined');
    return state;
  }
  return { ...state, CM0708Context: payload.data };
};

CM0708ContextActions[CM0708ActionList.ResetContext] = (state, payload) => {
  log.trace(tag, 'CM0701Context_RESET_CONTEXT');
  if (CM0708Context != payload?.slice) {
    log.error(tag, 'context not match', payload?.slice || 'undefined');
    return state;
  }
  return { ...state, ...CM0708InitalState };
};

const createContext = (dispatcher, data) => {
  createSlice(dispatcher, CM0708Context, CM0708ContextActions, {
    ...CM0708InitalState,
    ...data,
  });
};
export { createContext, CM0708Context, CM0708ContextActions, CM0708ActionList };
