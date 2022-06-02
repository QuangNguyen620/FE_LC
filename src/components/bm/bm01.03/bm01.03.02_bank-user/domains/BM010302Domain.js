import { useCallback, useRef } from 'react';
import { useHistory } from 'react-router';
import useA11ContextService from '../services/BM010302ContextService';

export function BM010302Domain() {
  const history = useHistory();
  const [context] = useA11ContextService();

  const initDomain = async () => {
    // khởi tạo nghiệp vụ
  };

  const getAllUser = async () => {
    var config = {
      method: 'get',
      url: process.env.REACT_APP_API_BACKEND + '/bank/user/getAll',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.access_token + '',
        'Content-Type': 'application/json',
      },
    };
    console.log(config);
    return config;
  };

  const toAddPage = async () => {
    history.push('/bm-home/bank-user-management/add');
  };

  const toViewPage = async (id) => {
    history.push(`/bm-home/bank-user-management/view/${id}`);
  };

  const resetPassword = async (data) => {
    var url = process.env.REACT_APP_API_BACKEND + '/user/resetPasswordUser';
    if (data.userType == 'BANK') {
      var url =
        process.env.REACT_APP_API_BACKEND + '/user/resetPasswordUserBank';
    }
    var dataBody = {
      userId: data.userId,
    };
    var config = {
      method: 'put',
      url: url,
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('access_token') + '',
        'Content-Type': 'application/json',
      },
      data: dataBody,
    };
    console.log(config);
    return config;
  };

  const domainInterface = useRef({
    initDomain,
    getAllUser,
    toAddPage,
    toViewPage,
    resetPassword,
  });
  return [context, domainInterface.current];
}

export default BM010302Domain;
