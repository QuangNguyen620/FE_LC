import log from '../ModuleLogger';
import { createSlice } from 'core/store/store';
const BM010301Context = 'BM010301Context';
const tag = BM010301Context;
const BM010301ActionList = Object.freeze({
  UpdateContext: BM010301Context + '/update',
  ResetContext: BM010301Context + '/reset',
});

const BM010301InitalState = {};

const BM010301ContextActions = {};

BM010301ContextActions[BM010301ActionList.UpdateContext] = (state, payload) => {
  log.trace(tag, 'BM010301Context_UPDATE_CONTEXT', payload);
  if (BM010301Context != payload?.slice) {
    log.error(tag, 'context not match', payload?.slice || 'undefined');
    return state;
  }
  return { ...state, BM010301Context: payload.data };
};

BM010301ContextActions[BM010301ActionList.ResetContext] = (state, payload) => {
  log.trace(tag, 'BM010301Context_RESET_CONTEXT');
  if (BM010301Context != payload?.slice) {
    log.error(tag, 'context not match', payload?.slice || 'undefined');
    return state;
  }
  return { ...state, ...BM010301InitalState };
};

const createContext = (dispatcher, data) => {
  createSlice(dispatcher, BM010301Context, BM010301ContextActions, {
    ...BM010301InitalState,
    ...data,
  });
};
export { createContext, BM010301Context, BM010301ContextActions, BM010301ActionList };
