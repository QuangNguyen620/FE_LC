import { useCallback, useRef } from 'react';
import { useHistory } from 'react-router';
import useA00ContextService from '../services/AM.01.05AContextService';

export function useA00Domain() {
  const history = useHistory();
  const [context] = useA00ContextService();

  const initDomain = async () => {
    // khởi tạo nghiệp vụ
  };

  const editUserGroup = async (id, data) => {
    var config = {
      method: 'put',
      url:
        process.env.REACT_APP_API_BACKEND +
        '/corporate/group/co/updateUserGroup/' +
        id +
        '',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('access_token') + '',
        'Content-Type': 'application/json',
      },
      data: data,
    };
    return config;
  };

  const exitHandler = async (values) => {
    history.push(`/home/admin-corporate-group/view/${values}`);
  };

  const domainInterface = useRef({
    initDomain,
    editUserGroup,
    exitHandler,
  });
  return [context, domainInterface.current];
}

export default useA00Domain;
