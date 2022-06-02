import React, { useState } from 'react';
import { Col, Row, Form, Select, Checkbox, Divider } from 'antd';
// import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { KTTitle } from 'core/ui';
import { useTranslation } from 'react-i18next';
import {} from '@ant-design/icons';
// import moment from 'moment';
import '../../../../components/less/CM.04.01.less';
import { useCM0401Domain } from '../../domains/CM.04.01Domain';

// const { Option } = Select;
// const CheckboxGroup = Checkbox.Group;
// const originData = [];

const ConstractInfomation = ({ lang = 'vi' }) => {
  const [context, domain] = useCM0401Domain();
  const { t } = useTranslation();
  // const [page, setPage] = useState(1);
  // const [pageSize, setPageSize] = useState(20);
  // const dateFormatList = 'DD/MM/YYYY';

  // thay đổi với các input type = date;
  // function onChangeConstractText(e) {
  //   //console.log(e);
  //   domain.onChangeConstractText(e);
  // }

  // thay đổi với các input type = date;
  // function onChangeConstractDate(e) {
  //   domain.onChangeConstractDate(this.name, e);
  // }

  return (
    <>
      <div className="content-step">
        <Row>
          <Col span={24}>
            <Row style={{ paddingBottom: 15 }}>
              <Col span={24}>
                <KTTitle size={3}>
                  <b>Phương thức giao hàng</b>
                </KTTitle>
              </Col>
            </Row>
            <Row>
              <Col span={23}>
                <Row>
                  <Col span={1}></Col>
                  <Col span={7}>
                    <Form.Item> Phương tiện giao hàng</Form.Item>
                    <span style={{ color: '#F5222D' }}></span>
                  </Col>
                  <Col span={16}>
                    <Form.Item name={'deliveryVehicle'}>
                      {context?.deliveryVehicle}
                    </Form.Item>
                  </Col>
                  <Divider className="divider-view" />
                  <Col span={1}></Col>
                  <Col span={7}>
                    <Form.Item> Thời hạn giao hàng</Form.Item>
                    <span style={{ color: '#F5222D' }}></span>
                  </Col>
                  <Col span={16}>
                    <Form.Item name={'deliveryTerm'}>
                      {context?.deliveryTerm}
                    </Form.Item>
                  </Col>
                  <Divider className="divider-view" />
                  <Col span={1}></Col>
                  <Col span={7}>
                    <Form.Item> Hạn giao hàng</Form.Item>
                    <span style={{ color: '#F5222D' }}></span>
                  </Col>
                  <Col span={16}>
                    <Form.Item name={'deliveryDeadline'}>
                      {context?.deliveryDeadline}
                    </Form.Item>
                  </Col>
                  <Divider className="divider-view" />
                  <Col span={1}></Col>
                  <Col span={7}>
                    <Form.Item> Địa điểm giao hàng</Form.Item>
                    <span style={{ color: '#F5222D' }}></span>
                  </Col>
                  <Col span={16}>
                    <Form.Item name={'placeDelivery'}>
                      {context?.placeDelivery}
                    </Form.Item>
                  </Col>
                  <Divider className="divider-view" />
                  <Col span={1}></Col>
                  <Col span={7}>
                    <Form.Item> Địa điểm nhận hàng</Form.Item>
                    <span style={{ color: '#F5222D' }}></span>
                  </Col>
                  <Col span={16}>
                    <Form.Item name={'deliveryLocation'}>
                      {context?.deliveryLocation}
                    </Form.Item>
                  </Col>
                </Row>
                <Divider className="divider-view" />
                <Row style={{ paddingBottom: 15 }}>
                  <Col span={24}>
                    <KTTitle size={3}>
                      <b>Chất lượng hàng và bảo hành hàng hóa</b>
                    </KTTitle>
                  </Col>
                </Row>
                <Row>
                  <Col span={1}></Col>
                  <Col span={7}>
                    <Form.Item> Chất lượng hàng</Form.Item>
                    <span style={{ color: '#F5222D' }}></span>
                  </Col>
                  <Col span={16}>
                    <Form.Item name={'productQuality'}>
                      {context?.productQuality}
                    </Form.Item>
                  </Col>
                  <Divider className="divider-view" />
                  <Col span={1}></Col>
                  <Col span={7}>
                    <Form.Item> Quy định đổi hàng</Form.Item>
                    <span style={{ color: '#F5222D' }}></span>
                  </Col>
                  <Col span={16}>
                    <Form.Item name={'termsOfExchange'}>
                      {context?.termsOfExchange}
                    </Form.Item>
                  </Col>
                  <Divider className="divider-view" />
                  <Col span={1}></Col>
                  <Col span={7}>
                    <Form.Item>Bảo hành hàng hóa</Form.Item>
                    <span style={{ color: '#F5222D' }}></span>
                  </Col>
                  <Col span={16}>
                    <Form.Item name={'goodsWarranty'}>
                      {context?.goodsWarranty}
                    </Form.Item>
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

export default ConstractInfomation;
