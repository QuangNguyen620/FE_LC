import log from '../ModuleLogger';
import { createSlice } from 'core/store/store';
const BM010602ViewContext = 'BM010602ViewContext';
const tag = BM010602ViewContext;
const BM010602ActionList = Object.freeze({
  UpdateContext: BM010602ViewContext + '/update',
  ResetContext: BM010602ViewContext + '/reset',
});

const BM010602InitalState = {};

const BM010602ViewContextActions = {};

BM010602ViewContextActions[BM010602ActionList.UpdateContext] = (state, payload) => {
  log.trace(tag, 'BM010602ViewContext_UPDATE_CONTEXT', payload);
  if (BM010602ViewContext != payload?.slice) {
    log.error(tag, 'context not match', payload?.slice || 'undefined');
    return state;
  }
  return { ...state, BM010602ViewContext: payload.data };
};

BM010602ViewContextActions[BM010602ActionList.ResetContext] = (state, payload) => {
  log.trace(tag, 'BM010602ViewContext_RESET_CONTEXT');
  if (BM010602ViewContext != payload?.slice) {
    log.error(tag, 'context not match', payload?.slice || 'undefined');
    return state;
  }
  return { ...state, ...BM010602InitalState };
};

const createContext = (dispatcher, data) => {
  createSlice(dispatcher, BM010602ViewContext, BM010602ViewContextActions, {
    ...BM010602InitalState,
    ...data,
  });
};
export {
  createContext,
  BM010602ViewContext,
  BM010602ViewContextActions,
  BM010602ActionList,
};
