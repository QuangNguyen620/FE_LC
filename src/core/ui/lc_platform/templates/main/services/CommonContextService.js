import { useRef } from 'react';
import { useDispatch, useStore } from 'core/store/store';
import {
  createContext,
  A00Context,
  A00ActionList,
} from '../contexts/CommonContext';

function useA00ContextService() {
  const context = useStore()[A00Context];
  const dispatcher = useDispatch();

  const initContext = (data) => {
    createContext(dispatcher, data);
  };
  const updateContext = (data) => {
    console.log(context);
    dispatcher({
      slice: A00Context,
      type: A00ActionList.UpdateContext,
      data: data,
    });
  };
  const resetContext = () => {
    dispatcher({
      slice: A00Context,
      type: A00ActionList.ResetContext,
    });
  };
  const dispatchInterface = useRef({
    initContext,
    updateContext,
    resetContext,
  });

  return [context, dispatchInterface.current];
}

export default useA00ContextService;
