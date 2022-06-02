import { message } from 'antd';
import { useCallback, useRef, useEffect } from 'react';
import { useHistory } from 'react-router';
import useCM0402ContextService from '../services/CM.04.02ContextService';
import { useParams } from 'react-router-dom';
import { convert } from '@storybook/theming';
import moment from 'moment';
import log from '../ModuleLogger';

var axios = require('axios');

export function useCM0402Domain() {
  const history = useHistory();
  const { id } = useParams();
  const [context, contextService] = useCM0402ContextService();
  const contextRef = useRef(context);

  //format
  const dateFormatList = 'DD/MM/YYYY';
  const dateTimeFormatList = 'DD/MM/YYYY HH:mm:ss';
  const dateTimeNow = moment(new Date()).format(dateTimeFormatList);
  const dateInt = new Date().getTime();
  const extId = 'knldjmfmopnpolahpmmgbagdohdnhkik';
  const TIME_OUT = 300000;

  var fileName = 'FileContract' + id + '_' + dateInt + '.pdf';

  function convert(str) {
    if (str != undefined && str != null && str != '') {
      var date = new Date(str),
        mnth = ('0' + (date.getMonth() + 1)).slice(-2),
        day = ('0' + date.getDate()).slice(-2);
      if (dateFormatList == 'DD/MM/YYYY') {
        return [day, mnth, date.getFullYear()].join('/');
      } else {
        return [date.getFullYear(), mnth, day].join('-');
      }
    } else {
      return '';
    }
  }

  useEffect(() => {
    contextRef.current = context;
    console.log('change context domain', contextRef.current);
  }, [context]);

  const initSignDomain = async () => {
    var contextData = await getContractById();
    var userInfoLogin = await getInfoUserLogin();

    contextData.dataUserLogin = userInfoLogin;
    contextData.showSignSuccess = false;
    contextData.showSignDigital = false;
    contextData.showCertificateModal = false;

    contextData.signDigitalRequest = {
      maKy: '',
      agreementUUID: '',
      codeTransaction: '',
      otp: '',
    };

    // checkuser đăng nhập
    contextData.showButtonConfirm = false;
    contextData.showButtonSign = false;
    console.log('userInfoLogin:::', userInfoLogin);
    // console.log('contextData:::', contextData);
    if (contextData?.status == 3) {
      if (
        userInfoLogin?.corporate?.corporateId == contextData?.sellerCorporateId
      ) {
        var userGroupList = userInfoLogin?.userGroupEntitys;
        userGroupList.forEach((element) => {
          if (element.role == 'Maker') {
            contextData.showButtonConfirm = true;
          }
        });
      }
    } else if (contextData?.status == 5) {
      if (
        userInfoLogin?.corporate?.corporateId == contextData?.sellerCorporateId
      ) {
        var userGroupList = userInfoLogin?.userGroupEntitys;
        userGroupList.forEach((element) => {
          if (element.role == 'Approver') {
            contextData.showButtonSign = true;
          }
        });
        // if (
        //   userInfoLogin.id == contextData?.representativeSeller
        //   //|| userInfoLogin?.corporate?.corporateId == contextData?.sellerCorporateId
        // ) {
        //   contextData.showButtonSign = true;
        // } else {
        //   log.info('khong phai user maker seller');
        // }
      }
    }

    contextData.setListCertificate = [];

    contextData.certificateData = null;

    contextData.loading = false;

    contextData.linkDownloadCer =
      'https://dev-lc-storage.xcbt.online/s3-lc-dev/certificate/xSigner.rar';
      
    await contextService.initContext(contextData);
    // await getContract();
  };

  const getContractById = async () => {
    //hardcode tab1
    var config = {
      method: 'get',
      url:
        process.env.REACT_APP_API_BACKEND +
        '/corporate/contract/getContract/' +
        id,
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('access_token') + '',
        'Content-Type': 'application/json',
        'Accept-Language': 'vi',
      },
    };

    var contractData = {};

    let response = await axios(config);
    if (response?.data?.code == 200) {
      console.log('responseView:::', response.data.data);
      var temp = response?.data?.data;
      if (temp) {
        contractData.contractCode = temp.contractCode;
        contractData.contractNo = temp.contractNo;
        contractData.pursuantLaw = temp.pursuantLaw;
        contractData.contractEstablishmentDate = temp.contractEstablishmentDate;
        contractData.sellerCorporateId = temp.sellerCorporate.corporateId;
        contractData.sellerName = temp?.sellerCorporate.corporateId;
        contractData.sellerAddress = temp.sellerCorporate.corporateAddress;
        contractData.representativeSeller = temp?.userInfoSeller?.id;
        contractData.sellerPosition = temp?.userInfoSeller.position;
        contractData.buyerCorporateId = temp?.buyerCorporate.corporateId;
        contractData.buyerName = temp.buyerName;
        contractData.buyerAddress = temp?.buyerCorporate.corporateAddress;
        contractData.representativeBuyer = temp?.userInfoBuyer?.id;
        contractData.buyerPosition = temp?.userInfoBuyer?.position;

        contractData.status = temp.status;
        contractData.urlMinio = temp.urlMinio;
        contractData.base64File = temp.base64File;
        contractData.reasonsForRefusingTheSeller =
          temp.reasonsForRefusingTheSeller;
      }
      console.log('contractData:::::', contractData);
    }
    return contractData;
  };

  const getInfoUserLogin = async () => {
    var config = {
      method: 'get',
      url: process.env.REACT_APP_API_BACKEND + '/user/getUserLogin',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('access_token') + '',
        'Content-Type': 'application/json',
        'Accept-Language': 'vi',
      },
    };
    let response = await axios(config);
    if (response?.data?.code == 200) {
      // contextService.updateContext({
      //   ...contextRef.current,
      //   dataUserLogin: response.data.data,
      // });
    }
    return response.data.data;
  };

  // maker
  const rejectConfirmMakerSeller = async (reason) => {
    contextService.updateContext({
      ...contextRef.current,
      loading: true,
      showRejectVisible: false,
    });
    var data = {
      contractId: id,
      status: 4,
      sellerVerifier: { id: contextRef.current?.dataUserLogin?.id }, // người xác nhận bên bán
      sellerConfirmationDate: dateTimeNow, // ngày xác nhận bên bán
      reasonsForRefusingTheSeller: reason,
    };

    console.log('reason:::', reason);
    console.log('revert data:::', data);

    var config = {
      method: 'put',
      url:
        process.env.REACT_APP_API_BACKEND +
        '/corporate/contract/updateDigitalSignature',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('access_token') + '',
        'Content-Type': 'application/json',
        'Accept-Language': 'vi',
      },
      data: data,
      timeout: TIME_OUT,
    };

    let response = await axios(config);
    if (response?.data?.code == 200 || response?.data?.code == 201) {
      console.log(response);

      await message.success('Từ chối thành công!');
      setTimeout(() => {
        // closeRejectModal();
        exitHandler();
      }, 500);
      contextService.updateContext({
        ...contextRef.current,
        loading: false,
      });
      return;
    } else {
      message.error('Từ chối thất bại!');
      console.log(response.data.message);
      // message.error(response.data.message);
    }
    contextService.updateContext({
      ...contextRef.current,
      loading: false,
    });
  };

  const submitSellerConfirm = async () => {
    var data = {
      contractId: id,
      status: 5,
      sellerVerifier: { id: contextRef.current?.dataUserLogin?.id }, // người xác nhận bên bán
      sellerConfirmationDate: dateTimeNow, // ngày xác nhận bên bán
      reasonsForRefusingTheSeller: '',
    };

    console.log('revert data:::', data);

    var config = {
      method: 'put',
      url:
        process.env.REACT_APP_API_BACKEND +
        '/corporate/contract/updateDigitalSignature',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('access_token') + '',
        'Content-Type': 'application/json',
        'Accept-Language': 'vi',
      },
      data: data,
      timeout: TIME_OUT,
    };
    contextService.updateContext({
      ...contextRef.current,
      loading: true,
    });

    let response = await axios(config);
    if (response?.data?.code == 200 || response?.data?.code == 201) {
      console.log(response);
      // closeRejectModal();
      message.success('Xác nhận thành công!');
      setTimeout(() => {
        contextService.updateContext({
          ...contextRef.current,
          loading: false,
        });
        exitHandler();
      }, 1500);
      return;
    } else {
      console.log(response.data.message);
      // message.error(response.data.message);
    }
    contextService.updateContext({
      ...contextRef.current,
      loading: false,
    });
  };

  // Checker
  const rejectSignDigitalCheckerSeller = async (reason) => {
    contextService.updateContext({
      ...contextRef.current,
      loading: true,
      showRejectVisible: false,
    });
    var data = {
      contractId: id,
      status: 6,
      sellerDigitalSignature: { id: contextRef.current?.dataUserLogin?.id }, // người ký số bên bán
      sellerDigitalSigningDate: dateTimeNow, // ngày ký số bên bán
      reasonsForRefusingTheSeller: reason,
    };

    console.log('reason:::', reason);
    console.log('revert data:::', data);

    var config = {
      method: 'put',
      url:
        process.env.REACT_APP_API_BACKEND +
        '/corporate/contract/updateDigitalSignature',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('access_token') + '',
        'Content-Type': 'application/json',
        'Accept-Language': 'vi',
      },
      data: data,
      timeout: TIME_OUT,
    };

    let response = await axios(config);
    if (response?.data?.code == 200 || response?.data?.code == 201) {
      console.log(response);
      await message.success('Từ chối thành công!');
      setTimeout(() => {
        // closeRejectModal();
        exitHandler();
      }, 500);
      contextService.updateContext({
        ...contextRef.current,
        loading: false,
      });
      return;
    } else {
      message.error('Từ chối thất bại!');
      console.log(response.data.message);
      // message.error(response.data.message);
    }
    contextService.updateContext({
      ...contextRef.current,
      loading: false,
    });
  };

  // -------- Ky so ca nhan
  //Lấy thông tin ký số FPT CA.
  const submitSellerSignDigital = async () => {
    console.log('contractId:: ', id);

    var config = {
      method: 'post',
      url:
        process.env.REACT_APP_API_BACKEND +
        '/corporate/contract/signInSignature?contractId=' +
        id,
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('access_token') + '',
        'Content-Type': 'application/json',
        'Accept-Language': 'vi',
      },
      // data: data,
      timeout: TIME_OUT,
    };
    let response = await axios(config);
    if (response?.data?.code == 200 || response?.data?.code == 201) {
      console.log('resSignInSignature:::', response);
      var res = response?.data?.data;
      await contextService.updateContext({
        ...contextRef.current,
        signDigitalRequest: res,
        showSignDigital: true,
      });
    } else {
      message.error(response.data.message);
    }
  };
  // Ký số lên file thông qua OCR.
  const signDigitalCheckerSeller = async (otp) => {
    var signDigitalData = contextRef.current?.signDigitalRequest;

    var data = {
      maKy: signDigitalData?.maKy,
      agreementUUID: signDigitalData?.agreementUUID,
      codeTransaction: signDigitalData?.codeTransaction,
      otp: otp,
    };

    console.log('data: ', data);
    // var fileName = 'FileContract_' + dateInt + '.pdf';
    var config = {
      method: 'post',
      url:
        process.env.REACT_APP_API_BACKEND +
        '/corporate/contract/signDigital?nameFile=' +
        fileName,
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('access_token') + '',
        'Content-Type': 'application/json',
        'Accept-Language': 'vi',
      },
      data: data,
    };
    let response = await axios(config);
    if (response?.data?.code == 200 || response?.data?.code == 201) {
      contextService.updateContext({
        ...contextRef.current,
        urlMinio: response?.data?.data,
        showSignDigital: false,
      });
      await sendEmailSign();
      await message.success('Ký số thành công!');
      setTimeout(() => {
        exitHandler();
      }, 1500);
    } else {
      message.error(response.data.message);
    }
  };

  // -------- Ky so doanh nghiep theo extensions token
  const signByTokenCheckerSeller = async () => {
    // get base64 cu file sau khi ben mua ky
    var base64Response = '';
    var signMsg = {
      type: 'sign',
      content: contextRef.current?.base64File,
      thumbprint: contextRef.current?.certificateData?.thumbprint,
    };
    window.chrome.runtime.sendMessage(extId, signMsg, function (response) {
      console.log('values', response);
      base64Response = response?.signedContent;
      updateUrlFileCheckerSeller(base64Response);
    });
  };

  const updateUrlFileCheckerSeller = async (base64Response) => {
    // gui base64 xuong db de genfile va ghi vao db
    if (
      base64Response != undefined &&
      base64Response != null &&
      base64Response != ''
    ) {
      // var fileName = 'FileContract_' + dateInt + '.pdf';
      var data = {
        urlFile: '',
        fileName: fileName,
        contractId: id,
        base64: base64Response,
      };

      console.log('data: ', data);
      var config = {
        method: 'put',
        url:
          process.env.REACT_APP_API_BACKEND +
          '/corporate/contract/updateUrlFile',
        headers: {
          Authorization:
            'Bearer ' + sessionStorage.getItem('access_token') + '',
          'Content-Type': 'application/json',
          'Accept-Language': 'vi',
        },
        data: data,
        timeout: TIME_OUT,
      };

      contextService.updateContext({
        ...contextRef.current,
        loading: true,
      });
      let response = await axios(config);
      console.log('updateUrlFile::: ', response);
      if (response?.data?.success) {
        if (response?.data?.code == 200 || response?.data?.code == 201) {
          contextService.updateContext({
            ...contextRef.current,
            urlMinio: response?.data?.urlFile,
            base64File: response?.data?.base64,
          });
          await message.success('Ký số thành công!');
          await sendEmailSign();
          setTimeout(() => {
            exitHandler();
          }, 500);
          return;
        } else {
          log.info('error:::', response?.data?.message);
          message.error('Ký số không thành công!');
        }
      } else {
        log.info('error:::', response?.data?.message);
        message.error('Ký số không thành công!');
      }
    } else {
      message.error('Ký số không thành công!');
    }
    contextService.updateContext({
      ...contextRef.current,
      loading: false,
    });
  };

  const sendEmailSign = async () => {
    console.log('values:::', contextRef.current);
    // var values = contextRef.current;console.log(response);
    var dateTimeNow = moment(new Date()).format(dateTimeFormatList);
    console.log(dateTimeNow);

    console.log('contractId:::', id);
    var data = {
      contractId: id,
      status: 7, // 7 : Checker bên bán đã ký số
      sellerDigitalSignature: { id: contextRef.current?.dataUserLogin?.id }, // người ký số bên bán
      sellerDigitalSigningDate: dateTimeNow, // ngày ký số bên bán
      reasonsForRefusingTheSeller: '',
      urlMinio: contextRef.current?.urlMinio,
    };
    console.log('revert data:::', data);

    var config = {
      method: 'put',
      url:
        process.env.REACT_APP_API_BACKEND +
        '/corporate/contract/updateDigitalSignature',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('access_token') + '',
        'Content-Type': 'application/json',
        'Accept-Language': 'vi',
      },
      data: data,
      timeout: TIME_OUT,
    };
    let response = await axios(config);
    if (response?.data?.code == 200 || response?.data?.code == 201) {
      console.log(response);
      contextService.updateContext({
        ...contextRef.current,
        loading: false,
      });
    } else {
      console.log(response.data.message);
      // message.error(response.data.message);
    }
  };

  const openCertificateModal = async () => {
    const certificateList = [];
    var extId = 'knldjmfmopnpolahpmmgbagdohdnhkik';
    try {
      window.chrome.runtime.sendMessage(
        extId,
        { type: 'cert' },
        function (response) {
          var certificates = response?.certificates;
          if (certificates != undefined && certificates != null) {
            certificates.forEach((certificate, index) => {
              var cert = {};
              cert = certificate;
              cert.key = index + 1;
              certificateList.push(cert);
            });
          } else {
            message.error('Không tìm thấy bộ chứng từ');
          }
          contextService.updateContext({
            ...contextRef.current,
            setListCertificate: certificateList,
            showCertificateModal: true,
          });
        },
      );
    } catch (error) {
      contextService.updateContext({
        ...contextRef.current,
        showCertificateDownloadModal: true,
      });
      // message.error('Vui lòng cài đặt extensions bộ chứng từ');
    }

    console.log('exit_view', certificateList);
  };

  const closeCertificateModal = async () => {
    contextService.updateContext({
      ...contextRef.current,
      showCertificateModal: false,
    });
  };

  const closeCertificateDownloadModal = async () => {
    contextService.updateContext({
      ...contextRef.current,
      showCertificateDownloadModal: false,
    });
  };

  const pickCertificateData = async (data) => {
    var data = data;
    // certificate.data = data;
    // certificate.check = true;
    console.log(data);
    await contextService.updateContext({
      ...contextRef.current,
      certificateData: data,
      showCertificateModal: false,
    });
    await signByTokenCheckerSeller();
  };

  const openRejectModal = async () => {
    var formatedDateFinale = moment(new Date()).format(dateTimeFormatList);
    console.log(formatedDateFinale);
    contextService.updateContext({
      ...contextRef.current,
      showRejectVisible: true,
    });
  };

  const closeRejectModal = async () => {
    contextService.updateContext({
      ...contextRef.current,
      // loading: true,
      showRejectVisible: false,
    });
  };

  const openSignDigitalModal = async () => {
    contextService.updateContext({
      ...contextRef.current,
      showSignDigital: true,
    });
  };

  const closeSignDigitalModal = async () => {
    contextService.updateContext({
      ...contextRef.current,
      showSignDigital: false,
    });
  };

  const openSignSuccessModal = async () => {
    contextService.updateContext({
      ...contextRef.current,
      showSignSuccess: true,
    });
  };

  const closeSignSuccessModal = async () => {
    contextService.updateContext({
      ...contextRef.current,
      showSignSuccess: false,
    });
    exitHandler();
  };

  const editHandler = async (id) => {
    history.push(`/cm-home/contract-seller/edit/${id}`);
  };

  const toSignDigitalHandler = async (id) => {
    history.push(`/cm-home/contract-seller/sign/${id}`);
  };

  const exitHandler = async () => {
    console.log('exit_view');
    history.push('/cm-home/contract-seller');
  };

  const domainInterface = useRef({
    initSignDomain,
    getInfoUserLogin,
    getContractById,

    rejectConfirmMakerSeller,
    submitSellerConfirm,

    rejectSignDigitalCheckerSeller,
    submitSellerSignDigital,
    signDigitalCheckerSeller,
    signByTokenCheckerSeller,

    pickCertificateData,
    openCertificateModal,
    closeCertificateModal,
    closeCertificateDownloadModal,

    closeSignDigitalModal,
    openSignSuccessModal,
    closeSignSuccessModal,
    openRejectModal,
    closeRejectModal,

    editHandler,
    exitHandler,
    toSignDigitalHandler,
  });
  return [context, domainInterface.current];
}

export default useCM0402Domain;
