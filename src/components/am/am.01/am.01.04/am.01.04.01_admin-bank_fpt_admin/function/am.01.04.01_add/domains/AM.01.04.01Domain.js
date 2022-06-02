import { message } from 'antd';
import 'react-toastify/dist/ReactToastify.css';
import { useCallback, useRef, useEffect } from 'react';
import { useHistory } from 'react-router';
import useAM010401ContextService from '../services/AM.01.04.01ContextService';
import { ErrorsCode } from 'core/utils/constants';
import useMultiLanguage from 'core/hooks/UseMultiLanguage';

var axios = require('axios');

export function useAM010401Domain() {
  const history = useHistory();
  const lang = useMultiLanguage();
  const [context, contextService] = useAM010401ContextService();
  const contextRef = useRef(context);

  useEffect(() => {
    contextRef.current = context;
  }, [context]);

  const TIME_OUT = 300000;

  function checkData(data) {
    return typeof data !== 'undefined' && data;
  }

  const initDomain = async () => {
    // khởi tạo nghiệp vụ
    var contextData = {
      plainOptions: [],
      checkAll: false,
      indeterminate: false,
      requireChannel: true,
      loading: false,
    };
    await contextService.initContext(contextData);

    var plainOptions = await getAllChannel();

    contextService.updateContext({
      ...contextRef.current,
      plainOptions: plainOptions,
    });
  };

  const addNewUserGroup = async (data) => {
    var config = {
      method: 'post',
      url: process.env.REACT_APP_API_BACKEND + '/admin/group/createUserGroup',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('access_token') + '',
        'Content-Type': 'application/json',
        'Accept-Language': lang,
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

  const getAllChannel = async () => {
    var config = {
      method: 'get',
      url: process.env.REACT_APP_API_BACKEND + '/data/channel/getAll',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('access_token') + '',
        'Content-Type': 'application/json',
        'Accept-Language': lang,
      },
      timeout: TIME_OUT,
    };
    let response = await axios(config);
    var tempList = [];
    if (response?.data?.code == 200) {
      console.log('getAllChannel::', response);
      var i = 1;
      var dataRes = response?.data?.data;
      if (checkData(dataRes)) {
        dataRes.forEach((channel) => {
          var temp = {
            label: channel.channelCode + '-' + channel.channelName,
            value: channel.channelCode,
            checked: false,
          };
          tempList.push(temp);
        });
      }
      console.log('tempList:::', tempList);
    }
    return tempList;
  };

  const setPlainOptions = async (data) => {
    var checkAll = false;
    var indeterminate = true;
    var requireChannel = false;
    var plainOptions = contextRef?.current?.plainOptions;
    var count = 0;

    plainOptions.forEach((channel) => {
      if (channel.checked) {
        count++;
      }
    });
    if (count == plainOptions.length) {
      checkAll = true;
      indeterminate = false;
    } else if (count == 0) {
      indeterminate = false;
      requireChannel = true;
    }
    contextService.updateContext({
      ...contextRef.current,
      plainOptions: data,
      checkAll: checkAll,
      indeterminate: indeterminate,
      requireChannel: requireChannel,
    });
  };

  const setCheckAll = async (data) => {
    contextService.updateContext({
      ...contextRef.current,
      checkAll: data,
      indeterminate: !data,
      requireChannel: !data,
    });
  };

  const exitHandler = async (values) => {
    history.push('/home/bank-fpt-admin-manage');
  };

  const domainInterface = useRef({
    initDomain,
    setPlainOptions,
    setCheckAll,
    addNewUserGroup,
    exitHandler,
  });
  return [context, domainInterface.current];
}

export default useAM010401Domain;
