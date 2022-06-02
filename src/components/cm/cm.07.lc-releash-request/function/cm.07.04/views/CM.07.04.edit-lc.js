import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Col, Row, Card, Button, Form, Spin, Steps } from 'antd';
import {
  LeftOutlined,
  RightOutlined,
  CheckCircleFilled,
} from '@ant-design/icons';
import moment from 'moment';
import log from './ModuleLogger';
import '../../../component/less/CM.07.less';
import '../../../../../../assets/less/LC-common.less';
import { CM0704Domain } from '../domains/CM0704Domain';
import { useHistory } from 'react-router';
import CommonInfoContent from './step-content/CommonInfo';
import PurchaseInfoContent from './step-content/PurchaseInfo';
import ShipmentContent from './step-content/Shipment';
import DocumentContent from './step-content/DocumentPresent';
import SpecialRegularContent from './step-content/SpecialRegular';
import { LC_STATUS } from 'core/common/Constant';
import { KTTitle } from 'core/ui';
import { useParams } from 'react-router-dom';
const { Step } = Steps;
const CM0702View = ({ lang = 'vi', ...props }) => {
  const { t } = useTranslation();
  const [context, domain] = CM0704Domain();
  const [form] = Form.useForm();
  const history = useHistory();
  const { id } = useParams();
  useEffect(() => {
    domain.initDomain(id);
  }, []);

  useEffect(() => {
    log.debug('useEffect--', context);
  }, [context]);

  const dateFormatList = 'DD/MM/YYYY';

  function convert(str) {
    var date = new Date(str),
      mnth = ('0' + (date.getMonth() + 1)).slice(-2),
      day = ('0' + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join('-');
  }

  const [current, setCurrent] = useState(0);

  const next = () => {
    form
      .validateFields()
      .then(() => {
        // Here make api call of something else
        setCurrent(current + 1);
      })
      .catch((err) => console.log(err));
  };

  const onChange = (current) => {
    console.log(form);
    form
      .validateFields()
      .then(() => {
        // Here make api call of something else
        setCurrent(current);
      })
      .catch((err) => console.log(err));
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const onExit = (current) => {
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
    console.log('context?.lcApplication?.typeOfGoods');
    console.log(context?.lcApplication?.typeOfGoods);
    form.setFieldsValue({
      contractType: context?.lcApplication?.contractType,
      contractNumber: context?.lcApplication?.contractNumber,
      lcReleashingRequestCode: context?.lcApplication?.proposalCodeRelease,
      proposalDate: moment(context?.lcApplication?.proposalDate),
      releashBank: context?.lcApplication?.bankReleash,
      lcType: context?.lcApplication?.lcType,
      corporateBuy: context?.lcApplication?.corporateBuy,
      corporateBuyAddress: context?.lcApplication?.corporateBuyAddress,
      corporateSell:
        context?.lcApplication?.contractType == 2
          ? context?.lcApplication?.corporateSellId
          : context?.lcApplication?.corporateSell,

      corporateSellAddress: context?.lcApplication?.corporateSellAddress,

      bankConfirm: context?.lcApplication?.bankConfirm,
      bankConfirmAddress: context?.lcApplication?.bankConfirmAddress,

      bankTranfer: context?.lcApplication?.bankTranfer,
      confirmationInstruction: context?.lcApplication?.confirmationInstruction,
      confirmingBankRequest: context?.lcApplication?.confirmingBankRequest,
      confirmingBank: context?.lcApplication?.bankIdConfirmRequest,

      //purchase info step
      valueLc: context?.lcApplication?.valueLc,
      moneyType: context?.lcApplication?.moneyType,
      positiveTolerance: context?.lcApplication?.positiveTolerance,
      negativeTolerance: context?.lcApplication?.negativeTolerance,
      presentationAt: context?.lcApplication?.presentationAt,
      presentationAtBank: context?.lcApplication?.bankIdPresentationAt,
      termOfPayment: context?.lcApplication?.termOfPayment,
      termOfPaymentDetail: context?.lcApplication?.noteTermOfPayment,
      paymentAmount: context?.lcApplication?.paymentAmount,
      dueDate: moment(context?.lcApplication?.dueDate),
      dueAddress: context?.lcApplication?.dueAddress,
      fee: context?.lcApplication?.fee,

      //shipment info
      partialShipment: context?.lcApplication?.partialShipment,
      transhipment: context?.lcApplication?.transhipment,
      placeOfReceipt: context?.lcApplication?.placeOfReceipt,
      placeOfDestination: context?.lcApplication?.placeOfDestination,
      portOfDeparture: context?.lcApplication?.portOfDeparture,
      portOfDestination: context?.lcApplication?.portOfDestination,
      lastestDeliveryDate: moment(context?.lcApplication?.lastestDeliveryDate),
      deliveryTime: context?.lcApplication?.deliveryTime,
      typeOfGood: context?.lcApplication?.typeOfGood,
      descriptionOfGoods: context?.lcApplication?.descriptionOfGoods,

      totalValueProduct: context?.lcApplication?.totalValueProduct,
      vatProduct: context?.lcApplication?.vatProduct,
      totalValueAfterVat: context?.lcApplication?.totalValueAfterVat,

      // document info step
      periodForPresentation: context?.lcApplication?.periodForPresentation,
      ttReimbursement: context?.lcApplication?.ttReimbursement,
      otherCondition: context?.lcApplication?.otherCondition,

      holdAccount: context?.lcApplication?.holdAccount,
      feeAccount: context?.lcApplication?.feeAccount,
      paymentAccount: context?.lcApplication?.paymentAccount,
      commitmentCustomer: context?.lcApplication?.commitmentCustomer,

      // contract type 1
      lcTypeText: context?.onlyForDisplay?.lcType,
      corporateBuyText: context?.onlyForDisplay?.corporateBuy,
      corporateBuyAddressText: context?.onlyForDisplay?.corporateBuyAddress,
      corporateSellText: context?.onlyForDisplay?.corporateSell,
      corporateSellAddressText: context?.onlyForDisplay?.corporateSellAddress,

      totalValueProductContractType1:
        context?.lcApplication?.totalValueProductContractType1,
      vatProductContractType1: context?.lcApplication?.vatProductContractType1,
      totalValueAfterVatContractType1:
        context?.lcApplication?.totalValueAfterVatContractType1,
    });
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
                  // onFinish={domain.updateApplicationOpeningLc}
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
                          // <Space wrap>
                          <Button
                            className="common-btn right-step-action"
                            onClick={() => domain.updateApplicationOpeningLc()}
                          >
                            Xác nhận chỉnh sửa{' '}
                            <span style={{ marginLeft: '5px' }}>
                              <CheckCircleFilled />
                            </span>
                          </Button>
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
