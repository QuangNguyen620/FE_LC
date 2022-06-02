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
  message,
} from 'antd';
import DeleteUserAuthModal from '../../../common/modal/delete/delete-user-group/DeleteUserAuthModal';
import DeleteUserAuthModalSuccessfull from '../../../common/modal/delete/delete-user-group/DeleteUserAuthModalSuccessfull';
import DeleteUserAuthModalFailed from '../../../common/modal/delete/delete-user-group/DeleteUserAuthModalFailed';

import { KTTitle } from 'core/ui';
import '../../../common/less/BM010303.less';
import { BM010303ViewDomain } from '../domains/BM010303ViewDomain';
var axios = require('axios');
const { Link } = Typography;
const CheckboxGroup = Checkbox.Group;

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

const departments = [{ label: 'P01-Phòng L/C', value: 'P01-Phòng L/C' }];
const plainOptions = ['AIN', 'BIN', 'CIN', 'CMB'];
const defaultCheckedList = [];

const authenticationOptions = [
  { label: 'None', value: 'none' },
  { label: 'Mật khẩu giao dịch', value: 'password' },
  { label: 'OTP', value: 'otp' },
];

const BM010301ViewDeatailView = ({ lang = 'vi', ...props }) => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [, domain] = BM010303ViewDomain();
  const [form] = Form.useForm();
  var channelChecked = [];
  const [userAuth, setUserAuth] = useState({
    id: 0,
    userCode: '',
    userName: '',
    branch: '',
    departments: '',
    groupType: '',
    role: '',
    authentication: '',
    employeeCode: '',
    createdDate: '',
    userStatus: '',
  });

  function convert(str) {
    var date = new Date(str),
      mnth = ('0' + (date.getMonth() + 1)).slice(-2),
      day = ('0' + date.getDate()).slice(-2);
    return [day, mnth, date.getFullYear()].join('/');
  }

  const [checkedList, setCheckedList] = React.useState(defaultCheckedList);
  const [indeterminate, setIndeterminate] = React.useState(false);
  const [checkAll, setCheckAll] = React.useState(false);

  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const [deleteSuccessfulDialogVisible, setDeleteSuccessfulDialogVisible] =
    useState(false);
  const [deleteFailedDialogVisible, setDeleteFailedDialogVisible] =
    useState(false);

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
    console.log(userAuth);
  }, [id, form]);

  const handleDelete = () => {
    var config = domain.delUserAuth(id);
    config
      .then((result) => {
        axios(result)
          .then(function (response) {
            console.log(response);
            setDeleteSuccessfulDialogVisible(true);
            // domain.exitHandler();
          })
          .catch(function (error) {
            console.log(error);
          });
      })
      .catch(function (error) {
        console.log('Lỗi ở đây đang là: ', error);
      });
  };

  function openDeleteModal() {
    if (userAuth.groupType != 'bank-admin') {
      setDeleteDialogVisible(true);
    } else {
      message.error(
        'Không cho phép thao tác trên thông tin người dùng Admin ngân hàng',
      );
    }
  }

  function closeDeleteModal(data) {
    console.log(data);
    setDeleteDialogVisible(false);
    // history.push('/home/bank-fpt-admin-manage');
  }
  function closeDeleteSuccessfulModal() {
    setDeleteSuccessfulDialogVisible(false);
    domain.exitHandler();
  }
  return (
    <>
      <DeleteUserAuthModalSuccessfull
        isVisbled={deleteSuccessfulDialogVisible}
        onCloseModal={closeDeleteSuccessfulModal}
        onClose={closeDeleteSuccessfulModal}
      />

      <DeleteUserAuthModal
        isVisbled={deleteDialogVisible}
        onCloseModal={closeDeleteModal}
        onClose={closeDeleteModal}
        deleteHandler={handleDelete}
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
            <KTTitle size={4}>Xem chi tiết</KTTitle>
          </Col>
        </Row>
        <Row className="padding-md">
          <Col span={24}>
            <Form
              form={form}
              // onFinish={submitHandler}
              // onFinishFailed={onFinishFailed}
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
                    <Select disabled defaultValue="1">
                      <Select.Option value="1">Hoạt động</Select.Option>
                      <Select.Option value="0">Ngừng hoạt động</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <div id="form-footer">
                <Form.Item>
                  <Space className={'padding-buton'}>
                    <Button
                      className="common-btn"
                      onClick={(e) => {
                        if (userAuth.groupType != 'bank-admin') {
                          domain.toEditPage(id);
                        } else {
                          message.error(
                            'Không cho phép thao tác trên thông tin người dùng Admin ngân hàng',
                          );
                        }
                      }}
                    >
                      Sửa
                    </Button>
                    <Button
                      className="common-btn"
                      onClick={(e) => {
                        openDeleteModal();
                      }}
                    >
                      Xóa
                    </Button>
                    <Button
                      onClick={(e) => {
                        domain.exitHandler();
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
