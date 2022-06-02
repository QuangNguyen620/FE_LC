import { useRef } from 'react';
import { useDispatch, useStore } from 'core/store/store';
import {
  createContext,
  CM0708Context,
  CM0708ContextActions,
  CM0708ActionList,
} from '../contexts/CM.07.08Context';

function useCM0708ContextService() {
  const context = useStore()[CM0708Context];
  const dispatcher = useDispatch();

  const initContext = (data) => {
    createContext(dispatcher, data);
  };
  const updateContext = (data) => {
    console.log(context);
    dispatcher({
      slice: CM0708Context,
      type: CM0708ActionList.UpdateContext,
      data: data,
    });
  };
  const resetContext = () => {
    dispatcher({
      slice: CM0708Context,
      type: CM0708ActionList.ResetContext,
    });
  };
  const dispatchInterface = useRef({
    initContext,
    updateContext,
    resetContext,
  });

  return [context, dispatchInterface.current];
}

export default useCM0708ContextService;
