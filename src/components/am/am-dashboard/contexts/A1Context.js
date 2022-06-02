import log from '../ModuleLogger';
import { createSlice } from 'core/store/store';
const A1Context = 'A1Context';
const tag = A1Context;
const A1ActionList = Object.freeze({
  UpdateContext: A1Context + '/update',
  ResetContext: A1Context + '/reset',
});

const A1InitalState = {};

const A1Actions = {};

A1Actions[A1ActionList.UpdateContext] = (state, payload) => {
  log.trace(tag, 'A1_UPDATE_CONTEXT', payload);
  if (A1Context != payload?.slice) {
    log.error(tag, 'context not match', payload?.slice || 'undefined');
    return state;
  }
  return { ...state, A00Context: payload.data };
};

A1Actions[A1ActionList.ResetContext] = (state, payload) => {
  log.trace(tag, 'A1_RESET_CONTEXT');
  if (A1Context != payload?.slice) {
    log.error(tag, 'context not match', payload?.slice || 'undefined');
    return state;
  }
  return { ...state, ...A1InitalState };
};

const createContext = (dispatcher, data) => {
  createSlice(dispatcher, A1Context, A1Actions, {
    ...A1InitalState,
    ...data,
  });
};
export { createContext, A1Context, A1Actions, A1ActionList };
