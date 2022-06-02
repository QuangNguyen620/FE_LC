import log from '../views/ModuleLogger';
import { createSlice } from 'core/store/store';
const EditCorporateContext = 'EditCorporateContext';
const tag = EditCorporateContext;
const EditCorporateActionList = Object.freeze({
  UpdateContext: EditCorporateContext + '/update',
  ResetContext: EditCorporateContext + '/reset',
});

const EditCorporateInitalState = {};

const EditCorporateContextActions = {};

EditCorporateContextActions[EditCorporateActionList.UpdateContext] = (
  state,
  payload,
) => {
  log.trace(tag, 'EditCorporateContext_UPDATE_CONTEXT', payload);
  if (EditCorporateContext != payload?.slice) {
    log.error(tag, 'context not match', payload?.slice || 'undefined');
    return state;
  }
  return { ...state, EditCorporateContext: payload.data };
};

EditCorporateContextActions[EditCorporateActionList.ResetContext] = (
  state,
  payload,
) => {
  log.trace(tag, 'EditCorporateContext_RESET_CONTEXT');
  if (EditCorporateContext != payload?.slice) {
    log.error(tag, 'context not match', payload?.slice || 'undefined');
    return state;
  }
  return { ...state, ...EditCorporateInitalState };
};

const createContext = (dispatcher, data) => {
  createSlice(dispatcher, EditCorporateContext, EditCorporateContextActions, {
    ...EditCorporateInitalState,
    ...data,
  });
};
export {
  createContext,
  EditCorporateContext,
  EditCorporateContextActions,
  EditCorporateActionList,
};
