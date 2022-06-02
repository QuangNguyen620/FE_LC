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
  Radio,
} from 'antd';
import { KTTitle } from 'core/ui';
import { useTranslation } from 'react-i18next';
import {} from '@ant-design/icons';
import moment from 'moment';
// import { KTBodyText, KTButton, KTHeading, KTSubTitle, KTLogo } from 'core/ui';
// import ic_fis from 'assets/img/brand/logo_fis.png';
import '../CreateCorporate.less';
import { CreateCorporateDomain } from '../../domains/CreateCorporateDomain';
const { Option } = Select;

const RepresentationInfoContent = ({ lang = 'vi', ...props }) => {
  const { t } = useTranslation();
  const [context, domain] = CreateCorporateDomain();
  const dateFormatList = 'DD/MM/YYYY';


  return (
    <>
      <div style={{ background: 'white', borderRadius: '5px' }}>
        <Row style={{ padding: 16 }}>
          <Col span={24}>
            <Row style={{ paddingBottom: 15 }}>
              <Col span={24}>
                <KTTitle size={3}>
                  <b>Thông tin chữ ký số</b>
                </KTTitle>
              </Col>
            </Row>
            <Row>
              <Col span={23}>
                <Row>
                  <Col span={8}>
                    Serial
                    <span style={{ color: '#F5222D' }}>*</span>
                  </Col>
                  <Col span={16}>
                    <Form.Item name={'serial'}>
                      {/* <Input
                        disabled
                        name="serial"
                        onChange={(e) => domain.onSerialChange(e)}
                      /> */}
                      {context?.corporate?.serial}
                    </Form.Item>
                  </Col>
                </Row>

                <Row>
                  <Col span={8}>
                    Chữ ký <span style={{ color: '#F5222D' }}>*</span>
                  </Col>
                  <Col span={16}>
                    <Form.Item name={'signature'}>
                      {/* <Input
                        name="signature"
                        disabled
                        onChange={(e) => domain.onSignatureChange(e)}
                      /> */}
                      {context?.corporate?.signature}
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    Tên thuê bao <span style={{ color: '#F5222D' }}>*</span>
                  </Col>
                  <Col span={16}>
                    <Form.Item name={'subject'}>
                      {/* <Input
                        name="subject"
                        onChange={(e) => domain.onSubjectChange(e)}
                        disabled
                      /> */}
                      {context?.corporate?.subject}
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    Thời gian <span style={{ color: '#F5222D' }}>*</span>
                  </Col>
                  <Col span={16}>
                    <Form.Item name={'signtime'}>
                      {/* <Input
                        name="signtime"
                        onChange={(e) => domain.onSignTimeChange(e)}
                        disabled
                      /> */}
                      {context?.corporate?.signtime}
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    Chứng chỉ <span style={{ color: '#F5222D' }}></span>
                  </Col>
                  <Col span={16}>
                    <Form.Item name={'certificate'}>
                      {/* <Input
                        name="certificate"
                        onChange={(e) => domain.onCertificateChange(e)}
                        disabled
                      /> */}
                      {context?.corporate?.certificate}
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    Ngày hiệu lực <span style={{ color: '#F5222D' }}>*</span>
                  </Col>
                  <Col span={16}>
                    <Form.Item name={'from'}>
                      {/* <Input
                        name="from"
                        onChange={(e) => domain.onFromDateChange(e)}
                        disabled
                      /> */}
                      {context?.corporate?.from}
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    Ngày hết hiệu lực{' '}
                    <span style={{ color: '#F5222D' }}>*</span>
                  </Col>
                  <Col span={16}>
                    <Form.Item name={'to'}>
                      {/* <Input
                        name="to"
                        onChange={(e) => domain.onToDateChange(e)}
                        disabled
                      /> */}
                      {context?.corporate?.to}
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    Hiệu lực
                    <span style={{ color: '#F5222D' }}>*</span>
                  </Col>
                  <Col span={16}>
                    <Form.Item
                      name={'validity'}
                      // rules={[
                      //   {
                      //     required: true,
                      //     message: 'Trường quốc tịch không được phép để trống!',
                      //   },
                      // ]}
                    >
                      {/* <Input
                        name="validity"
                        onChange={(e) => domain.onValidityChange(e)}
                        disabled
                      /> */}
                      {context?.corporate?.validity}
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    Người phát hành
                    <span style={{ color: '#F5222D' }}>*</span>
                  </Col>
                  <Col span={16}>
                    <Form.Item
                      name={'issuer'}
                      // rules={[
                      //   {
                      //     required: true,
                      //     message: 'Trường quốc tịch không được phép để trống!',
                      //   },
                      // ]}
                    >
                      {/* <Input
                        name="issuer"
                        onChange={(e) => domain.onIssuerChange(e)}
                        disabled
                      /> */}
                      {context?.corporate?.issuer}
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    MST
                    <span style={{ color: '#F5222D' }}>*</span>
                  </Col>
                  <Col span={16}>
                    <Form.Item name={'mst'}>
                      {/* <Input
                        name="mst"
                        onChange={(e) => domain.onMSTChange(e)}
                        disabled
                      /> */}
                      {context?.corporate?.mst}
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

export default RepresentationInfoContent;
