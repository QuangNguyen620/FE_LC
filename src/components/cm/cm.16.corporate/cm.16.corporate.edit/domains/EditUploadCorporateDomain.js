import { useCallback, useRef, useEffect } from 'react';
import { message } from 'antd';
import { useHistory } from 'react-router';
import EditCorporateService from '../services/EditCorporateService';
import { useLocation } from 'react-router-dom';
var axios = require('axios');

export function UpdateCorporateDomain() {
  const history = useHistory();
  const [context, contextService] = EditCorporateService();
  const location = useLocation();
  const contextRef = useRef(context);
  const TIME_OUT = 300000;

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

  function trimData(data) {
    if (checkData(data)) {
      return data.trim();
    } else {
      return data;
    }
  }
  
  useEffect(() => {
    contextRef.current = context;
  }, [context]);

  const initDomain = async () => {
    var contextData = {
      fileData: {
        filePath: '',
        fileUrl: '',
      },
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

        stateCorporateAccountList: {
          dataSource: [],
          count: 0,
        },
        stateCorporateUserList: {
          dataSource: [{ key: 0 }, { key: 1 }],
          count: 2,
        },

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
      lawRepresentatorPaperType: '',
      accountantPaperType: '',

      paperType: 'gpdkdn',
      selectedFile: '',
      pathFile: '',
      isFilePicked: false,
      errorMessage: '',
      loading: false,
      isModalVisible: false,
      ocrCorporateBussinessResponse: '',

      viewEditUpload: false,
      viewEdit: true,
    };
    console.log('init domain', contextData);
    await contextService.initContext(contextData);

    console.log('get data');
    await getData();

    console.log('get all user group code');
    await getAllUserGroupCode();
    await getBankList();
    console.log('data', contextRef.current);
  };

  const initDomainUpload = async () => {
    // khởi tạo nghiệp vụ
    contextService.updateContext({
      ...contextRef.current,
      paperType: 'gpdkdn',
      selectedFile: '',
      pathFile: '',
      isFilePicked: false,
      errorMessage: '',
      loading: false,
      isModalVisible: false,
      ocrCorporateBussinessResponse: '',
    });
  };
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
  function checkData(data) {
    return typeof data !== 'undefined' && data;
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

    var tempUserArr = [];
    var userList = response.data.data.userInfoList;
    if (checkData(userList)) {
      for (let i = 0; i < userList.length; i++) {
        console.log(userList[i]?.userGroupEntitys[0]?.userGroupCode);

        var userGroupCodeTxt = userList[i]?.userGroupEntitys[0]?.userGroupCode;
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
          role: userRoleTxt,
          userStatus: userList[i].userStatus,

          imageFrontOfIdentity: userList[i].imageFrontOfIdentity,
          imageBackOfIdentity: userList[i].imageBackOfIdentity,
          imagePortraitOfIdentity: userList[i].imagePortraitOfIdentity,

          imageFrontOfIdentityUrl: userList[i].imageFrontOfIdentityUrl,
          imageBackOfIdentityUrl: userList[i].imageBackOfIdentityUrl,
          imagePortraitOfIdentityUrl: userList[i].imagePortraitOfIdentityUrl,
          dateOfBirth: userList[i].dateOfBirth,
          isNotDelete: true,
        };
        tempUserArr.push(element);
      }
    } else {
      tempUserArr = [];
    }

    var tempStateUserArr = {
      dataSource: tempUserArr,
      count: tempUserArr.length,
    };

    var tempAccountArr = [];
    var accountList = response.data.data.corporateAccountList;

    if (checkData(accountList)) {
      for (let i = 0; i < accountList.length; i++) {
        var element = {
          key: i,
          corporateAccountId: accountList[i].corporateAccountId,
          bankId: accountList[i].bank.bankId,
          corporateAccountName: accountList[i].corporateAccountName,
          corporateAccountNumber: accountList[i].corporateAccountNumber,
          corporateAccountStatus: accountList[i].corporateAccountStatus,
          corporateAccountType: accountList[i].corporateAccountType,
        };
        tempAccountArr.push(element);
      }
    } else {
      tempAccountArr = [];
    }

    var tempStateAccountArr = {
      dataSource: tempAccountArr,
      count: tempAccountArr.length,
    };
    console.log('DateRessNow:::', convert(response.data.data.dateRegistration));
    await contextService.updateContext({
      ...contextRef.current,
      corporate: {
        //Thông tin chung
        businessRegistrationCertificateUrl:
          response.data.data.businessRegistrationCertificateUrl,
        businessRegistrationCertificateUrlMinio:
          response.data.data.businessRegistrationCertificateUrlMinio,
        corporateCode: response.data.data.corporateCode,
        corporateName: response.data.data.corporateName,
        corporateType: response.data.data.typeOfCorporate,
        hqAddress: response.data.data.corporateAddress,
        phoneNumber: response.data.data.corporatePhoneNumber,
        fax: response.data.data.corporateFaxNumber,
        email: response.data.data.corporateEmail,
        website: response.data.data.corporateWebsite,
        budget: response.data.data.charterCapital,
        registerTime: response.data.data.registrationTimes,
        registerDate: convert(response.data.data.dateRegistration),
        lawRepresentatorFullName:
          response.data.data.legalRepresentativeFullName,
        identificationPaperNumber:
          response.data.data.legalRepresentativeIdentifyNumber,
        identificationPaperCreatedDate:
          response.data.data.legalRepresentativeIdentifyCreatedDate,

        identificationPaperCreatedPlace:
          response.data.data.legalRepresentativeIdentifyCreatedPlace,

        //Ký số
        certificate: response.data.data.signatureCertificate,
        from: response.data.data.signatureValueDate,
        issuer: response.data.data.signatureReleaseBy,
        mst: response.data.data.signatureTaxCode,
        serial: response.data.data.signatureSerial,
        signature: response.data.data.signature,
        signtime: response.data.data.signatureTime,
        subject: response.data.data.signatureSubscriberName,
        to: response.data.data.signatureExpirationDate,
        validity: response.data.data.signatureValue,

        //lawRepresentator
        lawRepresentatorName: tempUserArr[0].userName,
        lRIdNumber: tempUserArr[0].identityNumber,
        lRIdIssuedDate: tempUserArr[0].dateOfIdentity,

        lRIdIssuedPlace: tempUserArr[0].issuedByIdentity,
        lRRole: tempUserArr[0].position,
        lRPhoneNumber: tempUserArr[0].phoneNumber,
        lREmail: tempUserArr[0].email,
        lRDOB: tempUserArr[0].dateOfBirth,

        // Accountant
        acName: tempUserArr[1].userName,
        acIdNumber: tempUserArr[1].identityNumber,
        acIdIssuedDate: tempUserArr[1].dateOfIdentity,
        acIdIssuedPlace: tempUserArr[1].issuedByIdentity,
        acRole: tempUserArr[1].position,
        acPhoneNumber: tempUserArr[1].phoneNumber,
        acEmail: tempUserArr[1].email,
        acDOB: tempUserArr[1].dateOfBirth,

        stateCorporateAccountList: tempStateAccountArr,
        stateCorporateUserList: tempStateUserArr,
        packageServiceId: response.data.data.packageServiceId,
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
    // console.log(contextRef.current);
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
      console.log(contextRef.current.lawRepresentatorPaperType);

      var dataForm1 = new FormData();
      dataForm1.append('fileFrontIdentify', anhMatTruoc);
      dataForm1.append('filePortrait', anhCaNhan);
      console.log('Received values of form: ', dataForm1);

      var dataForm2 = new FormData();
      if (contextRef.current.lawRepresentatorPaperType == '') {
        dataForm2.append('ocrCode', '');
        dataForm2.append('fileFrontIdentify', anhMatTruoc);
        dataForm2.append('fileBackIdentify', anhMatSau);
      } else if (contextRef.current.lawRepresentatorPaperType == 'hc') {
        dataForm2.append('ocrCode', 'hc');
        dataForm2.append('fileFrontIdentify', anhMatTruoc);
        dataForm2.append('fileBackIdentify', anhMatTruoc);
      }
      console.log('Received values of form: ', dataForm2);

      var responseVerify = verifyIdentify(dataForm1);
      responseVerify.then((response) => {
        if (response.data == 'Thành công') {
          // var fileData = uploadFile(anhMatTruoc, anhMatSau, anhCaNhan);
          console.log(fileData);
          var responseOcr = getOcrIdentify(dataForm2);
          responseOcr.then((response) => {
            contextService.updateContext({
              ...contextRef.current,
              loading: false,
            });
            console.log(response.data);
            if (checkData(response.data)) {
              if (response?.data?.codeMesage == null) {
                var corporateUserList =
                  contextRef.current.corporate.stateCorporateUserList
                    .dataSource;
                corporateUserList[0].userName = response.data.hoVaTen;
                corporateUserList[0].identityNumber = response.data.soCmt;
                corporateUserList[0].dateOfBirth = response.data.namSinh;
                corporateUserList[0].dateOfIdentity = response.data.ngayCap;
                corporateUserList[0].position = 'legal_representative';

                contextService.updateContext({
                  ...contextRef.current,
                  // userLR: {
                  //   ...contextRef.current.userLR,
                  //   lawRepresentatorName: response.data.hoVaTen,
                  //   lRIdNumber: response.data.soCmt,
                  //   lRDOB: response.data.namSinh,
                  //   lRIdIssuedDate: response.data.ngayCap,
                  //   lRRole: 'legal_representative',
                  // },
                  corporate: {
                    ...contextRef.current.corporate,
                    corporateUserList: corporateUserList,

                    lawRepresentatorName: response.data.hoVaTen,
                    lRIdNumber: response.data.soCmt,
                    lRDOB: response.data.namSinh,
                    lRIdIssuedDate: response.data.ngayCap,
                    lRRole: 'legal_representative',
                  },
                });
              } else {
                message.error(response?.data?.message);
              }
            } else {
              message.error(
                'Ảnh upload không phù hợp với loại Giấy tờ định danh',
              );
            }
          });
          // var fileData = uploadFile(anhMatTruoc, anhMatSau, anhCaNhan);
          var fileData;
          if (contextRef.current.lawRepresentatorPaperType == '') {
            fileData = uploadFile(anhMatTruoc, anhMatSau, anhCaNhan);
          } else if (contextRef.current.lawRepresentatorPaperType == 'hc') {
            fileData = uploadFilePP(anhMatTruoc, anhCaNhan);
          }
          fileData.then((response) => {
            console.log('test');
            console.log(response);

            var userList =
              contextRef.current.corporate.stateCorporateUserList.dataSource;

            userList[0].imageFrontOfIdentity = response.filePathImgFront;
            userList[0].imageBackOfIdentity = response.filePathImgBack;
            userList[0].imagePortraitOfIdentity = response.filePathImgPortrait;

            contextService.updateContext({
              ...contextRef.current,
              corporate: {
                ...contextRef.current.corporate,
                corporateUserList: userList,

                imgFrontLR: response.fileUrlImgFront,
                imgBackLR: response.fileUrlImgBack,
                imgPortraitLR: response.fileUrlImgPortrait,
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

  const uploadFile = async (imgFront, imgBack, imgPortrait) => {
    var data = new FormData();
    data.append('imgFront', imgFront);
    data.append('imgBack', imgBack);
    data.append('imgPortrait', imgPortrait);

    var config = {
      method: 'post',
      url: process.env.REACT_APP_API_BACKEND + '/corporate/uploadFileImage',

      data: data,
    };

    let response = await axios(config);
    console.log(response.data);
    return response.data;
  };

  const uploadFilePP = async (imgFront, imgPortrait) => {
    var data = new FormData();
    data.append('imgFront', imgFront);
    data.append('imgPortrait', imgPortrait);

    var config = {
      method: 'post',
      url: process.env.REACT_APP_API_BACKEND + '/corporate/uploadFileImagePP',

      data: data,
    };

    let response = await axios(config);
    console.log(response.data);
    return response.data;
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
        anhCaNhanACUrl: reader.result,
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
      console.log(contextRef.current.accountantPaperType);

      var dataForm1 = new FormData();
      dataForm1.append('fileFrontIdentify', anhMatTruoc);
      dataForm1.append('filePortrait', anhCaNhan);
      console.log('Received values of form: ', dataForm1);

      var dataForm2 = new FormData();
      if (contextRef.current.accountantPaperType == '') {
        dataForm2.append('ocrCode', '');
        dataForm2.append('fileFrontIdentify', anhMatTruoc);
        dataForm2.append('fileBackIdentify', anhMatSau);
      } else if (contextRef.current.accountantPaperType == 'hc') {
        dataForm2.append('ocrCode', 'hc');
        dataForm2.append('fileFrontIdentify', anhMatTruoc);
        dataForm2.append('fileBackIdentify', anhMatTruoc);
      }
      console.log('Received values of form: ', dataForm2);

      var responseVerify = verifyIdentify(dataForm1);
      responseVerify.then((response) => {
        if (response.data == 'Thành công') {
          // console.log(fileData);
          var responseOcr = getOcrIdentify(dataForm2);
          responseOcr.then((response) => {
            contextService.updateContext({
              ...contextRef.current,
              loading: false,
            });
            console.log(response.data);
            if (checkData(response.data)) {
              if (response?.data?.codeMesage == null) {
                var corporateUserList =
                  contextRef.current.corporate.stateCorporateUserList
                    .dataSource;
                corporateUserList[1].userName = response.data.hoVaTen;
                corporateUserList[1].identityNumber = response.data.soCmt;
                corporateUserList[1].dateOfBirth = response.data.namSinh;
                corporateUserList[1].dateOfIdentity = response.data.ngayCap;
                corporateUserList[1].position = 'accountant';

                contextService.updateContext({
                  ...contextRef.current,
                  // userAC: {
                  //   ...contextRef.current.userAC,
                  //   acName: response.data.hoVaTen,
                  //   acIdNumber: response.data.soCmt,
                  //   acDOB: response.data.namSinh,
                  //   acIdIssuedDate: response.data.ngayCap,
                  //   acRole: 'accountant',
                  // },
                  corporate: {
                    ...contextRef.current.corporate,
                    corporateUserList: corporateUserList,

                    acName: response.data.hoVaTen,
                    acIdNumber: response.data.soCmt,
                    acDOB: response.data.namSinh,
                    acIdIssuedDate: response.data.ngayCap,
                    acRole: 'accountant',
                  },
                });
                // var fileData = uploadFile(anhMatTruoc, anhMatSau, anhCaNhan);
                var fileData;
                if (contextRef.current.accountantPaperType == '') {
                  fileData = uploadFile(anhMatTruoc, anhMatSau, anhCaNhan);
                } else if (contextRef.current.accountantPaperType == 'hc') {
                  fileData = uploadFilePP(anhMatTruoc, anhCaNhan);
                }
                fileData.then((response) => {
                  var userList =
                    contextRef.current.corporate.stateCorporateUserList
                      .dataSource;

                  userList[1].imageFrontOfIdentity = response.filePathImgFront;
                  userList[1].imageBackOfIdentity = response.filePathImgBack;
                  userList[1].imagePortraitOfIdentity =
                    response.filePathImgPortrait;

                  contextService.updateContext({
                    ...contextRef.current,
                    corporate: {
                      ...contextRef.current.corporate,
                      corporateUserList: userList,

                      imgFrontAC: response.fileUrlImgFront,
                      imgBackAC: response.fileUrlImgBack,
                      imgPortraitAC: response.fileUrlImgPortrait,
                    },
                  });
                });
              } else {
                message.error(response?.data?.message);
              }
            } else {
              message.error(
                'Ảnh upload không phù hợp với loại Giấy tờ định danh',
              );
            }
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
    console.log('e:::', e);
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
        identificationPaperCreatedDate: e?._d,
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

  function checkPaperType(paperType) {
    if (paperType == 'hc') {
      return 'ho_chieu';
    } else {
      return 'cmnd/cccd/cccd_chip';
    }
  }
  const onLawRepresentatorPaperTypeChange = (e) => {
    console.log(e.target.value);
    var corporateUserList =
      contextRef.current.corporate.stateCorporateUserList.dataSource;
    corporateUserList[0].identityType = checkPaperType(e?.target?.value);

    contextService.updateContext({
      ...contextRef.current,
      lawRepresentatorPaperType: e.target.value,
      corporateUserList: corporateUserList,
    });
  };

  const onAccountantPaperTypeChange = (e) => {
    var corporateUserList =
      contextRef.current.corporate.stateCorporateUserList.dataSource;
    corporateUserList[1].identityType = checkPaperType(e?.target?.value);

    contextService.updateContext({
      ...contextRef.current,
      accountantPaperType: e.target.value,
      corporateUserList: corporateUserList,
    });
  };

  const onLawRepresentatorNameChange = (e) => {
    var corporateUserList =
      contextRef.current.corporate.stateCorporateUserList.dataSource;
    corporateUserList[0].userName = e.target.value;

    contextService.updateContext({
      ...contextRef.current,
      corporate: {
        ...contextRef.current.corporate,
        lawRepresentatorName: e.target.value,
        corporateUserList: corporateUserList,
      },
    });
  };

  const onLawRepresentatorIdNumberChange = (e) => {
    var corporateUserList =
      contextRef.current.corporate.stateCorporateUserList.dataSource;
    corporateUserList[0].identityNumber = e.target.value;

    contextService.updateContext({
      ...contextRef.current,
      corporate: {
        ...contextRef.current.corporate,
        lRIdNumber: e.target.value,
        corporateUserList: corporateUserList,
      },
      userLR: {
        ...contextRef.current.userLR,
        lRIdNumber: e.target.value,
      },
    });
  };

  const onLawRepresentatorDOBChange = (e) => {
    var corporateUserList =
      contextRef.current.corporate.stateCorporateUserList.dataSource;
    corporateUserList[0].dateOfBirth = e?._d;

    contextService.updateContext({
      ...contextRef.current,
      corporate: {
        ...contextRef.current.corporate,
        lRDOB: e?._d,
        corporateUserList: corporateUserList,
      },
      userLR: {
        ...contextRef.current.userLR,
        lRDOB: convert(e?._d),
      },
    });
  };

  const onLawRepresentatorIssuedDateChange = (e) => {
    var corporateUserList =
      contextRef.current.corporate.stateCorporateUserList.dataSource;
    corporateUserList[0].dateOfIdentity = e?._d;

    contextService.updateContext({
      ...contextRef.current,
      corporate: {
        ...contextRef.current.corporate,
        lRIdIssuedDate: e?._d,
        corporateUserList: corporateUserList,
      },
      userLR: {
        ...contextRef.current.userLR,
        lRIdIssuedDate: convert(e?._d),
      },
    });
  };

  const onLawRepresentatorIssuedPlaceChange = (e) => {
    var corporateUserList =
      contextRef.current.corporate.stateCorporateUserList.dataSource;
    corporateUserList[0].issuedByIdentity = e.target.value;

    contextService.updateContext({
      ...contextRef.current,
      corporate: {
        ...contextRef.current.corporate,
        lRIdIssuedPlace: e.target.value,
        corporateUserList: corporateUserList,
      },
      userLR: {
        ...contextRef.current.userLR,
        lRIdIssuedPlace: e.target.value,
      },
    });
  };

  const onLawRepresentatorRoleChange = (e) => {
    var corporateUserList =
      contextRef.current.corporate.stateCorporateUserList.dataSource;
    corporateUserList[0].position = e;

    contextService.updateContext({
      ...contextRef.current,
      corporate: {
        ...contextRef.current.corporate,
        lRRole: e,
        corporateUserList: corporateUserList,
      },
      userLR: {
        ...contextRef.current.userLR,
        lRRole: e,
      },
    });
  };

  const onLawRepresentatorPhoneNumberChange = (e) => {
    var corporateUserList =
      contextRef.current.corporate.stateCorporateUserList.dataSource;
    corporateUserList[0].phoneNumber = e.target.value;

    contextService.updateContext({
      ...contextRef.current,
      corporate: {
        ...contextRef.current.corporate,
        lRPhoneNumber: e.target.value,
        corporateUserList: corporateUserList,
      },
      userLR: {
        ...contextRef.current.userLR,
        lRPhoneNumber: e.target.value,
      },
    });
  };

  const onLawRepresentatorEmailChange = (e) => {
    var corporateUserList =
      contextRef.current.corporate.stateCorporateUserList.dataSource;
    corporateUserList[0].email = e.target.value;

    contextService.updateContext({
      ...contextRef.current,
      corporate: {
        ...contextRef.current.corporate,
        lREmail: e.target.value,
        corporateUserList: corporateUserList,
      },
      userLR: {
        ...contextRef.current.userLR,
        lREmail: e.target.value,
      },
    });
  };

  const onAcNameChange = (e) => {
    var corporateUserList =
      contextRef.current.corporate.stateCorporateUserList.dataSource;
    corporateUserList[1].userName = e.target.value;

    contextService.updateContext({
      ...contextRef.current,
      corporate: {
        ...contextRef.current.corporate,
        acName: e.target.value,
        corporateUserList: corporateUserList,
      },
      userAC: {
        ...contextRef.current.userAC,
        acName: e.target.value,
      },
    });
  };
  const onAcIdNumberChange = (e) => {
    var corporateUserList =
      contextRef.current.corporate.stateCorporateUserList.dataSource;
    corporateUserList[1].identityNumber = e.target.value;

    contextService.updateContext({
      ...contextRef.current,
      corporate: {
        ...contextRef.current.corporate,
        acIdNumber: e.target.value,
        corporateUserList: corporateUserList,
      },
      userAC: {
        ...contextRef.current.userAC,
        acIdNumber: e.target.value,
      },
    });
  };
  const onAcDOBChange = (e) => {
    var corporateUserList =
      contextRef.current.corporate.stateCorporateUserList.dataSource;
    corporateUserList[1].dateOfBirth = e?._d;

    contextService.updateContext({
      ...contextRef.current,
      corporate: {
        ...contextRef.current.corporate,
        acDOB: e?._d,
        corporateUserList: corporateUserList,
      },
      userAC: {
        ...contextRef.current.userAC,
        acDOB: convert(e?._d),
      },
    });
  };
  const onAcIdIssuedDateChange = (e) => {
    var corporateUserList =
      contextRef.current.corporate.stateCorporateUserList.dataSource;
    corporateUserList[1].dateOfIdentity = e?._d;

    contextService.updateContext({
      ...contextRef.current,
      corporate: {
        ...contextRef.current.corporate,
        acIdIssuedDate: e?._d,
        corporateUserList: corporateUserList,
      },
      userAC: {
        ...contextRef.current.userAC,
        acIdIssuedDate: convert(e?._d),
      },
    });
  };
  const onAcIdIssuedPlaceChange = (e) => {
    var corporateUserList =
      contextRef.current.corporate.stateCorporateUserList.dataSource;
    corporateUserList[1].issuedByIdentity = e.target.value;

    contextService.updateContext({
      ...contextRef.current,
      corporate: {
        ...contextRef.current.corporate,
        acIdIssuedPlace: e.target.value,
        corporateUserList: corporateUserList,
      },
      userAC: {
        ...contextRef.current.userAC,
        acIdIssuedPlace: convert(e?._d),
      },
    });
  };
  const onAcRoleChange = (e) => {
    var corporateUserList =
      contextRef.current.corporate.stateCorporateUserList.dataSource;
    corporateUserList[1].position = e;

    contextService.updateContext({
      ...contextRef.current,
      corporate: {
        ...contextRef.current.corporate,
        acRole: e,
        corporateUserList: corporateUserList,
      },
      userAC: {
        ...contextRef.current.userAC,
        acRole: e,
      },
    });
  };
  const onAcPhoneNumberChange = (e) => {
    var corporateUserList =
      contextRef.current.corporate.stateCorporateUserList.dataSource;
    corporateUserList[1].phoneNumber = e.target.value;

    contextService.updateContext({
      ...contextRef.current,
      corporate: {
        ...contextRef.current.corporate,
        acPhoneNumber: e.target.value,
        corporateUserList: corporateUserList,
      },
      userAC: {
        ...contextRef.current.userAC,
        acPhoneNumber: e.target.value,
      },
    });
  };
  const onAcEmailChange = (e) => {
    var corporateUserList =
      contextRef.current.corporate.stateCorporateUserList.dataSource;
    corporateUserList[1].email = e.target.value;

    contextService.updateContext({
      ...contextRef.current,
      corporate: {
        ...contextRef.current.corporate,
        acEmail: e.target.value,
        corporateUserList: corporateUserList,
      },
      userAC: {
        ...contextRef.current.userAC,
        acEmail: e.target.value,
      },
    });
  };

  const onServicePackageChange = (e) => {
    message.success(
      'Thay đổi thành công và gói dịch vụ mới sẽ được áp dụng vào ngày mùng 1 tháng tiếp theo',
    );
    contextService.updateContext({
      ...contextRef.current,
      corporate: {
        ...contextRef.current.corporate,
        packageServiceId: e.target.value,
      },
    });
  };

  const setUserList = (dataList) => {
    console.log('Data list user test!!!');
    console.log(dataList);
    contextService.updateContext({
      ...contextRef.current,
      corporate: {
        ...contextRef.current.corporate,
        corporateUserList: dataList,
      },
    });
  };

  const setStateUserList = (data) => {
    console.log('Data list user test!!!');
    console.log(data);
    contextService.updateContext({
      ...contextRef.current,
      corporate: {
        ...contextRef.current.corporate,
        stateCorporateUserList: data,
      },
    });
  };

  const setAccountList = (dataList) => {
    console.log('Data list account test!!!');
    console.log(dataList);
    contextService.updateContext({
      ...contextRef.current,
      corporate: {
        ...contextRef.current.corporate,
        corporateAccountList: dataList,
      },
    });
  };

  const setStateAccountList = (data) => {
    console.log('Data list account test!!!');
    console.log(data);
    contextService.updateContext({
      ...contextRef.current,
      corporate: {
        ...contextRef.current.corporate,
        stateCorporateAccountList: data,
      },
    });
  };

  //--------------------------------------//

  //------------Submit data--------------//
  const submitDataHandler = async () => {
    contextService.updateContext({
      ...contextRef.current,
      loading: true,
    });
    var corporateRef = contextRef?.current?.corporate;
    if (checkData(corporateRef)) {
      var data = {
        businessRegistrationCertificateUrl:
          corporateRef?.businessRegistrationCertificateUrl?.trim(),
        corporateCode: corporateRef?.corporateCode?.trim(),
        corporateName: corporateRef?.corporateName?.trim(),
        corporateNameEn: corporateRef?.corporateName?.trim(),
        typeOfCorporate: corporateRef?.corporateType?.trim(),
        dateRegistration: corporateRef?.registerDate,
        registrationTimes: corporateRef?.registerTime?.trim(),
        corporateAddress: corporateRef?.hqAddress?.trim(),
        corporatePhoneNumber: corporateRef?.phoneNumber?.trim(),
        corporateEmail: corporateRef?.email?.trim(),
        corporateFaxNumber: corporateRef?.fax?.trim(),
        corporateWebsite: corporateRef?.website?.trim(),
        charterCapital: contextRef?.current?.corporate.budget,
        parValueShares: '',
        totalNumberOfShares: '',

        legalRepresentativeFullName:
          corporateRef?.lawRepresentatorFullName?.trim(),
        legalRepresentativeIdentifyNumber:
          corporateRef?.identificationPaperNumber?.trim(),
        legalRepresentativeIdentifyCreatedDate: convert(
          corporateRef?.identificationPaperCreatedDate,
        ),
        legalRepresentativeIdentifyCreatedPlace:
          corporateRef?.identificationPaperCreatedPlace?.trim(),

        signatureSerial: corporateRef?.serial?.trim(),
        signature: corporateRef?.signature?.trim(),
        signatureSubscriberName: corporateRef?.subject?.trim(),
        signatureTime: corporateRef?.signtime?.trim(),
        signatureCertificate: corporateRef?.certificate?.trim(),
        signatureExpirationDate: corporateRef?.to?.trim(),
        signatureValueDate: corporateRef?.from?.trim(),
        signatureValue: corporateRef?.validity?.trim(),
        signatureReleaseBy: corporateRef?.issuer?.trim(),
        signatureTaxCode: corporateRef?.mst?.trim(),

        corporateAccountList:
          corporateRef?.stateCorporateAccountList?.dataSource,
        corporateUserList: corporateRef?.stateCorporateUserList?.dataSource,
        packageServiceId: corporateRef?.packageServiceId,
        channelInit: 'Corporate',
      };

      console.log('Received values of form: ', data);

      var config = {
        method: 'put',
        url:
          process.env.REACT_APP_API_BACKEND +
          '/corporate/update/' +
          localStorage.corporateId +
          '',
        headers: {
          Authorization: 'Bearer ' + sessionStorage.access_token + '',
        },
        data: data,
        timeout: TIME_OUT,
      };

      let response = await axios(config);
      console.log(response.data);
      if (response.data != null) {
        if (response.data.code == 200) {
          // contextService.updateContext({
          //   ...contextRef.current,
          //   createSuccessModalVisible: true,
          // });
          message.success(response.data.message);
          setTimeout(() => {
            history.push('/cm-home/view-corporate/');
          }, 1000);
        } else {
          message.error(response.data.message);
        }
        contextService.updateContext({
          ...contextRef.current,
          loading: false,
        });
      }
    }
  };

  //---------------Upload---------------------//

  const changeHandler = (event) => {
    contextService.updateContext({
      ...contextRef.current,
      selectedFile: event.target.files[0],
      isFilePicked: true,
    });
  };

  //--------------Code mới--------------------//
  const fileInputRef = useRef();

  const showModal = () => {
    contextService.updateContext({
      ...contextRef.current,
      isModalVisible: true,
    });
  };

  const handleOk = () => {
    contextService.updateContext({
      ...contextRef.current,
      isModalVisible: false,
    });
  };

  const handleCancel = () => {
    contextService.updateContext({
      ...contextRef.current,
      isModalVisible: false,
    });
  };

  const dragOver = (e) => {
    e.preventDefault();
  };

  const dragEnter = (e) => {
    e.preventDefault();
  };

  const dragLeave = (e) => {
    e.preventDefault();
  };

  const handleFiles = (file) => {
    if (validateFile(file)) {
      if (validateFileSize(file)) {
        var tmppath = URL.createObjectURL(file);
        contextService.updateContext({
          ...contextRef.current,
          selectedFile: file,
          isFilePicked: true,
          pathFile: tmppath,
        });

        file['invalid'] = false;
      } else {
        contextService.updateContext({
          ...contextRef.current,
          selectedFile: file,
          isFilePicked: true,
          errorMessage: 'Dung lượng file vượt quá dung lượng cho phép!',
        });
        file['invalid'] = true;
      }
    } else {
      contextService.updateContext({
        ...contextRef.current,
        selectedFile: file,
        isFilePicked: true,
        errorMessage: 'Định dạng file không đúng!',
      });
      file['invalid'] = true;
    }
  };

  const fileDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    console.log(files);
    if (files.length) {
      handleFiles(files[0]);
    }
  };

  const validateFile = (file) => {
    const validTypes = ['application/pdf'];
    console.log(file.type);
    if (validTypes.indexOf(file.type) === -1) {
      return false;
    }
    return true;
  };

  const validateFileSize = (file) => {
    console.log(file.size);
    if (file.size >= 20000000) {
      return false;
    }
    return true;
  };

  const fileInputClicked = () => {
    fileInputRef.current.click();
  };

  const filesSelected = () => {
    if (fileInputRef.current.files.length) {
      handleFiles(fileInputRef.current.files[0]);
    }
  };

  const fileSize = (size) => {
    if (size === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(size) / Math.log(k));
    return parseFloat((size / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const removeFile = () => {
    contextService.updateContext({
      ...contextRef.current,
      selectedFile: '',
      isFilePicked: false,
    });
  };

  const empty = () => {
    console.log('Xóa file đi rồi hẵng chọn file khác');
  };

  //-----------------------------------------//

  const paperTypeChange = (event) => {
    contextService.updateContext({
      ...contextRef.current,
      paperType: event,
      isFilePicked: true,
    });
  };

  const continueHandler = async () => {
    history.push('/create-corporate/corporate-info');
  };

  const handleSubmission = () => {
    var dataForm1 = new FormData();
    dataForm1.append('ocrCode', contextRef.current.paperType);
    dataForm1.append('file', contextRef.current.selectedFile);
    dataForm1.append('tocDoOcr', '1');
    dataForm1.append(
      'corporateCode',
      contextRef.current.corporate.corporateCode,
    );

    console.log(dataForm1);

    var fileToUpload = new FormData();
    fileToUpload.append('file', contextRef.current.selectedFile);
    console.log(fileToUpload);

    contextService.updateContext({
      ...contextRef.current,
      loading: true,
    });
    getOcrCorporateBussiness(dataForm1, fileToUpload);
  };

  const getOcrCorporateBussiness = async (dataForm, fileToUpload) => {
    var config = {
      method: 'post',
      url:
        process.env.REACT_APP_API_BACKEND +
        '/ocr/getOcrCorporateBussinessUpdate',
      headers: {
        'Content-Type': 'application/json',
      },
      data: dataForm,
      timeout: TIME_OUT,
    };
    // uploadFile(dataForm2);
    try {
      let response = await axios(config);
      contextService.updateContext({
        ...contextRef.current,
        loading: false,
      });
      if (response.data.data == null || response.data.data == undefined) {
        contextService.updateContext({
          ...contextRef.current,
          loading: false,
        });
        message.error('File chưa được ký số!');
      } else {
        var ocrBussiness = response?.data?.data?.ocrCorporateBussinessResponse;
        var ocrSignatureRes =
          response?.data?.data?.ocrCorporateSignatureResponse;
        var lawRepresentatorData = {};
        var ocrSignature = {};
        var corporateNew = contextRef.current?.corporate;

        if (corporateNew.corporateCode !== ocrBussiness.maSoDoanhNghiep) {
          message.error(
            'Mã số doanh nghiệp trên giấy ĐKKD không khớp với mã số doanh ngiệp hiện tại',
          );
        } else {
          // var fileData = {};
          let fileData = await uploadFilePDF(fileToUpload);
          console.log(fileData);
          if (checkData(ocrSignatureRes) && ocrSignatureRes.length > 0) {
            ocrSignature = ocrSignatureRes[0];
          }

          if (
            checkData(ocrBussiness?.nguoiDaiDienPhapLuat) &&
            ocrBussiness.nguoiDaiDienPhapLuat.length > 0
          ) {
            lawRepresentatorData = ocrBussiness.nguoiDaiDienPhapLuat[0];
          } else {
            lawRepresentatorData = null;
          }

          corporateNew.businessRegistrationCertificateUrl =
            fileData?.filePath?.trim();
          corporateNew.businessRegistrationCertificateUrlMinio =
            fileData?.fileUrl?.trim();
          corporateNew.paperType = contextRef.current.paperType;
          corporateNew.corporateCode = ocrBussiness.maSoDoanhNghiep;
          corporateNew.corporateName = ocrBussiness.tenDoanhNghiep;
          corporateNew.corporateType = ocrBussiness.loaiHinhDoanhNghiep;
          corporateNew.hqAddress = ocrBussiness.diaChi;
          corporateNew.phoneNumber = ocrBussiness.dienThoai;
          corporateNew.fax = ocrBussiness.fax;
          corporateNew.email = ocrBussiness.email;
          corporateNew.website = ocrBussiness.website;
          corporateNew.budget = ocrBussiness.vonDieuLe;
          corporateNew.registerTime = ocrBussiness.lanDangKy;
          corporateNew.registerDate = ocrBussiness.ngayDangKy;
          corporateNew.lawRepresentatorFullName =
            corporateNew.lawRepresentatorData?.hoVaTen != ''
              ? lawRepresentatorData?.hoVaTen
              : '';
          corporateNew.identificationPaperNumber =
            lawRepresentatorData?.soGiayTo != ''
              ? lawRepresentatorData?.soGiayTo
              : '';
          corporateNew.identificationPaperCreatedDate =
            lawRepresentatorData?.ngayCap != ''
              ? lawRepresentatorData?.ngayCap
              : '';
          corporateNew.identificationPaperCreatedPlace =
            lawRepresentatorData?.noiCap != ''
              ? lawRepresentatorData?.noiCap
              : '';
          corporateNew.certificate = ocrSignature?.certificate; //Ký số
          corporateNew.from = ocrSignature?.from;
          corporateNew.issuer = ocrSignature?.issuer;
          corporateNew.mst = ocrSignature?.mst;
          corporateNew.serial = ocrSignature?.serial;
          corporateNew.signature = ocrSignature?.signature;
          corporateNew.signtime = ocrSignature?.signtime;
          corporateNew.subject = ocrSignature?.subject;
          corporateNew.to = ocrSignature?.to;
          corporateNew.validity = ocrSignature?.validity;

          console.log('corporateNew::', corporateNew);
          await contextService.updateContext({
            ...contextRef.current,
            corporate: corporateNew,
            viewEditUpload: false,
            viewEdit: true,
          });
          // toEdit();
        }
      }
    } catch (err) {
      contextService.updateContext({
        ...contextRef.current,
        loading: false,
      });
      console.log('here like to send the error to the user instead');
      if (err?.response?.data?.code == 500) {
        message.error(err?.response?.data?.data);
      }
      if (err?.response?.data?.data == 'corporate code has exists') {
        message.error('Mã số đăng ký doanh nghiệp đã tồn tại.');
      }
    }
  };

  const uploadFilePDF = async (data) => {
    var config = {
      method: 'post',
      url: process.env.REACT_APP_API_BACKEND + '/corporate/uploadFile',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
      timeout: TIME_OUT,
    };

    let response = await axios(config);
    return response.data;
  };

  //--------------Navigating---------------//
  const exitHandler = async () => {
    history.push('/login');
  };

  const onModalClose = () => {
    contextService.updateContext({
      ...contextRef.current,
      createSuccessModalVisible: false,
    });
  };

  const loginNow = () => {
    contextService.updateContext({
      ...contextRef.current,
      createSuccessModalVisible: false,
    });
    history.push('/login');
  };

  const toUploadFile = async () => {
    console.log('toEdit');
    contextService.updateContext({
      ...contextRef.current,
      viewEditUpload: true,
      viewEdit: false,
    });
  };

  const toEdit = async () => {
    contextService.updateContext({
      ...contextRef.current,
      viewEditUpload: false,
      viewEdit: true,
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
    setUserList,
    setStateUserList,
    setAccountList,
    setStateAccountList,

    onLawRepresentatorPaperTypeChange,
    onAccountantPaperTypeChange,
    //-----------------//
    toUploadFile,
    submitDataHandler,
    onModalClose,
    loginNow,
    exitHandler,
    //-------Upload----------//
    initDomainUpload,
    continueHandler,
    getOcrCorporateBussiness,
    toEdit,
    changeHandler,
    handleSubmission,
    paperTypeChange,
    showModal,
    handleOk,
    handleCancel,
    dragOver,
    dragEnter,
    dragLeave,
    fileDrop,
    filesSelected,
    fileInputClicked,
    fileSize,
    removeFile,
    empty,
    handleFiles,
    uploadFilePDF,
  });
  return [context, domainInterface.current];
}

export default UpdateCorporateDomain;
