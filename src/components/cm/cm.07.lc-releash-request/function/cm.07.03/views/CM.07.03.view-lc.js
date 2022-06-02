/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Col,
  Row,
  Button,
  Form,
  Tabs,
  Card,
  Divider,
  message,
  Spin,
} from 'antd';
import {
  LeftOutlined,
  CheckCircleFilled,
  LogoutOutlined,
  FileTextOutlined,
  DeleteFilled,
  EditFilled,
  EyeFilled,
} from '@ant-design/icons';

import '../../../component/less/CM.07.less';
import '../../../../../../assets/less/LC-common.less';
import { CM1602Domain } from '../domains/CM.07.Domain';
import CommonInfoContent from './tab-content/CommonInfo';
import PaymentInfoContent from './tab-content/PaymentInfo';
import ShipmentContent from './tab-content/Shipment';
import DocumentContent from './tab-content/DocumentPresent';
import SpecialRegularContent from './tab-content/SpecialRegular';
import CancelLCRequestModal from 'components/cm/cm.07.lc-releash-request/component/modal/cancel/CancelCRequestModal';

import log from '../ModuleLogger';
import { LC_STATUS } from '../../../../../../core/common/Constant';
import { useParams } from 'react-router-dom';
import { KTTitle } from 'core/ui';

const CM0703View = ({ lang = 'vi', ...props }) => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [context, domain] = CM1602Domain();
  const { TabPane } = Tabs;
  const [form] = Form.useForm();

  function callback(key) {
    console.log(key);
  }

  useEffect(() => {
    domain.initDomain();
    domain.getLCApplicationRequest(id);
  }, []);

  useEffect(() => {
    console.log(context?.goodTypeList);
  }, [context]);

  const cancelHandler = () => {
    domain.cancelHandler(id, context?.lcApplication?.lcType);
  };

  return (
    <>
      <CancelLCRequestModal
        isVisbled={context?.cancelDialogVisible}
        onClose={domain.closeCancelModal}
        onCloseModal={domain.closeCancelModal}
        cancelHandler={cancelHandler}
      />
      <Spin Spin size="large" spinning={context?.loading}>
        <div
          className="lc-application-container"
          style={{ background: 'white', borderRadius: '5px' }}
        >
          <Row style={{ padding: 16 }}>
            <Col align="left" className="card-container" span={24}>
              <Card
                // className="custom-card"
                bordered={false}
                title={<KTTitle size={2}>Đề nghị phát hành L/C</KTTitle>}
              >
                <Form
                  form={form}
                  // onFinish={domain.createApplicationOpeningLc}
                  layout="horizontal"
                >
                  <div className="steps-content">
                    <Row>
                      <Col span={24}>
                        <Tabs defaultActiveKey="0" onChange={callback}>
                          <TabPane tab="Thông tin chung" key="0">
                            <CommonInfoContent form={form} />
                          </TabPane>
                          <TabPane tab="Thông tin thanh toán" key="1">
                            <PaymentInfoContent form={form} />
                          </TabPane>
                          <TabPane tab="Thông tin giao hàng" key="2">
                            <ShipmentContent />
                          </TabPane>
                          <TabPane tab="Chứng từ xuất trình" key="3">
                            <DocumentContent />
                          </TabPane>
                          <TabPane tab="Điều khoản đặc biệt" key="4">
                            <SpecialRegularContent />
                          </TabPane>
                        </Tabs>
                      </Col>
                    </Row>
                  </div>
                  <Divider></Divider>
                  <div className="steps-action">
                    <Row className={'padding-md'}>
                      <Col span={12}>
                        <Button
                          onClick={(e) => {
                            domain.exitHandler(e);
                          }}
                        >
                          <span>
                            <LeftOutlined />
                          </span>
                          Quay lại
                        </Button>
                      </Col>
                      <Col span={12}>
                        {(context?.lcApplication?.status ==
                          LC_STATUS.KHOI_TAO ||
                          context?.lcApplication?.status ==
                            LC_STATUS.TU_CHOI_KY_SO ||
                          context?.lcApplication?.status ==
                            LC_STATUS.TU_CHOI_DRAFT ||
                          context?.lcApplication?.status ==
                            LC_STATUS.TU_CHOI_TAI_TRO ||
                          context?.lcApplication?.status ==
                            LC_STATUS.TU_CHOI_BAO_GIA) && (
                          <div>
                            <Button
                              onClick={(_e) => domain.toEditPage(id)}
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
                              onClick={(_e) => domain.openCancelModal()}
                            >
                              Hủy đề nghị{' '}
                              <span style={{ marginLeft: '5px' }}>
                                <DeleteFilled />
                              </span>
                            </Button>
                          </div>
                        )}
                        {context?.lcApplication?.status ==
                          LC_STATUS.CHAP_NHAN_BAO_GIA && (
                          <div>
                            <Button
                              onClick={(_e) => {
                                domain.toCAPage(id);
                              }}
                              className="common-btn right-step-action"
                            >
                              Chuyển ký số
                              <span style={{ marginLeft: '5px' }}>
                                <CheckCircleFilled />
                              </span>
                            </Button>
                            <Button
                              className=" right-step-action"
                              style={{ marginRight: '9px' }}
                              onClick={() =>
                                message.success('Processing complete!')
                              }
                            >
                              Gửi yêu cầu tạo Draft L/C
                              <span style={{ marginLeft: '5px' }}>
                                <LogoutOutlined />
                              </span>
                            </Button>
                            <Button
                              style={{ marginRight: '9px' }}
                              className=" right-step-action"
                              onClick={() =>
                                message.success('Processing complete!')
                              }
                            >
                              Tạo Draft L/C
                              <span style={{ marginLeft: '5px' }}>
                                <FileTextOutlined />
                              </span>
                            </Button>
                          </div>
                        )}
                        {(context?.lcApplication?.status ==
                          LC_STATUS.CHO_KY_SO_KE_TOAN_TRUONG ||
                          context?.lcApplication?.status ==
                            LC_STATUS.CHO_KY_SO_DOANH_NGHIEP ||
                          context?.lcApplication?.status ==
                            LC_STATUS.DA_KY_SO ||
                          context?.lcApplication?.status ==
                            LC_STATUS.TU_CHOI_XU_LY ||
                          context?.lcApplication?.status ==
                            LC_STATUS.DA_XU_LY) && (
                          <div>
                            <Button
                              onClick={(_e) => {
                                domain.toCAPage(id);
                              }}
                              className="common-btn right-step-action"
                            >
                              Xem file ký số
                              <span style={{ marginLeft: '5px' }}>
                                <EyeFilled />
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
        </div>
        {(context?.lcApplication?.status == LC_STATUS.TU_CHOI_KY_SO ||
          context?.lcApplication?.status == LC_STATUS.TU_CHOI_XU_LY) && (
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
                        <Col span={8}>
                          Lý do từ chối
                          <span style={{ color: '#F5222D' }}></span>
                        </Col>
                        <Col span={16}>
                          <Form.Item name={'reasonForRefusal'}>
                            {context?.lcApplication?.reasonForRefusal}
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
      </Spin>
    </>
  );
};

export default CM0703View;
