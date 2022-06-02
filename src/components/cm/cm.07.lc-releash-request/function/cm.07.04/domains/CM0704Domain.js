import { useRef, useEffect } from 'react';
import { useHistory } from 'react-router';
import CM0702ContextService from '../services/CM.07Service';
import { useLocation } from 'react-router-dom';
import { message } from 'antd';
import { LC_STATUS, TIME_OUT } from 'core/common/Constant';
import moment from 'moment';
var axios = require('axios');
export function CM0704Domain() {
  const history = useHistory();
  const [context, contextService] = CM0702ContextService();
  const location = useLocation();
  const contextRef = useRef(context);

  useEffect(() => {
    contextRef.current = context;
  }, [context]);

  const initDomain = async (id) => {
    var contextData = {
      lcApplication: {
        id: null,
        contractType: null,
        contractCode: null,
        contractNumber: null,
        contractFileName: null,
        contractFileUrl: null,

        bankReleash: null,
        proposalCodeRelease: null,
        proposalDate: null,
        lcType: null,

        corporateBuyID: null,
        corporateBuy: null,
        corporateBuyAddress: null,
        corporateSellId: null,
        corporateSell: null,
        corporateSellAddress: null,

        bankConfirm: null,
        bankConfirmAddress: null,
        bankTranfer: null,
        confirmationInstruction: null,
        confirmingBankRequest: null,
        bankIdConfirmRequest: null,

        //step 2
        moneyType: null,
        valueLc: null,
        negativeTolerance: null,
        positiveTolerance: null,
        termOfPayment: null,
        noteTermOfPayment: null,
        paymentAmount: null,
        dueDate: null,
        dueAddress: null,
        fee: null,
        presentationAt: null,
        bankIdPresentationAt: null,

        //step 3
        partialShipment: null,
        transhipment: null,
        placeOfReceipt: null,
        placeOfDestination: null,
        portOfDeparture: null,
        portOfDestination: null,
        lastestDeliveryDate: null,
        deliveryTime: null,
        deliveryTerm: null,
        descriptionOfGoods: null,
        typeOfGood: null,

        totalValueProduct: null,
        vatProduct: null,
        totalValueAfterVat: null,

        totalValueProductContractType1: null,
        vatProductContractType1: null,
        totalValueAfterVatContractType1: null,

        productsRequest: [],
        productsRequestContractType1: [],

        //step 4
        licenses: [],
        licensesContractType1: [],

        periodForPresentation: null,
        ttReimbursement: null,
        otherCondition: null,

        //step 5
        holdAccount: null,
        feeAccount: null,
        paymentAccount: null,
        commitmentCustomer: null,

        status: 0,
        reasonForRefusal: null,
      },
      uploadFileContract: {
        selectedContract: null,
        isContractPicked: false,
        selectedContractURL: '',
      },
      constantValue: {
        contractList: [],
        releashBankList: [],
        confirmBankList: [],
        bankTranferList: [],
        corporateList: [],
        licensesList: [],
        goodTypeList: [],
        currencyList: [],

        listCorporateHoldAccount: [],
        listCorporateFeeAccount: [],
        listCorporatePurchaseAccount: [],
      },
      onlyForDisplay: {
        lcType: '',
        corporateBuy: '',
        corporateBuyAddress: '',
        corporateSell: '',
        corporateSellAddress: '',

        //step 3
        typeOfGood: '',
      },
      initLCType: '',
      loading: true,
    };
    console.log('init domain');
    await contextService.initContext(contextData);
    console.log('get data');
    await getContractList();
    await getAllCorporate();
    await getBankList();
    await getAllLicenses();
    await getAllGoodTypes();
    await getCurrencyOptions();
    await getCorporateAccountByCorporateID();
    await getCorporateByID();
    await getLCApplicationRequest(id);
    await setSpinnerStatus();
  };

  function convert(str) {
    var date = new Date(str),
      mnth = ('0' + (date.getMonth() + 1)).slice(-2),
      day = ('0' + date.getDate()).slice(-2);
    return [day, mnth, date.getFullYear()].join('/');
  }

  function convert2(str) {
    var date = new Date(str),
      mnth = ('0' + (date.getMonth() + 1)).slice(-2),
      day = ('0' + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join('-');
  }

  //--------Code mới---------//

  const getAllGoodTypes = async () => {
    var config = {
      method: 'get',
      url: process.env.REACT_APP_API_BACKEND + '/admin/commodity/getAll',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('access_token') + '',
      },
      timeout: TIME_OUT,
    };
    let response = await axios(config);
    console.log('Good type');
    console.log(response.data.data);
    contextService.updateContext({
      ...contextRef.current,
      constantValue: {
        ...contextRef.current.constantValue,
        goodTypeList: response.data.data,
      },
    });
  };

  const getCurrencyOptions = async () => {
    var data = [];
    var config = {
      method: 'get',
      url: process.env.REACT_APP_API_BACKEND + '/data/currency/getAll',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('access_token') + '',
        'Content-Type': 'application/json',
      },
      timeout: TIME_OUT,
    };
    let response = await axios(config);
    if (response?.data?.code == 200) {
      data = response?.data?.data;
      console.log('getCurrencyOptions', data);
      contextService.updateContext({
        ...contextRef.current,
        constantValue: {
          ...contextRef.current.constantValue,
          currencyList: response.data.data,
        },
      });
    }
  };

  const getLCApplicationRequest = (id) => {
    getDetail(id);
  };

  const setSpinnerStatus = () => {
    contextService.updateContext({
      ...contextRef.current,

      loading: false,
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
      timeout: TIME_OUT,
    };

    let response = await axios(config);

    if (response.data.data == null || response.data.data == undefined) {
      message.error('Không có dữ liệu');
    } else {
      var tempObj = response.data.data;
      console.log(tempObj);
      //----------------------------------------//
      console.log(tempObj.contractLicenseResponses);
      var tempLicenseList = [];

      if (tempObj.contractLicenseResponses.length > 0) {
        tempObj.contractLicenseResponses.forEach((element, index) => {
          var license = {
            key: index,
            licenseId: element.licenseResponse.licenseId,
            licenseName: element.licenseResponse.licenseName,
            licenseDescription: element.licenseDescription,
            contractLicenseId: element.contractLicenseId,
            contractId: element?.contractResponse?.contractId,
            isOtherLicense: false,
          };
          tempLicenseList.push(license);
        });
      } else {
        tempLicenseList = [];
      }

      console.log('Danh sách chứng từ');
      console.log(tempLicenseList);

      console.log('Danh sách hàng hóa');
      console.log(tempObj.products);
      var tempProductList = [];
      if (tempObj.products.length > 0) {
        tempObj.products.forEach((element, index) => {
          var product = {
            key: index,
            id: element.id,
            commodity: element.commodity,
            origin: element.origin,
            amount: element.amount,
            unit: element.unit,
            unitPrice: element.unitPrice,
            intoMoney: element.intoMoney,
          };

          tempProductList.push(product);
        });
      } else {
        tempProductList = [];
      }

      if (tempObj.contractType == 2) {
        contextService.updateContext({
          ...contextRef.current,
          lcApplication: {
            ...contextRef.current.lcApplication,
            id: id,
            contractType: tempObj.contractType,
            contractCode: tempObj?.contractCode,
            contractNumber: tempObj?.contractNumber,
            contractFileName: tempObj?.contractFile,
            contractFileUrl: tempObj?.urlViewContractFile,
            bankReleash: tempObj?.bankInfo?.bankId,
            proposalCodeRelease: tempObj?.proposalCodeRelease,
            lcType: tempObj?.lcType,
            proposalDate: tempObj?.proposalDate,

            corporateBuyId: tempObj?.corporateBuy?.corporateId,
            corporateBuy: tempObj?.corporateBuy?.corporateName,
            corporateBuyAddress: tempObj?.corporateBuyAddress,
            corporateSellId: tempObj?.corporateSell?.corporateId,
            corporateSell: tempObj?.corporateSell?.corporateName,
            corporateSellAddress: tempObj?.corporateSellAddress,

            bankConfirm: tempObj?.bankConfirm?.bankId,
            bankConfirmAddress: tempObj?.bankConfirmAddress,
            bankTranfer: tempObj?.bankTranfer?.bankId,
            confirmationInstruction: tempObj?.confirmationInstruction,
            confirmingBankRequest: tempObj?.confirmingBankRequest,
            bankIdConfirmRequest: tempObj?.bankConfirmRequest?.bankId,

            valueLc: tempObj?.valueLc,
            moneyType: tempObj?.moneyType,
            negativeTolerance: tempObj?.negativeTolerance,
            positiveTolerance: tempObj?.positiveTolerance,
            termOfPayment: tempObj?.termOfPayment,
            noteTermOfPayment: tempObj?.noteTermOfPayment,
            paymentAmount: tempObj?.paymentAmount,
            dueDate: tempObj?.dueDate,
            dueAddress: tempObj?.dueAddress,
            fee: tempObj?.fee,
            presentationAt: parseInt(tempObj.presentationAt),
            bankIdPresentationAt: tempObj?.bankPresentationAt?.bankId,

            partialShipment: tempObj.transhipment,
            transhipment: tempObj.transhipment,
            placeOfReceipt: tempObj?.placeOfReceipt,
            placeOfDestination: tempObj?.placeOfDestination,
            portOfDeparture: tempObj?.portOfDeparture,
            portOfDestination: tempObj?.portOfDestination,
            lastestDeliveryDate: tempObj?.lastestDeliveryDate,
            deliveryTime: tempObj?.deliveryTime,
            descriptionOfGoods: tempObj?.descriptionOfGoods,
            productsRequest: tempProductList,
            typeOfGood: ~~tempObj?.product_type,

            totalValueProduct: tempObj?.totalValueProduct,
            vatProduct: tempObj?.vatProduct,
            totalValueAfterVat: tempObj?.totalValueAfterVat,
            totalValueProductContractType1: tempObj?.totalValueProduct,
            vatProductContractType1: tempObj?.vatProduct,
            totalValueAfterVatContractType1: tempObj?.totalValueAfterVat,

            licenses: tempLicenseList,
            periodForPresentation: tempObj?.periodForPresentation,
            ttReimbursement: tempObj.ttReimbursement,
            otherCondition: tempObj?.otherCondition,

            holdAccount: tempObj?.holdAccount?.corporateAccountId,
            feeAccount: tempObj?.feeAccount?.corporateAccountId,
            paymentAccount: tempObj?.paymentAccount?.corporateAccountId,
            commitmentCustomer: tempObj?.commitmentCustomer,

            status: tempObj?.status,
            reasonForRefusal: tempObj?.reasonForRefusal,
          },
          initLCType: tempObj?.lcType,
        });
      } else {
        console.log('Loại hợp đồng 1');

        var tempLCTypeName = '';

        switch (tempObj.lcType) {
          case 1:
            tempLCTypeName = 'L/C thông thường';
            break;
          case 2:
            tempLCTypeName = 'UPAS L/C';
            break;
          default:
            tempLCTypeName = '';
            break;
        }

        contextService.updateContext({
          ...contextRef.current,
          lcApplication: {
            ...contextRef.current.lcApplication,
            id: id,
            contractType: tempObj.contractType,
            contractCode: tempObj?.contractCode,
            contractNumber: tempObj?.contractNumber,
            contractFileName: tempObj?.contractFile,
            contractFileUrl: tempObj?.urlViewContractFile,
            bankReleash: tempObj?.bankInfo?.bankId,
            proposalCodeRelease: tempObj?.proposalCodeRelease,
            lcType: tempObj?.lcType,
            proposalDate: tempObj?.proposalDate,

            corporateBuyId: tempObj?.corporateBuy?.corporateId,
            corporateBuy: tempObj?.corporateBuy?.corporateName,
            corporateBuyAddress: tempObj?.corporateBuyAddress,
            corporateSellId: tempObj?.corporateSell?.corporateId,
            corporateSell: tempObj?.corporateSell?.corporateName,
            corporateSellAddress: tempObj?.corporateSellAddress,

            bankConfirm: tempObj?.bankConfirm?.bankId,
            bankConfirmAddress: tempObj?.bankConfirmAddress,
            bankTranfer: tempObj?.bankTranfer?.bankId,
            confirmationInstruction: tempObj?.confirmationInstruction,
            confirmingBankRequest: tempObj?.confirmingBankRequest,
            bankIdConfirmRequest: tempObj?.bankConfirmRequest?.bankId,

            valueLc: tempObj?.valueLc,
            moneyType: tempObj?.moneyType,
            negativeTolerance: tempObj?.negativeTolerance,
            positiveTolerance: tempObj?.positiveTolerance,
            termOfPayment: tempObj?.termOfPayment,
            noteTermOfPayment: tempObj?.noteTermOfPayment,
            paymentAmount: tempObj?.paymentAmount,
            dueDate: tempObj?.dueDate,
            dueAddress: tempObj?.dueAddress,
            fee: tempObj?.fee,
            presentationAt: parseInt(tempObj.presentationAt),
            bankIdPresentationAt: tempObj?.bankPresentationAt?.bankId,

            partialShipment: tempObj.transhipment,
            transhipment: tempObj.transhipment,
            placeOfReceipt: tempObj?.placeOfReceipt,
            placeOfDestination: tempObj?.placeOfDestination,
            portOfDeparture: tempObj?.portOfDeparture,
            portOfDestination: tempObj?.portOfDestination,
            lastestDeliveryDate: tempObj?.lastestDeliveryDate,
            deliveryTime: tempObj?.deliveryTime,
            descriptionOfGoods: tempObj?.descriptionOfGoods,
            productsRequest: tempProductList,
            typeOfGood: ~~tempObj?.product_type,

            // totalValueProductContractType1: '',
            // vatProductContractType1: '',
            // totalValueAfterVatContractType1: '',

            totalValueProductContractType1: tempObj?.totalValueProduct,
            vatProductContractType1: tempObj?.vatProduct,
            totalValueAfterVatContractType1: tempObj?.totalValueAfterVat,
            totalValueProduct: tempObj?.totalValueProduct,
            vatProduct: tempObj?.vatProduct,
            totalValueAfterVat: tempObj?.totalValueAfterVat,

            licenses: tempLicenseList,
            periodForPresentation: tempObj?.periodForPresentation,
            ttReimbursement: tempObj.ttReimbursement,
            otherCondition: tempObj?.otherCondition,

            holdAccount: tempObj?.holdAccount?.corporateAccountId,
            feeAccount: tempObj?.feeAccount?.corporateAccountId,
            paymentAccount: tempObj?.paymentAccount?.corporateAccountId,
            commitmentCustomer: tempObj?.commitmentCustomer,

            status: tempObj?.status,
            reasonForRefusal: tempObj?.reasonForRefusal,
          },
          onlyForDisplay: {
            ...contextRef.current.onlyForDisplay,

            lcType: tempLCTypeName,
            corporateBuy: tempObj?.corporateBuy?.corporateName,
            corporateBuyAddress: tempObj?.corporateBuyAddress,
            corporateSell: tempObj?.corporateSell?.corporateName,
            corporateSellAddress: tempObj?.corporateSellAddress,
          },
          initLCType: tempObj?.lcType,
        });
      }
    }
  };

  const getContractList = async () => {
    console.log('Thằng này chạy đầu tiên');
    var config = {
      method: 'get',
      url: process.env.REACT_APP_API_BACKEND + '/corporate/contract/getAll',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.access_token + '',
      },
      timeout: TIME_OUT,
    };

    let response = await axios(config);
    console.log(response.data.data);

    var tempContractList = [];
    if (response.data.data.length > 0) {
      response.data.data.forEach((element) => {
        if (
          element.status == 7 &&
          element.buyerCorporate.corporateId == localStorage.corporateId
        ) {
          tempContractList.push(element);
        }
      });
    } else {
      tempContractList = [];
    }

    contextService.updateContext({
      ...contextRef.current,
      constantValue: {
        ...contextRef.current.constantValue,
        contractList: tempContractList,
      },
    });
  };

  const getBankList = async () => {
    var config = {
      method: 'get',
      url: process.env.REACT_APP_API_BACKEND + '/bank/bankinfo/getAll',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.access_token + '',
      },
    };

    let response = await axios(config);
    console.log(response.data.data);
    contextService.updateContext({
      ...contextRef.current,
      constantValue: {
        ...contextRef.current.constantValue,
        releashBankList: response.data.data,
        confirmBankList: response.data.data,
        bankTranferList: response.data.data,
      },
    });
  };

  //-----------SET INPUT VALUE------------//

  const onContractTypeChange = (e) => {
    console.log('contextRef.current.lcApplication');
    console.log(contextRef.current.lcApplication);

    contextService.updateContext({
      ...contextRef.current,
      lcApplication: {
        ...contextRef.current.lcApplication,
        contractType: e,
      },
    });
  };

  const onContractCodeChange = (e) => {
    console.log('-------Input value-------');
    console.log(contextRef.current.constantValue.contractList[e]);
    getContractDetail(
      contextRef.current.constantValue.contractList[e].contractId,
    );
  };

  const onContractNumberChange = (e) => {
    console.log('-------Input value-------');
    console.log(e);
    contextService.updateContext({
      ...contextRef.current,
      lcApplication: {
        ...contextRef.current.lcApplication,
        contractNumber: e.target.value,
      },
    });
  };

  const onAttachedContractChangeHandler = (event) => {
    const fileSize = event.target.files[0].size / 1024 / 1024; // in MiB
    if (fileSize > 20) {
      message.error(
        'File vượt quá dung lượng cho phép. Vui lòng chọn file có dung lượng dưới 20MB',
      );
    } else {
      contextService.updateContext({
        ...contextRef.current,
        lcApplication: {
          ...contextRef.current.lcApplication,
          contractFileName: event.target.files[0],
        },
        uploadFileContract: {
          ...contextRef.current.uploadFileContract,
          selectedContract: event.target.files[0],
          isContractPicked: true,
        },
      });
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        contextService.updateContext({
          ...contextRef.current,
          uploadFileContract: {
            ...contextRef.current.uploadFileContract,
            selectedContractURL: reader.result,
          },
        });
      });
      if (event.target.files[0] != undefined && event.target.files[0] != null) {
        reader.readAsDataURL(event.target.files[0]);
      }
    }
  };

  const onReleasheBankChange = (e) => {
    console.log('-------Input value-------');
    console.log(e);
    contextService.updateContext({
      ...contextRef.current,
      lcApplication: {
        ...contextRef.current.lcApplication,
        bankReleash: e,
      },
    });
  };

  const onProposalDateChange = (e) => {
    console.log('-------Input value-------');

    if (e != null) {
      contextService.updateContext({
        ...contextRef.current,
        lcApplication: {
          ...contextRef.current.lcApplication,
          proposalDate: e._d,
        },
      });
    }
  };

  const onLCTypeChange = (e) => {
    console.log('-------Input value-------');
    console.log(e);
    contextService.updateContext({
      ...contextRef.current,
      lcApplication: {
        ...contextRef.current.lcApplication,
        lcType: e,
      },
    });
  };

  const onCorporateSellChange = (e) => {
    console.log('-------Input value-------');
    console.log(e);
    var index = contextRef.current.constantValue.corporateList.findIndex(
      function (element) {
        return element.corporateId == e;
      },
    );
    contextService.updateContext({
      ...contextRef.current,
      lcApplication: {
        ...contextRef.current.lcApplication,
        corporateSellId: e,
        corporateSellAddress:
          contextRef.current.constantValue.corporateList[index]
            .corporateAddress,
      },
    });
  };

  const onCorporateBuyAddressChange = (e) => {
    console.log('-------Input value-------');
    console.log(e);
    contextService.updateContext({
      ...contextRef.current,
      lcApplication: {
        ...contextRef.current.lcApplication,
        corporateBuyAddress: e.target.value,
      },
    });
  };

  const onCorporateSellAddressChange = (e) => {
    console.log('-------Input value-------');
    console.log(e);
    contextService.updateContext({
      ...contextRef.current,
      lcApplication: {
        ...contextRef.current.lcApplication,
        corporateSellAddress: e.target.value,
      },
    });
  };

  const onAnnoucerBankChange = (e) => {
    console.log('-------Input value-------');
    console.log(e);
    contextService.updateContext({
      ...contextRef.current,
      lcApplication: {
        ...contextRef.current.lcApplication,
        bankConfirm: contextRef.current.constantValue.confirmBankList[e].bankId,
        bankConfirmAddress:
          contextRef.current.constantValue.confirmBankList[e].bankAddress,
      },
    });
  };

  const onAnnoucerBankAddressChange = (e) => {
    console.log('-------Input value-------');
    console.log(e);
    contextService.updateContext({
      ...contextRef.current,
      lcApplication: {
        ...contextRef.current.lcApplication,
        bankConfirmAddress: e.target.value,
      },
    });
  };

  const onTranferBankChange = (e) => {
    console.log('-------Input value-------');
    console.log(e);
    contextService.updateContext({
      ...contextRef.current,
      lcApplication: {
        ...contextRef.current.lcApplication,
        bankTranfer: e,
      },
    });
  };

  const onConfirmationInstructionChange = (e) => {
    console.log('-------Input value-------');
    console.log(e);
    contextService.updateContext({
      ...contextRef.current,
      lcApplication: {
        ...contextRef.current.lcApplication,
        confirmationInstruction: e.target.value,
      },
    });
  };

  const onConfirmingBankRequestChange = (e) => {
    console.log('-------Input value-------');
    console.log(e);
    contextService.updateContext({
      ...contextRef.current,
      lcApplication: {
        ...contextRef.current.lcApplication,
        confirmingBankRequest: e.target.value,
      },
    });
  };

  const onOtherConfirmingBankChange = (e) => {
    console.log('-------Input value-------');
    console.log(e);
    contextService.updateContext({
      ...contextRef.current,
      lcApplication: {
        ...contextRef.current.lcApplication,
        bankIdConfirmRequest: e,
      },
    });
  };

  //----------------------------------//

  //step 2
  const onMoneyTypeChange = (e) => {
    console.log('-------Input value-------');
    console.log(e);
    contextService.updateContext({
      ...contextRef.current,
      lcApplication: {
        ...contextRef.current.lcApplication,
        moneyType: e,
      },
    });
  };

  const onValueLcChange = (e) => {
    console.log('-------Input value-------');
    console.log(e);
    contextService.updateContext({
      ...contextRef.current,
      lcApplication: {
        ...contextRef.current.lcApplication,
        valueLc: e,
      },
    });
  };

  const onNegativeToleranceChange = (e) => {
    console.log('-------Input value-------');
    console.log(e.target.value);
    contextService.updateContext({
      ...contextRef.current,
      lcApplication: {
        ...contextRef.current.lcApplication,
        negativeTolerance: ~~e.target.value,
      },
    });
  };

  const onPositiveToleranceChange = (e) => {
    console.log('-------Input value-------');
    console.log(e.target.value);
    contextService.updateContext({
      ...contextRef.current,
      lcApplication: {
        ...contextRef.current.lcApplication,
        positiveTolerance: ~~e.target.value,
      },
    });
  };

  const onPresentationAtChange = (e) => {
    console.log('-------Input value-------');
    console.log(e);
    contextService.updateContext({
      ...contextRef.current,
      lcApplication: {
        ...contextRef.current.lcApplication,
        presentationAt: e.target.value,
      },
    });
  };

  //on change 'Chọn NH sẽ xuất trình chứng từ'//
  const onBankPresentationAtChange = (e) => {
    console.log('-------Input value-------');
    console.log(e);
    contextService.updateContext({
      ...contextRef.current,
      lcApplication: {
        ...contextRef.current.lcApplication,
        bankIdPresentationAt: e,
      },
    });
  };
  //----------------------------------//

  const onTermOfPaymentChange = (e) => {
    console.log('-------Input value-------');
    console.log(e);
    contextService.updateContext({
      ...contextRef.current,
      lcApplication: {
        ...contextRef.current.lcApplication,
        termOfPayment: e.target.value,
      },
    });
  };

  const onNoteTermOfPaymentChange = (e) => {
    console.log('-------Input value-------');
    console.log(e);
    contextService.updateContext({
      ...contextRef.current,
      lcApplication: {
        ...contextRef.current.lcApplication,
        noteTermOfPayment: e.target.value,
      },
    });
  };

  const onPaymentAmountChange = (e) => {
    console.log('-------Input value-------');
    console.log(e);
    contextService.updateContext({
      ...contextRef.current,
      lcApplication: {
        ...contextRef.current.lcApplication,
        paymentAmount: e.target.value,
      },
    });
  };

  const onDueDateChange = (e) => {
    console.log('-------Input value-------');
    console.log(e);
    contextService.updateContext({
      ...contextRef.current,
      lcApplication: {
        ...contextRef.current.lcApplication,
        dueDate: e._d,
      },
    });
  };

  const onDueAddressChange = (e) => {
    console.log('-------Input value-------');
    console.log(e);
    contextService.updateContext({
      ...contextRef.current,
      lcApplication: {
        ...contextRef.current.lcApplication,
        dueAddress: e.target.value,
      },
    });
  };

  const onFeeChange = (e) => {
    console.log('-------Input value-------');
    console.log(e);
    contextService.updateContext({
      ...contextRef.current,
      lcApplication: {
        ...contextRef.current.lcApplication,
        fee: e.target.value,
      },
    });
  };

  //step 3
  // productsRequest: [],

  const setProductsRequestList = (dataList) => {
    console.log('Data list user test!!!');
    console.log(dataList);
    let totalBeforeVAT = 0;
    dataList.forEach((element) => {
      totalBeforeVAT += element.intoMoney;
    });

    let tempTotalValueAfterVat =
      totalBeforeVAT +
      totalBeforeVAT * (contextRef.current.lcApplication.vatProduct / 100);

    contextService.updateContext({
      ...contextRef.current,
      lcApplication: {
        ...contextRef.current.lcApplication,
        productsRequest: dataList,
        totalValueProduct: totalBeforeVAT,
        totalValueAfterVat: tempTotalValueAfterVat,
      },
    });
  };

  const onPartialShipmentChange = (e) => {
    console.log('-------Input value-------');
    console.log(e);
    contextService.updateContext({
      ...contextRef.current,
      lcApplication: {
        ...contextRef.current.lcApplication,
        partialShipment: e.target.value,
      },
    });
  };

  const onTranshipmentChange = (e) => {
    console.log('-------Input value-------');
    console.log(e);
    contextService.updateContext({
      ...contextRef.current,
      lcApplication: {
        ...contextRef.current.lcApplication,
        transhipment: e.target.value,
      },
    });
  };

  const onPlaceOfReceiptChange = (e) => {
    console.log('-------Input value-------');
    console.log(e);
    contextService.updateContext({
      ...contextRef.current,
      lcApplication: {
        ...contextRef.current.lcApplication,
        placeOfReceipt: e.target.value,
      },
    });
  };

  const onPlaceOfDestinationChange = (e) => {
    console.log('-------Input value-------');
    console.log(e);
    contextService.updateContext({
      ...contextRef.current,
      lcApplication: {
        ...contextRef.current.lcApplication,
        placeOfDestination: e.target.value,
      },
    });
  };

  const onPortOfDepartureChange = (e) => {
    console.log('-------Input value-------');
    console.log(e);
    contextService.updateContext({
      ...contextRef.current,
      lcApplication: {
        ...contextRef.current.lcApplication,
        portOfDeparture: e.target.value,
      },
    });
  };

  const onPortOfDestinationChange = (e) => {
    console.log('-------Input value-------');
    console.log(e);
    contextService.updateContext({
      ...contextRef.current,
      lcApplication: {
        ...contextRef.current.lcApplication,
        portOfDestination: e.target.value,
      },
    });
  };

  const onLastestDeliveryDateChange = (e) => {
    console.log('-------Input value-------');
    console.log(e);
    if (e != null) {
      contextService.updateContext({
        ...contextRef.current,
        lcApplication: {
          ...contextRef.current.lcApplication,
          lastestDeliveryDate: e._d,
        },
      });
    }
  };

  const onDeliveryTimeChange = (e) => {
    console.log('-------Input value-------');
    console.log(e);
    if (e != null) {
      contextService.updateContext({
        ...contextRef.current,
        lcApplication: {
          ...contextRef.current.lcApplication,
          deliveryTime: e.target.value,
        },
      });
    }
  };

  const onGoodTypeChange = (e) => {
    console.log(e);
    contextService.updateContext({
      ...contextRef.current,
      lcApplication: {
        ...contextRef.current.lcApplication,
        typeOfGood: e,
      },
    });
  };

  const onDescriptionOfGoodsChange = (e) => {
    console.log('-------Input value-------');
    console.log(e);
    contextService.updateContext({
      ...contextRef.current,
      lcApplication: {
        ...contextRef.current.lcApplication,
        descriptionOfGoods: e.target.value,
      },
    });
  };

  const onDeliveryTermChange = (e) => {
    console.log('-------Input value-------');
    console.log(e);
    contextService.updateContext({
      ...contextRef.current,
      lcApplication: {
        ...contextRef.current.lcApplication,
        deliveryTerm: e.target.value,
      },
    });
  };

  const onTotalValueAfterVatChange = (e) => {
    console.log('-------Input value-------');
    console.log(e);
    contextService.updateContext({
      ...contextRef.current,
      lcApplication: {
        ...contextRef.current.lcApplication,
        totalValueAfterVat: e,
      },
    });
  };

  const onVatProductChange = (e) => {
    console.log('-------Input value-------');
    console.log(e);
    let tempTotalValueAfterVat =
      contextRef.current.lcApplication.totalValueProduct +
      contextRef.current.lcApplication.totalValueProduct * (e / 100);
    contextService.updateContext({
      ...contextRef.current,
      lcApplication: {
        ...contextRef.current.lcApplication,
        vatProduct: e,
        totalValueAfterVat: tempTotalValueAfterVat,
      },
    });
  };

  const onTotalValueAfterVatContractType1Change = (e) => {
    console.log('-------Input value-------');
    console.log(e);
    contextService.updateContext({
      ...contextRef.current,
      lcRequest: {
        ...contextRef.current.lcApplication,
        totalValueAfterVatContractType1: e,
      },
    });
  };
  //step 4
  // licenses: [],
  const setLicensesList = (dataList) => {
    console.log('Data list licenses test!!!');
    console.log(dataList);
    contextService.updateContext({
      ...contextRef.current,
      lcApplication: {
        ...contextRef.current.lcApplication,
        licenses: dataList,
      },
    });
  };
  const onPeriodForPresentationChange = (e) => {
    console.log('-------Input value-------');
    console.log(e);
    contextService.updateContext({
      ...contextRef.current,
      lcApplication: {
        ...contextRef.current.lcApplication,
        periodForPresentation: e.target.value,
      },
    });
  };

  const onTtReimbursementChange = (e) => {
    console.log('-------Input value-------');
    console.log(e);
    contextService.updateContext({
      ...contextRef.current,
      lcApplication: {
        ...contextRef.current.lcApplication,
        ttReimbursement: e.target.value,
      },
    });
  };

  const onOtherConditionChange = (e) => {
    console.log('-------Input value-------');
    console.log(e);
    contextService.updateContext({
      ...contextRef.current,
      lcApplication: {
        ...contextRef.current.lcApplication,
        otherCondition: e.target.value,
      },
    });
  };

  //step 5

  const onHoldAccountChange = (e) => {
    console.log('-------Input value-------');
    console.log(e);
    contextService.updateContext({
      ...contextRef.current,
      lcApplication: {
        ...contextRef.current.lcApplication,
        holdAccount: e,
      },
    });
  };

  const onFeeAccountChange = (e) => {
    console.log('-------Input value-------');
    console.log(e);
    contextService.updateContext({
      ...contextRef.current,
      lcApplication: {
        ...contextRef.current.lcApplication,
        feeAccount: e,
      },
    });
  };

  const onPaymentAccountChange = (e) => {
    console.log('-------Input value-------');
    console.log(e);
    contextService.updateContext({
      ...contextRef.current,
      lcApplication: {
        ...contextRef.current.lcApplication,
        paymentAccount: e,
      },
    });
  };

  const onCommitmentCustomerChange = (e) => {
    console.log('-------Input value-------');
    console.log(e);
    contextService.updateContext({
      ...contextRef.current,
      lcApplication: {
        ...contextRef.current.lcApplication,
        commitmentCustomer: e.target.value,
      },
    });
  };

  //-------------------------------------//

  //------------------------//

  const getAllCorporate = async () => {
    var config = {
      method: 'get',
      url: process.env.REACT_APP_API_BACKEND + '/corporate/getAll',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.access_token + '',
        'Content-Type': 'application/json',
      },
    };
    let response = await axios(config);
    console.log(response.data.data);
    contextService.updateContext({
      ...contextRef.current,
      constantValue: {
        ...contextRef.current.constantValue,
        corporateList: response.data.data,
      },
    });
    // return response;
  };

  const getCorporateByID = async () => {
    var config = {
      method: 'get',
      url:
        process.env.REACT_APP_API_BACKEND +
        '/corporate/get/' +
        localStorage.corporateId +
        '',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.access_token + '',
        'Content-Type': 'application/json',
      },
    };

    let response = await axios(config);
    console.log(response.data.data);
    contextService.updateContext({
      ...contextRef.current,
      lcApplication: {
        ...contextRef.current.lcApplication,
        corporateBuy: response.data.data.corporateId,
        corporateBuyAddress: response.data.data.corporateAddress,
      },
      onlyForDisplay: {
        ...contextRef.current.onlyForDisplay,
        corporateBuy: response.data.data.corporateName,
      },
    });
    return response;
  };

  const getAllLicenses = async () => {
    var config = {
      method: 'get',
      url: process.env.REACT_APP_API_BACKEND + '/admin/license/getAll',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.access_token + '',
        'Content-Type': 'application/json',
      },
    };

    let response = await axios(config);
    console.log(response.data.data);
    // licensesList
    var tempArr = [];
    for (let index = 0; index < response.data.data.length; index++) {
      var element = {
        value: response.data.data[index].licenseId,
        name: response.data.data[index].licenseName,
      };
      tempArr.push(element);
    }
    tempArr.push({
      value: 'other',
      name: 'Khác',
    });
    console.log('-----List Licenses-----');
    console.log(tempArr);
    contextService.updateContext({
      ...contextRef.current,
      constantValue: {
        ...contextRef.current.constantValue,
        licensesList: tempArr,
      },
    });
  };

  const getCorporateAccountByCorporateID = async () => {
    var config = {
      method: 'get',
      url:
        process.env.REACT_APP_API_BACKEND +
        '/corporate/getCorporateAccount/' +
        localStorage.corporateId +
        '',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.access_token + '',
        'Content-Type': 'application/json',
      },
    };

    let response = await axios(config);
    console.log(response.data.data);

    var tempHoldAccountList = [];
    var tempPaymentAccountList = [];
    var tempFeeAccountList = [];

    response.data.data.forEach((element) => {
      if (element.corporateAccountType == 'holding-account') {
        tempHoldAccountList.push(element);
      } else if (element.corporateAccountType == 'payment-account') {
        tempPaymentAccountList.push(element);
      } else {
        tempFeeAccountList.push(element);
      }
    });

    contextService.updateContext({
      ...contextRef.current,
      constantValue: {
        ...contextRef.current.constantValue,
        listCorporateHoldAccount: tempHoldAccountList,
        listCorporateFeeAccount: tempFeeAccountList,
        listCorporatePurchaseAccount: tempPaymentAccountList,
      },
    });
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
    console.log('data');
    console.log(response.data.data);
    var tempArr =
      response.data.data.listContractLicenses != null
        ? response.data.data.listContractLicenses
        : [];
    var tempContractLicenseList = [];
    if (tempArr.length > 0) {
      for (let index = 0; index < tempArr.length; index++) {
        const element = {
          contractLicenseId: tempArr[index].contractLicenseId,
          licenseRequest: {
            licenseId: tempArr[index].licenseResponse.licenseId,
            licenseName: tempArr[index].licenseResponse.licenseName,
          },
          licenseDescription: tempArr[index].licenseDescription,
        };
        tempContractLicenseList.push(element);
      }
    } else {
      tempContractLicenseList = [];
    }

    var tempProductList = response.data.data.products;
    var temptotalValue = 0;
    for (let index = 0; index < tempProductList.length; index++) {
      temptotalValue += tempProductList[index].intoMoney;
    }
    var tempTotalValueAfterVat =
      temptotalValue + (temptotalValue * response.data.data.contractVat) / 100;

    console.log(tempTotalValueAfterVat);
    contextService.updateContext({
      ...contextRef.current,
      lcApplication: {
        ...contextRef.current.lcApplication,
        id: id,
        contractCode: response.data.data.contractCode,
        contractNumber: response.data.data.contractNo,
        lcType: response.data.data.lc.id + '',
        corporateBuy: response.data.data.buyerCorporate.corporateId,
        corporateSell: response.data.data.sellerCorporate.corporateId,

        corporateSellAddress:
          response.data.data.sellerCorporate.corporateAddress,

        productsRequestContractType1:
          response.data.data.products != null
            ? response.data.data.products
            : [],
        placeOfReceipt: response.data.data.placeDelivery,
        placeOfDestination: response.data.data.deliveryLocation,
        lastestDeliveryDate: response.data.data.deliveryDeadline,
        deliveryTime: response.data.data.deliveryTime,
        descriptionOfGoods: response.data.data.descriptionCommodity,
        typeOfGood: response.data.data.commodity.commoditiesId,
        licensesContractType1: tempContractLicenseList,

        totalValueProductContractType1: temptotalValue,
        vatProductContractType1: response.data.data.contractVat,
        totalValueAfterVatContractType1: tempTotalValueAfterVat,
      },
      onlyForDisplay: {
        ...contextRef.current.onlyForDisplay,

        lcType: response.data.data.lc.lcName,
        corporateBuy: response.data.data.buyerCorporate.corporateName,
        corporateBuyAddress: response.data.data.buyerCorporate.corporateAddress,
        corporateSell: response.data.data.sellerCorporate.corporateName,
        corporateSellAddress:
          response.data.data.sellerCorporate.corporateAddress,

        typeOfGood: response.data.data.commodity.commoditiesName,
      },
    });
  };

  const updateApplicationOpeningLc = async () => {
    contextService.updateContext({
      ...contextRef.current,
      loading: true,
    });

    var tempProductListContract2 = [];

    if (contextRef.current.lcApplication.productsRequest.length > 0) {
      console.log(contextRef.current.lcApplication.productsRequest);
      contextRef.current.lcApplication.productsRequest.forEach((element) => {
        var product = {
          id: element.id,
          commodity: element.commodity,
          origin: element.origin,
          unit: element.unit,
          amount: element.amount,
          unitPrice: element.unitPrice,
          intoMoney: element.intoMoney,
        };
        tempProductListContract2.push(product);
      });
    } else {
      tempProductListContract2 = [];
    }

    var tempLicenseListContract1 = [];

    if (contextRef.current.lcApplication.licensesContractType1.length > 0) {
      console.log(contextRef.current.lcApplication.licensesContractType1);
      contextRef.current.lcApplication.licensesContractType1.forEach(
        (element) => {
          var license = {
            contractLicenseId: element.contractLicenseId,
            licenseRequest: {
              licenseId: element.licenseId,
              licenseName: element.licenseName,
            },
            contractId: element.contractId,
            licenseDescription: element.licenseDescription,
          };
          tempLicenseListContract1.push(license);
        },
      );
    } else {
      tempLicenseListContract1 = [];
    }

    var tempLicenseListContract2 = [];

    if (contextRef.current.lcApplication.licenses.length > 0) {
      console.log(contextRef.current.lcApplication.licenses);
      contextRef.current.lcApplication.licenses.forEach((element) => {
        var license = {
          contractLicenseId: element.contractLicenseId,
          licenseRequest: {
            licenseId: element.licenseId,
            licenseName: element.licenseName,
          },
          contractId: element.contractId,
          licenseDescription: element.licenseDescription,
        };
        tempLicenseListContract2.push(license);
      });
    } else {
      tempLicenseListContract2 = [];
    }

    console.log('tempLicenseListContract2');
    console.log(tempLicenseListContract2);

    console.log(contextRef.current.lcApplication.id);
    var applicationOpeningLcRequest = {
      id: ~~contextRef.current.lcApplication.id,
      //tab 1
      bankId: contextRef.current.lcApplication.bankReleash,
      contractFileName: contextRef.current.lcApplication.contractFileName,
      proposalCodeRelease: contextRef.current.lcApplication.proposalCodeRelease,
      contractType: contextRef.current.lcApplication.contractType,
      contractCode: contextRef.current.lcApplication.contractCode,
      contractNumber: contextRef.current.lcApplication.contractNumber,
      lcType: contextRef.current.lcApplication.lcType,
      corporateBuyId: contextRef.current.lcApplication.corporateBuyId,
      corporateBuyAddress: contextRef.current.lcApplication.corporateBuyAddress,
      corporateSellId: contextRef.current.lcApplication.corporateSellId,
      corporateSellAddress:
        contextRef.current.lcApplication.corporateSellAddress,
      proposalDate: convert2(contextRef.current.lcApplication.proposalDate),
      bankConfirmId: contextRef.current.lcApplication.bankConfirm,
      bankConfirmAddress: contextRef.current.lcApplication.bankConfirmAddress,
      bankTranferId: contextRef.current.lcApplication.bankTranfer,
      confirmationInstruction:
        contextRef.current.lcApplication.confirmationInstruction,
      confirmingBankRequest:
        ~~contextRef.current.lcApplication.confirmingBankRequest,
      bankIdConfirmRequest:
        contextRef.current.lcApplication.bankIdConfirmRequest,
      //tab 2
      moneyType: contextRef.current.lcApplication.moneyType,
      valueLc: contextRef.current.lcApplication.valueLc,
      negativeTolerance: contextRef.current.lcApplication.negativeTolerance,
      positiveTolerance: contextRef.current.lcApplication.positiveTolerance,
      termOfPayment: contextRef.current.lcApplication.termOfPayment,
      noteTermOfPayment: contextRef.current.lcApplication.noteTermOfPayment,
      paymentAmount: contextRef.current.lcApplication.paymentAmount,
      dueDate: convert2(contextRef.current.lcApplication.dueDate),
      dueAddress: contextRef.current.lcApplication.dueAddress,
      fee: contextRef.current.lcApplication.fee,
      presentationAt: contextRef.current.lcApplication.presentationAt + '',
      bankIdPresentationAt:
        contextRef.current.lcApplication.bankIdPresentationAt,

      //tab 3
      partialShipment: contextRef.current.lcApplication.partialShipment,
      transhipment: contextRef.current.lcApplication.transhipment,
      placeOfReceipt: contextRef.current.lcApplication.placeOfReceipt,
      placeOfDestination: contextRef.current.lcApplication.placeOfDestination,
      portOfDeparture: contextRef.current.lcApplication.portOfDeparture,
      lastestDeliveryDate: convert2(
        contextRef.current.lcApplication.lastestDeliveryDate,
      ),
      portOfDestination: contextRef.current.lcApplication.portOfDestination,
      deliveryTime: convert2(contextRef.current.lcApplication.deliveryTime),
      descriptionOfGoods: contextRef.current.lcApplication.descriptionOfGoods,
      productsRequest:
        contextRef.current.lcApplication.contractType == 1
          ? contextRef.current.lcApplication.productsRequestContractType1
          : tempProductListContract2,
      product_type: contextRef.current.lcApplication.typeOfGood,

      totalValueProduct:
        contextRef.current.lcApplication.contractType == 1
          ? contextRef.current.lcApplication.totalValueProductContractType1
          : contextRef.current.lcApplication.totalValueProduct,
      vatProduct:
        contextRef.current.lcApplication.contractType == 1
          ? contextRef.current.lcApplication.vatProductContractType1
          : contextRef.current.lcApplication.vatProduct,
      totalValueAfterVat:
        contextRef.current.lcApplication.contractType == 1
          ? contextRef.current.lcApplication.totalValueAfterVatContractType1
          : contextRef.current.lcApplication.totalValueAfterVat,

      //Tab 4
      periodForPresentation:
        contextRef.current.lcApplication.periodForPresentation,
      otherCondition: contextRef.current.lcApplication.otherCondition,
      listContractLicenseRequests:
        contextRef.current.lcApplication.contractType == 1
          ? tempLicenseListContract1
          : tempLicenseListContract2,
      ttReimbursement: contextRef.current.lcApplication.ttReimbursement,

      //Tab 4
      holdAccountId: contextRef.current.lcApplication.holdAccount,
      feeAccountId: contextRef.current.lcApplication.feeAccount,
      paymentAccountId: contextRef.current.lcApplication.paymentAccount,
      commitmentCustomer: contextRef.current.lcApplication.commitmentCustomer,
    };

    var data = new FormData();
    data.append('file', contextRef.current.uploadFileContract.selectedContract);
    data.append(
      'applicationOpeningLcRequest',
      JSON.stringify(applicationOpeningLcRequest),
    );
    console.log('Data from from:');
    console.log(applicationOpeningLcRequest);
    console.log(contextRef.current.uploadFileContract.selectedContract);
    var config = {
      method: 'post',
      url:
        process.env.REACT_APP_API_BACKEND +
        '/corporate/updateApplicationOpeningLc',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('access_token') + '',
      },
      data: data,
    };

    let response = await axios(config);
    console.log(response.data);
    contextService.updateContext({
      ...contextRef.current,
      loading: false,
    });
    if (response.data.code == 200) {
      message.success('Cập nhật đề nghị phát hành thành công!');
      exitHandler();
    } else if (response.data.code !== 200) {
      message.error(response.data.message);
    }
  };

  const exitHandler = async (id) => {
    history.push(`/cm-home/lc-request-manage`);
  };

  const domainInterface = useRef({
    initDomain,
    getLCApplicationRequest,
    onContractTypeChange,
    onContractCodeChange,
    onContractNumberChange,
    onReleasheBankChange,
    onProposalDateChange,
    onLCTypeChange,
    onCorporateSellChange,
    onCorporateBuyAddressChange,
    onCorporateSellAddressChange,
    onAnnoucerBankChange,

    onAnnoucerBankAddressChange,
    onTranferBankChange,
    onConfirmationInstructionChange,
    onConfirmingBankRequestChange,
    onMoneyTypeChange,
    onValueLcChange,
    onNegativeToleranceChange,
    onPositiveToleranceChange,
    onPresentationAtChange,
    onTermOfPaymentChange,
    onNoteTermOfPaymentChange,
    onPaymentAmountChange,
    onDueDateChange,
    onDueAddressChange,
    onFeeChange,
    onPartialShipmentChange,
    onTranshipmentChange,
    onPlaceOfReceiptChange,
    onPlaceOfDestinationChange,
    onPortOfDepartureChange,
    onPortOfDestinationChange,
    onLastestDeliveryDateChange,
    onDeliveryTimeChange,
    onDescriptionOfGoodsChange,
    onDeliveryTermChange,
    onGoodTypeChange,
    onPeriodForPresentationChange,
    onTtReimbursementChange,
    onOtherConditionChange,
    onHoldAccountChange,
    onFeeAccountChange,
    onPaymentAccountChange,
    onCommitmentCustomerChange,
    setProductsRequestList,
    setLicensesList,
    getAllLicenses,
    updateApplicationOpeningLc,
    exitHandler,
    onAttachedContractChangeHandler,
    onOtherConfirmingBankChange,
    onBankPresentationAtChange,
    onTotalValueAfterVatChange,
    onTotalValueAfterVatContractType1Change,
    onVatProductChange,
  });
  return [context, domainInterface.current];
}

export default CM0704Domain;
