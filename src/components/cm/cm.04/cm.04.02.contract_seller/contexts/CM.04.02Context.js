import log from '../ModuleLogger';
import { createSlice } from 'core/store/store';
const CM0402Context = 'CM0402Context';
const tag = CM0402Context;
const CM0402ActionList = Object.freeze({
  UpdateContext: CM0402Context + '/update',
  ResetContext: CM0402Context + '/reset',
});

const CM0402InitalState = {};

const CM0402Actions = {};

CM0402Actions[CM0402ActionList.UpdateContext] = (state, payload) => {
  log.trace(tag, 'CM0402_UPDATE_CONTEXT', payload);
  if (CM0402Context != payload?.slice) {
    log.error(tag, 'context not match', payload?.slice || 'undefined');
    return state;
  }
  return { ...state, CM0402Context: payload.data };
};

CM0402Actions[CM0402ActionList.ResetContext] = (state, payload) => {
  log.trace(tag, 'CM0402_RESET_CONTEXT');
  if (CM0402Context != payload?.slice) {
    log.error(tag, 'context not match', payload?.slice || 'undefined');
    return state;
  }
  return { ...state, ...CM0402InitalState };
};

const createContext = (dispatcher, data) => {
  createSlice(dispatcher, CM0402Context, CM0402Actions, {
    ...CM0402InitalState,
    ...data,
  });
};
export { createContext, CM0402Context, CM0402Actions, CM0402ActionList };
