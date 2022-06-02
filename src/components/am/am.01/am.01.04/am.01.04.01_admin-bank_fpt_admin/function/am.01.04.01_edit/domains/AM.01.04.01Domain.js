import { useCallback, useRef, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';
import { message } from 'antd';
import useAM010401ContextService from '../services/AM.01.04.01ContextService';
import { ErrorsCode } from 'core/utils/constants';
import useMultiLanguage from 'core/hooks/UseMultiLanguage';

var axios = require('axios');

export function useAM010401Domain() {
  const { id } = useParams();
  const history = useHistory();
  const lang = useMultiLanguage();
  const [context, contextService] = useAM010401ContextService();
  const contextRef = useRef(context);
  const TIME_OUT = 300000;

  useEffect(() => {
    contextRef.current = context;
  }, [context]);

  function checkData(data) {
    return typeof data !== 'undefined' && data;
  }

  const initDomain = async () => {
    // khởi tạo nghiệp vụ
    var plainOptions = await getAllChannel();
    var userGroup = await getUserGroup(id);
    var contextData = {
      plainOptions: plainOptions,
      indeterminate: true,
      checkAll: false,
      requireChannel: false,
      loading: false,

      userGroup: userGroup,
      id: 0,
      userGroup: userGroup,
      userGroupCode: userGroup.userGroupCode,
      userGroupName: userGroup.userGroupName,
      userType: userGroup.userType,
      groupType:
        userGroup.groupType == 'bank-admin'
          ? 'Admin ngân hàng'
          : 'Quản trị hệ thống',
      branchLevel:
        userGroup.branchLevel == 'HO' ? 'Hội sở chính' : userGroup.branchLevel,
      role: userGroup.role,
      status: userGroup.status == 1 ? 'Hoạt động' : 'Ngừng hoạt động',
      description: userGroup.description,
    };

    var channelChecked = userGroup?.channels.split(',');
    var plainOptionNew = [];
    if (checkData(channelChecked) && checkData(plainOptions)) {
      plainOptions.forEach((channel, index) => {
        var tempChannel = channel;
        channelChecked.forEach((channelChecked) => {
          if (channel.value == channelChecked) {
            tempChannel.checked = true;
          }
        });
        plainOptionNew.push(tempChannel);
      });
      var count = 0;
      plainOptionNew.forEach((channel) => {
        if (channel.checked) {
          count++;
        }
      });
      if (count == plainOptions.length) {
        contextData.checkAll = true;
        contextData.indeterminate = false;
      }
      contextData.plainOptions = plainOptionNew;
    }
    await contextService.initContext(contextData);
  };

  function setCheckedChannel(data) {
    var checked = true;
    var plainOptionNew = [];
    var plainOptions = contextRef?.current?.plainOptions;
    if (checkData(data) && checkData(plainOptions)) {
      plainOptions.forEach((channel, index) => {
        var tempChannel = channel;
        data.forEach((channelChecked) => {
          if (channel.value == channelChecked) {
            tempChannel.checked = checked;
          }
        });
        plainOptionNew.push(tempChannel);
      });
      // setPlainOptions(plainOptionNew);
    }
    return plainOptionNew;
  }

  const getUserGroup = async (id) => {
    var data = '';

    var config = {
      method: 'get',
      url:
        process.env.REACT_APP_API_BACKEND +
        '/admin/group/getUserGroupById?id=' +
        id +
        '',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('access_token') + '',
        'Content-Type': 'application/json',
        'Accept-Language': lang,
      },
      timeout: TIME_OUT,
    };

    let response = await axios(config);
    data = response?.data?.data;

    return data;
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
    var countRequire = 0;

    plainOptions.forEach((channel) => {
      if (channel.checked) {
        count++;
      } else {
        countRequire++;
      }
    });
    if (count == plainOptions.length) {
      checkAll = true;
      indeterminate = false;
    } else if (count == 0) {
      indeterminate = false;
    }
    if (countRequire == plainOptions.length) {
      requireChannel = true;
    }
    console.log(contextRef.current);
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

  const setUserType = async (data) => {
    contextService.updateContext({
      ...contextRef.current,
      userType: data,
      groupType: data == contextRef.current.userGroup.userType ? contextRef.current.userGroup.groupType : '',
      role: data == contextRef.current.userGroup.userType ? contextRef.current.userGroup.role : '',
      branchLevel: data == contextRef.current.userGroup.userType ? contextRef.current.userGroup.branchLevel : '',
    });
  };

  const setGroupType = async (data) => {
    contextService.updateContext({
      ...contextRef.current,
      // userType: data,
      groupType: data,
      // role: data == contextRef.current.userGroup.userType ? contextRef.current.userGroup.role : ''
    });
  };

  const setBranchLevel = (data) => {
    contextService.updateContext({
      ...contextRef.current,
      branchLevel: data
    });
  }

  const setRole = (data) => {
    contextService.updateContext({
      ...contextRef.current,
      role: data
    });
  }


  const editUserGroup = async (id, data) => {
    var config = {
      method: 'put',
      url:
        process.env.REACT_APP_API_BACKEND +
        '/admin/group/updateUserGroup?id=' +
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
    history.push(`/home/bank-fpt-admin-manage/view/${values}`);
  };

  const domainInterface = useRef({
    initDomain,
    getUserGroup,
    setPlainOptions,
    setCheckAll,
    editUserGroup,
    exitHandler,
    setUserType,
    setGroupType,
    setBranchLevel,
    setRole,
  });
  return [context, domainInterface.current];
}

export default useAM010401Domain;
