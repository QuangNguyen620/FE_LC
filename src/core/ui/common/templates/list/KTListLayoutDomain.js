import { useEffect, useRef, useState } from 'react';
import log from './KTListLayoutLogger';
import {
  KTListLayoutActionList,
  KTListLayoutActions,
  KTListLayoutContext,
  KTListLayoutInitialState,
} from './KTListLayoutStore';
import { createSlice, useDispatch, useStore } from 'core/store/store';
import { get } from 'lodash';
import { removeEmptyValuesObject } from 'core/utils/functions';

const tag = 'KTListLayoutDomain'; // tên file
function useKTListLayout() {
  // const [state, dispatcher] = useStore();
  // const state = useKTListLayoutStore();
  // const dispatcher = useKTListLayoutDispatch();

  const listLayoutContext = useStore()[KTListLayoutContext];
  const dispatcher = useDispatch();

  // context layout theo màn hình
  const [currentContext, setContext] = useState(false);

  const initLayoutForContext = (
    context = false,
    { searchCollapsed = undefined, searchQueries = {} },
  ) => {
    if (context == false) {
      return;
    }

    if (currentContext != context) {
      setContext(context);

      log.trace(tag, 'initLayoutForContext', context);

      let localState = {};
      let hasError = false;
      try {
        localState = JSON.parse(localStorage.getItem(context)) || {};
        if (!localState) {
          hasError = true;
        }
      } catch (error) {
        // Tự sửa lỗi data json format
        hasError = true;
      }

      const newState = {
        ...localState,
        searchQueries: {
          ...get(localState, 'searchQueries', {}),
          ...searchQueries,
        },
      };

      if (hasError) {
        // update local storage với giá trị mặc định
        localStorage.setItem(context, JSON.stringify(newState));
      }

      // tạo slice context
      createSlice(dispatcher, KTListLayoutContext, KTListLayoutActions, {
        ...KTListLayoutInitialState,
        searchCollapsed:
          KTListLayoutInitialState.searchCollapsed === undefined
            ? searchCollapsed !== undefined
              ? searchCollapsed
              : true
            : true,
        ...newState,
        key: context,
      });
    }
  };

  useEffect(() => {
    log.trace(tag, 'sync context to localstorage');
    if (listLayoutContext && listLayoutContext.key == currentContext) {
      localStorage.setItem(currentContext, JSON.stringify(listLayoutContext));
    }
  }, [listLayoutContext, currentContext]);

  const updateLayout = (layoutData) => {
    log.trace(tag, 'updateLayout', layoutData);
    const slice = `${KTListLayoutContext}/${currentContext}`;
    dispatcher({
      slice: slice,
      type: KTListLayoutActionList.UpdateContext,
      data: layoutData,
    });
  };

  const toggleSearch = (searchCollapsed) => {
    log.trace(tag, 'toggleSearch');
    dispatcher({
      slice: KTListLayoutContext,
      type: KTListLayoutActionList.ToggleSearch,
    });
  };

  const updateSearchQueries = (data) => {
    if (
      data.filter &&
      typeof data.filter === 'object' &&
      Object.keys(data.filter).length
    ) {
      data.filter = removeEmptyValuesObject(data.filter);
    }

    log.trace(tag, 'updateSearchQueries');
    dispatcher({
      slice: KTListLayoutContext,
      type: KTListLayoutActionList.UpdateSearchQueries,
      data,
    });
  };

  const domain = useRef({
    initLayoutForContext,
    updateLayout,
    toggleSearch,
    updateSearchQueries,
  });
  return [listLayoutContext, domain.current];
}
export default useKTListLayout;
