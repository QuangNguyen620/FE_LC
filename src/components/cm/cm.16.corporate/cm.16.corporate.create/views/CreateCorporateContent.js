import React, { useContext, createContext, useState, useEffect } from 'react';
import {
  Col,
  Row,
  Input,
  Button,
  Form,
  Select,
  Space,
  DatePicker,
  Tabs,
  message,
  InputNumber,
  Steps,
  Card,
  Spin,
} from 'antd';
import {
  LeftOutlined,
  RightOutlined,
  CheckCircleFilled,
} from '@ant-design/icons';
import { KTTitle } from 'core/ui';
import log from '../views/ModuleLogger';
import { useTranslation } from 'react-i18next';
import {} from '@ant-design/icons';
import moment from 'moment';
import CommonInfoContent from './step-content/CommonInfo';
import CAInfomation from './step-content/CAInfomation';
import LawRepresentatorInfomation from './step-content/LawRepresentatorInfomation';
import AccountantInfomation from './step-content/AccountantInfomation';
import AccountInfomation from './step-content/AccountInfomation';
import UserInfomation from './step-content/UserInfomation';
import ServicePackageInfomation from './step-content/ServicePackageInformation';
import CreateSuccessfullModal from './modal/CreateSuccessfullModal';
// import CreateFailModal from './modal/CreateFailModal';
// import eKYCFailedModal from './modal/eKYCFailedModal';
import { useHistory } from 'react-router';
import { CreateCorporateDomain } from '../domains/CreateCorporateDomain';
import { useLocation } from 'react-router-dom';
import './CreateCorporate.less';
import '../../../../../assets/less/LC-common.less';

