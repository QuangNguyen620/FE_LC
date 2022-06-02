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

import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router';

import DeleteModal from '../../../common/modal/delete/DeleteModal';
import ResetPassModal from '../../../common/modal/reset_pass/ResetPassModal';
import ActiveModal from '../../../common/modal/active/ActiveModal';
import DeactiveModal from '../../../common/modal/deactive/DeactiveModal';
import LockModal from '../../../common/modal/lock/LockModal';
import UnlockModal from '../../../common/modal/unlock/UnlockModal';

import { useA00Domain } from '../domains/AM.01.04.02ViewDomain';
import { KTTitle } from 'core/ui';
var axios = require('axios');

const bankChannelOptions = [
  { label: 'BIN-Bank Internet', value: 'BIN' },
  { label: 'CIN-Corporate Internet', value: 'CIN' },
  { label: 'CMB-Corporate Mobile', value: 'CMB' },
];

const fptChannelOptions = [
  { label: 'AIN-Admin Internet', value: 'AIN' },
  { label: 'BIN-Bank Internet', value: 'BIN' },
  { label: 'CIN-Corporate Internet', value: 'CIN' },
  { label: 'CMB-Corporate Mobile', value: 'CMB' },
];

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

const AM010402BankAdminAddView = ({ lang = 'vi', ...props }) => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [, am010402Domain] = useA00Domain();
  const [form] = Form.useForm();
  const history = useHistory();
  const dateFormatList = 'DD/MM/YYYY';

  var checkedGroup = [];
  var checkedChannel = [];
  // const [checkedGroupList, setcheckedGroupList] = React.useState(checkedGroup);
  const [indeterminateGroupCode, setIndeterminateGroupCode] =
    React.useState(true);
  const [checkAllGroupCode, setCheckAllGroupCode] = React.useState(false);

  const [userType, setUserType] = useState('BANK');

  const [groupTypeOptions, setGroupTypeOption] = useState(bankGroupType);

  const [branchLevel, setBranchLevel] = useState('');
  const [role, setRole] = useState('');
  const [groupType, setGroupType] = useState('');
  const [roleOptions, setRoleOptions] = useState([]);
  const [userGroupCodeList, setUserGroupCodeList] = useState([]);
  const [checkedList, setCheckedList] = React.useState(checkedGroup); //checked group
  const [channelList, setChannelList] = useState([]); //list channel
  const [checkedChannelList, setCheckedChannelList] = useState([]); //list channel

  const [authenticationOptions, setAuthenticationOptions] = useState([]);
  // var userStatus = 0;

  const statusOptions = [
    { label: 'Hoạt động', value: 1 },
    { label: 'Ngừng hoạt động', value: 0 },
  ];

  const [user, setUser] = useState({
    id: 0,
    userId: '',
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
    userStatus: 0,
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
  const [dataResetPass, setDataResetPass] = useState({
    userId: '',
    userType: '',
  });

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
          setUser(user);
          console.log('user', user);

          checkedGroup = user.userGroupCodes;
          setUserGroupCodeList(checkedGroup);
          setCheckedList(checkedGroup);

          checkedChannel = user.channels;
          setChannelList(checkedChannel);
          setCheckedChannelList(checkedChannel);
          if (user.userType == 'BANK') {
            setGroupTypeOption(bankGroupType);
            setRoleOptions(bankRolelOptions);
            setAuthenticationOptions(bankAuthenticationMedthods);
          } else if (user.userType == 'FPT') {
            setGroupTypeOption(fptGroupType);
            setRoleOptions(fptRoleOptions);
            setAuthenticationOptions(fptAuthenticationMedthods);
          }
          setDataResetPass({
            ...dataResetPass,
            userId: user.userId,
            userType: user.userType,
          });
          form.setFieldsValue({
            bankCode: user.bankCode,
            userType: user.userType,
            userId: user.userId,
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
            roles: user.roles,
            authentication: user.authentication,
            userStatus: user.userStatus,
          });
          //get status user để resetpassword
          // userStatus = user.userStatus;
          console.log('3:::', checkedGroup);
        })
        .catch(function (error) {
          console.log(error.response);
        });
      console.log('4:::', checkedGroup);
    };

    fetchData();
    // console.log(userGroup);
  }, [id, form]);

  // console.log("5:::",checkedGroup)
  // setcheckedGroupList(checkedGroup);
  // //-----user group code checkbox----------//
  // const onGroupCodeChange = (list) => {
  //   setCheckedList(list);
  //   setIndeterminate(!!list.length && list.length < userGroupCodeList.length);
  //   setCheckAll(list.length === userGroupCodeList.length);
  // };

  // const onCheckAllChange = (e) => {
  //   setCheckedList(e.target.checked ? userGroupCodeList : []);
  //   setIndeterminate(false);
  //   setCheckAll(e.target.checked);
  // };
  // //------------------------------//

  const [deleteModalVisible, setDeleteVisible] = useState(false);
  const [resetPassModalVisible, setResetPassVisible] = useState(false);
  const [activeModalVisible, setActiveVisible] = useState(false);
  const [deactiveModalVisible, setDeactiveVisible] = useState(false);
  const [lockModalVisible, setLockVisible] = useState(false);
  const [unlockModalVisible, setUnlockVisible] = useState(false);

  function openDeleteModal() {
    setDeleteVisible(true);
  }

  function closeDeleteModal(data) {
    console.log(data);
    setDeleteVisible(false);
  }

  function openResetPassModal() {
    let status = form.getFieldValue('userStatus');
    if (status == '1') {
      setResetPassVisible(true);
    } else {
      message.error('Trạng thái người dùng không hợp lệ!');
    }
  }

  function closeResetPassModal(data) {
    console.log(data);
    setResetPassVisible(false);
  }

  function openActiveModal() {
    setActiveVisible(true);
  }

  function closeActiveModal(data) {
    console.log(data);
    setActiveVisible(false);
  }

  function openDeactiveModal() {
    setDeactiveVisible(true);
  }

  function closeDeactiveModal(data) {
    console.log(data);
    setDeactiveVisible(false);
  }

  function openLockModal() {
    setLockVisible(true);
  }

  function closeLockModal(data) {
    console.log(data);
    setLockVisible(false);
  }

  function openUnlockModal() {
    setUnlockVisible(true);
  }

  function closeUnlockModal(data) {
    console.log(data);
    setUnlockVisible(false);
  }
  //-----delete----------//
  const handleDeleteOk = (data) => {
    var config = {
      method: 'delete',
      url: process.env.REACT_APP_API_BACKEND + '/user/deleteUser?id=' + id + '',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('access_token') + '',
      },
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        history.push('/home/bank-fpt-admin-manage-user');
        message.info('Xóa thành công');
        setDeleteVisible(false);
      })
      .catch(function (error) {
        console.log(error);
      });
    console.log(data);
  };
  //------------------------------//

  return (
    <>
      <DeleteModal
        isVisbled={deleteModalVisible}
        onCloseModal={closeDeleteModal}
        onDelete={handleDeleteOk}
      />

      <ResetPassModal
        isVisbled={resetPassModalVisible}
        onCloseModal={closeResetPassModal}
        dataResetPass={dataResetPass}
      />

      <ActiveModal
        isVisbled={activeModalVisible}
        onCloseModal={closeActiveModal}
      />

      <DeactiveModal
        isVisbled={deactiveModalVisible}
        onClose={closeDeactiveModal}
        onCloseModal={closeDeactiveModal}
      />

      <LockModal
        isVisbled={lockModalVisible}
        onClose={closeLockModal}
        onCloseModal={closeLockModal}
      />

      <UnlockModal
        isVisbled={unlockModalVisible}
        onClose={closeUnlockModal}
        onCloseModal={closeUnlockModal}
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
            <KTTitle size={4}>Xem</KTTitle>
          </Col>
        </Row>
        <Row className={'padding-md'}>
          <Col span={24}>
            <Form
              form={form}
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
                        <Select disabled>
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
                      <Form.Item name={'employeeCode'}>
                        <Input disabled />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={8}>
                      Tên người dùng <span className={'text-require'}>*</span>
                    </Col>
                    <Col span={16}>
                      <Form.Item name={'userName'}>
                        <Input disabled />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={8}>
                      Loại giấy tờ <span className={'text-require'}>*</span>
                    </Col>
                    <Col span={16}>
                      <Form.Item name={'identityType'}>
                        <Select disabled>
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
                        <Input disabled />
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
                          disabled
                          className={'width-date-picker'}
                          format={dateFormatList}
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
                        <Input disabled />
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
                        <Select disabled>
                          <Select.Option value="HO">
                            Hội sở chính
                          </Select.Option>
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row>
                    <Col span={8}>
                      Email <span className={'text-require'}>*</span>
                    </Col>
                    <Col span={16}>
                      <Form.Item name={'email'}>
                        <Input disabled type={'email'} />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={8}>
                      Số điện thoại <span className={'text-require'}>*</span>
                    </Col>
                    <Col span={16}>
                      <Form.Item name={'phoneNumber'}>
                        <Input disabled />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row>
                    <Col span={8}>
                      Loại nhóm <span className={'text-require'}>*</span>
                    </Col>
                    <Col span={16}>
                      <Form.Item name={'groupType'}>
                        <Select disabled>
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
                        <Select disabled>
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
                      <Form.Item>
                        <Checkbox.Group
                          disabled
                          className={'display-grid'}
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
                          options={channelList}
                          value={checkedChannelList}
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
                        <Select disabled>
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
                        <Select disabled>
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
                        <Button
                          onClick={(e) => {
                            am010402Domain.toEditPage(id);
                          }}
                          className="common-btn"
                          htmlType="submit"
                        >
                          Sửa
                        </Button>
                        <Button
                          onClick={openDeleteModal}
                          className="common-btn"
                          htmlType="submit"
                        >
                          Xóa
                        </Button>
                        <Button className="common-btn" htmlType="submit">
                          Xem phân quyền
                        </Button>
                        <Button
                          onClick={openResetPassModal}
                          className="common-btn"
                          htmlType="submit"
                        >
                          Đặt lại mật khẩu
                        </Button>
                        <Button
                          onClick={openActiveModal}
                          className="common-btn"
                          htmlType="submit"
                        >
                          Kích hoạt
                        </Button>

                        <Button
                          onClick={openDeactiveModal}
                          className="common-btn"
                          htmlType="submit"
                        >
                          Vô hiệu hóa
                        </Button>
                        <Button
                          onClick={openLockModal}
                          className="common-btn"
                          htmlType="submit"
                        >
                          Khóa
                        </Button>
                        <Button
                          onClick={openUnlockModal}
                          className="common-btn"
                          htmlType="submit"
                        >
                          Mở khóa
                        </Button>
                        <Button className="common-btn" htmlType="submit">
                          Ngắt kết nối
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
