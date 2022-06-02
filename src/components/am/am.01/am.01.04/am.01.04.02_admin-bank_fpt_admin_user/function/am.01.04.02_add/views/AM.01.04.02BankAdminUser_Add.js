import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Col,
  Row,
  Input,
  Button,
  Form,
  Select,
  Checkbox,
  Space,
  Radio,
  DatePicker,
  message,
} from 'antd';
import moment from 'moment';

import '../../../common/less/AM.01.04.02.less';
import '../../../../../../../../assets/less/LC-common.less';

import { useA00Domain } from '../domains/AM.01.04.02AddDomain';
import { useHistory } from 'react-router';
import AddSuccessModal from '../../../common/modal/add/AddSuccessModal';
import AddFailModal from '../../../common/modal/add/AddFailModal';
import { KTTitle } from 'core/ui';
import { disabledDate } from 'core/utils/functions';
var axios = require('axios');

const fptGroupType = [{ label: 'Quản trị hệ thống', value: 'sys-admin' }];
const bankGroupType = [{ label: 'Admin ngân hàng', value: 'bank-admin' }];

const bankRolelOptions = [
  { label: 'Maker', value: 'Maker' },
  { label: 'Approver', value: 'Approver' },
  { label: 'Maker+Approver', value: 'Maker+Approver' },
];
const fptRoleOptions = [{ label: 'Quản trị hệ thống', value: 'System' }];

const fptAuthenticationMedthods = [{ label: 'None', value: 'none' }];
const bankSiteBranchLevel = [{ label: 'Hội sở chính', value: 'HO' }];
const bankAuthenticationMedthods = [
  { label: 'None', value: 'none' },
  { label: 'Mật khẩu giao dịch', value: 'password' },
  { label: 'OTP', value: 'otp' },
];

const defaultCheckedList = [];

