import log from '../ModuleLogger';
import { createSlice } from 'core/store/store';
const BM010601ViewContext = 'BM010601ViewContext';
const tag = BM010601ViewContext;
const BM010601ActionList = Object.freeze({
  UpdateContext: BM010601ViewContext + '/update',
  ResetContext: BM010601ViewContext + '/reset',
});

const BM010601InitalState = {};

const BM010601ViewContextActions = {};

BM010601ViewContextActions[BM010601ActionList.UpdateContext] = (state, payload) => {
  log.trace(tag, 'BM010601ViewContext_UPDATE_CONTEXT', payload);
  if (BM010601ViewContext != payload?.slice) {
    log.error(tag, 'context not match', payload?.slice || 'undefined');
    return state;
  }
  return { ...state, BM010601ViewContext: payload.data };
};

BM010601ViewContextActions[BM010601ActionList.ResetContext] = (state, payload) => {
  log.trace(tag, 'BM010601ViewContext_RESET_CONTEXT');
  if (BM010601ViewContext != payload?.slice) {
    log.error(tag, 'context not match', payload?.slice || 'undefined');
    return state;
  }
  return { ...state, ...BM010601InitalState };
};

const createContext = (dispatcher, data) => {
  createSlice(dispatcher, BM010601ViewContext, BM010601ViewContextActions, {
    ...BM010601InitalState,
    ...data,
  });
};
export {
  createContext,
  BM010601ViewContext,
  BM010601ViewContextActions,
  BM010601ActionList,
};
