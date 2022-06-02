import { useRef } from 'react';
import { useDispatch, useStore } from 'core/store/store';
import {
  createContext,
  CM0703Context,
  CM0703ContextActions,
  CM0703ActionList,
} from '../contexts/CM.07.03Context';

function useA1ContextService() {
  const context = useStore()[CM0703Context];
  const dispatcher = useDispatch();

  const initContext = (data) => {
    createContext(dispatcher, data);
  };
  const updateContext = (data) => {
    console.log(context);
    dispatcher({
      slice: CM0703Context,
      type: CM0703ActionList.UpdateContext,
      data: data,
    });
  };
  const resetContext = () => {
    dispatcher({
      slice: CM0703Context,
      type: CM0703ActionList.ResetContext,
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
