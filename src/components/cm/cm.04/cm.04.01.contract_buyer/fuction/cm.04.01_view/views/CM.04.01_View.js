import React from 'react';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import {
  Col,
  Row,
  Form,
  Button,
  Space,
  Spin,
  Tabs,
  message,
} from 'antd';
import { KTTitle } from 'core/ui';
import '../../../components/less/CM.04.01.less';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import FeeInfomation from '../views/tab-content/FeeInfomation';
import ContractAdendum from './tab-content/ContractAdendum';
import DeleteBankFeeModal from '../../../components/modal/delete/modal/DeleteTransactionFeeModal';
import DeleteBankFeeSuccessfulModal from '../../../components/modal/delete/modal/DeleteTransactionFeeSuccessfull';
import DeleteBankFeeFailedModal from '../../../components/modal/delete/modal/DeleteTransactionFeelFailed';
// import RejectSignBuyer from './tab-content/RejectSignBuyer';

import GeneralInformation from './tab-content/GeneralInformation';
import { useCM0401Domain } from '../domains/CM.04.01Domain';
import { DeleteFilled, EditFilled, EyeFilled } from '@ant-design/icons';

import { useParams } from 'react-router-dom';
import log from '../ModuleLogger';

var axios = require('axios');
const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

const AM040101View = ({ lang = 'vi', ...props }) => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [context, domain] = useCM0401Domain();
  const history = useHistory();
  const dateFormat = 'DD/MM/YYYY';
  const [form] = Form.useForm();

  useEffect(() => {
    // console.log('initDomain--');
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
    form.setFieldsValue({
      contractCode: context?.contractCode,
      pursuantLaw: context?.pursuantLaw,
      contractNo: context?.contractNo,
      contractEstablishmentDate: moment(
        context?.contractEstablishmentDate,
        dateFormat,
      ),
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
      // licenseList: context?.licenseList, // set bộ chứng từ
      // licenseList: context?.licenseList, // set data tab phụ lục

      feeType: 'feeType01',
      fee: 'fee01',
      vatFee: 'vatFee01',
      totalFee: 'totalFee01',
    });

    var listLicence = context?.listLicence;
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
          ['addendumNo' + (index + 1)]: index + 1,
          ['addendumName' + (index + 1)]: addendum?.addendumName,
          ['addendumContent' + (index + 1)]: addendum?.addendumContent,
        });
      });
    }
  }, [context]);

  //Value state
  console.log('AM040101View');

  const [showDelete, setShowDelete] = useState(false);
  const [showDeleteSuccessfull, setShowDeleteSuccessfull] = useState(false);
  const [showDeleteFailed, setShowDeleteFailed] = useState(false);

  //-------------------------------------//
  function openDeleteModal() {
    setShowDelete(true);
  }
  function closeDeleteModal(data) {
    setShowDelete(false);
  }

  function closeDeleteSuccessfulModal(data) {
    setShowDeleteSuccessfull(false);
    history.push('/cm-home/contract-buyer');
  }

  function closeDeleteFailedModal(data) {
    setShowDeleteFailed(false);
  }

  // Get data fee tab2

  //-----delete----------//
  const handleDeleteOk = () => {
    var configPromise = domain.deleteContract(id);
    configPromise
      .then((result) => {
        axios(result)
          .then(function (response) {
            console.log(response.data);
            if (response.data.code != 200) {
              setShowDeleteFailed(true);
              message.error(response.data.message);
            } else {
              setShowDeleteSuccessfull(true);
            }
          })
          .catch(function (error) {
            console.log(error.response);
            setShowDeleteFailed(true);
          });
      })
      .catch((err) => console.log('hungtm---' + err));
  };

  return (
    <>
      <DeleteBankFeeModal
        isVisbled={showDelete}
        onCloseModal={closeDeleteModal}
        deleteHandler={handleDeleteOk}
      />

      <DeleteBankFeeSuccessfulModal
        isVisbled={showDeleteSuccessfull}
        onClose={closeDeleteSuccessfulModal}
        onCloseModal={closeDeleteSuccessfulModal}
      />

      <DeleteBankFeeFailedModal
        isVisbled={showDeleteFailed}
        onClose={closeDeleteFailedModal}
        onCloseModal={closeDeleteFailedModal}
      />

      <div className={'main-container-view'}>
        <Spin Spin size="large" spinning={context?.loading}>
          <Row className={'padding-title'}>
            <Col span={24}>
              <KTTitle size={3}>
                <b>Hợp đồng mua bán</b>
              </KTTitle>
            </Col>
            {/* <Col span={24}>
            <KTTitle size={4}>Xem</KTTitle>
          </Col> */}
          </Row>
          <Row className={'padding-md'}>
            <Col span={24}>
              <Form
                form={form}
                // onFinish={submitHandler}
                // onFinishFailed={onFinishFailed}
                layout="horizontal"
              >
                <Row>
                  <Col span={24}>
                    <Tabs defaultActiveKey="1" onChange={callback}>
                      <TabPane tab="Thông tin hợp đồng" key="1">
                        <GeneralInformation />
                      </TabPane>
                      <TabPane tab="Phụ lục đính kèm" key="2">
                        <ContractAdendum />
                      </TabPane>
                      <TabPane tab="Thông tin thu phí" key="3">
                        <FeeInfomation />
                      </TabPane>
                    </Tabs>
                  </Col>
                </Row>
                {/* 
                <Row
                  style={{
                    display: context?.showViewRejectSignBuyer ? 'flex' : 'none',
                  }}
                >
                  <Col span={24}>
                    <RejectSignBuyer />
                  </Col>
                </Row> */}
                <div style={{ textAlign: '-webkit-center' }} id="form-footer">
                  <Form.Item>
                    <Row style={{ paddingLeft: 16, paddingTop: 16 }}>
                      <Col span={12}>
                        <Button
                          onClick={domain.exitHandler}
                          className=" button-previous"
                        >
                          {'< Quay lại'}
                        </Button>
                      </Col>
                      <Col span={12}>
                        <Space
                          direction="horizontal"
                          size={16}
                          style={{
                            marginRight: 'auto',
                          }}
                        >
                          <Button
                            style={{
                              display: 'none',
                              // context?.status == 1
                              //   ? 'none'
                              //   : context?.status == 0
                              //   ? 'flex'
                              //   : context?.status == 2
                              //   ? 'flex'
                              //   : 'none',
                            }}
                            className="button-delete"
                            onClick={(e) => {
                              openDeleteModal();
                            }}
                          >
                            Xóa hợp đồng{' '}
                            <DeleteFilled className={'icon-delete'} />
                          </Button>
                          <Button
                            style={{
                              display:
                                context?.status == 1
                                  ? 'none'
                                  : context?.status == 0
                                  ? 'flex'
                                  : context?.status == 2
                                  ? 'flex'
                                  : 'none',
                            }}
                            className="button-edit"
                            onClick={(e) => domain.editHandler(id)}
                          >
                            Chỉnh sửa <EditFilled className={'icon-edit'} />
                          </Button>

                          <Button
                            // style={{
                            //   display:
                            //     context?.status == 0
                            //       ? 'none'
                            //       : context?.status == 1
                            //       ? 'flex'
                            //       : 'none',
                            // }}
                            className="common-btn"
                            onClick={(e) => domain.toSignDigitalHandler(id)}
                          >
                            Xem file ký số HĐ
                            <EyeFilled className={'icon-eye'} />
                          </Button>
                        </Space>
                      </Col>
                    </Row>
                    {/* <Space
                    direction="horizontal"
                    size={16}
                    style={{
                      marginRight: 'auto',
                    }}
                  > */}
                    {/* </Space> */}
                  </Form.Item>
                </div>
              </Form>
            </Col>
          </Row>
        </Spin>
      </div>
    </>
  );
};

export default AM040101View;
