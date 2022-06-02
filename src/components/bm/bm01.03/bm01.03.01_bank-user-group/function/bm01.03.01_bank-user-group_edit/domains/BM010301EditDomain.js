import { message } from 'antd';
import { useRef, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';
import useBM010301Service from '../services/BM010301ContextService';
import useMultiLanguage from 'core/hooks/UseMultiLanguage';
import {
  BANK_ROLE_LIST,
  BANK_BRANCH_LEVEL,
  BANK_USER_GROUP_TYPE,
  USER_TYPE_BANK,
} from '../../../../../../../core/common/Constant';

var axios = require('axios');
export function BM010301Domain() {
  const { id } = useParams();
  const lang = useMultiLanguage();
  const history = useHistory();
  const [context, contextService] = useBM010301Service();
  const contextRef = useRef(context);
  const TIME_OUT = 300000;

  function checkData(data) {
    return typeof data !== 'undefined' && data;
  }

  function convert(str) {
    var date = new Date(str),
      mnth = ('0' + (date.getMonth() + 1)).slice(-2),
      day = ('0' + date.getDate()).slice(-2);
    return [day, mnth, date.getFullYear()].join('/');
  }

  useEffect(() => {
    contextRef.current = context;
    console.log('context::', context);
  }, [context]);

  const initDomain = async () => {
    var dataGroup = await getUserGroup();
    var channelOptions = await getAllChannel();
    var bankList = await getBankList();
    var userInfoLogin = await getInfoUserLogin();
    var userGroupPermission = await getGroupPermission();

    console.log('userInfoLogin----', userInfoLogin);
    var contextData = {
      bankUserGroup: {
        groupType: dataGroup?.groupType,
        branchLevel: dataGroup?.branchLevel,
        channels: dataGroup?.channels,
        description: dataGroup?.description,
        groupId: dataGroup?.groupId,
        role: dataGroup?.role,
        status: dataGroup?.status,
        userGroupCode: dataGroup?.userGroupCode,
        userGroupName: dataGroup?.userGroupName,
        userType: dataGroup?.userType,
        department: dataGroup?.department,
        branch: dataGroup?.branch,
        bankId: dataGroup?.bankId,
        permission: dataGroup?.permission,
        permissionList: dataGroup?.permissionList,
      },
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

    var channelOptionNew = [];
    var checkAll = false;
    var requireChannel = false;
    if (checkData(dataGroup) && checkData(channelOptions)) {
      var listChannel = dataGroup?.channels?.split(',');
      channelOptions.forEach((channelOption) => {
        var channelTemp = channelOption;
        if (checkData(listChannel)) {
          listChannel.forEach((channelChecked) => {
            if (channelOption.value == channelChecked) {
              channelTemp.checked = true;
            }
          });
        }
        channelOptionNew.push(channelTemp);
      });
      if (listChannel.length == 0) {
        requireChannel = true;
      } else if (listChannel.length == channelOptions.length) {
        checkAll = true;
      }
    }
    contextData.channelOptions = channelOptionNew;
    contextData.checkAll = checkAll;
    contextData.indeterminate = !checkAll;
    contextData.requireChannel = requireChannel;

    console.log('init domain');
    await contextService.initContext(contextData);
  };

  const getUserGroup = async () => {
    var config = {
      method: 'get',
      url:
        process.env.REACT_APP_API_BACKEND +
        '/bank/group/getUserGroupById?id=' +
        id +
        '',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('access_token') + '',
        'Content-Type': 'application/json',
      },
    };
    let response = await axios(config);
    var userGroup = {};
    if (response?.data?.code == 200) {
      var data = response?.data?.data;
      userGroup = data;
      userGroup.permissionList = data?.permission?.split(',');
      userGroup.bankId = data?.bankInfo?.bankId;
    }
    console.log('get data group:::', userGroup);
    return userGroup;
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
    if (response?.data?.code == 200) {
    }
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
      bankUserGroup: {
        ...contextRef.current?.bankUserGroup,
        permissionList: data,
      },
    });
  };
  //--------------------------------------//

  const updateUserGroup = async () => {
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
      permissionList: contextRef.current.bankUserGroup.permissionList,
    };

    var config = {
      method: 'put',
      url:
        process.env.REACT_APP_API_BACKEND + '/bank/group/updateUserGroup/' + id,
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
          'Nhóm người dùng ngân hàng đã được chỉnh sửa thành công!',
        );
        toViewHandler();
      } else if (response.data.code != 200) {
        message.error(response.data.message);
      }
    } catch (error) {
      console.log(error.status);
      console.log(error);
    }

    return config;
  };

  const toViewHandler = async () => {
    history.push('/bm-home/bank-user-group-management/view/' + id);
  };

  const exitHandler = async () => {
    history.push('/bm-home/bank-user-group-management');
  };

  const domainInterface = useRef({
    initDomain,
    getUserGroup,
    toViewHandler,
    exitHandler,
    updateUserGroup,
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
