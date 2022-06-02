import { useCallback, useRef } from 'react';
import { useHistory } from 'react-router';
import useA11ContextService from '../services/CM.16.02Service';
var axios = require('axios');
export function CM1602Domain() {
  const history = useHistory();
  const [context] = useA11ContextService();

  const initDomain = async () => {
    // khởi tạo nghiệp vụ
  };

  const getAllCorporateUser = async () => {
    var config = {
      method: 'get',
      url:
        process.env.REACT_APP_API_BACKEND +
        '/corporate/getAllCorporateUser?corporateId=' +
        localStorage.corporateId +
        '',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.access_token + '',
        'Content-Type': 'application/json',
      },
    };
    console.log(config);
    return config;
  };

  const toViewPage = async (id) => {
    history.push(`/cm-home/corporate-user-manage/view/${id}`);
  };

  const domainInterface = useRef({
    initDomain,
    getAllCorporateUser,
    toViewPage,
  });
  return [context, domainInterface.current];
}

export default CM1602Domain;
