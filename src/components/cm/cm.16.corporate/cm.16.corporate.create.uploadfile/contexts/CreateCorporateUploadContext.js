import log from '../ModuleLogger';
import { createSlice } from 'core/store/store';
const CreateCorporateUploadContext = 'CreateCorporateUploadContext';
const tag = CreateCorporateUploadContext;
const CreateCorporateUploadActionList = Object.freeze({
  UpdateContext: CreateCorporateUploadContext + '/update',
  ResetContext: CreateCorporateUploadContext + '/reset',
});

const CreateCorporateUploadInitalState = {};

const CreateCorporateUploadContextActions = {};

CreateCorporateUploadContextActions[
  CreateCorporateUploadActionList.UpdateContext
] = (state, payload) => {
  log.trace(tag, 'CreateCorporateUploadContext_UPDATE_CONTEXT', payload);
  if (CreateCorporateUploadContext != payload?.slice) {
    log.error(tag, 'context not match', payload?.slice || 'undefined');
    return state;
  }
  return { ...state, CreateCorporateUploadContext: payload.data };
};

CreateCorporateUploadContextActions[
  CreateCorporateUploadActionList.ResetContext
] = (state, payload) => {
  log.trace(tag, 'CreateCorporateUploadContext_RESET_CONTEXT');
  if (CreateCorporateUploadContext != payload?.slice) {
    log.error(tag, 'context not match', payload?.slice || 'undefined');
    return state;
  }
  return { ...state, ...CreateCorporateUploadInitalState };
};

const createContext = (dispatcher, data) => {
  createSlice(
    dispatcher,
    CreateCorporateUploadContext,
    CreateCorporateUploadContextActions,
    {
      ...CreateCorporateUploadInitalState,
      ...data,
    },
  );
};
export {
  createContext,
  CreateCorporateUploadContext,
  CreateCorporateUploadContextActions,
  CreateCorporateUploadActionList,
};
