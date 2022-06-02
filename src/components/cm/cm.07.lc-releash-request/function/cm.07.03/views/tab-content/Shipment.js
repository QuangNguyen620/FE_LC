import React, { useState } from 'react';
import { Col, Row, Form, Space, Radio, Table, Card, Divider } from 'antd';
import { KTTitle } from 'core/ui';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import '../../../../component/less/CM.07.less';
import { CM1602Domain } from '../../domains/CM.07.Domain';
const ShipmentContent = ({ lang = 'vi', ...props }) => {
  const { t } = useTranslation();

  const dateFormatList = 'DD/MM/YYYY';
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [context] = CM1602Domain();
  const columns = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
      render: (_value, _item, index) => (page - 1) * pageSize + index + 1,
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
                    <span style={{ color: '#F5222D' }}></span>
                  </Col>
                  <Col span={16}>
                    <p>{context?.lcApplication?.partialShipment}</p>
                  </Col>
                </Row>
                <Divider></Divider>
                <Row>
                  <Col span={8}>
                    Chuyển tải
                    <span style={{ color: '#F5222D' }}></span>
                  </Col>
                  <Col span={16}>
                    <p>{context?.lcApplication?.transhipment}</p>
                  </Col>
                </Row>
                <Divider></Divider>
                <Row>
                  <Col span={8}>
                    Nơi giao hàng <span style={{ color: '#F5222D' }}></span>
                  </Col>
                  <Col span={16}>
                    <p>{context?.lcApplication?.placeOfReceipt}</p>
                  </Col>
                </Row>
                <Divider></Divider>
                <Row>
                  <Col span={8}>
                    Nơi nhận hàng <span style={{ color: '#F5222D' }}></span>
                  </Col>
                  <Col span={16}>
                    <p>{context?.lcApplication?.placeOfDestination}</p>
                  </Col>
                </Row>
                <Divider></Divider>
                <Row>
                  <Col span={8}>
                    Cảng xuất hàng/Sân bay khởi hành{' '}
                    <span style={{ color: '#F5222D' }}></span>
                  </Col>
                  <Col span={16}>
                    <p>{context?.lcApplication?.portOfDeparture}</p>
                  </Col>
                </Row>
                <Divider></Divider>
                <Row>
                  <Col span={8}>
                    Cảng dỡ hàng/Sân bay đến{' '}
                    <span style={{ color: '#F5222D' }}></span>
                  </Col>
                  <Col span={16}>
                    <p>{context?.lcApplication?.portOfDestination}</p>
                  </Col>
                </Row>
                <Divider></Divider>
                <Row>
                  <Col span={8}>
                    Ngày giao hàng muộn nhất
                    <span style={{ color: '#F5222D' }}></span>
                  </Col>
                  <Col span={16}>
                    <p>{context?.lcApplication?.lastestDeliveryDate}</p>
                  </Col>
                </Row>
                <Divider></Divider>
                <Row>
                  <Col span={8}>
                    Thời gian giao hàng
                    <span style={{ color: '#F5222D' }}></span>
                  </Col>
                  <Col span={16}>
                    <p>{context?.lcApplication?.deliveryTime}</p>
                  </Col>
                </Row>
                <Divider></Divider>

                <Row>
                  <Col span={8}>
                    Loại hàng hóa
                    <span style={{ color: '#F5222D' }}></span>
                  </Col>
                  <Col span={16}>
                    <p>{context?.lcApplication?.typeOfGood}</p>
                  </Col>
                </Row>
                <Divider></Divider>
                <Row>
                  <Col span={8}>
                    Mô tả chi tiết hàng hóa
                    <span style={{ color: '#F5222D' }}></span>
                  </Col>
                  <Col span={16}>
                    <p>{context?.lcApplication?.descriptionOfGoods}</p>
                  </Col>
                </Row>
                <Divider></Divider>
                <div>
                  <Row style={{ paddingBottom: 15 }}>
                    <Card
                      type="inner"
                      className="custom-card"
                      title={<b>Danh mục hàng hóa</b>}
                    >
                      <Row>
                        <Col span={24}>
                          <Table
                            dataSource={context?.lcApplication?.productsRequest}
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
                  </Row>
                </div>
                <Divider></Divider>
                <Row>
                  <Col span={8}>
                    Tổng giá trị hàng hóa
                    <span style={{ color: '#F5222D' }}></span>
                  </Col>
                  <Col span={16}>
                    <p>{context?.lcApplication?.totalValueProduct}</p>
                  </Col>
                </Row>
                <Divider></Divider>
                <Row>
                  <Col span={8}>
                    VAT
                    <span style={{ color: '#F5222D' }}></span>
                  </Col>
                  <Col span={16}>
                    <p>{context?.lcApplication?.vatProduct}</p>
                  </Col>
                </Row>
                <Divider></Divider>
                <Row>
                  <Col span={8}>
                    Tổng giá trị hàng hóa (bao gồm VAT)
                    <span style={{ color: '#F5222D' }}></span>
                  </Col>
                  <Col span={16}>
                    <p>{context?.lcApplication?.totalValueAfterVat}</p>
                  </Col>
                </Row>
                {/* <Divider></Divider>
                <Row>
                  <Col span={8}>
                    Điều kiện vận chuyển
                    <span style={{ color: '#F5222D' }}></span>
                  </Col>
                  <Col span={16}>
                    <p>[Điều kiện vận chuyển]</p>
                  </Col>
                </Row> */}
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
