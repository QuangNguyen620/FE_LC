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
import CreateSuccessfullModal from './modal/CreateSuccessfullModal.js';
import CreateFailModal from './modal/CreateFailModal';
import { useA00Domain } from '../domains/AM.01.05.01Domain.js';
import { useLocation } from 'react-router-dom';

import '../../../common/less/AM.01.05.01.less';
import '../../../../../../../../assets/less/LC-common.less';

var axios = require('axios');

const AM010501CorporateCustomer = ({ lang = 'vi', ...props }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const [, domain] = useA00Domain();
  const dateFormatList = 'DD/MM/YYYY';
  const [createSuccessfulDialogVisible, setCreateSuccessfulDialogVisible] =
    useState(false);
  const [createFailModalVisible, setCreateFailModalVisible] = useState(false);
  const { Option } = Select;
  const exceptThisSymbols = ['e', 'E', '+', '-', '.'];

  const [form] = Form.useForm();
  const [corporate, setCorporateData] = useState({
    paperType: '',
    corporateCode: '',
    corporateName: '',
    corporateType: '',
    hqAddress: '',
    corporatePhoneNumber: '',
    corporateFaxNumber: '',
    email: '',
    website: '',
    charterCapital: '',
    parValueShares: '',
    totalNumberOfShares: '',
    registerTime: '',
    dateRegistration: '',
    legalRepresentativeFullName: '',
    identificationPaperNumber: '',
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
    user1DeputyIdentifyCreatedDate: '',
    user1DeputyIdentifyCreatedPlace: '',
    user1DeputyRoles: '',
    user1DeputyIdentifyPhone: '',
    user1DeputyIdentifyEmail: '',
    //Accountant
    user2DeputyName: '',
    user2DeputyIdentifyNumber: '',
    user2DeputyIdentifyCreatedDate: '',
    user2DeputyIdentifyCreatedPlace: '',
    user2DeputyRoles: '',
    user2DeputyIdentifyPhone: '',
    user2DeputyIdentifyEmail: '',

    corporateAccountList: [],
    corporateUserList: [],

    packageServiceId: '1',
    channelInit: 'FPT',
  });

  // format YYYY/MM/DD
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

  //fetch data
  useEffect(() => {
    // ocrCorporateBussinessResponse: ocrCorporateBussinessResponse,
    // paperType: paperType,
    // ocrCorporateSignatureResponse: ocrCorporateSignatureResponse,
    console.log(location.state.ocrCorporateSignatureResponse);
    console.log(location.state.ocrCorporateBussinessResponse);
    console.log(location.state.paperType);
    var ocrBussiness = location.state.ocrCorporateBussinessResponse;
    var ocrSignature = {};
    var lawRepresentatorData = {};

    if (location.state.ocrCorporateSignatureResponse.length > 0) {
      ocrSignature = location.state.ocrCorporateSignatureResponse[0];
    } else {
      ocrSignature = null;
    }

    if (ocrBussiness.nguoiDaiDienPhapLuat.length > 0) {
      lawRepresentatorData = ocrBussiness.nguoiDaiDienPhapLuat[0];
    } else {
      lawRepresentatorData = null;
    }
    var tempObj = {
      corporateCode: ocrBussiness.maSoDoanhNghiep,
      corporateName: ocrBussiness.tenDoanhNghiep,
      corporateType: ocrBussiness.loaiHinhDoanhNghiep,
      hqAddress: ocrBussiness.diaChi,
      corporatePhoneNumber: ocrBussiness.dienThoai,
      corporateFaxNumber: ocrBussiness.fax,
      email: ocrBussiness.email,
      website: ocrBussiness.website,
      charterCapital: ocrBussiness.vonDieuLe,
      parValueShares: '',
      totalNumberOfShares: '',
      registerTime: ocrBussiness.lanDangKy,
      dateRegistration: ocrBussiness.ngayDangKy,

      legalRepresentativeFullName:
        lawRepresentatorData.hoVaTen != '' ? lawRepresentatorData.hoVaTen : '',
      identificationPaperNumber:
        lawRepresentatorData.soGiayTo != ''
          ? lawRepresentatorData.soGiayTo
          : '',
      legalRepresentativeIdentifyCreatedPlace:
        lawRepresentatorData.noiCap != '' ? lawRepresentatorData.noiCap : '',
      legalRepresentativeIdentifyCreatedDate:
        lawRepresentatorData.ngayCap != ''
          ? lawRepresentatorData.ngayCap
          : convert(new Date()),

      certificate: ocrSignature.certificate,
      from: ocrSignature.from,
      issuer: ocrSignature.issuer,
      mst: ocrSignature.mst,
      serial: ocrSignature.serial,
      signature: ocrSignature.signature,
      signtime: ocrSignature.signtime,
      subject: ocrSignature.subject,
      to: ocrSignature.to,
      validity: ocrSignature.validity,

      corporateAccountList: [],
      corporateUserList: [],
      packageServiceId: '1',
      channelInit: 'FPT',
    };
    setCorporateData(tempObj);
    // console.log(moment(new Date(), dateFormatList));
    form.setFieldsValue({
      paperType: location.state.paperType,
      corporateCode: ocrBussiness.maSoDoanhNghiep,
      corporateName: ocrBussiness.tenDoanhNghiep,
      corporateType: ocrBussiness.loaiHinhDoanhNghiep,
      hqAddress: ocrBussiness.diaChi,
      corporatePhoneNumber: ocrBussiness.dienThoai,
      corporateFaxNumber: ocrBussiness.fax,
      email: ocrBussiness.email,
      website: ocrBussiness.website,
      charterCapital: ocrBussiness.vonDieuLe,
      registerTime: ocrBussiness.lanDangKy,
      dateRegistration: moment(ocrBussiness.ngayDangKy, dateFormatList),

      legalRepresentativeFullName:
        lawRepresentatorData.hoVaTen != '' ? lawRepresentatorData.hoVaTen : '',
      identificationPaperNumber:
        lawRepresentatorData.soGiayTo != ''
          ? lawRepresentatorData.soGiayTo
          : '',
      legalRepresentativeIdentifyCreatedPlace:
        lawRepresentatorData.noiCap != '' ? lawRepresentatorData.noiCap : '',
      legalRepresentativeIdentifyCreatedDate: moment(
        lawRepresentatorData.ngayCap != ''
          ? lawRepresentatorData.ngayCap
          : convert(new Date()),
        dateFormatList,
      ),

      certificate: ocrSignature.certificate,
      from: ocrSignature.from,
      issuer: ocrSignature.issuer,
      mst: ocrSignature.mst,
      serial: ocrSignature.serial,
      signature: ocrSignature.signature,
      signtime: ocrSignature.signtime,
      subject: ocrSignature.subject,
      to: ocrSignature.to,
      validity: ocrSignature.validity,
    });
  }, [location]);

  const { TabPane } = Tabs;

  function callback(key) {
    console.log(key);
  }

  function onChangeCprData(e) {
    setCorporateData({ ...corporate, [e.target.name]: e.target.value });
  }

  function onChangeLRIdIssuedDate(e) {
    setCorporateData({
      ...corporate,
      user1DeputyIdentifyCreatedDate: convert(e._d),
    });
  }

  function onChangeACIdIssuedDate(e) {
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
      typeOfCorporate: corporate.corporateType,
      dateRegistration: corporate.dateRegistration,
      registrationTimes: corporate.registerTime,
      corporateAddress: corporate.hqAddress,
      corporatePhoneNumber: corporate.corporatePhoneNumber,
      corporateEmail: corporate.email,
      corporateFaxNumber: corporate.corporateFaxNumber,
      corporateWebsite: corporate.website,
      charterCapital: corporate.charterCapital,
      parValueShares: corporate.parValueShares,
      totalNumberOfShares: corporate.totalNumberOfShares,

      legalRepresentativeFullName: corporate.legalRepresentativeFullName,
      legalRepresentativeIdentifyNumber: corporate.identificationPaperNumber,
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
    var configPromise = domain.createNewCorporate(data);
    configPromise
      .then((result) => {
        axios(result)
          .then(function (response) {
            console.log(response);
            if (response.data.code == 200) {
              setCreateSuccessfulDialogVisible(true);
            } else {
              setCreateFailModalVisible(true);
            }
          })
          .catch(function (error) {
            console.log(error);
            setCreateFailModalVisible(true);
          });
      })
      .catch((err) => console.log(err));
  };

  function closeCreateSuccessfullModal() {
    setCreateSuccessfulDialogVisible(false);
    domain.exitHandler();
  }

  function closeCreateFailModal() {
    setCreateFailModalVisible(false);
  }

  return (
    <>
      <CreateSuccessfullModal
        isVisbled={createSuccessfulDialogVisible}
        onCloseModal={closeCreateSuccessfullModal}
        onClose={closeCreateSuccessfullModal}
      />

      <CreateFailModal
        isVisbled={createFailModalVisible}
        onCloseModal={closeCreateFailModal}
        onClose={closeCreateFailModal}
      />
      <div className={'main-container'}>
        <Row className={'padding-title'}>
          <Col span={15}>
            <KTTitle size={2}>
              <b>M??? t??i kho???n kh??ch h??ng doanh nghi???p</b>
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
                  <KTTitle size={3} className={'font-weight-title'}>
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
                      <Form.Item
                        name={'paperType'}
                        rules={[
                          {
                            required: true,
                            message:
                              'Tr?????ng lo???i gi???y t??? kh??ng ???????c ph??p ????? tr???ng!',
                          },
                        ]}
                      >
                        <Select
                          disabled
                          defaultValue="gpdkdn"
                          className={'width-select'}
                          // onChange={paperTypeChange}
                        >
                          <Option value="gpdkdn">
                            Gi???y ph??p ch???ng nh???n ????ng k?? doanh nghi???p
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
                      <Form.Item name={'corporateType'}>
                        <Input
                          name="corporateType"
                          onChange={onChangeCprData}
                          value={corporate.corporateType}
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
                      <Form.Item name={'hqAddress'}>
                        <Input
                          name="hqAddress"
                          onChange={onChangeCprData}
                          value={corporate.hqAddress}
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
                      FAX<span className={'text-require'}></span>
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
                      <Form.Item name={'email'}>
                        <Input
                          name="email"
                          onChange={onChangeCprData}
                          value={corporate.email}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={8}>
                      Website<span className={'text-require'}>*</span>
                    </Col>
                    <Col span={16}>
                      <Form.Item name={'website'}>
                        <Input
                          name="website"
                          onChange={onChangeCprData}
                          value={corporate.website}
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
                      <Form.Item name={'registerTime'}>
                        <Input
                          name="registerTime"
                          type={'number'}
                          onKeyDown={(e) =>
                            exceptThisSymbols.includes(e.key) &&
                            e.preventDefault()
                          }
                          onChange={onChangeCprData}
                          value={corporate.registerTime}
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
                          defaultValue={moment(dateFormatList)}
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
                      <Form.Item name={'identificationPaperNumber'}>
                        <Input
                          name="identificationPaperNumber"
                          onChange={onChangeCprData}
                          value={corporate.identificationPaperNumber}
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
                              onChangeLRIdIssuedDate
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
                              onChangeACIdIssuedDate
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
                            domain.exitHandler(e);
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
