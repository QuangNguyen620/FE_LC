import React, { useState } from 'react';
import {
  Col,
  Row,
  Input,
  Button,
  Form,
  Select,
  Checkbox,
  DatePicker,
  Table,
  Popconfirm,
  Typography,
  InputNumber,
  Space,
  Divider,
} from 'antd';
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { KTTitle } from 'core/ui';
import { useTranslation } from 'react-i18next';
import {} from '@ant-design/icons';
import moment from 'moment';
import '../../../../components/less/CM.04.01.less';
import { useCM0401Domain } from '../../domains/CM.04.01Domain';

const { Option } = Select;
const CheckboxGroup = Checkbox.Group;
const originData = [];

const ConstractInfomation = ({ lang = 'vi' }) => {
  const [context, domain] = useCM0401Domain();
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const dateFormatList = 'DD/MM/YYYY';

  // thay đổi với các input type = date;
  function onChangeConstractText(e) {
    //console.log(e);
    domain.onChangeConstractText(e);
  }

  // thay đổi với các input type = date;
  function onChangeConstractDate(e) {
    domain.onChangeConstractDate(this.name, e);
  }

  return (
    <>
      <div className="content-step">
        <Row>
          <Col span={24}>
            <KTTitle size={3}>
              <b>Thông tin giao hàng</b>
            </KTTitle>
          </Col>
          <Divider />
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
                  <Col span={8}>
                    Phương tiện giao hàng
                    <span style={{ color: '#F5222D' }}></span>
                  </Col>
                  <Col span={16}>
                    <Form.Item
                      name={'deliveryVehicle'}
                      rules={[
                        {
                          max: 500,
                          message:
                            'Trường địa điểm giao hàng không được phép vượt quá 500 ký tự!',
                        },
                      ]}
                    >
                      <Input
                        name="deliveryVehicle"
                        onChange={onChangeConstractText}
                        maxLength={500}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    Thời hạn giao hàng
                    <span style={{ color: '#F5222D' }}></span>
                  </Col>
                  <Col span={16}>
                    <Form.Item
                      name={'deliveryTerm'}
                      rules={[
                        {
                          max: 300,
                          message:
                            'Trường thời hạn giao hàng không được phép vượt quá 300 ký tự!',
                        },
                      ]}
                    >
                      <Input
                        name="deliveryTerm"
                        onChange={onChangeConstractText}
                        maxLength={300}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    Hạn giao hàng
                    <span style={{ color: '#F5222D' }}></span>
                  </Col>
                  <Col span={16}>
                    {context?.deliveryTerm?.trim() == '' ||
                    context?.deliveryTerm == null ? (
                      <Form.Item
                        name={'deliveryDeadline'}
                        rules={[
                          {
                            required: true,
                            message:
                              'Trường hạn giao hàng không được phép để trống!',
                          },
                        ]}
                      >
                        <DatePicker
                          name="deliveryDeadline"
                          style={{ width: '100%' }}
                          // defaultValue={moment('01/01/2015')}
                          format={dateFormatList}
                          placeholder="Chọn ngày cấp"
                          onChange={onChangeConstractDate}
                        />
                      </Form.Item>
                    ) : (
                      <Form.Item name={'deliveryDeadline'}>
                        <DatePicker
                          name="deliveryDeadline"
                          style={{ width: '100%' }}
                          // defaultValue={moment('01/01/2015')}
                          format={dateFormatList}
                          // placeholder="Chọn ngày cấp"
                          onChange={onChangeConstractDate}
                          // value={user1DeputyIdentifyCreatedDate}
                        />
                      </Form.Item>
                    )}
                  </Col>
                </Row>

                <Row>
                  <Col span={8}>
                    Địa điểm giao hàng
                    <span style={{ color: '#F5222D' }}>*</span>
                  </Col>
                  <Col span={16}>
                    <Form.Item
                      name={'placeDelivery'}
                      rules={[
                        {
                          whitespace: true,
                          required: true,
                          message:
                            'Trường địa điểm giao hàng không được phép để trống!',
                        },
                        {
                          max: 100,
                          message:
                            'Trường địa điểm giao hàng không được phép vượt quá 100 ký tự!',
                        },
                      ]}
                    >
                      <Input
                        name="placeDelivery"
                        onChange={onChangeConstractText}
                        maxLength={100}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    Địa điểm nhận hàng
                    <span style={{ color: '#F5222D' }}>*</span>
                  </Col>
                  <Col span={16}>
                    <Form.Item
                      name={'deliveryLocation'}
                      rules={[
                        {
                          whitespace: true,
                          required: true,
                          message:
                            'Trường địa điểm nhận hàng không được phép để trống!',
                        },
                        {
                          max: 100,
                          message:
                            'Trường địa điểm nhận hàng không được phép vượt quá 100 ký tự!',
                        },
                      ]}
                    >
                      <Input
                        name="deliveryLocation"
                        onChange={onChangeConstractText}
                        maxLength={100}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row style={{ paddingBottom: 15 }}>
                  <Col span={24}>
                    <KTTitle size={3}>
                      <b>Chất lượng hàng và bảo hành hàng hóa</b>
                    </KTTitle>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    Chất lượng hàng
                    <span style={{ color: '#F5222D' }}></span>
                  </Col>
                  <Col span={16}>
                    <Form.Item
                      name={'productQuality'}
                      rules={[
                        {
                          max: 300,
                          message:
                            'Trường chất lượng hàng không được phép vượt quá 300 ký tự!',
                        },
                      ]}
                    >
                      <Input
                        name="productQuality"
                        onChange={onChangeConstractText}
                        maxLength={300}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    Quy định đổi hàng
                    <span style={{ color: '#F5222D' }}></span>
                  </Col>
                  <Col span={16}>
                    <Form.Item
                      name={'termsOfExchange'}
                      rules={[
                        {
                          max: 300,
                          message:
                            'Trường quy định đổi hàng không được phép vượt quá 300 ký tự!',
                        },
                      ]}
                    >
                      <Input
                        name="termsOfExchange"
                        onChange={onChangeConstractText}
                        maxLength={300}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    Bảo hành hàng hóa
                    <span style={{ color: '#F5222D' }}></span>
                  </Col>
                  <Col span={16}>
                    <Form.Item
                      name={'goodsWarranty'}
                      rules={[
                        {
                          max: 300,
                          message:
                            'Trường bảo hành hàng hóa không được phép vượt quá 300 ký tự!',
                        },
                      ]}
                    >
                      <Input
                        name="goodsWarranty"
                        onChange={onChangeConstractText}
                        maxLength={300}
                      />
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
