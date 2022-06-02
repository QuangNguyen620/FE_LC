import React, { useState, useEffect } from 'react';
import {
  Col,
  Row,
  Button,
  Form,
  Steps,
  Card,
  Space,
  Spin,
  message,
} from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { KTTitle } from 'core/ui';
import log from './ModuleLogger';
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

import Dropzone from './upload/component/dropzone/Dropzone';
import { KTLogo } from 'core/ui';
import ic_fis from 'assets/img/brand/logo_fis.png';

import { UpdateCorporateDomain } from '../domains/EditUploadCorporateDomain';
import { useLocation } from 'react-router-dom';
import './EditCorporate.less';
import '../../../../../assets/less/LC-common.less';

const { Step } = Steps;
const CreateCorporateContent = ({ lang = 'vi', ...props }) => {
  const { t } = useTranslation();
  const dateFormat = 'DD/MM/YYYY';
  const [form] = Form.useForm();
  const location = useLocation();
  const [context, domain] = UpdateCorporateDomain();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    domain.initDomain();
    // if (
    //   location?.state?.activeKey != undefined &&
    //   location?.state?.activeKey != null
    // ) {
    //   setCurrent(location?.state?.activeKey * 1);
    // }
    setCurrent(0);
  }, []);

  // useEffect(() => {
  //   domain.initDomainUpload();
  // }, []);

  useEffect(() => {
    log.debug('useEffect--', context);
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
      message.error('Vui lòng nhập đủ thông tin người dùng');
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
      message.error('Doanh nghiệp chưa có thông tin tài khoản ngân hàng');
      checkAcc = false;
    }
    if (!checkAcc && userList.length > 0) {
      message.error('Vui lòng nhập đủ thông tin tài khoản ngân hàng');
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
        'Tên người đại diện pháp luật không khớp với thông tin trên giấy ĐKKD',
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
        'Tên người đại diện pháp luật không khớp với thông tin trên giấy ĐKKD',
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
      registerDate: moment(context?.corporate?.registerDate, dateFormat),

      lawRepresentatorFullName: context?.corporate?.lawRepresentatorFullName,
      identificationPaperNumber: context?.corporate?.identificationPaperNumber,
      identificationPaperCreatedPlace:
        context?.corporate?.identificationPaperCreatedPlace,
      identificationPaperCreatedDate: moment(
        convert(context?.corporate?.identificationPaperCreatedDate),
        dateFormat,
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

      lRDOB: moment(context?.corporate?.lRDOB, dateFormat),
      lRIdIssuedDate: moment(context?.corporate?.lRIdIssuedDate, dateFormat),
      lRIdIssuedPlace: context?.corporate?.lRIdIssuedPlace,
      lRRole: context?.corporate?.lRRole,
      lRPhoneNumber: context?.corporate?.lRPhoneNumber,
      lREmail: context?.corporate?.lREmail,

      acName: context?.corporate?.acName,
      acIdNumber: context?.corporate?.acIdNumber,
      acDOB: moment(context?.corporate?.acDOB, dateFormat),
      acIdIssuedDate: moment(context?.corporate?.acIdIssuedDate, dateFormat),
      acIdIssuedPlace: context?.corporate?.acIdIssuedPlace,
      acRole: context?.corporate?.acRole,
      acPhoneNumber: context?.corporate?.acPhoneNumber,
      acEmail: context?.corporate?.acEmail,
      lawRepresentatorPaperType: context?.lawRepresentatorPaperType,
      accountantPaperType: context?.accountantPaperType,
    });
    // console.log('----context', context);
  }, [context]);

  return (
    <>
      <div style={{ display: context?.viewEdit ? '' : 'none' }}>
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
                title="Sửa tài khoản khách hàng doanh nghiệp"
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
                        {current == 0 && (
                          <Button onClick={() => domain.toUploadFile()}>
                            <span>
                              <LeftOutlined />
                            </span>
                            Quay lại{' '}
                          </Button>
                        )}
                        {current > 0 && (
                          <Button onClick={() => prev()}>
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
                            Lưu{' '}
                            {/* <span style={{ marginLeft: '5px' }}>
                              <CheckCircleFilled />
                            </span> */}
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
      <div
        // class="upload-file-form-container"
        style={{ display: context?.viewEditUpload ? '' : 'none' }}
      >
        <Row style={{ paddingTop: '100px', paddingBottom: '162px' }}>
          <Col span={8}></Col>
          <Col align="middle" className="card-container" span={8}>
            <Spin Spin size="large" spinning={context?.loading}>
              <Card className="custom-card" bordered={false}>
                <Form onFinish={domain.handleSubmission} layout="horizontal">
                  <KTLogo mode="logo" logo={ic_fis} />
                  <Row className="padding-md">
                    <Col span={24}>
                      <KTTitle size={2}>
                        <b>
                          Vui lòng tải lên giấy chứng nhận đăng ký doanh nghiệp
                        </b>
                      </KTTitle>
                    </Col>
                  </Row>
                  <Row className="padding-md">
                    <Col span={24}>
                      <KTTitle size={5}>
                        <span style={{ color: '#F5222D' }}>*</span> Lưu ý: Tệp
                        tải lên là tệp PDF có chữ ký số của công ty
                      </KTTitle>
                    </Col>
                  </Row>
                  <Row className="padding-md">
                    <Col span={24}>
                      <div>
                        <Form.Item name={'fileDir'}>
                          <Dropzone />
                        </Form.Item>
                      </div>
                    </Col>
                  </Row>
                  <div
                    className="padding-md"
                    style={{ textAlign: '-webkit-center' }}
                    id="form-footer"
                  >
                    <Form.Item>
                      <Space
                        direction="horizontal"
                        size={24}
                        style={{
                          marginRight: 'auto',
                        }}
                      >
                        <Button
                          onClick={(e) => {
                            domain.toEdit(e);
                          }}
                          className="secondary-btn"
                        >
                          Thoát
                        </Button>
                        <Button
                          disabled={
                            context?.selectedFile?.invalid == true ||
                            context?.isFilePicked == false
                              ? true
                              : false
                          }
                          className={` ${
                            context?.selectedFile?.invalid == true ||
                            context?.isFilePicked == false
                              ? 'common-btn-disabled'
                              : 'common-btn'
                          }`}
                          htmlType="submit"
                        >
                          Tiếp tục
                        </Button>
                      </Space>
                    </Form.Item>
                  </div>
                </Form>
              </Card>
            </Spin>
          </Col>
          <Col span={8}></Col>
        </Row>
      </div>
    </>
  );
};

export default CreateCorporateContent;
