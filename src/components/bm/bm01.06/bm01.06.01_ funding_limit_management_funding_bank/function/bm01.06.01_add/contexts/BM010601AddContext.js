import log from '../ModuleLogger';
import { createSlice } from 'core/store/store';
const BM010601AddContext = 'BM010601AddContext';
const tag = BM010601AddContext;
const BM010601ActionList = Object.freeze({
  UpdateContext: BM010601AddContext + '/update',
  ResetContext: BM010601AddContext + '/reset',
});

const BM010601InitalState = {};

const BM010601AddContextActions = {};

BM010601AddContextActions[BM010601ActionList.UpdateContext] = (state, payload) => {
  log.trace(tag, 'BM010601AddContext_UPDATE_CONTEXT', payload);
  if (BM010601AddContext != payload?.slice) {
    log.error(tag, 'context not match', payload?.slice || 'undefined');
    return state;
  }
  return { ...state, BM010601AddContext: payload.data };
};

BM010601AddContextActions[BM010601ActionList.ResetContext] = (state, payload) => {
  log.trace(tag, 'BM010601AddContext_RESET_CONTEXT');
  if (BM010601AddContext != payload?.slice) {
    log.error(tag, 'context not match', payload?.slice || 'undefined');
    return state;
  }
  return { ...state, ...BM010601InitalState };
};

const createContext = (dispatcher, data) => {
  createSlice(dispatcher, BM010601AddContext, BM010601AddContextActions, {
    ...BM010601InitalState,
    ...data,
  });
};
export {
  createContext,
  BM010601AddContext,
  BM010601AddContextActions,
  BM010601ActionList,
};
