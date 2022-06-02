import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Col, Row, Button, Form, Tabs, Card, Divider } from 'antd';
import { LeftOutlined, EditFilled, DeleteFilled } from '@ant-design/icons';
import { KTTitle } from 'core/ui';

import CommonInfo from './BM010601ViewStatus2.CommonInfo';
import DetailInfo from './BM010601ViewStatus2.DetailInfo';
// import { BM010601Domain } from '../../domains/BM010601ViewDomain';

const BM010601ViewContent = ({ lang = 'vi', ...props }) => {
  const { t } = useTranslation();
  const { id } = useParams();
  // const [context, domain] = BM010601Domain();
  const { TabPane } = Tabs;
  // useEffect(() => {
  //   console.log('context?.fundingLimit?.status');
  //   console.log(context?.fundingLimit?.status);
  // }, [context]);

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
                  <TabPane tab="Thông tin chung" key="0">
                    <CommonInfo />
                  </TabPane>
                  <TabPane tab="Chi tiết hạn mức" key="1">
                    <DetailInfo />
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

export default BM010601ViewContent;
