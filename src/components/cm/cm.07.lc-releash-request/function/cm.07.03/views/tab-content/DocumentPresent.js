import React, { useState } from 'react';
import { Col, Row, Input, Button, Form, Select, Space, Tabs } from 'antd';
import { KTTitle } from 'core/ui';
import { useTranslation } from 'react-i18next';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import moment from 'moment';
import '../../../../component/less/CM.07.less';
import LicenseInfoContent from './tab-content-document-info/LicenseInfo';
import OtherRegulars from './tab-content-document-info/OtherRegulars';
const { TabPane } = Tabs;
const DocumentContent = ({ lang = 'vi', ...props }) => {
  const { t } = useTranslation();

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
                  <TabPane tab="Thông tin chứng từ" key="0">
                    <LicenseInfoContent />
                  </TabPane>
                  <TabPane tab="Điều kiện khác" key="1">
                    <OtherRegulars />
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

export default DocumentContent;
