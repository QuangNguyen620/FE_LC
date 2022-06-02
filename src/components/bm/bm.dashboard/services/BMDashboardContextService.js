import { useRef } from 'react';
import { useDispatch, useStore } from 'core/store/store';
import {
  createContext,
  A1Context,
  A1ActionList,
} from '../contexts/BMDashboardContext';

function useA1ContextService() {
  const context = useStore()[A1Context];
  const dispatcher = useDispatch();

  const initContext = (data) => {
    createContext(dispatcher, data);
  };
  const updateContext = (data) => {
    console.log(context);
    dispatcher({
      slice: A1Context,
      type: A1ActionList.UpdateContext,
      data: data,
    });
  };
  const resetContext = () => {
    dispatcher({
      slice: A1Context,
      type: A1ActionList.ResetContext,
    });
  };
  const dispatchInterface = useRef({
    initContext,
    updateContext,
    resetContext,
  });

  return [context, dispatchInterface.current];
}

export default useA1ContextService;
