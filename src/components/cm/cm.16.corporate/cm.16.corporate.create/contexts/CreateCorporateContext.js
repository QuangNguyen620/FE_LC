import log from '../views/ModuleLogger';
import { createSlice } from 'core/store/store';
const CreateCorporateContext = 'CreateCorporateContext';
const tag = CreateCorporateContext;
const CreateCorporateActionList = Object.freeze({
  UpdateContext: CreateCorporateContext + '/update',
  ResetContext: CreateCorporateContext + '/reset',
});

const CreateCorporateInitalState = {};

const CreateCorporateContextActions = {};

CreateCorporateContextActions[CreateCorporateActionList.UpdateContext] = (
  state,
  payload,
) => {
  log.trace(tag, 'CreateCorporateContext_UPDATE_CONTEXT', payload);
  if (CreateCorporateContext != payload?.slice) {
    log.error(tag, 'context not match', payload?.slice || 'undefined');
    return state;
  }
  return { ...state, CreateCorporateContext: payload.data };
};

CreateCorporateContextActions[CreateCorporateActionList.ResetContext] = (
  state,
  payload,
) => {
  log.trace(tag, 'CreateCorporateContext_RESET_CONTEXT');
  if (CreateCorporateContext != payload?.slice) {
    log.error(tag, 'context not match', payload?.slice || 'undefined');
    return state;
  }
  return { ...state, ...CreateCorporateInitalState };
};

const createContext = (dispatcher, data) => {
  createSlice(
    dispatcher,
    CreateCorporateContext,
    CreateCorporateContextActions,
    {
      ...CreateCorporateInitalState,
      ...data,
    },
  );
};
export {
  createContext,
  CreateCorporateContext,
  CreateCorporateContextActions,
  CreateCorporateActionList,
};
