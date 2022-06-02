import { useRef } from 'react';
import { useDispatch, useStore } from 'core/store/store';
import {
  createContext,
  BM010601Context,
  BM010601ContextActions,
  BM010601ActionList,
} from '../contexts/BM010601Context';

function useGetAllLCApplicationService() {
  const context = useStore()[BM010601Context];
  const dispatcher = useDispatch();

  const initContext = (data) => {
    createContext(dispatcher, data);
  };
  const updateContext = (data) => {
    console.log(context);
    dispatcher({
      slice: BM010601Context,
      type: BM010601ActionList.UpdateContext,
      data: data,
    });
  };
  const resetContext = () => {
    dispatcher({
      slice: createContext,
      type: BM010601ActionList.ResetContext,
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
