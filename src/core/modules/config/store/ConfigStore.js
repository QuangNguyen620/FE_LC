import log from '../ModuleLogger';

const tag = 'ConfigStore';
const ConfigContext = 'ConfigContext';

const ConfigInitalState = {
  category: {},
  tags: [],
  classes: [],
  grades: [],
  subjects: [],
  notify: '',
  delivery: {},
  company: [],
};
const ConfigActionList = Object.freeze({
  UpdateContext: ConfigContext + '/update',
  ResetContext: ConfigContext + '/reset',
});
const ConfigActions = {};

ConfigActions[ConfigActionList.UpdateContext] = (state, payload) => {
  log.trace(tag, 'CONFIG_UPDATE_CONTEXT', payload);
  if (ConfigContext != payload?.slice) {
    log.error(tag, 'context not match', payload?.slice || 'undefined');
    return state;
  }
  return { ...state, ConfigContext: payload.data };
};

ConfigActions[ConfigActionList.ResetContext] = (state, payload) => {
  log.trace(tag, 'CONFIG_RESET_CONTEXT');
  if (ConfigContext != payload?.slice) {
    log.error(tag, 'context not match', payload?.slice || 'undefined');
    return state;
  }
  return { ...state, ConfigContext: ConfigInitalState };
};

// log.info(tag, 'Initialize store');
// const [ConfigProvider, useConfigStore, useConfigDispatch] = initStore(
//   contextName,
//   actions,
//   initalState,
// );

export { ConfigContext, ConfigActionList, ConfigActions, ConfigInitalState };
