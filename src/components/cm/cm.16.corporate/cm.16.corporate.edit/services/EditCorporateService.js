import { useRef } from 'react';
import { useDispatch, useStore } from 'core/store/store';
import {
  createContext,
  EditCorporateContext,
  EditCorporateContextActions,
  EditCorporateActionList,
} from '../contexts/EditCorporateContext';

function useCreateCorporateService() {
  const context = useStore()[EditCorporateContext];
  const dispatcher = useDispatch();

  const initContext = (data) => {
    createContext(dispatcher, data);
  };
  const updateContext = (data) => {
    dispatcher({
      slice: EditCorporateContext,
      type: EditCorporateActionList.UpdateContext,
      data: data,
    });
  };
  const resetContext = () => {
    dispatcher({
      slice: EditCorporateContext,
      type: EditCorporateActionList.ResetContext,
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
