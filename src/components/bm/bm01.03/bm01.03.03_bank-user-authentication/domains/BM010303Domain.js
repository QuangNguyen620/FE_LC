import { useCallback, useRef } from 'react';
import { useHistory } from 'react-router';
import useA11ContextService from '../services/BM010303ContextService';

export function BM010303Domain() {
  const history = useHistory();
  const [context] = useA11ContextService();

  const initDomain = async () => {
    // khởi tạo nghiệp vụ
  };

  const getAllUserAuth = async () => {
    var config = {
      method: 'get',
      url: process.env.REACT_APP_API_BACKEND + '/bank/user/getManageAuthAll',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.access_token + '',
        'Content-Type': 'application/json',
      },
    };
    console.log(config);
    return config;
  };

  const toViewPage = async (id) => {
    history.push('/bm-home/bank-user-authentication-management/view/' + id);
  };

  const domainInterface = useRef({
    initDomain,
    getAllUserAuth,
    toViewPage,
  });
  return [context, domainInterface.current];
}

export default BM010303Domain;
