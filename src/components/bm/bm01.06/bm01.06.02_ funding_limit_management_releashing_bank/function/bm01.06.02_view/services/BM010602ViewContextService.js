import { useRef } from 'react';
import { useDispatch, useStore } from 'core/store/store';
import {
  createContext,
  BM010602ViewContext,
  BM010602ActionList,
} from '../contexts/BM010602ViewContext';

function useBM010601Service() {
  const context = useStore()[BM010602ViewContext];
  const dispatcher = useDispatch();

  const initContext = (data) => {
    createContext(dispatcher, data);
  };
  const updateContext = (data) => {
    console.log(context);
    dispatcher({
      slice: BM010602ViewContext,
      type: BM010602ActionList.UpdateContext,
      data: data,
    });
  };
  const resetContext = () => {
    dispatcher({
      slice: BM010602ViewContext,
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

export default useBM010601Service;
