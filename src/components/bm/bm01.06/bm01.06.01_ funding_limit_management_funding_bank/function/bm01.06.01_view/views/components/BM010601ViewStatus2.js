import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Col, Row, Button, Form, Tabs, Card, Divider } from 'antd';
import { LeftOutlined, EditFilled, DeleteFilled } from '@ant-design/icons';
import { KTTitle } from 'core/ui';

import { BM010601Domain } from '../../domains/BM010601ViewDomain';
import FundingLimitInfo from './tab-content-status-2/bm.01.06.01.view_funding_limit_info/BM010601ViewStatus2FundingLimitInfor';
import FundingLimitHistoryChange from '../components/tab-content-status-2/bm.01.06.01.view_funding_change_history/BM010601ViewStatus2ChangeHistory';

const BM010601ViewContent = ({ lang = 'vi', ...props }) => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [context, domain] = BM010601Domain();
  const { TabPane } = Tabs;
  useEffect(() => {
    console.log('context?.fundingLimit?.status');
    console.log(context?.fundingLimit?.status);
  }, [context]);

  function callback(key) {
    console.log(key);
  }
  return (
    <>
      <Row>
        <Col align="left" className="card-container" span={24}>
          <Card
            bordered={false}
            title={<KTTitle size={2}>Hạn mức tài trợ</KTTitle>}
          >
            <div className="steps-content">
              <Row>
                <Col span={24}>
                  <Tabs defaultActiveKey="0" onChange={callback}>
                    <TabPane tab="Thông tin hạn mức" key="0">
                      <FundingLimitInfo />
                    </TabPane>
                    <TabPane tab="Lịch sử thay đổi hạn mức" key="1">
                      <FundingLimitHistoryChange />
                    </TabPane>
                  </Tabs>
                </Col>
              </Row>
            </div>
            <Divider></Divider>
            <div className="steps-action">
              <Row className={'padding-md'}>
                <Col span={12}>
                  <Button onClick={(e) => domain.exitHandler()}>
                    <span>
                      <LeftOutlined />
                    </span>
                    Quay lại{' '}
                  </Button>
                </Col>
                <Col span={12}>
                  <div>
                    <Button
                      onClick={(e) => domain.editHandler(id)}
                      className="right-step-action common-btn"
                    >
                      Chỉnh sửa{' '}
                      <span style={{ marginLeft: '5px' }}>
                        <EditFilled />
                      </span>
                    </Button>
                    <Button
                      className="right-step-action delete-btn"
                      style={{ marginRight: '9px' }}
                      onClick={(e) => domain.openCancelModal()}
                    >
                      Hủy hạn mức{' '}
                      <span style={{ marginLeft: '5px' }}>
                        <DeleteFilled />
                      </span>
                    </Button>
                  </div>
                </Col>
              </Row>
            </div>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default BM010601ViewContent;
