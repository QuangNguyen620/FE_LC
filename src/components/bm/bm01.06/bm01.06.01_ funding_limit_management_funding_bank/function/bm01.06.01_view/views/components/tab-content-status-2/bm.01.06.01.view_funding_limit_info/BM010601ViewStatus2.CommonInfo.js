import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Col, Row, Button, Form, Tabs, Card, Divider } from 'antd';
import { LeftOutlined, EditFilled, DeleteFilled } from '@ant-design/icons';
import { KTTitle } from 'core/ui';

import { BM010601Domain } from '../../../../domains/BM010601ViewDomain';

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
      <div style={{ background: 'white', borderRadius: '5px' }}>
        <Row style={{ padding: 16 }}>
          <Col span={24}>
            <Row>
              <Col span={5}>
                Ngân hàng phát hành <span className={'text-require'}></span>
              </Col>
              <Col span={8}>{context?.fundingLimit?.releaseBank}</Col>
            </Row>
            <Divider></Divider>
            <Row>
              <Col span={5}>
                Loại hạn mức <span className={'text-require'}></span>
              </Col>
              <Col span={8}>{context?.fundingLimit?.typeLimit}</Col>
            </Row>
            <Divider></Divider>
            <Row>
              <Col span={5}>
                Số hợp đồng hạn mức <span className={'text-require'}></span>
              </Col>
              <Col span={8}>{context?.fundingLimit?.contractNumberLimit}</Col>
            </Row>
            <Divider></Divider>
            <Row>
              <Col span={5}>
                Ngày cấp hạn mức <span className={'text-require'}></span>
              </Col>
              <Col span={8}>{context?.fundingLimit?.dateRange}</Col>
            </Row>
            <Divider></Divider>
            <Row>
              <Col span={5}>
                Ngày hết hạn <span className={'text-require'}></span>
              </Col>
              <Col span={8}>{context?.fundingLimit?.expirationDate}</Col>
            </Row>
            <Divider></Divider>
            <Row>
              <Col span={5}>
                Tổng hạn mức <span className={'text-require'}></span>
              </Col>
              <Col span={8}>{context?.fundingLimit?.totalLimit}</Col>
            </Row>
            <Divider></Divider>
            <Row>
              <Col span={5}>
                Loại tiền <span className={'text-require'}></span>
              </Col>
              <Col span={8}>{context?.fundingLimit?.moneyType}</Col>
            </Row>
            <Divider></Divider>
            <Row>
              <Col span={5}>
                Miêu tả các giao dịch thuộc hạn mức{' '}
                <span className={'text-require'}></span>
              </Col>
              <Col span={8}>
                {context?.fundingLimit?.descriptionOfTransactions}
              </Col>
            </Row>
            <Divider></Divider>
            <Row>
              <Col span={5}>
                Gửi yêu cầu hoàn trả <span className={'text-require'}></span>
              </Col>
              <Col span={8}>{context?.fundingLimit?.requestARefund}</Col>
            </Row>
            <Divider></Divider>
          </Col>
        </Row>
        <Card type="inner" title="Hạn mức khả dụng">
          <Row>
            <Col span={5}>
              Hạn mức khoanh<span className={'text-require'}></span>
            </Col>
            <Col span={8}>{context?.fundingLimit?.totalZoningLimit}</Col>
          </Row>
          <Divider></Divider>
          <Row>
            <Col span={5}>
              Hạn mức cam kêt<span className={'text-require'}></span>
            </Col>
            <Col span={8}>{context?.fundingLimit?.totalZoningLimit}</Col>
          </Row>
          <Divider></Divider>
          <Row>
            <Col span={5}>
              Tổng số tiền giải ngân<span className={'text-require'}></span>
            </Col>
            <Col span={8}>{context?.fundingLimit?.totalDisbursementAmount}</Col>
          </Row>
          <Divider></Divider>
          <Row>
            <Col span={5}>
              Tổng số tiền trả nợ<span className={'text-require'}></span>
            </Col>
            <Col span={8}>{context?.fundingLimit?.totalRepaymentAmount}</Col>
          </Row>
          <Divider></Divider>
          <Row>
            <Col span={5}>
              Hạn mức khả dụng<span className={'text-require'}></span>
            </Col>
            <Col span={8}>{context?.fundingLimit?.availabilityLimit}</Col>
          </Row>
          <Divider></Divider>
        </Card>
      </div>
    </>
  );
};

export default BM010601ViewContent;
