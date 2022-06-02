import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import {
  Col,
  Row,
  Button,
  Form,
  Card,
  Divider,
  Select,
  Input,
  DatePicker,
  Checkbox,
} from 'antd';
import { LeftOutlined, CheckCircleFilled } from '@ant-design/icons';
import { KTTitle } from 'core/ui';

import { BM010601Domain } from '../../domains/BM010601EditDomain';

const BM010601ViewContent = ({ lang = 'vi', ...props }) => {
  const dateFormatList = 'DD/MM/YYYY';
  const { t } = useTranslation();
  const { id } = useParams();
  const [context, domain] = BM010601Domain();
  const { TextArea } = Input;
  useEffect(() => {
    console.log('context?.fundingLimit?.status');
    console.log(context?.fundingLimit?.status);
  }, [context]);

  function callback(key) {
    console.log(key);
  }

  const onSubmit = () => {
    props.form
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
      <Row>
        <Col align="left" className="card-container" span={24}>
          <Card
            bordered={false}
            title={<KTTitle size={2}>Thông tin hạn mức</KTTitle>}
          >
            <div className="steps-content">
              <Row style={{ padding: 16 }}>
                <Col span={24}>
                  <Row>
                    <Col span={5}>
                      Mã hạn mức tài trợ{' '}
                      <span className={'text-require'}></span>
                    </Col>
                    <Col span={8}>
                      {' '}
                      <Form.Item>
                        {context?.fundingLimit?.financingLimitCode}
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={5}>
                      Ngân hàng phát hành{' '}
                      <span className={'text-require'}>*</span>
                    </Col>
                    <Col span={8}>
                      {' '}
                      <Form.Item>
                        {context?.fundingLimit?.releaseBankName}
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row>
                    <Col span={5}>
                      Loại hạn mức <span className={'text-require'}>*</span>
                    </Col>
                    <Col span={8}>
                      {' '}
                      <Form.Item>
                        {context?.fundingLimit?.typeLimit}
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={5}>
                      Thay đổi lần thứ <span className={'text-require'}>*</span>
                    </Col>
                    <Col span={8}>
                      {' '}
                      <Form.Item>
                        {context?.fundingLimit?.editTime}
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
                      Ngày cấp hạn mức <span className={'text-require'}>*</span>
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
                            message: 'Trường ngày hết hạn không được để trống',
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
                            message: 'Trường tổng hạn mức không được để trống',
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
                    <Col span={5}></Col>
                    <Col span={8}>
                      <Form.Item name={'requestARefund'}>
                        <Checkbox
                          defaultChecked={context?.fundingLimit?.requestARefund}
                          onChange={(e) => {
                            domain.onRequestARefundsChange(e);
                          }}
                        >
                          Cần gửi yêu cầu hoàn trả
                        </Checkbox>
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Card type="inner" title="Hạn mức khả dụng">
                <Row>
                  <Col span={5}>
                    Hạn mức khoanh<span className={'text-require'}></span>
                  </Col>
                  <Col span={8}>{context?.fundingLimit?.totalZoningLimit}</Col>
                </Row>
                <Divider></Divider>
                <Row>
                  <Col span={5}>
                    Hạn mức cam kêt<span className={'text-require'}></span>
                  </Col>
                  <Col span={8}>{context?.fundingLimit?.totalZoningLimit}</Col>
                </Row>
                <Divider></Divider>
                <Row>
                  <Col span={5}>
                    Tổng số tiền giải ngân
                    <span className={'text-require'}></span>
                  </Col>
                  <Col span={8}>
                    {context?.fundingLimit?.totalDisbursementAmount}
                  </Col>
                </Row>
                <Divider></Divider>
                <Row>
                  <Col span={5}>
                    Tổng số tiền trả nợ<span className={'text-require'}></span>
                  </Col>
                  <Col span={8}>
                    {context?.fundingLimit?.totalRepaymentAmount}
                  </Col>
                </Row>
                <Divider></Divider>
                <Row>
                  <Col span={5}>
                    Hạn mức khả dụng<span className={'text-require'}></span>
                  </Col>
                  <Col span={8}>{context?.fundingLimit?.availabilityLimit}</Col>
                </Row>
                <Divider></Divider>
              </Card>
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
                  <div>
                    <Button
                      onClick={(e) => onSubmit()}
                      className="right-step-action common-btn"
                    >
                      Xác nhận chỉnh sửa{' '}
                      <span style={{ marginLeft: '5px' }}>
                        <CheckCircleFilled />
                      </span>
                    </Button>
                  </div>
                </Col>
              </Row>
            </div>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default BM010601ViewContent;
