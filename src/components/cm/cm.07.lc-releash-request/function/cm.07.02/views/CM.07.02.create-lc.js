import React, { useState, useEffect } from 'react';

import {
  Col,
  Row,
  Card,
  Button,
  Form,
  Space,
  Spin,
  Steps,
  message,
} from 'antd';
import {
  LeftOutlined,
  RightOutlined,
  CheckCircleFilled,
  LogoutOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import moment from 'moment';
import log from '../views/ModuleLogger';
import '../../../component/less/CM.07.less';
import '../../../../../../assets/less/LC-common.less';
import { CM0702Domain } from '../domains/CM0702Domain';
import { useHistory } from 'react-router';
import CommonInfoContent from './step-content/CommonInfoContent';
import PurchaseInfoContent from './step-content/PurchaseInfo';
import ShipmentContent from './step-content/Shipment';
import DocumentContent from './step-content/DocumentPresent';
import SpecialRegularContent from './step-content/SpecialRegular';

const { Step } = Steps;
const CM0702View = ({ _lang = 'vi', ..._props }) => {
  const [context, domain] = CM0702Domain();
  const [form] = Form.useForm();
  const history = useHistory();

  useEffect(() => {
    domain.initDomain();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    log.debug('useEffect--', context);
  }, [context]);

  const dateFormatList = 'DD/MM/YYYY';

  const [current, setCurrent] = useState(0);

  const next = () => {
    form
      .validateFields()
      .then(() => {
        setCurrent(current + 1);
      })
      .catch((err) => console.log(err));
  };

  const onChange = (currentStep) => {
    form
      .validateFields()
      .then(() => {
        setCurrent(currentStep);
      })
      .catch((err) => console.log(err));
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const onExit = () => {
    history.push('/cm-home/lc-request-manage');
  };

  const steps = [
    {
      title: 'Thông tin chung',
      content: <CommonInfoContent form={form} />,
    },
    {
      title: 'Thông tin thanh toán',
      content: <PurchaseInfoContent form={form} />,
    },
    {
      title: 'Thông tin giao hàng',
      content: <ShipmentContent form={form} />,
    },
    {
      title: 'Chứng từ xuất trình',
      content: <DocumentContent form={form} />,
    },
    {
      title: 'Các điều khoản đặc biệt',
      content: <SpecialRegularContent form={form} />,
    },
  ];

  useEffect(() => {
    form.setFieldsValue({
      contractType: context?.lcRequest?.contractType,
      contractNumber: context?.lcRequest?.contractNumber,
      bankConfirmAddress: context?.lcRequest?.bankConfirmAddress,
      lcTypeText: context?.onlyForDisplay?.lcType,
      corporateBuy: context?.onlyForDisplay?.corporateBuy,
      corporateBuyAddress: context?.lcRequest?.corporateBuyAddress,
      corporateBuyText: context?.onlyForDisplay?.corporateBuy,
      corporateBuyAddressText: context?.onlyForDisplay?.corporateBuyAddress,
      corporateSellText: context?.onlyForDisplay?.corporateSell,
      corporateSellAddressText: context?.onlyForDisplay?.corporateSellAddress,
      corporateSellAddress: context?.lcRequest?.corporateSellAddress,
      //step 2
      paymentAmount: context?.lcRequest?.paymentAmount,
      fee: context?.lcRequest?.fee,
      //step 3,
      placeOfReceipt: context?.lcRequest?.placeOfReceipt,
      placeOfDestination: context?.lcRequest?.placeOfDestination,

      lastestDeliveryDateContract1: moment(
        context?.lcRequest?.lastestDeliveryDate,
        dateFormatList,
      ),
      deliveryTimeContract1: context?.lcRequest?.deliveryTime,

      descriptionOfGoods: context?.lcRequest?.descriptionOfGoods,
      typeOfGoodsText: context?.onlyForDisplay?.typeOfGood,

      totalValueProduct: context?.lcRequest?.totalValueProduct,
      totalValueAfterVat: context?.lcRequest?.totalValueAfterVat,
      vatProduct: context?.lcRequest?.vatProduct,

      totalValueProductContractType1:
        context?.lcRequest?.totalValueProductContractType1,
      vatProductContractType1: context?.lcRequest?.vatProductContractType1,
      totalValueAfterVatContractType1:
        context?.lcRequest?.totalValueAfterVatContractType1,
      periodForPresentation: context?.lcRequest?.periodForPresentation,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context]);

  return (
    <>
      <div>
        <Spin spinning={context?.loading}>
          <Row style={{ paddingTop: '35px' }}>
            <Col span={2}></Col>

            <Col span={20}>
              <Steps size="small" onChange={onChange} current={current}>
                {steps.map((item) => (
                  <Step key={item.title} title={item.title} />
                ))}
              </Steps>
            </Col>
            <Col span={2}></Col>
          </Row>
          <Row style={{ paddingTop: '35px', paddingBottom: '100px' }}>
            <Col span={2}></Col>

            <Col align="left" className="card-container" span={20}>
              <Card
                // className="custom-card"
                bordered={false}
                title={steps[current].title}
              >
                <Form
                  form={form}
                  // onFinish={domain.createApplicationOpeningLc}
                  layout="horizontal"
                >
                  <div className="steps-content">{steps[current].content}</div>
                  <div className="steps-action">
                    <Row className={'padding-md'}>
                      <Col span={12}>
                        {current > 0 && (
                          <Button onClick={() => prev()}>
                            <span>
                              <LeftOutlined />
                            </span>
                            Quay lại{' '}
                          </Button>
                        )}
                        {current == 0 && (
                          <Button onClick={() => onExit()}>
                            <span>
                              <LeftOutlined />
                            </span>
                            Quay lại{' '}
                          </Button>
                        )}
                      </Col>
                      <Col span={12}>
                        {current === steps.length - 1 && (
                          <Space wrap>
                            <Button
                              style={{ marginRight: '9px' }}
                              // className="right-step-action"
                              className={` right-step-action ${
                                context?.lcRequest?.lcType == 2
                                  ? 'right-step-action-lcType-2'
                                  : 'right-step-action-lcType-1'
                              }`}
                              onClick={
                                () => message.success('Processing complete!')
                                // domain.submitDataHandler()
                              }
                              disabled={
                                context?.lcRequest?.lcType == 2 ? true : false
                              }
                            >
                              Tạo Draft L/C{' '}
                              <span style={{ marginLeft: '5px' }}>
                                <FileTextOutlined />
                              </span>
                            </Button>
                            <Button
                              className={` right-step-action ${
                                context?.lcRequest?.lcType == 2
                                  ? 'right-step-action-lcType-2'
                                  : 'right-step-action-lcType-1'
                              }`}
                              disabled={
                                context?.lcRequest?.lcType == 2 ? true : false
                              }
                              style={{ marginRight: '9px' }}
                              onClick={
                                () => message.success('Processing complete!')
                                // domain.submitDataHandler()
                              }
                            >
                              Gửi yêu cầu tạo Draft L/C{' '}
                              <span style={{ marginLeft: '5px' }}>
                                <LogoutOutlined />
                              </span>
                            </Button>
                            <Button
                              className="common-btn right-step-action"
                              onClick={() =>
                                domain.createApplicationOpeningLc()
                              }
                            >
                              Xác nhận thêm mới{' '}
                              <span style={{ marginLeft: '5px' }}>
                                <CheckCircleFilled />
                              </span>
                            </Button>
                          </Space>
                        )}
                        {current < steps.length - 1 && (
                          <Button
                            className="common-btn right-step-action"
                            onClick={() => next()}
                          >
                            Tiếp theo{' '}
                            <span>
                              <RightOutlined />
                            </span>
                          </Button>
                        )}
                      </Col>
                    </Row>
                  </div>
                </Form>
              </Card>
            </Col>
            <Col span={2}></Col>
          </Row>
        </Spin>
      </div>
    </>
  );
};

export default CM0702View;
