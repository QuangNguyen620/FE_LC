import { useCallback, useRef } from 'react';
import { useHistory } from 'react-router';
import useA00ContextService from '../services/AM.01.05AContextService';

export function useA00Domain() {
  const history = useHistory();
  const [context] = useA00ContextService();

  const initDomain = async () => {
    // khởi tạo nghiệp vụ
  };

  const getUserGroup = async (id, data) => {
    console.log('Input data: ', data);
    var config = {
      method: 'get',
      url:
        process.env.REACT_APP_API_BACKEND +
        '/corporate/group/co/getUserGroupById?id=' +
        id,
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('access_token') + '',
        'Content-Type': 'application/json',
      },
      data: data,
    };
    return config;
  };

  const exitHandler = async (values) => {
    history.push('/home/admin-corporate-group');
  };
  const editHandler = async (id) => {
    history.push(`/home/admin-corporate-group/edit/${id}`);
    console.log('đã chuyển trang - id: ', id);
  };
  const toAuthorizePage = async (values) => {
    history.push(`/home/admin-corporate-group/authorize/${values}`);
  };
  const domainInterface = useRef({
    initDomain,
    getUserGroup,
    editHandler,
    toAuthorizePage,
    exitHandler,
  });
  return [context, domainInterface.current];
}

export default useA00Domain;
