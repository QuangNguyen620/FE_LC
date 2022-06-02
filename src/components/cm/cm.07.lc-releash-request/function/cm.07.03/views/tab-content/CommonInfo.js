import React, { useState, useEffect } from 'react';
import {
  Col,
  Row,
  Input,
  Button,
  Form,
  Select,
  Space,
  DatePicker,
  Radio,
  Tabs,
} from 'antd';
import { KTTitle } from 'core/ui';
import moment from 'moment';
import '../../../../component/less/CM.07.less';
import ContractInfo from '../tab-content/tab-content-common-info/ContractInfo';
import LCApplicationInfo from '../tab-content/tab-content-common-info/LCApplicationInfo';
const { Option } = Select;
const { TabPane } = Tabs;
const CommonInfoContent = ({ lang = 'vi', ...props }) => {
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
                  <TabPane tab="Thông tin hợp đồng" key="0">
                    <ContractInfo />
                  </TabPane>
                  <TabPane tab="Thông tin đề nghị phát hành L/C" key="1">
                    <LCApplicationInfo />
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

export default CommonInfoContent;
