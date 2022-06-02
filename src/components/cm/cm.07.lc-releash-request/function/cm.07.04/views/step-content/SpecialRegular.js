import React, { useState } from 'react';
import { Col, Row, Input, Form, Select, Space, Radio } from 'antd';
import { KTTitle } from 'core/ui';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import '../../../../component/less/CM.07.less';
import { CM0704Domain } from '../../domains/CM0704Domain';

const SpecialRegularContent = ({ lang = 'vi', ...props }) => {
  const { t } = useTranslation();
  const { TextArea } = Input;
  const dateFormatList = 'DD/MM/YYYY';

  const [context, domain] = CM0704Domain();

  const onHoldAccountChange = (e) => {
    domain.onHoldAccountChange(e);
  };

  const onFeeAccountChange = (e) => {
    domain.onFeeAccountChange(e);
  };

  const onPaymentAccountChange = (e) => {
    domain.onPaymentAccountChange(e);
  };

  const onCommitmentCustomerChange = (e) => {
    domain.onCommitmentCustomerChange(e);
  };

  return (
    <>
      <div style={{ background: 'white', borderRadius: '5px' }}>
        <Row style={{ padding: 16 }}>
          <Col span={24}>
            <Row>
              <Col span={23}>
                <Row style={{ paddingBottom: 15 }}>
                  <Col span={24}>
                    <KTTitle size={3}>
                      <b>Chỉ dẫn tài khoản thanh toán</b>
                    </KTTitle>
                  </Col>
                </Row>

                <Row>
                  <Col span={8}>
                    Tài khoản ký quỹ<span style={{ color: '#F5222D' }}></span>
                  </Col>
                  <Col span={16}>
                    <Form.Item name={'holdAccount'}>
                      <Select
                        onChange={(e) => onHoldAccountChange(e)}
                        name={'holdAccount'}
                        placeholder="Chọn"
                      >
                        {context?.constantValue?.listCorporateHoldAccount.map(
                          (account) => (
                            <Select.Option value={account.corporateAccountId}>
                              {account.corporateAccountNumber}
                            </Select.Option>
                          ),
                        )}
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    Tài khoản thu phí<span style={{ color: '#F5222D' }}></span>
                  </Col>
                  <Col span={16}>
                    <Form.Item name={'feeAccount'}>
                      <Select
                        name={'feeAccount'}
                        placeholder="Chọn"
                        onChange={(e) => onFeeAccountChange(e)}
                      >
                        {context?.constantValue?.listCorporateFeeAccount.map(
                          (account) => (
                            <Select.Option value={account.corporateAccountId}>
                              {account.corporateAccountNumber}
                            </Select.Option>
                          ),
                        )}
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    Tài khoản thanh toán
                    <span style={{ color: '#F5222D' }}></span>
                  </Col>
                  <Col span={16}>
                    <Form.Item name={'paymentAccount'}>
                      <Select
                        name={'paymentAccount'}
                        placeholder="Chọn"
                        onChange={(e) => onPaymentAccountChange(e)}
                      >
                        {context?.constantValue?.listCorporatePurchaseAccount.map(
                          (account) => (
                            <Select.Option value={account.corporateAccountId}>
                              {account.corporateAccountNumber}
                            </Select.Option>
                          ),
                        )}
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>

                <div>
                  <Row style={{ paddingBottom: 15 }}>
                    <Col span={24}>
                      <KTTitle size={3}>
                        <b>Cam kết của khách hàng</b>
                      </KTTitle>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <Form.Item name={'commitmentCustomer'}>
                        <TextArea
                          placeholder="Nhập thông tin"
                          name={'commitmentCustomer'}
                          rows={4}
                          onChange={(e) => onCommitmentCustomerChange(e)}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </div>
              </Col>
              <Col span={1}></Col>
            </Row>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default SpecialRegularContent;