const AM010402BankAdminAddView = ({ lang = 'vi', ...props }) => {
  const { t } = useTranslation();
  const history = useHistory();
  const [, am010402Domain] = useA00Domain();
  const dateFormatList = 'DD/MM/YYYY';
  const [modalVisible, setModalVisible] = useState(false);
  const [modalFailVisible, setModalFailVisible] = useState(false);
  const [form] = Form.useForm();
  const [checkedList, setCheckedList] = React.useState(defaultCheckedList);
  const [indeterminate, setIndeterminate] = React.useState(true);
  const [checkAll, setCheckAll] = React.useState(false);

  const [userType, setUserType] = useState('BANK');

  const exceptThisSymbols = ['e', 'E', '+', '-', '.'];

  const [groupTypeOptions, setGroupTypeOption] = useState(bankGroupType);

  const [branchLevel, setBranchLevel] = useState('');
  const [role, setRole] = useState('');
  const [groupType, setGroupType] = useState('');
  const [roleOptions, setRoleOption] = useState([]);
  const [userGroupCodeList, setuserGroupCodeList] = useState([]);
  const [userGroupList, setuserGroupList] = useState([]);
  const [channelsList, setChannelsList] = useState([]);
  const [checkedChannelsList, setCheckedChannelsList] = useState([]);
  const [authenticationOptions, setAuthenticationOptions] = useState([]);
  const [branchOptions, setBranchOptions] = useState(bankSiteBranchLevel);
  const [bankCodeOptions, setBankCodeOptions] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setUserType('BANK');
    setBranchOptions(bankSiteBranchLevel);
    setRoleOption(bankRolelOptions);
    setGroupTypeOption(bankGroupType);
    setAuthenticationOptions(bankAuthenticationMedthods);
    fetchBankCode();
  }, []);

  function convert(str) {
    if (str != undefined && str != null && str != '') {
      var date = new Date(str),
        mnth = ('0' + (date.getMonth() + 1)).slice(-2),
        day = ('0' + date.getDate()).slice(-2);
      return [day, mnth, date.getFullYear()].join('/');
    } else {
      return '';
    }
  }

  const onChange = (e) => {
    setUserType(e.target.value);
    form.setFieldsValue({ role: '', groupType: '', authentication: '' });
    if (e.target.value == 'BANK') {
      setGroupTypeOption(bankGroupType);
      setRoleOption(bankRolelOptions);
      setAuthenticationOptions(bankAuthenticationMedthods);
    } else {
      setGroupTypeOption(fptGroupType);
      setRoleOption(fptRoleOptions);
      setAuthenticationOptions(fptAuthenticationMedthods);
    }
    setIndeterminate(false);
    setCheckAll(false);
    setCheckedList([]);
  };

  const onBranchLevelChange = (value) => {
    setBranchLevel(value);
    setUserInput({
      ...userInput,
      branchLevel: value,
    });
  };

  const onRoleChange = (value) => {
    setRole(value);
    setUserInput({
      ...userInput,
      role: value,
    });
  };
  const onGroupTypeChange = (value) => {
    setGroupType(value);
  };

  function fetchBankCode() {
    var url = process.env.REACT_APP_API_BACKEND + '/bank/bankinfo/getAll';
    var config = {
      method: 'get',
      url: url,
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('access_token') + '',
        'Content-Type': 'application/json',
      },
    };
    axios(config)
      .then(function (response) {
        var array = response.data.data;
        setBankCodeOptions(array);
      })
      .catch(function (error) {});
  }

  useEffect(() => {
    function fetchUserGroup(branchLevel, role, groupType, userType) {
      var url = '';
      if (userType == 'FPT') {
        url =
          process.env.REACT_APP_API_BACKEND +
          '/user/searchUserGroupInUser?branchLevel=' +
          '' +
          '&groupType=' +
          groupType +
          '&roles=' +
          role +
          '&userType=' +
          userType +
          '';
      } else {
        url =
          process.env.REACT_APP_API_BACKEND +
          '/user/searchUserGroupInUser?branchLevel=' +
          branchLevel +
          '&groupType=' +
          groupType +
          '&roles=' +
          role +
          '&userType=' +
          userType +
          '';
      }

      var config = {
        method: 'get',
        url: url,
        headers: {
          Authorization:
            'Bearer ' + sessionStorage.getItem('access_token') + '',
        },
      };
      console.log(config);
      axios(config)
        .then(function (response) {
          var array = response.data.data;
          console.log('List', array);
          var tempUserGroups = [];
          array.forEach((element) => {
            tempUserGroups.push(element.userGroupCode);
          });
          setuserGroupCodeList(tempUserGroups);
          setuserGroupList(array);

          var tempChannel = [];

          array.forEach((element) => {
            tempChannel.push(element.channels);
          });

          var listTemp = [];
          for (let index = 0; index < tempChannel.length; index++) {
            var channels = tempChannel[index].split(',');
            channels.forEach((element) => {
              if (element != '') {
                listTemp.push(element);
              }
            });
          }

          var listChannels = [...new Set(listTemp)];
          setChannelsList(listChannels);
          console.log('List channel chuẩn:', listChannels);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    fetchUserGroup(branchLevel, role, groupType, userType);

    return () => {};
  }, [branchLevel, role, groupType, userType]);

  //-----user group code checkbox----------//
  const onGroupCodeChange = (list) => {
    setCheckedChannelsList([]);
    setCheckedList([...list]);
    setIndeterminate(!!list.length && list.length < userGroupCodeList.length);
    setCheckAll(list.length === userGroupCodeList.length);

    checkChanelsList(list);
  };
  function checkChanelsList(list) {
    var arr = [];
    userGroupList.forEach((groupParent) => {
      list.forEach((group) => {
        if (groupParent.userGroupCode == group) {
          var channelList = groupParent.channels.split(',');
          channelList.forEach((element) => {
            arr.push(element);
            // setCheckedChannelsList(arr);
          });
        }
        // channel.add(group);
      });
    });
    setCheckedChannelsList(arr);
    console.log('List channel chuẩn:', channelsList);
    // setCheckedChannelsList(channel);
  }
  const onCheckAllChange = (e) => {
    setCheckedList(e.target.checked ? userGroupCodeList : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
    setCheckedChannelsList(e.target.checked ? channelsList : []);
  };
  //------------------------------//
  //-----update----------------//

  const [userInput, setUserInput] = useState({
    authentication: '',
    bankCode: '',
    branch: '',
    branchLevel: '',
    dateOfIdentity: '',
    department: '',
    email: '',
    employeeCode: '',
    enable: true,
    firstName: '',
    identityNumber: '',
    identityType: '',
    issuedByIdentity: '',
    lastName: '',
    listUserGroupCode: [''],
    password: '',
    phoneNumber: '',
    realmRoles: [''],
    userName: '',
    userStatus: '1',
    userType: '',
    role: '',
    channelInit: 'FPT',
  });
  //------------Set user input ------------//

  // const onBankCodeChange = (value) => {
  //   setInput({
  //     ...userInput,
  //     bankCode: value
  //   })

  // }

  // const [userPhone, setUserPhone] = useState();

  const onBankCodeChange = (value) => {
    setUserInput({
      ...userInput,
      bankCode: value,
    });

    console.log(userInput.bankCode);
  };

  const onEmployeeCodeChange = (e) => {
    setUserInput({
      ...userInput,
      employeeCode: e.target.value,
    });
  };

  const onUserChange = (e) => {
    setUserInput({
      ...userInput,
      userName: e.target.value,
    });
  };

  const onIdentityTypeChange = (value) => {
    setUserInput({
      ...userInput,
      identityType: value,
    });
  };

  const onIdentityNumberChange = (e) => {
    setUserInput({
      ...userInput,
      identityNumber: e.target.value,
    });
  };

  const onPhoneNumberChange = (e) => {
    setUserInput({
      ...userInput,
      phoneNumber: e.target.value.replace(/\D/g, ''),
    });
    // const value = e.target.value.replace(/\D/g, '');
    // form.setFieldsValue({ phoneNumber: phoneNumber });
    // setUserInput(value);
  };

  const onDateOfIdentityChange = (e) => {
    setUserInput({
      ...userInput,
      dateOfIdentity: convert(e._d),
    });
  };

  const onIssuedByIdentityChange = (e) => {
    setUserInput({
      ...userInput,
      issuedByIdentity: e.target.value,
    });
  };

  const onBranchChange = (value) => {
    setUserInput({
      ...userInput,
      branch: value,
    });
  };

  const onDepartmentChange = (value) => {
    setUserInput({
      ...userInput,
      department: value,
    });
  };

  const onEmailChange = (e) => {
    setUserInput({
      ...userInput,
      email: e.target.value,
    });
  };

  const onAuthenticationChange = (value) => {
    setUserInput({
      ...userInput,
      authentication: value,
    });
  };

  const onUserStatusChange = (value) => {
    setUserInput({
      ...userInput,
      userStatus: value,
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  // Add new user group--------------
  const submitHandler = () => {
    // var channelString = '';

    // checkedList.forEach((channel) => {
    //   channelString += channel + ',';
    // });
    setLoading(true);

    var data = {
      authentication: userInput.authentication,
      bankCode: userInput.bankCode,
      branch: userInput.branch,
      branchLevel: userInput.branchLevel,
      dateOfIdentity: userInput.dateOfIdentity,
      department: userInput.department,
      email: userInput.email,
      employeeCode: userInput.employeeCode,
      enable: true,
      identityNumber: userInput.identityNumber,
      identityType: userInput.identityType,
      issuedByIdentity: userInput.issuedByIdentity,
      listUserGroupCode: checkedList,
      password: '',
      phoneNumber: userInput.phoneNumber,
      userName: userInput.userName,
      userStatus: userInput.userStatus,
      userType: userType,
      role: userInput.role,
      channelInit: userInput.channelInit,
    };
    if (userType == 'BANK') {
    } else {
      data.bankCode = '';
      data.branch = '';
      data.department = '';
    }

    console.log('Received values of form: ', data);

    var configPromise = am010402Domain.addNewUser(data);
    configPromise
      .then((result) => {
        axios(result)
          .then(function (response) {
            if (!response.data.success) {
              message.error(response.data.message);
            } else {
              setModalVisible(true);
            }
            setLoading(false);
          })
          .catch(function (error) {
            console.log(error);
            setLoading(false);
            setModalFailVisible(true);
          });
      })
      .catch((err) => console.log(err));
  };

  function closeModal(data) {
    console.log(data);
    setModalVisible(false);
    history.push('/home/bank-fpt-admin-manage-user');
  }
  function closeFailModal(data) {
    console.log(data);
    setModalFailVisible(false);
    history.push('/home/bank-fpt-admin-manage-user/add');
  }
  return (
    <>
      <AddSuccessModal isVisbled={modalVisible} onCloseModal={closeModal} />
      <AddFailModal
        isVisbled={modalFailVisible}
        onCloseModal={closeFailModal}
      />
      <div className={'main-container'}>
        <Row className={'padding-title'}>
          <Col span={15}>
            <KTTitle size={2}>
              Quản lý người dùng ngân hàng & FPT quản trị
            </KTTitle>
          </Col>
        </Row>
        <Row className={'padding-title-sub'}>
          <Col span={15}>
            <KTTitle size={4}>Thêm mới</KTTitle>
          </Col>
        </Row>
        <Row className={'padding-md'}>
          <Col span={24}>
            <Form
              onFinish={submitHandler}
              onFinishFailed={onFinishFailed}
              layout="horizontal"
              form={form}
            >
              <Row>
                <Col span={9}>Loại người dùng</Col>
                <Col span={15}>
                  <Form.Item name={'userType'}>
                    <Radio.Group
                      className={'width-radio'}
                      onChange={onChange}
                      value={userType}
                      defaultValue={userType}
                    >
                      <Row>
                        <Col span={12}>
                          <Radio value={'BANK'}>Admin ngân hàng</Radio>
                        </Col>
                        <Col span={12}>
                          <Radio value={'FPT'}>FPT quản trị</Radio>
                        </Col>
                      </Row>
                    </Radio.Group>
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col span={23}>
                  <Row
                    style={{
                      display:
                        userType == 'BANK' || userType == '' ? 'flex' : 'none',
                    }}
                  >
                    {' '}
                    <Col span={8}>
                      Mã ngân hàng <span className={'text-require'}>*</span>
                    </Col>
                    <Col span={16}>
                      <Form.Item
                        name={'bankCode'}
                        rules={
                          userType == 'BANK'
                            ? [
                                {
                                  required: true,
                                  message:
                                    'Trường mã ngân hàng không được phép để trống!',
                                },
                              ]
                            : []
                        }
                      >
                        <Select
                          defaultValue={''}
                          onChange={onBankCodeChange}
                          value={userInput.bankCode}
                        >
                          {bankCodeOptions?.map((bankCode) => (
                            <Select.Option value={bankCode.bankCode}>
                              {bankCode.bankName}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                  {/* <Row>
                    <Col span={8}>
                      Mã người dùng <span className={'text-require'}>*</span>
                    </Col>
                    <Col span={16}>
                      <Form.Item
                        name={'userId'}
                        rules={[
                          {
                            required: true,
                            message:
                              'Trường mã người dùng không được phép để trống!',
                          },
                        ]}
                      >
                        <Input onChange={onUserCodeChange} />
                      </Form.Item>
                    </Col>
                  </Row> */}

                  <Row>
                    <Col span={8}>
                      Mã nhân viên <span className={'text-require'}>*</span>
                    </Col>
                    <Col span={16}>
                      <Form.Item
                        name={'employeeCode'}
                        rules={[
                          {
                            required: true,
                            message:
                              'Trường mã nhân viên không được phép để trống!',
                          },
                          {
                            max: 20,
                            message:
                              'Trường mã nhân viên dùng không được phép vượt quá 20 kí tự!',
                          },
                          {
                            whitespace: true,
                            message:
                              'Trường mã nhân viên dùng không được phép để trống!',
                          },
                        ]}
                      >
                        <Input onChange={onEmployeeCodeChange} />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={8}>
                      Tên người dùng <span className={'text-require'}>*</span>
                    </Col>
                    <Col span={16}>
                      <Form.Item
                        name={'userName'}
                        rules={[
                          {
                            required: true,
                            message:
                              'Trường tên người dùng không được phép để trống!',
                          },
                          {
                            max: 100,
                            message:
                              'Trường tên người dùng dùng không được phép vượt quá 100 kí tự!',
                          },
                          {
                            whitespace: true,
                            message:
                              'Trường tên người dùng dùng không được phép để trống!',
                          },
                        ]}
                      >
                        <Input onChange={onUserChange} />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={8}>
                      Loại giấy tờ <span className={'text-require'}>*</span>
                    </Col>
                    <Col span={16}>
                      <Form.Item
                        name={'identityType'}
                        rules={[
                          {
                            required: true,
                            message:
                              'Trường loại giấy tờ không được phép để trống!',
                          },
                        ]}
                      >
                        <Select onChange={onIdentityTypeChange}>
                          <Select.Option value="CCCD/CMND">
                            CCCD/CMND
                          </Select.Option>
                          <Select.Option value="Hộ chiếu">
                            Hộ chiếu
                          </Select.Option>
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={8}>
                      Số ID <span className={'text-require'}>*</span>
                    </Col>
                    <Col span={16}>
                      <Form.Item
                        name={'identityNumber'}
                        rules={[
                          {
                            required: true,
                            message: 'Trường số ID không được phép để trống!',
                          },
                          {
                            max: 50,
                            message:
                              'Trường số ID dùng không được phép vượt quá 50 kí tự!',
                          },
                          {
                            whitespace: true,
                            message:
                              'Trường số ID dùng không được phép để trống!',
                          },
                        ]}
                      >
                        <Input onChange={onIdentityNumberChange} />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row>
                    <Col span={8}>
                      Ngày cấp<span className={'text-require'}>*</span>
                    </Col>
                    <Col span={16}>
                      <Form.Item
                        name={'dateOfIdentity'}
                        rules={[
                          {
                            required: true,
                            message:
                              'Trường ngày cấp không được phép để trống!',
                          },
                        ]}
                      >
                        <DatePicker
                          style={{ width: '100%' }}
                          format={dateFormatList}
                          onChange={onDateOfIdentityChange}
                          disabledDate={disabledDate}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={8}>
                      Nơi cấp <span className={'text-require'}>*</span>
                    </Col>
                    <Col span={16}>
                      <Form.Item
                        name={'issuedByIdentity'}
                        rules={[
                          {
                            required: true,
                            message: 'Trường nơi cấp không được phép để trống!',
                          },
                          {
                            max: 300,
                            message:
                              'Trường nơi cấp dùng không được phép vượt quá 300 kí tự!',
                          },
                          {
                            whitespace: true,
                            message:
                              'Trường nơi cấp dùng không được phép để trống!',
                          },
                        ]}
                      >
                        <Input onChange={onIssuedByIdentityChange} />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row
                    style={{
                      display:
                        userType == 'BANK' || userType == '' ? 'flex' : 'none',
                    }}
                  >
                    <Col span={8}>
                      Cấp chi nhánh <span className={'text-require'}>*</span>
                    </Col>
                    <Col span={16}>
                      <Form.Item
                        name={'branchLevels'}
                        rules={
                          userType == 'BANK'
                            ? [
                                {
                                  required: true,
                                  message:
                                    'Trường cấp chi nhánh không được phép để trống!',
                                },
                              ]
                            : []
                        }
                      >
                        <Select
                          onChange={onBranchLevelChange}
                          value={userInput.branchLevel}
                        >
                          {branchOptions.map((branch) => (
                            <Select.Option value={branch.value}>
                              {branch.label}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row>
                    <Col span={8}>
                      Email <span className={'text-require'}>*</span>
                    </Col>
                    <Col span={16}>
                      <Form.Item
                        name={'email'}
                        rules={[
                          {
                            pattern:
                              /^[A-Za-z0-9_.]{2,32}@([a-zA-Z0-9]{2,12})(.[a-zA-Z]{2,12})+$/y,
                            message: 'Trường email không chính xác!',
                          },
                          {
                            required: true,
                            message: 'Trường email không được phép để trống!',
                          },
                          {
                            max: 50,
                            message:
                              'Trường email dùng không được phép vượt quá 50 kí tự!',
                          },
                          {
                            whitespace: true,
                            message:
                              'Trường email dùng không được phép để trống!',
                          },
                        ]}
                      >
                        <Input onChange={onEmailChange} type={'email'} />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={8}>
                      Số điện thoại <span className={'text-require'}>*</span>
                    </Col>
                    <Col span={16}>
                      <Form.Item
                        name={'phoneNumber'}
                        rules={[
                          {
                            required: true,
                            message:
                              'Trường số điện thoại không được phép để trống!',
                          },
                          {
                            max: 15,
                            message:
                              'Trường số điện thoại dùng không được phép vượt quá 15 kí tự!',
                          },
                          {
                            whitespace: true,
                            message:
                              'Trường số điện thoại dùng không được phép để trống!',
                          },
                        ]}
                      >
                        <Input
                          type={'number'}
                          onKeyDown={(e) =>
                            exceptThisSymbols.includes(e.key) &&
                            e.preventDefault()
                          }
                          onChange={onPhoneNumberChange}
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row>
                    <Col span={8}>
                      Loại nhóm <span className={'text-require'}>*</span>
                    </Col>
                    <Col span={16}>
                      <Form.Item
                        name={'groupType'}
                        rules={[
                          {
                            required: true,
                            message:
                              'Trường loại nhóm không được phép để trống!',
                          },
                        ]}
                      >
                        <Select onChange={onGroupTypeChange}>
                          {groupTypeOptions.map((groupType) => (
                            <Select.Option value={groupType.value}>
                              {groupType.label}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={8}>
                      Vai trò <span className={'text-require'}>*</span>
                    </Col>
                    <Col span={16}>
                      <Form.Item
                        name={'role'}
                        rules={[
                          {
                            required: true,
                            message: 'Trường vai trò không được phép để trống!',
                          },
                        ]}
                      >
                        <Select value={null} onChange={onRoleChange}>
                          {roleOptions.map((role) => (
                            <Select.Option value={role.value}>
                              {role.label}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={8}>
                      Mã nhóm người dùng{' '}
                      <span className={'text-require'}>*</span>
                    </Col>
                    <Col span={16}>
                      <Form.Item
                        name={'userGroupCode'}
                        rules={[
                          {
                            required: checkedList.length == 0 ? true : false,
                            message:
                              'Trường mã nhóm người dùng không được phép để trống!',
                          },
                        ]}
                        //   {
                        //     required: true,
                        //     message:
                        //       'Trường mã nhóm người dùng không được phép để trống!',
                        //   },
                        // ]}
                      >
                        <Checkbox
                          style={{
                            display:
                              userGroupCodeList.length > 0 ? 'flex' : 'none',
                          }}
                          indeterminate={indeterminate}
                          onChange={onCheckAllChange}
                          checked={checkAll}
                        >
                          Tất cả
                        </Checkbox>
                        <Checkbox.Group
                          className={'display-grid'}
                          options={userGroupCodeList}
                          value={checkedList}
                          onChange={onGroupCodeChange}
                        ></Checkbox.Group>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={8}>
                      Kênh <span className={'text-require'}>*</span>
                    </Col>
                    <Col span={16}>
                      <Form.Item>
                        <Checkbox.Group
                          disabled
                          className={'display-grid'}
                          options={channelsList}
                          value={checkedChannelsList}
                        ></Checkbox.Group>
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row>
                    <Col span={8}>
                      Trạng thái <span className={'text-require'}>*</span>
                    </Col>
                    <Col span={16}>
                      <Form.Item
                        name={'userStatus'}
                        // rules={[
                        //   {
                        //     required: true,
                        //     message:
                        //       'Trường trạng thái không được phép để trống!',
                        //   },
                        // ]}
                      >
                        <Select
                          defaultValue={'1'}
                          onChange={onUserStatusChange}
                        >
                          <Select.Option value="1">Hoạt động</Select.Option>
                          <Select.Option value="0">
                            Ngừng hoạt động
                          </Select.Option>
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>

                  <div id="form-footer">
                    <Form.Item>
                      <Space className={'padding-buton'}>
                        <Button
                          className="common-btn"
                          htmlType="submit"
                          loading={loading}
                        >
                          Xác nhận
                        </Button>
                        <Button
                          onClick={am010402Domain.exitHandler}
                          className="secondary-btn"
                        >
                          Đóng
                        </Button>
                      </Space>
                    </Form.Item>
                  </div>
                </Col>
                <Col span={1}></Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default AM010402BankAdminAddView;
