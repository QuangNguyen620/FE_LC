import { useRef } from 'react';
import { useDispatch, useStore } from 'core/store/store';
import {
  createContext,
  BM010602Context,
  BM010602ContextActions,
  BM010602ActionList,
} from '../contexts/BM010602Context';

function useGetAllLCApplicationService() {
  const context = useStore()[BM010602Context];
  const dispatcher = useDispatch();

  const initContext = (data) => {
    createContext(dispatcher, data);
  };
  const updateContext = (data) => {
    console.log(context);
    dispatcher({
      slice: BM010602Context,
      type: BM010602ActionList.UpdateContext,
      data: data,
    });
  };
  const resetContext = () => {
    dispatcher({
      slice: createContext,
      type: BM010602ActionList.ResetContext,
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
