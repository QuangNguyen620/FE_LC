import { message } from 'antd';
import { useRef, useEffect } from 'react';
import { useHistory } from 'react-router';
import useBM010301Service from '../services/BM010301ContextService';
import useMultiLanguage from 'core/hooks/UseMultiLanguage';
import {
  BANK_BRANCH_LEVEL,
  BANK_USER_GROUP_TYPE,
  USER_TYPE_BANK,
} from '../../../../../../../core/common/Constant';

var axios = require('axios');
export function BM010301Domain() {
  const lang = useMultiLanguage();
  const history = useHistory();
  const [context, contextService] = useBM010301Service();
  const contextRef = useRef(context);
  const TIME_OUT = 300000;
  const defaultChannel = 'BIN';

  useEffect(() => {
    contextRef.current = context;
    console.log('context::', context);
  }, [context]);

  function checkData(data) {
    return typeof data !== 'undefined' && data;
  }

  const initDomain = async () => {
    var channelOptions = await getAllChannel();
    var bankList = await getBankList();
    var userInfoLogin = await getInfoUserLogin();
    var userGroupPermission = await getGroupPermission();

    console.log('userInfoLogin----', userInfoLogin);
    var contextData = {
      bankUserGroup: {
        groupType: BANK_USER_GROUP_TYPE?.[0].value,
        branchLevel: BANK_BRANCH_LEVEL?.[0].value,
        channels: '',
        description: '',
        groupId: 0,
        role: '',
        status: 1,
        userGroupCode: '',
        userGroupName: '',
        userType: 'BANK',
        department: '',
        branch: '',
        bankId: userInfoLogin?.bankId,
        permission: '',
      },
      permissionList: [],
      constantValue: {
        bankList: bankList,
      },
      emptyArr: [],
      userGroupPermission: userGroupPermission,

      channelOptions: channelOptions,
      checkAll: false,
      indeterminate: false,
      requireChannel: false,
      loading: false,
    };

    console.log('init domain');
    await contextService.initContext(contextData);
    console.log('get data');
    await initConstantList();
  };

  const initConstantList = async () => {
    await getBankList();
  };

  const getBankList = async () => {
    var config = {
      method: 'get',
      url: process.env.REACT_APP_API_BACKEND + '/bank/bankinfo/getAll',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.access_token + '',
      },
    };

    let response = await axios(config);
    console.log(response.data.data);

    var tempArr = [];
    if (response.data.data.length > 0) {
      response.data.data.forEach((element) => {
        var bank = {
          bankId: element.bankId,
          bankName: element.bankName,
        };
        tempArr.push(bank);
      });
    } else {
      tempArr = [];
    }

    return tempArr;
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

      var dataRes = response?.data?.data;
      if (checkData(dataRes)) {
        dataRes.forEach((channel) => {
          var checked = false;
          if (channel.channelCode == defaultChannel) {
            checked = true;
          }
          var temp = {
            label: channel.channelCode + '-' + channel.channelName,
            value: channel.channelCode,
            checked: checked,
          };
          tempList.push(temp);
        });
      }
      console.log('tempList:::', tempList);
    }
    return tempList;
  };

  const getInfoUserLogin = async () => {
    var config = {
      method: 'get',
      url: process.env.REACT_APP_API_BACKEND + '/user/getUserLogin',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('access_token') + '',
        'Content-Type': 'application/json',
        'Accept-Language': lang,
      },
      timeout: TIME_OUT,
    };
    let response = await axios(config);

    return response?.data?.data;
  };

  const getGroupPermission = async () => {
    var config = {
      method: 'get',
      url:
        process.env.REACT_APP_API_BACKEND +
        '/bank/group/getPermission?userType=' +
        USER_TYPE_BANK,
      headers: {
        Authorization: 'Bearer ' + sessionStorage.access_token + '',
        'Content-Type': 'application/json',
        'Accept-Language': lang,
      },
      timeout: TIME_OUT,
    };
    let response = await axios(config);
    if (response?.data?.code == 200) {
      return response?.data?.data;
    }
    return null;
  };

  //----------Input change-----------------//

  const userGroupCodeChange = (e) => {
    var userGroupCode = e.target.value;
    if (userGroupCode.trim() != '' || userGroupCode.trim() != null) {
      contextService.updateContext({
        ...contextRef.current,
        bankUserGroup: {
          ...contextRef.current?.bankUserGroup,
          userGroupCode: userGroupCode,
        },
      });
    }
  };

  const userGroupNameChange = (e) => {
    var userGroupName = e.target.value;
    if (userGroupName.trim() != '' || userGroupName.trim() != null) {
      contextService.updateContext({
        ...contextRef.current,
        bankUserGroup: {
          ...contextRef.current?.bankUserGroup,
          userGroupName: userGroupName,
        },
      });
    }
  };

  const branchLevelChange = (value) => {
    contextService.updateContext({
      ...contextRef.current,
      bankUserGroup: {
        ...contextRef.current?.bankUserGroup,
        branchLevel: value,
      },
    });
  };

  const branchChange = (value) => {
    contextService.updateContext({
      ...contextRef.current,
      bankUserGroup: {
        ...contextRef.current?.bankUserGroup,
        branch: value,
      },
    });
  };

  const departmentChange = (value) => {
    contextService.updateContext({
      ...contextRef.current,
      bankUserGroup: {
        ...contextRef.current?.bankUserGroup,
        department: value,
      },
    });
  };

  const roleChange = (value) => {
    contextService.updateContext({
      ...contextRef.current,
      bankUserGroup: {
        ...contextRef.current?.bankUserGroup,
        role: value,
      },
    });
  };

  const groupTypeChange = (value) => {
    contextService.updateContext({
      ...contextRef.current,
      bankUserGroup: {
        ...contextRef.current?.bankUserGroup,
        groupType: value,
      },
    });
  };

  const statusChange = (value) => {
    contextService.updateContext({
      ...contextRef.current,
      bankUserGroup: {
        ...contextRef.current?.bankUserGroup,
        status: value,
      },
    });
  };
  const desciptionChange = (event) => {
    contextService.updateContext({
      ...contextRef.current,
      bankUserGroup: {
        ...contextRef.current?.bankUserGroup,
        description: event.target.value.trim(),
      },
    });
  };

  const setCheckAll = async (data) => {
    contextService.updateContext({
      ...contextRef.current,
      checkAll: data,
      indeterminate: false,
      requireChannel: !data,
    });
  };

  const setChannelOptions = async (data) => {
    var checkAll = false;
    var indeterminate = true;
    var requireChannel = false;
    var channelOptions = contextRef?.current?.channelOptions;
    var count = 0;

    channelOptions.forEach((channel) => {
      if (channel.checked) {
        count++;
      }
    });
    if (count == channelOptions.length) {
      checkAll = true;
      indeterminate = false;
    } else if (count == 0) {
      indeterminate = false;
      requireChannel = true;
    }
    contextService.updateContext({
      ...contextRef.current,
      channelOptions: data,
      checkAll: checkAll,
      indeterminate: indeterminate,
      requireChannel: requireChannel,
    });
  };

  const onChangePemission = async (data) => {
    contextService.updateContext({
      ...contextRef.current,
      permissionList: data,
    });
  };

  //--------------------------------------//

  const addNewUserGroup = async (data) => {
    var channelString = '';
    var channelOptions = contextRef?.current?.channelOptions;
    channelOptions.forEach((channel) => {
      if (channel.checked) {
        channelString += channel.value + ',';
      }
    });
    if (channelString.length > 0) {
      channelString = channelString.slice(0, -1);
    }

    var data = {
      userType: 'BANK',
      branchLevel: contextRef.current.bankUserGroup.branchLevel,
      branch: contextRef.current.bankUserGroup.branch,
      department: contextRef.current.bankUserGroup.department,
      channels: channelString,
      description: contextRef.current.bankUserGroup.description.trim(),
      groupType: contextRef.current.bankUserGroup.groupType,
      userGroupCode: contextRef.current.bankUserGroup.userGroupCode.trim(),
      userGroupName: contextRef.current.bankUserGroup.userGroupName.trim(),
      role: contextRef.current.bankUserGroup.role,
      status: contextRef.current.bankUserGroup.status,
      bankId: contextRef.current.bankUserGroup.bankId,
      permissionList: contextRef.current.permissionList,
    };

    var config = {
      method: 'post',
      url: process.env.REACT_APP_API_BACKEND + '/bank/group/createUserGroup',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('access_token') + '',
        'Content-Type': 'application/json',
        'Accept-Language': lang,
      },
      data: data,
      timeout: TIME_OUT,
    };

    console.log(config);
    console.log(JSON.stringify(data));

    try {
      let response = await axios(config);
      console.log(response);
      if (response.data.code == 200) {
        message.success(
          'Nhóm người dùng ngân hàng đã được thêm mới thành công!',
        );
        exitHandler();
      } else if (response.data.code != 200) {
        message.error(response.data.message);
      }
    } catch (error) {
      console.log(error.status);
      console.log(error);
    }
  };

  const exitHandler = async () => {
    history.push('/bm-home/bank-user-group-management');
  };

  const domainInterface = useRef({
    initDomain,
    addNewUserGroup,
    exitHandler,
    //----------------//
    userGroupCodeChange,
    userGroupNameChange,
    branchLevelChange,
    branchChange,
    departmentChange,
    roleChange,
    groupTypeChange,
    statusChange,
    desciptionChange,
    setCheckAll,
    setChannelOptions,
    onChangePemission,
  });
  return [context, domainInterface.current];
}

export default BM010301Domain;
