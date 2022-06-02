import { useRef, useEffect } from 'react';
import { message } from 'antd';
import { useHistory } from 'react-router';
import moment from 'moment';
import ViewCorporateService from '../services/ViewCorporateService';
var axios = require('axios');

export function CreateCorporateDomain() {
  const history = useHistory();
  const [context, contextService] = ViewCorporateService();

  const contextRef = useRef(context);

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
    contextRef.current = context;
    console.log('context::', context);
  }, [context]);

  const initDomain = async () => {
    var contextData = {
      userGroupCode: [],
      //eKYC đại diện pháp luật
      anhMatTruoc: '',
      isAnhMatTruocPicked: false,
      anhMatTruocUrl: '',

      anhMatSau: '',
      isAnhMatSauPicked: false,
      anhMatSauUrl: '',

      anhCaNhan: '',
      isAnhCaNhanPicked: false,
      anhCaNhanUrl: '',

      //eKYC kế toán trưởng
      anhMatTruocAC: '',
      isAnhMatTruocACPicked: false,
      anhMatTruocACUrl: '',

      anhMatSauAC: '',
      isAnhMatSauACPicked: false,
      anhMatSauACUrl: '',

      anhCaNhanAC: '',
      isAnhCaNhanACPicked: false,
      anhCaNhanACUrl: '',
      //---------------------//
      corporate: {
        paperType: '',
        businessRegistrationCertificateUrl: '',
        corporateCode: '',
        corporateName: '',
        corporateType: '',
        hqAddress: '',
        phoneNumber: '',
        fax: '',
        email: '',
        website: '',
        budget: '',
        registerTime: '',
        registerDate: '',
        lawRepresentatorFullName: '',
        identificationPaperNumber: '',
        identificationPaperCreatedPlace: '',
        identificationPaperCreatedDate: '',

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
        lawRepresentatorName: '',
        lRIdNumber: '',
        lRDOB: '',
        lRIdIssuedDate: '',
        lRIdIssuedPlace: '',
        lRRole: 'legal_representative',
        lRPhoneNumber: '',
        lREmail: '',
        frontOfUser1DeputyIdentifyUrl: '',
        backOfUser1DeputyIdentifyUrl: '',
        portraitOfUser1DeputyUrl: '',
        //Accountant
        acName: '',
        acIdNumber: '',
        acDOB: '',
        acIdIssuedDate: '',
        acIdIssuedPlace: '',
        acRole: 'accountant',
        acPhoneNumber: '',
        acEmail: '',
        frontOfUser2DeputyIdentifyUrl: '',
        backOfUser2DeputyIdentifyUrl: '',
        portraitOfUser2DeputyUrl: '',

        corporateAccountList: [],
        corporateUserList: [],

        packageServiceId: '1',
      },
      userLR: {
        lawRepresentatorName: '',
        lRIdNumber: '',
        lRDOB: '',
        lRIdIssuedDate: '',
        lRIdIssuedPlace: '',
        lRRole: '',
        lRPhoneNumber: '',
        lREmail: '',
      },
      userAC: {
        acName: '',
        acIdNumber: '',
        acDOB: '',
        acIdIssuedDate: '',
        acIdIssuedPlace: '',
        acRole: '',
        acPhoneNumber: '',
        acEmail: '',
      },
      loading: false,
      createSuccessModalVisible: false,
      constantValue: {
        bankList: [],
      },
      activeKey: '0',
    };
    console.log('init domain');
    await contextService.initContext(contextData);

    console.log('get data');
    await getData();
    await getAllUserGroupCode();
    console.log('get all bank');
    await getBankList();
  };

  function checkData(data) {
    return typeof data !== 'undefined' && data;
  }

  function convertTextPosition(data) {
    var position = '';
    switch (data) {
      case 'legal_representative':
        position = 'Người đại diện pháp luật';
        break;
      case 'accountant':
        position = 'Kế toán trưởng';
        break;
    }
    return position;
  }

  function convertToPaperType(data) {
    if (data == 'ho_chieu') {
      return 'hc';
    }
    return '';
  }

  const getData = async () => {
    // localStorage.corporateId

    var config = {
      method: 'get',
      url:
        process.env.REACT_APP_API_BACKEND +
        '/corporate/get/' +
        localStorage.corporateId +
        '',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.access_token + '',
      },
    };

    let response = await axios(config);
    console.log(response.data.data);

    var resData = response?.data?.data;
    if (checkData(resData)) {
      var tempUserArr = [];
      var userList = resData?.userInfoList;
      if (checkData(userList) && userList.length > 0) {
        for (let i = 0; i < userList.length; i++) {
          console.log(userList[i]?.userGroupEntitys[0]?.userGroupCode);

          var userGroupCodeTxt =
            userList[i]?.userGroupEntitys[0]?.userGroupCode;
          var userGroupNameTxt =
            userList[i]?.userGroupEntitys[0]?.userGroupName;
          var userRoleTxt = userList[i]?.userGroupEntitys[0]?.role;

          var element = {
            index: i,
            key: i,
            id: userList[i].id,
            userCode: userList[i].userCode,
            userName: userList[i].userName,
            position: userList[i].position,
            identityType: userList[i].identityType,
            identityNumber: userList[i].identityNumber,
            dateOfIdentity: userList[i].dateOfIdentity,
            issuedByIdentity: userList[i].issuedByIdentity,
            phoneNumber: userList[i].phoneNumber,
            email: userList[i].email,
            userGroupCode: userGroupCodeTxt,
            userGroupName: userGroupNameTxt,
            role: userRoleTxt,
            userStatus: userList[i].userStatus,

            imageFrontOfIdentity: userList[i].imageFrontOfIdentity,
            imageBackOfIdentity: userList[i].imageBackOfIdentity,
            imagePortraitOfIdentity: userList[i].imagePortraitOfIdentity,

            imageFrontOfIdentityUrl: userList[i].imageFrontOfIdentityUrl,
            imageBackOfIdentityUrl: userList[i].imageBackOfIdentityUrl,
            imagePortraitOfIdentityUrl: userList[i].imagePortraitOfIdentityUrl,
            dateOfBirth: userList[i].dateOfBirth,
          };
          tempUserArr.push(element);
        }
      } else {
        tempUserArr = [];
      }

      var tempAccountArr = [];
      var accountList = response?.data?.data?.corporateAccountList;
      if (checkData(accountList)) {
        for (
          let index = 0;
          index < response.data.data.corporateAccountList.length;
          index++
        ) {
          var element = {
            index: index,
            bankId: response.data.data.corporateAccountList[index].bank.bankId,
            corporateAccountName:
              response.data.data.corporateAccountList[index]
                .corporateAccountName,
            corporateAccountNumber:
              response.data.data.corporateAccountList[index]
                .corporateAccountNumber,
            corporateAccountStatus:
              response.data.data.corporateAccountList[index]
                .corporateAccountStatus,
            corporateAccountType:
              response.data.data.corporateAccountList[index]
                .corporateAccountType,
          };
          tempAccountArr.push(element);
        }
      } else {
        tempAccountArr = [];
      }

      console.log('resData:::', resData);
      await contextService.updateContext({
        ...contextRef.current,
        corporate: {
          //Thông tin chung
          businessRegistrationCertificateUrl:
            resData?.businessRegistrationCertificateUrl,
          businessRegistrationCertificateUrlMinio:
            resData?.businessRegistrationCertificateUrlMinio,
          corporateCode: resData?.corporateCode,
          corporateName: resData?.corporateName,
          corporateType: resData?.typeOfCorporate,
          hqAddress: resData?.corporateAddress,
          phoneNumber: resData?.corporatePhoneNumber,
          fax: resData?.corporateFaxNumber,
          email: resData?.corporateEmail,
          website: resData?.corporateWebsite,
          budget: resData?.charterCapital,
          registerTime: resData?.registrationTimes,
          registerDate: convert(resData?.dateRegistration),
          lawRepresentatorFullName: resData?.legalRepresentativeFullName,
          identificationPaperNumber: resData?.legalRepresentativeIdentifyNumber,
          identificationPaperCreatedDate: convert(
            resData?.legalRepresentativeIdentifyCreatedDate,
          ),
          identificationPaperCreatedPlace:
            resData?.legalRepresentativeIdentifyCreatedPlace,
          //Ký số
          certificate: resData?.signatureCertificate,
          from: resData?.signatureValueDate,
          issuer: resData?.signatureReleaseBy,
          mst: resData?.signatureTaxCode,
          serial: resData?.signatureSerial,
          signature: resData?.signature,
          signtime: resData?.signatureTime,
          subject: resData?.signatureSubscriberName,
          to: resData?.signatureExpirationDate,
          validity: resData?.signatureValue,

          //lawRepresentator
          lawRepresentatorName: tempUserArr[0].userName,
          lRIdNumber: tempUserArr[0].identityNumber,
          lRIdIssuedDate: tempUserArr[0].dateOfIdentity,

          lRIdIssuedPlace: tempUserArr[0].issuedByIdentity,
          lRRole: convertTextPosition(tempUserArr[0].position),
          lRPhoneNumber: tempUserArr[0].phoneNumber,
          lREmail: tempUserArr[0].email,
          lRDOB: tempUserArr[0].dateOfBirth,

          // Accountant
          acName: tempUserArr[1].userName,
          acIdNumber: tempUserArr[1].identityNumber,
          acIdIssuedDate: tempUserArr[1].dateOfIdentity,
          acIdIssuedPlace: tempUserArr[1].issuedByIdentity,
          acRole: convertTextPosition(tempUserArr[1].position),
          acPhoneNumber: tempUserArr[1].phoneNumber,
          acEmail: tempUserArr[1].email,
          acDOB: tempUserArr[1].dateOfBirth,

          corporateAccountList: tempAccountArr,
          corporateUserList: tempUserArr,
          packageServiceId: resData?.packageServiceId,
        },
        anhMatTruocUrl: tempUserArr[0].imageFrontOfIdentityUrl,
        anhMatSauUrl: tempUserArr[0].imageBackOfIdentityUrl,
        anhCaNhanUrl: tempUserArr[0].imagePortraitOfIdentityUrl,
        anhMatTruocACUrl: tempUserArr[1].imageFrontOfIdentityUrl,
        anhMatSauACUrl: tempUserArr[1].imageBackOfIdentityUrl,
        anhCaNhanACUrl: tempUserArr[1].imagePortraitOfIdentityUrl,
        lawRepresentatorPaperType: convertToPaperType(
          tempUserArr[0].identityType,
        ),
        accountantPaperType: convertToPaperType(tempUserArr[1].identityType),
      });
      // console.log('contextRef.current', contextRef.current);
    }
  };

  //---------eKYC Đại diện pháp luật--------------//

  const anhMatTruocLRChangeHandler = (event) => {
    contextService.updateContext({
      ...contextRef.current,
      anhMatTruoc: event.target.files[0],
      isAnhMatTruocPicked: true,
    });
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      contextService.updateContext({
        ...contextRef.current,
        anhMatTruocUrl: reader.result,
      });
    });
    if (event.target.files[0] != undefined && event.target.files[0] != null) {
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const anhMatSauLRChangeHandler = (event) => {
    contextService.updateContext({
      ...contextRef.current,
      anhMatSau: event.target.files[0],
      isAnhMatSauPicked: true,
    });
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      contextService.updateContext({
        ...contextRef.current,
        anhMatSauUrl: reader.result,
      });
    });
    if (event.target.files[0] != undefined && event.target.files[0] != null) {
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const anhCaNhanLRChangeHandler = (event) => {
    contextService.updateContext({
      ...contextRef.current,
      anhCaNhan: event.target.files[0],
      isAnhCaNhanPicked: true,
    });
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      contextService.updateContext({
        ...contextRef.current,
        anhCaNhanUrl: reader.result,
      });
    });
    if (event.target.files[0] != undefined && event.target.files[0] != null) {
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const getOcrIdentifyLawReprensetator = (
    anhMatTruoc,
    anhMatSau,
    anhCaNhan,
  ) => {
    if (
      anhMatTruoc == undefined ||
      anhMatSau == undefined ||
      anhCaNhan == undefined
    ) {
      message.error('File upload không được để trống');
      contextService.updateContext({
        ...contextRef.current,
        loading: false,
      });
    } else {
      var dataForm1 = new FormData();
      dataForm1.append('fileFrontIdentify', anhMatTruoc);
      dataForm1.append('filePortrait', anhCaNhan);
      console.log('Received values of form: ', dataForm1);

      var dataForm2 = new FormData();
      dataForm2.append('ocrCode', '');
      dataForm2.append('fileFrontIdentify', anhMatTruoc);
      dataForm2.append('fileBackIdentify', anhMatSau);
      console.log('Received values of form: ', dataForm2);

      var responseVerify = verifyIdentify(dataForm1);
      responseVerify.then((response) => {
        if (response.data == 'Thành công') {
          var responseOcr = getOcrIdentify(dataForm2);
          responseOcr.then((response) => {
            contextService.updateContext({
              ...contextRef.current,
              loading: false,
            });
            console.log(response.data);
            contextService.updateContext({
              ...contextRef.current,
              corporate: {
                ...contextRef.current.corporate,
                lawRepresentatorName: response.data.hoVaTen,
                lRIdNumber: response.data.soCmt,
                lRDOB: response.data.namSinh,
                lRIdIssuedDate: response.data.ngayCap,
                lRRole: 'legal_representative',
              },
              userLR: {
                ...contextRef.current.userLR,
                lawRepresentatorName: response.data.hoVaTen,
                lRIdNumber: response.data.soCmt,
                lRDOB: response.data.namSinh,
                lRIdIssuedDate: response.data.ngayCap,
                lRRole: 'legal_representative',
              },
            });
          });
        } else {
          message.info(response.data.message);
          // message.error(
          //   'Ảnh cá nhân và ảnh trên giấy tờ tùy thân không khớp. Vui lòng thử lại',
          // );
          contextService.updateContext({
            ...contextRef.current,
            loading: false,
          });
        }
      });
    }
  };

  const submitFileLR = async () => {
    contextService.updateContext({
      ...contextRef.current,
      loading: true,
    });

    getOcrIdentifyLawReprensetator(
      contextRef.current.anhMatTruoc,
      contextRef.current.anhMatSau,
      contextRef.current.anhCaNhan,
    );
  };
  //----------------------------------------------//

  //----------eKYC Kế toán trưởng----------------//

  const anhMatTruocACChangeHandler = (event) => {
    contextService.updateContext({
      ...contextRef.current,
      anhMatTruocAC: event.target.files[0],
      isAnhMatTruocACPicked: true,
    });
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      contextService.updateContext({
        ...contextRef.current,
        anhMatTruocACUrl: reader.result,
      });
    });
    if (event.target.files[0] != undefined && event.target.files[0] != null) {
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const anhMatSauACChangeHandler = (event) => {
    contextService.updateContext({
      ...contextRef.current,
      anhMatSauAC: event.target.files[0],
      isAnhMatSauACPicked: true,
    });
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      contextService.updateContext({
        ...contextRef.current,
        anhMatSauACUrl: reader.result,
      });
    });
    if (event.target.files[0] != undefined && event.target.files[0] != null) {
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const anhCaNhanACChangeHandler = (event) => {
    contextService.updateContext({
      ...contextRef.current,
      anhCaNhanAC: event.target.files[0],
      isAnhCaNhanACPicked: true,
    });
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      contextService.updateContext({
        ...contextRef.current,
        anhCaNhanUrl: reader.result,
      });
    });
    if (event.target.files[0] != undefined && event.target.files[0] != null) {
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const getOcrIdentifyAccountant = (anhMatTruoc, anhMatSau, anhCaNhan) => {
    if (
      anhMatTruoc == undefined ||
      anhMatSau == undefined ||
      anhCaNhan == undefined
    ) {
      message.error('File upload không được để trống');
      contextService.updateContext({
        ...contextRef.current,
        loading: false,
      });
    } else {
      var dataForm1 = new FormData();
      dataForm1.append('fileFrontIdentify', anhMatTruoc);
      dataForm1.append('filePortrait', anhCaNhan);
      console.log('Received values of form: ', dataForm1);

      var dataForm2 = new FormData();
      dataForm2.append('ocrCode', '');
      dataForm2.append('fileFrontIdentify', anhMatTruoc);
      dataForm2.append('fileBackIdentify', anhMatSau);
      console.log('Received values of form: ', dataForm2);

      var responseVerify = verifyIdentify(dataForm1);
      responseVerify.then((response) => {
        if (response.data == 'Thành công') {
          var responseOcr = getOcrIdentify(dataForm2);
          responseOcr.then((response) => {
            contextService.updateContext({
              ...contextRef.current,
              loading: false,
            });
            console.log(response.data);
            contextService.updateContext({
              ...contextRef.current,
              corporate: {
                ...contextRef.current.corporate,
                acName: response.data.hoVaTen,
                acIdNumber: response.data.soCmt,
                acDOB: response.data.namSinh,
                acIdIssuedDate: response.data.ngayCap,
                acRole: 'accountant',
              },
              userAC: {
                ...contextRef.current.userAC,
                acName: response.data.hoVaTen,
                acIdNumber: response.data.soCmt,
                acDOB: response.data.namSinh,
                acIdIssuedDate: response.data.ngayCap,
                acRole: 'accountant',
              },
            });
          });
        } else {
          message.error(
            'Ảnh cá nhân và ảnh trên giấy tờ tùy thân không khớp. Vui lòng thử lại',
          );
          contextService.updateContext({
            ...contextRef.current,
            loading: false,
          });
        }
      });
    }
  };

  const submitFileAC = async () => {
    contextService.updateContext({
      ...contextRef.current,
      loading: true,
    });
    getOcrIdentifyAccountant(
      contextRef.current.anhMatTruocAC,
      contextRef.current.anhMatSauAC,
      contextRef.current.anhCaNhanAC,
    );
  };
  //--------------------------------------------//

  const getOcrIdentify = async (data) => {
    var config = {
      method: 'post',
      url: process.env.REACT_APP_API_BACKEND + '/ocr/getOcrIdentify',

      data: data,
    };

    let response = await axios(config);
    return response.data;
  };

  const verifyIdentify = async (data) => {
    var config = {
      method: 'post',
      url: process.env.REACT_APP_API_BACKEND + '/ocr/verifyIndentify',
      data: data,
    };

    let response = await axios(config);
    return response.data;
  };

  //-----------Input data------------------//
  const onCorporateNameChange = (e) => {
    contextService.updateContext({
      ...contextRef.current,
      corporate: {
        ...contextRef.current.corporate,
        corporateName: e.target.value,
      },
    });
  };

  const onCorporateTypeChange = (e) => {
    contextService.updateContext({
      ...contextRef.current,
      corporate: {
        ...contextRef.current.corporate,
        corporateType: e.target.value,
      },
    });
  };

  const onHQAddressChange = (e) => {
    contextService.updateContext({
      ...contextRef.current,
      corporate: {
        ...contextRef.current.corporate,
        hqAddress: e.target.value,
      },
    });
  };

  const onPhoneNumberChange = (e) => {
    contextService.updateContext({
      ...contextRef.current,
      corporate: {
        ...contextRef.current.corporate,
        phoneNumber: e.target.value,
      },
    });
  };

  const onFaxChange = (e) => {
    contextService.updateContext({
      ...contextRef.current,
      corporate: {
        ...contextRef.current.corporate,
        fax: e.target.value,
      },
    });
  };

  const onEmailChange = (e) => {
    contextService.updateContext({
      ...contextRef.current,
      corporate: {
        ...contextRef.current.corporate,
        email: e.target.value,
      },
    });
  };

  const onWebsiteChange = (e) => {
    contextService.updateContext({
      ...contextRef.current,
      corporate: {
        ...contextRef.current.corporate,
        website: e.target.value,
      },
    });
  };

  const onBudgetChange = (e) => {
    contextService.updateContext({
      ...contextRef.current,
      corporate: {
        ...contextRef.current.corporate,
        budget: e,
      },
    });
  };

  const onRegisterTimeChange = (e) => {
    contextService.updateContext({
      ...contextRef.current,
      corporate: {
        ...contextRef.current.corporate,
        registerTime: e.target.value,
      },
    });
  };

  const onRegisterDateChange = (e) => {
    contextService.updateContext({
      ...contextRef.current,
      corporate: {
        ...contextRef.current.corporate,
        registerDate: convert(e?._d),
      },
    });
  };

  const onLawRepresentatorFullNameChange = (e) => {
    contextService.updateContext({
      ...contextRef.current,
      corporate: {
        ...contextRef.current.corporate,
        lawRepresentatorFullName: e.target.value,
      },
    });
  };

  const onIdentificationPaperNumberChange = (e) => {
    contextService.updateContext({
      ...contextRef.current,
      corporate: {
        ...contextRef.current.corporate,
        identificationPaperNumber: e.target.value,
      },
    });
  };

  const onIdentificationPaperCreatedPlaceChange = (e) => {
    contextService.updateContext({
      ...contextRef.current,
      corporate: {
        ...contextRef.current.corporate,
        identificationPaperCreatedPlace: e.target.value,
      },
    });
  };

  const onIdentificationPaperCreatedDateChange = (e) => {
    contextService.updateContext({
      ...contextRef.current,
      corporate: {
        ...contextRef.current.corporate,
        identificationPaperCreatedDate: convert(e?._d),
      },
    });
  };

  const onSerialChange = (e) => {
    contextService.updateContext({
      ...contextRef.current,
      corporate: {
        ...contextRef.current.corporate,
        serial: e.target.value,
      },
    });
  };

  const onSignatureChange = (e) => {
    contextService.updateContext({
      ...contextRef.current,
      corporate: {
        ...contextRef.current.corporate,
        signature: e.target.value,
      },
    });
  };

  const onSubjectChange = (e) => {
    contextService.updateContext({
      ...contextRef.current,
      corporate: {
        ...contextRef.current.corporate,
        subject: e.target.value,
      },
    });
  };

  const onSignTimeChange = (e) => {
    contextService.updateContext({
      ...contextRef.current,
      corporate: {
        ...contextRef.current.corporate,
        signtime: e.target.value,
      },
    });
  };

  const onCertificateChange = (e) => {
    contextService.updateContext({
      ...contextRef.current,
      corporate: {
        ...contextRef.current.corporate,
        certificate: e.target.value,
      },
    });
  };

  const onFromDateChange = (e) => {
    contextService.updateContext({
      ...contextRef.current,
      corporate: {
        ...contextRef.current.corporate,
        from: e.target.value,
      },
    });
  };

  const onToDateChange = (e) => {
    contextService.updateContext({
      ...contextRef.current,
      corporate: {
        ...contextRef.current.corporate,
        to: e.target.value,
      },
    });
  };

  const onValidityChange = (e) => {
    contextService.updateContext({
      ...contextRef.current,
      corporate: {
        ...contextRef.current.corporate,
        validity: e.target.value,
      },
    });
  };

  const onIssuerChange = (e) => {
    contextService.updateContext({
      ...contextRef.current,
      corporate: {
        ...contextRef.current.corporate,
        issuer: e.target.value,
      },
    });
  };

  const onMSTChange = (e) => {
    contextService.updateContext({
      ...contextRef.current,
      corporate: {
        ...contextRef.current.corporate,
        mst: e.target.value,
      },
    });
  };

  const onLawRepresentatorNameChange = (e) => {
    contextService.updateContext({
      ...contextRef.current,
      corporate: {
        ...contextRef.current.corporate,
        lawRepresentatorName: e.target.value,
      },
    });
  };

  const onLawRepresentatorIdNumberChange = (e) => {
    contextService.updateContext({
      ...contextRef.current,
      corporate: {
        ...contextRef.current.corporate,
        lRIdNumber: e.target.value,
      },
    });
  };

  const onLawRepresentatorDOBChange = (e) => {
    contextService.updateContext({
      ...contextRef.current,
      corporate: {
        ...contextRef.current.corporate,
        lRDOB: e.target.value,
      },
    });
  };

  const onLawRepresentatorIssuedDateChange = (e) => {
    contextService.updateContext({
      ...contextRef.current,
      corporate: {
        ...contextRef.current.corporate,
        lRIdIssuedDate: convert(e?._d),
      },
    });
  };

  const onLawRepresentatorIssuedPlaceChange = (e) => {
    contextService.updateContext({
      ...contextRef.current,
      corporate: {
        ...contextRef.current.corporate,
        lRIdIssuedPlace: e.target.value,
      },
    });
  };

  const onLawRepresentatorRoleChange = (e) => {
    contextService.updateContext({
      ...contextRef.current,
      corporate: {
        ...contextRef.current.corporate,
        lRRole: e.value,
      },
    });
  };

  const onLawRepresentatorPhoneNumberChange = (e) => {
    contextService.updateContext({
      ...contextRef.current,
      corporate: {
        ...contextRef.current.corporate,
        lRPhoneNumber: e.target.value,
      },
    });
  };

  const onLawRepresentatorEmailChange = (e) => {
    contextService.updateContext({
      ...contextRef.current,
      corporate: {
        ...contextRef.current.corporate,
        lREmail: e.target.value,
      },
    });
  };
  const onAcNameChange = (e) => {
    contextService.updateContext({
      ...contextRef.current,
      corporate: {
        ...contextRef.current.corporate,
        acName: e.target.value,
      },
    });
  };
  const onAcIdNumberChange = (e) => {
    contextService.updateContext({
      ...contextRef.current,
      corporate: {
        ...contextRef.current.corporate,
        acIdNumber: e.target.value,
      },
    });
  };
  const onAcDOBChange = (e) => {
    contextService.updateContext({
      ...contextRef.current,
      corporate: {
        ...contextRef.current.corporate,
        acDOB: convert(e?._d),
      },
    });
  };
  const onAcIdIssuedDateChange = (e) => {
    contextService.updateContext({
      ...contextRef.current,
      corporate: {
        ...contextRef.current.corporate,
        acIdIssuedDate: convert(e?._d),
      },
    });
  };
  const onAcIdIssuedPlaceChange = (e) => {
    contextService.updateContext({
      ...contextRef.current,
      corporate: {
        ...contextRef.current.corporate,
        acIdIssuedPlace: e.target.value,
      },
    });
  };
  const onAcRoleChange = (e) => {
    contextService.updateContext({
      ...contextRef.current,
      corporate: {
        ...contextRef.current.corporate,
        acRole: e.value,
      },
    });
  };
  const onAcPhoneNumberChange = (e) => {
    contextService.updateContext({
      ...contextRef.current,
      corporate: {
        ...contextRef.current.corporate,
        acPhoneNumber: e.target.value,
      },
    });
  };
  const onAcEmailChange = (e) => {
    contextService.updateContext({
      ...contextRef.current,
      corporate: {
        ...contextRef.current.corporate,
        acEmail: e.target.value,
      },
    });
  };

  const onServicePackageChange = (e) => {
    contextService.updateContext({
      ...contextRef.current,
      corporate: {
        ...contextRef.current.corporate,
        packageServiceId: e.target.value,
      },
    });
  };

  const getAllUserGroupCode = async () => {
    var corpUserGroupCodeList = [];
    var config = {
      method: 'get',
      url: process.env.REACT_APP_API_BACKEND + '/user/getAllGroup',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    let response = await axios(config);
    console.log(response.data);
    var tempArr = response.data.data;
    for (let index = 0; index < tempArr.length; index++) {
      if (tempArr[index].userType.toLowerCase() == 'corporate') {
        corpUserGroupCodeList.push(tempArr[index]);
      }
    }
    contextService.updateContext({
      ...contextRef.current,
      userGroupCode: corpUserGroupCodeList,
    });
  };
  //------------------------------------//

  const getBankList = async () => {
    var config = {
      method: 'get',
      url: process.env.REACT_APP_API_BACKEND + '/bank/bankinfo/getAll',
    };

    let response = await axios(config);
    console.log(response.data.data);
    contextService.updateContext({
      ...contextRef.current,
      constantValue: {
        ...contextRef.current.constantValue,
        bankList: response.data.data,
      },
    });
  };

  //--------------Navigating---------------//
  const exitHandler = async () => {
    history.push('/cm-home');
  };

  const editHandler = async () => {
    history.push({
      pathname: '/cm-home/edit-corporate/',
      state: {
        activeKey: contextRef?.current?.activeKey,
      },
    });
  };

  const onChangeActiveKey = async (activeKey) => {
    contextService.updateContext({
      ...contextRef.current,
      activeKey: activeKey,
    });
  };

  //-----------------------------------------//
  const domainInterface = useRef({
    initDomain,
    anhMatTruocLRChangeHandler,
    anhMatSauLRChangeHandler,
    anhCaNhanLRChangeHandler,
    submitFileLR,
    anhMatTruocACChangeHandler,
    anhMatSauACChangeHandler,
    anhCaNhanACChangeHandler,
    submitFileAC,
    //input data function
    onCorporateNameChange,
    onCorporateTypeChange,
    onHQAddressChange,
    onPhoneNumberChange,
    onFaxChange,
    onEmailChange,
    onWebsiteChange,
    onBudgetChange,
    onRegisterTimeChange,
    onRegisterDateChange,
    onLawRepresentatorFullNameChange,
    onIdentificationPaperNumberChange,
    onIdentificationPaperCreatedPlaceChange,
    onIdentificationPaperCreatedDateChange,
    onSerialChange,
    onSignatureChange,
    onSubjectChange,
    onSignTimeChange,
    onCertificateChange,
    onFromDateChange,
    onToDateChange,
    onValidityChange,
    onIssuerChange,
    onMSTChange,
    onLawRepresentatorNameChange,
    onLawRepresentatorIdNumberChange,
    onLawRepresentatorDOBChange,
    onLawRepresentatorIssuedDateChange,
    onLawRepresentatorIssuedPlaceChange,
    onLawRepresentatorRoleChange,
    onLawRepresentatorPhoneNumberChange,
    onLawRepresentatorEmailChange,
    onAcNameChange,
    onAcIdNumberChange,
    onAcDOBChange,
    onAcIdIssuedDateChange,
    onAcIdIssuedPlaceChange,
    onAcRoleChange,
    onAcPhoneNumberChange,
    onAcEmailChange,
    onServicePackageChange,
    //-----------------//

    exitHandler,
    editHandler,
    onChangeActiveKey,
  });
  return [context, domainInterface.current];
}

export default CreateCorporateDomain;
