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
import '../ViewCorporate.less';
import { CreateCorporateDomain } from '../../domains/ViewCorporateDomain';
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
                    <span style={{ color: '#F5222D' }}></span>
                  </Col>
                  <Col span={16}>
                    <Form.Item name={'serial'}>
                      {context?.corporate?.serial}
                    </Form.Item>
                  </Col>
                </Row>

                <Row>
                  <Col span={8}>
                    Chữ ký <span style={{ color: '#F5222D' }}></span>
                  </Col>
                  <Col span={16}>
                    <Form.Item name={'signature'}>
                      {context?.corporate?.signature}
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    Tên thuê bao <span style={{ color: '#F5222D' }}></span>
                  </Col>
                  <Col span={16}>
                    <Form.Item name={'subject'}>
                      {context?.corporate?.subject}
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    Thời gian <span style={{ color: '#F5222D' }}></span>
                  </Col>
                  <Col span={16}>
                    <Form.Item name={'signtime'}>
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
                      {context?.corporate?.certificate}
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    Ngày hiệu lực <span style={{ color: '#F5222D' }}></span>
                  </Col>
                  <Col span={16}>
                    <Form.Item name={'from'}>
                      {context?.corporate?.from}
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    Ngày hết hiệu lực <span style={{ color: '#F5222D' }}></span>
                  </Col>
                  <Col span={16}>
                    <Form.Item name={'to'}>{context?.corporate?.to}</Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    Hiệu lực
                    <span style={{ color: '#F5222D' }}></span>
                  </Col>
                  <Col span={16}>
                    <Form.Item name={'validity'}>
                      {context?.corporate?.validity}
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    Người phát hành
                    <span style={{ color: '#F5222D' }}></span>
                  </Col>
                  <Col span={16}>
                    <Form.Item name={'issuer'}>
                      {context?.corporate?.issuer}
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    MST
                    <span style={{ color: '#F5222D' }}></span>
                  </Col>
                  <Col span={16}>
                    <Form.Item name={'mst'}>
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
