import log from '../ModuleLogger';
import { createSlice } from 'core/store/store';
const AM010401Context = 'AM010401Context';
const tag = AM010401Context;
const AM010401ActionList = Object.freeze({
  UpdateContext: AM010401Context + '/update',
  ResetContext: AM010401Context + '/reset',
});

const AM010401InitalState = {};

const AM010401Actions = {};

AM010401Actions[AM010401ActionList.UpdateContext] = (state, payload) => {
  log.trace(tag, 'AM010401_UPDATE_CONTEXT', payload);
  if (AM010401Context != payload?.slice) {
    log.error(tag, 'context not match', payload?.slice || 'undefined');
    return state;
  }
  return { ...state, AM010401Context: payload.data };
};

AM010401Actions[AM010401ActionList.ResetContext] = (state, payload) => {
  log.trace(tag, 'AM010401_RESET_CONTEXT');
  if (AM010401Context != payload?.slice) {
    log.error(tag, 'context not match', payload?.slice || 'undefined');
    return state;
  }
  return { ...state, ...AM010401InitalState };
};

const createContext = (dispatcher, data) => {
  createSlice(dispatcher, AM010401Context, AM010401Actions, {
    ...AM010401InitalState,
    ...data,
  });
};
export { createContext, AM010401Context, AM010401Actions, AM010401ActionList };
