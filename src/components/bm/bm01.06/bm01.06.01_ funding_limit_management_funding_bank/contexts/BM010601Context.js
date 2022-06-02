import log from '../ModuleLogger';
import { createSlice } from 'core/store/store';
const BM010601Context = 'BM010601Context';
const tag = BM010601Context;
const BM010601ActionList = Object.freeze({
  UpdateContext: BM010601Context + '/update',
  ResetContext: BM010601Context + '/reset',
});

const BM010601InitalState = {};

const BM010601ContextActions = {};

BM010601ContextActions[BM010601ActionList.UpdateContext] = (state, payload) => {
  log.trace(tag, 'BM010601Context_UPDATE_CONTEXT', payload);
  if (BM010601Context != payload?.slice) {
    log.error(tag, 'context not match', payload?.slice || 'undefined');
    return state;
  }
  return { ...state, BM010601Context: payload.data };
};

BM010601ContextActions[BM010601ActionList.ResetContext] = (state, payload) => {
  log.trace(tag, 'BM010601Context_RESET_CONTEXT');
  if (BM010601Context != payload?.slice) {
    log.error(tag, 'context not match', payload?.slice || 'undefined');
    return state;
  }
  return { ...state, ...BM010601InitalState };
};

const createContext = (dispatcher, data) => {
  createSlice(dispatcher, BM010601Context, BM010601ContextActions, {
    ...BM010601InitalState,
    ...data,
  });
};
export {
  createContext,
  BM010601Context,
  BM010601ContextActions,
  BM010601ActionList,
};
