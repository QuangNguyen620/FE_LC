import log from '../ModuleLogger';
import { createSlice } from 'core/store/store';
const CM0401Context = 'CM0401Context';
const tag = CM0401Context;
const CM0401ActionList = Object.freeze({
  UpdateContext: CM0401Context + '/update',
  ResetContext: CM0401Context + '/reset',
});

const CM0401InitalState = {};

const CM0401Actions = {};

CM0401Actions[CM0401ActionList.UpdateContext] = (state, payload) => {
  // console.log("contextlass");
  log.trace(tag, 'CM0401_UPDATE_CONTEXT', payload);
  if (CM0401Context != payload?.slice) {
    log.error(tag, 'context not match', payload?.slice || 'undefined');
    return state;
  }
  // console.log("log khi data được update:::",payload.data);
  return { ...state, CM0401Context: payload.data };
};

CM0401Actions[CM0401ActionList.ResetContext] = (state, payload) => {
  log.trace(tag, 'CM0401_RESET_CONTEXT');
  if (CM0401Context != payload?.slice) {
    log.error(tag, 'context not match', payload?.slice || 'undefined');
    return state;
  }
  return { ...state, ...CM0401InitalState };
};

const createContext = (dispatcher, data) => {
  createSlice(dispatcher, CM0401Context, CM0401Actions, {
    ...CM0401InitalState,
    ...data,
  });
};
export { createContext, CM0401Context, CM0401Actions, CM0401ActionList };
