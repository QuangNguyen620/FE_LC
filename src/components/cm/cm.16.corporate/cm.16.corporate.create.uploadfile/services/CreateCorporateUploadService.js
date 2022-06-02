import { useRef } from 'react';
import { useDispatch, useStore } from 'core/store/store';
import {
  createContext,
  CreateCorporateUploadContext,
  CreateCorporateUploadContextActions,
  CreateCorporateUploadActionList,
} from '../contexts/CreateCorporateUploadContext';

function useCreateCorporateUploadService() {
  const context = useStore()[CreateCorporateUploadContext];
  const dispatcher = useDispatch();

  const initContext = (data) => {
    createContext(dispatcher, data);
  };
  const updateContext = (data) => {
    console.log(context);
    dispatcher({
      slice: CreateCorporateUploadContext,
      type: CreateCorporateUploadActionList.UpdateContext,
      data: data,
    });
  };
  const resetContext = () => {
    dispatcher({
      slice: CreateCorporateUploadContext,
      type: CreateCorporateUploadActionList.ResetContext,
    });
  };
  const dispatchInterface = useRef({
    initContext,
    updateContext,
    resetContext,
  });

  return [context, dispatchInterface.current];
}

export default useCreateCorporateUploadService;
