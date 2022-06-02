import { useRef } from 'react';
import { useDispatch, useStore } from 'core/store/store';
import {
  createContext,
  CM0401Context,
  CM0401ContextAction,
  CM0401ActionList,
} from '../contexts/CM.04.01Context';

function useCM0401ContextService() {
  const context = useStore()[CM0401Context];
  const dispatcher = useDispatch();

  const initContext = (data) => {
    console.log('log khi khởi tạo data:::');
    createContext(dispatcher, data);
  };

  const updateContext = (data) => {
    console.log('log khi update data:::', data);
    dispatcher({
      slice: CM0401Context,
      type: CM0401ActionList.UpdateContext,
      data: data,
    });
  };

  const resetContext = () => {
    console.log('log khi reset data:::');
    dispatcher({
      slice: CM0401Context,
      type: CM0401ActionList.ResetContext,
    });
  };

  const dispatchInterface = useRef({
    initContext,
    updateContext,
    resetContext,
  });

  return [context, dispatchInterface.current];
}

export default useCM0401ContextService;
