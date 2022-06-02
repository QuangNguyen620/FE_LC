import React from 'react';
import { Col, Row } from 'antd';

import { useTranslation } from 'react-i18next';
import { CM1602Domain } from '../../../domains/CM.07.Domain';
const SpecialRegularContent = ({ lang = 'vi', ...props }) => {
  const { t } = useTranslation();
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
                    Tài khoản ký quỹ<span style={{ color: '#F5222D' }}></span>
                  </Col>
                  <Col span={16}>
                    <p>{context?.lcApplication?.holdAccount}</p>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    Tài khoản thu phí<span style={{ color: '#F5222D' }}></span>
                  </Col>
                  <Col span={16}>
                    <p>{context?.lcApplication?.feeAccount}</p>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    Tài khoản thanh toán
                    <span style={{ color: '#F5222D' }}></span>
                  </Col>
                  <Col span={16}>
                    <p>{context?.lcApplication?.paymentAccount}</p>
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

export default SpecialRegularContent;