const { Step } = Steps;
const CreateCorporateContent = ({ lang = 'vi', ...props }) => {
  const { t } = useTranslation();
  const dateFormatList = 'DD/MM/YYYY';
  const [form] = Form.useForm();
  const location = useLocation();
  const [context, domain] = CreateCorporateDomain();
  const history = useHistory();
  useEffect(() => {
    domain.initDomain();
  }, []);

  const [current, setCurrent] = useState(0);
  const [nextStepBtn, setNextStepBtn] = useState(true);

  useEffect(() => {
    log.debug('useEffect--', context);
    console.log('useEffect--', context);
    // form
    //   .validateFields()
    //   .then((ss) => {
    //     console.log('ss--', ss);
    //     setNextStepBtn(true);
    //   })
    //   .catch((err) => {
    //     console.log('err--', err);
    //     setNextStepBtn(false);
    //   });
  }, [context]);

  function checkData(data) {
    return typeof data !== 'undefined' && data;
  }

  function trimData(data) {
    if (checkData(data)) {
      return data.trim();
    } else {
      return data;
    }
  }

  function validateUser() {
    var checkUser = true;
    var userList = context?.corporate?.stateCorporateUserList?.dataSource;
    if (checkData(userList)) {
      userList.forEach((user) => {
        if (
          user.userName == '' ||
          user.position == '' ||
          user.phoneNumber == '' ||
          user.email == '' ||
          user.userGroupCode == ''
        ) {
          checkUser = false;
        }
      });
    }
    if (!checkUser) {
      message.error('Vui lòng nhập đủ thông tin người dùng!');
    }
    return checkUser;
  }

  function validateAccount() {
    var checkAcc = true;
    var userList = context?.corporate?.stateCorporateAccountList?.dataSource;
    if (checkData(userList) && userList.length > 0) {
      userList.forEach((account) => {
        if (
          account.corporateAccountNumber == '' ||
          account.corporateAccountName == '' ||
          account.corporateAccountType == '' ||
          account.bankId == ''
        ) {
          checkAcc = false;
        }
      });
    } else {
      message.error('Doanh nghiệp chưa có thông tin tài khoản ngân hàng!');
      checkAcc = false;
    }
    if (!checkAcc && userList.length > 0) {
      message.error('Vui lòng nhập đủ thông tin tài khoản ngân hàng!');
    }
    return checkAcc;
  }

  const next = () => {
    var next = true;
    if (
      current == 2 &&
      trimData(context?.corporate?.lawRepresentatorName?.toLowerCase()) !==
        trimData(context?.corporate?.lawRepresentatorFullName?.toLowerCase())
    ) {
      message.error(
        'Tên người đại diện pháp luật không khớp với thông tin trên giấy ĐKKD!',
      );
      next = false;
    }
    if (current == 4 && next) {
      next = validateUser();
    }
    if (current == 5 && next) {
      next = validateAccount();
    }
    if (next) {
      console.log('current::', current, 'form::', form);
      form
        .validateFields()
        .then(() => {
          setCurrent(current + 1);
        })
        .catch((err) => console.log(err));
    }
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const onChange = (key) => {
    console.log(key);
    var next = true;
    if (
      key > 2 &&
      trimData(context?.corporate?.lawRepresentatorName?.toLowerCase()) !==
        trimData(context?.corporate?.lawRepresentatorFullName?.toLowerCase())
    ) {
      message.error(
        'Tên người đại diện pháp luật không khớp với thông tin trên giấy ĐKKD!',
      );
      next = false;
    }
    if (key > 4 && next) {
      next = validateUser();
    }
    if (key > 5 && next) {
      next = validateAccount();
    }
    if (next) {
      form
        .validateFields()
        .then(() => {
          setCurrent(key);
        })
        .catch((err) => console.log(err));
    }
  };

  const onExit = (current) => {
    history.push('/create-corporate');
  };

  const steps = [
    {
      title: 'Thông tin chung',
      content: <CommonInfoContent />,
    },
    {
      title: 'Thông tin chữ ký số',
      content: <CAInfomation />,
    },
    {
      title: 'Thông tin người đại diện',
      content: <LawRepresentatorInfomation form={form} />,
    },
    {
      title: 'Thông tin kế toán trưởng',
      content: <AccountantInfomation form={form} />,
    },
    {
      title: 'Thông tin người dùng',
      content: <UserInfomation form={form} />,
    },
    {
      title: 'Thông tin tài khoản ngân hàng',
      content: <AccountInfomation form={form} />,
    },
    {
      title: 'Gói dịch vụ',
      content: <ServicePackageInfomation form={form} />,
    },
  ];

  useEffect(() => {
    domain.initDomain();
  }, []);

  useEffect(() => {
    form.setFieldsValue({
      corporateCode: context?.corporate?.corporateCode,
      corporateName: context?.corporate?.corporateName,
      corporateType: context?.corporate?.corporateType,
      hqAddress: context?.corporate?.hqAddress,
      phoneNumber: context?.corporate?.phoneNumber,
      fax: context?.corporate?.fax,
      email: context?.corporate?.email,
      website: context?.corporate?.website,
      budget: context?.corporate?.budget,
      registerTime: context?.corporate?.registerTime,
      registerDate:
        context?.corporate?.registerDate != ''
          ? moment(context?.corporate?.registerDate, dateFormatList)
          : context?.corporate?.registerDate,

      lawRepresentatorFullName: context?.corporate?.lawRepresentatorFullName,
      identificationPaperNumber: context?.corporate?.identificationPaperNumber,
      identificationPaperCreatedPlace:
        context?.corporate?.identificationPaperCreatedPlace,
      identificationPaperCreatedDate: moment(
        context?.corporate?.identificationPaperCreatedDate,
        dateFormatList,
      ),

      certificate: context?.corporate?.certificate,
      from: context?.corporate?.from,
      issuer: context?.corporate?.issuer,
      mst: context?.corporate?.mst,
      serial: context?.corporate?.serial,
      signature: context?.corporate?.signature,
      signtime: context?.corporate?.signtime,
      subject: context?.corporate?.subject,
      to: context?.corporate?.to,
      validity: context?.corporate?.validity,

      lawRepresentatorName: context?.corporate?.lawRepresentatorName,
      lRIdNumber: context?.corporate?.lRIdNumber,

      lRDOB: moment(context?.corporate?.lRDOB, dateFormatList),
      lRIdIssuedDate: moment(
        context?.corporate?.lRIdIssuedDate,
        dateFormatList,
      ),
      lRIdIssuedPlace: context?.corporate?.lRIdIssuedPlace,
      lRRole: context?.corporate?.lRRole,
      lRPhoneNumber: context?.corporate?.lRPhoneNumber,
      lREmail: context?.corporate?.lREmail,

      acName: context?.corporate?.acName,
      acIdNumber: context?.corporate?.acIdNumber,
      acDOB: moment(context?.corporate?.acDOB, dateFormatList),
      acIdIssuedDate: moment(
        context?.corporate?.acIdIssuedDate,
        dateFormatList,
      ),
      acIdIssuedPlace: context?.corporate?.acIdIssuedPlace,
      acRole: context?.corporate?.acRole,
      acPhoneNumber: context?.corporate?.acPhoneNumber,
      acEmail: context?.corporate?.acEmail,
    });
  }, [context]);

  const [state, setState] = useState(
    context?.corporate?.stateCorporateUserList,
  );

  useEffect(() => {
    console.log('Thay đổi data');
    console.log(context?.userLR);
    console.log('--------------');
    console.log(context?.userAC);

    var userLRPaperType = '';
    if (context?.lawRepresentatorPaperType == '') {
      userLRPaperType = 'cmnd/cccd/cccd_chip';
    } else if (context?.lawRepresentatorPaperType == 'hc') {
      userLRPaperType = 'ho_chieu';
    }

    var userACCPaperType = '';
    if (context?.accountantPaperType == '') {
      userACCPaperType = 'cmnd/cccd/cccd_chip';
    } else if (context?.accountantPaperType == 'hc') {
      userACCPaperType = 'ho_chieu';
    }
    let count = context?.corporate?.stateCorporateUserList?.count;
    let tempUserList = context?.corporate?.stateCorporateUserList?.dataSource;
    if (tempUserList != null && tempUserList != undefined) {
      if (tempUserList[0] != null && tempUserList[0] != undefined) {
        tempUserList[0].key = 0;
        tempUserList[0].userName = context?.userLR?.lawRepresentatorName;
        tempUserList[0].position = context?.userLR?.lRRole;
        tempUserList[0].identityType = userLRPaperType;
        tempUserList[0].identityNumber = context?.userLR?.lRIdNumber;
        tempUserList[0].dateOfIdentity = context?.userLR?.lRIdIssuedDate;
        tempUserList[0].issuedByIdentity = context?.userLR?.lRIdIssuedPlace;
        tempUserList[0].phoneNumber = context?.userLR?.lRPhoneNumber;
        tempUserList[0].email = context?.userLR?.lREmail;
        tempUserList[0].userStatus = 1;

        tempUserList[0].imageFrontOfIdentity =
          context?.userLR?.imageFrontOfIdentity;
        tempUserList[0].imageBackOfIdentity =
          context?.userLR?.imageBackOfIdentity;
        tempUserList[0].imagePortraitOfIdentity =
          context?.userLR?.imagePortraitOfIdentity;
        tempUserList[0].dateOfBirth = context?.userLR?.lRDOB;
      }
      if (tempUserList[1] != null && tempUserList[1] != undefined) {
        tempUserList[1].key = 1;
        tempUserList[1].userName = context?.userAC?.acName;
        tempUserList[1].position = context?.userAC?.acRole;
        tempUserList[1].identityType = userACCPaperType;
        tempUserList[1].identityNumber = context?.userAC?.acIdNumber;
        tempUserList[1].dateOfIdentity = context?.userAC?.acIdIssuedDate;
        tempUserList[1].issuedByIdentity = context?.userAC?.acIdIssuedPlace;
        tempUserList[1].phoneNumber = context?.userAC?.acPhoneNumber;
        tempUserList[1].email = context?.userAC?.acEmail;
        tempUserList[1].userStatus = 1;

        tempUserList[1].imageFrontOfIdentity =
          context?.userAC?.imageFrontOfIdentity;
        tempUserList[1].imageBackOfIdentity =
          context?.userAC?.imageBackOfIdentity;
        tempUserList[1].imagePortraitOfIdentity =
          context?.userAC?.imagePortraitOfIdentity;
        tempUserList[1].dateOfBirth = context?.userAC?.acDOB;
      }
    }

    var setStateUserList = {
      count: count,
      dataSource: tempUserList,
    };
    console.log(tempUserList);
    if (tempUserList != undefined) {
      domain.setStateUserList(setStateUserList);
    }
  }, [context?.userLR, context?.userAC]);

  return (
    <>
      <div>
        <CreateSuccessfullModal
          isVisbled={context?.createSuccessModalVisible}
          onClose={domain.onModalClose}
          onCloseModal={domain.onModalClose}
          loginNow={domain.loginNow}
        />
        <Spin Spin size="large" spinning={context?.loading}>
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
                className="custom-card"
                bordered={false}
                title="Mở tài khoản khách hàng doanh nghiệp"
              >
                <Form
                  form={form}
                  onFinish={domain.handleSubmission}
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
                          <Button
                            className="common-btn right-step-action"
                            onClick={() =>
                              // message.success('Processing complete!')
                              domain.submitDataHandler()
                            }
                          >
                            Xác nhận mở tài khoản{' '}
                            <span style={{ marginLeft: '5px' }}>
                              <CheckCircleFilled />
                            </span>
                          </Button>
                        )}
                        {current < steps.length - 1 && (
                          <Button
                            className={` ${
                              nextStepBtn
                                ? 'common-btn right-step-action'
                                : 'common-btn right-step-action-disable'
                            }`}
                            onClick={() => next()}
                            disabled={!nextStepBtn}
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

export default CreateCorporateContent;
