import { useCallback, useRef } from 'react';
import { useHistory } from 'react-router';
import useA11ContextService from '../services/BM010301ContextService';

export function BM010301Domain() {
  const history = useHistory();
  const [context] = useA11ContextService();

  const initDomain = async () => {
    // khởi tạo nghiệp vụ
  };

  const getAllUserGroup = async () => {
    var config = {
      method: 'get',
      url: process.env.REACT_APP_API_BACKEND + '/bank/group/getAll',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.access_token + '',
        'Content-Type': 'application/json',
      },
    };
    console.log(config);
    return config;
  };

  const toAddPage = async () => {
    history.push('/bm-home/bank-user-group-management/add');
  };

  const toViewPage = async (id) => {
    history.push(`/bm-home/bank-user-group-management/view/${id}`);
  };

  const domainInterface = useRef({
    initDomain,
    getAllUserGroup,
    toAddPage,
    toViewPage,
  });
  return [context, domainInterface.current];
}

export default BM010301Domain;
