import { useRef } from 'react';
import { useDispatch, useStore } from 'core/store/store';
import {
  createContext,
  BM010301Context,
  BM010301ContextActions,
  BM010301ActionList,
} from '../contexts/BM010301Context';

function useBM010301Service() {
  const context = useStore()[BM010301Context];
  const dispatcher = useDispatch();

  const initContext = (data) => {
    createContext(dispatcher, data);
  };
  const updateContext = (data) => {
    console.log(context);
    dispatcher({
      slice: BM010301Context,
      type: BM010301ActionList.UpdateContext,
      data: data,
    });
  };
  const resetContext = () => {
    dispatcher({
      slice: BM010301Context,
      type: BM010301ActionList.ResetContext,
    });
  };
  const dispatchInterface = useRef({
    initContext,
    updateContext,
    resetContext,
  });

  return [context, dispatchInterface.current];
}

export default useBM010301Service;
