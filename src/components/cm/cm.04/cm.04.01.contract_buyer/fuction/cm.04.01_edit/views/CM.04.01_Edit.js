import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Col,
  Row,
  Form,
  Select,
  Input,
  Button,
  Space,
  DatePicker,
  Checkbox,
  Table,
  Tabs,
  Spin,
} from 'antd';
import { KTTitle } from 'core/ui';
import '../../../components/less/CM.04.01.less';
import { useCM0401Domain } from '../domains/CM.04.01Domain';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import ConstractInfomation from './tab-content/ConstractInfomation';
import ContractProduct from './tab-content/ContractProduct';
import DeliveryInformation from './tab-content/DeliveryInformation';
import PaymentInformation from './tab-content/PaymentInformation';
import OtherInformation from './tab-content/OtherInformation';
import ContractAdendum from './tab-content/ContractAdendum';
import UpdateContractSuccessfull from '../../../components/modal/edit/modal/UpdateSuccessfullModal';
import UpdateContractFailed from '../../../components/modal/edit/modal/UpdateFailedModal';
import ModalFeeContract from '../../../components/modal/edit/modal/ModalFeeContract';

import PreviewFileContractSign from './tab-content/PreviewFileContractSign';
import { Steps } from 'antd';
import {
  PlusOutlined,
  CheckCircleOutlined,
  EyeFilled,
} from '@ant-design/icons';
import log from '../ModuleLogger';
import Modal from 'antd/lib/modal/Modal';
import moment from 'moment';

const { Step } = Steps;
const dateFormat = 'DD/MM/YYYY';

function callback(key) {
  //console.log(key);
}
//console.log('CM.04.01_Add');

