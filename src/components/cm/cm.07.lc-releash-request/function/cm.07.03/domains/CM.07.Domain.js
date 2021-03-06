import { useRef, useEffect } from 'react';
import { message } from 'antd';
import { useHistory } from 'react-router';
import CM07Service from '../services/CM.07Service';

var axios = require('axios');
export function CM1602Domain() {
  const history = useHistory();
  const [context, contextService] = CM07Service();
  const contextRef = useRef(context);

  useEffect(() => {
    contextRef.current = context;
  }, [context]);

  const initDomain = async () => {
    var contextData = {
      lcApplication: {
        contractType: '',
        contractTypeValue: '',
        contractCode: '',
        contractNumber: '',
        contractFileName: '',
        contractFileUrl: '',

        bankReleash: '',
        proposalCodeRelease: '',
        proposalDate: '',
        lcType: '',
        corporateBuy: '',
        corporateBuyAddress: '',
        corporateSell: '',
        corporateSellAddress: '',
        bankConfirm: '',
        bankConfirmAddress: '',
        bankTranfer: '',
        confirmationInstruction: '',
        confirmingBankRequest: '',
        bankIdConfirmRequest: '',

        //step 2
        moneyType: '',
        valueLc: '',
        negativeTolerance: '',
        positiveTolerance: '',
        termOfPayment: '',
        noteTermOfPayment: '',
        paymentAmount: '',
        dueDate: '',
        dueAddress: '',
        fee: '',
        presentationAt: '',
        bankIdPresentationAt: '',

        //step 3
        partialShipment: '',
        transhipment: '',
        placeOfReceipt: '',
        placeOfDestination: '',
        portOfDeparture: '',
        portOfDestination: '',
        lastestDeliveryDate: '',
        deliveryTime: '',
        deliveryTerm: '',
        descriptionOfGoods: '',
        typeOfGood: '',
        productsRequest: [],
        totalValueAfterVat: '',
        totalValueProduct: '',
        vatProduct: '',

        //step 4
        licenses: [],
        periodForPresentation: '',
        ttReimbursement: '',
        otherCondition: '',

        //step 5
        holdAccount: '',
        feeAccount: '',
        paymentAccount: '',
        commitmentCustomer: '',

        status: 0,
        reasonForRefusal: '',
      },
      deleteSuccessfulDialogVisible: false,
      loading: true,
      contractID: null,
      contractFileUrlContractType1: '',
      contractFileContractType1: '',
      cancelDialogVisible: false,
      goodTypeList: [],
    };
    await contextService.initContext(contextData);
    await initConstantList();
  };

  const initConstantList = async () => {
    getAllGoodTypes();
  };

  function convert(str) {
    var date = new Date(str),
      mnth = ('0' + (date.getMonth() + 1)).slice(-2),
      day = ('0' + date.getDate()).slice(-2);
    return [day, mnth, date.getFullYear()].join('/');
  }

  const getLCApplicationRequest = (id) => {
    getDetail(id);
  };

  function formatCash(str) {
    return str
      .split('')
      .reverse()
      .reduce((prev, next, index) => {
        return (index % 3 ? next : next + ',') + prev;
      });
  }

  const getContractIDByContractCode = async (contractCode) => {
    console.log(contractCode);
    var config = {
      method: 'get',
      url: process.env.REACT_APP_API_BACKEND + '/corporate/contract/getAll',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('access_token') + '',
        'Content-Type': 'application/json',
      },
    };

    let response = await axios(config);

    console.log(response.data.data);
    const contractIndex = response.data.data.findIndex(
      (element) => element.contractCode == contractCode,
    );

    console.log(response.data.data[contractIndex].contractId);
    getContractDetail(response.data.data[contractIndex].contractId);
  };

  const getContractDetail = async (id) => {
    var config = {
      method: 'get',
      url:
        process.env.REACT_APP_API_BACKEND +
        '/corporate/contract/getContract/' +
        id +
        '',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('access_token') + '',
      },
    };
    let response = await axios(config);
    console.log(response.data.data);
    contextService.updateContext({
      ...contextRef.current,
      contractFileUrlContractType1: response.data.data.urlMinio,
    });
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
    };

    let response = await axios(config);
    contextService.updateContext({
      ...contextRef.current,
      loading: false,
    });
    if (response.data.data == null || response.data.data == undefined) {
      message.error('Kh??ng c?? d??? li???u');
    } else {
      var tempObj = response.data.data;

      console.log(tempObj);

      var contractTypeText;

      switch (tempObj.contractType) {
        case 1:
          contractTypeText = 'K?? h???p ?????ng ??i???n t??? tr??n FPT L/C Platform';
          break;
        case 2:
          contractTypeText = 'Kh??ng k?? h???p ?????ng ??i???n t??? tr??n FPT L/C Platform';
          break;

        default:
          contractTypeText = '';
          break;
      }

      var lcTypeText;
      switch (tempObj.lcType) {
        case '1':
          lcTypeText = 'L/C th??ng th?????ng (kh??ng ph???i UPAS L/C)';
          break;
        case '2':
          lcTypeText = 'UPAS L/C';
          break;

        default:
          lcTypeText = '';
          break;
      }

      var confirmationInstructionText;
      switch (tempObj.confirmationInstruction) {
        case 0:
          confirmationInstructionText = 'Kh??ng x??c nh???n';
          break;
        case 1:
          confirmationInstructionText = 'X??c nh???n';
          break;
        case 2:
          confirmationInstructionText = 'C?? th??? x??c nh???n';
          break;
        default:
          confirmationInstructionText = '';
          break;
      }

      var confirmingBankRequestText;
      switch (tempObj.confirmingBankRequest) {
        case '0':
          confirmingBankRequestText = 'Ng??n h??ng b???t k???';
          break;
        case '1':
          confirmingBankRequestText = 'Theo ng??n h??ng c??? th???';
          break;

        default:
          confirmingBankRequestText = '';
          break;
      }

      var termOfPaymentText;
      switch (tempObj.termOfPayment) {
        case 1:
          termOfPaymentText = 'Tr??? ngay';
          break;
        case 2:
          termOfPaymentText = 'Tr??? ch???m';
          break;
        case 3:
          termOfPaymentText = 'Kh??c';
          break;
        default:
          termOfPaymentText = '';
          break;
      }

      var presentationAtText;

      switch (tempObj.presentationAt) {
        case '0':
          presentationAtText = 'Ng??n h??ng b???t k???';
          break;
        case '1':
          presentationAtText = 'Ng??n h??ng x??c nh???n';
          break;
        case 'other':
          presentationAtText = 'Ng??n h??ng kh??c';
          break;
        default:
          presentationAtText = '';
          break;
      }

      var partialShipmentText;
      switch (tempObj.partialShipment) {
        case true:
          partialShipmentText = 'Cho ph??p';
          break;
        case false:
          partialShipmentText = 'Kh??ng cho ph??p';
          break;
        default:
          partialShipmentText = '';
          break;
      }

      var transhipmentText;
      switch (tempObj.transhipment) {
        case true:
          transhipmentText = 'Cho ph??p';
          break;
        case false:
          transhipmentText = 'Kh??ng cho ph??p';
          break;
        default:
          transhipmentText = '';
          break;
      }

      var ttReimbursementText;
      switch (tempObj.ttReimbursement) {
        case true:
          ttReimbursementText = 'Cho ph??p';
          break;
        case false:
          ttReimbursementText = 'Kh??ng cho ph??p';
          break;
        default:
          ttReimbursementText = '';
          break;
      }

      var tempLicenseList = [];

      tempObj.contractLicenseResponses.forEach((element) => {
        const license = {
          licenseId: element.licenseResponse.licenseId,
          licenseName: element.licenseResponse.licenseName,
          licenseDescription: element.licenseDescription,
        };
        tempLicenseList.push(license);
      });

      console.log(contextRef.current.goodTypeList);

      let commodity = contextRef.current.goodTypeList.find(
        (o) => o.commoditiesId === ~~tempObj.product_type,
      );

      console.log(commodity);

      contextService.updateContext({
        ...contextRef.current,
        lcApplication: {
          ...contextRef.current.lcApplication,
          contractType: contractTypeText,
          contractTypeValue: tempObj.contractType,
          contractCode: tempObj?.contractCode,
          contractNumber: tempObj?.contractNumber,

          contractFileName: tempObj?.contractFile,
          contractFileUrl: tempObj?.urlViewContractFile,

          bankReleash: tempObj?.bankInfo?.bankName,
          proposalCodeRelease: tempObj?.proposalCodeRelease,
          lcType: lcTypeText,
          proposalDate: convert(tempObj?.proposalDate),
          corporateBuy: tempObj?.corporateBuy?.corporateName,
          corporateBuyAddress: tempObj?.corporateBuyAddress,
          corporateSell: tempObj?.corporateSell?.corporateName,
          corporateSellAddress: tempObj?.corporateSellAddress,
          bankConfirm: tempObj?.bankConfirm?.bankName,
          bankConfirmAddress: tempObj?.bankConfirm?.bankAddress,
          bankTranfer: tempObj?.bankTranfer?.bankName,
          confirmationInstruction: confirmationInstructionText,
          confirmingBankRequest: confirmingBankRequestText,
          bankIdConfirmRequest: tempObj?.bankConfirmRequest?.bankName,

          valueLc: formatCash(tempObj?.valueLc + '') + ' ' + tempObj?.moneyType,
          negativeTolerance: '-' + tempObj?.negativeTolerance + '%',
          positiveTolerance: '+' + tempObj?.positiveTolerance + '%',
          termOfPayment: termOfPaymentText,
          noteTermOfPayment: tempObj?.noteTermOfPayment,
          paymentAmount: tempObj?.paymentAmount,
          dueDate: convert(tempObj?.dueDate),
          dueAddress: tempObj?.dueAddress,
          fee: tempObj?.fee,
          presentationAt: presentationAtText,
          bankIdPresentationAt: tempObj?.bankPresentationAt?.bankName,

          partialShipment: partialShipmentText,
          transhipment: transhipmentText,
          placeOfReceipt: tempObj?.placeOfReceipt,
          placeOfDestination: tempObj?.placeOfDestination,
          portOfDeparture: tempObj?.portOfDeparture,
          portOfDestination: tempObj?.portOfDestination,
          lastestDeliveryDate:
            tempObj?.lastestDeliveryDate != null
              ? convert(tempObj?.lastestDeliveryDate)
              : '',
          deliveryTime: tempObj?.deliveryTime,
          descriptionOfGoods: tempObj?.descriptionOfGoods,
          productsRequest: tempObj?.products,
          typeOfGood: commodity?.commoditiesName,
          totalValueAfterVat:
            formatCash(tempObj?.totalValueAfterVat + '') +
            ' ' +
            tempObj?.moneyType,
          totalValueProduct:
            formatCash(tempObj?.totalValueProduct + '') +
            ' ' +
            tempObj?.moneyType,
          vatProduct: formatCash(tempObj?.vatProduct + '') + '%',

          licenses: tempLicenseList,
          periodForPresentation: tempObj?.periodForPresentation,
          ttReimbursement: ttReimbursementText,
          otherCondition: tempObj?.otherCondition,

          holdAccount: tempObj?.holdAccount?.corporateAccountNumber,
          feeAccount: tempObj?.feeAccount?.corporateAccountNumber,
          paymentAccount: tempObj?.paymentAccount?.corporateAccountNumber,
          commitmentCustomer: tempObj?.commitmentCustomer,

          status: tempObj?.status,
          reasonForRefusal: tempObj?.reasonForRefusal,
        },
      });

      if (tempObj.contractType == 1) {
        if (tempObj?.contractCode != '') {
          await getContractIDByContractCode(tempObj?.contractCode);
        } else {
          message.error('Kh??ng c?? m?? h???p ?????ng!');
        }
      }
    }
  };

  const cancelHandler = (id, lcType) => {
    if (lcType == '2') {
      message.error(
        '????? ngh??? ph??t h??nh L/C kh??ng ???????c h???y do ???? ch???p nh???n b??o gi?? t??? NHPH',
      );
    } else {
      console.log('Test Test');
      console.log(id);
      lcCancel(id);
    }
  };

  const exitHandler = () => {
    history.push(`/cm-home/lc-request-manage`);
  };

  const toEditPage = (id) => {
    history.push(`/cm-home/lc-request-manage/edit/${id}`);
  };

  const toCAPage = (id) => {
    history.push(`/cm-home/lc-request-manage/ca/${id}`);
  };

  const openCancelModal = () => {
    contextService.updateContext({
      ...contextRef.current,
      cancelDialogVisible: true,
    });
  };

  const closeCancelModal = () => {
    contextService.updateContext({
      ...contextRef.current,
      cancelDialogVisible: false,
    });
  };

  const lcCancel = async (id) => {
    var data = new FormData();
    data.append('applicationOpeningLcId', id);

    var config = {
      method: 'post',
      url:
        process.env.REACT_APP_API_BACKEND +
        '/corporate/applicationOpeningLc/cancel',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('access_token') + '',
      },
      data: data,
    };

    let response = await axios(config);
    console.log(response);
    if (response.data.code == 200) {
      message.success('H???y ????? ngh??? ph??t h??nh th??nh c??ng!');
      history.push(`/cm-home/lc-request-manage`);
      closeCancelModal();
    } else {
      message.error('H???y ????? ngh??? ph??t h??nh kh??ng h??nh th??nh c??ng!');
      closeCancelModal();
    }
  };

  const getAllGoodTypes = async () => {
    var config = {
      method: 'get',
      url: process.env.REACT_APP_API_BACKEND + '/admin/commodity/getAll',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('access_token') + '',
      },
    };
    let response = await axios(config);
    console.log(response.data.data);
    contextService.updateContext({
      ...contextRef.current,
      goodTypeList: response.data.data,
    });
  };

  const domainInterface = useRef({
    initDomain,
    exitHandler,
    toEditPage,
    toCAPage,
    getDetail,
    getLCApplicationRequest,
    cancelHandler,
    openCancelModal,
    closeCancelModal,
  });
  return [context, domainInterface.current];
}

export default CM1602Domain;
