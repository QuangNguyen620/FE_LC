import { useRef, useEffect } from 'react';
import { useHistory } from 'react-router';
import CM0702ContextService from '../services/CM.07Service';
import { message } from 'antd';
import moment from 'moment';
import { TIME_OUT } from 'core/utils/constants';
var axios = require('axios');
export function CM0702Domain() {
  const history = useHistory();
  const [context, contextService] = CM0702ContextService();

  const contextRef = useRef(context);
  const dateFormatList = 'DD/MM/YYYY';
  useEffect(() => {
    contextRef.current = context;
  }, [context]);

  const initDomain = async () => {
    var contextData = {
      lcRequest: {
        //step 1
        bankId: null,
        proposalCodeRelease: null,
        contractType: 1,
        contractCode: null,
        contractNumber: null,
        lcType: null,
        corporateBuy: null,
        corporateBuyAddress: null,
        corporateSell: null,
        corporateSellAddress: null,
        proposalDate: convert2(moment()._d),
        bankConfirm: null,
        bankConfirmAddress: null,
        bankTranfer: null,
        confirmationInstruction: 0,
        confirmingBankRequest: 0,
        bankIdConfirmRequest: null,

        //step 2
        moneyType: null,
        valueLc: null,
        negativeTolerance: null,
        positiveTolerance: null,
        termOfPayment: 1,
        noteTermOfPayment: null,
        paymentAmount: '100% trị giá hóa đơn',
        dueDate: null,
        dueAddress: null,
        fee: 'Phí ngân hàng phát hành do bên đề nghị chịu, các phí khác do bên thụ hưởng chịu',
        presentationAt: 0,
        bankIdPresentationAt: null,

        //step 3
        partialShipment: true,
        transhipment: true,
        placeOfReceipt: null,
        placeOfDestination: null,
        portOfDeparture: null,
        lastestDeliveryDate: null,
        portOfDestination: null,
        deliveryTime: null,
        descriptionOfGoods: null,
        typeOfGood: null,
        productsRequest: [],
        productsRequestContractType1: [],

        totalValueProduct: 0,
        vatProduct: 0,
        totalValueAfterVat: 0,

        totalValueProductContractType1: 0,
        vatProductContractType1: 0,
        totalValueAfterVatContractType1: 0,

        //step 4
        licenses: [],
        licensesContractType1: [],
        periodForPresentation:
          'Chứng từ phải được xuất trình trong vòng 21 ngày sau ngày giao hàng nhưng trong thời hạn hiệu lực của thư tín dụng',
        ttReimbursement: true,
        otherCondition: null,

        //step 5
        holdAccount: null,
        feeAccount: null,
        paymentAccount: null,
        commitmentCustomer: null,
      },
      uploadFileContract: {
        selectedContract: null,
        isContractPicked: false,
        selectedContractURL: '',
      },

      onlyForDisplay: {
        lcType: '',
        corporateBuy: '',
        corporateBuyAddress: '',
        corporateSell: '',
        corporateSellAddress: '',

        //step 3
        typeOfGood: '',
        loading: true,
      },
      listCorporateHoldAccount: [],
      listCorporateFeeAccount: [],
      listCorporatePurchaseAccount: [],
      contractList: [],
      bankList: [],
      corporateList: [],
      licensesList: [],
      goodTypeList: [],
      currencyList: [],
      emptyArr: [],
    };

    await contextService.initContext(contextData);
    await initConstantList();
  };

  function convert2(str) {
    console.log(str);
    var date = new Date(str),
      mnth = ('0' + (date.getMonth() + 1)).slice(-2),
      day = ('0' + date.getDate()).slice(-2);
    console.log(date);
    return [date.getFullYear(), mnth, day].join('-');
  }
  const setSpinnerStatus = async () => {
    contextService.updateContext({
      ...contextRef.current,

      loading: false,
    });
  };
  //--------Code mới---------//

  const initConstantList = async () => {
    await getContractList();
    await getAllCorporate();
    await getAllLicenses();
    await getAllBankList();
    await getCorporateAccountByCorporateID();
    await getAllGoodTypes();
    await getCurrencyOptions();
    await setEmptyArr();
    await setSpinnerStatus();
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
        currencyList: data,
      });
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
      contractList: tempContractList,
    });
  };

  const setEmptyArr = async () => {
    contextService.updateContext({
      ...contextRef.current,
      emptyArr: [],
    });
  };

  const getAllBankList = async () => {
    console.log('Thằng này chạy thứ 4');
    var config = {
      method: 'get',
      url: process.env.REACT_APP_API_BACKEND + '/bank/bankinfo/getAll',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.access_token + '',
      },
      timeout: TIME_OUT,
    };

    let response = await axios(config);
    console.log('List bank response');
    console.log(response.data.data);
    contextService.updateContext({
      ...contextRef.current,
      bankList: response.data.data,
    });
  };

  //-----------SET INPUT VALUE------------//
  const onContractTypeChange = (e) => {
    console.log(e);
    contextService.updateContext({
      ...contextRef.current,
      lcRequest: {
        ...contextRef.current.lcRequest,
        contractType: e,
        bankId: null,
        proposalCodeRelease: null,
        contractCode: '',
        contractId: '',
        contractNumber: '',
        lcType: '',
        corporateBuy: '',
        corporateBuyAddress: '',
        corporateSell: '',
        corporateSellAddress: '',
        proposalDate: convert2(moment()._d),
        bankConfirm: null,
        bankConfirmAddress: '',
        bankTranfer: null,
        confirmationInstruction: 0,
        confirmingBankRequest: 0,
        bankIdConfirmRequest: null,

        //step 2
        moneyType: '',
        valueLc: null,
        negativeTolerance: null,
        positiveTolerance: null,
        termOfPayment: 1,
        noteTermOfPayment: '',
        paymentAmount: '100% trị giá hóa đơn',
        dueDate: '',
        dueAddress: '',
        fee: 'Phí ngân hàng phát hành do bên đề nghị chịu, các phí khác do bên thụ hưởng chịu',
        presentationAt: 0,
        bankIdPresentationAt: null,

        //step 3
        partialShipment: true,
        transhipment: true,
        placeOfReceipt: '',
        placeOfDestination: '',
        portOfDeparture: '',
        lastestDeliveryDate: '',
        portOfDestination: '',
        deliveryTime: '',
        descriptionOfGoods: '',
        typeOfGood: '',
        productsRequest: [],
        productsRequestContractType1: [],

        totalValueProduct: 0,
        vatProduct: 0,
        totalValueAfterVat: 0,

        totalValueProductContractType1: 0,
        vatProductContractType1: 0,
        totalValueAfterVatContractType1: 0,

        //step 4
        licenses: [],
        licensesContractType1: [],
        periodForPresentation:
          'Chứng từ phải được xuất trình trong vòng 21 ngày sau ngày giao hàng nhưng trong thời hạn hiệu lực của thư tín dụng',
        ttReimbursement: true,
        otherCondition: '',

        //step 5
        holdAccount: null,
        feeAccount: null,
        paymentAccount: null,
        commitmentCustomer: '',
      },
      onlyForDisplay: {
        ...contextRef.current.onlyForDisplay,
        lcType: '',
        corporateBuy: '',
        corporateBuyAddress: '',
        corporateSell: '',
        corporateSellAddress: '',

        //step 3
        typeOfGood: '',
      },
    });
    if (e == 2) {
      getCorporateByID();
    }
  };
  const onContractCodeChange = (e) => {
    console.log('-------Input value-------');
    console.log(contextRef.current.contractList[e]);
    getContractDetail(contextRef.current.contractList[e].contractId);
    contextService.updateContext({
      ...contextRef.current,
      lcRequest: {
        ...contextRef.current.lcRequest,
        contractId: contextRef.current.contractList[e].contractId,
      },
    });
  };

  const onContractNumberChange = (e) => {
    console.log('-------Input value-------');
    console.log(e);
    contextService.updateContext({
      ...contextRef.current,
      lcRequest: {
        ...contextRef.current.lcRequest,
        contractNumber: e.target.value,
      },
    });
  };

  const onReleasheBankChange = (e) => {
    console.log('-------Input value-------');
    console.log(e);
    contextService.updateContext({
      ...contextRef.current,
      lcRequest: {
        ...contextRef.current.lcRequest,
        bankId: e,
      },
    });
  };

  const onProposalDateChange = (e) => {
    console.log('-------Input value-------');
    console.log(e);
    if (e != null) {
      contextService.updateContext({
        ...contextRef.current,
        lcRequest: {
          ...contextRef.current.lcRequest,
          proposalDate: convert2(e._d),
        },
      });
    }
    contextService.updateContext({
      ...contextRef.current,
      lcRequest: {
        ...contextRef.current.lcRequest,
        proposalDate: '',
      },
    });
  };

  const onLCTypeChange = (e) => {
    console.log('-------Input value-------');
    console.log(e);
    contextService.updateContext({
      ...contextRef.current,
      lcRequest: {
        ...contextRef.current.lcRequest,
        lcType: e,
      },
    });
  };

  const onCorporateSellChange = (e) => {
    console.log('-------Input value-------');
    console.log(e);
    contextService.updateContext({
      ...contextRef.current,
      lcRequest: {
        ...contextRef.current.lcRequest,
        corporateSell: contextRef.current.corporateList[e].corporateId,
        corporateSellAddress:
          contextRef.current.corporateList[e].corporateAddress,
      },
    });
  };

  const onCorporateBuyAddressChange = (e) => {
    console.log('-------Input value-------');
    console.log(e);
    contextService.updateContext({
      ...contextRef.current,
      lcRequest: {
        ...contextRef.current.lcRequest,
        corporateBuyAddress: e.target.value,
      },
    });
  };

  const onCorporateSellAddressChange = (e) => {
    console.log('-------Input value-------');
    console.log(e);
    contextService.updateContext({
      ...contextRef.current,
      lcRequest: {
        ...contextRef.current.lcRequest,
        corporateSellAddress: e.target.value,
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

  //on change corporate sell address//

  //-------------------------------//

  const onAnnoucerBankChange = (e) => {
    console.log('-------Input value-------');
    console.log(e);
    contextService.updateContext({
      ...contextRef.current,
      lcRequest: {
        ...contextRef.current.lcRequest,
        bankConfirm: contextRef.current.bankList[e].bankId,
        bankConfirmAddress: contextRef.current.bankList[e].bankAddress,
      },
    });
  };

  const onAnnoucerBankAddressChange = (e) => {
    console.log('-------Input value-------');
    console.log(e);
    contextService.updateContext({
      ...contextRef.current,
      lcRequest: {
        ...contextRef.current.lcRequest,
        bankConfirmAddress: e.target.value,
      },
    });
  };

  const onTranferBankChange = (e) => {
    console.log('-------Input value-------');
    console.log(e);
    contextService.updateContext({
      ...contextRef.current,
      lcRequest: {
        ...contextRef.current.lcRequest,
        bankTranfer: e,
      },
    });
  };

  const onConfirmationInstructionChange = (e) => {
    console.log('-------Input value-------');
    console.log(e);
    contextService.updateContext({
      ...contextRef.current,
      lcRequest: {
        ...contextRef.current.lcRequest,
        confirmationInstruction: e.target.value,
      },
    });
  };

  const onConfirmingBankRequestChange = (e) => {
    console.log('-------Input value-------');
    console.log(e);
    contextService.updateContext({
      ...contextRef.current,
      lcRequest: {
        ...contextRef.current.lcRequest,
        confirmingBankRequest: e.target.value,
      },
    });
  };

  //on change 'Chọn ngân hàng xác nhận'//
  const onOtherConfirmingBankChange = (e) => {
    console.log('-------Input value-------');
    console.log(e);
    contextService.updateContext({
      ...contextRef.current,
      lcRequest: {
        ...contextRef.current.lcRequest,
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
      lcRequest: {
        ...contextRef.current.lcRequest,
        moneyType: e,
      },
    });
  };

  const onValueLcChange = (e) => {
    console.log('-------Input value-------');
    console.log(e);
    contextService.updateContext({
      ...contextRef.current,
      lcRequest: {
        ...contextRef.current.lcRequest,
        valueLc: e,
      },
    });
  };

  const onNegativeToleranceChange = (e) => {
    console.log('-------Input value-------');
    console.log(e.target.value);
    contextService.updateContext({
      ...contextRef.current,
      lcRequest: {
        ...contextRef.current.lcRequest,
        negativeTolerance: ~~e.target.value,
      },
    });
  };

  const onPositiveToleranceChange = (e) => {
    console.log('-------Input value-------');
    console.log(e.target.value);
    contextService.updateContext({
      ...contextRef.current,
      lcRequest: {
        ...contextRef.current.lcRequest,
        positiveTolerance: ~~e.target.value,
      },
    });
  };

  const onPresentationAtChange = (e) => {
    console.log('-------Input value-------');
    console.log(e);
    contextService.updateContext({
      ...contextRef.current,
      lcRequest: {
        ...contextRef.current.lcRequest,
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
      lcRequest: {
        ...contextRef.current.lcRequest,
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
      lcRequest: {
        ...contextRef.current.lcRequest,
        termOfPayment: e.target.value,
      },
    });
  };

  const onNoteTermOfPaymentChange = (e) => {
    console.log('-------Input value-------');
    console.log(e);
    contextService.updateContext({
      ...contextRef.current,
      lcRequest: {
        ...contextRef.current.lcRequest,
        noteTermOfPayment: e.target.value,
      },
    });
  };

  const onPaymentAmountChange = (e) => {
    console.log('-------Input value-------');
    console.log(e);
    contextService.updateContext({
      ...contextRef.current,
      lcRequest: {
        ...contextRef.current.lcRequest,
        paymentAmount: e.target.value,
      },
    });
  };

  const onDueDateChange = (e) => {
    console.log('-------Input value-------');
    console.log(e);
    if (e != null) {
      contextService.updateContext({
        ...contextRef.current,
        lcRequest: {
          ...contextRef.current.lcRequest,
          dueDate: convert2(e._d),
        },
      });
    } else {
      contextService.updateContext({
        ...contextRef.current,
        lcRequest: {
          ...contextRef.current.lcRequest,
          dueDate: '',
        },
      });
    }
  };

  const onDueAddressChange = (e) => {
    console.log('-------Input value-------');
    console.log(e);
    contextService.updateContext({
      ...contextRef.current,
      lcRequest: {
        ...contextRef.current.lcRequest,
        dueAddress: e.target.value,
      },
    });
  };

  const onFeeChange = (e) => {
    console.log('-------Input value-------');
    console.log(e);
    contextService.updateContext({
      ...contextRef.current,
      lcRequest: {
        ...contextRef.current.lcRequest,
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
      totalBeforeVAT * (contextRef.current.lcRequest.vatProduct / 100);

    contextService.updateContext({
      ...contextRef.current,
      lcRequest: {
        ...contextRef.current.lcRequest,
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
      lcRequest: {
        ...contextRef.current.lcRequest,
        partialShipment: e.target.value,
      },
    });
  };

  const onTranshipmentChange = (e) => {
    console.log('-------Input value-------');
    console.log(e);
    contextService.updateContext({
      ...contextRef.current,
      lcRequest: {
        ...contextRef.current.lcRequest,
        transhipment: e.target.value,
      },
    });
  };

  const onPlaceOfReceiptChange = (e) => {
    console.log('-------Input value-------');
    console.log(e);
    contextService.updateContext({
      ...contextRef.current,
      lcRequest: {
        ...contextRef.current.lcRequest,
        placeOfReceipt: e.target.value,
      },
    });
  };

  const onPlaceOfDestinationChange = (e) => {
    console.log('-------Input value-------');
    console.log(e);
    contextService.updateContext({
      ...contextRef.current,
      lcRequest: {
        ...contextRef.current.lcRequest,
        placeOfDestination: e.target.value,
      },
    });
  };

  const onPortOfDepartureChange = (e) => {
    console.log('-------Input value-------');
    console.log(e);
    contextService.updateContext({
      ...contextRef.current,
      lcRequest: {
        ...contextRef.current.lcRequest,
        portOfDeparture: e.target.value,
      },
    });
  };

  const onPortOfDestinationChange = (e) => {
    console.log('-------Input value-------');
    console.log(e);
    contextService.updateContext({
      ...contextRef.current,
      lcRequest: {
        ...contextRef.current.lcRequest,
        portOfDestination: e.target.value,
      },
    });
  };

  const onLastestDeliveryDateChange = (e) => {
    if (e != null) {
      contextService.updateContext({
        ...contextRef.current,
        lcRequest: {
          ...contextRef.current.lcRequest,
          lastestDeliveryDate: convert2(e._d),
        },
      });
    } else {
      contextService.updateContext({
        ...contextRef.current,
        lcRequest: {
          ...contextRef.current.lcRequest,
          lastestDeliveryDate: '',
        },
      });
    }
  };

  const onDeliveryTimeChange = (e) => {
    contextService.updateContext({
      ...contextRef.current,
      lcRequest: {
        ...contextRef.current.lcRequest,
        deliveryTime: e.target.value,
      },
    });
  };

  const onGoodTypeChange = (e) => {
    contextService.updateContext({
      ...contextRef.current,
      lcRequest: {
        ...contextRef.current.lcRequest,
        typeOfGood: e,
      },
    });
  };

  const onDescriptionOfGoodsChange = (e) => {
    console.log('-------Input value-------');
    console.log(e);
    contextService.updateContext({
      ...contextRef.current,
      lcRequest: {
        ...contextRef.current.lcRequest,
        descriptionOfGoods: e.target.value,
      },
    });
  };

  const onDeliveryTermChange = (e) => {
    console.log('-------Input value-------');
    console.log(e);
    contextService.updateContext({
      ...contextRef.current,
      lcRequest: {
        ...contextRef.current.lcRequest,
        deliveryTerm: e.target.value,
      },
    });
  };

  const onTotalValueAfterVatContractType1Change = (e) => {
    console.log('-------Input value-------');
    console.log(e);
    contextService.updateContext({
      ...contextRef.current,
      lcRequest: {
        ...contextRef.current.lcRequest,
        totalValueAfterVatContractType1: e,
      },
    });
  };

  const onTotalValueAfterVatChange = (e) => {
    console.log('-------Input value-------');
    console.log(e);
    contextService.updateContext({
      ...contextRef.current,
      lcRequest: {
        ...contextRef.current.lcRequest,
        totalValueAfterVat: e,
      },
    });
  };

  const onVatProductChange = (e) => {
    console.log('-------Input value-------');
    console.log(e);
    let tempTotalValueAfterVat =
      contextRef.current.lcRequest.totalValueProduct +
      contextRef.current.lcRequest.totalValueProduct * (e / 100);
    contextService.updateContext({
      ...contextRef.current,
      lcRequest: {
        ...contextRef.current.lcRequest,
        vatProduct: e,
        totalValueAfterVat: tempTotalValueAfterVat,
      },
    });
  };

  const setLicensesList = (dataList) => {
    console.log('Data list licenses test!!!');
    console.log(dataList);
    contextService.updateContext({
      ...contextRef.current,
      lcRequest: {
        ...contextRef.current.lcRequest,
        licenses: dataList,
      },
    });
  };
  const onPeriodForPresentationChange = (e) => {
    console.log('-------Input value-------');
    console.log(e);
    contextService.updateContext({
      ...contextRef.current,
      lcRequest: {
        ...contextRef.current.lcRequest,
        periodForPresentation: e.target.value,
      },
    });
  };

  const onTtReimbursementChange = (e) => {
    console.log('-------Input value-------');
    console.log(e);
    contextService.updateContext({
      ...contextRef.current,
      lcRequest: {
        ...contextRef.current.lcRequest,
        ttReimbursement: e.target.value,
      },
    });
  };

  const onOtherConditionChange = (e) => {
    console.log('-------Input value-------');
    console.log(e);
    contextService.updateContext({
      ...contextRef.current,
      lcRequest: {
        ...contextRef.current.lcRequest,
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
      lcRequest: {
        ...contextRef.current.lcRequest,
        holdAccount: e,
      },
    });
  };

  const onFeeAccountChange = (e) => {
    console.log('-------Input value-------');
    console.log(e);
    contextService.updateContext({
      ...contextRef.current,
      lcRequest: {
        ...contextRef.current.lcRequest,
        feeAccount: e,
      },
    });
  };

  const onPaymentAccountChange = (e) => {
    console.log('-------Input value-------');
    console.log(e);
    contextService.updateContext({
      ...contextRef.current,
      lcRequest: {
        ...contextRef.current.lcRequest,
        paymentAccount: e,
      },
    });
  };

  const onCommitmentCustomerChange = (e) => {
    console.log('-------Input value-------');
    console.log(e);
    contextService.updateContext({
      ...contextRef.current,
      lcRequest: {
        ...contextRef.current.lcRequest,
        commitmentCustomer: e.target.value,
      },
    });
  };

  //-------------------------------------//

  //------------------------//

  const getAllCorporate = async () => {
    console.log('Thằng này chạy thứ 2');
    var config = {
      method: 'get',
      url: process.env.REACT_APP_API_BACKEND + '/corporate/getAll',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.access_token + '',
        'Content-Type': 'application/json',
      },
      timeout: TIME_OUT,
    };
    let response = await axios(config);
    console.log(response.data.data);
    contextService.updateContext({
      ...contextRef.current,
      corporateList: response.data.data,
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
      timeout: TIME_OUT,
    };

    let response = await axios(config);
    console.log(response.data.data);
    contextService.updateContext({
      ...contextRef.current,
      lcRequest: {
        ...contextRef.current.lcRequest,
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
    console.log('Thằng này chạy thứ 3');
    var config = {
      method: 'get',
      url: process.env.REACT_APP_API_BACKEND + '/admin/license/getAll',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.access_token + '',
        'Content-Type': 'application/json',
      },
      timeout: TIME_OUT,
    };

    let response = await axios(config);

    var tempArr = [];

    response.data.data.forEach((element) => {
      var license = {
        value: element.licenseId,
        name: element.licenseName,
      };
      tempArr.push(license);
    });

    tempArr.push({
      value: 'other',
      name: 'Khác',
    });
    contextService.updateContext({
      ...contextRef.current,
      licensesList: tempArr,
    });
  };

  const getCorporateAccountByCorporateID = async () => {
    console.log('Thằng này chạy cuối cùng');
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
      timeout: TIME_OUT,
    };
    console.log(config);
    let response = await axios(config);

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
      listCorporateHoldAccount: tempHoldAccountList,
      listCorporateFeeAccount: tempFeeAccountList,
      listCorporatePurchaseAccount: tempPaymentAccountList,
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
      timeout: TIME_OUT,
    };
    let response = await axios(config);

    var tempArr;

    if (response.data.data.listContractLicenses != null) {
      tempArr = response.data.data.listContractLicenses;
    } else {
      tempArr = [];
    }

    var tempContractLicenseList = [];
    if (tempArr.length > 0) {
      tempArr.forEach((element, _index) => {
        const license = {
          contractLicenseId: element.contractLicenseId,
          licenseId: element.licenseResponse.licenseId,
          licenseName: element.licenseResponse.licenseName,
          licenseDescription: element.licenseDescription,
        };
        tempContractLicenseList.push(license);
      });
    } else {
      tempContractLicenseList = [];
    }
    var tempProductList = response.data.data.products;
    var temptotalValue = 0;

    tempProductList.forEach((element) => {
      temptotalValue += element.intoMoney;
    });

    var tempTotalValueAfterVat =
      temptotalValue + (temptotalValue * response.data.data.contractVat) / 100;

    contextService.updateContext({
      ...contextRef.current,
      lcRequest: {
        ...contextRef.current.lcRequest,
        contractCode: response.data.data.contractCode,
        contractNumber: response.data.data.contractNo,
        lcType: response.data.data.lc.id + '',
        corporateBuy: response.data.data.buyerCorporate.corporateId,
        corporateBuyAddress: response.data.data.buyerCorporate.corporateAddress,
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
        deliveryTime: response.data.data.deliveryTerm,

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

    contextService.updateContext({
      ...contextRef.current,
      goodTypeList: response.data.data,
    });
  };

  const createApplicationOpeningLc = async () => {
    contextService.updateContext({
      ...contextRef.current,
      loading: true,
    });
    var tempLicenseListContract1 = [];
    if (contextRef.current.lcRequest.licensesContractType1.length > 0) {
      contextRef.current.lcRequest.licensesContractType1.forEach(
        (element, _index) => {
          const license = {
            contractLicenseId: element.contractLicenseId,
            contractId: contextRef.current.lcRequest.contractId,
            licenseRequest: {
              licenseId: element.licenseId,
              licenseName: element.licenseName,
            },

            licenseDescription: element.licenseDescription,
          };
          tempLicenseListContract1.push(license);
        },
      );
    } else {
      tempLicenseListContract1 = [];
    }

    var tempLicenseListContract2 = [];

    if (contextRef.current.lcRequest.licenses.length > 0) {
      contextRef.current.lcRequest.licenses.forEach((element, _index) => {
        const license = {
          contractLicenseId: null,
          contractId: null,
          licenseRequest: {
            licenseId: element.licenseId,
            licenseName: element.licenseName,
          },
          licenseDescription: element.licenseDescription,
        };
        tempLicenseListContract2.push(license);
      });
    } else {
      tempLicenseListContract2 = [];
    }

    var applicationOpeningLcRequest = {
      //tab 1
      bankId: contextRef.current.lcRequest.bankId,
      proposalCodeRelease: contextRef.current.lcRequest.proposalCodeRelease,
      contractType: contextRef.current.lcRequest.contractType,
      contractCode: contextRef.current.lcRequest.contractCode,
      contractNumber: contextRef.current.lcRequest.contractNumber,
      lcType: contextRef.current.lcRequest.lcType,
      corporateBuyId: contextRef.current.lcRequest.corporateBuy,
      corporateBuyAddress: contextRef.current.lcRequest.corporateBuyAddress,
      corporateSellId: contextRef.current.lcRequest.corporateSell,
      corporateSellAddress: contextRef.current.lcRequest.corporateSellAddress,
      proposalDate: contextRef.current.lcRequest.proposalDate,
      bankConfirmId: contextRef.current.lcRequest.bankConfirm,
      bankConfirmAddress: contextRef.current.lcRequest.bankConfirmAddress,
      bankTranferId: contextRef.current.lcRequest.bankTranfer,
      confirmationInstruction:
        contextRef.current.lcRequest.confirmationInstruction,
      confirmingBankRequest: contextRef.current.lcRequest.confirmingBankRequest,
      bankIdConfirmRequest: contextRef.current.lcRequest.bankIdConfirmRequest,
      //tab 2
      moneyType: contextRef.current.lcRequest.moneyType,
      valueLc: contextRef.current.lcRequest.valueLc,
      negativeTolerance: contextRef.current.lcRequest.negativeTolerance,
      positiveTolerance: contextRef.current.lcRequest.positiveTolerance,
      termOfPayment: contextRef.current.lcRequest.termOfPayment,
      noteTermOfPayment: contextRef.current.lcRequest.noteTermOfPayment,
      paymentAmount: contextRef.current.lcRequest.paymentAmount,
      dueDate: contextRef.current.lcRequest.dueDate,
      dueAddress: contextRef.current.lcRequest.dueAddress,
      fee: contextRef.current.lcRequest.fee,
      presentationAt: contextRef.current.lcRequest.presentationAt + '',
      bankIdPresentationAt: contextRef.current.lcRequest.bankIdPresentationAt,

      //tab 3
      partialShipment: contextRef.current.lcRequest.partialShipment,
      transhipment: contextRef.current.lcRequest.transhipment,
      placeOfReceipt: contextRef.current.lcRequest.placeOfReceipt,
      placeOfDestination: contextRef.current.lcRequest.placeOfDestination,
      portOfDeparture: contextRef.current.lcRequest.portOfDeparture,
      portOfDestination: contextRef.current.lcRequest.portOfDestination,

      lastestDeliveryDate: setLatestDeliveryDate(
        contextRef.current.lcRequest.contractType,
        contextRef.current.lcRequest.lastestDeliveryDate,
      ),

      deliveryTime: setDeliveryTime(
        contextRef.current.lcRequest.contractType,
        contextRef.current.lcRequest.deliveryTime,
      ),

      descriptionOfGoods:
        contextRef.current.lcRequest.descriptionOfGoods == ''
          ? null
          : contextRef.current.lcRequest.descriptionOfGoods,

      productsRequest:
        contextRef.current.lcRequest.contractType == 1
          ? contextRef.current.lcRequest.productsRequestContractType1
          : contextRef.current.lcRequest.productsRequest,
      product_type: ~~contextRef.current.lcRequest.typeOfGood,

      totalValueProduct:
        contextRef.current.lcRequest.contractType == 1
          ? contextRef.current.lcRequest.totalValueProductContractType1
          : contextRef.current.lcRequest.totalValueProduct,
      vatProduct:
        contextRef.current.lcRequest.contractType == 1
          ? contextRef.current.lcRequest.vatProductContractType1
          : contextRef.current.lcRequest.vatProduct,
      totalValueAfterVat:
        contextRef.current.lcRequest.contractType == 1
          ? contextRef.current.lcRequest.totalValueAfterVatContractType1
          : contextRef.current.lcRequest.totalValueAfterVat,

      //Tab 4
      periodForPresentation: contextRef.current.lcRequest.periodForPresentation,
      otherCondition: contextRef.current.lcRequest.otherCondition,
      listContractLicenseRequests:
        contextRef.current.lcRequest.contractType == 1
          ? tempLicenseListContract1
          : tempLicenseListContract2,
      ttReimbursement: contextRef.current.lcRequest.ttReimbursement,

      //Tab 4
      holdAccountId: contextRef.current.lcRequest.holdAccount,
      feeAccountId: contextRef.current.lcRequest.feeAccount,
      paymentAccountId: contextRef.current.lcRequest.paymentAccount,
      commitmentCustomer: contextRef.current.lcRequest.commitmentCustomer,
    };

    var data = new FormData();
    if (contextRef.current.uploadFileContract?.selectedContract == undefined) {
      data.append('file', null);
    } else {
      data.append(
        'file',
        contextRef.current.uploadFileContract.selectedContract,
      );
    }

    data.append(
      'applicationOpeningLcRequest',
      JSON.stringify(applicationOpeningLcRequest),
    );

    var config = {
      method: 'post',
      url:
        process.env.REACT_APP_API_BACKEND +
        '/corporate/createApplicationOpeningLc',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('access_token') + '',
      },
      timeout: TIME_OUT,
      data: data,
    };

    let response = await axios(config);

    contextService.updateContext({
      ...contextRef.current,
      loading: false,
    });
    if (response.data.code == 200) {
      message.success('Tạo đề nghị phát hành thành công!');
      exitHandler();
    } else if (response.data.code !== 200) {
      message.error(response.data.message);
    }
  };

  //------set latest delivery date-------//
  const setLatestDeliveryDate = (contractType, lastestDeliveryDate) => {
    if (contractType == 1) {
      if (lastestDeliveryDate != '') {
        return moment(lastestDeliveryDate, dateFormatList);
      } else {
        return null;
      }
    }
    return lastestDeliveryDate;
  };
  //------set delivery time-------//
  const setDeliveryTime = (contractType, deliverytime) => {
    if (contractType == 1) {
      if (deliverytime != '') {
        return deliverytime;
      } else {
        return null;
      }
    }
    return deliverytime;
  };

  //-------------------------------//

  const exitHandler = async () => {
    history.push(`/cm-home/lc-request-manage`);
  };

  const domainInterface = useRef({
    initDomain,
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
    createApplicationOpeningLc,
    exitHandler,
    onAttachedContractChangeHandler,
    onOtherConfirmingBankChange,
    onBankPresentationAtChange,
    onTotalValueAfterVatContractType1Change,
    onTotalValueAfterVatChange,
    onVatProductChange,
    getCorporateAccountByCorporateID,
    getContractList,
    setSpinnerStatus,
  });
  return [context, domainInterface.current];
}

export default CM0702Domain;