// đây là trang thêm mới 1 hợp đồng
const CM0401Edit = ({ lang = 'vi', ...props }) => {
  const { t } = useTranslation();
  const [context, domain] = useCM0401Domain();
  const [form] = Form.useForm();

  const [viewModalFee, setViewModalFee] = useState(false);

  const [steps, setSteps] = useState([]);
  const [current, setCurrent] = useState(0);

  function checkData(data) {
    return typeof data !== 'undefined' && data;
  }

  function convert(str) {
    if (str != undefined && str != null && str != '') {
      var date = new Date(str),
        mnth = ('0' + (date.getMonth() + 1)).slice(-2),
        day = ('0' + date.getDate()).slice(-2);
      return [day, mnth, date.getFullYear()].join('/');
    } else {
      return '';
    }
  }

  useEffect(() => {
    domain.initDomain();
  }, []);

  useEffect(() => {
    log.debug('useEffect--', context);
    console.log('context--', context);
    var deliveryDeadline = null;
    if (
      context?.deliveryDeadline != '' &&
      context?.deliveryDeadline != undefined
    ) {
      deliveryDeadline = moment(context?.deliveryDeadline, dateFormat);
    }
    var contractEstablishmentDate = null;
    if (
      context?.contractEstablishmentDate != '' &&
      context?.contractEstablishmentDate != undefined
    ) {
      contractEstablishmentDate = moment(
        context?.contractEstablishmentDate,
        dateFormat,
      );
    }
    form.setFieldsValue({
      contractCode: context?.contractCode,
      pursuantLaw: context?.pursuantLaw,
      contractNo: context?.contractNo,
      contractEstablishmentDate: contractEstablishmentDate,
      sellerCorporateId: context?.sellerCorporateId,
      sellerName: context?.sellerName,
      sellerAddress: context?.sellerAddress,
      representativeSeller: context?.representativeSeller,
      sellerPosition: context?.sellerPosition,
      buyerCorporateId: context?.buyerCorporateId,
      buyerName: context?.buyerName,
      buyerAddress: context?.buyerAddress,
      representativeBuyer: context?.representativeBuyer,
      buyerPosition: context?.buyerPosition,
      descriptionCommodity: context?.descriptionCommodity,
      commodityId: context?.commodityId,
      contractValueBeforTax: context?.contractValueBeforTax,
      contractValueBeforeVat: context?.contractValueBeforeVat,
      contractVat: context?.contractVat,
      contractValue: context?.contractValue,
      currency: context?.currency,
      amountReductionTolerance: context?.amountReductionTolerance,
      toleranceIncreaseAmount: context?.toleranceIncreaseAmount,
      deliveryVehicle: context?.deliveryVehicle,
      deliveryTerm: context?.deliveryTerm,
      deliveryDeadline: deliveryDeadline,
      placeDelivery: context?.placeDelivery,
      deliveryLocation: context?.deliveryLocation,
      productQuality: context?.productQuality,
      termsOfExchange: context?.termsOfExchange,
      goodsWarranty: context?.goodsWarranty,
      paymentMethods: context?.paymentMethods,
      transferPayments: context?.transferPayments,
      lcPayment: context?.lcPayment,
      lcId: context?.lcId,
      paymentTermLc: context?.paymentTermLc,
      bankAccountId: context?.bankAccountId,
      bankSwiftCode: context?.bankSwiftCode,
      buyerAccountNumber: context?.buyerAccountNumber,
      setOfPaymentDocuments: context?.setOfPaymentDocuments,
      latePaymentInterestRate: context?.latePaymentInterestRate,
      cargoInsurance: context?.cargoInsurance,
      obligationsBuyer: context?.obligationsBuyer,
      obligationsSeller: context?.obligationsSeller,
      regulationsPenaltiesAndContractCompensation:
        context?.regulationsPenaltiesAndContractCompensation,
      disputeSettlementProcedures: context?.disputeSettlementProcedures,
      caseOfForceMajeure: context?.caseOfForceMajeure,
      validityContract: context?.validityContract,
      generalTerms: context?.generalTerms,
      // licenseId1:4,
    });
    var listLicence = context?.licenseListInit;
    if (listLicence) {
      listLicence.forEach((license, index) => {
        form.setFieldsValue({
          ['licenseId' + (index + 1)]: license?.licenseId,
        });
      });
    }

    var contractAddendum = context?.contractAddendumInit;
    if (contractAddendum) {
      contractAddendum.forEach((addendum, index) => {
        form.setFieldsValue({
          // ['addendumNo' + (index + 1)]: addendum?.addendumNo,
          ['addendumNo' + (addendum?.key)]: index + 1,
          ['addendumName' + (addendum?.key)]: addendum?.addendumName,
          ['addendumContent' + (addendum?.key)]: addendum?.addendumContent,
        });
      });
    }
    if (checkData(context?.steps)) {
      setSteps(context?.steps);
    }
    if (context?.stepsCurrent != undefined && context?.stepsCurrent != null) {
      setCurrent(context?.stepsCurrent);
    }
  }, [context]);

  const onFinishFailed = (errorInfo) => {
    //console.log('Failed:', errorInfo);
  };
  const [nextPage, setNextPage] = useState(0);

  const next = (key) => {
    console.log('key:::', key);
    console.log(current);
    var count = 1;
    for (var i = current; i < steps.length; i++) {
      if (steps[i + 1].display == 'none') {
        count++;
      } else {
        break;
      }
    }
    form
      .validateFields()
      .then(() => {
        domain.setStepsCurrent(current + count);
      })
      .catch((err) => console.log(err));
  };

  const prev = (key) => {
    console.log('key:::', key);
    console.log('current:::', current);
    domain.setStepsCurrent(current - 1);
  };

  const onChange = async (key) => {
    console.log('current:::', current);
    form
      .validateFields()
      .then((ss) => {
        console.log(ss);
        domain.setStepsCurrent(key);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function handleNextPage() {
    if ((current == 4 && steps[5]?.display == 'none') || current == 5) {
      form
        .validateFields()
        .then((ss) => {
          domain.generateFilePdf();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      next(current);
    }
  }

  function openModalFee() {
    // console.log('view file');
    // setViewModalFee(true);
    domain.openModalFee();
  }

  function closeModalFee() {
    // console.log('view file');
    setViewModalFee(false);
  }

  function addContractAddendum() {
    console.log('addContractAddendum');
    domain.editSteps(true);
  }

  return (
    <>
      <UpdateContractSuccessfull
        isVisbled={context?.showEditSuccess}
        onCloseModal={domain.closeEditSuccessfullModal}
        onClose={domain.closeEditSuccessfullModal}
      />
      <UpdateContractFailed
        isVisbled={context?.showEditFailed}
        onCloseModal={domain.closeEditFailedModal}
        onClose={domain.closeEditFailedModal}
      />

      <ModalFeeContract
        isVisbled={context?.viewModalFee}
        onCloseModal={domain.closeModalFee}
        onClose={domain.closeModalFee}
      />

      <div style={{ display: context?.viewContainer ? '' : 'none' }}>
        <Spin Spin size="large" spinning={context?.loading}>
          <Row
            style={{
              padding: 16,
            }}
          >
            <Col span={24}>
              <Form
                form={form}
                onFinish={handleNextPage}
                onFinishFailed={onFinishFailed}
                layout="horizontal"
              >
                <Row>
                  <Col span={24}>
                    <Steps
                      size="small"
                      current={current}
                      onChange={onChange}
                      className={'nav-steps'}
                    >
                      {steps?.map((item) => (
                        <Step
                          key={item.title}
                          title={item.title}
                          style={{
                            display: item.display,
                            icon:
                              Step.status == 'finish' ? (
                                <CheckCircleOutlined />
                              ) : null,
                          }}
                        />
                      ))}
                    </Steps>
                    <div className={'content-steps'}>
                      {steps[current]?.content}
                      <Row className={'footer-steps'}>
                        <Col span={8}>
                          {current == 0 && (
                            <Button
                              className="button-previous"
                              onClick={() => {
                                domain.exitHandler();
                              }}
                            >
                              {'< Quay lại'}
                            </Button>
                          )}
                          {current > 0 && (
                            <Button
                              className="button-previous"
                              onClick={() => prev(current)}
                            >
                              {'< Quay lại'}
                            </Button>
                          )}
                        </Col>

                        <Col span={8} className={'add-contract-addendum'}>
                          <Button
                            onClick={addContractAddendum}
                            className={'btn-add-addendum'}
                          >
                            {'Thêm phụ lục đính kèm'}
                            <PlusOutlined />
                          </Button>
                        </Col>
                        <Col span={8}>
                          {current < 5 &&
                            steps[current + 1]?.display == 'flex' && (
                              <Button
                                className="common-btn button-next"
                                htmlType="submit"
                                onClick={() => {
                                  // next(current);
                                }}
                              >
                                {'Tiếp tục >'}
                              </Button>
                            )}
                          {current == 4 && steps[5]?.display == 'none' && (
                            <Button
                              className="common-btn button-next"
                              htmlType="submit"
                            >
                              {'Xem trước hợp đồng '}
                              <EyeFilled />
                            </Button>
                          )}
                          {current == 5 && (
                            <Button
                              className="common-btn button-next"
                              htmlType="submit"
                            >
                              {'Xem trước hợp đồng '}
                              <EyeFilled />
                            </Button>
                          )}
                        </Col>
                      </Row>
                    </div>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </Spin>
      </div>
      <div style={{ display: context?.viewFilePDF ? '' : 'none' }}>
        <PreviewFileContractSign />
      </div>
    </>
  );
};

export default CM0401Edit;
