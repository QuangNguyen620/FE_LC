import { useRef, useEffect } from 'react';
import { message } from 'antd';
import { useHistory } from 'react-router';
import CreateCorporateService from '../services/CreateCorporateService';
import { useLocation } from 'react-router-dom';
var axios = require('axios');

export function CreateCorporateDomain() {
  const history = useHistory();
  const [context, contextService] = CreateCorporateService();
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
        businessRegistrationCertificateUrl: '',

        paperType: '',
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
        lRDOB: '01/01/2015',
        lRIdIssuedDate: '01/01/2015',
        lRIdIssuedPlace: '',
        lRRole: 'legal_representative',
        lRPhoneNumber: '',
        lREmail: '',
        lRFrontImage: '',
        lRBackImage: '',
        lRPotraitImage: '',

        //Accountant
        acName: '',
        acIdNumber: '',
        acDOB: '01/01/2015',
        acIdIssuedDate: '01/01/2015',
        acIdIssuedPlace: '',
        acRole: 'accountant',
        acPhoneNumber: '',
        acEmail: '',
        acFrontImage: '',
        acBackImage: '',
        acPotraitImage: '',

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
        lRPaperType: '',
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
        acPaperType: '',
      },
      loading: false,
      createSuccessModalVisible: false,
      lawRepresentatorPaperType: '',
      accountantPaperType: '',
      visbleLREkycResult: false,
      visbleACCEkycResult: false,
      constantValue: {
        bankList: [],
      },
    };
    console.log('init domain');
    await contextService.initContext(contextData);

    console.log('get data');
    await getData();

    console.log('get all user group code');
    await getAllUserGroupCode();
    console.log('get all bank');
    await getBankList();
  };

  const getData = async () => {
    var ocrBussiness = location.state.ocrCorporateBussinessResponse;
    var ocrSignature = {};
    var lawRepresentatorData = {};
    var fileUploaded = location.state.fileData;

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

    await contextService.updateContext({
      ...contextRef.current,
      corporate: {
        //Thông tin chung
        paperType: location.state.paperType,
        corporateCode: ocrBussiness.maSoDoanhNghiep,
        corporateName: ocrBussiness.tenDoanhNghiep,
        corporateType: ocrBussiness.loaiHinhDoanhNghiep,
        hqAddress: ocrBussiness.diaChi,
        phoneNumber: ocrBussiness.dienThoai,
        fax: ocrBussiness.fax,
        email: ocrBussiness.email,
        website: ocrBussiness.website,
        budget: ocrBussiness.vonDieuLe,
        registerTime: ocrBussiness.lanDangKy,
        registerDate: ocrBussiness.ngayDangKy,
        lawRepresentatorFullName:
          lawRepresentatorData.hoVaTen != ''
            ? lawRepresentatorData.hoVaTen
            : '',
        identificationPaperNumber:
          lawRepresentatorData.soGiayTo != ''
            ? lawRepresentatorData.soGiayTo
            : '',
        identificationPaperCreatedDate:
          lawRepresentatorData.ngayCap != ''
            ? lawRepresentatorData.ngayCap
            : '',
        identificationPaperCreatedPlace:
          lawRepresentatorData.noiCap != '' ? lawRepresentatorData.noiCap : '',

        //Ký số
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

        //Accountant
        acName: '',
        acIdNumber: '',
        acIdIssuedDate: '',
        acIdIssuedPlace: '',
        acRole: 'accountant',
        acPhoneNumber: '',
        acEmail: '',

        //lawRepresentator
        lawRepresentatorName: '',
        lRIdNumber: '',
        lRIdIssuedDate: '',
        lRIdIssuedPlace: '',
        lRRole: 'legal_representative',
        lRPhoneNumber: '',
        lREmail: '',

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
      fileData: {
        filePath: fileUploaded.filePath,
        fileUrl: fileUploaded.fileUrl,
      },
    });
    console.log(contextRef.current);
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
      if (tempArr[index].userType?.toLowerCase() == 'corporate') {
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
    const fileSize = event.target.files[0].size / 1024 / 1024; // in MiB
    if (fileSize > 5) {
      message.error('Dung lượng file không được vượt quá 5MB');
    } else {
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
    }
  };

  const anhMatSauLRChangeHandler = (event) => {
    const fileSize = event.target.files[0].size / 1024 / 1024; // in MiB
    if (fileSize > 5) {
      message.error('Dung lượng file không được vượt quá 5MB');
    } else {
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
    }
  };

  const anhCaNhanLRChangeHandler = (event) => {
    const fileSize = event.target.files[0].size / 1024 / 1024; // in MiB
    if (fileSize > 5) {
      message.error('Dung lượng file không được vượt quá 5MB');
    } else {
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
    }
  };

  function checkData(data) {
    return typeof data !== 'undefined' && data;
  }

  const getOcrIdentifyLawReprensetator = async (
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

      var dataForm2 = new FormData();
      console.log(contextRef.current.lawRepresentatorPaperType);

      if (contextRef.current.lawRepresentatorPaperType == '') {
        dataForm2.append(
          'ocrCode',
          contextRef.current.lawRepresentatorPaperType,
        );
        dataForm2.append('fileFrontIdentify', anhMatTruoc);
        dataForm2.append('fileBackIdentify', anhMatSau);
      } else if (contextRef.current.lawRepresentatorPaperType == 'hc') {
        dataForm2.append(
          'ocrCode',
          contextRef.current.lawRepresentatorPaperType,
        );
        dataForm2.append('fileFrontIdentify', anhMatTruoc);
        dataForm2.append('fileBackIdentify', anhMatTruoc);
      }

      var dataForm3 = new FormData();
      dataForm3.append('imgFront', anhMatTruoc);
      dataForm3.append('imgBack', anhMatSau);
      dataForm3.append('imgPortrait', anhCaNhan);

      var responseVerify = verifyIdentify(dataForm1);
      responseVerify.then((response) => {
        if (response.data == 'Thành công') {
          var responseOcr = getOcrIdentify(dataForm2);
          responseOcr.then((response) => {
            contextService.updateContext({
              ...contextRef.current,
              loading: false,
            });

            console.log(response);
            if (checkData(response?.data)) {
              if (response?.data?.codeMesage == null) {
                if (
                  trimData(response.data.hoVaTen?.toLowerCase()) ===
                  trimData(
                    contextRef.current.corporate.lawRepresentatorFullName?.toLowerCase(),
                  )
                ) {
                  var responseUpload;
                  if (contextRef.current.lawRepresentatorPaperType == '') {
                    responseUpload = uploadFileImage(dataForm3);
                  } else if (
                    contextRef.current.lawRepresentatorPaperType == 'hc'
                  ) {
                    responseUpload = uploadFileImagePP(dataForm3);
                  }
                  // var responseUpload = uploadFileImage(dataForm3);
                  responseUpload.then((response) => {
                    console.log(response);

                    contextService.updateContext({
                      ...contextRef.current,
                      userLR: {
                        ...contextRef.current.userLR,
                        imageFrontOfIdentity: response.filePathImgFront,
                        imageBackOfIdentity: response.filePathImgBack,
                        imagePortraitOfIdentity: response.filePathImgPortrait,
                      },
                    });
                  });
                  contextService.updateContext({
                    ...contextRef.current,
                    userLR: {
                      ...contextRef.current.userLR,
                      lawRepresentatorName: response.data.hoVaTen,
                      lRIdNumber: response.data.soCmt,
                      lRDOB: response.data.namSinh,
                      lRIdIssuedDate: response.data.ngayCap,
                      lRRole: 'legal_representative',
                      lRIdIssuedPlace: response.data.noiCap,

                      imageFrontOfIdentity: anhMatTruoc,
                      imageBackOfIdentity: anhMatSau,
                      imagePortraitOfIdentity: anhCaNhan,
                    },
                    corporate: {
                      ...contextRef.current.corporate,
                      lawRepresentatorName: response.data.hoVaTen,
                      lRIdNumber: response.data.soCmt,
                      lRDOB: response.data.namSinh,
                      lRIdIssuedDate: response.data.ngayCap,
                      lRRole: 'legal_representative',
                      lRIdIssuedPlace: response.data.noiCap,
                    },
                    visbleLREkycResult: true,
                  });
                } else {
                  // message.error(response?.data?.message);
                  message.error(
                    'Tên người đại diện pháp luật không khớp với thông tin trên giấy ĐKKD',
                  );
                }
              } else {
                message.error(response?.data?.message);
              }
            } else {
              message.error(response?.data?.message);
              // message.error(
              //   'Ảnh upload không phù hợp với loại Giấy tờ định danh',
              // );
            }
          });
        } else {
          message.error(response?.data?.message);
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
    const fileSize = event.target.files[0].size / 1024 / 1024; // in MiB
    if (fileSize > 5) {
      message.error('Dung lượng file không được vượt quá 5MB');
    } else {
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
    }
  };

  const anhMatSauACChangeHandler = (event) => {
    const fileSize = event.target.files[0].size / 1024 / 1024; // in MiB
    if (fileSize > 5) {
      message.error('Dung lượng file không được vượt quá 5MB');
    } else {
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
    }
  };

  const anhCaNhanACChangeHandler = (event) => {
    const fileSize = event.target.files[0].size / 1024 / 1024; // in MiB
    if (fileSize > 5) {
      message.error('Dung lượng file không được vượt quá 5MB');
    } else {
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
    }
  };

  const getOcrIdentifyAccountant = async (
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
      if (contextRef.current.accountantPaperType == '') {
        dataForm2.append('ocrCode', contextRef.current.accountantPaperType);
        dataForm2.append('fileFrontIdentify', anhMatTruoc);
        dataForm2.append('fileBackIdentify', anhMatSau);
      } else if (contextRef.current.accountantPaperType == 'hc') {
        dataForm2.append('ocrCode', contextRef.current.accountantPaperType);
        dataForm2.append('fileFrontIdentify', anhMatTruoc);
        dataForm2.append('fileBackIdentify', anhMatTruoc);
      }

      console.log('Received values of form: ', dataForm2);

      var dataForm3 = new FormData();
      dataForm3.append('imgFront', anhMatTruoc);
      dataForm3.append('imgBack', anhMatSau);
      dataForm3.append('imgPortrait', anhCaNhan);
      console.log('Received values of form: ', dataForm3);

      var responseVerify = verifyIdentify(dataForm1);
      responseVerify.then((response) => {
        if (response.data == 'Thành công') {
          var responseUpload;
          if (contextRef.current.accountantPaperType == '') {
            responseUpload = uploadFileImage(dataForm3);
          } else if (contextRef.current.accountantPaperType == 'hc') {
            responseUpload = uploadFileImagePP(dataForm3);
          }
          responseUpload.then((response) => {
            console.log(response);
            contextService.updateContext({
              ...contextRef.current,
              userAC: {
                ...contextRef.current.userAC,
                imageFrontOfIdentity: response?.filePathImgFront,
                imageBackOfIdentity: response?.filePathImgBack,
                imagePortraitOfIdentity: response?.filePathImgPortrait,
              },
            });
          });

          var responseOcr = getOcrIdentify(dataForm2);

          responseOcr.then((response) => {
            contextService.updateContext({
              ...contextRef.current,
              loading: false,
            });

            if (response?.data?.codeMesage == null) {
              console.log(response.data);
              contextService.updateContext({
                ...contextRef.current,
                userAC: {
                  ...contextRef.current.userAC,
                  acName: response.data.hoVaTen,
                  acIdNumber: response.data.soCmt,
                  acDOB: response.data.namSinh,
                  acIdIssuedDate: response.data.ngayCap,
                  acRole: 'accountant',
                  acIdIssuedPlace: response.data.noiCap,
                },
                corporate: {
                  ...contextRef.current.corporate,
                  acName: response.data.hoVaTen,
                  acIdNumber: response.data.soCmt,
                  acDOB: response.data.namSinh,
                  acIdIssuedDate: response.data.ngayCap,
                  acRole: 'accountant',
                  acIdIssuedPlace: response.data.noiCap,
                },
                visbleACCEkycResult: true,
              });
            } else {
              message.error(response?.data?.message);
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
      timeout: TIME_OUT,
    };

    let response = await axios(config);
    return response.data;
  };

  const verifyIdentify = async (data) => {
    var config = {
      method: 'post',
      url: process.env.REACT_APP_API_BACKEND + '/ocr/verifyIndentify',
      data: data,
      timeout: TIME_OUT,
    };

    let response = await axios(config);
    return response.data;
  };

  const uploadFileImage = async (data) => {
    var config = {
      method: 'post',
      url: process.env.REACT_APP_API_BACKEND + '/corporate/uploadFileImage',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
      timeout: TIME_OUT,
    };

    let response = await axios(config);
    return response.data;
  };

  const uploadFileImagePP = async (data) => {
    var config = {
      method: 'post',
      url: process.env.REACT_APP_API_BACKEND + '/corporate/uploadFileImagePP',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
      timeout: TIME_OUT,
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

  const onLawRepresentatorPaperTypeChange = (e) => {
    console.log(e.target.value);
    contextService.updateContext({
      ...contextRef.current,
      lawRepresentatorPaperType: e.target.value,
    });
  };

  const onAccountantPaperTypeChange = (e) => {
    contextService.updateContext({
      ...contextRef.current,
      accountantPaperType: e.target.value,
    });
  };

  const onLawRepresentatorNameChange = (e) => {
    contextService.updateContext({
      ...contextRef.current,
      corporate: {
        ...contextRef.current.corporate,
        lawRepresentatorName: e.target.value,
      },
      userLR: {
        ...contextRef.current.userLR,
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
      userLR: {
        ...contextRef.current.userLR,
        lRIdNumber: e.target.value,
      },
    });
  };

  const onLawRepresentatorDOBChange = (e) => {
    console.log(e);
    if (e != null) {
      contextService.updateContext({
        ...contextRef.current,
        corporate: {
          ...contextRef.current.corporate,
          lRDOB: convert(e?._d),
        },
        userLR: {
          ...contextRef.current.userLR,
          lRDOB: convert(e?._d),
        },
      });
    }
  };

  const onLawRepresentatorIssuedDateChange = (e) => {
    if (e != null) {
      contextService.updateContext({
        ...contextRef.current,
        corporate: {
          ...contextRef.current.corporate,
          lRIdIssuedDate: convert(e?._d),
        },
        userLR: {
          ...contextRef.current.userLR,
          lRIdIssuedDate: convert(e?._d),
        },
      });
    }
  };

  const onLawRepresentatorIssuedPlaceChange = (e) => {
    contextService.updateContext({
      ...contextRef.current,
      corporate: {
        ...contextRef.current.corporate,
        lRIdIssuedPlace: e.target.value,
      },
      userLR: {
        ...contextRef.current.userLR,
        lRIdIssuedPlace: e.target.value,
      },
    });
  };

  const onLawRepresentatorRoleChange = (e) => {
    contextService.updateContext({
      ...contextRef.current,
      corporate: {
        ...contextRef.current.corporate,
        lRRole: e,
      },
      userLR: {
        ...contextRef.current.userLR,
        lRRole: e,
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
      userLR: {
        ...contextRef.current.userLR,
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
      userLR: {
        ...contextRef.current.userLR,
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
      userAC: {
        ...contextRef.current.userAC,
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
      userAC: {
        ...contextRef.current.userAC,
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
      userAC: {
        ...contextRef.current.userAC,
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
      userAC: {
        ...contextRef.current.userAC,
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
      userAC: {
        ...contextRef.current.userAC,
        acIdIssuedPlace: e.target.value,
      },
    });
  };
  const onAcRoleChange = (e) => {
    contextService.updateContext({
      ...contextRef.current,
      corporate: {
        ...contextRef.current.corporate,
        acRole: e,
      },
      userAC: {
        ...contextRef.current.userAC,
        acRole: e,
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
      userAC: {
        ...contextRef.current.userAC,
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
      userAC: {
        ...contextRef.current.userAC,
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

  const setUserList = (dataList) => {
    console.log('Data list user test!!!');
    console.log(dataList);
    contextService.updateContext({
      ...contextRef.current,
      corporate: {
        ...contextRef.current.corporate.stateCorporateUserList,
        dataSource: dataList,
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
        ...contextRef.current.corporate.stateCorporateAccountList,
        dataSource: dataList,
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
    var data = {
      businessRegistrationCertificateUrl:
        contextRef.current.fileData?.filePath?.trim(),
      corporateCode: contextRef.current.corporate.corporateCode?.trim(),
      corporateName: contextRef.current.corporate.corporateName?.trim(),
      corporateNameEn: contextRef.current.corporate.corporateName?.trim(),
      typeOfCorporate: contextRef.current.corporate.corporateType?.trim(),
      dateRegistration: contextRef.current.corporate.registerDate?.trim(),
      registrationTimes: contextRef.current.corporate.registerTime?.trim(),
      corporateAddress: contextRef.current.corporate.hqAddress?.trim(),
      corporatePhoneNumber: contextRef.current.corporate.phoneNumber?.trim(),
      corporateEmail: contextRef.current.corporate.email?.trim(),
      corporateFaxNumber: contextRef.current.corporate.fax?.trim(),
      corporateWebsite: contextRef.current.corporate.website?.trim(),
      charterCapital: contextRef.current.corporate.budget?.trim(),
      parValueShares: '',
      totalNumberOfShares: '',

      legalRepresentativeFullName:
        contextRef.current.corporate.lawRepresentatorFullName?.trim(),
      legalRepresentativeIdentifyNumber:
        contextRef.current.corporate.identificationPaperNumber?.trim(),
      legalRepresentativeIdentifyCreatedDate:
        contextRef.current.corporate.identificationPaperCreatedDate,
      legalRepresentativeIdentifyCreatedPlace:
        contextRef.current.corporate.identificationPaperCreatedPlace?.trim(),

      signatureSerial: contextRef.current.corporate.serial?.trim(),
      signature: contextRef.current.corporate.signature?.trim(),
      signatureSubscriberName: contextRef.current.corporate.subject?.trim(),
      signatureTime: contextRef.current.corporate.signtime?.trim(),
      signatureCertificate: contextRef.current.corporate.certificate?.trim(),
      signatureExpirationDate: contextRef.current.corporate.to?.trim(),
      signatureValueDate: contextRef.current.corporate.from?.trim(),
      signatureValue: contextRef.current.corporate.validity?.trim(),
      signatureReleaseBy: contextRef.current.corporate.issuer?.trim(),
      signatureTaxCode: contextRef.current.corporate.mst?.trim(),

      user1DeputyName:
        contextRef.current.corporate.lawRepresentatorName?.trim(),
      user1DeputyIdentifyNumber:
        contextRef.current.corporate.lRIdNumber?.trim(),
      user1DeputyIdentifyCreatedPlace:
        contextRef.current.corporate.lRIdIssuedPlace?.trim(),
      user1DeputyBirthday: contextRef.current.corporate.lRDOB,
      user1DeputyIdentifyCreatedDate:
        contextRef.current.corporate.lRIdIssuedDate,
      user1DeputyRoles:
        contextRef.current.corporate.lRRole != undefined &&
        contextRef.current.corporate.lRRole != null
          ? contextRef.current.corporate.lRRole
          : contextRef.current.corporate.user1DeputyRoles,
      user1DeputyIdentifyPhone:
        contextRef.current.corporate.lRPhoneNumber?.trim(),
      user1DeputyIdentifyEmail: contextRef.current.corporate.lREmail?.trim(),
      frontOfUser1DeputyIdentifyUrl: contextRef.current.corporate.lRFrontImage,
      backOfUser1DeputyIdentifyUrl: contextRef.current.corporate.lRBackImage,
      portraitOfUser1DeputyUrl: contextRef.current.corporate.lRPotraitImage,

      user2DeputyName: contextRef.current.corporate.acName?.trim(),
      user2DeputyIdentifyNumber:
        contextRef.current.corporate.acIdNumber?.trim(),
      user2DeputyIdentifyCreatedPlace:
        contextRef.current.corporate.acIdIssuedPlace?.trim(),
      user2DeputyBirthday: contextRef.current.corporate.acDOB,
      user2DeputyIdentifyCreatedDate:
        contextRef.current.corporate.acIdIssuedDate,
      user2DeputyRoles:
        contextRef.current.corporate.acRole != undefined &&
        contextRef.current.corporate.acRole != null
          ? contextRef.current.corporate.acRole
          : contextRef.current.corporate.user2DeputyRoles,
      user2DeputyIdentifyPhone:
        contextRef.current.corporate.acPhoneNumber?.trim(),
      user2DeputyIdentifyEmail: contextRef.current.corporate.acEmail?.trim(),
      frontOfUser2DeputyIdentifyUrl: contextRef.current.corporate.acFrontImage,
      backOfUser2DeputyIdentifyUrl: contextRef.current.corporate.acBackImage,
      portraitOfUser2DeputyUrl: contextRef.current.corporate.acPotraitImage,

      corporateAccountList:
        contextRef.current.corporate.stateCorporateAccountList.dataSource,
      corporateUserList:
        contextRef.current.corporate.stateCorporateUserList.dataSource,
      packageServiceId: contextRef.current.corporate.packageServiceId,
      channelInit: 'Corporate',
    };

    console.log('Received values of form: ', data);

    var config = {
      method: 'post',
      url: process.env.REACT_APP_API_BACKEND + '/corporate/create',

      data: data,
      timeout: TIME_OUT,
    };

    let response = await axios(config);
    console.log(response.data);
    contextService.updateContext({
      ...contextRef.current,
      loading: false,
    });
    if (response.data != null) {
      if (response.data.code == 200) {
        contextService.updateContext({
          ...contextRef.current,
          createSuccessModalVisible: true,
        });
      } else {
        message.error(response.data.message);
      }
      // setTimeout(() => {
      //   message.error('Mở tài khoản không thành công');
      // }, 3000);
    }
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

  //------------------------------------//

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
    submitDataHandler,
    onModalClose,
    loginNow,
    exitHandler,
  });
  return [context, domainInterface.current];
}

export default CreateCorporateDomain;
