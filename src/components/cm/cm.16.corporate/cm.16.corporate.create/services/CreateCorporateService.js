import { useRef } from 'react';
import { useDispatch, useStore } from 'core/store/store';
import {
  createContext,
  CreateCorporateContext,
  CreateCorporateContextActions,
  CreateCorporateActionList,
} from '../contexts/CreateCorporateContext';

function useCreateCorporateService() {
  const context = useStore()[CreateCorporateContext];
  const dispatcher = useDispatch();

  const initContext = (data) => {
    createContext(dispatcher, data);
  };
  const updateContext = (data) => {
    console.log(context);
    dispatcher({
      slice: CreateCorporateContext,
      type: CreateCorporateActionList.UpdateContext,
      data: data,
    });
  };

  const updateContextUserAC = (data) => {
    dispatcher({
      slice: CreateCorporateContext,
      type: CreateCorporateActionList.UpdateContextUserAC,
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
    updateContextUserAC,
  });

  return [context, dispatchInterface.current];
}

export default useCreateCorporateService;
