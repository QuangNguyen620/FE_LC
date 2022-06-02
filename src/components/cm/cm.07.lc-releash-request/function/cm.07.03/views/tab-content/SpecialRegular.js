import React, { useState } from 'react';
import { Col, Row, Input, Tabs } from 'antd';

import { useTranslation } from 'react-i18next';
import CustomerCommitment from './tab-content-special-regular/CustomerCommitment';
import PaymentAccountInstruction from './tab-content-special-regular/PaymentAccountInstruction';
import '../../../../component/less/CM.07.less';
const { TabPane } = Tabs;
const SpecialRegularContent = ({ lang = 'vi', ...props }) => {
  const { t } = useTranslation();
  const { TextArea } = Input;
  const dateFormatList = 'DD/MM/YYYY';

  function callback(key) {
    console.log(key);
  }

  return (
    <>
      <div style={{ background: 'white', borderRadius: '5px' }}>
        <Row style={{ padding: 16 }}>
          <Col span={24}>
            <Row>
              <Col span={23}>
                <Tabs defaultActiveKey="0" onChange={callback}>
                  <TabPane tab="Chỉ dẫn tài khoản thanh toán" key="0">
                    <PaymentAccountInstruction />
                  </TabPane>
                  <TabPane tab="Cam kết của khách hàng" key="1">
                    <CustomerCommitment />
                  </TabPane>
                </Tabs>
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
