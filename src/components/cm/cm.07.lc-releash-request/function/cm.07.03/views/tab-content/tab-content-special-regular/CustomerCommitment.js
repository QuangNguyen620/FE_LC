import React from 'react';
import { Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { CM1602Domain } from '../../../domains/CM.07.Domain';
const CustomerCommitment = ({ lang = 'vi', ...props }) => {
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
                    Cam kết của khách hành
                    <span style={{ color: '#F5222D' }}></span>
                  </Col>
                  <Col span={16}>
                    <p>{context?.lcApplication?.commitmentCustomer}</p>
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

export default CustomerCommitment;
