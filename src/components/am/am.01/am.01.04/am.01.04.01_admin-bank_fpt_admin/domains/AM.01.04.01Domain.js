import { useCallback, useRef } from 'react';
import { useHistory } from 'react-router';
import useAM010401ContextService from '../services/AM.01.04.01ContextService';
var axios = require('axios');

export function useAM010401Domain() {
  const history = useHistory();
  const [context] = useAM010401ContextService();

  const initDomain = async () => {};

  const toAddPage = async (values) => {
    history.push('/home/bank-fpt-admin-manage/add');
  };

  const toViewPage = async (values) => {
    history.push(`/home/bank-fpt-admin-manage/view/${values}`);
  };

  // const toEditPage = async (id) => {
  //   history.push(`/home/bank-fpt-admin-manage/edit/${id}`);
  //   console.log('đã chuyển trang - id: ', id);
  // };

  const domainInterface = useRef({
    initDomain,
    toAddPage,

    toViewPage,
  });
  return [context, domainInterface.current];
}

export default useAM010401Domain;
