import { useCallback, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router';
import CM07Service from '../services/CM.07Service';
import { message } from 'antd';
import moment from 'moment';
import log from '../ModuleLogger';

var axios = require('axios');

export function CM0708Domain() {
  const history = useHistory();
  const [context, contextService] = CM07Service();
  const contextRef = useRef(context);
  const { id } = useParams();
  const TIME_OUT = 300000;

  //format
  const dateTimeFormatList = 'DD/MM/YYYY HH:mm:ss';
  const dateInt = new Date().getTime();
  const extId = 'knldjmfmopnpolahpmmgbagdohdnhkik';

  var fileName = 'FileReleaseLC' + id + '_' + dateInt + '.pdf';

  useEffect(() => {
    contextRef.current = context;
  }, [context]);

  function convert(str) {
    var date = new Date(str),
      mnth = ('0' + (date.getMonth() + 1)).slice(-2),
      day = ('0' + date.getDate()).slice(-2);
    return [day, mnth, date.getFullYear()].join('/');
  }

  const initDomain = async () => {
    var applicationOpeningLc = await getDetail(id);
    var userInfoLogin = await getInfoUserLogin();

    // khởi tạo nghiệp vụ
    var contextData = {
      lcApplication: applicationOpeningLc,
    };
    var status = applicationOpeningLc?.status;
    contextData.viewBtnSignAccountant = false;
    contextData.viewBtnSignCorporate = false;
    contextData.loading = false;

    var position = userInfoLogin.position;
    if (status == 2 && position == 'accountant') {
      contextData.viewBtnSignAccountant = true;
    } else if (status == 3 && position == 'legal_representative') {
      contextData.viewBtnSignCorporate = true;
    }

    contextData.setListCertificate = [];
    contextData.linkDownloadCer =
      'https://dev-lc-storage.xcbt.online/s3-lc-dev/certificate/xSigner.rar';

    contextService.initContext(contextData);
    console.log('contextData:::', contextData);
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
    var data = {};
    if (response?.data?.code == 200) {
      data = response.data.data;
    }
    return data;
  };

  const getDetail = async (id) => {
    var config = {
      method: 'get',
      url:
        process.env.REACT_APP_API_BACKEND +
        '/corporate/getApplicationOpeningLc/' +
        id +
        '',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('access_token') + '',
        'Content-Type': 'application/json',
      },
      timeout: TIME_OUT,
    };

    let response = await axios(config);
    var lcApplication = {};
    if (response.data.data == null || response.data.data == undefined) {
      message.error('Không có dữ liệu');
      return null;
    } else {
      lcApplication = response.data.data;
      // console.log(lcApplication);
    }
    return lcApplication;
  };

  function checkData(data) {
    return typeof data !== 'undefined' && data;
  }

  // -------- Ky so ca nhan
  //Lấy thông tin ký số FPT CA.
  const submitAccountantSignDigital = async () => {
    contextService.updateContext({
      ...contextRef.current,
      loading: true,
    });
    console.log('applicationOpeningLcId:: ', id);

    var config = {
      method: 'post',
      url:
        process.env.REACT_APP_API_BACKEND +
        '/corporate/applicationOpeningLc/signInSignature?applicationOpeningLcId=' +
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
        showFormOTPModal: true,
        loading: false,
      });
    } else {
      // message.error('Sai số OTP. Vui lòng nhập lại!');
      message.error(response.data.message);
      contextService.updateContext({
        ...contextRef.current,
        loading: false,
      });
    }
  };

  // Ký số lên file thông qua OCR.
  const signDigitalAccountant = async (otp) => {
    contextService.updateContext({
      ...contextRef.current,
      showFormOTPModal: false,
      loading: true,
    });
    var signDigitalData = contextRef.current?.signDigitalRequest;

    var data = {
      maKy: signDigitalData?.maKy,
      agreementUUID: signDigitalData?.agreementUUID,
      codeTransaction: signDigitalData?.codeTransaction,
      otp: otp,
      applicationOpeningLcId: id,
    };

    console.log('data: ', data);
    // var fileName = 'FileContract_' + dateInt + '.pdf';
    var config = {
      method: 'post',
      url:
        process.env.REACT_APP_API_BACKEND +
        '/corporate/applicationOpeningLc/signDigital',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('access_token') + '',
        'Content-Type': 'application/json',
        'Accept-Language': 'vi',
      },
      data: data,
      timeout: TIME_OUT,
    };
    let response = await axios(config);
    if (checkData(response?.data)) {
      if (response?.data?.code == 200 || response?.data?.code == 201) {
        // await sendEmailSign();
        await message.success('Ký số thành công!');
        setTimeout(() => {
          contextService.updateContext({
            ...contextRef.current,
            urlMinio: response?.data?.data,
            loading: false,
          });
          exitHandler();
        }, 500);
      } else {
        // message.error(response.data.message);
        message.error('Sai số OTP. Vui lòng nhập lại!');
        contextService.updateContext({
          ...contextRef.current,
          showFormOTPModal: true,
          loading: false,
        });
      }
    } else {
      message.error('Ký số không thành công!');
      contextService.updateContext({
        ...contextRef.current,
        showFormOTPModal: true,
        loading: false,
      });
    }
  };

  const openCertificateModal = async () => {
    const certificateList = [];
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

  const pickCertificateData = async (data) => {
    var data = data;
    console.log(data);
    await contextService.updateContext({
      ...contextRef.current,
      certificateData: data,
      showCertificateModal: false,
      loading: true,
    });
    await signByTokenCorporate();
  };

  // -------- Ky so doanh nghiep theo extensions token
  const signByTokenCorporate = async () => {
    // get base64 cu file sau khi ben mua ky
    var base64Response = '';
    var signMsg = {
      type: 'sign',
      content: contextRef.current?.lcApplication?.fileKySoBase64,
      thumbprint: contextRef.current?.certificateData?.thumbprint,
    };
    console.log('signMsg', signMsg);

    window.chrome.runtime.sendMessage(extId, signMsg, function (response) {
      console.log('values', response);
      base64Response = response?.signedContent;
      updateUrlFileCheckerBuyer(base64Response);
    });
  };

  const updateUrlFileCheckerBuyer = async (base64Response) => {
    // gui base64 xuong db de genfile va ghi vao db
    if (base64Response != '') {
      // var fileName = 'FileContract_' + dateInt + '.pdf';
      var data = {
        urlFile: '',
        fileName: fileName,
        applicationOpeningLcId: id,
        base64: base64Response,
      };

      console.log('data: ', data);
      var config = {
        method: 'post',
        url:
          process.env.REACT_APP_API_BACKEND +
          '/corporate/applicationOpeningLc/updateUrlFile',
        headers: {
          Authorization:
            'Bearer ' + sessionStorage.getItem('access_token') + '',
          'Content-Type': 'application/json',
          'Accept-Language': 'vi',
        },
        data: data,
        timeout: TIME_OUT,
      };
      let response = await axios(config);
      console.log('updateUrlFile::: ', response);
      if (response?.data?.success) {
        if (response?.data?.code == 200 || response?.data?.code == 201) {
          message.success('Ký số thành công!');
          setTimeout(() => {
            contextService.updateContext({
              ...contextRef.current,
              urlMinio: response?.data?.urlFile,
              base64File: response?.data?.base64,
              loading: false,
            });
            exitHandler();
          }, 500);

          // await sendEmailSign();
        } else {
          log.info('error:::', response?.data?.message);
          message.error('Ký số không thành công!');
          contextService.updateContext({
            ...contextRef.current,
            loading: false,
          });
        }
      } else {
        log.info('error:::', response?.data?.message);
        message.error('Ký số không thành công!');
        contextService.updateContext({
          ...contextRef.current,
          loading: false,
        });
      }
    } else {
      message.error('Ký số không thành công!');
      contextService.updateContext({
        ...contextRef.current,
        loading: false,
      });
    }
  };

  // Checker
  const rejectDigitalAccountant = async (reason) => {
    contextService.updateContext({
      ...contextRef.current,
      showRejectVisible: false,
      loading: true,
    });
    var dataForm = new FormData();
    dataForm.append('applicationOpeningLcId ', id);
    dataForm.append('reasonForRefusal ', reason);

    console.log('revert data:::', dataForm);
    var config = {
      method: 'post',
      url:
        process.env.REACT_APP_API_BACKEND +
        '/corporate/applicationOpeningLc/refuse',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('access_token') + '',
      },
      data: dataForm,
      timeout: TIME_OUT,
    };

    let response = await axios(config);
    if (response?.data?.code == 200 || response?.data?.code == 201) {
      console.log(response);
      await message.success('Từ chối thành công!');
      // closeRejectModal();
      setTimeout(() => {
        exitHandler(id);
      }, 1000);
    } else {
      //message.error('Từ chối thất bại!');
      console.log(response.data.message);
      message.error(response.data.message);
      contextService.updateContext({
        ...contextRef.current,
        showRejectVisible: true,
        loading: false,
      });
    }
  };

  const closeCertificateModal = async () => {
    contextService.updateContext({
      ...contextRef.current,
      showCertificateModal: false,
    });
  };

  const closeFormOTPModal = async () => {
    contextService.updateContext({
      ...contextRef.current,
      showFormOTPModal: false,
    });
  };

  const openRejectModal = async () => {
    contextService.updateContext({
      ...contextRef.current,
      showRejectVisible: true,
    });
  };

  const closeRejectModal = async () => {
    contextService.updateContext({
      ...contextRef.current,
      showRejectVisible: false,
    });
  };

  const closeCertificateDownloadModal = async () => {
    contextService.updateContext({
      ...contextRef.current,
      showCertificateDownloadModal: false,
    });
  };

  const toViewPage = async () => {
    history.push(`/cm-home/corporate-user-manage/view/${id}`);
  };

  const exitHandler = async () => {
    history.push(`/cm-home/lc-request-manage/view/${id}`);
  };

  const domainInterface = useRef({
    initDomain,
    submitAccountantSignDigital,
    signDigitalAccountant,
    closeFormOTPModal,

    openRejectModal,
    closeRejectModal,
    rejectDigitalAccountant,

    openCertificateModal,
    pickCertificateData,
    closeCertificateModal,
    closeCertificateDownloadModal,

    exitHandler,
    toViewPage,
  });
  return [context, domainInterface.current];
}

export default CM0708Domain;
