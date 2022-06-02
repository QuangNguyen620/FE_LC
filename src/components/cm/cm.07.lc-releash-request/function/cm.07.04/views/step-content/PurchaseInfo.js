import React, { useState, useEffect } from 'react';
import {
  Col,
  Row,
  Input,
  Button,
  Form,
  Select,
  Space,
  DatePicker,
  Radio,
  Tag,
  InputNumber,
} from 'antd';
import { CloudUploadOutlined } from '@ant-design/icons';
import { CM0704Domain } from '../../domains/CM0704Domain';
import { KTTitle } from 'core/ui';
import moment from 'moment';
import '../../../../component/less/CM.07.less';
import { LC_STATUS, LC_TYPE } from 'core/common/Constant';
const { Option } = Select;

const listMoneyType = [
  { label: 'VND', value: 'VND' },
  { label: 'USD', value: 'USD' },
];

const PurchaseInfoContent = ({ lang = 'vi', ...props }) => {
  const dateFormatList = 'DD/MM/YYYY';
  const exceptThisSymbols = ['e', 'E', '+', '-', '.'];

  const [context, domain] = CM0704Domain();

  const onMoneyTypeChange = (e) => {
    domain.onMoneyTypeChange(e);
  };

  const onValueLcChange = (e) => {
    domain.onValueLcChange(e);
  };

  const onNegativeToleranceChange = (e) => {
    domain.onNegativeToleranceChange(e);
  };

  const onPositiveToleranceChange = (e) => {
    domain.onPositiveToleranceChange(e);
  };

  const onPresentationAtChange = (e) => {
    domain.onPresentationAtChange(e);
  };

  //on change 'Chọn NH sẽ xuất trình chứng từ'//
  const onBankPresentationAtChange = (e) => {
    domain.onBankPresentationAtChange(e);
  };
  //----------------------------------//

  const onTermOfPaymentChange = (e) => {
    domain.onTermOfPaymentChange(e);
  };

  const onNoteTermOfPaymentChange = (e) => {
    domain.onNoteTermOfPaymentChange(e);
  };

  const onPaymentAmountChange = (e) => {
    domain.onPaymentAmountChange(e);
  };

  const onDueDateChange = (e) => {
    domain.onDueDateChange(e);
  };

  const onDueAddressChange = (e) => {
    domain.onDueAddressChange(e);
  };

  const onFeeChange = (e) => {
    domain.onFeeChange(e);
  };

  return (
    <>
      {(context?.lcApplication?.status == LC_STATUS.TU_CHOI_DRAFT ||
        context?.lcApplication?.status == LC_STATUS.TU_CHOI_KY_SO) &&
        context?.initLCType == LC_TYPE.UPAS_LC && (
          <div style={{ background: 'white', borderRadius: '5px' }}>
            <Row gutter={24} style={{ padding: 16 }}>
              <Col span={24}>
                <div id="purchase-info">
                  <Row>
                    <Col span={23}>
                      <Row>
                        <Col span={8}>
                          Loại tiền và trị giá L/C
                          <span style={{ color: '#F5222D' }}>*</span>
                        </Col>
                        <Col span={16}>
                          <div>
                            <Row>
                              <Col span={10}>
                                {' '}
                                <Form.Item
                                  name={'valueLc'}
                                  rules={[
                                    {
                                      required: true,
                                      message:
                                        'Trường giá trị L/C không được phép để trống!',
                                    },
                                  ]}
                                >
                                  <InputNumber
                                    disabled
                                    formatter={(value) =>
                                      `${value}`.replace(
                                        /\B(?=(\d{3})+(?!\d))/g,
                                        ',',
                                      )
                                    }
                                    parser={(value) =>
                                      value.replace(/\$\s?|(,*)/g, '')
                                    }
                                    style={{ width: '100%' }}
                                    name={'valueLc'}
                                    min={0}
                                    onChange={(e) => onValueLcChange(e)}

                                    // type={'number'}
                                  />
                                </Form.Item>
                              </Col>
                              <Col span={1}></Col>
                              <Col span={4}>
                                <Form.Item
                                  name={'moneyType'}
                                  rules={[
                                    {
                                      required: true,
                                      message:
                                        'Loại tiền không được phép để trống!',
                                    },
                                  ]}
                                >
                                  <Select
                                    onChange={(e) => {
                                      onMoneyTypeChange(e);
                                    }}
                                    disabled
                                  >
                                    {context?.constantValue?.currencyList?.map(
                                      (money) => (
                                        <Select.Option
                                          value={money.currencyCode}
                                        >
                                          {money.currencyCode}
                                        </Select.Option>
                                      ),
                                    )}
                                  </Select>
                                </Form.Item>
                              </Col>
                            </Row>
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={8}>
                          Dung sai trên số tiền (%)
                          <span style={{ color: '#F5222D' }}>*</span>
                        </Col>
                        <Col span={16}>
                          <div>
                            <Row>
                              <Col span={5}>
                                <Form.Item
                                  name={'positiveTolerance'}
                                  rules={[
                                    {
                                      required: true,
                                      message:
                                        'Trường dung sai dương trên số tiền không được phép để trống!',
                                    },

                                    {
                                      validator: async (
                                        _,
                                        positiveTolerance,
                                      ) => {
                                        if (positiveTolerance < 0) {
                                          return Promise.reject(
                                            'Trường dung sai dương trên số tiền không được nhỏ hơn 0',
                                          );
                                        } else if (positiveTolerance > 99) {
                                          return Promise.reject(
                                            'Trường dung sai dương trên số tiền không được lớn hơn 99',
                                          );
                                        }
                                      },
                                    },
                                  ]}
                                >
                                  <Input
                                    disabled
                                    style={{ width: '100%' }}
                                    type={'number'}
                                    onKeyDown={(e) =>
                                      exceptThisSymbols.includes(e.key) &&
                                      e.preventDefault()
                                    }
                                    onChange={(e) =>
                                      onPositiveToleranceChange(e)
                                    }
                                    name={'positiveTolerance'}
                                    prefix="+"
                                    suffix="%"
                                    max={99}
                                    min={0}
                                    placeholder="0"
                                  />
                                </Form.Item>
                              </Col>
                              <Col span={5}>
                                <Form.Item
                                  name={'negativeTolerance'}
                                  rules={[
                                    {
                                      required: true,
                                      message:
                                        'Trường dung sai âm trên số tiền không được phép để trống!',
                                    },

                                    {
                                      validator: async (
                                        _,
                                        negativeTolerance,
                                      ) => {
                                        if (negativeTolerance < 0) {
                                          return Promise.reject(
                                            'Trường dung sai âm trên số tiền không được nhỏ hơn 0',
                                          );
                                        } else if (negativeTolerance > 99) {
                                          return Promise.reject(
                                            'Trường dung sai âm trên số tiền không được lớn hơn 99',
                                          );
                                        }
                                      },
                                    },
                                  ]}
                                >
                                  <Input
                                    disabled
                                    style={{ width: '100%' }}
                                    type={'number'}
                                    onKeyDown={(e) =>
                                      exceptThisSymbols.includes(e.key) &&
                                      e.preventDefault()
                                    }
                                    onChange={(e) =>
                                      onNegativeToleranceChange(e)
                                    }
                                    name={'negativeTolerance'}
                                    prefix="-"
                                    suffix="%"
                                    max={99}
                                    min={0}
                                    placeholder="0"
                                  />
                                </Form.Item>
                              </Col>
                            </Row>
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={8}>
                          Chứng từ xuất trình tại
                          <span style={{ color: '#F5222D' }}>*</span>
                        </Col>
                        <Col span={16}>
                          <Form.Item name={'presentationAt'}>
                            <Radio.Group
                              onChange={(e) => onPresentationAtChange(e)}
                              defaultValue={0}
                              disabled
                            >
                              <Space direction="horizontal">
                                <Radio value={0}>Ngân hàng bất kỳ</Radio>
                                <Radio value={1}>Ngân hàng xác nhận</Radio>
                                <Radio value={2}>Ngân hàng khác</Radio>
                              </Space>
                            </Radio.Group>
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={8}>
                          Chọn NH sẽ xuất trình chứng từ
                          <span style={{ color: '#F5222D' }}></span>
                        </Col>
                        <Col span={16}>
                          <Form.Item
                            name={'presentationAtBank'}
                            rules={[
                              {
                                required:
                                  context?.lcApplication?.presentationAt == 2
                                    ? true
                                    : false,
                                message:
                                  'Vui lòng chọn ngân hàng xuất trình chứng từ!',
                              },
                            ]}
                          >
                            <Select
                              disabled
                              placeholder="Chọn"
                              onChange={(e) => onBankPresentationAtChange(e)}
                            >
                              {' '}
                              {context?.constantValue?.releashBankList.map(
                                (bank) => (
                                  <Select.Option value={bank.bankId}>
                                    {bank.bankName}
                                  </Select.Option>
                                ),
                              )}
                            </Select>
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={8}>
                          Điều khoản thanh toán
                          <span style={{ color: '#F5222D' }}>*</span>
                        </Col>
                        <Col span={16}>
                          <Form.Item name={'termOfPayment'}>
                            <Radio.Group
                              onChange={(e) => onTermOfPaymentChange(e)}
                              defaultValue={1}
                            >
                              <Space direction="horizontal">
                                <Radio value={1}>Trả ngay</Radio>
                                <Radio value={2}>Trả chậm</Radio>
                                <Radio value={3}>Khác</Radio>
                              </Space>
                            </Radio.Group>
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={8}>
                          Chi tiết điều khoản Thanh toán trả chậm/Khác
                          <span style={{ color: '#F5222D' }}>*</span>
                        </Col>
                        <Col span={16}>
                          <Form.Item
                            name={'termOfPaymentDetail'}
                            rules={[
                              {
                                required:
                                  context?.lcApplication?.termOfPayment == 3 ||
                                  context?.lcApplication?.termOfPayment == 2
                                    ? true
                                    : false,
                                message:
                                  'Trường chi tiết điều khoản thanh toán không được phép để trống!',
                              },
                              {
                                max: 255,
                                message:
                                  'Trường chi tiết điều khoản thanh toán không được phép vượt quá 255 ký tự!',
                              },
                            ]}
                          >
                            <Input
                              disabled
                              onChange={(e) => onNoteTermOfPaymentChange(e)}
                              name={'termOfPaymentDetail'}
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={8}>
                          Số tiền thanh toán
                          <span style={{ color: '#F5222D' }}></span>
                        </Col>
                        <Col span={8}>
                          <Form.Item name={'paymentAmount'}>
                            <Input
                              disabled
                              onChange={(e) => onPaymentAmountChange(e)}
                              name={'paymentAmount'}
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={8}>
                          Ngày hết hạn
                          <span style={{ color: '#F5222D' }}>*</span>
                        </Col>
                        <Col span={8}>
                          <Form.Item
                            name={'dueDate'}
                            rules={[
                              {
                                validator: async (_, dueDate) => {
                                  var proposalDate =
                                    props.form.getFieldValue('proposalDate');
                                  if (proposalDate != null) {
                                    if (dueDate < proposalDate) {
                                      return Promise.reject(
                                        'Ngày hết hạn L/C không được trước ngày đề nghị phát hành L/C',
                                      );
                                    }
                                  }
                                },
                              },
                              {
                                required: true,
                                message:
                                  'Trường ngày hết hạn không được phép để trống!',
                              },
                            ]}
                          >
                            <DatePicker
                              disabled
                              name="dueDate"
                              style={{ width: '100%' }}
                              // defaultValue={moment('01/01/2015')}
                              format={dateFormatList}
                              placeholder="dd/mm/yyyy"
                              onChange={(e) => onDueDateChange(e)}
                              allowClear={true}
                              disabledDate={(current) =>
                                current.isBefore(
                                  moment(
                                    context?.lcApplication?.proposalDate,
                                  ).subtract(0, 'day'),
                                )
                              }
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={8}>
                          Nơi hết hạn
                          <span style={{ color: '#F5222D' }}>*</span>
                        </Col>
                        <Col span={16}>
                          <Form.Item
                            name={'dueAddress'}
                            rules={[
                              {
                                required: true,
                                message:
                                  'Trường nơi hết hạn không được phép để trống!',
                              },
                              {
                                max: 255,
                                message:
                                  'Trường nơi hết hạn không được phép vượt quá 255 ký tự!',
                              },
                            ]}
                          >
                            <Input
                              disabled
                              placeholder="Nhập thông tin"
                              onChange={(e) => onDueAddressChange(e)}
                              name={'dueAddress'}
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={8}>
                          Phí
                          <span style={{ color: '#F5222D' }}>*</span>
                        </Col>
                        <Col span={16}>
                          <Form.Item
                            name={'fee'}
                            rules={[
                              {
                                required: true,
                                message: 'Trường phí không được phép để trống!',
                              },
                              {
                                max: 255,
                                message:
                                  'Trường phí không được phép vượt quá 255 ký tự!',
                              },
                            ]}
                          >
                            <Input
                              disabled
                              onChange={(e) => onFeeChange(e)}
                              name={'fee'}
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Col>
                    <Col span={1}></Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </div>
        )}
      {(context?.lcApplication?.status == LC_STATUS.TU_CHOI_DRAFT ||
        context?.lcApplication?.status == LC_STATUS.TU_CHOI_KY_SO) &&
        context?.initLCType == LC_TYPE.LC_THONG_THUONG && (
          <div style={{ background: 'white', borderRadius: '5px' }}>
            <Row gutter={24} style={{ padding: 16 }}>
              <Col span={24}>
                <div id="purchase-info">
                  <Row>
                    <Col span={23}>
                      <Row>
                        <Col span={8}>
                          Loại tiền và trị giá L/C
                          <span style={{ color: '#F5222D' }}>*</span>
                        </Col>
                        <Col span={16}>
                          <div>
                            <Row>
                              <Col span={10}>
                                {' '}
                                <Form.Item
                                  name={'valueLc'}
                                  rules={[
                                    {
                                      required: true,
                                      message:
                                        'Trường giá trị L/C không được phép để trống!',
                                    },
                                  ]}
                                >
                                  <InputNumber
                                    formatter={(value) =>
                                      `${value}`.replace(
                                        /\B(?=(\d{3})+(?!\d))/g,
                                        ',',
                                      )
                                    }
                                    parser={(value) =>
                                      value.replace(/\$\s?|(,*)/g, '')
                                    }
                                    style={{ width: '100%' }}
                                    name={'valueLc'}
                                    min={0}
                                    onChange={(e) => onValueLcChange(e)}

                                    // type={'number'}
                                  />
                                </Form.Item>
                              </Col>
                              <Col span={1}></Col>
                              <Col span={4}>
                                <Form.Item
                                  name={'moneyType'}
                                  rules={[
                                    {
                                      required: true,
                                      message:
                                        'Loại tiền không được phép để trống!',
                                    },
                                  ]}
                                >
                                  <Select
                                    onChange={(e) => {
                                      onMoneyTypeChange(e);
                                    }}
                                  >
                                    {context?.constantValue?.currencyList?.map(
                                      (money) => (
                                        <Select.Option
                                          value={money.currencyCode}
                                        >
                                          {money.currencyCode}
                                        </Select.Option>
                                      ),
                                    )}
                                  </Select>
                                </Form.Item>
                              </Col>
                            </Row>
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={8}>
                          Dung sai trên số tiền (%)
                          <span style={{ color: '#F5222D' }}>*</span>
                        </Col>
                        <Col span={16}>
                          <div>
                            <Row>
                              <Col span={5}>
                                <Form.Item
                                  name={'positiveTolerance'}
                                  rules={[
                                    {
                                      required: true,
                                      message:
                                        'Trường dung sai dương trên số tiền không được phép để trống!',
                                    },

                                    {
                                      validator: async (
                                        _,
                                        positiveTolerance,
                                      ) => {
                                        if (positiveTolerance < 0) {
                                          return Promise.reject(
                                            'Trường dung sai dương trên số tiền không được nhỏ hơn 0',
                                          );
                                        } else if (positiveTolerance > 99) {
                                          return Promise.reject(
                                            'Trường dung sai dương trên số tiền không được lớn hơn 99',
                                          );
                                        }
                                      },
                                    },
                                  ]}
                                >
                                  <Input
                                    style={{ width: '100%' }}
                                    type={'number'}
                                    onKeyDown={(e) =>
                                      exceptThisSymbols.includes(e.key) &&
                                      e.preventDefault()
                                    }
                                    onChange={(e) =>
                                      onPositiveToleranceChange(e)
                                    }
                                    name={'positiveTolerance'}
                                    prefix="+"
                                    suffix="%"
                                    max={99}
                                    min={0}
                                    placeholder="0"
                                  />
                                </Form.Item>
                              </Col>
                              <Col span={5}>
                                <Form.Item
                                  name={'negativeTolerance'}
                                  rules={[
                                    {
                                      required: true,
                                      message:
                                        'Trường dung sai âm trên số tiền không được phép để trống!',
                                    },

                                    {
                                      validator: async (
                                        _,
                                        negativeTolerance,
                                      ) => {
                                        if (negativeTolerance < 0) {
                                          return Promise.reject(
                                            'Trường dung sai âm trên số tiền không được nhỏ hơn 0',
                                          );
                                        } else if (negativeTolerance > 99) {
                                          return Promise.reject(
                                            'Trường dung sai âm trên số tiền không được lớn hơn 99',
                                          );
                                        }
                                      },
                                    },
                                  ]}
                                >
                                  <Input
                                    style={{ width: '100%' }}
                                    type={'number'}
                                    onKeyDown={(e) =>
                                      exceptThisSymbols.includes(e.key) &&
                                      e.preventDefault()
                                    }
                                    onChange={(e) =>
                                      onNegativeToleranceChange(e)
                                    }
                                    name={'negativeTolerance'}
                                    prefix="-"
                                    suffix="%"
                                    max={99}
                                    min={0}
                                    placeholder="0"
                                  />
                                </Form.Item>
                              </Col>
                            </Row>
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={8}>
                          Chứng từ xuất trình tại
                          <span style={{ color: '#F5222D' }}>*</span>
                        </Col>
                        <Col span={16}>
                          <Form.Item name={'presentationAt'}>
                            <Radio.Group
                              onChange={(e) => onPresentationAtChange(e)}
                              defaultValue={0}
                            >
                              <Space direction="horizontal">
                                <Radio value={0}>Ngân hàng bất kỳ</Radio>
                                <Radio value={1}>Ngân hàng xác nhận</Radio>
                                <Radio value={2}>Ngân hàng khác</Radio>
                              </Space>
                            </Radio.Group>
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={8}>
                          Chọn NH sẽ xuất trình chứng từ
                          <span style={{ color: '#F5222D' }}></span>
                        </Col>
                        <Col span={16}>
                          <Form.Item
                            name={'presentationAtBank'}
                            rules={[
                              {
                                required:
                                  context?.lcApplication?.presentationAt == 2
                                    ? true
                                    : false,
                                message:
                                  'Vui lòng chọn ngân hàng xuất trình chứng từ!',
                              },
                            ]}
                          >
                            <Select
                              disabled={
                                context?.lcApplication?.presentationAt == 2
                                  ? false
                                  : true
                              }
                              placeholder="Chọn"
                              onChange={(e) => onBankPresentationAtChange(e)}
                            >
                              {' '}
                              {context?.constantValue?.releashBankList.map(
                                (bank) => (
                                  <Select.Option value={bank.bankId}>
                                    {bank.bankName}
                                  </Select.Option>
                                ),
                              )}
                            </Select>
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={8}>
                          Điều khoản thanh toán
                          <span style={{ color: '#F5222D' }}>*</span>
                        </Col>
                        <Col span={16}>
                          <Form.Item name={'termOfPayment'}>
                            <Radio.Group
                              onChange={(e) => onTermOfPaymentChange(e)}
                              defaultValue={1}
                            >
                              <Space direction="horizontal">
                                <Radio value={1}>Trả ngay</Radio>
                                <Radio value={2}>Trả chậm</Radio>
                                <Radio value={3}>Khác</Radio>
                              </Space>
                            </Radio.Group>
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={8}>
                          Chi tiết điều khoản Thanh toán trả chậm/Khác
                          <span style={{ color: '#F5222D' }}>*</span>
                        </Col>
                        <Col span={16}>
                          <Form.Item
                            name={'termOfPaymentDetail'}
                            rules={[
                              {
                                required:
                                  context?.lcApplication?.termOfPayment == 3 ||
                                  context?.lcApplication?.termOfPayment == 2
                                    ? true
                                    : false,
                                message:
                                  'Trường chi tiết điều khoản thanh toán không được phép để trống!',
                              },
                              {
                                max: 255,
                                message:
                                  'Trường chi tiết điều khoản thanh toán không được phép vượt quá 255 ký tự!',
                              },
                            ]}
                          >
                            <Input
                              disabled={
                                context?.lcApplication?.termOfPayment == 3 ||
                                context?.lcApplication?.termOfPayment == 2
                                  ? false
                                  : true
                              }
                              onChange={(e) => onNoteTermOfPaymentChange(e)}
                              name={'termOfPaymentDetail'}
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={8}>
                          Số tiền thanh toán
                          <span style={{ color: '#F5222D' }}></span>
                        </Col>
                        <Col span={8}>
                          <Form.Item name={'paymentAmount'}>
                            <Input
                              onChange={(e) => onPaymentAmountChange(e)}
                              name={'paymentAmount'}
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={8}>
                          Ngày hết hạn
                          <span style={{ color: '#F5222D' }}>*</span>
                        </Col>
                        <Col span={8}>
                          <Form.Item
                            name={'dueDate'}
                            rules={[
                              {
                                validator: async (_, dueDate) => {
                                  var proposalDate =
                                    props.form.getFieldValue('proposalDate');
                                  if (proposalDate != null) {
                                    if (dueDate < proposalDate) {
                                      return Promise.reject(
                                        'Ngày hết hạn L/C không được trước ngày đề nghị phát hành L/C',
                                      );
                                    }
                                  }
                                },
                              },
                              {
                                required: true,
                                message:
                                  'Trường ngày hết hạn không được phép để trống!',
                              },
                            ]}
                          >
                            <DatePicker
                              name="dueDate"
                              style={{ width: '100%' }}
                              // defaultValue={moment('01/01/2015')}
                              format={dateFormatList}
                              placeholder="dd/mm/yyyy"
                              onChange={(e) => onDueDateChange(e)}
                              allowClear={true}
                              disabledDate={(current) =>
                                current.isBefore(
                                  moment(
                                    context?.lcApplication?.proposalDate,
                                  ).subtract(0, 'day'),
                                )
                              }
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={8}>
                          Nơi hết hạn
                          <span style={{ color: '#F5222D' }}>*</span>
                        </Col>
                        <Col span={16}>
                          <Form.Item
                            name={'dueAddress'}
                            rules={[
                              {
                                required: true,
                                message:
                                  'Trường nơi hết hạn không được phép để trống!',
                              },
                              {
                                max: 255,
                                message:
                                  'Trường nơi hết hạn không được phép vượt quá 255 ký tự!',
                              },
                            ]}
                          >
                            <Input
                              placeholder="Nhập thông tin"
                              onChange={(e) => onDueAddressChange(e)}
                              name={'dueAddress'}
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={8}>
                          Phí
                          <span style={{ color: '#F5222D' }}>*</span>
                        </Col>
                        <Col span={16}>
                          <Form.Item
                            name={'fee'}
                            rules={[
                              {
                                required: true,
                                message: 'Trường phí không được phép để trống!',
                              },
                              {
                                max: 255,
                                message:
                                  'Trường phí không được phép vượt quá 255 ký tự!',
                              },
                            ]}
                          >
                            <Input
                              onChange={(e) => onFeeChange(e)}
                              name={'fee'}
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Col>
                    <Col span={1}></Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </div>
        )}
      {(context?.lcApplication?.status == LC_STATUS.TU_CHOI_BAO_GIA ||
        context?.lcApplication?.status == LC_STATUS.TU_CHOI_TAI_TRO) && (
        <div style={{ background: 'white', borderRadius: '5px' }}>
          <Row gutter={24} style={{ padding: 16 }}>
            <Col span={24}>
              <div id="purchase-info">
                <Row>
                  <Col span={23}>
                    <Row>
                      <Col span={8}>
                        Loại tiền và trị giá L/C
                        <span style={{ color: '#F5222D' }}>*</span>
                      </Col>
                      <Col span={16}>
                        <div>
                          <Row>
                            <Col span={10}>
                              {' '}
                              <Form.Item
                                name={'valueLc'}
                                rules={[
                                  {
                                    required: true,
                                    message:
                                      'Trường giá trị L/C không được phép để trống!',
                                  },
                                ]}
                              >
                                <InputNumber
                                  formatter={(value) =>
                                    `${value}`.replace(
                                      /\B(?=(\d{3})+(?!\d))/g,
                                      ',',
                                    )
                                  }
                                  parser={(value) =>
                                    value.replace(/\$\s?|(,*)/g, '')
                                  }
                                  style={{ width: '100%' }}
                                  name={'valueLc'}
                                  min={0}
                                  onChange={(e) => onValueLcChange(e)}

                                  // type={'number'}
                                />
                              </Form.Item>
                            </Col>
                            <Col span={1}></Col>
                            <Col span={4}>
                              <Form.Item
                                name={'moneyType'}
                                rules={[
                                  {
                                    required: true,
                                    message:
                                      'Loại tiền không được phép để trống!',
                                  },
                                ]}
                              >
                                <Select
                                  onChange={(e) => {
                                    onMoneyTypeChange(e);
                                  }}
                                >
                                  {context?.constantValue?.currencyList?.map(
                                    (money) => (
                                      <Select.Option value={money.currencyCode}>
                                        {money.currencyCode}
                                      </Select.Option>
                                    ),
                                  )}
                                </Select>
                              </Form.Item>
                            </Col>
                          </Row>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={8}>
                        Dung sai trên số tiền (%)
                        <span style={{ color: '#F5222D' }}>*</span>
                      </Col>
                      <Col span={16}>
                        <div>
                          <Row>
                            <Col span={5}>
                              <Form.Item
                                name={'positiveTolerance'}
                                rules={[
                                  {
                                    required: true,
                                    message:
                                      'Trường dung sai dương trên số tiền không được phép để trống!',
                                  },

                                  {
                                    validator: async (_, positiveTolerance) => {
                                      if (positiveTolerance < 0) {
                                        return Promise.reject(
                                          'Trường dung sai dương trên số tiền không được nhỏ hơn 0',
                                        );
                                      } else if (positiveTolerance > 99) {
                                        return Promise.reject(
                                          'Trường dung sai dương trên số tiền không được lớn hơn 99',
                                        );
                                      }
                                    },
                                  },
                                ]}
                              >
                                <Input
                                  style={{ width: '100%' }}
                                  type={'number'}
                                  onKeyDown={(e) =>
                                    exceptThisSymbols.includes(e.key) &&
                                    e.preventDefault()
                                  }
                                  onChange={(e) => onPositiveToleranceChange(e)}
                                  name={'positiveTolerance'}
                                  prefix="+"
                                  suffix="%"
                                  max={99}
                                  min={0}
                                  placeholder="0"
                                />
                              </Form.Item>
                            </Col>
                            <Col span={5}>
                              <Form.Item
                                name={'negativeTolerance'}
                                rules={[
                                  {
                                    required: true,
                                    message:
                                      'Trường dung sai âm trên số tiền không được phép để trống!',
                                  },

                                  {
                                    validator: async (_, negativeTolerance) => {
                                      if (negativeTolerance < 0) {
                                        return Promise.reject(
                                          'Trường dung sai âm trên số tiền không được nhỏ hơn 0',
                                        );
                                      } else if (negativeTolerance > 99) {
                                        return Promise.reject(
                                          'Trường dung sai âm trên số tiền không được lớn hơn 99',
                                        );
                                      }
                                    },
                                  },
                                ]}
                              >
                                <Input
                                  style={{ width: '100%' }}
                                  type={'number'}
                                  onKeyDown={(e) =>
                                    exceptThisSymbols.includes(e.key) &&
                                    e.preventDefault()
                                  }
                                  onChange={(e) => onNegativeToleranceChange(e)}
                                  name={'negativeTolerance'}
                                  prefix="-"
                                  suffix="%"
                                  max={99}
                                  min={0}
                                  placeholder="0"
                                />
                              </Form.Item>
                            </Col>
                          </Row>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={8}>
                        Chứng từ xuất trình tại
                        <span style={{ color: '#F5222D' }}>*</span>
                      </Col>
                      <Col span={16}>
                        <Form.Item name={'presentationAt'}>
                          <Radio.Group
                            onChange={(e) => onPresentationAtChange(e)}
                            defaultValue={0}
                          >
                            <Space direction="horizontal">
                              <Radio value={0}>Ngân hàng bất kỳ</Radio>
                              <Radio value={1}>Ngân hàng xác nhận</Radio>
                              <Radio value={2}>Ngân hàng khác</Radio>
                            </Space>
                          </Radio.Group>
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={8}>
                        Chọn NH sẽ xuất trình chứng từ
                        <span style={{ color: '#F5222D' }}></span>
                      </Col>
                      <Col span={16}>
                        <Form.Item
                          name={'presentationAtBank'}
                          rules={[
                            {
                              required:
                                context?.lcApplication?.presentationAt == 2
                                  ? true
                                  : false,
                              message:
                                'Vui lòng chọn ngân hàng xuất trình chứng từ!',
                            },
                          ]}
                        >
                          <Select
                            disabled={
                              context?.lcApplication?.presentationAt == 2
                                ? false
                                : true
                            }
                            placeholder="Chọn"
                            onChange={(e) => onBankPresentationAtChange(e)}
                          >
                            {' '}
                            {context?.constantValue?.releashBankList.map(
                              (bank) => (
                                <Select.Option value={bank.bankId}>
                                  {bank.bankName}
                                </Select.Option>
                              ),
                            )}
                          </Select>
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={8}>
                        Điều khoản thanh toán
                        <span style={{ color: '#F5222D' }}>*</span>
                      </Col>
                      <Col span={16}>
                        <Form.Item name={'termOfPayment'}>
                          <Radio.Group
                            onChange={(e) => onTermOfPaymentChange(e)}
                            defaultValue={1}
                          >
                            <Space direction="horizontal">
                              <Radio value={1}>Trả ngay</Radio>
                              <Radio value={2}>Trả chậm</Radio>
                              <Radio value={3}>Khác</Radio>
                            </Space>
                          </Radio.Group>
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={8}>
                        Chi tiết điều khoản Thanh toán trả chậm/Khác
                        <span style={{ color: '#F5222D' }}>*</span>
                      </Col>
                      <Col span={16}>
                        <Form.Item
                          name={'termOfPaymentDetail'}
                          rules={[
                            {
                              required:
                                context?.lcApplication?.termOfPayment == 3 ||
                                context?.lcApplication?.termOfPayment == 2
                                  ? true
                                  : false,
                              message:
                                'Trường chi tiết điều khoản thanh toán không được phép để trống!',
                            },
                            {
                              max: 255,
                              message:
                                'Trường chi tiết điều khoản thanh toán không được phép vượt quá 255 ký tự!',
                            },
                          ]}
                        >
                          <Input
                            disabled={
                              context?.lcApplication?.termOfPayment == 3 ||
                              context?.lcApplication?.termOfPayment == 2
                                ? false
                                : true
                            }
                            onChange={(e) => onNoteTermOfPaymentChange(e)}
                            name={'termOfPaymentDetail'}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={8}>
                        Số tiền thanh toán
                        <span style={{ color: '#F5222D' }}></span>
                      </Col>
                      <Col span={8}>
                        <Form.Item name={'paymentAmount'}>
                          <Input
                            onChange={(e) => onPaymentAmountChange(e)}
                            name={'paymentAmount'}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={8}>
                        Ngày hết hạn
                        <span style={{ color: '#F5222D' }}>*</span>
                      </Col>
                      <Col span={8}>
                        <Form.Item
                          name={'dueDate'}
                          rules={[
                            {
                              validator: async (_, dueDate) => {
                                var proposalDate =
                                  props.form.getFieldValue('proposalDate');
                                if (proposalDate != null) {
                                  if (dueDate < proposalDate) {
                                    return Promise.reject(
                                      'Ngày hết hạn L/C không được trước ngày đề nghị phát hành L/C',
                                    );
                                  }
                                }
                              },
                            },
                            {
                              required: true,
                              message:
                                'Trường ngày hết hạn không được phép để trống!',
                            },
                          ]}
                        >
                          <DatePicker
                            name="dueDate"
                            style={{ width: '100%' }}
                            // defaultValue={moment('01/01/2015')}
                            format={dateFormatList}
                            placeholder="dd/mm/yyyy"
                            onChange={(e) => onDueDateChange(e)}
                            allowClear={true}
                            disabledDate={(current) =>
                              current.isBefore(
                                moment(
                                  context?.lcApplication?.proposalDate,
                                ).subtract(0, 'day'),
                              )
                            }
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={8}>
                        Nơi hết hạn
                        <span style={{ color: '#F5222D' }}>*</span>
                      </Col>
                      <Col span={16}>
                        <Form.Item
                          name={'dueAddress'}
                          rules={[
                            {
                              required: true,
                              message:
                                'Trường nơi hết hạn không được phép để trống!',
                            },
                            {
                              max: 255,
                              message:
                                'Trường nơi hết hạn không được phép vượt quá 255 ký tự!',
                            },
                          ]}
                        >
                          <Input
                            placeholder="Nhập thông tin"
                            onChange={(e) => onDueAddressChange(e)}
                            name={'dueAddress'}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={8}>
                        Phí
                        <span style={{ color: '#F5222D' }}>*</span>
                      </Col>
                      <Col span={16}>
                        <Form.Item
                          name={'fee'}
                          rules={[
                            {
                              required: true,
                              message: 'Trường phí không được phép để trống!',
                            },
                            {
                              max: 255,
                              message:
                                'Trường phí không được phép vượt quá 255 ký tự!',
                            },
                          ]}
                        >
                          <Input
                            onChange={(e) => onFeeChange(e)}
                            name={'fee'}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Col>
                  <Col span={1}></Col>
                </Row>
              </div>
            </Col>
          </Row>
        </div>
      )}
    </>
  );
};

export default PurchaseInfoContent;
