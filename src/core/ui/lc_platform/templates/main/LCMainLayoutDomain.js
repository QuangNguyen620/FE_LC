import { createSlice, useDispatch, useStore } from 'core/store/store';
import { useRef, useEffect } from 'react';
import { message } from 'antd';
import _ from 'lodash';
import log from './LCMainLayoutLogger';
import {
  KTMainLayoutContext,
  KTMainLayoutActionList,
  KTMainLayoutActions,
  KTMainLayoutInitialState,
} from './KTMainLayoutStore';
const tag = 'KTMainLayoutDomain'; // tên file

export function useKTMainLayout() {
  // const { mainLayoutContext } = useKTMainLayoutStore();
  // const dispatcher = useKTMainLayoutDispatch();
  const mainLayoutContext = useStore()[KTMainLayoutContext];
  const dispatcher = useDispatch();
  // const currentContext = 'kt.layout.main';
  const menuCollapsed = useRef(false);
  useEffect(() => {
    log.trace(tag, 'did mount');
    if (!mainLayoutContext) {
      var subscription = localStorage.getItem('subscription_version');

      createSlice(dispatcher, KTMainLayoutContext, KTMainLayoutActions, {
        ...KTMainLayoutInitialState,
        subscription: subscription,
      });
    }

    return () => {
      // TODO: remove slice
    };
  }, []);

  useEffect(() => {
    log.trace(tag, 'setSubscription');
    if (!mainLayoutContext) {
      return;
    }
    if (
      _.isEmpty(mainLayoutContext.subscription) ||
      ['P1', 'P3'].indexOf(mainLayoutContext.subscription) == -1
    ) {
      log.info(tag, 'NULLLLLL', mainLayoutContext);
      var subscription = localStorage.getItem('subscription_version');
      if (_.isEmpty(subscription) || ['P1', 'P3'].indexOf(subscription) == -1) {
        subscription = 'P1';
      }
      localStorage.setItem(
        KTMainLayoutContext,
        JSON.stringify({
          subscription: subscription,
          menuCollapsed: mainLayoutContext.menuCollapsed,
        }),
      );
    } else {
      log.info(tag, 'NOT NULL', mainLayoutContext);
      localStorage.setItem(
        KTMainLayoutContext,
        JSON.stringify(mainLayoutContext),
      );
    }
    menuCollapsed.current = mainLayoutContext.menuCollapsed;
  }, [mainLayoutContext]);

  const updateLayout = (layoutData) => {
    log.trace(tag, 'init layouttttttt');

    // createSlice(dispatcher, KTMainLayoutContext, Actions, {
    //   ...InitalState, ...layoutData});
    dispatcher({
      slice: KTMainLayoutContext,
      type: KTMainLayoutActionList.UpdateContext,
      data: layoutData,
    });
  };

  const toggleMenu = (collapsed) => {
    log.trace(tag, 'toggleMenu');
    dispatcher({
      slice: KTMainLayoutContext,
      type: KTMainLayoutActionList.ToggleMenu,
    });
  };
  const setSubscription = (subscription) => {
    log.trace(tag, 'setSubscription');
    dispatcher({
      slice: KTMainLayoutContext,
      type: KTMainLayoutActionList.UpdateSubscription,
      data: subscription,
    });
  };

  const showMessage = (type, content) => {
    return message[type]({
      content: content,
      style: {
        marginLeft: menuCollapsed.current ? 60 : 250,
      },
    });
  };

  const domain = useRef({
    updateLayout,
    toggleMenu,
    setSubscription,
    showMessage,
  });
  return [mainLayoutContext, domain.current];
}
export default useKTMainLayout;

// import { useRef, useEffect } from 'react';
// import _ from 'lodash';
// import { useStore } from 'core/store/store';

// function useKTMainLayout(shouldListen = true) {
//   const [state, dispatcher] = useStore();
//   const currentContext = 'kt.layout.main';
//   const initMainLayout = () => {
//     var subscription = localStorage.getItem('subscription_version');
//     if (!_.isEmpty(subscription)) {
//       setSubscription(subscription);
//     }
//   };
//   useEffect(() => {
//     localStorage.setItem(
//       currentContext,
//       JSON.stringify(state.mainLayoutContext),
//     );
//   }, [state.mainLayoutContext]);

//   const toggleMenu = (collapsed) => {
//     dispatcher('KTMAINLAYOUT_UPDATE_MENUCOLLAPSED', !collapsed);
//   };
//   const setSubscription = (subscription) => {
//     dispatcher('KTMAINLAYOUT_UPDATE_SUBSCRIPTION', subscription);
//   };
//   const domain = useRef({
//     id: Math.random().toFixed(2),
//     initMainLayout,
//     toggleMenu,
//     setSubscription,
//   });
//   return [state.mainLayoutContext, domain.current];
// }
// export default useKTMainLayout;
