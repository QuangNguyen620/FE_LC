import log from '../ModuleLogger';
import { createSlice } from 'core/store/store';
const CM0701Context = 'CM0701Context';
const tag = CM0701Context;
const CM0701ActionList = Object.freeze({
  UpdateContext: CM0701Context + '/update',
  ResetContext: CM0701Context + '/reset',
});

const CM0701InitalState = {};

const CM0701ContextActions = {};

CM0701ContextActions[CM0701ActionList.UpdateContext] = (state, payload) => {
  log.trace(tag, 'CM0701Context_UPDATE_CONTEXT', payload);
  if (CM0701Context != payload?.slice) {
    log.error(tag, 'context not match', payload?.slice || 'undefined');
    return state;
  }
  return { ...state, CM0701Context: payload.data };
};

CM0701ContextActions[CM0701ActionList.ResetContext] = (state, payload) => {
  log.trace(tag, 'CM0701Context_RESET_CONTEXT');
  if (CM0701Context != payload?.slice) {
    log.error(tag, 'context not match', payload?.slice || 'undefined');
    return state;
  }
  return { ...state, ...CM0701InitalState };
};

const createContext = (dispatcher, data) => {
  createSlice(dispatcher, CM0701Context, CM0701ContextActions, {
    ...CM0701InitalState,
    ...data,
  });
};
export { createContext, CM0701Context, CM0701ContextActions, CM0701ActionList };
