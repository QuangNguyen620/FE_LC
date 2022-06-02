import { useRef } from 'react';
import { useDispatch, useStore } from 'core/store/store';
import {
  createContext,
  CM0701Context,
  CM0701ContextActions,
  CM0701ActionList,
} from '../contexts/CM.07.01.Context';

function useGetAllLCApplicationService() {
  const context = useStore()[CM0701Context];
  const dispatcher = useDispatch();

  const initContext = (data) => {
    createContext(dispatcher, data);
  };
  const updateContext = (data) => {
    console.log(context);
    dispatcher({
      slice: CM0701Context,
      type: CM0701ActionList.UpdateContext,
      data: data,
    });
  };
  const resetContext = () => {
    dispatcher({
      slice: createContext,
      type: CM0701ActionList.ResetContext,
    });
  };
  const dispatchInterface = useRef({
    initContext,
    updateContext,
    resetContext,
  });

  return [context, dispatchInterface.current];
}

export default useGetAllLCApplicationService;
