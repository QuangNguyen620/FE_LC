import React, { useState } from 'react';
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
  Table,
  InputNumber,
  Typography,
  Card,
} from 'antd';
import { DeleteFilled, EditFilled, PlusOutlined } from '@ant-design/icons';
import { KTTitle } from 'core/ui';
import { CM0702Domain } from '../../domains/CM0702Domain';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import '../../../../component/less/CM.07.less';

const { TextArea } = Input;
const ShipmentContent = ({ lang = 'vi', ...props }) => {
  const { t } = useTranslation();

  const [context, domain] = CM0702Domain();

  const dateFormatList = 'DD/MM/YYYY';
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  const [state, setState] = useState({
    dataSource: context?.lcRequest?.productsRequest,
    count: 0,
  });

  const [selectedKey, setSelectedKey] = useState(-1);

  const columns = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
      render: (value, item, index) => (page - 1) * pageSize + index + 1,
    },
    {
      title: 'Tên hàng hóa/Dịch vụ',
      dataIndex: 'commodity',
      key: 'commodity',
    },
    {
      title: 'Xuất xứ',
      dataIndex: 'origin',
      key: 'origin',
    },
    {
      title: 'Số lượng',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Đơn vị',
      dataIndex: 'unit',
      key: 'unit',
    },
    {
      title: 'Đơn giá',
      dataIndex: 'unitPrice',
      key: 'unitPrice',
    },

    {
      title: 'Thành tiền',
      dataIndex: 'intoMoney',
      key: 'intoMoney',
    },
  ];

  const editableColumns = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
      render: (value, item, index) => (page - 1) * pageSize + index + 1,
    },
    {
      title: 'Tên hàng hóa/Dịch vụ',
      dataIndex: 'commodity',
      key: 'commodity',
      render: (text, record, index) => (
        <Input
          style={{ width: '100%' }}
          onChange={(e) => onChangeCommodity(e, record.key)}
          name={'commodity'}
          placeholder="Nhập thông tin"
          defaultValue={state?.dataSource[record.key]?.commodity}
        />
      ),
    },
    {
      title: 'Xuất xứ',
      dataIndex: 'origin',
      key: 'origin',
      render: (text, record, index) => (
        <Input
          style={{ width: '100%' }}
          onChange={(e) => onChangeOrigin(e, record.key)}
          name={'origin'}
          placeholder="Nhập thông tin"
          defaultValue={state?.dataSource[record.key]?.origin}
        />
      ),
    },
    {
      title: 'Số lượng',
      dataIndex: 'amount',
      key: 'amount',
      render: (text, record, index) => (
        <InputNumber
          formatter={(value) =>
            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          }
          parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
          style={{ width: '100%' }}
          name={'amount'}
          min={0}
          placeholder="0"
          onChange={(e) => onChangeAmount(e, record.key)}
          defaultValue={state?.dataSource[record.key]?.amount}
        />
      ),
    },
    {
      title: 'Đơn vị',
      dataIndex: 'unit',
      key: 'unit',
      render: (text, record, index) => (
        <Input
          style={{ width: '100%' }}
          onChange={(e) => onChangeUnit(e, record.key)}
          name={'unit'}
          placeholder="Nhập thông tin"
          defaultValue={state?.dataSource[record.key]?.unit}
        />
      ),
    },
    {
      title: 'Đơn giá',
      dataIndex: 'unitPrice',
      key: 'unitPrice',
      render: (text, record, index) => (
        <InputNumber
          formatter={(value) =>
            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          }
          parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
          style={{ width: '100%' }}
          name={'unitPrice'}
          min={0}
          placeholder="0"
          onChange={(e) => onChangeUnitPrice(e, record.key)}
          defaultValue={state?.dataSource[record.key]?.unitPrice}
        />
      ),
    },

    {
      title: 'Thành tiền',
      dataIndex: 'intoMoney',
      key: 'intoMoney',
      render: (text, record, index) => (
        <InputNumber
          disabled
          formatter={(value) =>
            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          }
          parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
          style={{ width: '100%' }}
          onChange={(e) => onChangeUnit(e, record.key)}
          name={'unit'}
          value={state?.dataSource[record.key]?.intoMoney}
          defaultValue={state?.dataSource[record.key]?.intoMoney}
        />
      ),
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_, record) =>
        state.dataSource.length >= 1 ? (
          <Button
            onClick={(e) => {
              console.log(record.key);
              setSelectedKey(record.key);
              handleDelete(record.key);
            }}
            shape="circle"
            icon={<DeleteFilled />}
            size={'small'}
          />
        ) : // </Popconfirm>
        null,
    },
  ];
  const handleAdd = async () => {
    const { count, dataSource } = state;
    const newData = {
      key: dataSource.length,

      commodity: '',
      origin: '',
      amount: 0,
      unit: '',
      unitPrice: 0,
      intoMoney: 0,
    };
    setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
    });

    await domain.setProductsRequestList(state.dataSource);
  };

  const handleDelete = async (key) => {
    let dataSource = [...state.dataSource];
    var index = dataSource.findIndex(function (element) {
      return element.key == key;
    });
    console.log(index);
    dataSource.splice(index, 1);

    var tempArr = [];
    for (let index = 0; index < dataSource.length; index++) {
      const element = {
        ...dataSource[index],
        key: index,
      };
      tempArr.push(element);
    }
    setState({
      dataSource: [...dataSource],
    });
    await domain.setProductsRequestList(tempArr);
    setSelectedKey(-1);
  };

  const onChangeCommodity = (e, key) => {
    let dataSource = [...state.dataSource];

    var index = dataSource.findIndex(function (element) {
      return element.key == key;
    });
    dataSource[index].commodity = e.target.value; //new value
    setState({ dataSource });
    console.log(dataSource);
    domain.setProductsRequestList(state.dataSource);
  };

  const onChangeOrigin = (e, key) => {
    let dataSource = [...state.dataSource];
    var index = dataSource.findIndex(function (element) {
      return element.key == key;
    });
    dataSource[index].origin = e.target.value;
    setState({ dataSource });
    console.log(dataSource);
    domain.setProductsRequestList(state.dataSource);
  };

  const onChangeAmount = (e, key) => {
    let dataSource = [...state.dataSource];
    var index = dataSource.findIndex(function (element) {
      return element.key == key;
    });
    dataSource[index].amount = e;
    dataSource[index].intoMoney =
      dataSource[index].amount * dataSource[index].unitPrice;
    setState({ dataSource });
    console.log(dataSource);
    domain.setProductsRequestList(state.dataSource);
  };

  const onChangeUnit = (e, key) => {
    let dataSource = [...state.dataSource];
    var index = dataSource.findIndex(function (element) {
      return element.key == key;
    });
    dataSource[index].unit = e.target.value;
    setState({ dataSource });
    console.log(dataSource);
    domain.setProductsRequestList(state.dataSource);
  };

  const onChangeUnitPrice = (e, key) => {
    let dataSource = [...state.dataSource];
    var index = dataSource.findIndex(function (element) {
      return element.key == key;
    });
    dataSource[index].unitPrice = e;
    dataSource[index].intoMoney =
      dataSource[index].amount * dataSource[index].unitPrice;
    setState({ dataSource });
    console.log(dataSource);
    domain.setProductsRequestList(state.dataSource);
  };

  //--------------------------------------//
  const onPartialShipmentChange = (e) => {
    domain.onPartialShipmentChange(e);
  };

  const onTranshipmentChange = (e) => {
    domain.onTranshipmentChange(e);
  };

  const onPlaceOfReceiptChange = (e) => {
    domain.onPlaceOfReceiptChange(e);
  };

  const onPlaceOfDestinationChange = (e) => {
    domain.onPlaceOfDestinationChange(e);
  };

  const onPortOfDepartureChange = (e) => {
    domain.onPortOfDepartureChange(e);
  };

  const onPortOfDestinationChange = (e) => {
    domain.onPortOfDestinationChange(e);
  };

  const onLastestDeliveryDateChange = (e) => {
    domain.onLastestDeliveryDateChange(e);
  };

  const onDeliveryTimeChange = (e) => {
    domain.onDeliveryTimeChange(e);
  };

  const onDescriptionOfGoodsChange = (e) => {
    domain.onDescriptionOfGoodsChange(e);
  };

  const onGoodTypeChange = (e) => {
    domain.onGoodTypeChange(e);
  };

  const onTotalValueAfterVatContractType1Change = (e) => {
    domain.onTotalValueAfterVatContractType1Change(e);
  };
  const onTotalValueAfterVatChange = (e) => {
    domain.onTotalValueAfterVatChange(e);
  };
  const onVatProductChange = (e) => {
    domain.onVatProductChange(e);
  };

  //--------------------------------------//
  return (
    <>
      <div style={{ background: 'white', borderRadius: '5px' }}>
        <Row style={{ padding: 16 }}>
          <Col span={24}>
            <Row>
              <Col span={23}>
                <Row>
                  <Col span={8}>
                    Giao hàng từng phần
                    <span style={{ color: '#F5222D' }}>*</span>
                  </Col>
                  <Col span={16}>
                    <Form.Item name={'partialShipment'}>
                      <Radio.Group
                        onChange={(e) => onPartialShipmentChange(e)}
                        defaultValue={true}
                      >
                        <Space direction="horizontal">
                          <Radio value={true}>Cho phép</Radio>
                          <Radio value={false}>Không cho phép</Radio>
                        </Space>
                      </Radio.Group>
                    </Form.Item>
                  </Col>
                </Row>

                <Row>
                  <Col span={8}>
                    Chuyển tải
                    <span style={{ color: '#F5222D' }}>*</span>
                  </Col>
                  <Col span={16}>
                    <Form.Item name={'transhipment'}>
                      <Radio.Group
                        onChange={(e) => onTranshipmentChange(e)}
                        defaultValue={true}
                      >
                        <Space direction="horizontal">
                          <Radio value={true}>Cho phép</Radio>
                          <Radio value={false}>Không cho phép</Radio>
                        </Space>
                      </Radio.Group>
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  {context?.lcRequest?.contractType == 2 ? (
                    <Col span={8}>
                      Nơi giao hàng <span style={{ color: '#F5222D' }}>*</span>
                    </Col>
                  ) : (
                    <Col span={8}>
                      Nơi giao hàng <span style={{ color: '#F5222D' }}></span>
                    </Col>
                  )}
                  <Col span={16}>
                    <Form.Item
                      name={'placeOfReceipt'}
                      rules={[
                        {
                          required: true,
                          message:
                            'Trường nơi giao hàng không được phép để trống!',
                        },
                        {
                          max: 300,
                          message:
                            'Trường nơi giao hàng không được phép vượt quá 300 ký tự!',
                        },
                      ]}
                    >
                      <Input
                        onChange={(e) => onPlaceOfReceiptChange(e)}
                        name={'placeOfReceipt'}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row>
                  {context?.lcRequest?.contractType == 2 ? (
                    <Col span={8}>
                      Nơi nhận hàng <span style={{ color: '#F5222D' }}>*</span>
                    </Col>
                  ) : (
                    <Col span={8}>
                      Nơi nhận hàng <span style={{ color: '#F5222D' }}></span>
                    </Col>
                  )}
                  <Col span={16}>
                    <Form.Item
                      name={'placeOfDestination'}
                      rules={[
                        {
                          required: true,
                          message:
                            'Trường nơi nhận hàng không được phép để trống!',
                        },
                        {
                          max: 300,
                          message:
                            'Trường nơi nhận hàng không được phép vượt quá 300 ký tự!',
                        },
                      ]}
                    >
                      <Input
                        onChange={(e) => onPlaceOfDestinationChange(e)}
                        name={'placeOfDestination'}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row>
                  <Col span={8}>
                    Cảng xuất hàng/Sân bay khởi hành{' '}
                    <span style={{ color: '#F5222D' }}></span>
                  </Col>
                  <Col span={16}>
                    <Form.Item
                      name={'portOfDeparture'}
                      rules={[
                        {
                          max: 300,
                          message:
                            'Trường Cảng xuất hàng/Sân bay khởi hành không được phép vượt quá 300 ký tự!',
                        },
                      ]}
                    >
                      <Input
                        placeholder="Nhập thông tin"
                        onChange={(e) => onPortOfDepartureChange(e)}
                        name={'portOfDeparture'}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    Cảng dỡ hàng/Sân bay đến{' '}
                    <span style={{ color: '#F5222D' }}></span>
                  </Col>
                  <Col span={16}>
                    <Form.Item
                      name={'portOfDestination'}
                      rules={[
                        {
                          max: 300,
                          message:
                            'Trường Cảng dỡ hàng/Sân bay đến không được phép vượt quá 300 ký tự!',
                        },
                      ]}
                    >
                      <Input
                        placeholder="Nhập thông tin"
                        onChange={(e) => onPortOfDestinationChange(e)}
                        name={'portOfDestination'}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    Ngày giao hàng muộn nhất
                    <span style={{ color: '#F5222D' }}>*</span>
                  </Col>
                  <Col span={8}>
                    {context?.lcRequest?.contractType == 2 ? (
                      <Form.Item
                        className={
                          props.form.getFieldValue('deliveryTime') != null &&
                          props.form.getFieldValue('lastestDeliveryDate') ==
                            null
                            ? 'custom-error-field custom-message-error-field'
                            : ''
                        }
                        name={'lastestDeliveryDate'}
                        rules={[
                          {
                            validator: async (_, lastestDeliveryDate) => {
                              var proposalDate =
                                props.form.getFieldValue('proposalDate');

                              if (proposalDate != null) {
                                if (lastestDeliveryDate != null) {
                                  if (lastestDeliveryDate < proposalDate) {
                                    return Promise.reject(
                                      'Ngày giao hàng muộn nhất không được trước ngày đề nghị phát hành L/C',
                                    );
                                  }
                                }
                              }
                            },
                          },
                          {
                            required:
                              props.form.getFieldValue('deliveryTime') == null
                                ? true
                                : false,
                            message:
                              'Không được phép để trống cả hai trường "Thời gian giao hàng" và "Ngày giao hàng muộn nhất"!',
                          },
                          {
                            validator: async (_, lastestDeliveryDate) => {
                              var deliveryTime =
                                props.form.getFieldValue('deliveryTime');
                              console.log(deliveryTime);
                              if (
                                lastestDeliveryDate != null &&
                                deliveryTime != null
                              ) {
                                return Promise.reject(
                                  'Không được phép nhập cả hai trường "Thời gian giao hàng" và "Ngày giao hàng muộn nhất"',
                                );
                              } else if (
                                lastestDeliveryDate != null ||
                                deliveryTime != null
                              ) {
                                return Promise.resolve();
                              }
                            },
                          },
                        ]}
                      >
                        <DatePicker
                          name="lastestDeliveryDate"
                          style={{ width: '100%' }}
                          format={dateFormatList}
                          placeholder="dd/mm/yyyy"
                          onChange={(e) => onLastestDeliveryDateChange(e)}
                          allowClear={true}
                          disabledDate={(current) =>
                            current.isBefore(
                              moment(context?.lcRequest?.proposalDate).subtract(
                                0,
                                'day',
                              ),
                            )
                          }
                        />
                      </Form.Item>
                    ) : (
                      <Form.Item name={'lastestDeliveryDateContract1'}>
                        <DatePicker
                          style={{ width: '100%' }}
                          format={dateFormatList}
                          placeholder="dd/mm/yyyy"
                          disabled
                        />
                      </Form.Item>
                    )}
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    Thời gian giao hàng
                    <span style={{ color: '#F5222D' }}>*</span>
                  </Col>
                  <Col span={16}>
                    {context?.lcRequest?.contractType == 2 ? (
                      <Form.Item
                        name={'deliveryTime'}
                        className={
                          props.form.getFieldValue('lastestDeliveryDate') !=
                            null &&
                          props.form.getFieldValue('deliveryTime') == null
                            ? 'custom-error-field custom-message-error-field'
                            : ''
                        }
                        rules={[
                          {
                            required:
                              props.form.getFieldValue('lastestDeliveryDate') ==
                              null
                                ? true
                                : false,
                            message:
                              'Không được phép để trống cả hai trường "Thời gian giao hàng" và "Ngày giao hàng muộn nhất"!',
                          },
                          {
                            validator: async (_, deliveryTime) => {
                              var lastestDeliveryDate =
                                props.form.getFieldValue('lastestDeliveryDate');
                              console.log(lastestDeliveryDate);
                              if (
                                lastestDeliveryDate != null &&
                                deliveryTime != null
                              ) {
                                return Promise.reject(
                                  'Không được phép nhập cả hai trường "Thời gian giao hàng" và "Ngày giao hàng muộn nhất"',
                                );
                              } else if (
                                lastestDeliveryDate != null ||
                                deliveryTime != null
                              ) {
                                return Promise.resolve();
                              }
                            },
                          },
                        ]}
                      >
                        <Input
                          name="deliveryTime"
                          onChange={(e) => onDeliveryTimeChange(e)}
                        />
                      </Form.Item>
                    ) : (
                      <Form.Item name={'deliveryTimeContract1'}>
                        <Input name="deliveryTimeContract1" disabled />
                      </Form.Item>
                    )}
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    Loại hàng hóa <span style={{ color: '#F5222D' }}>*</span>
                  </Col>
                  <Col span={16}>
                    {context?.lcRequest?.contractType == 2 ? (
                      <Form.Item name={'typeOfGoods'}>
                        <Select
                          placeholder="Chọn"
                          onChange={(e) => {
                            onGoodTypeChange(e);
                          }}
                        >
                          {context?.goodTypeList?.map((goodType) => (
                            <Select.Option value={goodType.commoditiesId}>
                              {goodType.commoditiesName}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                    ) : (
                      <Form.Item name={'typeOfGoodsText'}>
                        <Input disabled name={'typeOfGoodsText'} />
                      </Form.Item>
                    )}
                  </Col>
                </Row>

                <Row>
                  <Col span={8}>
                    Mô tả chi tiết hàng hóa{' '}
                    <span style={{ color: '#F5222D' }}></span>
                  </Col>
                  <Col span={16}>
                    <Form.Item
                      name={'descriptionOfGoods'}
                      rules={[
                        {
                          max: 500,
                          message:
                            'Trường mô tả chi tiết hàng hóa không được phép vượt quá 500 ký tự!',
                        },
                      ]}
                    >
                      <TextArea
                        placeholder="Nhập thông tin"
                        rows={4}
                        name={'descriptionOfGoods'}
                        onChange={(e) => {
                          onDescriptionOfGoodsChange(e);
                        }}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row
                  id="productTable"
                  style={{ paddingBottom: 20, paddingTop: 20 }}
                  gutter={24}
                >
                  <Col span={24}>
                    {context?.lcRequest?.contractType == 2 ? (
                      <Card
                        type="inner"
                        className="custom-card"
                        title={<b>Danh mục hàng hóa</b>}
                        extra={
                          <Button
                            className="common-btn"
                            onClick={(e) => {
                              handleAdd();
                            }}
                          >
                            Thêm dòng{' '}
                            <span style={{ marginLeft: '10px' }}>
                              <PlusOutlined />
                            </span>
                          </Button>
                        }
                      >
                        <Row>
                          <Col span={24}>
                            <Table
                              name={'productList'}
                              dataSource={state.dataSource}
                              columns={editableColumns}
                              scroll={{ x: 1250 }}
                              pagination={{
                                onChange(current) {
                                  setPage(current);
                                },
                                pageSize: pageSize,
                              }}
                            />
                          </Col>
                        </Row>
                      </Card>
                    ) : (
                      <Card
                        type="inner"
                        className="custom-card"
                        title={<b>Danh mục hàng hóa</b>}
                      >
                        <Row>
                          <Col span={24}>
                            <Table
                              dataSource={
                                context?.lcRequest?.productsRequestContractType1
                              }
                              name={'productList'}
                              columns={columns}
                              scroll={{ x: 1250 }}
                              pagination={{
                                onChange(current) {
                                  setPage(current);
                                },
                                pageSize: pageSize,
                              }}
                            />
                          </Col>
                        </Row>
                      </Card>
                    )}
                  </Col>
                </Row>

                <Row>
                  <Col span={8}>
                    Tổng giá trị hàng hóa{' '}
                    <span style={{ color: '#F5222D' }}></span>
                  </Col>
                  <Col span={16}>
                    {context?.lcRequest?.contractType == 2 ? (
                      <Form.Item name={'totalValueProduct'}>
                        <InputNumber
                          formatter={(value) =>
                            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                          }
                          parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                          style={{ width: '100%' }}
                          disabled
                          name={'totalValueProduct'}
                        />
                      </Form.Item>
                    ) : (
                      <Form.Item name={'totalValueProductContractType1'}>
                        <InputNumber
                          formatter={(value) =>
                            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                          }
                          parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                          style={{ width: '100%' }}
                          disabled
                          name={'totalValueProductContractType1'}
                        />
                      </Form.Item>
                    )}
                  </Col>
                </Row>

                <Row>
                  <Col span={8}>
                    VAT(%)
                    <span style={{ color: '#F5222D' }}></span>
                  </Col>
                  <Col span={16}>
                    {context?.lcRequest?.contractType == 2 ? (
                      <Form.Item
                        name={'vatProduct'}
                        rules={[
                          {
                            validator: async (_, vatProduct) => {
                              if (vatProduct < 0) {
                                return Promise.reject(
                                  'Trường dung sai dương trên số tiền không được nhỏ hơn 0',
                                );
                              } else if (vatProduct > 100) {
                                return Promise.reject(
                                  'Trường dung sai dương trên số tiền không được lớn hơn 100',
                                );
                              }
                            },
                          },
                        ]}
                      >
                        <InputNumber
                          onChange={(e) => {
                            onVatProductChange(e);
                          }}
                          style={{ width: '100%' }}
                          name={'vatProduct'}
                        />
                      </Form.Item>
                    ) : (
                      <Form.Item name={'vatProductContractType1'}>
                        <InputNumber
                          style={{ width: '100%' }}
                          disabled
                          name={'vatProductContractType1'}
                        />
                      </Form.Item>
                    )}
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    Tổng giá trị hàng hóa (bao gồm VAT)
                    <span style={{ color: '#F5222D' }}></span>
                  </Col>
                  <Col span={16}>
                    {context?.lcRequest?.contractType == 2 ? (
                      <Form.Item name={'totalValueAfterVat'}>
                        <InputNumber
                          onChange={(e) => {
                            onTotalValueAfterVatChange(e);
                          }}
                          formatter={(value) =>
                            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                          }
                          parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                          style={{ width: '100%' }}
                          name={'totalValueAfterVat'}
                        />
                      </Form.Item>
                    ) : (
                      <Form.Item name={'totalValueAfterVatContractType1'}>
                        <InputNumber
                          onChange={(e) => {
                            onTotalValueAfterVatContractType1Change(e);
                          }}
                          formatter={(value) =>
                            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                          }
                          parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                          style={{ width: '100%' }}
                          name={'totalValueAfterVatContractType1'}
                        />
                      </Form.Item>
                    )}
                  </Col>
                </Row>
              </Col>
              <Col span={1}></Col>
            </Row>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ShipmentContent;
