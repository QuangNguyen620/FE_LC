import { useRef } from 'react';
import { useDispatch, useStore } from 'core/store/store';
import {
  createContext,
  CM0702Context,
  CM0702ContextActions,
  CM0702ActionList,
} from '../contexts/CM07Context';

function useCM0702Service() {
  const context = useStore()[CM0702Context];
  const dispatcher = useDispatch();

  const initContext = (data) => {
    createContext(dispatcher, data);
  };
  const updateContext = (data) => {
    console.log(context);
    dispatcher({
      slice: CM0702Context,
      type: CM0702ActionList.UpdateContext,
      data: data,
    });
  };
  const resetContext = () => {
    dispatcher({
      slice: CM0702Context,
      type: CM0702ActionList.ResetContext,
    });
  };
  const dispatchInterface = useRef({
    initContext,
    updateContext,
    resetContext,
  });

  return [context, dispatchInterface.current];
}

export default useCM0702Service;
