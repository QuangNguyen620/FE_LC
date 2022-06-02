import log from '../ModuleLogger';
import { createSlice } from 'core/store/store';
const CM0703Context = 'CM0703Context';
const tag = CM0703Context;
const CM0703ActionList = Object.freeze({
  UpdateContext: CM0703Context + '/update',
  ResetContext: CM0703Context + '/reset',
});

const CM0703InitalState = {};

const CM0703ContextActions = {};

CM0703ContextActions[CM0703ActionList.UpdateContext] = (state, payload) => {
  log.trace(tag, 'CM0701Context_UPDATE_CONTEXT', payload);
  if (CM0703Context != payload?.slice) {
    log.error(tag, 'context not match', payload?.slice || 'undefined');
    return state;
  }
  return { ...state, CM0703Context: payload.data };
};

CM0703ContextActions[CM0703ActionList.ResetContext] = (state, payload) => {
  log.trace(tag, 'CM0701Context_RESET_CONTEXT');
  if (CM0703Context != payload?.slice) {
    log.error(tag, 'context not match', payload?.slice || 'undefined');
    return state;
  }
  return { ...state, ...CM0703InitalState };
};

const createContext = (dispatcher, data) => {
  createSlice(dispatcher, CM0703Context, CM0703ContextActions, {
    ...CM0703InitalState,
    ...data,
  });
};
export { createContext, CM0703Context, CM0703ContextActions, CM0703ActionList };
