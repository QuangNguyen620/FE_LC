import React, { useState } from 'react';
import {
  Col,
  Row,
  Input,
  Button,
  Form,
  Select,
  Checkbox,
  Space,
  DatePicker,
  Tabs,
  Table,
  Modal,
} from 'antd';
import { KTTitle } from 'core/ui';
import { useTranslation } from 'react-i18next';
import {} from '@ant-design/icons';
import moment from 'moment';
// import { KTBodyText, KTButton, KTHeading, KTSubTitle, KTLogo } from 'core/ui';
// import ic_fis from 'assets/img/brand/logo_fis.png';
import '../AM.01.05.01CorporateCustomer_View.less';
import '../../../../../../../assets/less/LC-common.less';
const { Option } = Select;

const AddUserModal = ({ lang = 'vi', ...props }) => {
  const { t } = useTranslation();

  // const dateFormatList = 'DD/MM/YYYY';

  const [form] = Form.useForm();

  function onModalClose() {
    let data = { name: 'example', type: 'closed from child' };
    props.onCloseModal(data);
  }

  function onChangeUserAccount(e) {
    props.onChangeUserAccount(e);
  }
  const submitHandler = () => {
    // var data = props.bankAccount;
    let data = { name: 'example', type: 'submit from child' };
    props.submitHandler(data);
    props.onCloseModal(data);
    // console.log('Received values of form: ', data);
  };

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
                    ]}
                  >
                    <Input name="userName" onChange={onChangeUserAccount} />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={8}>
                  Số điện thoại <span className={'text-require'}></span>
                </Col>
                <Col span={16}>
                  <Form.Item name={'phoneNumber'}>
                    <Input name="phoneNumber" onChange={onChangeUserAccount} />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={8}>
                  Hòm thư điện tử <span className={'text-require'}></span>
                </Col>
                <Col span={16}>
                  <Form.Item name={'email'}>
                    <Input name="email" onChange={onChangeUserAccount} />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={8}>
                  Tên nhóm người dùng <span className={'text-require'}></span>
                </Col>
                <Col span={16}>
                  <Form.Item name={'userGroupCode'}>
                    <Select
                      name={'userGroupCode'}
                      onChange={onChangeUserAccount}
                    ></Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={8}>
                  Vai trò <span className={'text-require'}></span>
                </Col>
                <Col span={16}>
                  <Form.Item name={'bankId'}>
                    <Select
                      name={'role'}
                      onChange={onChangeUserAccount}
                    ></Select>
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
