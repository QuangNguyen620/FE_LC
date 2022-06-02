import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { EyeFilled, SearchOutlined } from '@ant-design/icons';
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
} from 'antd';
import { KTTitle } from 'core/ui';
import '../../../common/less/BM010303.less';
import { BM010303Domain } from '../domains/BM010303EditDomain';
import UpdateUserAuthModaSuccessfull from '../../../common/modal/update/update-user-group/UpdateUserAuthModaSuccessfull';
import UpdateUserAuthModalFailed from '../../../common/modal/update/update-user-group/UpdateUserAuthModalFailed';
var axios = require('axios');
const { Link } = Typography;
const CheckboxGroup = Checkbox.Group;

const authenticationOptions = [
  { label: 'None', value: 'none' },
  { label: 'Mật khẩu giao dịch', value: 'password' },
  { label: 'OTP', value: 'otp' },
];

const bankRolelOptions = [
  { label: 'Maker', value: 'Maker' },
  { label: 'Approver', value: 'Approver' },
];

const bankSiteBranchLevel = [{ label: 'Hội sở chính', value: 'HO' }];

const bankGroupType = [
  { label: 'Admin ngân hàng', value: 'bank-admin' },
  { label: 'Người dùng ngân hàng', value: 'bank-user' },
];

const branches = [{ label: '1000-Hội sở chính', value: '1000-Hội sở chính' }];

