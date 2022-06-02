import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
import { KTTitle } from 'core/ui';
import '../../../common/less/AM.01.05A.less';
import { useA00Domain } from '../domains/AM.01.05ADomain';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import moment from 'moment';
var axios = require('axios');

const { Option } = Select;

const CheckboxGroup = Checkbox.Group;

const channelOptions = [{ label: 'CIN - Corporate Internet', value: 'CIN' }];
// const defaultCheckedList = ['AIN', 'BIN'];

const rolelOptions = [
  { label: 'Maker', value: 'Maker' },
  { label: 'Approver', value: 'Approver' },
];

toast.configure();

const AM0105ACorporateGroupAdd = ({ lang = 'vi', ...props }) => {
  const { t } = useTranslation();
  const [, am0105ADomain] = useA00Domain();
  const history = useHistory();
  const notify = (message) => toast.success(message);
  const [show, setShow] = useState(false);
  const [showModelFail, setShowModelFail] = useState(false);
  const [showModelAddFail, setShowModelAddFail] = useState(false);

  //Value state
  const [userInput, setInput] = useState({
    user_group_code: '',
    user_group_name: '',
    user_type: '',
    group_type: '',
    branch_level: '',
    role: 'Maker',
    status: '1',
    description: '',
    channel: 'CIN',
  });

  // const [checkedList, setCheckedList] = React.useState(defaultCheckedList);
  const [indeterminate, setIndeterminate] = React.useState(true);
  const [checkAll, setCheckAll] = React.useState(false);

  //set value  cho trường chọn
  // const [roleOptions, setRoleOption] = useState([]);

  //input value change
  const userGroupCodeChange = (event) => {
    var userGroupCode = event.target.value;
    if (userGroupCode.trim() != '' || userGroupCode.trim() != null) {
      setInput({
        ...userInput,
        user_group_code: userGroupCode.trim(),
      });
    }
  };

  const userGroupNameChange = (event) => {
    var userGroupName = event.target.value;
    if (userGroupName.trim() != '' || userGroupName.trim() != null) {
      setInput({
        ...userInput,
        user_group_name: userGroupName.trim(),
      });
    }
  };

  // setRoleOption(rolelOptions);
  const roleChange = (event) => {
    setInput({
      ...userInput,
      role: event.target.value,
    });
  };
  const channelChange = (value) => {
    setInput({
      ...userInput,
      channel: value,
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

  //-----Channel checkbox----------//
  // const onChange = (list) => {
  //   setCheckedList(list);
  //   setIndeterminate(!!list.length && list.length < plainOptions.length);
  //   setCheckAll(list.length === plainOptions.length);
  // };

  // const onCheckAllChange = (e) => {
  //   setCheckedList(e.target.checked ? plainOptions : []);
  //   setIndeterminate(false);
  //   setCheckAll(e.target.checked);
  // };
  //------------------------------//

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  // Add new user group--------------
  const submitHandler = () => {
    // var channelString = '';

    // checkedList.forEach((channel) => {
    //   channelString += channel + ',';
    // });

    var data = {
      userGroupCode: userInput.user_group_code.trim(),
      userGroupName: userInput.user_group_name.trim(),
      description: userInput.description.trim(),
      channels: userInput.channel,
      role: userInput.role,
      status: userInput.status,
      userType: 'CORPORATE',
      groupType: 'Nhóm doanh nghiệp',
    };

    console.log('Received values of form: ', data);

    var configPromise = am0105ADomain.addNewCorporateGroup(data);
    configPromise
      .then((result) => {
        axios(result)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
            setShow(true);
          })
          .catch(function (error) {
            console.log(error);
            if (error.response.data.code == 409) {
              setShowModelAddFail(true);
            } else {
              setShowModelFail(true);
            }
          });
      })
      .catch((err) => console.log(err));
  };
  //-------------------------------------//

  const handleOk = () => {
    history.push('/home/admin-corporate-group');
    setShow(false);
  };
  const handleFail = () => {
    history.push('/home/admin-corporate-group/add');
    setShowModelFail(false);
  };
  const handleAddFail = () => {
    history.push('/home/admin-corporate-group/add');
    setShowModelAddFail(false);
  };
  return (
    <>
      <Modal
        footer={[
          <Button className="common-btn" onClick={handleOk}>
            Đóng
          </Button>,
        ]}
        visible={show}
        onOk={handleOk}
        onCancel={handleOk}
      >
        <KTTitle className={'text-center'} size={3}>
          Thêm mới thành công
        </KTTitle>
      </Modal>

      <Modal
        footer={[
          <Button className="common-btn" onClick={handleFail}>
            Đóng
          </Button>,
        ]}
        visible={showModelFail}
        onOk={handleFail}
        onCancel={handleFail}
      >
        <KTTitle className={'text-center'} size={3}>
          Thêm mới thất bại
        </KTTitle>
      </Modal>

      <Modal
        footer={[
          <Button className="common-btn" onClick={handleAddFail}>
            Đóng
          </Button>,
        ]}
        visible={showModelAddFail}
        onOk={handleAddFail}
        onCancel={handleAddFail}
      >
        <KTTitle className={'text-center'} size={3}>
          Trường mã nhóm doanh nghiệp không được phép trùng lặp !
        </KTTitle>
      </Modal>

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
            <KTTitle size={4}>Thêm mới</KTTitle>
          </Col>
        </Row>

        <Row className="padding-md">
          <Col span={24}>
            <Form
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
                  <Form.Item
                    name={'user_group_code'}
                    rules={[
                      {
                        whitespace: true,
                        required: true,
                        message:
                          'Trường mã nhóm người dùng không được phép để trống!',
                      },
                      {
                        max: 50,
                        message: 'Trường mã nhóm người dùng tối đa 50 ký tự!',
                      },
                    ]}
                  >
                    <Input onChange={userGroupCodeChange} />
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col span={8}>
                  Tên nhóm người dùng <span className={'text-require'}>*</span>
                </Col>
                <Col span={16}>
                  <Form.Item
                    name={'user_group_name'}
                    rules={[
                      {
                        whitespace: true,
                        required: true,
                        message:
                          'Trường tên nhóm người dùng không được phép để trống!',
                      },
                      {
                        max: 50,
                        message: 'Trường tên nhóm người dùng tối đa 50 ký tự!',
                      },
                    ]}
                  >
                    <Input onChange={userGroupNameChange} />
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col span={8}>
                  Mô tả <span className={'text-require'}>*</span>
                </Col>
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
                    <Input onChange={desciptionChange} />
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col span={8}>
                  Kênh <span className={'text-require'}>*</span>
                </Col>
                <Col span={16}>
                  <Form.Item name={'channel'}>
                    <Select
                      onChange={channelChange}
                      defaultValue={channelOptions[0].value}
                    >
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
                    <Radio.Group
                      onChange={roleChange}
                      defaultValue={rolelOptions[0].value}
                    >
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
                    <Select onChange={statusChange} defaultValue="1">
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
                      onClick={am0105ADomain.exitHandler}
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

export default AM0105ACorporateGroupAdd;
