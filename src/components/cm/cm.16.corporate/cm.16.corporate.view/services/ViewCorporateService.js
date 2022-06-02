import { useRef } from 'react';
import { useDispatch, useStore } from 'core/store/store';
import {
  createContext,
  CreateCorporateContext,
  CreateCorporateContextActions,
  CreateCorporateActionList,
} from '../contexts/ViewCorporateContext';

function useCreateCorporateService() {
  const context = useStore()[CreateCorporateContext];
  const dispatcher = useDispatch();

  const initContext = (data) => {
    createContext(dispatcher, data);
  };
  const updateContext = (data) => {
    dispatcher({
      slice: CreateCorporateContext,
      type: CreateCorporateActionList.UpdateContext,
      data: data,
    });
  };
  const resetContext = () => {
    dispatcher({
      slice: CreateCorporateContext,
      type: CreateCorporateActionList.ResetContext,
    });
  };
  const dispatchInterface = useRef({
    initContext,
    updateContext,
    resetContext,
  });

  return [context, dispatchInterface.current];
}

export default useCreateCorporateService;
