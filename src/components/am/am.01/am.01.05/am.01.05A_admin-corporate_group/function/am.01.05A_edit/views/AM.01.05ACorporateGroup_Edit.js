/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Col,
  Row,
  Form,
  Select,
  Input,
  Radio,
  Checkbox,
  Button,
  Space,
  Modal,
} from 'antd';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router';
import { KTTitle } from 'core/ui';
import '../../../common/less/AM.01.05A.less';
import { useA00Domain } from '../domains/AM.01.05ADomain';
import UpdateSuccessModal from '../../../common/modal/edit/updateSuccessModal';
var axios = require('axios');

const CheckboxGroup = Checkbox.Group;
//-----------Init static data---------------//

const plainOptions = ['AIN', 'BIN', 'CIN', 'CMB'];
const channelOptions = [{ label: 'CIN - Corporate Internet', value: 'CIN' }];
const rolelOptions = [
  { label: 'Maker', value: 'Maker' },
  { label: 'Approver', value: 'Approver' },
];

//-----------Init static data---------------//

const AM0105A_CorporateGroup_Edit = ({ lang = 'vi', ...props }) => {
  const { id } = useParams();
  const { t } = useTranslation();
  const [, am0105ADomain] = useA00Domain();
  const [form] = Form.useForm();
  const history = useHistory();
  //------Control state-----------//
  var channelChecked = [];
  const [successModalVisible, setDialogVisible] = useState(false);

  const [userGroup, setUserGroup] = useState({
    id: 0,
    userGroupCode: '',
    userGroupName: '',
    userType: '',
    groupType: '',
    branchLevel: '',
    role: '',
    status: '',
    description: '',
    channels: '',
  });

  useEffect(() => {
    var data = '';

    var config = {
      method: 'get',
      url:
        process.env.REACT_APP_API_BACKEND +
        '/corporate/group/co/getUserGroupById?id=' +
        id +
        '',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('access_token') + '',
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        var userGroup = response.data.data;
        userGroup.status = userGroup.status + '';
        setUserGroup(userGroup);
        form.setFieldsValue({
          user_group_code: userGroup.userGroupCode,
          user_group_name: userGroup.userGroupName,
          user_type: userGroup.userType,
          group_type: userGroup.groupType,
          branch_level: userGroup.branchLevel,
          channels: userGroup.channels,
          role: userGroup.role,
          status: userGroup.status,
          description: userGroup.description,
        });
        console.log(userGroup.status);
      })
      .catch(function (error) {
        console.log(error.response);
        if (error.response.status == 401) {
          console.log('Lỗi 401: Hết hạn token');
        }
      });
  }, [id, form]);

  function closeSuccessModal(data) {
    console.log(data);
    setDialogVisible(false);
    history.push(`/home/admin-corporate-group/view/${id}`);
  }
  //---------- Init user input data---------//

  const [userInput, setInput] = useState(userGroup);
  //---------- Init user input data---------//

  //----Submit data-------------------------//
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  // Update user group---------//
  const submitHandler = () => {
    console.log('userInput:::' + userInput);
    var data = {
      branchLevel:
        userInput.branchLevel == ''
          ? userGroup.branchLevel
          : userInput.branchLevel,
      channels:
        userInput.channels == '' ? userGroup.channels : userInput.channels,
      description:
        userInput.description == ''
          ? userGroup.description
          : userInput.description,
      groupType:
        userInput.groupType == '' ? userGroup.groupType : userInput.groupType,
      role: userInput.role == '' ? userGroup.role : userInput.role,
      status: userInput.status == '' ? userGroup.status : userInput.status,
      userGroupCode: userGroup.userGroupCode,
      userGroupName:
        userInput.userGroupName == ''
          ? userGroup.userGroupName
          : userInput.userGroupName,
      userType:
        userInput.userType == '' ? userGroup.userType : userInput.userType,
    };

    console.log('Received values of form: ', data);

    var configPromise = am0105ADomain.editUserGroup(id, data);
    configPromise
      .then((result) => {
        axios(result)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
            setDialogVisible(true);
          })
          .catch(function (error) {
            console.log(error.data);
          });
      })
      .catch((err) => console.log(err));
  };

  //----Submit data-------------------------//
  const userGroupNameChange = (event) => {
    setInput({
      ...userInput,
      userGroupName: event.target.value,
    });
  };
  //------------------------------//
  const roleChange = (event) => {
    setInput({
      ...userInput,
      role: event.target.value,
    });
  };

  const channelChange = (value) => {
    setInput({
      ...userInput,
      channels: value,
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
      description: event.target.value.trim(),
    });
    console.log(event);
  };
  //----------------------------Controller state changing handler----------------//

  return (
    <>
      <UpdateSuccessModal
        isVisbled={successModalVisible}
        onCloseModal={closeSuccessModal}
      />

      <div className={'main-container'}>
        <Row className={'padding-title'}>
          <Col span={24}>
            <KTTitle size={3} className={'font-weight-title'}>
              Quản lý nhóm người dùng Doanh nghiệp
            </KTTitle>
          </Col>
        </Row>
        <Row className={'padding-title-sub'}>
          <Col span={24}>
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
              initialValues={{
                user_group_code: userGroup
                  ? userGroup.userGroupCode
                  : 'This does not work',
                user_group_name: userGroup
                  ? userGroup.userGroupName
                  : 'This does not work',
                user_type: userGroup
                  ? userGroup.userType
                  : 'This does not work',
                group_type: userGroup
                  ? userGroup.groupType
                  : 'This does not work',
                branch_level: userGroup
                  ? userGroup.branchLevel
                  : 'This does not work',
                role: userGroup ? userGroup.role : 'This does not work',
                status: userGroup ? userGroup.status : 'This does not work',
                description: userGroup
                  ? userGroup.description
                  : 'This does not work',
              }}
            >
              <Row>
                <Col span={2}></Col>
                <Col span={20}>
                  <Row>
                    {' '}
                    <Col span={8}>
                      Mã nhóm người dùng{' '}
                      <span className={'text-require'}>*</span>
                    </Col>
                    <Col span={16}>
                      <Form.Item name={'user_group_code'}>
                        <Input value={userInput.userGroupCode} disabled />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row>
                    <Col span={8}>
                      Tên nhóm người dùng{' '}
                      <span className={'text-require'}>*</span>
                    </Col>
                    <Col span={16}>
                      <Form.Item name={'user_group_name'}>
                        <Input
                          disabled
                          value={userInput.userGroupName}
                          onChange={userGroupNameChange}
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row>
                    <Col span={8}>Mô tả </Col>
                    <Col span={16}>
                      <Form.Item
                        name={'description'}
                        rules={[
                          {
                            whitespace: true,
                            required: true,
                            message: 'Trường mô tả không được phép để trống!',
                          },
                          {
                            max: 300,
                            message: 'Trường mô tả tối đa 300 ký tự!',
                          },
                        ]}
                      >
                        <Input
                          value={userInput.description}
                          onChange={desciptionChange}
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row>
                    <Col span={8}>
                      Kênh <span className={'text-require'}>*</span>
                    </Col>
                    <Col span={16}>
                      <Form.Item name={'channels'}>
                        <Select onChange={channelChange}>
                          {channelOptions.map((channel) => (
                            <Select.Option value={channel.value}>
                              {channel.label}
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
                        <Radio.Group onChange={roleChange}>
                          {rolelOptions.map((role) => (
                            <Radio value={role.value}>{role.label}</Radio>
                          ))}
                        </Radio.Group>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={8}>
                      Trạng thái <span className={'text-require'}>*</span>
                    </Col>
                    <Col span={16}>
                      <Form.Item name={'status'}>
                        <Select
                          value={userInput.status}
                          onChange={statusChange}
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
                        <Button className="common-btn" htmlType="submit">
                          Xác nhận
                        </Button>

                        <Button
                          onClick={(e) => {
                            am0105ADomain.exitHandler(id);
                          }}
                          className="secondary-btn"
                        >
                          Đóng
                        </Button>
                      </Space>
                    </Form.Item>
                  </div>
                </Col>
                <Col span={2}></Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default AM0105A_CorporateGroup_Edit;
