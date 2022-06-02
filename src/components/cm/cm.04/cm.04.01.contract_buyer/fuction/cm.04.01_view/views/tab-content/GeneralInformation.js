import React, { useEffect, useState } from 'react';
import { Col, Row, Input, Form, Select, DatePicker, Tabs, Divider } from 'antd';
import { KTTitle } from 'core/ui';
import { useTranslation } from 'react-i18next';
import {} from '@ant-design/icons';
import '../../../../components/less/CM.04.01.less';

import ConstractInfomation from './ConstractInfomation';
import ContractProduct from './ContractProduct';
import DeliveryInformation from './DeliveryInformation';
import PaymentInformation from './PaymentInformation';
import OtherInformation from './OtherInformation';
import ContractAdendum from './ContractAdendum';

import { useCM0401Domain } from '../../domains/CM.04.01Domain';

const { TabPane } = Tabs;

const GeneralInformation = ({ lang = 'vi' }) => {
  const [context, domain] = useCM0401Domain();

  return (
    <>
      <div>
        <Row>
          <Col span={24}>
            <Tabs defaultActiveKey="1" type="card" className="tabs-style-view">
              <TabPane tab="Thông tin chung" key="1">
                <ConstractInfomation />
              </TabPane>
              <TabPane tab="Thông tin hàng hóa" key="2">
                <ContractProduct />
              </TabPane>
              <TabPane tab="Thông tin giao hàng" key="3">
                <DeliveryInformation />
              </TabPane>
              <TabPane tab="Thông tin thanh toán" key="4">
                <PaymentInformation />
              </TabPane>
              <TabPane tab="Thông tin khác" key="5">
                <OtherInformation />
              </TabPane>
            </Tabs>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default GeneralInformation;
