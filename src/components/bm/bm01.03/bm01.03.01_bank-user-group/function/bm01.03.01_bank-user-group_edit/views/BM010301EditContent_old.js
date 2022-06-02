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
import '../../../common/less/BM010301.less';
import { BM010301Domain } from '../domains/BM010301EditDomain';
import UpdateUserGrouSuccessfulModal from '../../../common/modal/update/update-user-group/UpdateUserGroupModaSuccessfull';
import UpdateUserGroupFailedModal from '../../../common/modal/update/update-user-group/UpdateUserGroupModalFailed';
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
const BM010301ViewDeatailView = ({ lang = 'vi', ...props }) => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [context, domain] = BM010301Domain();
  const [form] = Form.useForm();
  const [userInput, setInput] = useState({
    branch: '',
    branchLevel: '',
    channels: '',
    department: '',
    description: '',
    groupType: '',
    permission: '',
    role: '',
    roleResponse: '',
    rolesDescription: '',
    status: 0,
    userGroupCode: '',
    userGroupName: '',
    userType: '',
  });

  useEffect(() => {
    domain.initDomain();
  }, []);

  // useEffect(() => {
  //   log.debug('useEffect--', context);
  // }, [context]);

  useEffect(() => {
    console.log('List bank');
    console.log(context?.constantValue?.bankList);
    console.log(localStorage.login_username_bankId);
    form.setFieldsValue({
      bankId: ~~localStorage.login_username_bankId,
    });
  }, [context]);

  var channelChecked = [];
  const [userGroup, setUserGroup] = useState({
    branch: '',
    branchLevel: '',
    channels: '',
    department: '',
    description: '',
    groupId: '',
    groupType: '',
    permission: '',
    role: '',
    roleResponse: '',
    rolesDescription: '',
    status: 0,
    userGroupCode: '',
    userGroupName: '',
    userType: '',
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

  const [checkedList, setCheckedList] = React.useState(defaultCheckedList);
  const [indeterminate, setIndeterminate] = React.useState(false);
  const [checkAll, setCheckAll] = React.useState(false);

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
      var config = domain.getUserGroup(id);

      config
        .then((result) => {
          axios(result)
            .then(function (response) {
              console.log(response.data.data);
              var userGroup = response.data.data;
              setUserGroup(userGroup);
              console.log(userGroup);
              channelChecked = userGroup.channels.split(',');
              channelChecked.splice(-1);
              setCheckedList(channelChecked);
              form.setFieldsValue({
                userGroupCode: userGroup.userGroupCode,
                userGroupName: userGroup.userGroupName,
                // site_choosing: userGroup.userType,
                groupType:
                  userGroup.groupType == 'bank-admin'
                    ? 'Admin ngân hàng'
                    : 'Người dùng ngân hàng',
                branchLevel: userGroup.branchLevel,
                branch: userGroup.branch,
                department: userGroup.department,
                role: userGroup.role,
                status: userGroup.status == 1 ? 'Hoạt động' : 'Ngừng hoạt động',
                description: userGroup.description,
              });
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
    console.log(userGroup);
  }, [id, form]);
  //-------------------------------------//
  const userGroupNameChange = (event) => {
    var userGroupName = event.target.value;
    if (userGroupName.trim() != '' || userGroupName.trim() != null) {
      setInput({
        ...userInput,
        userGroupName: userGroupName.trim(),
      });
    }
  };

  const branchLevelChange = (value) => {
    setInput({
      ...userInput,
      branchLevel: value,
    });
  };

  const branchChange = (value) => {
    setInput({
      ...userInput,
      branch: value,
    });
  };

  const departmentChange = (value) => {
    setInput({
      ...userInput,
      department: value,
    });
  };

  const roleChange = (value) => {
    setInput({
      ...userInput,
      role: value,
    });
  };

  const groupTypeChange = (value) => {
    setInput({
      ...userInput,
      groupType: value,
    });
  };

  const statusChange = (value) => {
    setInput({
      ...userInput,
      status: value,
    });
  };
  const desciptionChange = (event) => {
    setInput({
      ...userInput,
      description: event.target.value,
    });
  };
  //----Submit data-------------------------//
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  // Update user group---------//
  const submitHandler = () => {
    var channelString = '';

    checkedList.forEach((channel) => {
      channelString += channel + ',';
    });

    var data = {
      branch: userInput.branch == '' ? userGroup.branch : userInput.branch,
      branchLevel:
        userInput.branchLevel == ''
          ? userGroup.branchLevel
          : userInput.branchLevel,
      channels: channelString,
      createdBy: '',
      createdDate: '',
      department:
        userInput.department == ''
          ? userGroup.department
          : userInput.department,
      description:
        userInput.description.trim() == ''
          ? userGroup.description
          : userInput.description.trim(),
      groupId: userGroup.groupId,
      groupType:
        userInput.groupType == '' ? userGroup.groupType : userInput.groupType,
      id: id,
      lastModifiedBy: '',
      lastModifiedDate: '',
      permission: userGroup.permission,
      role: userInput.role == '' ? userGroup.role : userInput.role,
      status: userInput.status == '' ? userGroup.status : userInput.status,
      userGroupCode: userGroup.userGroupCode,
      userGroupName:
        userInput.userGroupName == ''
          ? userGroup.userGroupName
          : userInput.userGroupName.trim(),
      userType: 'BANK',
    };

    console.log('Received values of form: ', data);

    var configPromise = domain.updateUserGroup(id, data);
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
      <UpdateUserGrouSuccessfulModal
        isVisbled={updateSuccessfulDialogVisible}
        onCloseModal={closeUpdateSuccessfulModal}
        onClose={closeUpdateSuccessfulModal}
      />

      <UpdateUserGroupFailedModal
        isVisbled={updateFailedDialogVisible}
        onCloseModal={closeUpdateFailedModal}
        onClose={closeUpdateFailedModal}
      />

      <div className={'main-container'}>
        <Row className={'padding-title'}>
          <Col span={24}>
            <KTTitle size={3}>
              <b>Quản lý nhóm người dùng ngân hàng </b>
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
                  Mã nhóm người dùng <span className={'text-require'}>*</span>
                </Col>
                <Col span={16}>
                  <Form.Item name={'userGroupCode'}>
                    <Input
                      disabled //  onChange={userGroupCodeChange}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col span={8}>
                  Tên nhóm người dùng <span className={'text-require'}>*</span>
                </Col>
                <Col span={16}>
                  <Form.Item name={'userGroupName'}>
                    <Input onChange={userGroupNameChange} />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={8}>
                  Ngân hàng <span className={'text-require'}>*</span>
                </Col>
                <Col span={16}>
                  <Form.Item
                    name={'bankId'}
                    rules={[
                      {
                        required: true,
                        message: 'Trường ngân hàng không được phép để trống!',
                      },
                    ]}
                  >
                    <Select disabled>
                      {context?.constantValue?.bankList.map((bank) => (
                        <Select.Option value={bank.bankId}>
                          {bank.bankName}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={8}>
                  Cấp chi nhánh <span className={'text-require'}>*</span>
                </Col>
                <Col span={16}>
                  <Form.Item name={'branchLevel'}>
                    <Select
                      onChange={branchLevelChange}
                      // value={userInput.branchLevel}
                    >
                      {bankSiteBranchLevel.map((branch) => (
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
                  Chi nhánh <span className={'text-require'}></span>
                </Col>
                <Col span={16}>
                  <Form.Item name={'branch'}>
                    <Select
                      onChange={branchChange}
                      // value={userInput.branch
                    >
                      {branches.map((branch) => (
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
                  Phòng ban <span className={'text-require'}></span>
                </Col>
                <Col span={16}>
                  <Form.Item name={'department'}>
                    <Select
                      onChange={departmentChange}
                      // value={userInput.department}
                    >
                      {departments.map((department) => (
                        <Select.Option value={department.value}>
                          {department.label}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={8}>
                  Kênh <span className={'text-require'}>*</span>
                </Col>
                <Col span={16}>
                  <Form.Item name={'channel'}>
                    <Checkbox
                      indeterminate={indeterminate}
                      onChange={onCheckAllChange}
                      checked={checkAll}
                    >
                      Tất cả
                    </Checkbox>
                    <CheckboxGroup
                      className={'display-grid'}
                      options={plainOptions}
                      value={checkedList}
                      onChange={onChange}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={8}>
                  Loại nhóm<span className={'text-require'}>*</span>
                </Col>
                <Col span={16}>
                  <Form.Item name={'groupType'}>
                    <Select
                      onChange={groupTypeChange}
                      // value={userInput.groupType}
                    >
                      {bankGroupType.map((groupType) => (
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
                  <Form.Item name={'role'}>
                    <Select onChange={roleChange}>
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
                  Trạng thái <span className={'text-require'}>*</span>
                </Col>
                <Col span={16}>
                  <Form.Item name={'status'}>
                    <Select onChange={statusChange} defaultValue="1">
                      <Select.Option value="1">Hoạt động</Select.Option>
                      <Select.Option value="0">Ngừng hoạt động</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col span={8}>Mô tả </Col>
                <Col span={16}>
                  <Form.Item name={'description'}>
                    <Input onChange={desciptionChange} />
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
