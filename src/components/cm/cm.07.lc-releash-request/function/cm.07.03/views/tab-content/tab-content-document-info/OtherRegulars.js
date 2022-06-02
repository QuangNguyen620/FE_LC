import React, { useState } from 'react';
import { Col, Row, Input, Button, Form, Select, Space } from 'antd';
import { KTTitle } from 'core/ui';
import { useTranslation } from 'react-i18next';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { CM1602Domain } from '../../../domains/CM.07.Domain';
const OtherRegulars = ({ lang = 'vi', ...props }) => {
  const { t } = useTranslation();
  const { TextArea } = Input;
  const dateFormatList = 'DD/MM/YYYY';
  const [form] = Form.useForm();
  const [context, domain] = CM1602Domain();
  return (
    <>
      <div style={{ background: 'white', borderRadius: '5px' }}>
        <Row style={{ padding: 16 }}>
          <Col span={24}>
            <Row>
              <Col span={23}>
                <Row>
                  <Col span={8}>
                    Thời gian xuất trình
                    <span style={{ color: '#F5222D' }}></span>
                  </Col>
                  <Col span={16}>
                    <p>{context?.lcApplication?.periodForPresentation}</p>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    Đòi tiền bằng điện
                    <span style={{ color: '#F5222D' }}></span>
                  </Col>
                  <Col span={16}>
                    <p>{context?.lcApplication?.ttReimbursement}</p>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    Điều kiện khác <span style={{ color: '#F5222D' }}></span>
                  </Col>
                  <Col span={16}>
                    <p>{context?.lcApplication?.otherCondition}</p>
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

export default OtherRegulars;
