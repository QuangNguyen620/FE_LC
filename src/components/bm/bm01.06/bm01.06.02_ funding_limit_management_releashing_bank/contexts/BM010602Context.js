import log from '../ModuleLogger';
import { createSlice } from 'core/store/store';
const BM010602Context = 'BM010602Context';
const tag = BM010602Context;
const BM010602ActionList = Object.freeze({
  UpdateContext: BM010602Context + '/update',
  ResetContext: BM010602Context + '/reset',
});

const BM010602InitalState = {};

const BM010602ContextActions = {};

BM010602ContextActions[BM010602ActionList.UpdateContext] = (state, payload) => {
  log.trace(tag, 'BM010602Context_UPDATE_CONTEXT', payload);
  if (BM010602Context != payload?.slice) {
    log.error(tag, 'context not match', payload?.slice || 'undefined');
    return state;
  }
  return { ...state, BM010602Context: payload.data };
};

BM010602ContextActions[BM010602ActionList.ResetContext] = (state, payload) => {
  log.trace(tag, 'BM010602Context_RESET_CONTEXT');
  if (BM010602Context != payload?.slice) {
    log.error(tag, 'context not match', payload?.slice || 'undefined');
    return state;
  }
  return { ...state, ...BM010602InitalState };
};

const createContext = (dispatcher, data) => {
  createSlice(dispatcher, BM010602Context, BM010602ContextActions, {
    ...BM010602InitalState,
    ...data,
  });
};
export {
  createContext,
  BM010602Context,
  BM010602ContextActions,
  BM010602ActionList,
};
