import { useCallback, useRef } from 'react';
import { useHistory } from 'react-router';
import CreateCorporateService from '../services/CreateCorporateService';

export function CreateCorporateDomain() {
  const history = useHistory();
  const [context] = CreateCorporateService();

  const initDomain = async () => {
    // khởi tạo nghiệp vụ
  };

  const continueHandler = async () => {
    history.push('/home/corporate-customer/add');
  };

  const getAllUserGroup = async (data) => {
    var config = {
      method: 'get',
      url: process.env.REACT_APP_API_BACKEND + '/user/getAllGroup',
      headers: {
        // Authorization: 'Bearer ' + sessionStorage.getItem('access_token') + '',
        'Content-Type': 'application/json',
      },
      data: data,
    };

    console.log(config);
    return config;
  };

  const exitHandler = async () => {
    history.push('/home/corporate-customer');
  };

  const domainInterface = useRef({
    initDomain,
    continueHandler,
    getAllUserGroup,
    exitHandler,
  });
  return [context, domainInterface.current];
}

export default CreateCorporateDomain;
