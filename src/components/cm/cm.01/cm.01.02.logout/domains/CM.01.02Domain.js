import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useCallback, useRef } from 'react';
import { useHistory } from 'react-router';
import useA00ContextService from '../services/CM.01.02ContextService';
var axios = require('axios');
var qs = require('qs');

export function useA00Domain() {
  const history = useHistory();
  const [context] = useA00ContextService();

  const initDomain = async () => {
    // khởi tạo nghiệp vụ
  };

  const loginHandler = async (values) => {
    history.push('/login');
  };

  const domainInterface = useRef({
    initDomain,
    loginHandler,
  });
  return [context, domainInterface.current];
}

export default useA00Domain;
