import log from './KTListLayoutLogger';

const tag = 'KTListLayoutStore';

const KTListLayoutInitialState = {
  searchCollapsed: undefined,
  searchQueries: {},
};

const KTListLayoutContext = 'KTListLayoutContext';

const KTListLayoutActionList = Object.freeze({
  UpdateContext: KTListLayoutContext + '/update',
  ResetContext: KTListLayoutContext + '/reset',
  ToggleSearch: KTListLayoutContext + '/toggle-search',
  UpdateSearchQueries: KTListLayoutContext + '/update-search-queries',
});

const KTListLayoutActions = {};

KTListLayoutActions[KTListLayoutActionList.UpdateContext] = (
  state,
  payload,
) => {
  log.trace(tag, KTListLayoutActionList.UpdateContext, payload);
  if (KTListLayoutContext != payload?.slice) {
    log.error(tag, 'context not match', payload?.slice || 'undefined');
    return state;
  }
  return { ...state, KTListLayoutContext: payload.data };
};

KTListLayoutActions[KTListLayoutActionList.ResetContext] = (state, payload) => {
  log.trace(tag, KTListLayoutActionList.ResetContext);
  if (KTListLayoutContext != payload?.slice) {
    log.error(tag, 'context not match', payload?.slice || 'undefined');
    return state;
  }
  return { ...state, KTListLayoutContext: KTListLayoutInitialState };
};

KTListLayoutActions[KTListLayoutActionList.ToggleSearch] = (state, payload) => {
  log.trace(tag, KTListLayoutActionList.ToggleSearch);
  if (KTListLayoutContext != payload?.slice) {
    log.error(tag, 'context not match', payload?.slice || 'undefined');
    return state;
  }
  return {
    ...state,
    KTListLayoutContext: {
      ...state.KTListLayoutContext,
      searchCollapsed: !state.KTListLayoutContext.searchCollapsed,
    },
  };
};

KTListLayoutActions[KTListLayoutActionList.UpdateSearchQueries] = (
  state,
  payload,
) => {
  log.trace(tag, KTListLayoutActionList.UpdateSearchQueries);
  if (KTListLayoutContext != payload?.slice) {
    log.error(tag, 'context not match', payload?.slice || 'undefined');
    return state;
  }
  return {
    ...state,
    KTListLayoutContext: {
      ...state.KTListLayoutContext,
      searchQueries: payload.data,
    },
  };
};

export {
  KTListLayoutInitialState,
  KTListLayoutContext,
  KTListLayoutActions,
  KTListLayoutActionList,
};

// const reducer = (state, action) => {
//   switch (action.type) {
//     case KTListLayoutActionList.UpdateContext:
//       log.trace(tag, action.type, action.payload);
//       return { ...state, listLayoutContext: action.payload };
//     case KTListLayoutActionList.ToggleSearch:
//       log.trace(tag, action.type);
//       return {
//         ...state,
//         listLayoutContext: {
//           searchCollapsed: !state.listLayoutContext.searchCollapsed,
//         },
//       };
//     case KTListLayoutActionList.ResetContext:
//       log.trace(tag, action.type);
//       return initalState;
//     default:
//       break;
//   }
// };

// log.info(tag, 'Initialize store', initalState);
// const [KTListLayoutProvider, useKTListLayoutStore, useKTListLayoutDispatch] =
//   initStore(reducer, initalState);

// export {
//   useKTListLayoutStore,
//   useKTListLayoutDispatch,
//   KTListLayoutProvider,
//   KTListLayoutActionList as KTListLayoutCommandList,
// };

// const configureStore = () => {
//   log.trace('Initialize KTListLayout store');
//   const actions = {
//     KTLISTLAYOUT_UPDATE_CONTEXT: (curState, payload) => {
//       log.trace(tag, 'Update context', payload);
//       if (_.isEqual(payload, curState.listLayoutContext)) {
//         return false;
//       }
//       return { listLayoutContext: payload };
//     },
//     KTLISTLAYOUT_TOGGLESEARCH: (curState, payload) => {
//       if (_.isEqual(payload, curState.listLayoutContext.searchCollapsed)) {
//         return true;
//       }
//       let newContext = { ...curState.listLayoutContext };
//       newContext.searchCollapsed = payload;
//       return { listLayoutContext: newContext };
//     },
//     KTLISTLAYOUT_RESET_CONTEXT: (curState) => {
//       log.trace(tag, 'Reset context');
//       return INITIAL_STATE;
//     },
//   };

//   initStore(actions, INITIAL_STATE);
// };

// export default configureStore;
