import React, { useState, useEffect } from 'react';
import {
  Col,
  Row,
  Input,
  Button,
  Form,
  Space,
  DatePicker,
  Tabs,
  message,
  Select,
  InputNumber,
} from 'antd';
import { useParams } from 'react-router-dom';
import { KTTitle } from 'core/ui';
import { useTranslation } from 'react-i18next';
import {} from '@ant-design/icons';
import moment from 'moment';
import CAInfomation from './tab-content/CAInfomation';
import LawRepresentatorInfomation from './tab-content/LawRepresentatorInfomation.js';
import AccountantInfomation from './tab-content/AccountantInfomation.js';
import AccountInfomation from './tab-content/AccountInfomation.js';
import UserInfomation from './tab-content/UserInfomation.js';
import ServicePackageInfomation from './tab-content/ServicePackageInformation.js';
import UpdateSuccessfullModal from './modal/UpdateSuccessfullModal.js';
import UpdateFailModal from './modal/UpdateFailModal.js';
import { useA00Domain } from '../domains/AM.01.05.01Domain.js';
import { useLocation } from 'react-router-dom';

import '../../../common/less/AM.01.05.01.less';
import '../../../../../../../../assets/less/LC-common.less';
var axios = require('axios');

const AM010501CorporateCustomer = ({ lang = 'vi', ...props }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const { id } = useParams();
  const [, domain] = useA00Domain();
  const dateFormatList = 'DD/MM/YYYY';
  const exceptThisSymbols = ['e', 'E', '+', '-', '.'];

  const [updateSuccessfulDialogVisible, setCreateSuccessfulDialogVisible] =
    useState(false);
  const [updateFailModalVisible, setCreateFailModalVisible] = useState(false);
  const { Option } = Select;
  const { TabPane } = Tabs;

  const [form] = Form.useForm();
  const [corporate, setCorporateData] = useState({
    paperType: '',
    corporateCode: '',
    corporateName: '',
    typeOfCorporate: '',
    corporateAddress: '',
    corporatePhoneNumber: '',
    corporateFaxNumber: '',
    corporateEmail: '',
    corporateWebsite: '',
    charterCapital: '',
    parValueShares: '',
    totalNumberOfShares: '',
    registrationTimes: '',
    dateRegistration: '',
    legalRepresentativeFullName: '',
    legalRepresentativeIdentifyNumber: '',
    legalRepresentativeIdentifyCreatedPlace: '',
    legalRepresentativeIdentifyCreatedDate: '',

    certificate: '',
    from: '',
    issuer: '',
    mst: '',
    serial: '',
    signature: '',
    signtime: '',
    subject: '',
    to: '',
    validity: '',
    //lawRepresentator
    user1DeputyName: '',
    user1DeputyIdentifyNumber: '',
    user1DeputyIdentifyCreatedDate: new Date(),
    user1DeputyIdentifyCreatedPlace: '',
    user1DeputyRoles: '',
    user1DeputyIdentifyPhone: '',
    user1DeputyIdentifyEmail: '',
    //Accountant
    user2DeputyName: '',
    user2DeputyIdentifyNumber: '',
    user2DeputyIdentifyCreatedDate: new Date(),
    user2DeputyIdentifyCreatedPlace: '',
    user2DeputyRoles: '',
    user2DeputyIdentifyPhone: '',
    user2DeputyIdentifyEmail: '',

    corporateAccountList: [],
    corporateUserList: [],

    packageServiceId: '1',
    channelInit: 'FPT',
  });

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
    function fetchData() {
      var config = domain.getCorporateByID(id);

      config
        .then((result) => {
          axios(result)
            .then(function (response) {
              console.log('res:::', response);
              var corporateRes = response.data.data;
              var tempcorporateAccountList = [];

              corporateRes.corporateAccountList.forEach((element) => {
                var tempBankInfo = {
                  bankId: element.bank.bankId,
                  corporateAccountName: element.corporateAccountName,
                  corporateAccountNumber: element.corporateAccountNumber,
                  corporateAccountStatus: element.corporateAccountStatus,
                  corporateAccountType: element.corporateAccountType,
                };
                tempcorporateAccountList.push(tempBankInfo);
              });

              var tempcorporateUserList = [];

              corporateRes.userInfoList.forEach((element) => {
                var roles = '';
                var groupCodes = '';
                element.userGroupEntitys.forEach((group) => {
                  roles = group.role;
                  groupCodes = group.userGroupCode;
                });

                var tempUserInfo = {
                  id: element.id,
                  userId: element.userId,
                  userCode: element.userCode,
                  email: element.email,
                  phoneNumber: element.phoneNumber,
                  role: roles,
                  userGroupCode: groupCodes,
                  userName: element.userName,
                  userStatus: element.userStatus,
                  position: element.position,
                  identityType: element.identityType,
                  identityNumber: element.identityNumber,
                  dateOfIdentity: element.dateOfIdentity,
                  issuedByIdentity: element.issuedByIdentity,
                };
                tempcorporateUserList.push(tempUserInfo);
              });

              if (!corporateRes.legalRepresentativeIdentifyCreatedDate) {
                corporateRes.legalRepresentativeIdentifyCreatedDate =
                  new Date();
              }
              var tempObj = {
                corporateCode: corporateRes.corporateCode,
                corporateName: corporateRes.corporateName,
                typeOfCorporate: corporateRes.typeOfCorporate,
                dateRegistration: convert(corporateRes.dateRegistration),
                registrationTimes: corporateRes.registrationTimes,
                corporateAddress: corporateRes.corporateAddress,
                corporatePhoneNumber: corporateRes.corporatePhoneNumber,
                corporateEmail: corporateRes.corporateEmail,
                corporateFaxNumber: corporateRes.corporateFaxNumber,
                corporateWebsite: corporateRes.corporateWebsite,
                charterCapital: corporateRes.charterCapital,
                parValueShares: corporateRes.parValueShares,
                totalNumberOfShares: corporateRes.totalNumberOfShares,

                legalRepresentativeFullName:
                  corporateRes.legalRepresentativeFullName,
                legalRepresentativeIdentifyNumber:
                  corporateRes.legalRepresentativeIdentifyNumber,
                legalRepresentativeIdentifyCreatedDate: convert(
                  corporateRes.legalRepresentativeIdentifyCreatedDate,
                ),
                legalRepresentativeIdentifyCreatedPlace:
                  corporateRes.legalRepresentativeIdentifyCreatedPlace,

                user1DeputyName: corporateRes.user1DeputyName,
                user1DeputyRoles: corporateRes.user1DeputyRoles,
                user1DeputyBirthday: convert(corporateRes.user1DeputyBirthday),
                user1DeputyIdentifyType: corporateRes.user1DeputyIdentifyType,
                user1DeputyIdentifyNumber:
                  corporateRes.user1DeputyIdentifyNumber,
                user1DeputyIdentifyCreatedDate: convert(
                  corporateRes.user1DeputyIdentifyCreatedDate,
                ),
                user1DeputyIdentifyCreatedPlace:
                  corporateRes.user1DeputyIdentifyCreatedPlace,
                user1DeputyIdentifyPhone: corporateRes.user1DeputyIdentifyPhone,
                user1DeputyIdentifyEmail: corporateRes.user1DeputyIdentifyEmail,

                user2DeputyName: corporateRes.user2DeputyName,
                user2DeputyRoles: corporateRes.user2DeputyRoles,
                user2DeputyBirthday: convert(corporateRes.user2DeputyBirthday),
                user2DeputyIdentifyType: corporateRes.user2DeputyIdentifyType,
                user2DeputyIdentifyNumber:
                  corporateRes.user2DeputyIdentifyNumber,
                user2DeputyIdentifyCreatedDate: convert(
                  corporateRes.user2DeputyIdentifyCreatedDate,
                ),
                user2DeputyIdentifyCreatedPlace:
                  corporateRes.user2DeputyIdentifyCreatedPlace,
                user2DeputyIdentifyPhone: corporateRes.user2DeputyIdentifyPhone,
                user2DeputyIdentifyEmail: corporateRes.user2DeputyIdentifyEmail,

                corporateAccountList: tempcorporateAccountList,
                corporateUserList: tempcorporateUserList,

                packageServiceId: corporateRes.packageServiceId,
                channelInit: corporateRes.channelInit,
              };
              console.log('Fetched data');
              console.log(tempObj);
              setCorporateData(tempObj);
              form.setFieldsValue({
                corporateCode: tempObj.corporateCode,
                corporateName: tempObj.corporateName,
                typeOfCorporate: tempObj.typeOfCorporate,
                dateRegistration: moment(
                  tempObj.dateRegistration,
                  dateFormatList,
                ),
                registrationTimes: tempObj.registrationTimes,
                corporateAddress: tempObj.corporateAddress,
                corporatePhoneNumber: tempObj.corporatePhoneNumber,
                corporateEmail: tempObj.corporateEmail,
                corporateFaxNumber: tempObj.corporateFaxNumber,
                corporateWebsite: tempObj.corporateWebsite,
                charterCapital: tempObj.charterCapital,
                parValueShares: tempObj.parValueShares,
                totalNumberOfShares: tempObj.totalNumberOfShares,

                legalRepresentativeFullName:
                  tempObj.legalRepresentativeFullName,
                legalRepresentativeIdentifyNumber:
                  tempObj.legalRepresentativeIdentifyNumber,
                legalRepresentativeIdentifyCreatedDate: moment(
                  tempObj.legalRepresentativeIdentifyCreatedDate,
                  dateFormatList,
                ),
                legalRepresentativeIdentifyCreatedPlace:
                  tempObj.legalRepresentativeIdentifyCreatedPlace,
                taxCodeNumber: tempObj.taxCodeNumber,
                taxCodeCreatedDate: moment(tempObj.taxCodeCreatedDate),
                taxCodeCreatedPlace: tempObj.taxCodeCreatedPlace,
                corporatePhoneNumber: tempObj.corporatePhoneNumber,
                corporateFaxNumber: tempObj.corporateFaxNumber,
                corporateStatus: tempObj.corporateStatus,
                user1DeputyName: tempObj.user1DeputyName,
                user1DeputyRoles: tempObj.user1DeputyRoles,
                user1DeputyBirthday: moment(tempObj.user1DeputyBirthday),
                user1DeputyIdentifyType: tempObj.user1DeputyIdentifyType,
                user1DeputyIdentifyNumber: tempObj.user1DeputyIdentifyNumber,
                user1DeputyIdentifyCreatedDate: moment(
                  tempObj.user1DeputyIdentifyCreatedDate,
                  dateFormatList,
                ),
                user1DeputyIdentifyCreatedPlace:
                  tempObj.user1DeputyIdentifyCreatedPlace,
                user1DeputyIdentifyPhone: tempObj.user1DeputyIdentifyPhone,
                user1DeputyIdentifyEmail: tempObj.user1DeputyIdentifyEmail,

                user2DeputyName: tempObj.user2DeputyName,
                user2DeputyRoles: tempObj.user2DeputyRoles,
                user2DeputyBirthday: moment(tempObj.user2DeputyBirthday),
                user2DeputyIdentifyType: tempObj.user2DeputyIdentifyType,
                user2DeputyIdentifyNumber: tempObj.user2DeputyIdentifyNumber,
                user2DeputyIdentifyCreatedDate: moment(
                  tempObj.user2DeputyIdentifyCreatedDate,
                ),
                user2DeputyIdentifyCreatedPlace:
                  tempObj.user2DeputyIdentifyCreatedPlace,
                user2DeputyIdentifyPhone: tempObj.user2DeputyIdentifyPhone,
                user2DeputyIdentifyEmail: tempObj.user2DeputyIdentifyEmail,
              });
            })
            .catch(function (error) {
              console.log(error);
            });
        })
        .catch((err) => console.log(err));
    }

    fetchData();
  }, []);

  function callback(key) {
    console.log(key);
  }

  function convert(str) {
    if (str != undefined && str != null && str != '' && str != 'aN/aN/NaN') {
      var date = new Date(str),
        mnth = ('0' + (date.getMonth() + 1)).slice(-2),
        day = ('0' + date.getDate()).slice(-2);
      return [day, mnth, date.getFullYear()].join('/');
    } else {
      return '';
    }
  }

  function onChangeCprData(e) {
    setCorporateData({ ...corporate, [e.target.name]: e.target.value });
  }

  function onChangeUser1DeputyIdentifyCreatedDate(e) {
    setCorporateData({
      ...corporate,
      user1DeputyIdentifyCreatedDate: convert(e._d),
    });
  }

  function onChangeUser2DeputyIdentifyCreatedDate(e) {
    setCorporateData({
      ...corporate,
      user2DeputyIdentifyCreatedDate: convert(e._d),
    });
  }

  function onChangeRegisterDate(e) {
    setCorporateData({ ...corporate, dateRegistration: convert(e._d) });
  }

  function onChangeIdentificationPaperCreatedDate(e) {
    setCorporateData({
      ...corporate,
      legalRepresentativeIdentifyCreatedDate: convert(e._d),
    });
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  //---------------OCR Law Representator Identification-------------------//
  var FormData = require('form-data');

  const [anhMatTruoc, setAnhMatTruoc] = useState();
  const [anhMatSau, setAnhMatSau] = useState();
  const [anhCaNhan, setAnhCaNhan] = useState();

  const getOcrIdentifyLawReprensetator = async () => {
    var dataForm1 = new FormData();
    dataForm1.append('fileFrontIdentify', anhMatTruoc);
    dataForm1.append('filePortrait', anhCaNhan);
    console.log('Received values of form: ', dataForm1);

    var dataForm2 = new FormData();
    dataForm2.append('ocrCode', '');
    dataForm2.append('fileFrontIdentify', anhMatTruoc);
    dataForm2.append('fileBackIdentify', anhMatSau);
    console.log('Received values of form: ', dataForm2);

    var configPromise = domain.verifyIdentify(dataForm1);
    var configPromise2 = domain.getOcrIdentify(dataForm2);
    configPromise
      .then((result) => {
        axios(result)
          .then(function (response) {
            console.log(response.data.data);
            /* if (response.data.data == 'Th??nh c??ng') {
              configPromise2
                .then((result) => {
                  axios(result)
                    .then(function (response) {
                      console.log(response.data.data);
                      var lawRepresentator = response.data.data;
                      if (
                        lawRepresentator != undefined &&
                        lawRepresentator != null
                      ) {
                        form.setFieldsValue({
                          user1DeputyName: lawRepresentator.hoVaTen,
                          user1DeputyIdentifyNumber: lawRepresentator.soCmt,
                          user1DeputyIdentifyCreatedDate: moment(
                            lawRepresentator.ngayCap,
                            dateFormatList,
                          ),
                        });

                        setCorporateData({
                          ...corporate,
                          user1DeputyName: lawRepresentator.hoVaTen,
                          user1DeputyIdentifyNumber: lawRepresentator.soCmt,
                          user1DeputyIdentifyCreatedDate:
                            lawRepresentator.ngayCap,
                        });
                      }
                    })
                    .catch(function (error) {
                      console.log(error);
                    });
                })
                .catch((err) => console.log(err));
            } */
            if (response.data.data == 'Th??nh c??ng') {
              configPromise2
                .then((result) => {
                  axios(result)
                    .then(function (response) {
                      console.log(response.data.data);
                      var lawRepresentator = response.data.data;
                      if (
                        lawRepresentator != undefined &&
                        lawRepresentator != null
                      ) {
                        if (
                          lawRepresentator.hoVaTen?.toLowerCase() ==
                          corporate.legalRepresentativeFullName?.toLowerCase()
                        ) {
                          form.setFieldsValue({
                            user1DeputyName: lawRepresentator.hoVaTen,
                            user1DeputyIdentifyNumber: lawRepresentator.soCmt,
                            user1DeputyIdentifyCreatedDate: moment(
                              lawRepresentator.ngayCap,
                              dateFormatList,
                            ),
                          });

                          setCorporateData({
                            ...corporate,
                            user1DeputyName: lawRepresentator.hoVaTen,
                            user1DeputyIdentifyNumber: lawRepresentator.soCmt,
                            user1DeputyIdentifyCreatedDate:
                              lawRepresentator.ngayCap,
                          });
                        } else {
                          message.error(response.data.message);
                          // message.error(
                          //   'T??n ng?????i ?????i di???n ph??p lu???t kh??ng kh???p v???i th??ng tin tr??n gi???y ??KKD !',
                          // );
                        }
                      } else {
                        message.error(response.data.message);
                        // message.error(
                        //   '???nh ch???p kh??ng kh???p v???i lo???i GTTT ???????c ch???n',
                        // );
                      }
                    })
                    .catch(function (error) {
                      console.log(error);
                    });
                })
                .catch((err) => console.log(err));
            } else {
              message.error(response.data.message);
              // message.error(
              //   '???nh ch???p ch??n dung kh??ng kh???p v???i th??ng tin tr??n GTTT',
              // );
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      })
      .catch((err) => console.log(err));
  };
  //-----------------------------------------------------------------//

  //-----------------OCR Accountant Identification-------------------//

  const [anhMatTruocAC, setAnhMatTruocAC] = useState();
  const [anhMatSauAC, setAnhMatSauAC] = useState();
  const [anhCaNhanAC, setAnhCaNhanAC] = useState();

  const getOcrIdentifyAC = async () => {
    var dataForm1 = new FormData();
    dataForm1.append('fileFrontIdentify', anhMatTruocAC);
    dataForm1.append('filePortrait', anhCaNhanAC);
    console.log('Received values of form: ', dataForm1);

    var dataForm2 = new FormData();
    dataForm2.append('ocrCode', '');
    dataForm2.append('fileFrontIdentify', anhMatTruocAC);
    dataForm2.append('fileBackIdentify', anhMatSauAC);
    console.log('Received values of form: ', dataForm2);

    var configPromise = domain.verifyIdentify(dataForm1);
    var configPromise2 = domain.getOcrIdentify(dataForm2);
    configPromise
      .then((result) => {
        axios(result)
          .then(function (response) {
            console.log(response.data.data);
            /* if (response.data.data == 'Th??nh c??ng') {
              configPromise2
                .then((result) => {
                  axios(result)
                    .then(function (response) {
                      console.log(response.data.data);
                      var accountant = response.data.data;
                      if (accountant != undefined && accountant != null) {
                        form.setFieldsValue({
                          user2DeputyName: accountant.hoVaTen,
                          user2DeputyIdentifyNumber: accountant.soCmt,
                          user2DeputyIdentifyCreatedDate: moment(
                            accountant.ngayCap,
                            dateFormatList,
                          ),
                          user2DeputyIdentifyCreatedPlace: accountant.noiCap,
                        });

                        setCorporateData({
                          ...corporate,
                          user2DeputyName: accountant.hoVaTen,
                          user2DeputyIdentifyNumber: accountant.soCmt,
                          user2DeputyIdentifyCreatedDate: accountant.ngayCap,
                          user2DeputyIdentifyCreatedPlace: accountant.noiCap,
                        });
                      }
                    })
                    .catch(function (error) {
                      console.log(error);
                    });
                })
                .catch((err) => console.log(err));
            } */

            if (response.data.data == 'Th??nh c??ng') {
              configPromise2
                .then((result) => {
                  axios(result)
                    .then(function (response) {
                      console.log(response.data.data);
                      var accountant = response.data.data;
                      if (accountant != undefined && accountant != null) {
                        form.setFieldsValue({
                          user2DeputyName: accountant.hoVaTen,
                          user2DeputyIdentifyNumber: accountant.soCmt,
                          user2DeputyIdentifyCreatedDate: moment(
                            accountant.ngayCap,
                            dateFormatList,
                          ),
                          user2DeputyIdentifyCreatedPlace: accountant.noiCap,
                        });

                        setCorporateData({
                          ...corporate,
                          user2DeputyName: accountant.hoVaTen,
                          user2DeputyIdentifyNumber: accountant.soCmt,
                          user2DeputyIdentifyCreatedDate: accountant.ngayCap,
                          user2DeputyIdentifyCreatedPlace: accountant.noiCap,
                        });
                      } else {
                        message.error(response.data.message);
                        // message.error(
                        //   '???nh ch???p kh??ng kh???p v???i lo???i GTTT ???????c ch???n',
                        // );
                      }
                    })
                    .catch(function (error) {
                      console.log(error);
                    });
                })
                .catch((err) => console.log(err));
            } else {
              message.error(response.data.message);
              // message.error(
              //   '???nh ch???p ch??n dung kh??ng kh???p v???i th??ng tin tr??n GTTT',
              // );
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      })
      .catch((err) => console.log(err));
  };
  //-----------------------------------------------------//

  //----------Tab ServicePackageInfomation---------------//
  // function onChangeCprData(e) {
  //   setCorporateData({ ...corporate, [e.target.name]: e.target.value });
  // }
  //-----------------------------------------------------//

  // Add new user group--------------
  const submitHandler = () => {
    console.log('corporate:', corporate);

    var data = {
      corporateCode: corporate.corporateCode,
      corporateName: corporate.corporateName,
      corporateNameEn: corporate.corporateName,
      typeOfCorporate: corporate.typeOfCorporate,
      dateRegistration: corporate.dateRegistration,
      registrationTimes: corporate.registrationTimes,
      corporateAddress: corporate.corporateAddress,
      corporatePhoneNumber: corporate.corporatePhoneNumber,
      corporateEmail: corporate.corporateEmail,
      corporateFaxNumber: corporate.corporateFaxNumber,
      corporateWebsite: corporate.corporateWebsite,
      charterCapital: corporate.charterCapital,
      parValueShares: corporate.parValueShares,
      totalNumberOfShares: corporate.totalNumberOfShares,

      legalRepresentativeFullName: corporate.legalRepresentativeFullName,
      legalRepresentativeIdentifyNumber:
        corporate.legalRepresentativeIdentifyNumber,
      legalRepresentativeIdentifyCreatedDate:
        corporate.legalRepresentativeIdentifyCreatedDate,
      legalRepresentativeIdentifyCreatedPlace:
        corporate.legalRepresentativeIdentifyCreatedPlace,

      user1DeputyName: corporate.user1DeputyName,
      user1DeputyIdentifyNumber: corporate.user1DeputyIdentifyNumber,
      user1DeputyIdentifyCreatedPlace:
        corporate.user1DeputyIdentifyCreatedPlace,
      user1DeputyIdentifyCreatedDate: corporate.user1DeputyIdentifyCreatedDate,
      user1DeputyRoles: corporate.user1DeputyRoles,
      user1DeputyIdentifyPhone: corporate.user1DeputyIdentifyPhone,
      user1DeputyIdentifyEmail: corporate.user1DeputyIdentifyEmail,

      user2DeputyName: corporate.user2DeputyName,
      user2DeputyIdentifyNumber: corporate.user2DeputyIdentifyNumber,
      user2DeputyIdentifyCreatedPlace:
        corporate.user2DeputyIdentifyCreatedPlace,
      user2DeputyIdentifyCreatedDate: corporate.user2DeputyIdentifyCreatedDate,
      user2DeputyRoles: corporate.user2DeputyRoles,
      user2DeputyIdentifyPhone: corporate.user2DeputyIdentifyPhone,
      user2DeputyIdentifyEmail: corporate.user2DeputyIdentifyEmail,

      corporateAccountList: corporate.corporateAccountList,
      corporateUserList: corporate.corporateUserList,
      packageServiceId: corporate.packageServiceId,
      channelInit: corporate.channelInit,
    };

    console.log('Received values of form: ', data);
    var configPromise = domain.editCorporate(id, data);
    configPromise
      .then((result) => {
        axios(result)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
            if (response.data.code == 200) {
              setCreateSuccessfulDialogVisible(true);
            } else {
              setCreateFailModalVisible(true);
            }
          })
          .catch(function (error) {
            console.log(error.data);
            setCreateFailModalVisible(true);
          });
      })
      .catch((err) => console.log(err));
  };

  function closeCreateSuccessfullModal() {
    setCreateSuccessfulDialogVisible(false);
    domain.exitHandler(id);
  }

  function closeCreateFailModal() {
    setCreateFailModalVisible(false);
  }

  return (
    <>
      <UpdateSuccessfullModal
        isVisbled={updateSuccessfulDialogVisible}
        onCloseModal={closeCreateSuccessfullModal}
        onClose={closeCreateSuccessfullModal}
      />

      <UpdateFailModal
        isVisbled={updateFailModalVisible}
        onCloseModal={closeCreateFailModal}
        onClose={closeCreateFailModal}
      />
      <div className={'main-container'}>
        <Row className={'padding-title'}>
          <Col span={15}>
            <KTTitle size={2}>
              <b>S???a th??ng tin kh??ch h??ng doanh nghi???p</b>
            </KTTitle>
          </Col>
        </Row>

        <Row className={'padding-md'}>
          <Col span={24}>
            <Form
              form={form}
              onFinish={submitHandler}
              onFinishFailed={onFinishFailed}
              layout="horizontal"
            >
              <Row className={'padding-title-sub1'}>
                <Col span={24}>
                  <KTTitle size={3}>
                    <b>Th??ng tin doanh nghi???p</b>
                  </KTTitle>
                </Col>
              </Row>
              <Row>
                <Col span={23}>
                  <Row>
                    <Col span={8}>
                      Lo???i gi???y t???<span className={'text-require'}>*</span>
                    </Col>
                    <Col span={16}>
                      <Form.Item name={'paperType'}>
                        <Select
                          disabled
                          defaultValue="gpdkdn"
                          className={'width-select'}
                          // onChange={paperTypeChange}
                        >
                          <Option value="gpdkdn">
                            Gi???y ph??p ????ng k?? doanh nghi???p
                          </Option>
                          <Option value="gcndkkd">
                            Gi???y ph??p ch???ng nh???n ????ng k?? kinh doanh
                          </Option>
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row>
                    <Col span={8}>
                      M?? s??? doanh nghi???p
                      <span className={'text-require'}>*</span>
                    </Col>
                    <Col span={16}>
                      <Form.Item name={'corporateCode'}>
                        <Input
                          disabled
                          name="corporateCode"
                          onChange={onChangeCprData}
                          value={corporate.corporateCode}
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row>
                    <Col span={8}>
                      T??n doanh nghi???p <span className={'text-require'}>*</span>
                    </Col>
                    <Col span={16}>
                      <Form.Item name={'corporateName'}>
                        <Input
                          disabled
                          name="corporateName"
                          onChange={onChangeCprData}
                          value={corporate.corporateName}
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row>
                    <Col span={8}>
                      Lo???i h??nh doanh nghi???p
                      <span className={'text-require'}>*</span>
                    </Col>
                    <Col span={16}>
                      <Form.Item name={'typeOfCorporate'}>
                        <Input
                          name="typeOfCorporate"
                          onChange={onChangeCprData}
                          value={corporate.typeOfCorporate}
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row>
                    <Col span={8}>
                      ?????a ch??? tr??? s??? ch??nh{' '}
                      <span className={'text-require'}>*</span>
                    </Col>
                    <Col span={16}>
                      <Form.Item name={'corporateAddress'}>
                        <Input
                          name="corporateAddress"
                          onChange={onChangeCprData}
                          value={corporate.corporateAddress}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={8}>
                      ??i???n tho???i <span className={'text-require'}>*</span>
                    </Col>
                    <Col span={16}>
                      <Form.Item name={'corporatePhoneNumber'}>
                        <Input
                          name="corporatePhoneNumber"
                          onChange={onChangeCprData}
                          value={corporate.corporatePhoneNumber}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={8}>
                      FAX
                      <span className={'text-require'}></span>
                    </Col>
                    <Col span={16}>
                      <Form.Item name={'corporateFaxNumber'}>
                        <Input
                          name="corporateFaxNumber"
                          onChange={onChangeCprData}
                          value={corporate.corporateFaxNumber}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={8}>
                      Email <span className={'text-require'}></span>
                    </Col>
                    <Col span={16}>
                      <Form.Item name={'corporateEmail'}>
                        <Input
                          name="corporateEmail"
                          onChange={onChangeCprData}
                          value={corporate.corporateEmail}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={8}>
                      Website
                      <span className={'text-require'}>*</span>
                    </Col>
                    <Col span={16}>
                      <Form.Item name={'corporateWebsite'}>
                        <Input
                          name="corporateWebsite"
                          onChange={onChangeCprData}
                          value={corporate.corporateWebsite}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={8}>
                      V???n ??i???u l??? (VN??){' '}
                      <span className={'text-require'}>*</span>
                    </Col>
                    <Col span={16}>
                      <Form.Item name={'charterCapital'}>
                        <InputNumber
                          span={16}
                          className={'width-input-number'}
                          value={corporate.charterCapital}
                          formatter={(value) =>
                            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                          }
                          parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                          name="charterCapital"
                          onChange={onChangeCprData}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={8}>
                      L???n ????ng k?? <span className={'text-require'}>*</span>
                    </Col>
                    <Col span={16}>
                      <Form.Item name={'registrationTimes'}>
                        <Input
                          name="registrationTimes"
                          type={'number'}
                          onKeyDown={(e) =>
                            exceptThisSymbols.includes(e.key) &&
                            e.preventDefault()
                          }
                          onChange={onChangeCprData}
                          value={corporate.registrationTimes}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={8}>
                      Ng??y ????ng k?? <span className={'text-require'}>*</span>
                    </Col>
                    <Col span={16}>
                      <Form.Item name={'dateRegistration'}>
                        <DatePicker
                          name="dateRegistration"
                          className={'width-date-picker'}
                          // defaultValue={moment('01/01/2015')}
                          defaultValue={moment('DD-MM-YYYY')}
                          format={dateFormatList}
                          placeholder="Ch???n ng??y ????ng k??"
                          onChange={onChangeRegisterDate}
                          // value={dateRegistration}
                        />
                      </Form.Item>

                      {/* <Form.Item name={'dateRegistration'}>
                        <Input
                          name="dateRegistration"
                          onChange={onChangeCprData}
                          value={corporate.dateRegistration}
                        />
                      </Form.Item> */}
                    </Col>
                  </Row>

                  <Row>
                    <Col span={8}>
                      Ng?????i ?????i di???n ph??p lu???t{' '}
                      <span className={'text-require'}>*</span>
                    </Col>
                    <Col span={16}>
                      <Form.Item name={'legalRepresentativeFullName'}>
                        <Input
                          name="legalRepresentativeFullName"
                          onChange={onChangeCprData}
                          value={corporate.legalRepresentativeFullName}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={8}>
                      S??? gi???y t??? ?????nh danh{' '}
                      <span className={'text-require'}>*</span>
                    </Col>
                    <Col span={16}>
                      <Form.Item name={'legalRepresentativeIdentifyNumber'}>
                        <Input
                          name="legalRepresentativeIdentifyNumber"
                          onChange={onChangeCprData}
                          value={corporate.legalRepresentativeIdentifyNumber}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={8}>
                      N??i c???p <span className={'text-require'}>*</span>
                    </Col>
                    <Col span={16}>
                      <Form.Item
                        name={'legalRepresentativeIdentifyCreatedPlace'}
                      >
                        <Input
                          name="legalRepresentativeIdentifyCreatedPlace"
                          onChange={onChangeCprData}
                          value={
                            corporate.legalRepresentativeIdentifyCreatedPlace
                          }
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={8}>
                      Ng??y c???p <span className={'text-require'}>*</span>
                    </Col>
                    <Col span={16}>
                      <Form.Item
                        name={'legalRepresentativeIdentifyCreatedDate'}
                      >
                        <DatePicker
                          name="legalRepresentativeIdentifyCreatedDate"
                          className={'width-date-picker'}
                          // defaultValue={moment('01/01/2015')}
                          defaultValue={moment('DD-MM-YYYY')}
                          format={dateFormatList}
                          placeholder="Ch???n ng??y c???p"
                          onChange={onChangeIdentificationPaperCreatedDate}
                          // value={legalRepresentativeIdentifyCreatedDate}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <Tabs defaultActiveKey="1" onChange={callback}>
                        <TabPane tab="Th??ng tin ch??? k?? s???" key="1">
                          <CAInfomation />
                        </TabPane>
                        <TabPane
                          tab="Th??ng tin ng?????i ?????i di???n ph??p lu???t"
                          key="2"
                        >
                          <LawRepresentatorInfomation
                            setAnhMatTruoc={setAnhMatTruoc}
                            setAnhMatSau={setAnhMatSau}
                            setAnhCaNhan={setAnhCaNhan}
                            getOcrIdentify={getOcrIdentifyLawReprensetator}
                            onLawRepresentatorChange={onChangeCprData}
                            onUser1DeputyIdentifyCreatedDateChange={
                              onChangeUser1DeputyIdentifyCreatedDate
                            }
                          />
                        </TabPane>
                        <TabPane tab="Th??ng tin k??? to??n tr?????ng" key="3">
                          <AccountantInfomation
                            setAnhMatTruocAC={setAnhMatTruocAC}
                            setAnhMatSauAC={setAnhMatSauAC}
                            setAnhCaNhanAC={setAnhCaNhanAC}
                            getOcrIdentifyAC={getOcrIdentifyAC}
                            onAccountantChange={onChangeCprData}
                            onUser2DeputyIdentifyCreatedDateChange={
                              onChangeUser2DeputyIdentifyCreatedDate
                            }
                          />
                        </TabPane>
                        <TabPane tab="Th??ng tin t??i kho???n" key="4">
                          <AccountInfomation
                            listBankAccount={corporate.corporateAccountList}
                          />
                        </TabPane>
                        <TabPane tab="Th??ng tin ng?????i d??ng" key="5">
                          <UserInfomation
                            listUserAccount={corporate.corporateUserList}
                          />
                        </TabPane>

                        <TabPane tab="G??i d???ch v???" key="6">
                          <ServicePackageInfomation
                            onServicePackageChange={onChangeCprData}
                            packageServiceId={corporate.packageServiceId}
                          />
                        </TabPane>
                      </Tabs>
                    </Col>
                  </Row>

                  <div id="form-footer">
                    <Form.Item>
                      <Space className={'padding-buton'}>
                        <Button className="common-btn" htmlType="submit">
                          X??c nh???n
                        </Button>
                        <Button
                          onClick={(e) => {
                            domain.exitHandler(id);
                          }}
                          className="secondary-btn"
                        >
                          ????ng
                        </Button>
                      </Space>
                    </Form.Item>
                  </div>
                </Col>
                <Col span={1}></Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default AM010501CorporateCustomer;