const department = [{ label: 'P01-Phòng L/C', value: 'P01-Phòng L/C' }];
const plainOptions = ['AIN', 'BIN', 'CIN', 'CMB'];
const defaultCheckedList = [];
const BM010301ViewDeatailView = ({ lang = 'vi', ...props }) => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [, domain] = BM010303Domain();
  const [form] = Form.useForm();

  const [userAuth, setUserAuth] = useState({
    userId: '',
    userCode: '',
    userName: '',
    bankCode: '',
    branch: '',
    department: '',
    channelInit: '',
    dateOfIdentity: '',
    email: '',
    employeeCode: '',
    identityNumber: '',
    identityType: '',
    issuedByIdentity: '',
    phoneNumber: '',
    userGroupCodes: [],
    userStatus: '',
    userType: '',
    authentication: '',
    role: '',
    groupType: '',
  });

  const [updateSuccessfulDialogVisible, setUpdateSuccessfulDialogVisible] =
    useState(false);
  const [updateFailedDialogVisible, setUpdateFailedDialogVisible] =
    useState(false);

  function convert(str) {
    var date = new Date(str),
      mnth = ('0' + (date.getMonth() + 1)).slice(-2),
      day = ('0' + date.getDate()).slice(-2);
    return [day, mnth, date.getFullYear()].join('/');
  }

  //------------------------------//
  useEffect(() => {
    const fetchData = () => {
      var config = domain.getUserAuth(id);

      config
        .then((result) => {
          axios(result)
            .then(function (response) {
              var userAuth = response.data.data;

              var groupType = '';
              var role = '';
              userAuth.userGroupEntitys.forEach((group) => {
                groupType = group.groupType.toLowerCase();
                role = group.role;
              });
              userAuth.groupType = groupType;
              userAuth.role = role;
              setUserAuth(userAuth);

              form.setFieldsValue({
                userCode: userAuth.userCode,
                userName: userAuth.userName,
                branch: userAuth.branch,
                department: userAuth.department,
                groupTypes:
                  groupType == 'bank-admin'
                    ? 'Admin ngân hàng'
                    : groupType == 'bank-user'
                    ? 'Người dùng ngân hàng'
                    : groupType,
                role: userAuth.role,
                authentication: userAuth.authentication,
                employeeCode: userAuth.employeeCode,
                createdDate: userAuth.createdDate,
                userStatus: userAuth.userStatus,
              });
            })
            .catch(function (error) {
              console.log(error.response);
              if (error.response.status == 401) {
                console.log('Lỗi 401: Hết hạn token');
              }
            });
        })
        .catch(function (error) {
          console.log('Lỗi ở đây đang là: ', error);
        });
    };

    fetchData();
    console.log('userAuth:::', userAuth);
  }, [id, form]);

  //-------------------------------------//

  const statusChange = (value) => {
    setUserAuth({
      ...userAuth,
      userStatus: value,
    });
  };

  //----Submit data-------------------------//
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  // Update user group---------//
  const submitHandler = () => {
    var data = userAuth;

    console.log('Received values of form: ', data);

    var configPromise = domain.updateUserAuth(id, data);
    console.log('config::', configPromise);
    configPromise
      .then((result) => {
        axios(result)
          .then(function (response) {
            console.log(data);
            console.log(response.data.data);
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
      <UpdateUserAuthModaSuccessfull
        isVisbled={updateSuccessfulDialogVisible}
        onCloseModal={closeUpdateSuccessfulModal}
        onClose={closeUpdateSuccessfulModal}
      />

      <UpdateUserAuthModalFailed
        isVisbled={updateFailedDialogVisible}
        onCloseModal={closeUpdateFailedModal}
        onClose={closeUpdateFailedModal}
      />

      <div className={'main-container'}>
        <Row className={'padding-title'}>
          <Col span={24}>
            <KTTitle size={3}>
              <b>Quản lý phương thức xác thực người dùng ngân hàng </b>
            </KTTitle>
          </Col>
        </Row>
        <Row className={'padding-title-sub'}>
          <Col span={24}>
            <KTTitle size={4}>Sửa thông tin</KTTitle>
          </Col>
        </Row>
        <Row className="padding-md">
          <Col span={24}>
            <Form
              form={form}
              onFinish={submitHandler}
              onFinishFailed={onFinishFailed}
              layout="horizontal"
            >
              <Row>
                {' '}
                <Col span={8}>
                  Mã người dùng <span className={'text-require'}>*</span>
                </Col>
                <Col span={16}>
                  <Form.Item name={'userCode'}>
                    <Input
                      disabled //  onChange={userCodeChange}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col span={8}>
                  Tên người dùng <span className={'text-require'}>*</span>
                </Col>
                <Col span={16}>
                  <Form.Item name={'userName'}>
                    <Input
                      disabled
                      // onChange={userNameChange}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col span={8}>
                  chi nhánh <span className={'text-require'}>*</span>
                </Col>
                <Col span={16}>
                  <Form.Item name={'branch'}>
                    <Input
                      disabled
                      // onChange={userNameChange}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col span={8}>
                  Phòng ban <span className={'text-require'}></span>
                </Col>
                <Col span={16}>
                  <Form.Item name={'department'}>
                    <Input
                      disabled
                      // onChange={userNameChange}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={8}>
                  Loại nhóm<span className={'text-require'}>*</span>
                </Col>
                <Col span={16}>
                  <Form.Item name={'groupTypes'}>
                    <Input
                      disabled
                      // onChange={userNameChange}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={8}>
                  Vai trò <span className={'text-require'}>*</span>
                </Col>
                <Col span={16}>
                  <Form.Item name={'role'}>
                    <Input
                      disabled
                      // onChange={userNameChange}
                    />
                  </Form.Item>
                </Col>
              </Row>

              {/* <Row>
                <Col span={8}>
                  Phương thức xác thực{' '}
                  <span  className={'text-require'}>*</span>
                </Col>
                <Col span={16}>
                  <Form.Item name={'authentication'}>
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
                  Được gán bởi <span className={'text-require'}>*</span>
                </Col>
                <Col span={16}>
                  <Form.Item name={'employeeCode'}>
                    <Input
                      disabled
                      // onChange={userNameChange}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col span={8}>
                  Ngày gán <span className={'text-require'}>*</span>
                </Col>
                <Col span={16}>
                  <Form.Item name={'createdDate'}>
                    <Input
                      disabled
                      // onChange={userNameChange}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={8}>
                  Trạng thái <span className={'text-require'}>*</span>
                </Col>
                <Col span={16}>
                  <Form.Item name={'userStatus'}>
                    <Select onChange={statusChange}>
                      <Select.Option value="1">Hoạt động</Select.Option>
                      <Select.Option value="0">Ngừng hoạt động</Select.Option>
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
                      className="secondary-btn"
                    >
                      Đóng
                    </Button>
                  </Space>
                </Form.Item>
              </div>

              <Col span={2}></Col>
            </Form>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default BM010301ViewDeatailView;
