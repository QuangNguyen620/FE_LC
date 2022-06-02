import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Col, Row, Form, Card } from 'antd';

import {} from '@ant-design/icons';
import { KTTitle } from 'core/ui';
import log from '../ModuleLogger';
import { FUNDING_LIMIT_STATUS } from '../../../../../../../core/common/Constant';
import '../../../common/less/BM010301.less';
import { BM010601Domain } from '../domains/BM010601ViewDomain';
import BM010601ViewStatus1Status3 from './components/BM010601ViewStatus1Status3';
import BM010601ViewStatus2 from './components/BM010601ViewStatus2';
import CancelLimittModal from 'components/bm/bm01.06/bm01.06.01_ funding_limit_management_funding_bank/common/modal/cancel/CancelLimitModal';

const BM010601ViewContent = ({ lang = 'vi', ...props }) => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [context, domain] = BM010601Domain();
  const [form] = Form.useForm();
  useEffect(() => {
    domain.initDomain(id);
    domain.getDetail(id);
  }, []);

  useEffect(() => {
    log.debug('useEffect--', context);
  }, [context]);

  const cancelHandler = () => {
    domain.cancelHandler(id);
  };

  return (
    <>
      <CancelLimittModal
        isVisbled={context?.cancelDialogVisible}
        onClose={domain.closeCancelModal}
        onCloseModal={domain.closeCancelModal}
        cancelHandler={cancelHandler}
      />
      <div className={'main-container'}>
        {(context?.fundingLimit?.status == FUNDING_LIMIT_STATUS.CHO_DUYET ||
          context?.fundingLimit?.status ==
            FUNDING_LIMIT_STATUS.TU_CHOI_DUYET) && (
          <div>
            <Form
              form={form}
              // onFinish={domain.createApplicationOpeningLc}
              layout="horizontal"
            >
              <BM010601ViewStatus1Status3 form={form} />
            </Form>
          </div>
        )}
        {context?.fundingLimit?.status == FUNDING_LIMIT_STATUS.DA_DUYET && (
          <div>
            <Form
              form={form}
              // onFinish={domain.createApplicationOpeningLc}
              layout="horizontal"
            >
              <BM010601ViewStatus2 form={form} />
            </Form>
          </div>
        )}
      </div>
      {context?.fundingLimit?.status == FUNDING_LIMIT_STATUS.TU_CHOI_DUYET && (
        <div
          className="reject-reason-container"
          style={{
            background: 'white',
            borderRadius: '5px',
            marginTop: 41,
          }}
        >
          <Row style={{ padding: 16 }}>
            <Col align="left" className="card-container" span={24}>
              <Card
                bordered={false}
                title={<KTTitle size={2}>Lý do từ chối</KTTitle>}
              >
                <Row gutter={24} style={{ padding: 16 }}>
                  <Col span={24}>
                    <Row>
                      <Col span={5}>
                        Lý do từ chối
                        <span style={{ color: '#F5222D' }}></span>
                      </Col>
                      <Col span={16}>
                        <Form.Item name={'reasonForRefusal'}>
                          {context?.fundingLimit?.reasonForRefusal}
                        </Form.Item>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </div>
      )}
    </>
  );
};

export default BM010601ViewContent;
