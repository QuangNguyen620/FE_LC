import _ from 'lodash';
import log from './LCMainLayoutLogger';
// import initStore from 'core/store/store';

const tag = 'KTMainLayoutStore';

let KTMainLayoutInitialState = {
  subscription: 'P1',
  menuCollapsed: false,
};

const KTMainLayoutContext = 'KTMainLayoutContext';
let localState = false;
var subscription = localStorage.getItem('subscription_version') || false;
if (!_.isEmpty(subscription)) {
  KTMainLayoutInitialState.subscription = subscription;
}
try {
  // nghiệp vụ load dữ liệu từ localstorage
  localState = JSON.parse(localStorage.getItem(KTMainLayoutContext)) || false;
  if (!localState || localState.subscription != subscription) {
    localStorage.setItem(
      KTMainLayoutContext,
      JSON.stringify(KTMainLayoutInitialState),
    );
  } else {
    KTMainLayoutInitialState = localState;
  }
} catch (error) {
  // Tự sửa lỗi data json format
  localStorage.setItem(
    KTMainLayoutContext,
    JSON.stringify(KTMainLayoutInitialState),
  );
}

const KTMainLayoutActionList = Object.freeze({
  UpdateContext: KTMainLayoutContext + '/update',
  ResetContext: KTMainLayoutContext + '/reset',
  ToggleMenu: KTMainLayoutContext + '/toggle-menu',
  UpdateSubscription: KTMainLayoutContext + '/update-subscription',
});

// định nghĩa mảng action dạng object
const KTMainLayoutActions = {};

// định nghĩa action proprety bằng chuỗi action list
KTMainLayoutActions[KTMainLayoutActionList.UpdateContext] = (
  state,
  payload,
) => {
  log.trace(tag, KTMainLayoutActionList.UpdateContext, payload);
  if (KTMainLayoutContext != payload?.slice) {
    log.error(tag, 'context not match', payload?.slice || 'undefined');
    return state;
  }
  return { ...state, KTMainLayoutContext: payload.data };
};

KTMainLayoutActions[KTMainLayoutActionList.ToggleMenu] = (state, payload) => {
  log.trace(tag, KTMainLayoutActionList.ToggleMenu, payload);
  if (KTMainLayoutContext != payload?.slice) {
    log.error(tag, 'context not match', payload?.slice || 'undefined');
    return state;
  }
  return {
    ...state,
    KTMainLayoutContext: {
      ...state.KTMainLayoutContext,
      menuCollapsed: !state.KTMainLayoutContext.menuCollapsed,
    },
  };
};

KTMainLayoutActions[KTMainLayoutActionList.UpdateSubscription] = (
  state,
  payload,
) => {
  log.trace(tag, KTMainLayoutActionList.UpdateSubscription, payload);
  if (KTMainLayoutContext != payload?.slice) {
    log.error(tag, 'context not match', payload?.slice || 'undefined');
    return state;
  }
  return {
    ...state,
    KTMainLayoutContext: {
      ...state.KTMainLayoutContext,
      subscription: payload.data,
    },
  };
};

export {
  KTMainLayoutInitialState,
  KTMainLayoutContext,
  KTMainLayoutActions,
  KTMainLayoutActionList,
};
