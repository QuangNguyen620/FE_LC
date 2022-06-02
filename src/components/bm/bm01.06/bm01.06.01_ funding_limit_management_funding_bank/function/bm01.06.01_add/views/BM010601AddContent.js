import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { LeftOutlined, CheckCircleFilled } from '@ant-design/icons';
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
  Spin,
  Card,
  Divider,
  DatePicker,
} from 'antd';
import { KTTitle } from 'core/ui';
import '../../../common/less/BM010301.less';
import '../../../../../../../assets/less/LC-common.less';
import { BM010601Domain } from '../domains/BM010601AddDomain';

import log from '../ModuleLogger';

const BM010301AddView = ({ lang = 'vi', ...props }) => {
  const dateFormatList = 'DD/MM/YYYY';
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [context, domain] = BM010601Domain();
  const { TextArea } = Input;
  useEffect(() => {
    domain.initDomain();
  }, []);

  useEffect(() => {
    log.debug('useEffect--', context);
  }, [context]);

  const onSubmit = () => {
    form
      .validateFields()
      .then(() => {
        // Here make api call of something else
        domain.submitHandler();
      })
      .catch((err) => console.log(err));

    // setCurrent(current + 1);
  };

  return (
    <>
      <div className={'main-container'}>
        <Spin spinning={context?.loading}>
          <Row>
            <Col align="left" className="card-container" span={24}>
              <Card
                bordered={false}
                title={<KTTitle size={2}>Thông tin hạn mức</KTTitle>}
              >
                <Form
                  form={form}
                  // onFinish={domain.submitHandler}
                  layout="horizontal"
                >
                  <div className="steps-content">
                    <Row>
                      <Col span={5}>
                        Ngân hàng phát hành{' '}
                        <span className={'text-require'}>*</span>
                      </Col>
                      <Col span={8}>
                        <Form.Item
                          name={'bankId'}
                          rules={[
                            {
                              required: true,
                              message:
                                'Trường ngân hàng phát hành không được để trống',
                            },
                          ]}
                        >
                          <Select
                            onChange={(e) => {
                              domain.onBankIdChange(e);
                            }}
                          >
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
                      <Col span={5}>
                        Loại hạn mức <span className={'text-require'}>*</span>
                      </Col>
                      <Col span={8}>
                        <Form.Item
                          name={'typeLimit'}
                          rules={[
                            {
                              required: true,
                              message:
                                'Trường loại hạn mức không được để trống',
                            },
                          ]}
                        >
                          <Input
                            onChange={(e) => {
                              domain.onTypeLimitChange(e);
                            }}
                            name="typeLimit"
                            placeholder="Nhập thông tin"
                            type={'text'}
                          />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row>
                      <Col span={5}>
                        Số hợp đồng hạn mức{' '}
                        <span className={'text-require'}>*</span>
                      </Col>
                      <Col span={8}>
                        <Form.Item
                          name={'contractNumberLimit'}
                          rules={[
                            {
                              required: true,
                              message:
                                'Trường số hợp đồng hạn mức không được để trống',
                            },
                            {
                              max: 50,
                              message:
                                'Trường số hợp đồng hạn mức không được quá 50 ký tự',
                            },
                          ]}
                        >
                          <Input
                            onChange={(e) => {
                              domain.onContractNumberLimitChange(e);
                            }}
                            name="contractNumberLimit"
                            placeholder="Nhập thông tin"
                            type={'text'}
                          />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row>
                      <Col span={5}>
                        Ngày cấp hạn mức{' '}
                        <span className={'text-require'}>*</span>
                      </Col>
                      <Col span={8}>
                        <Form.Item
                          name={'dateRange'}
                          rules={[
                            {
                              required: true,
                              message:
                                'Trường ngày cấp hạn mức không được để trống',
                            },
                          ]}
                        >
                          <DatePicker
                            onChange={(e) => {
                              domain.onDateRangeChange(e);
                            }}
                            name="dateRange"
                            format={dateFormatList}
                            placeholder="dd/mm/yyyy"
                            allowClear={true}
                            style={{ width: '100%' }}
                            // disabledDate={(current) =>
                            //   current.isBefore(moment().subtract(1, 'day'))
                            // }
                          />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row>
                      <Col span={5}>
                        Ngày hết hạn <span className={'text-require'}>*</span>
                      </Col>
                      <Col span={8}>
                        <Form.Item
                          name={'expirationDate'}
                          rules={[
                            {
                              required: true,
                              message:
                                'Trường ngày hết hạn không được để trống',
                            },
                          ]}
                        >
                          <DatePicker
                            onChange={(e) => {
                              domain.onExpirationDateChange(e);
                            }}
                            name="expirationDate"
                            format={dateFormatList}
                            placeholder="dd/mm/yyyy"
                            allowClear={true}
                            style={{ width: '100%' }}
                            // disabledDate={(current) =>
                            //   current.isBefore(moment().subtract(1, 'day'))
                            // }
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={5}>
                        Tổng hạn mức <span className={'text-require'}>*</span>
                      </Col>
                      <Col span={8}>
                        <Form.Item
                          name={'totalLimit'}
                          rules={[
                            {
                              required: true,
                              message:
                                'Trường tổng hạn mức không được để trống',
                            },
                            {
                              max: 20,
                              message:
                                'Trường tổng hạn mức không được quá 20 ký tự',
                            },
                          ]}
                        >
                          <Input
                            onChange={(e) => {
                              domain.onTotalLimitChange(e);
                            }}
                            name="totalLimit"
                            placeholder="Nhập số tiền"
                            type={'number'}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={5}>
                        Loại tiền <span className={'text-require'}>*</span>
                      </Col>
                      <Col span={8}>
                        <Form.Item
                          name={'moneyType'}
                          rules={[
                            {
                              required: true,
                              message: 'Trường loại tiền không được để trống',
                            },
                          ]}
                        >
                          <Select
                            placeholder={'Chọn loại tiền'}
                            onChange={(e) => {
                              domain.onMoneyTypeChange(e);
                            }}
                          >
                            {' '}
                            {context?.constantValue?.currencyList.map(
                              (currency) => (
                                <Select.Option value={currency.currencyCode}>
                                  {currency.currencyName}
                                </Select.Option>
                              ),
                            )}
                          </Select>
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={5}>
                        Miêu tả các giao dịch thuộc hạn mức{' '}
                        <span className={'text-require'}></span>
                      </Col>
                      <Col span={8}>
                        <Form.Item
                          name={'descriptionOfTransactions'}
                          rules={[
                            {
                              max: 1000,
                              message:
                                'Trường miêu tả các giao dịch thuộc hạn mức không được quá 1000 ký tự',
                            },
                          ]}
                        >
                          <TextArea
                            onChange={(e) => {
                              domain.onDescriptionOfTransactionsChange(e);
                            }}
                            placeholder="Nhập thông tin"
                            name={'descriptionOfTransactions'}
                            rows={4}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={5}>''</Col>
                      <Col span={8}>
                        <Form.Item name={'requestARefund'}>
                          <Checkbox
                            onChange={(e) => {
                              domain.onRequestARefundsChange(e);
                            }}
                          >
                            Cần gửi yêu cầu hoàn trả
                          </Checkbox>
                        </Form.Item>
                      </Col>
                    </Row>
                  </div>
                  <Divider></Divider>
                  <div className="steps-action">
                    <Row className={'padding-md'}>
                      <Col span={12}>
                        <Button onClick={(e) => domain.exitHandler()}>
                          <span>
                            <LeftOutlined />
                          </span>
                          Quay lại{' '}
                        </Button>
                      </Col>
                      <Col span={12}>
                        <Button
                          className="common-btn right-step-action"
                          onClick={(e) => {
                            onSubmit();
                          }}
                        >
                          Xác nhận tạo hạn mức mới{' '}
                          <span style={{ marginLeft: '5px' }}>
                            <CheckCircleFilled />
                          </span>
                        </Button>
                      </Col>
                    </Row>
                  </div>
                </Form>
              </Card>
            </Col>
          </Row>
        </Spin>
      </div>
    </>
  );
};

export default BM010301AddView;
