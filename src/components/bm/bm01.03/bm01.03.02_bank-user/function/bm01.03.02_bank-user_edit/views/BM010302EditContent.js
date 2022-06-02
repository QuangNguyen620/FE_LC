import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
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
} from 'antd';
import moment from 'moment';
import { KTTitle } from 'core/ui';
import '../../../common/less/BM010302.less';
import '../../../../../../../assets/less/LC-common.less';
import { BM010302Domain } from '../domains/BM010302EditDomain';
import { disabledDate } from 'core/utils/functions';
import UpdateUserModaSuccessfull from '../../../common/modal/update/update-user/UpdateUserModaSuccessfull';
import UpdateUserModalFailed from '../../../common/modal/update/update-user/UpdateUserModalFailed';
var axios = require('axios');
// const [form] = Form.useForm();
const CheckboxGroup = Checkbox.Group;

const BM010302EditView = ({ lang = 'vi', ...props }) => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [form] = Form.useForm();
  const [, domain] = BM010302Domain();
  const [showFail, setShowFail] = useState(false);
  const dateFormatList = 'DD/MM/YYYY';
  const exceptThisSymbols = ['e', 'E', '+', '-', '.'];

  const bankRolelOptions = [
    { label: 'Maker', value: 'Maker' },
    { label: 'Approver', value: 'Approver' },
    { label: 'Approver+Maker', value: 'Approver+Maker' },
  ];

  const branchLevelOptions = [{ label: 'Hội sở chính', value: 'HO' }];

  const groupTypeOptions = [
    { label: 'Người dùng ngân hàng', value: 'BANK-USER' },
  ];

  const branchOptions = [
    { label: 'VPBANK Chương Dương', value: 'CD' },
    { label: 'VPBANK Long Biên', value: 'LB' },
    { label: 'VPBANK Cửa Bắc', value: 'CB' },
  ];

  const departmentOptions = [
    { label: 'P01-Phòng L/C', value: 'P01-LC' },
    { label: 'P02-Phòng L/C', value: 'P02-LC' },
  ];

  const authenticationOptions = [
    { label: 'None', value: 'none' },
    { label: 'Mật khẩu giao dịch', value: 'password' },
    { label: 'OTP', value: 'otp' },
  ];

  var checkedGroup = [];
  var checkedChannel = [];
  var groupTypeList = [];

  const [checkedList, setCheckedList] = React.useState(defaultCheckedList);
  const [indeterminate, setIndeterminate] = React.useState(false);
  const [checkAll, setCheckAll] = React.useState(false);

  const plainOptions = ['AIN', 'BIN', 'CIN', 'CMB'];

  const defaultCheckedList = [];

  const [userGroupCodeList, setUserGroupCodeList] = useState([]); // group checkbox

  const [channelsList, setChannelsList] = useState([]);
  const [checkedChannelsList, setCheckedChannelsList] = useState([]);

  const [branchLevel, setBranchLevel] = useState('');
  const [role, setRole] = useState('');
  const [groupType, setGroupType] = useState('');
  const [branch, setBranch] = useState('');
  const [department, setDepartment] = useState('');

  const [userGroupList, setuserGroupList] = useState([]);

  const [allGroupCodeList, setAllGroupCodeList] = useState([]);

  const [updateSuccessfulDialogVisible, setUpdateSuccessfulDialogVisible] =
    useState(false);
  const [updateFailedDialogVisible, setUpdateFailedDialogVisible] =
    useState(false);
  const [conflictCreate, setConflictCreate] = useState(false);
  const [bankCodeOptions, setBankCodeOptions] = useState();

  const [userInput, setUserInput] = useState({
    userCode: '',
    userName: '',
    enable: true,
    userType: 'BANK',
    bankCode: '',
    employeeCode: '',
    identityType: '',
    identityNumber: '',
    dateOfIdentity: '',
    issuedByIdentity: '',
    branch: '',
    department: '',
    email: '',
    phoneNumber: '',
    authentication: '',
    userStatus: 1,
    userGroupCodes: '',
    channelInit: 'BANK',
  });

  function convert(str) {
    var date = new Date(str),
      mnth = ('0' + (date.getMonth() + 1)).slice(-2),
      day = ('0' + date.getDate()).slice(-2);
    return [day, mnth, date.getFullYear()].join('/');
  }

  useEffect(() => {
    function fetchUserGroup() {
      var url = process.env.REACT_APP_API_BACKEND + '/user/getAllGroup';
      var config = {
        method: 'get',
        url: url,
        headers: {
          // Authorization:
          //   'Bearer ' + sessionStorage.getItem('access_token') + '',
        },
      };
      console.log(config);
      axios(config)
        .then(function (response) {
          var array = response.data.data;
          setAllGroupCodeList(array);
          console.log('List', array);
        })
        .catch(function (error) {
          console.log(error);
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

  useEffect(() => {
    function fetchUserGroup(branchLevel, branch, department, role, groupType) {
      var tempUserGroupCodes = [];
      var tempUserGroups = [];
      if (
        branchLevel != null &&
        // branch != null &&
        // department != null &&
        role != null &&
        groupType != null
      ) {
        allGroupCodeList.forEach((element) => {
          // console.log(element);
          if (
            element.branchLevel == branchLevel &&
            // element.branch == branch &&
            // element.department == department &&
            element.role == role &&
            element.groupType == groupType
          ) {
            tempUserGroupCodes.push(element.userGroupCode);
            tempUserGroups.push(element);
          } else if (role == 'Approver+Maker') {
            tempUserGroupCodes.push(element.userGroupCode);
            tempUserGroups.push(element);
          }
        });
      }
      setUserGroupCodeList(tempUserGroupCodes);
      setuserGroupList(tempUserGroups);

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
    fetchUserGroup(branchLevel, branch, department, role, groupType);

    return () => {};
  }, [branchLevel, branch, department, role, groupType]);

  //input value change

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
    setBranch(value);
  };

  const onDepartmentChange = (value) => {
    setUserInput({
      ...userInput,
      department: value,
    });
    setDepartment(value);
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

  const onBranchLevelChange = (value) => {
    setBranchLevel(value);
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

  useEffect(() => {
    const fetchData = () => {
      var config = domain.getUser(id);

      config
        .then((result) => {
          axios(result)
            .then(function (response) {
              var user = response.data.data;
              setUserInput(user);
              console.log(user);

              checkedGroup = user.userGroupCodes;
              setUserGroupCodeList(checkedGroup);
              setCheckedList(checkedGroup);
              console.log(checkedGroup);

              checkedChannel = user.channels;
              setCheckedChannelsList(checkedChannel);
              // checkChanelsList(checkedGroup)

              // var groupType = user.groupType;
              form.setFieldsValue({
                bankCode: user.bankCode,
                userType: user.userType,
                userCode: user.userCode,
                employeeCode: user.employeeCode,
                userName: user.userName,
                identityType: user.identityType,
                identityNumber: user.identityNumber,
                dateOfIdentity: moment(user.dateOfIdentity),
                issuedByIdentity: user.issuedByIdentity,
                branchLevels: user.branchLevels,
                branch: user.branch,
                department: user.department,
                email: user.email,
                phoneNumber: user.phoneNumber,
                groupType: user.groupTypes,
                role: user.roles,
                authentication: user.authentication,
                userStatus: user.userStatus ? 'Hoạt động' : 'Ngừng hoạt động',
              });

              setBranchLevel(user.branchLevels);
              setRole(user.roles);
              setGroupType(user.groupTypes);
              setBranch(user.branch);
              setDepartment(user.department);
            })
            .catch(function (error) {
              console.log(error.response);
            });
        })
        .catch(function (error) {
          console.log('Lỗi ở đây đang là: ', error);
        });
    };

    fetchData();
  }, [id, form]);

  //-----user group code checkbox----------//
  const onCheckAllChange = (e) => {
    setCheckedList(e.target.checked ? userGroupCodeList : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
    setCheckedChannelsList(e.target.checked ? channelsList : []);
  };

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
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  // Update new user group--------------

  const submitHandler = () => {
    var data = {
      authentication: userInput.authentication,
      bankCode: userInput.bankCode,
      branch: userInput.branch,
      dateOfIdentity: userInput.dateOfIdentity,
      department: userInput.department,
      email: userInput.email.trim(),
      employeeCode: userInput.employeeCode.trim(),
      enable: true,
      identityNumber: userInput.identityNumber,
      identityType: userInput.identityType,
      issuedByIdentity: userInput.issuedByIdentity.trim(),
      password: '',
      phoneNumber: userInput.phoneNumber,
      userName: userInput.userName.trim(),
      userStatus: userInput.userStatus,
      userType: userInput.userType,
      role: userInput.role,
      channelInit: userInput.channelInit,
      userGroupCodes: checkedList,
    };

    console.log('Received values of form: ', data);

    var configPromise = domain.updateUser(id, data);
    configPromise
      .then((result) => {
        axios(result)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
            setUpdateSuccessfulDialogVisible(true);
          })
          .catch(function (error) {
            console.log(error);
            setUpdateFailedDialogVisible(true);
          });
      })
      .catch((err) => console.log(err));
  };

  function closeUpdateSuccessfulModal() {
    setUpdateSuccessfulDialogVisible(false);
    domain.exitHandler();
  }

  function closeUpdateFailedModal() {
    setUpdateFailedDialogVisible(false);
  }

  return (
    <>
      <UpdateUserModaSuccessfull
        isVisbled={updateSuccessfulDialogVisible}
        onCloseModal={closeUpdateSuccessfulModal}
        onClose={closeUpdateSuccessfulModal}
      />

      <UpdateUserModalFailed
        isVisbled={updateFailedDialogVisible}
        onCloseModal={closeUpdateFailedModal}
        onClose={closeUpdateFailedModal}
      />

      <div className={'main-container'}>
        <Row className={'padding-title'}>
          <Col span={15}>
            <KTTitle size={2}>Quản lý người dùng ngân hàng</KTTitle>
          </Col>
        </Row>
        <Row className={'padding-title-sub'}>
          <Col span={15}>
            <KTTitle size={4}>Chỉnh sửa</KTTitle>
          </Col>
        </Row>
        <Row className="padding-md">
          <Col span={24}>
            <Form
              onFinish={submitHandler}
              onFinishFailed={onFinishFailed}
              layout="horizontal"
              form={form}
            >
              <Row>
                <Col span={23}>
                  <Row>
                    {' '}
                    <Col span={8}>
                      Mã ngân hàng <span className={'text-require'}>*</span>
                    </Col>
                    <Col span={16}>
                      <Form.Item
                        name={'bankCode'}
                        rules={[
                          {
                            required: true,
                            message:
                              'Trường mã ngân hàng không được phép để trống!',
                          },
                        ]}
                      >
                        <Select onChange={onBankCodeChange} disabled>
                          <Select.Option value="VPB">
                            VP Bank - Ngân hàng TMCP Việt Nam Thịnh Vượng
                          </Select.Option>
                        </Select>
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
                      <Form.Item
                        name={'employeeCode'}
                        rules={[
                          {
                            whitespace: true,
                            required: true,
                            message:
                              'Trường mã nhân viên không được phép để trống!',
                          },
                          {
                            max: 20,
                            message: 'Trường mã nhân viên tối đa 20 ký tự!',
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
                            whitespace: true,
                            required: true,
                            message:
                              'Trường tên người dùng không được phép để trống!',
                          },
                          {
                            max: 100,
                            message: 'Trường tên người dùng tối đa 100 ký tự!',
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
                          <Select.Option value="CMND">CMND</Select.Option>
                          <Select.Option value="CCCD">CCCD</Select.Option>
                          <Select.Option value="passport">
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
                            whitespace: true,
                            required: true,
                            message: 'Trường số ID không được phép để trống!',
                          },
                          {
                            max: 50,
                            message: 'Trường số ID tối đa 50 ký tự!',
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
                          className={'width-date-picker'}
                          defaultValue={moment('01/01/2015', dateFormatList[0])}
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
                            whitespace: true,
                            required: true,
                            message: 'Trường nơi cấp không được phép để trống!',
                          },
                          {
                            max: 300,
                            message: 'Trường nơi cấp tối đa 300 ký tự!',
                          },
                        ]}
                      >
                        <Input onChange={onIssuedByIdentityChange} />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={8}>
                      Cấp chi nhánh <span style={{ color: '#F5222D' }}>*</span>
                    </Col>
                    <Col span={16}>
                      <Form.Item
                        name={'branchLevels'}
                        rules={[
                          {
                            required: true,
                            message:
                              'Trường cấp chi nhánh không được phép để trống!',
                          },
                        ]}
                      >
                        <Select onChange={onBranchLevelChange}>
                          {branchLevelOptions.map((branchLevel) => (
                            <Select.Option value={branchLevel.value}>
                              {branchLevel.label}
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
                            whitespace: true,
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
                      <Form.Item
                        name={'phoneNumber'}
                        rules={[
                          {
                            whitespace: true,
                            required: true,
                            message:
                              'Trường số điện thoại không được phép để trống!',
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
                          {bankRolelOptions.map((role) => (
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

                  {/* <Row>
                    <Col span={8}>
                      Phương thức xác thực{' '}
                      <span className={'text-require'}>*</span>
                    </Col>
                    <Col span={16}>
                      <Form.Item
                        name={'authentication'}
                        rules={[
                          {
                            required: true,
                            message:
                              'Trường phương thức xác thực không được phép để trống!',
                          },
                        ]}
                      >
                        <Select onChange={onAuthenticationChange}>
                          {authenticationOptions.map((method) => (
                            <Select.Option value={method.value}>
                              {method.label}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row> */}
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
                        <Button className="common-btn" htmlType="submit">
                          Xác nhận
                        </Button>
                        <Button
                          onClick={domain.exitHandler}
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

export default BM010302EditView;
