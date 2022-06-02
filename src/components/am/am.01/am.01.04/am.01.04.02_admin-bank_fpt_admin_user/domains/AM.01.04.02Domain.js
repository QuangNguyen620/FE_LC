import { useCallback, useRef } from 'react';
import { useHistory } from 'react-router';
import useA00ContextService from '../services/AM.01.04.01ContextService';

export function useA00Domain() {
  const history = useHistory();
  const [context] = useA00ContextService();

  const initDomain = async () => {
    // khởi tạo nghiệp vụ
  };

  const toAddPage = async (values) => {
    history.push('/home/bank-fpt-admin-manage-user/add');
  };

  const toViewPage = async (values) => {
    history.push(`/home/bank-fpt-admin-manage-user/view/${values}`);
  };

  // const toAuthorizePage = async (values) => {
  //   history.push(`/home/bank-fpt-admin-manage/authorize/${values}`);
  // };

  const domainInterface = useRef({
    initDomain,
    toAddPage,
    toViewPage,
    // toAuthorizePage,
  });
  return [context, domainInterface.current];
}

export default useA00Domain;
