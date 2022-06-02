import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCallback, useRef } from 'react';
import { useHistory } from 'react-router';
import useA00ContextService from '../services/AM.01.05AContextService';

export function useA00Domain() {
  const history = useHistory();
  const [context] = useA00ContextService();

  const initDomain = async () => {
    // khởi tạo nghiệp vụ
  };

  const addNewCorporateGroup = async (data) => {
    var config = {
      method: 'post',
      url:
        process.env.REACT_APP_API_BACKEND +
        '/corporate/group/co/createUserGroup',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('access_token') + '',
        'Content-Type': 'application/json',
      },
      data: data,
    };

    // axios(config)
    //   .then(function (response) {
    //     if (response.status == 200) {
    //       console.log(JSON.stringify(response.data));
    //       console.log(response);
    //       console.log("status: ", response.status);
    //     }
    //   })
    //   .then(() => {
    //     notify('Thêm mới thành công');
    //     // history.push('/home/bank-fpt-admin-manage');
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });

    console.log(config);
    return config;
  };

  const exitHandler = async (values) => {
    history.push('/home/admin-corporate-group');
  };

  const domainInterface = useRef({
    initDomain,
    addNewCorporateGroup: addNewCorporateGroup,
    exitHandler,
  });
  return [context, domainInterface.current];
}

export default useA00Domain;
