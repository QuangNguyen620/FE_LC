import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { EyeFilled, SearchOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import {
  Col,
  Row,
  Typography,
  Input,
  Button,
  Form,
  Select,
  Space,
  Checkbox,
  DatePicker,
} from 'antd';

import DeleteUserModal from '../../../common/modal/delete/delete-user-group/DeleteUserModal';
import DeleteUserSuccessfulModal from '../../../common/modal/delete/delete-user-group/DeleteUserModalSuccessfull';

import DeleteModal from '../../../common/modal/view/DeleteModal.js';
import ResetPassModal from '../../../common/modal/view/ResetPassModal';
import ActiveModal from '../../../common/modal/view/ActiveModal';
import DeactiveModal from '../../../common/modal/view/DeactiveModal';
import LockModal from '../../../common/modal/view/LockModal';
import UnlockModal from '../../../common/modal/view/UnlockModal';

import { KTTitle } from 'core/ui';
import '../../../common/less/BM010302.less';
import { BM010302Domain } from '../domains/BM010302ViewDomain';
import moment from 'moment';
var axios = require('axios');
const { Link } = Typography;
const CheckboxGroup = Checkbox.Group;

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

const roleOptions = [
  { label: 'Maker', value: 'Maker' },
  { label: 'Approver', value: 'Approver' },
  { label: 'Maker+Approver', value: 'Maker+Approver' },
];

var checkedGroup = [];
var checkedChannel = [];
const branches = [{ label: '1000-Hội sở chính', value: '1000-Hội sở chính' }];

const plainOptions = ['AIN', 'BIN', 'CIN', 'CMB'];
const defaultCheckedList = [];

const dateFormatList = 'DD/MM/YYYY';

const BM010301ViewDeatailView = ({ lang = 'vi', ...props }) => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [, domain] = BM010302Domain();
  const [form] = Form.useForm();
  var channelChecked = [];
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
    userStatus: '',
    createdBy: '',
    createdDate: '',
    lastModifiedBy: '',
    lastModifiedDate: '',
    channels: [],
    branchLevels: '',
    groupTypes: '',
    userGroupCodes: [],
    roles: '',
  });

  const [dataResetPass, setDataResetPass] = useState({
    userId: '',
    userType: '',
  });

  function convert(str) {
    var date = new Date(str),
      mnth = ('0' + (date.getMonth() + 1)).slice(-2),
      day = ('0' + date.getDate()).slice(-2);
    return [day, mnth, date.getFullYear()].join('/');
  }

  const [userGroupCodeList, setUserGroupCodeList] = useState([]);
  const [checkedList, setCheckedList] = React.useState(defaultCheckedList);

  const [channelList, setChannelList] = useState([]); //list channel
  const [checkedChannelList, setCheckedChannelList] = useState([]); //list channel

  const [indeterminate, setIndeterminate] = React.useState(false);
  const [checkAll, setCheckAll] = React.useState(false);

  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const [deleteSuccessfulDialogVisible, setDeleteSuccessfulDialogVisible] =
    useState(false);
  const [deleteFailedDialogVisible, setDeleteFailedDialogVisible] =
    useState(false);

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
    setResetPassVisible(true);
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
  //-----Channel checkbox----------//
  const onChange = (list) => {
    setCheckedList(list);
    setIndeterminate(!!list.length && list.length < plainOptions.length);
    setCheckAll(list.length === plainOptions.length);
  };

  const onCheckAllChange = (e) => {
    setCheckedList(e.target.checked ? plainOptions : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };
  //------------------------------//

  useEffect(() => {
    const fetchData = () => {
      var config = domain.getUser(id);

      config
        .then((result) => {
          axios(result)
            .then(function (response) {
              console.log(response);
              var user = response.data.data;
              setUser(user);
              checkedGroup = user.userGroupCodes;
              setUserGroupCodeList(checkedGroup);
              setCheckedList(checkedGroup);

              checkedChannel = user.channels;
              setChannelList(checkedChannel);
              setCheckedChannelList(checkedChannel);

              setDataResetPass({
                ...dataResetPass,
                userId: user.userId,
                userType: user.userType,
              });
              console.log(user.dateOfIdentity);

              form.setFieldsValue({
                bankCode: user.bankCode,
                userType: user.userType,
                userId: user.userId,
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
                roles: user.roles,
                authentication: user.authentication,
                userStatus: user.userStatus ? 'Hoạt động' : 'Ngừng hoạt động',
              });
              console.log(user.groupTypes);
            })
            .catch(function (error) {
              console.log(error);
            });
        })
        .catch(function (error) {
          console.log('Lỗi ở đây đang là: ', error);
        });
    };

    fetchData();
    console.log(user);
  }, [id, form]);

  const handleDelete = (data) => {
    var config = {
      method: 'delete',
      url: process.env.REACT_APP_API_BACKEND + '/bank/user/delete/' + id + '',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('access_token') + '',
      },
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setDeleteSuccessfulDialogVisible(true);
        // domain.exitHandler();
      })
      .catch(function (error) {
        console.log(error);
      });
    console.log(data);
  };

  // function openDeleteModal() {
  //   setDeleteDialogVisible(true);
  // }

  // function closeDeleteModal(data) {
  //   console.log(data);
  //   setDeleteDialogVisible(false);
  //   // history.push('/home/bank-fpt-admin-manage');
  // }
  function closeDeleteSuccessfulModal() {
    setDeleteSuccessfulDialogVisible(false);
    domain.exitHandler();
  }
  return (
    <>
      <DeleteUserSuccessfulModal
        isVisbled={deleteSuccessfulDialogVisible}
        onCloseModal={closeDeleteSuccessfulModal}
        onClose={closeDeleteSuccessfulModal}
      />

      <DeleteModal
        isVisbled={deleteModalVisible}
        onCloseModal={closeDeleteModal}
        onDelete={handleDelete}
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
        <Row className="padding-md">
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
                <Col span={23}>
                  <Row>
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
                          className={'width-date-picker'}
                          name={'dateOfIdentity'}
                          disabled
                          format={dateFormatList}
                          placeholder="Chọn ngày cấp"
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
                  <Row>
                    <Col span={8}>
                      Cấp chi nhánh <span style={{ color: '#F5222D' }}>*</span>
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
                          onClick={(e) => {
                            domain.toEditPage(id);
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
                        <Button
                          className="common-btn"
                          htmlType="submit"
                          onClick={(e) => {
                            domain.toAuthorizePage(id);
                          }}
                        >
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

export default BM010301ViewDeatailView;
