import React, { useState, useEffect } from 'react';
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

import UpdateSuccessModal from '../../../common/modal/edit/updateSuccessModal';

import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router';
import { useA00Domain } from '../domains/AM.01.04.02EditDomain';
import { ErrorsCode } from 'core/utils/constants';
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

const bankAuthenticationMedthods = [
  { label: 'None', value: 'none' },
  { label: 'Mật khẩu giao dịch', value: 'password' },
  { label: 'OTP', value: 'otp' },
];

const statusOptions = [
  { label: 'Hoạt động', value: 1 },
  { label: 'Ngừng hoạt động', value: 0 },
];

const AM010402BankAdminEditView = ({ lang = 'vi', ...props }) => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [, domain] = useA00Domain();
  const [form] = Form.useForm();
  const history = useHistory();
  const dateFormatList = 'DD/MM/YYYY';
  const [bankCodeOptions, setBankCodeOptions] = useState();
  const [user, setUser] = useState({
    id: 0,
    userCode: '',
    userName: '',
    userType: '',
    bankCode: '',
    employeeCode: '',
    identityType: '',
    identityNumber: '',
    dateOfIdentity: '',
    issuedByIdentity: '',
    department: '',
    branch: '',
    email: '',
    phoneNumber: '',
    authentication: '',
    userStatus: '',
    createdBy: '',
    createdDate: '',
    lastModifiedBy: '',
    lastModifiedDate: '',
    channels: [],
    branchLevels: [],
    groupTypes: [],
    userGroupCodes: [],
    roles: [],
  });

  const [branchLevel, setBranchLevel] = useState('');
  const [role, setRole] = useState('');
  const [groupType, setGroupType] = useState('');
  const [userType, setUserType] = useState('BANK');

  const exceptThisSymbols = ['e', 'E', '+', '-', '.'];

  var checkedGroup = [];
  var checkedChannel = [];
  const [allGroupCodeList, setAllGroupCodeList] = useState([]); //all group list chưa filter
  const [userGroupList, setUserGroupList] = useState([]); //list all group+channel đã filter

  const [userGroupCodeList, setUserGroupCodeList] = useState([]); // list group+channel checked của user edit đã filter
  const [checkedList, setCheckedList] = React.useState(checkedGroup); // list groupcode checked của user edit đã filter
  const [indeterminate, setIndeterminate] = React.useState(true);
  const [checkAll, setCheckAll] = React.useState(false);
  const [checkedChannelsList, setCheckedChannelsList] =
    React.useState(checkedChannel);

  const [channelsList, setChannelsList] = useState([]);

  const [groupTypeOptions, setGroupTypeOption] = useState(bankGroupType);
  const [roleOptions, setRoleOptions] = useState(bankRolelOptions);
  const [authenticationOptions, setAuthenticationOptions] = useState(
    bankAuthenticationMedthods,
  );
  const [successModalVisible, setDialogVisible] = useState(false);
  const [userInput, setUserInput] = useState({
    userCode: '',
    authentication: '',
    bankCode: '',
    branch: '',
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
    userStatus: 0,
    userType: '',
    channelInit: 'FPT',
  });
  //------------User input------------//
  const onBranchLevelChange = (value) => {
    setBranchLevel(value);
  };

  const onRoleChange = (value) => {
    setRole(value);
  };
  const onGroupTypeChange = (value) => {
    setGroupType(value);
  };

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
      phoneNumber: e.target.value,
    });
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

  // get all group
  useEffect(() => {
    function fetchUserGroup() {
      var config = domain.getAllGroup();
      config
        .then((result) => {
          axios(result)
            .then(function (response) {
              var array = response.data.data;
              setAllGroupCodeList(array);
              console.log('List', array);
            })
            .catch(function (error) {
              console.log(error);
            });
        })
        .catch(function (error) {
          console.log('Lỗi ở đây đang là: ', error);
        });
    }

    function fetchBankCode() {
      var url = process.env.REACT_APP_API_BACKEND + '/bank/bankinfo/getAll';
      var config = {
        method: 'get',
        url: url,
        headers: {
          Authorization:
            'Bearer ' + sessionStorage.getItem('access_token') + '',
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
    fetchBankCode();
    fetchUserGroup();
    return () => {};
  }, []);

  // search group theo vai trò, cấp chi nhánh, loại nhóm, loại người dùng
  useEffect(() => {
    function fetchUserGroup(
      branchLevel,
      role,
      groupType,
      userType,
      allGroupList,
    ) {
      var tempUserGroupCodes = [];
      var tempUserGroups = [];
      if (role != null && groupType != null && userType != null) {
        allGroupList.forEach((element) => {
          if (
            element.role == role &&
            element.userType == userType &&
            element.groupType == groupType
          ) {
            if (branchLevel != null && element.branchLevel == branchLevel) {
              tempUserGroupCodes.push(element.userGroupCode);
              tempUserGroups.push(element);
            } else {
              tempUserGroupCodes.push(element.userGroupCode);
              tempUserGroups.push(element);
            }
          }
        });
      }

      // set list groupcode check box, và list group để checked channel
      setUserGroupCodeList(tempUserGroupCodes); // list group code
      setUserGroupList(tempUserGroups); //list group

      var tempChannel = [];

      tempUserGroups.forEach((element) => {
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
    }
    fetchUserGroup(
      branchLevel,
      role,
      groupType,
      user.userType,
      allGroupCodeList,
    );

    return () => {};
  }, [allGroupCodeList]);

  //--------------------------------//

  useEffect(() => {
    const fetchData = () => {
      var data = '';

      var config = {
        method: 'get',
        url:
          process.env.REACT_APP_API_BACKEND + '/user/getUserById?id=' + id + '',
        headers: {
          Authorization:
            'Bearer ' + sessionStorage.getItem('access_token') + '',
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          var user = response.data.data;
          console.log('get user:::', user);

          // user.roles = user.roles == 'Marker' ? 'Maker' : user.roles;
          setUser(user);
          setUserInput({
            ...userInput,
            userStatus: user.userStatus,
          });

          checkedGroup = user.userGroupCodes;
          setUserGroupCodeList(checkedGroup);
          setCheckedList(checkedGroup);

          setCheckedChannelsList(user.channels);

          console.log(checkedGroup);

          if (user.userType == 'BANK') {
            setGroupTypeOption(bankGroupType);
            setRoleOptions(bankRolelOptions);
            setAuthenticationOptions(bankAuthenticationMedthods);
            setUserType(user.userType);
          } else if (user.userType == 'FPT') {
            setGroupTypeOption(fptGroupType);
            setRoleOptions(fptRoleOptions);
            setAuthenticationOptions(fptAuthenticationMedthods);
            setUserType(user.userType);
          }

          // var groupType = user.groupType;
          form.setFieldsValue({
            bankCode: user.bankCode,
            userType: user.userType,
            userCode: user.userCode,
            employeeCode: user.employeeCode,
            userName: user.userName,
            identityType: user.identityType,
            identityNumber: user.identityNumber,
            dateOfIdentity: moment(user.dateOfIdentity, dateFormatList),
            issuedByIdentity: user.issuedByIdentity,
            branchLevels: user.branchLevels,
            branch: user.branch,
            department: user.department,
            email: user.email,
            phoneNumber: user.phoneNumber,
            groupType: user.groupTypes,
            //fix cứng code test front, phải sửa lại enum backend
            roles: user.roles == 'Marker' ? 'Maker' : user.roles,
            authentication: user.authentication,
            userStatus: user.userStatus,
          });

          setBranchLevel(user.branchLevels);
          setRole(user.roles);
          setGroupType(user.groupTypes);
        })
        .catch(function (error) {
          console.log(error.response);
          // if (error.response.status == 401) {
          //   console.log('Lỗi 401: Hết hạn token');
          // }
        });
    };
    fetchData();
  }, [id, form]);

  // function checked channels begin
  useEffect(() => {
    // function fetchUserGroup(listGroupCodeUser) {
    //   checkChanelsList(listGroupCodeUser);
    // }

    function fetchUserGroupInUser(branchLevel, role, groupType, userType) {
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
          setUserGroupCodeList(tempUserGroups);
          setUserGroupList(array);

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

    fetchUserGroupInUser(branchLevel, role, groupType, userType);

    return () => {};
  }, [branchLevel, role, groupType, userType]); // sau khi get all group đã filter sẽ load lại function để checked channels

  // function checked check box channels
  function checkChanelsList(list) {
    var arr = [];
    userGroupList.forEach((groupParent) => {
      list.forEach((group) => {
        if (groupParent.userGroupCode == group) {
          var channelList = groupParent.channels.split(',');
          channelList.forEach((element) => {
            arr.push(element);
          });
        }
        // channel.add(group);
      });
    });
    setCheckedChannelsList(arr);
    console.log('List channel checked2:', checkedChannelsList);
  }
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  // Add new user group--------------
  const submitHandler = () => {
    var bankCode = '';
    var branch = '';
    if (user.userType == 'BANK') {
      bankCode = userInput.bankCode == '' ? user.bankCode : userInput.bankCode;
      branch = userInput.branch == '' ? user.branch : userInput.branch;
    } else if (user.userType == 'FPT') {
      bankCode = '';
      branch = '';
    }
    console.log('userInput:::', userInput);
    var data = {
      authentication:
        userInput.authentication == ''
          ? user.authentication
          : userInput.authentication,
      bankCode: bankCode,
      branch: branch,
      userCode: userInput.userCode == '' ? user.userCode : userInput.userCode,
      dateOfIdentity:
        userInput.dateOfIdentity == ''
          ? user.dateOfIdentity
          : userInput.dateOfIdentity,
      department: userInput.department == '',
      email: userInput.email == '' ? user.email : userInput.email,
      employeeCode:
        userInput.employeeCode == ''
          ? user.employeeCode
          : userInput.employeeCode,
      enable: true,
      identityNumber:
        userInput.identityNumber == ''
          ? user.identityNumber
          : userInput.identityNumber,
      identityType:
        userInput.identityType == ''
          ? user.identityType
          : userInput.identityType,
      issuedByIdentity:
        userInput.issuedByIdentity == ''
          ? user.issuedByIdentity
          : userInput.issuedByIdentity,
      listUserGroupCode: checkedList,
      password: '',
      phoneNumber:
        userInput.phoneNumber == '' ? user.phoneNumber : userInput.phoneNumber,
      userName: userInput.userName == '' ? user.userName : userInput.userName,
      userStatus: userInput.userStatus,
      userType: userInput.userType == '' ? user.userType : userInput.userType,
      channelInit: userInput.channelInit,
    };

    console.log('Received values of form: ', data);

    var configPromise = domain.updateUser(id, data);
    configPromise
      .then((result) => {
        axios(result)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
            if (response.data.success) {
              setDialogVisible(true);
            } else {
              message.error(response.data.message);
            }
          })
          .catch(function (error) {
            console.log(error.data);
            message.error('Cập nhật không thành công');
          });
      })
      .catch((err) => console.log(err));
  };

  function closeModal(data) {
    console.log(data);
    setDialogVisible(false);
    history.push(`/home/bank-fpt-admin-manage-user/view/${id}`);
  }

  // //-----user group code checkbox----------//
  const onGroupCodeChange = (list) => {
    setCheckedChannelsList([]);
    setCheckedList(list);
    setIndeterminate(!!list.length && list.length < userGroupCodeList.length);
    setCheckAll(list.length === userGroupCodeList.length);

    checkChanelsList(list);
  };

  const onCheckAllChange = (e) => {
    setCheckedList(e.target.checked ? userGroupCodeList : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
    setCheckedChannelsList(e.target.checked ? channelsList : []);
  };

  return (
    <>
      <UpdateSuccessModal
        isVisbled={successModalVisible}
        onCloseModal={closeModal}
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
            <KTTitle size={4}>Chỉnh sửa</KTTitle>
          </Col>
        </Row>
        <Row className={'padding-md'}>
          <Col span={24}>
            <Form
              form={form}
              onFinish={submitHandler}
              onFinishFailed={onFinishFailed}
              layout="horizontal"
              initialValues={{
                userType: user ? user.userType : 'This does not work',
                userCode: user ? user.userCode : 'This does not work',
                employeeCode: user ? user.employeeCode : 'This does not work',
              }}
            >
              <Row>
                <Col span={9}>Loại người dùng</Col>
                <Col span={15}>
                  <Form.Item name={'userType'}>
                    <Radio.Group disabled className={'width-radio'}>
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
                        user.userType == 'BANK' || user.userType == ''
                          ? 'flex'
                          : 'none',
                    }}
                  >
                    {' '}
                    <Col span={8}>
                      Mã ngân hàng <span className={'text-require'}>*</span>
                    </Col>
                    <Col span={16}>
                      <Form.Item name={'bankCode'}>
                        <Select defaultValue={''} onChange={onBankCodeChange}>
                          {bankCodeOptions?.map((bankCode) => (
                            <Select.Option value={bankCode.bankCode}>
                              {bankCode.bankName}
                            </Select.Option>
                          ))}
                        </Select>
                        {/* <Select onChange={onBankCodeChange}>
                          <Select.Option value="VPB">
                            VP Bank - Ngân hàng TMCP Việt Nam Thịnh Vượng
                          </Select.Option>
                        </Select> */}
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={8}>
                      Mã người dùng <span className={'text-require'}>*</span>
                    </Col>
                    <Col span={16}>
                      <Form.Item name={'userCode'}>
                        <Input disabled />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row>
                    <Col span={8}>
                      Mã nhân viên <span className={'text-require'}>*</span>
                    </Col>
                    <Col span={16}>
                      <Form.Item name={'employeeCode'}>
                        <Input onChange={onEmployeeCodeChange} />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={8}>
                      Tên người dùng <span className={'text-require'}>*</span>
                    </Col>
                    <Col span={16}>
                      <Form.Item name={'userName'}>
                        <Input onChange={onUserChange} />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={8}>
                      Loại giấy tờ <span className={'text-require'}>*</span>
                    </Col>
                    <Col span={16}>
                      <Form.Item name={'identityType'}>
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
                      <Form.Item name={'identityNumber'}>
                        <Input onChange={onIdentityNumberChange} />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row>
                    <Col span={8}>
                      Ngày cấp<span className={'text-require'}>*</span>
                    </Col>
                    <Col span={16}>
                      <Form.Item name={'dateOfIdentity'}>
                        <DatePicker
                          className={'width-date-picker'}
                          name="dateOfIdentity"
                          format={dateFormatList}
                          placeholder="Chọn ngày cấp"
                          // value={user1DeputyBirthday}
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
                      <Form.Item name={'issuedByIdentity'}>
                        <Input onChange={onIssuedByIdentityChange} />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row
                    style={{
                      display:
                        user.userType == 'BANK' || user.userType == ''
                          ? 'flex'
                          : 'none',
                    }}
                  >
                    <Col span={8}>
                      Cấp chi nhánh <span className={'text-require'}>*</span>
                    </Col>
                    <Col span={16}>
                      <Form.Item name={'branchLevels'}>
                        <Select onChange={onBranchLevelChange}>
                          <Select.Option value="HO">Hội sở chính</Select.Option>
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
                      <Form.Item name={'phoneNumber'}>
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
                      <Form.Item name={'groupType'}>
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
                      <Form.Item name={'roles'}>
                        <Select onChange={onRoleChange}>
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
                      <Form.Item name={'userGroupCode'}>
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
                          onChange={onGroupCodeChange}
                          options={userGroupCodeList}
                          value={checkedList}
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
                        rules={[
                          {
                            required: true,
                            message:
                              'Trường trạng thái không được phép để trống!',
                          },
                        ]}
                      >
                        <Select onChange={onUserStatusChange}>
                          {statusOptions.map((status) => (
                            <Select.Option value={status.value}>
                              {status.label}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>

                  <div id="form-footer">
                    <Form.Item>
                      <Space className={'padding-buton'}>
                        <Button className="common-btn" htmlType="submit">
                          Xác nhận
                        </Button>

                        <Button
                          onClick={(e) => {
                            domain.exitHandler(id);
                          }}
                          // onClick={am010402Domain.exitHandler(id)}
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

export default AM010402BankAdminEditView;
