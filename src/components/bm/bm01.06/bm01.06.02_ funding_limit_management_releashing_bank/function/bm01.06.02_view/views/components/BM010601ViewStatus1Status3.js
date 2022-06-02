import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Col, Row, Button, Form, Checkbox, Card, Divider } from 'antd';
import { LeftOutlined, EditFilled, DeleteFilled } from '@ant-design/icons';
import { KTTitle } from 'core/ui';

import { BM010601Domain } from '../../domains/BM010602ViewDomain';
import { FUNDING_LIMIT_STATUS } from '../../../../../../../../core/common/Constant';
const BM010601ViewContent = ({ lang = 'vi', ...props }) => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [context, domain] = BM010601Domain();

  useEffect(() => {
    console.log('context?.fundingLimit?.status');
    console.log(context?.fundingLimit?.status);
  }, [context]);

  return (
    <>
      <Row>
        <Col align="left" className="card-container" span={24}>
          <Card
            bordered={false}
            title={<KTTitle size={2}>Thông tin hạn mức</KTTitle>}
          >
            <Form layout="horizontal">
              <div className="steps-content">
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
                  <Col span={8}>
                    {context?.fundingLimit?.contractNumberLimit}
                  </Col>
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
                    Gửi yêu cầu hoàn trả{' '}
                    <span className={'text-require'}></span>
                  </Col>
                  <Col span={8}>{context?.fundingLimit?.requestARefund}</Col>
                </Row>
              </div>
              <Divider></Divider>
              <div className="steps-action">
                <Row className={'padding-md'}>
                  <Col span={12}>
                    <Button
                    onClick={(e) => domain.exitHandler()
                    }
                    >
                      <span>
                        <LeftOutlined />
                      </span>
                      Quay lại{' '}
                    </Button>
                  </Col>
                  <Col span={12}>
                    {context?.fundingLimit?.status ==
                      FUNDING_LIMIT_STATUS.TU_CHOI_DUYET && (
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
                    )}
                  </Col>
                </Row>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default BM010601ViewContent;
