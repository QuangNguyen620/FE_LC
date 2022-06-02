import React from 'react';
import { useTranslation } from 'react-i18next';
import { Col, Row, Form, Button, Spin } from 'antd';
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
import CreateFeeRuleSuccessfull from '../../../components/modal/add/modal/CreateSuccessfullModal';
import CreateFeeRuleFailed from '../../../components/modal/add/modal/CreateFailedModal';
import ModalFeeContract from '../../../components/modal/add/modal/ModalFeeContract';
import PreviewFileContractSign from './tab-content/PreviewFileContractSign';
import { Steps } from 'antd';
import {
  PlusOutlined,
  CheckCircleOutlined,
  CheckOutlined,
  EyeFilled,
} from '@ant-design/icons';
import log from '../ModuleLogger';

const { Step } = Steps;

// function callback(key) {
//   //console.log(key);
// }
//console.log('CM.04.01_Add');

// đây là trang thêm mới 1 hợp đồng
const AM040101Add = ({ lang = 'vi', ...props }) => {
  const { t } = useTranslation();
  const [context, domain] = useCM0401Domain();
  const [form] = Form.useForm();

  useEffect(() => {
    domain.initDomain();
  }, []);

  const [viewModalFee, setViewModalFee] = useState(false);
  const [steps, setSteps] = useState([]);
  const [current, setCurrent] = useState(0);

  function checkData(data) {
    return typeof data !== 'undefined' && data;
  }

  useEffect(() => {
    log.debug('useEffect--', context);
    log.info('useEffect--', context);
    console.log('useEffect--', context);

    form.setFieldsValue({
      representativeSeller: context?.representativeSeller,
      bankSwiftCode: context?.bankSwiftCode,
      buyerAccountNumber: context?.buyerAccountNumber,

      sellerAddress: context?.sellerAddress,
      sellerPosition: context?.sellerPosition,
      buyerName: context?.buyerName,
      buyerAddress: context?.buyerAddress,
      buyerNameOptions: context?.buyerNameOptions,
      buyerPosition: context?.buyerPosition,
      contractValue: context?.contractValue,
      contractValueBeforeVat: context?.contractValueBeforeVat,
    });
    if (checkData(context?.steps)) {
      setSteps(context?.steps);
    }
    if (context?.stepsCurrent != undefined && context?.stepsCurrent != null) {
      setCurrent(context?.stepsCurrent);
    }
  }, [context]);

  const onFinishFailed = (errorInfo) => {};

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
    // console.log('key:::', key);
    // console.log(current);
    // var count = -1;
    // for (var i = current; i > 0; i--) {
    //   if (steps[i - 1].display == 'none') {
    //     count--;
    //   } else {
    //     break;
    //   }
    // }
    // domain.setStepsCurrent(current + count);
    console.log('key:::', key);
    console.log('current:::', current);
    domain.setStepsCurrent(current - 1);
  };

  const onChange = async (key) => {
    console.log('current:::', current);
    // console.log(key);
    // console.log(form);
    // var count = key - current;
    // var check = false;
    // for (var i = current; i < key; i++) {
    //   await form
    //     .validateFields()
    //     .then((ss) => {
    //       console.log(ss);
    //       count++;
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //       check = true;
    //     });
    //   if (check) {
    //     break;
    //   }
    // }
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
    setViewModalFee(true);
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
      <CreateFeeRuleSuccessfull
        isVisbled={context?.showAddSuccess}
        onCloseModal={domain.closeModalSuccess}
        onClose={domain.closeModalSuccess}
      />
      <CreateFeeRuleFailed
        isVisbled={context?.showAddFailed}
        onCloseModal={domain.closeModalFailed}
        onClose={domain.closeModalFailed}
      />

      <ModalFeeContract
        isVisbled={viewModalFee}
        onCloseModal={closeModalFee}
        onClose={closeModalFee}
      />
      <div
        style={{ display: context?.viewContainer ? '' : 'none' }}
        className={'div-container'}
      >
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
                  {/* <CheckCircleOutlined /> */}

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
                                <CheckCircleOutlined
                                  className={'check-circle-finish'}
                                />
                              ) : null,
                          }}
                          // status={'finish'}
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
                          {/* {current === steps.length - 1 && (
                            <Button
                              className="common-btn button-next"
                              onClick={openModalFee}
                              // onClick={domain.submitHandler}
                            >
                              {'Xác nhận thêm mới HĐ'}
                              <CheckCircleFilled />
                            </Button>
                          )} */}
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

export default AM040101Add;
