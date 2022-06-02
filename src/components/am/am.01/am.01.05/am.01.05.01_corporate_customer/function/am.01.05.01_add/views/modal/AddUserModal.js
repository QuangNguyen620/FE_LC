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

import '../../../../common/less/AM.01.05.01.less';
import '../../../../../../../../../assets/less/LC-common.less';

import { useA00Domain } from '../../domains/AM.01.05.01Domain';
var axios = require('axios');

const listRoles = ['Maker', 'Approver', 'Maker+Approver'];

const AddUserModal = ({ lang = 'vi', ...props }) => {
  const { t } = useTranslation();
  const [, domain] = useA00Domain();
  const dateFormatList = 'DD/MM/YYYY';
  const exceptThisSymbols = ['e', 'E', '+', '-', '.'];

  function onModalClose() {
    let data = { name: 'example', type: 'closed from child' };
    props.onCloseModal(data);
  }

  const [listGroupCode, setListGroupCode] = useState([]);

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
    // setUserInput({
    //   ...userInput,
    //   dateOfIdentity: convert(e._d),
    // });
  };

  const submitHandler = () => {
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
            onClick={submitHandler}
            htmlType="submit"
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
        <Form onFinish={submitHandler}>
          <Row className={'padding-row-submit'}>
            <Col span={24}>
              <Row>
                <Col span={8}>
                  Tên hiển thị <span className={'text-require'}>*</span>
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
                  Chức vụ <span className={'text-require'}>*</span>
                </Col>
                <Col span={16}>
                  <Form.Item
                    name={'position'}
                    rules={[
                      {
                        required: true,
                        message: 'Trường vai trò không được để trống',
                      },
                      {
                        whitespace: true,
                        message: 'Trường vai trò không được để trống',
                      },
                    ]}
                  >
                    <Input name="position" onChange={onChangeUserAccount} />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={8}>
                  Giấy tờ định danh
                  <span className={'text-require'}>*</span>
                </Col>
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
                <Col span={8}>
                  Số giấy tờ định danh <span className={'text-require'}>*</span>
                </Col>
                <Col span={16}>
                  <Form.Item
                    name={'identityNumber'}
                    rules={[
                      {
                        required: true,
                        message:
                          'Trường số giấy tờ định danh không được để trống',
                      },
                      {
                        whitespace: true,
                        message:
                          'Trường số giấy tờ định danh không được để trống',
                      },
                    ]}
                  >
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
                <Col span={8}>
                  Ngày cấp<span className={'text-require'}>*</span>
                </Col>
                <Col span={16}>
                  <Form.Item
                    name={'dateOfIdentity'}
                    rules={[
                      {
                        required: true,
                        message: 'Trường ngày cấp không được phép để trống!',
                      },
                    ]}
                  >
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
                  Nơi cấp <span className={'text-require'}>*</span>
                </Col>
                <Col span={16}>
                  <Form.Item
                    name={'issuedByIdentity'}
                    rules={[
                      {
                        required: true,
                        message: 'Trường vai trò không được để trống',
                      },
                      {
                        whitespace: true,
                        message: 'Trường vai trò không được để trống',
                      },
                    ]}
                  >
                    <Input
                      name="issuedByIdentity"
                      onChange={onChangeUserAccount}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={8}>
                  Số điện thoại <span className={'text-require'}></span>
                </Col>
                <Col span={16}>
                  <Form.Item
                    name={'phoneNumber'}
                    rules={[
                      {
                        max: 10,
                        message:
                          'Trường số điện thoại không được phép vượt quá 10 ký tự!',
                      },
                    ]}
                  >
                    <Input
                      type={'number'}
                      onKeyDown={(e) =>
                        exceptThisSymbols.includes(e.key) && e.preventDefault()
                      }
                      name="phoneNumber"
                      onChange={onChangeUserAccount}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={8}>
                  Hòm thư điện tử <span className={'text-require'}></span>
                </Col>
                <Col span={16}>
                  <Form.Item
                    name={'email'}
                    rules={[
                      {
                        max: 50,
                        message: 'Trường hòm thư điện tử tối đa 50 ký tự!',
                      },
                      {
                        pattern:
                          /^([a-z A-Z 0-9\.]*@[a-z A-Z 0-9]*\.[a-z A-Z\.]*)/y,
                        message: 'Hòm thư điện tử không chính xác!',
                      },
                    ]}
                  >
                    <Input name="email" onChange={onChangeUserAccount} />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={8}>
                  Vai trò <span className={'text-require'}></span>
                </Col>
                <Col span={16}>
                  <Form.Item name={'role'}>
                    <Select name={'role'} onChange={onChangeUserRole}>
                      {listRoles.map((role) => (
                        <Select.Option value={role}>{role}</Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={8}>
                  Mã nhóm người dùng <span className={'text-require'}></span>
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
