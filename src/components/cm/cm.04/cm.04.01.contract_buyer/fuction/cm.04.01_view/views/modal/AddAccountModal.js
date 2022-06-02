import React, { useState } from 'react';
import { Col, Row, Input, Button, Form, Select, Modal } from 'antd';
import { KTTitle } from 'core/ui';
import { useTranslation } from 'react-i18next';
import {} from '@ant-design/icons';

import '../AM.01.05.01CorporateCustomer_Add.less';
import '../../../../../../../assets/less/LC-common.less';
const { Option } = Select;

const bankOptions = [{ label: 'Ngân hàng Công Thương - VCB', value: 1 }];

const AddAccountModal = ({ lang = 'vi', ...props }) => {
  const { t } = useTranslation();

  // const dateFormatList = 'DD/MM/YYYY';
  const exceptThisSymbols = ['e', 'E', '+', '-', '.'];

  const [form] = Form.useForm();

  function onModalClose() {
    let data = { name: 'example', type: 'closed from child' };
    props.onCloseModal(data);
  }

  function onChangeBankAccount(e) {
    props.onChangeBankAccount(e);
  }
  function onChangeBankAccountBankId(e) {
    props.onChangeBankAccountBankId(e);
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
          <b>Thêm mới tài khoản</b>
        </KTTitle>
        <Form onFinish={submitHandler}>
          <Row className={'padding-row-submit'}>
            <Col span={24}>
              <Row>
                <Col span={8}>
                  Số tài khoản <span className={'text-require'}></span>
                </Col>
                <Col span={16}>
                  <Form.Item name={'corporateAccountNumber'}>
                    <Input
                      type={'number'}
                      onKeyDown={(e) =>
                        exceptThisSymbols.includes(e.key) && e.preventDefault()
                      }
                      name="corporateAccountNumber"
                      onChange={onChangeBankAccount}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={8}>
                  Tên tài khoản <span className={'text-require'}></span>
                </Col>
                <Col span={16}>
                  <Form.Item name={'corporateAccountName'}>
                    <Input
                      name="corporateAccountName"
                      onChange={onChangeBankAccount}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={8}>
                  Loại tài khoản <span className={'text-require'}></span>
                </Col>
                <Col span={16}>
                  <Form.Item name={'corporateAccountType'}>
                    <Input
                      name="corporateAccountType"
                      onChange={onChangeBankAccount}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={8}>
                  Tên ngân hàng <span className={'text-require'}></span>
                </Col>
                <Col span={16}>
                  <Form.Item name={'bankId'}>
                    <Select
                      onChange={onChangeBankAccountBankId}
                      options={bankOptions}
                    />
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

export default AddAccountModal;
