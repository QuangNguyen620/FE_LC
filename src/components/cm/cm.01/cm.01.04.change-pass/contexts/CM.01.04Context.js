import log from '../ModuleLogger';
import { createSlice } from 'core/store/store';
const A00Context = 'A00Context';
const tag = A00Context;
const A00ActionList = Object.freeze({
  UpdateContext: A00Context + '/update',
  ResetContext: A00Context + '/reset',
});

const A00InitalState = {};

const A00Actions = {};

A00Actions[A00ActionList.UpdateContext] = (state, payload) => {
  log.trace(tag, 'A00_UPDATE_CONTEXT', payload);
  if (A00Context != payload?.slice) {
    log.error(tag, 'context not match', payload?.slice || 'undefined');
    return state;
  }
  return { ...state, A00Context: payload.data };
};

A00Actions[A00ActionList.ResetContext] = (state, payload) => {
  log.trace(tag, 'A00_RESET_CONTEXT');
  if (A00Context != payload?.slice) {
    log.error(tag, 'context not match', payload?.slice || 'undefined');
    return state;
  }
  return { ...state, ...A00InitalState };
};

const createContext = (dispatcher, data) => {
  createSlice(dispatcher, A00Context, A00Actions, {
    ...A00InitalState,
    ...data,
  });
};
export { createContext, A00Context, A00Actions, A00ActionList };
