import { useEffect, useRef } from 'react';
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
import { message } from 'antd';

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
      requireChannel: true,
      loading: false,
    };

    var channelOptionNew = [];
    var checkAll = false;
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
      if (listChannel.length == channelOptions.length) {
        checkAll = true;
      }
    }
    contextData.channelOptions = channelOptionNew;
    contextData.checkAll = checkAll;
    contextData.indeterminate = !checkAll;

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
      // userGroup.bankId = data?.bankInfo?.bankId;
      userGroup.bankId = data?.bankInfo?.bankName;

      BANK_ROLE_LIST.forEach((role) => {
        if (role.value == data?.role) {
          userGroup.role = role.name;
        }
      });
      BANK_BRANCH_LEVEL.forEach((branchLevel) => {
        if (branchLevel.value == data?.branchLevel) {
          userGroup.branchLevel = branchLevel.label;
        }
      });

      BANK_USER_GROUP_TYPE.forEach((groupType) => {
        if (groupType.value == data?.groupType) {
          userGroup.groupType = groupType.label;
        }
      });
      userGroup.status =
        data?.status == 1 ? 'Hoạt động' : 'Ngừng hoạt động';
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

  const deleteHandler = async () => {
    var config = {
      method: 'delete',
      url:
        process.env.REACT_APP_API_BACKEND +
        '/bank/group/deleteUserGroup?id=' +
        id,
      headers: {
        Authorization: 'Bearer ' + sessionStorage.access_token + '',
        'Content-Type': 'application/json',
        'Accept-Language': lang,
      },
      timeout: TIME_OUT,
    };
    let response = await axios(config);
    if (response?.data?.code == 200) {
      message.success('Nhóm người dùng ngân hàng đã được xóa thành công!');
      exitHandler();
      return response?.data?.data;
    } else {
      message.error(response?.data?.message);
    }
    return null;
  };

  const toEditPage = async (id) => {
    history.push(`/bm-home/bank-user-group-management/edit/${id}`);
  };

  const toAuthorizePage = async (id) => {
    history.push(`/bm-home/bank-user-group-management/authorize/${id}`);
  };

  const exitHandler = async () => {
    history.push('/bm-home/bank-user-group-management');
  };

  const domainInterface = useRef({
    initDomain,
    toEditPage,
    toAuthorizePage,
    getUserGroup,
    deleteHandler,
    exitHandler,
    // getAllUserGroup,
  });
  return [context, domainInterface.current];
}

export default BM010301Domain;
