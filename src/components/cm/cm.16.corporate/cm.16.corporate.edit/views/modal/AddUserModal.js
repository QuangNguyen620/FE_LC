import React, { useState, useEffect } from 'react';
import {
  Col,
  Row,
  Input,
  Button,
  Form,
  Select,
  Modal,
  Radio,
  Space,
  DatePicker,
} from 'antd';
import moment from 'moment';
import { KTTitle } from 'core/ui';
import { useTranslation } from 'react-i18next';
import {} from '@ant-design/icons';
import '../CreateCorporate.less';
import '../../../../../../assets/less/LC-common.less';
import { UpdateCorporateDomain } from '../../domains/EditUploadCorporateDomain';

var axios = require('axios');
const listRoles = [
  { label: 'Maker', value: 'Maker' },
  { label: 'Approver', value: 'Approver' },
  { label: 'Maker+Approver', value: 'Maker+Approver' },
];

const exceptThisSymbols = ['e', 'E', '+', '-', '.'];

const listPositions = [
  { label: 'Người đại diện pháp luật', value: 'legal_representative' },
  { label: 'Kế toán trưởng', value: 'accountant' },
  { label: 'Nhân viên', value: 'employee' },
  { label: 'Trưởng phòng', value: 'head_of_department' },
];

const AddUserModal = ({ lang = 'vi', ...props }) => {
  const { t } = useTranslation();
  const [, domain] = UpdateCorporateDomain();
  const dateFormatList = 'DD/MM/YYYY';

  const [listGroupCode, setListGroupCode] = useState([]);

  const [form] = Form.useForm();

  function onModalClose() {
    let data = { name: 'example', type: 'closed from child' };
    props.onCloseModal(data);
  }

  function onChangeUserAccount(e) {
    props.onChangeUserAccount(e);
  }
  function onChangeUserRole(e) {
    props.onChangeUserRole(e);
  }

  function onChangeUserGroup(e) {
    props.onChangeUserGroup(e);
  }

  function onChangeIdentityType(e) {
    props.onChangeIdentityType(e);
  }

  const onDateOfIdentityChange = (e) => {
    props.onChangeDateOfIdentity(e);
  };

  function onChangeUserPosition(e) {
    props.onChangeUserPosition(e);
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const submitHandler = (e) => {
    // var data = props.bankAccount;
    let data = { name: 'example', type: 'submit from child' };
    props.submitHandler(data);
    props.onCloseModal(data);
    // console.log('Received values of form: ', data);
  };

  useEffect(() => {
    const getUserGroupCode = (role) => {
      var config = domain.getAllUserGroup();

      config
        .then((result) => {
          axios(result)
            .then(function (response) {
              console.log('Tham số đầu vào là vai trò của người dùng::::');
              console.log(role);
              console.log(response.data.data);
              var tempArr = [];

              response.data.data.forEach((element) => {
                if (element.userType === 'CORPORATE') {
                  if (role != 'Maker+Approver') {
                    if (element.role == role) {
                      tempArr.push(element);
                    }
                  } else {
                    tempArr.push(element);
                  }
                }
              });
              console.log('Nhóm người dùng tương ứng::::');
              console.log(tempArr);
              setListGroupCode(tempArr);
            })
            .catch(function (error) {
              console.log(error.data);
            });
        })
        .catch((err) => console.log(err));
    };

    getUserGroupCode(props.userInfo.role);
  }, [props.userInfo.role]);

  return (
    <>
      <Modal
        centered
        visible={props.isVisbled}
        onCancel={props.onClose}
        footer={[
          <Button
            className="common-btn"
            htmlType="submit"
            form="myForm"
            key="submit"
          >
            Xác nhận
          </Button>,
          <Button onClick={onModalClose} className="secondary-btn">
            Đóng
          </Button>,
        ]}
        size={3}
      >
        <KTTitle size={3}>
          <b>Thêm mới thông tin người dùng</b>
        </KTTitle>
        <Form onFinish={submitHandler} id="myForm">
          <Row className={'padding-row-submit'}>
            <Col span={24}>
              <Row>
                <Col span={8}>
                  Tên hiển thị <span style={{ color: '#F5222D' }}>*</span>
                </Col>
                <Col span={16}>
                  <Form.Item
                    name={'userName'}
                    rules={[
                      {
                        required: true,
                        message: 'Trường tên hiển thị không được để trống',
                      },
                      {
                        whitespace: true,
                        message: 'Trường tên hiển thị không được để trống',
                      },
                      {
                        max: 50,
                        message:
                          'Trường tên hiển thị không được phép vượt quá 50 ký tự!',
                      },
                    ]}
                  >
                    <Input name="userName" onChange={onChangeUserAccount} />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={8}>
                  Chức vụ <span style={{ color: '#F5222D' }}>*</span>
                </Col>
                <Col span={16}>
                  <Form.Item name={'position'}>
                    <Select name={'position'} onChange={onChangeUserPosition}>
                      {listPositions.map((position) => (
                        <Select.Option value={position.value}>
                          {position.label}
                        </Select.Option>
                      ))}
                    </Select>
                    {/* <Input name="position" onChange={onChangeUserAccount} /> */}
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={8}>Giấy tờ định danh</Col>
                <Col span={16}>
                  <Form.Item name={'identityType'}>
                    <Radio.Group
                      defaultValue={'CCCD/CMND'}
                      onChange={onChangeIdentityType}
                    >
                      <Space direction="vertical">
                        <Radio value={'CCCD/CMND'}>CMND/CCCD</Radio>
                        <Radio value={'Hộ chiếu'}>Hộ chiếu</Radio>
                      </Space>
                    </Radio.Group>
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={8}>Số giấy tờ định danh </Col>
                <Col span={16}>
                  <Form.Item name={'identityNumber'}>
                    <Input
                      type={'number'}
                      onKeyDown={(e) =>
                        exceptThisSymbols.includes(e.key) && e.preventDefault()
                      }
                      name="identityNumber"
                      onChange={onChangeUserAccount}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col span={8}>Ngày cấp</Col>
                <Col span={16}>
                  <Form.Item name={'dateOfIdentity'}>
                    <DatePicker
                      className={'width-date-picker'}
                      defaultValue={moment('01/01/2015', dateFormatList)}
                      format={dateFormatList}
                      onChange={onDateOfIdentityChange}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={8}>
                  Nơi cấp <span style={{ color: '#F5222D' }}></span>
                </Col>
                <Col span={16}>
                  <Form.Item name={'issuedByIdentity'}>
                    <Input
                      name="issuedByIdentity"
                      onChange={onChangeUserAccount}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={8}>
                  Số điện thoại <span style={{ color: '#F5222D' }}>*</span>
                </Col>
                <Col span={16}>
                  <Form.Item
                    name={'phoneNumber'}
                    rules={[
                      {
                        required: true,
                        message: 'Trường Số điện thoại không được để trống',
                      },
                      {
                        whitespace: true,
                        message: 'Trường Số điện thoại không được để trống',
                      },
                      {
                        max: 10,
                        message:
                          'Trường Số điện thoại không được phép vượt quá 10 ký tự!',
                      },
                    ]}
                  >
                    <Input name="phoneNumber" onChange={onChangeUserAccount} />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={8}>
                  Hòm thư điện tử <span style={{ color: '#F5222D' }}>*</span>
                </Col>
                <Col span={16}>
                  <Form.Item
                    name={'email'}
                    rules={[
                      {
                        required: true,
                        message: 'Trường hòm thư điện tử không được để trống',
                      },
                      {
                        whitespace: true,
                        message: 'Trường hòm thư điện tử không được để trống',
                      },
                      {
                        max: 50,
                        message:
                          'Trường hòm thư điện tử không được phép vượt quá 50 ký tự!',
                      },
                    ]}
                  >
                    <Input
                      name="email"
                      onChange={onChangeUserAccount}
                      type="email"
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={8}>
                  Vai trò <span style={{ color: '#F5222D' }}>*</span>
                </Col>
                <Col span={16}>
                  <Form.Item name={'role'}>
                    <Select name={'role'} onChange={onChangeUserRole}>
                      {listRoles.map((role) => (
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
                  Tên nhóm người dùng{' '}
                  <span style={{ color: '#F5222D' }}>*</span>
                </Col>
                <Col span={16}>
                  <Form.Item name={'userGroupCode'}>
                    <Select name={'userGroupCode'} onChange={onChangeUserGroup}>
                      {listGroupCode.map((userGroup) => (
                        <Select.Option value={userGroup.userGroupCode}>
                          {userGroup.userGroupName}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default AddUserModal;
