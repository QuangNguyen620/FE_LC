import React from 'react';
import { message, Form } from 'antd';
import { useCallback, useRef, useEffect } from 'react';
import { useHistory } from 'react-router';
import useCM0401ContextService from '../services/CM.04.01ContextService';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { ErrorsCode } from 'core/utils/constants';
import ConstractInfomation from '../views/tab-content/ConstractInfomation';
import ContractProduct from '../views/tab-content/ContractProduct';
import DeliveryInformation from '../views/tab-content/DeliveryInformation';
import PaymentInformation from '../views/tab-content/PaymentInformation';
import OtherInformation from '../views/tab-content/OtherInformation';
import ContractAdendum from '../views/tab-content/ContractAdendum';
import PreviewFileContractSign from '../views/tab-content/PreviewFileContractSign';

var axios = require('axios');

export function useCM0401Domain() {
  const history = useHistory();
  const { id } = useParams();
  const [context, contextService] = useCM0401ContextService();
  const contextRef = useRef(context);
  const [form] = Form.useForm();

  //format
  const dateFormatList = 'DD/MM/YYYY';
  const dateTimeFormatList = 'DD/MM/YYYY HH:mm:ss';
  const dateTimeNow = moment(new Date()).format(dateTimeFormatList);
  const dateInt = new Date().getTime();
  const TIME_OUT = 300000;

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

  const initDomain = async () => {
    var contextData = await getContract();

    console.log('contextData::', contextData);
    var allCorporateOption = await getAllCorporate();
    var userInfoLogin = await getInfoUserLogin();
    var commodityOptions = await getCommodityOptions();
    var currencyOptions = await getCurrencyOptions();
    var lcPaymentTypeOptions = await getLCPaymentTypeOptions();
    var licenseOptions = await getAllLicense();
    var feeCreateContract = await getFeeCreateContract();

    if (
      contextData?.sellerName != undefined &&
      contextData?.sellerName != null &&
      allCorporateOption != undefined &&
      allCorporateOption != null
    ) {
      allCorporateOption.forEach((seller) => {
        if (seller.value == contextData?.sellerName) {
          contextData.representativeSellerOptions = seller.userOptions;

          //set list bank options l?? c??c bank c???a account corporate ???? ch???n
          var bankSwiftCodeOptions = seller.bankOptions;
          contextData.bankSwiftCodeOptions = bankSwiftCodeOptions;

          // var bankSwiftCodes = contextData?.bankSwiftCodeOptions;
          bankSwiftCodeOptions.forEach((bank) => {
            if (bank.value == contextData?.bankAccountId) {
              // check theo id bank, set list t??i kho???n corporate theo bank
              contextData.bankAccountOptions = bank?.accountOptions;

              // contextService.updateContext({
              //   ...contextRef.current,
              //   bankAccountOptions: bank?.accountOptions,
              // });
            }
          });
        }
      });
    }

    var buyerCorporateId = contextData?.buyerCorporateId;
    if (allCorporateOption != undefined && allCorporateOption != null) {
      allCorporateOption.forEach((buyer) => {
        if (buyer.value == buyerCorporateId) {
          // contextService.updateContext({
          //   ...contextRef.current,
          contextData.buyerName = buyerCorporateId;
          // contextData.buyerAddress = buyerCorporate.corporateAddress;
          contextData.buyerNameOptions = [buyer];
          contextData.representativeBuyerOptions = buyer.userOptions;
          // });
        }
      });
    }

    contextData.sellerNameOptions = allCorporateOption;
    contextData.licenseOptions = licenseOptions;
    contextData.dataUserLogin = userInfoLogin;
    contextData.commodityOptions = commodityOptions;
    contextData.currencyOptions = currencyOptions;
    contextData.lcPaymentTypeOptions = lcPaymentTypeOptions;

    contextData.showEditSuccess = false;
    contextData.showEditFailed = false;
    contextData.viewModalFee = false;
    contextData.loading = false;

    contextData.feeCreateContract = feeCreateContract;

    contextData.steps = [
      {
        key: 1,
        title: 'Th??ng tin chung',
        content: <ConstractInfomation form={form} />,
        display: 'flex',
      },
      {
        key: 2,
        title: 'Th??ng tin h??ng h??a',
        content: <ContractProduct form={form} />,
        display: 'flex',
      },
      {
        key: 3,
        title: 'Th??ng tin giao h??ng',
        content: <DeliveryInformation form={form} />,
        display: 'flex',
      },
      {
        key: 4,
        title: 'Th??ng tin thanh to??n',
        content: <PaymentInformation form={form} />,
        display: 'flex',
      },
      {
        key: 5,
        title: 'Th??ng tin kh??c',
        content: <OtherInformation form={form} />,
        display: 'flex',
      },
      {
        key: 6,
        title: 'Ph??? l???c ????nh k??m',
        content: <ContractAdendum form={form} />,
        display: 'none',
      },
      // {
      //   key: 7,
      //   title: 'Xem tr?????c h???p ?????ng',
      //   content: <PreviewFileContractSign />,
      // },
    ];
    contextData.stepsCurrent = 0;

    if (contextData.contractAddendum.length > 0) {
      contextData.steps[5].display = 'flex';
    }

    contextData.viewContainer = true;
    contextData.viewFilePDF = false;

    await contextService.initContext(contextData);

    // await getContract();
  };

  const getContract = async () => {
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
      timeout: TIME_OUT,
    };

    var contractData = {};

    let response = await axios(config);
    if (response?.data?.code == 200) {
      console.log('responseView:::', response.data.data);
      if (response.data) {
        var temp = response.data.data;
        var corporateAccount = temp.corporateAccount;

        contractData.contractId = temp.contractId;
        contractData.contractCode = temp.contractCode;
        contractData.contractNo = temp.contractNo;
        contractData.pursuantLaw = temp.pursuantLaw;
        contractData.contractEstablishmentDate = temp.contractEstablishmentDate;
        contractData.sellerCorporateId = temp.sellerCorporate.corporateId;
        contractData.sellerName = temp?.sellerCorporate.corporateId;
        // contractData.sellerAddress = temp.sellerCorporate.corporateAddress;
        contractData.sellerAddress = temp.sellerAddress;
        contractData.representativeSeller = temp?.userInfoSeller?.id;
        contractData.sellerPosition = temp?.userInfoSeller.position;
        contractData.buyerCorporateId = temp?.buyerCorporate.corporateId;
        contractData.buyerName = temp.buyerName;
        // contractData.buyerAddress = temp?.buyerCorporate.corporateAddress;
        contractData.buyerAddress = temp?.buyerAddress;
        contractData.representativeBuyer = temp?.userInfoBuyer?.id;
        contractData.buyerPosition = temp?.userInfoBuyer?.position;

        contractData.descriptionCommodity = temp.descriptionCommodity;
        contractData.commodityId = temp?.commodity?.commoditiesId;
        contractData.contractValueBeforTax = temp.contractValueBeforTax;
        contractData.contractValueBeforeVat = temp.contractValueBeforeVat;
        contractData.contractVat = temp.contractVat;
        contractData.contractValue = temp.contractValue;
        contractData.currency = temp.currency;
        contractData.amountReductionTolerance = temp.amountReductionTolerance;
        contractData.toleranceIncreaseAmount = temp.toleranceIncreaseAmount;
        contractData.deliveryVehicle = temp.deliveryVehicle;
        contractData.deliveryTerm = temp.deliveryTerm;
        contractData.deliveryDeadline = temp.deliveryDeadline;
        contractData.placeDelivery = temp.placeDelivery;
        contractData.deliveryLocation = temp.deliveryLocation;
        contractData.productQuality = temp.productQuality;
        contractData.termsOfExchange = temp.termsOfExchange;
        contractData.goodsWarranty = temp.goodsWarranty;
        contractData.paymentMethods = temp.paymentMethods;
        contractData.transferPayments = temp.transferPayments;
        contractData.lcPayment = temp.lcPayment;

        contractData.lcPaymentType = temp.lc.id;
        contractData.lcId = temp.lc.id;
        contractData.paymentTermLc = temp.paymentTermLc;

        contractData.bankAccountId = corporateAccount?.bank.bankId;
        contractData.bankSwiftCode = corporateAccount?.bank.bankId;
        contractData.buyerAccountNumber = corporateAccount.corporateAccountId;

        contractData.setOfPaymentDocuments = temp.setOfPaymentDocuments;
        contractData.latePaymentInterestRate = temp.latePaymentInterestRate;
        contractData.cargoInsurance = temp.cargoInsurance;
        contractData.obligationsBuyer = temp.obligationsBuyer;
        contractData.obligationsSeller = temp.obligationsSeller;
        contractData.regulationsPenaltiesAndContractCompensation =
          temp.regulationsPenaltiesAndContractCompensation;
        contractData.disputeSettlementProcedures =
          temp.disputeSettlementProcedures;
        contractData.caseOfForceMajeure = temp.caseOfForceMajeure;
        contractData.validityContract = temp.validityContract;
        contractData.generalTerms = temp.generalTerms;

        contractData.contractAddendum = temp.contractAddendum;
        contractData.listLicence = temp.listLicence;

        contractData.reasonsForRefusingTheBuyer =
          temp.reasonsForRefusingTheBuyer;
        contractData.reasonsForRefusingTheSeller =
          temp.reasonsForRefusingTheSeller;

        contractData.status = temp.status;
      }

      var state = {};
      var productListData = [];
      var productContract = temp.products;
      productContract.forEach((prod, index) => {
        var tempProd = {
          id: index + 1,
          stt: index + 1,
          key: index + 1,
          commodity: prod.commodity,
          origin: prod.origin,
          unit: prod.unit,
          amount: prod.amount,
          unitPrice: prod.unitPrice,
          // noteOfPrice: '100/m1',
          intoMoney: prod.intoMoney,
        };
        productListData.push(tempProd);
      });
      state.dataSource = productListData;
      state.count = productListData.length;

      //custom paymentMethods option
      var paymentMethods = [];
      if (contractData.paymentMethods == 1) {
        paymentMethods = [1];
      } else if (contractData.paymentMethods == 2) {
        paymentMethods = [2];
      } else {
        paymentMethods = [1, 2];
      }

      //custom licenseList option // b??? ch???ng t???
      var list = [];
      var licenseList = [];
      // var licenseListInit = [];
      // if (contractData?.listLicence) {
      //   list = contractData?.listLicence;
      //   licenseListInit = contractData?.listLicence;
      //   list.forEach((licence, index) => {
      //     var licence = {};
      //     licence.key = index + 1;
      //     licence['licenseId' + (index + 1)] = licence.licenseId;
      //     licence['licenseName' + (index + 1)] = licence.licenseName;
      //     licenseList.push(licence);
      //   });
      // }
      // var stateLicenseList = {};
      // var licenseListNew = [];
      // var stateLicenseList = temp.listLicence;
      // stateLicenseList.forEach((licence, index) => {
      //   var tempLicense = {
      //     key: index + 1,
      //     licenseId: licence.licenseId,
      //     licenseName: licence.licenseName,
      //   };
      //   licenseListNew.push(tempLicense);
      // });

      var stateLicenseList = [];
      var licenseListNew = [];
      var stateLicenseList = temp.listContractLicenses;
      if (stateLicenseList != undefined && stateLicenseList != null) {
        stateLicenseList.forEach((contractLicence, index) => {
          var licenceRes = contractLicence.licenseResponse;

          var tempLicense = {
            key: index + 1,
            licenseId: licenceRes.licenseId,
            licenseName: licenceRes.licenseName,

            contractLicenseId: contractLicence.contractLicenseId,
            licenseDescription: contractLicence.licenseDescription,
          };
          licenseListNew.push(tempLicense);
        });
      }

      stateLicenseList.dataSource = licenseListNew;
      stateLicenseList.count = licenseListNew.length;

      //custom contractAddendum // tab3 - ????nh k??m plhd
      var contractAddendums = [];
      var addendumList = [];
      var addendumListInit = [];
      if (response.data.data.contractAddendum) {
        addendumList = response.data.data.contractAddendum;
      }
      var countAddendum = 1;
      addendumList.forEach((addendum, index) => {
        var tempAddendum = {};
        tempAddendum.title = 'Ph??? l???c h???p ?????ng';
        tempAddendum.key = index + 1;
        // tempAddendum['addendumNo' + (index + 1)] = addendum.addendumNo;
        tempAddendum['addendumNo' + (index + 1)] = index + 1;
        tempAddendum['addendumName' + (index + 1)] = addendum.addendumName;
        tempAddendum['addendumContent' + (index + 1)] =
          addendum.addendumContent;

        contractAddendums.push(tempAddendum);

        var tempAddendumInit = {};
        tempAddendumInit.key = index + 1;
        tempAddendumInit.addendumNo = index + 1;
        tempAddendumInit.addendumName = addendum.addendumName;
        tempAddendumInit.addendumContent = addendum.addendumContent;
        countAddendum++;
        addendumListInit.push(tempAddendumInit);
      });

      contractData.state = state;
      contractData.productData = productListData;
      contractData.contractAddendum = contractAddendums;
      contractData.contractAddendumInit = addendumListInit;
      contractData.countAddendum = countAddendum;
      contractData.paymentMethods = paymentMethods;

      // contractData.licenseList = licenseList;
      // contractData.licenseListInit = licenseListInit;

      contractData.stateLicenseList = stateLicenseList;
      console.log('contractData:::::', contractData);

      // await contextService.initContext(contractData);
    }
    return contractData;
  };

  const getAllCorporate = async () => {
    var config = {
      method: 'get',
      url: process.env.REACT_APP_API_BACKEND + '/corporate/getAllCorporate',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('access_token') + '',
        'Content-Type': 'application/json',
        'Accept-Language': 'vi',
      },
      timeout: TIME_OUT,
    };
    let response = await axios(config);
    if (response?.data?.code == 200) {
      var corporateOptions = [];
      // set option cho ng?????i ?????a di???n
      response.data.data.forEach((element) => {
        var corporate = {};
        var userOptions = [];
        var bankOptions = [];
        // bankOptions.accountOptions = [];

        corporate.label = element.corporateName;
        corporate.value = element.corporateId;
        corporate.corporateAddress = element.corporateAddress;
        // get option user v?? g??n v??o options corporate
        element.userInfoList.forEach((userInfo) => {
          if (
            userInfo.position == 'legal_representative'
            // || userInfo.position == 'accountant'
          ) {
            var user = {};
            user.label = userInfo.userName;
            user.value = userInfo.id;
            user.role = userInfo.position;
            userOptions.push(user);
          }
        });
        corporate.userOptions = userOptions;
        // get options bank g??n v??o options corporate

        element.corporateAccountList.forEach((acc) => {
          var bank = acc.bank;
          var bankCurrent = {};
          bankCurrent.accountOptions = [];
          var checkExits = true;
          var corporateAccounts = [];
          var account = {};
          //bankOption
          bankCurrent.label = bank.bankName + ' - ' + bank.swiftCode;
          bankCurrent.value = bank.bankId;
          //accountOptions
          // account.label = acc.corporateAccountName;
          account.label = acc.corporateAccountNumber;
          account.value = acc.corporateAccountId;
          //ki???m tra bank n??y ???? c?? trong option ch??a
          bankOptions.forEach((bankInfo) => {
            if (bankInfo.value == bankCurrent.value) {
              //bank ???? t???n t???i, add accCorporate
              bankInfo.accountOptions.push(account);
              checkExits = false;
            }
          });
          if (checkExits) {
            bankCurrent.accountOptions.push(account);
            bankOptions.push(bankCurrent);
          }
        });
        corporate.bankOptions = bankOptions;

        corporateOptions.push(corporate);
      });

      // contextService.updateContext({
      //   ...contextRef.current,
      //   sellerNameOptions: corporateOptions,
      // });
    }
    return corporateOptions;
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
      timeout: TIME_OUT,
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

  const getContractById = async (id) => {
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
      timeout: TIME_OUT,
    };
    console.log(config);
    return config;
  };

  const getAllCommodity = async () => {
    var config = {
      method: 'get',
      url: process.env.REACT_APP_API_BACKEND + '/admin/license/getAllCommodity',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('access_token') + '',
        'Content-Type': 'application/json',
        'Accept-Language': 'vi',
      },
      timeout: TIME_OUT,
    };
    return config;
  };

  // get select Option b??? ch???ng t???
  const getAllLicense = async () => {
    var config = {
      method: 'get',
      url: process.env.REACT_APP_API_BACKEND + '/admin/license/getAll',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('access_token') + '',
        'Content-Type': 'application/json',
        'Accept-Language': 'vi',
      },
      timeout: TIME_OUT,
    };
    let response = await axios(config);

    var licenseOptions = [];
    if (response?.data?.code == 200) {
      // console.log('licenseList::: ', response.data.data);
      var licenseOptions = [];
      var licenseOther = {
        label: 'Kh??c',
        value: 0,
      };
      licenseOptions.push(licenseOther);
      response.data.data.forEach((license) => {
        var licenseOption = {};
        licenseOption.label = license.licenseName;
        licenseOption.value = license.licenseId;

        licenseOptions.push(licenseOption);
      });

      // contextService.updateContext({
      //   ...contextRef.current,
      //   licenseOptions: licenseOptions,
      // });
    }
    return licenseOptions;
  };

  const getCommodityOptions = async () => {
    var data = [];
    var config = {
      method: 'get',
      url: process.env.REACT_APP_API_BACKEND + '/admin/commodity/getAll',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('access_token') + '',
        'Content-Type': 'application/json',
        'Accept-Language': 'vi',
      },
      timeout: TIME_OUT,
    };
    let response = await axios(config);
    if (response?.data?.code == 200) {
      console.log('commodityOptions', response);
      data = response?.data?.data;
    }
    return data;
  };

  const getCurrencyOptions = async () => {
    var data = [];
    var config = {
      method: 'get',
      url: process.env.REACT_APP_API_BACKEND + '/data/currency/getAll',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('access_token') + '',
        'Content-Type': 'application/json',
        'Accept-Language': 'vi',
      },
      timeout: TIME_OUT,
    };
    let response = await axios(config);
    if (response?.data?.code == 200) {
      console.log('getCurrencyOptions', response);
      data = response?.data?.data;
    }
    return data;
  };

  const getLCPaymentTypeOptions = async () => {
    var data = [];
    var config = {
      method: 'get',
      url: process.env.REACT_APP_API_BACKEND + '/admin/lcClassify/getAll',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('access_token') + '',
        'Content-Type': 'application/json',
        'Accept-Language': 'vi',
      },
      timeout: TIME_OUT,
    };
    let response = await axios(config);
    if (response?.data?.code == 200) {
      console.log('getLCPaymentTypeOptions', response);
      data = response?.data?.data;
    }
    return data;
  };

  const getFeeCreateContract = async () => {
    //hard code
    var feeCreateContract = {
      feeType: 'Ph?? k?? h???p ?????ng ??i???n t???',
      fee: '1,000,000 VND',
      vatFee: '100,000 VND',
      totalFee: '1,100,000 VND',
    };
    return feeCreateContract;

    // var config = {
    //   method: 'get',
    //   url: process.env.REACT_APP_API_BACKEND + '/admin/contract/getFeeCreateContract',
    //   headers: {
    //     Authorization: 'Bearer ' + sessionStorage.getItem('access_token') + '',
    //     'Content-Type': 'application/json',
    //     'Accept-Language': 'vi',
    //   },
    //  timeout: TIME_OUT,
    // };
    // let response = await axios(config);
    // if (response?.data?.code == 200) {
    //   contextService.updateContext({
    //     ...contextRef.current,
    //     licenseOptions: licenseOptions,
    //   });
    // }
  };

  // thay ?????i v???i c??c input l?? t??n ng?????i b??n,
  // khi thay ?????i t??n ng?????i b??n s??? thay ?????i option user b?? option bank
  function onChangeConstractSelectSellerName(name, e) {
    console.log('sellerNameOptions::: ', contextRef.current?.sellerNameOptions);
    var allCorporateOption = contextRef?.current?.sellerNameOptions;
    var sellerAddress = '';
    var representativeSellerOptions = [];
    var bankSwiftCodeOptions = [];
    if (allCorporateOption) {
      allCorporateOption.forEach((seller) => {
        if (seller.value == e) {
          sellerAddress = seller.corporateAddress; //set ?????a ch??? c???a corporate ???? ch???n

          //set list user options l?? c??c user c???a corporate ???? ch???n
          representativeSellerOptions = seller.userOptions;
          //set list bank options l?? c??c bank c???a account corporate ???? ch???n
          bankSwiftCodeOptions = seller.bankOptions;
        }
      });

      contextService.updateContext({
        ...contextRef.current,
        [name]: e,
        sellerAddress: sellerAddress,
        representativeSeller: '',
        bankSwiftCode: '',
        buyerAccountNumber: '',
        sellerPosition: '',
        representativeSellerOptions: representativeSellerOptions,
        bankSwiftCodeOptions: bankSwiftCodeOptions,
      });
    }
  }

  // thay ?????i v???i c??c input l?? ?????i di???n b??n b??n;
  function onChangerepresentativeSeller(name, e) {
    var sellerPosition = '';

    var representativeSellerOptions =
      contextRef.current?.representativeSellerOptions;
    representativeSellerOptions.forEach((seller) => {
      if (seller.value == e) {
        if (seller.role == 'accountant') {
          sellerPosition = 'K??? to??n tr?????ng';
        } else {
          sellerPosition = 'Ng?????i ?????i di???n ph??p lu???t';
        }
      }
    });
    contextService.updateContext({
      ...contextRef.current,
      [name]: e,
      sellerPosition: sellerPosition,
    });
  }

  // thay ?????i v???i c??c input l?? ?????i di???n b??n mua
  function onChangerepresentativeBuyer(name, e) {
    var buyerPosition = '';
    var representativeBuyers = contextRef.current?.representativeBuyerOptions;
    representativeBuyers.forEach((buyer) => {
      if (buyer.value == e) {
        if (buyer.role == 'accountant') {
          buyerPosition = 'K??? to??n tr?????ng';
        } else {
          buyerPosition = 'Ng?????i ?????i di???n ph??p lu???t';
        }
      }
    });
    contextService.updateContext({
      ...contextRef.current,
      [name]: e,
      buyerPosition: buyerPosition,
    });
  }

  // thay ?????i ng??n h??ng b??n b??n s??? thay ?????i options t??i kho???n
  function onChangeBankSwiftCode(e) {
    var bankSwiftCodes = contextRef.current?.bankSwiftCodeOptions;
    bankSwiftCodes.forEach((bank) => {
      if (bank.value == e) {
        // check theo id bank, set list t??i kho???n corporate theo bank
        contextService.updateContext({
          ...contextRef.current,
          bankSwiftCode: e,
          bankAccountOptions: bank?.accountOptions,
        });
      }
    });
  }

  // thay ?????i v???i c??c input ph????ng th???c thanh to??n
  function onChangeConstractPaymentMethodsCheckBox(e) {
    // console.log('e', e);
    // var paymentMethods = 0;
    // e.forEach((paymentMethod) => {
    //   paymentMethods += paymentMethod * 1;
    // });
    contextService.updateContext({
      ...contextRef.current,
      paymentMethods: e,
    });
  }

  // thay ?????i v???i c??c input type = date;
  function onChangeConstractText(e) {
    var data = e.target.value;
    contextService.updateContext({
      ...contextRef.current,
      [e.target.name]: data,
    });
  }

  // thay ?????i v???i c??c input type = Select;
  function onChangeConstractSelect(name, e) {
    contextService.updateContext({
      ...contextRef.current,
      [name]: e,
    });
  }

  // thay ?????i v???i c??c input type = date;
  function onChangeConstractDate(name, e) {
    contextService.updateContext({
      ...contextRef.current,
      [name]: convert(e?._d),
    });
  }

  // thay ?????i v???i table v?? vat
  function onChangeConstractVAT(name, e) {
    // var vatNew = e.target.value * 1;
    var vatNew = e * 1;
    var total = 0;
    var totalAfterTax = 0;
    var tempProduct = contextRef.current?.productData;
    if (tempProduct != undefined && tempProduct != null) {
      tempProduct.forEach((prod) => {
        total += prod.intoMoney;
      });

      totalAfterTax = total + (total * vatNew) / 100;
    }
    contextService.updateContext({
      ...contextRef.current,
      contractVat: vatNew,
      contractValue: totalAfterTax,
    });
  }

  const handleSaveState = (data) => {
    console.log('handleSaveState', data);
    var productData = data?.dataSource;
    var total = 0;
    var contractVat = contextRef.current?.contractVat;
    if (contractVat == undefined && contractVat == null) {
      contractVat = 0;
    }
    if (productData != undefined && contractVat != null) {
      productData.forEach((product) => {
        total += product.amount * product.unitPrice;
      });
    }
    var totalContract = total + (total * contractVat) / 100;
    contextService.updateContext({
      ...contextRef.current,
      state: data,
      productData: productData,
      contractValueBeforTax: total,
      contractValueBeforeVat: total,
      contractValue: totalContract,
    });
  };

  const handleSaveDataProduct = (data) => {
    console.log('handleSaveDataProduct', data);
    // setProductData(data);
    // var total = 0;
    // var contractVat = contextRef.current?.contractVat;
    // if (contractVat == undefined && contractVat == null) {
    //   contractVat = 0;
    // }

    // data.forEach((product) => {
    //   total += product.amount * product.unitPrice;
    // });
    // var totalContract = total + (total * contractVat) / 100;

    // contextService.updateContext({
    //   ...contextRef.current,
    //   productData: data,
    //   contractValueBeforTax: total,
    //   contractValue: totalContract,
    // });
  };

  // thay ?????i form v???i tab ph??? l???c ;
  const onChangeDataContractAddendum = (data) => {
    contextService.updateContext({
      ...contextRef.current,
      contractAddendum: data,
    });
    console.log('onChangeDataContractAddendum', data);
  };

  // thay ?????i data v???i tab ph??? l???c ;
  const onChangeDataContractAddendumInit = (data) => {
    contextService.updateContext({
      ...contextRef.current,
      contractAddendumInit: data,
    });
    console.log('onChangeDataContractAddendumInit', data);
  };

  // thay ?????i form v???i tab ph??? l???c ;
  const onChangeCountAddendum = (data) => {
    contextService.updateContext({
      ...contextRef.current,
      countAddendum: data,
    });
    console.log('onChangeCountAddendum', data);
  };

  // thay ?????i form v???i b??? ch???ng t??? ;
  const onChangeConstractLicense = (data) => {
    contextService.updateContext({
      ...contextRef.current,
      licenseList: data,
    });
    console.log('onChangeConstractLicense', data);
  };

  // thay ?????i  data v???i b??? ch???ng t??? ;
  const onChangeConstractLicenseInit = (data) => {
    contextService.updateContext({
      ...contextRef.current,
      licenseListInit: data,
    });
    console.log('onChangeConstractLicenseInit', data);
  };

  const setContractLicenseList = (data) => {
    contextService.updateContext({
      ...contextRef.current,
      stateLicenseList: data,
    });
    console.log('setContractLicenseList', data);
  };

  function checkProduct(product) {
    if (product != undefined && product != null) {
      if (
        product.commodity !== null &&
        product.commodity !== '' &&
        product.origin !== null &&
        product.origin !== '' &&
        product.unit !== null &&
        product.unit !== '' &&
        product.amount !== null &&
        product.amount !== '' &&
        product.unitPrice !== null &&
        product.unitPrice !== '' &&
        product.intoMoney !== null &&
        product.intoMoney !== ''
      ) {
        return true;
      }
    }
    return false;
  }

  const generateFilePdf = async () => {
    contextService.updateContext({
      ...contextRef.current,
      loading: true,
    });
    console.log('values:::', contextRef.current);
    var values = contextRef.current;

    var productData = values?.productData;
    var contractAddendumInit = values?.contractAddendumInit;
    var licenseOptions = values?.licenseOptions;
    var licenseListForm = values?.licenseListInit;
    var paymentMethodArr = values?.paymentMethods;
    var licenseListNew = values?.stateLicenseList?.dataSource;

    // custom b???ng h??ng h??a
    var products = [];
    productData.forEach((prod) => {
      if (checkProduct(prod)) {
        var product = {
          // id: 0,
          commodity: prod.commodity,
          origin: prod.origin,
          unit: prod.unit,
          amount: prod.amount,
          unitPrice: prod.unitPrice,
          intoMoney: prod.intoMoney,
        };
        products.push(product);
      }
    });

    var licenseList = [];
    if (licenseListNew != undefined && licenseListNew != null) {
      licenseListNew.forEach((license) => {
        var licenseData = {
          licenseId: license.licenseId == 0 ? null : license.licenseId,
          licenseName: license.licenseName,
        };
        licenseList.push(licenseData);
      });
    }

    var listContractLicenseRequests = [];
    if (licenseListNew != undefined && licenseListNew != null) {
      licenseListNew.forEach((license) => {
        var contractLicenseData = {
          contractLicenseId: license.contractLicenseId,
          licenseRequest: {
            licenseId: license.licenseId == 0 ? null : license.licenseId,
            licenseName: license.licenseName,
          },
          licenseDescription: license.licenseDescription,
        };
        listContractLicenseRequests.push(contractLicenseData);
      });
    }

    //custom ph????ng th???c thanh to??n
    var paymentMethods = 0;
    paymentMethodArr.forEach((paymentMethod) => {
      paymentMethods += paymentMethod * 1;
    });

    //custom tab plhd
    var contractAddendum = [];
    if (contractAddendumInit != undefined && contractAddendumInit != null) {
      contractAddendumInit.forEach((addendum, index) => {
        var tempAddendum = {};
        tempAddendum.addendumContent = addendum.addendumContent?.trim();
        tempAddendum.addendumName = addendum.addendumName?.trim();
        // tempAddendum.addendumNo = addendum.addendumNo;
        tempAddendum.addendumNo = index + 1;
        contractAddendum.push(tempAddendum);
      });
    }
    var contractNoNew = values?.contractNo;
    if (contractNoNew == undefined || contractNoNew == null) {
      contractNoNew = '';
    }
    var data = {
      pursuantLaw: values?.pursuantLaw?.trim(),
      contractNo: contractNoNew?.trim(),
      contractCode: values?.contractCode,
      contractEstablishmentDate: values?.contractEstablishmentDate,
      sellerCorporateId: values?.sellerName,
      representativeSeller: values?.representativeSeller,
      buyerCorporateId: values?.buyerName,
      representativeBuyer: values?.representativeBuyer,
      sellerAddress: values?.sellerAddress?.trim(), //?????a ch??? b??n b??n
      buyerAddress: values?.buyerAddress?.trim(), //?????a ch??? b??n mua

      descriptionCommodity: values?.descriptionCommodity?.trim(),
      commodityId: values?.commodityId,
      contractValueBeforeVat: values?.contractValueBeforeVat,
      contractVat: values?.contractVat,
      contractValue: values?.contractValue,
      currency: values?.currency,
      amountReductionTolerance: values?.amountReductionTolerance,
      toleranceIncreaseAmount: values?.toleranceIncreaseAmount,
      deliveryVehicle: values?.deliveryVehicle?.trim(),
      deliveryTerm: values?.deliveryTerm?.trim(),
      deliveryDeadline: values?.deliveryDeadline,
      placeDelivery: values?.placeDelivery?.trim(),
      deliveryLocation: values?.deliveryLocation?.trim(),
      productQuality: values?.productQuality?.trim(),
      termsOfExchange: values?.termsOfExchange?.trim(),
      goodsWarranty: values?.goodsWarranty?.trim(),
      transferPayments: values?.transferPayments?.trim(),
      lcPayment: values?.lcPayment?.trim(),
      lcId: values?.lcPaymentType,
      paymentTermLc: values?.paymentTermLc?.trim(),

      bankAccountId: values?.buyerAccountNumber, // id corporateAccount

      latePaymentInterestRate: values?.latePaymentInterestRate,
      cargoInsurance: values?.cargoInsurance?.trim(),
      obligationsBuyer: values?.obligationsBuyer?.trim(),
      obligationsSeller: values?.obligationsSeller?.trim(),
      regulationsPenaltiesAndContractCompensation:
        values.regulationsPenaltiesAndContractCompensation?.trim(),
      disputeSettlementProcedures: values?.disputeSettlementProcedures?.trim(),
      caseOfForceMajeure: values?.caseOfForceMajeure?.trim(),
      validityContract: values?.validityContract?.trim(),
      generalTerms: values?.generalTerms?.trim(),

      proposalReleaseLcId: 0, //kh??ng r?? l?? tr?????ng g???

      products: products,
      listLicence: licenseList,
      listContractLicense: licenseList, // check l???i
      listContractLicenseRequests: listContractLicenseRequests,
      paymentMethods: paymentMethods,
      contractAddendum: contractAddendum, //list plhd

      buyerDigitalSignature: { id: 0 }, // ng?????i mua k??
      buyerDigitalSigningDate: dateTimeNow, // ng??y ng?????i mua k??
      sellerConfirmationDate: dateTimeNow, // maker ng?????i b??n x??c nh???n
      sellerVerifier: { id: 0 }, // ng??ymaker ng?????i b??n x??c nh???n
      sellerDigitalSignature: { id: 0 }, // maker ng?????i b??n x??c nh???n
      sellerDigitalSigningDate: dateTimeNow, // ng??y maker ng?????i b??n x??c nh???n

      // buyerDigitalSignature: null, // ng?????i mua k??
      // buyerDigitalSigningDate: dateTimeNow, // ng??y ng?????i mua k??
      // sellerVerifier: null, // maker ng?????i b??n x??c nh???n
      // sellerConfirmationDate: dateTimeNow, //  ng??y maker ng?????i b??n x??c nh???n
      // sellerDigitalSignature: null, // maker ng?????i b??n x??c nh???n
      // sellerDigitalSigningDate: dateTimeNow, // ng??y maker ng?????i b??n x??c nh???n

      reasonsForRefusingTheSeller: '', // l?? do t??? ch???i

      status: 1, // maker ng?????i mua t???o contract -> ch??? k?? s??? b??n mua
    };

    console.log('Received values of form: ', data);

    var fileName = 'FileContract_' + dateInt + '.pdf';
    var config = {
      method: 'post',
      url:
        process.env.REACT_APP_API_BACKEND +
        '/corporate/contract/generateFilePdf?fileName=' +
        fileName,
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
        pathFileInMinio: response?.data?.data?.pathFileInMinio,
        urlMinio: response?.data?.data?.urlFile,
        base64File: response?.data?.data?.base64,
        loading: false,

        viewContainer: false,
        viewFilePDF: true,
      });
    } else {
      message.error(response.data.message);
      contextService.updateContext({
        ...contextRef.current,
        loading: false,
      });
    }
  };

  const submitHandler = async () => {
    contextService.updateContext({
      ...contextRef.current,
      loading: true,
      viewModalFee: false,
    });

    console.log('values:::', contextRef.current);
    var values = contextRef.current;
    if (
      values?.pathFileInMinio == undefined ||
      values?.pathFileInMinio == null ||
      values?.pathFileInMinio == ''
    ) {
      message.error('Vui l??ng t???i l???i file h???p ?????ng!');
      return;
    }

    var productData = values?.productData;
    var contractAddendumInit = values?.contractAddendumInit;
    var licenseOptions = values?.licenseOptions;
    var licenseListForm = values?.licenseListInit;
    var paymentMethodArr = values?.paymentMethods;
    var licenseListNew = values?.stateLicenseList?.dataSource;

    // custom b???ng h??ng h??a
    var products = [];
    if (productData != undefined && productData != null) {
      productData.forEach((prod) => {
        if (checkProduct(prod)) {
          var product = {
            // id: 0,
            commodity: prod.commodity,
            origin: prod.origin,
            unit: prod.unit,
            amount: prod.amount,
            unitPrice: prod.unitPrice,
            intoMoney: prod.intoMoney,
          };
          products.push(product);
        }
      });
    } else {
      // message.error('B??? ch???ng t??? kh??ng ???????c ph??p ????? tr???ng');
      return;
    }

    // var licenseList = [];
    // if (licenseListNew != undefined && licenseListNew != null) {
    //   licenseListNew.forEach((license) => {
    //     var licenseData = {
    //       licenseId: license.licenseId == 0 ? null : license.licenseId,
    //       licenseName: license.licenseName,
    //     };
    //     licenseList.push(licenseData);
    //   });
    // }
    //custom tab licenseRequestNew
    var listContractLicenseRequests = [];
    if (licenseListNew != undefined && licenseListNew != null) {
      licenseListNew.forEach((license) => {
        var contractLicenseData = {
          contractLicenseId: license.contractLicenseId,
          licenseRequest: {
            licenseId: license.licenseId == 0 ? null : license.licenseId,
            licenseName: license.licenseName,
          },
          licenseDescription: license.licenseDescription,
        };

        // contractLicenseData.;
        // contractLicenseData.licenseRequest = {
        //   licenseId: license.licenseId == 0 ? null : license.licenseId,
        //   licenseName: license.licenseName,
        // };
        // contractLicenseData.licenseDescription = license.licenseDescription;

        listContractLicenseRequests.push(contractLicenseData);
      });
    }
    //custom ph????ng th???c thanh to??n
    var paymentMethods = 0;
    paymentMethodArr.forEach((paymentMethod) => {
      paymentMethods += paymentMethod * 1;
    });

    //custom tab plhd
    var contractAddendum = [];
    if (contractAddendumInit != undefined && contractAddendumInit != null) {
      contractAddendumInit.forEach((addendum, index) => {
        var tempAddendum = {};
        tempAddendum.addendumContent = addendum.addendumContent?.trim();
        tempAddendum.addendumName = addendum.addendumName?.trim();
        // tempAddendum.addendumNo = addendum.addendumNo;
        tempAddendum.addendumNo = index + 1;
        contractAddendum.push(tempAddendum);
      });
    }

    var contractNoNew = values?.contractNo?.trim();
    if (contractNoNew == undefined || contractNoNew == '') {
      contractNoNew = null;
    }
    var data = {
      contractId: values?.contractId,
      contractCode: values?.contractCode,
      pursuantLaw: values?.pursuantLaw?.trim(),
      contractNo: contractNoNew,
      contractEstablishmentDate: values?.contractEstablishmentDate,
      sellerCorporateId: values?.sellerName,
      representativeSeller: values?.representativeSeller,
      buyerCorporateId: values?.buyerName,
      representativeBuyer: values?.representativeBuyer,
      sellerAddress: values?.sellerAddress?.trim(), //?????a ch??? b??n b??n
      buyerAddress: values?.buyerAddress?.trim(), //?????a ch??? b??n mua

      descriptionCommodity: values?.descriptionCommodity?.trim(),
      commodityId: values?.commodityId,
      contractValueBeforeVat: values?.contractValueBeforeVat,
      contractVat: values?.contractVat,
      contractValue: values?.contractValue,
      currency: values?.currency,
      amountReductionTolerance: values?.amountReductionTolerance,
      toleranceIncreaseAmount: values?.toleranceIncreaseAmount,
      deliveryVehicle: values?.deliveryVehicle?.trim(),
      deliveryTerm: values?.deliveryTerm?.trim(),
      deliveryDeadline: values?.deliveryDeadline,
      placeDelivery: values?.placeDelivery?.trim(),
      deliveryLocation: values?.deliveryLocation?.trim(),
      productQuality: values?.productQuality?.trim(),
      termsOfExchange: values?.termsOfExchange?.trim(),
      goodsWarranty: values?.goodsWarranty?.trim(),
      transferPayments: values?.transferPayments?.trim(),
      lcPayment: values?.lcPayment?.trim(),
      lcId: values?.lcPaymentType,
      paymentTermLc: values?.paymentTermLc?.trim(),

      bankAccountId: values?.buyerAccountNumber, // id corporateAccount

      latePaymentInterestRate: values?.latePaymentInterestRate,
      cargoInsurance: values?.cargoInsurance?.trim(),
      obligationsBuyer: values?.obligationsBuyer?.trim(),
      obligationsSeller: values?.obligationsSeller?.trim(),
      regulationsPenaltiesAndContractCompensation:
        values.regulationsPenaltiesAndContractCompensation?.trim(),
      disputeSettlementProcedures: values?.disputeSettlementProcedures?.trim(),
      caseOfForceMajeure: values?.caseOfForceMajeure?.trim(),
      validityContract: values?.validityContract?.trim(),
      generalTerms: values?.generalTerms?.trim(),

      // urlMinio: values?.urlMinio,
      urlMinio: values?.pathFileInMinio,
      base64File: values?.base64File,

      products: products,
      // listLicence: licenseList,
      // listContractLicense: licenseList, // check l???i
      listContractLicenseRequests: listContractLicenseRequests,
      paymentMethods: paymentMethods,
      contractAddendum: contractAddendum, //list plhd

      // buyerDigitalSignature: 0, // ng?????i mua k??
      // buyerDigitalSigningDate: dateTimeNow, // ng??y ng?????i mua k??
      // sellerConfirmationDate: dateTimeNow, // maker ng?????i b??n x??c nh???n
      // sellerVerifier: 0, // ng??ymaker ng?????i b??n x??c nh???n
      // sellerDigitalSignature: 0, // maker ng?????i b??n x??c nh???n
      // sellerDigitalSigningDate: dateTimeNow, // ng??y maker ng?????i b??n x??c nh???n

      reasonsForRefusingTheBuyer: values?.reasonsForRefusingTheBuyer?.trim(), // l?? do t??? ch???i b??n mua
      reasonsForRefusingTheSeller: values?.reasonsForRefusingTheSeller?.trim(), // l?? do t??? ch???i b??n b??n
      // reasonsForRefusingTheBuyer: '',
      // reasonsForRefusingTheSeller: '',

      status: 1, // maker ng?????i mua t???o contract -> ch??? k?? s??? b??n mua
    };

    console.log('Received values of form: ', data);
    console.log('Json: ', JSON.stringify(data));

    var config = {
      method: 'put',
      url:
        process.env.REACT_APP_API_BACKEND +
        '/corporate/contract/updateContract',
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
      // await closeModalFee();
      await message.success('S???a b???n ghi th??nh c??ng!');
      setTimeout(() => {
        exitHandler();
        sendEmail();
      }, 500);
    } else if (response?.data?.code == ErrorsCode.CONFLICT) {
      message.error('Tr?????ng s??? h???p ?????ng kh??ng ???????c ph??p tr??ng l???p!');
    } else if (response?.data?.code == ErrorsCode.BAD_REQUEST) {
      message.error(response.data.message);
    }
    contextService.updateContext({
      ...contextRef.current,
      loading: false,
      stepsCurrent: 0,
    });
  };

  const sendEmail = async () => {
    console.log('values:::', contextRef.current);
    // var values = contextRef.current;

    console.log('contractId:::', id);
    var data = { contractId: id, status: 1 };
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
      console.log('sendEmail:::', response);
    } else {
      console.log(response.data.message);
      // message.error(response.data.message);
    }
  };

  const deleteContract = async (id) => {
    var config = {
      method: 'delete',
      url:
        process.env.REACT_APP_API_BACKEND +
        '/corporate/contract/deleteContract/' +
        id +
        '',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('access_token') + '',
        'Content-Type': 'application/json',
        'Accept-Language': 'vi',
      },
      timeout: TIME_OUT,
    };
    return config;
  };

  const openEditSuccessfullModal = async () => {
    contextService.updateContext({
      ...contextRef.current,
      showEditSuccess: true,
    });
  };

  const closeEditSuccessfullModal = async () => {
    contextService.updateContext({
      ...contextRef.current,
      showEditSuccess: false,
    });
    // history.push(`/cm-home/contract-buyer/view/${id}`);
    history.push(`/cm-home/contract-buyer`);
  };

  const openEditFailModal = async () => {
    contextService.updateContext({
      ...contextRef.current,
      showEditFailed: true,
    });
  };

  const closeEditFailedModal = async () => {
    contextService.updateContext({
      ...contextRef.current,
      showEditFailed: false,
    });
    history.push(`/cm-home/contract-buyer/edit/${id}`);
  };

  const openModalFee = async () => {
    contextService.updateContext({
      ...contextRef.current,
      viewModalFee: true,
    });
  };

  const closeModalFee = async () => {
    contextService.updateContext({
      ...contextRef.current,
      // loading: true,
      viewModalFee: false,
    });
  };

  const editSteps = async (data) => {
    console.log('Edit:::');
    var stepsNew = contextRef.current.steps;
    if (stepsNew[5].display === 'flex') {
      const activeKey = contextRef.current.countAddendum;
      var init = contextRef.current.contractAddendumInit;
      var tempAdd = {
        title: 'Ph??? l???c h???p ?????ng',
        key: activeKey,
        ['addendumNo' + activeKey]: activeKey,
        ['addendumName' + activeKey]: '',
        ['addendumContent' + activeKey]: '',
      };
      let temp = {};
      temp.key = activeKey;
      temp.addendumNo = activeKey;
      temp.addendumName = '';
      temp.addendumContent = '';

      init.push(temp);

      var tempList = contextRef.current.contractAddendum;
      tempList.push(tempAdd);

      contextService.updateContext({
        ...contextRef.current,
        steps: stepsNew,
        contractAddendum: tempList,
        contractAddendumInit: init,
        countAddendum: activeKey + 1,
      });
    } else {
      stepsNew[5].display = 'flex';
      contextService.updateContext({
        ...contextRef.current,
        steps: stepsNew,
      });
    }
  };

  const setStepsCurrent = async (current) => {
    console.log('domain curr', current);
    contextService.updateContext({
      ...contextRef.current,
      stepsCurrent: current,
    });
  };

  const toEditHandler = async () => {
    contextService.updateContext({
      ...contextRef.current,
      viewContainer: true,
      viewFilePDF: false,
    });
  };

  const toSignDigitalHandler = async (id) => {
    history.push(`/cm-home/contract-buyer/sign/${id}`);
  };

  const exitHandler = async () => {
    console.log('exit_view');
    history.push('/cm-home/contract-buyer');
  };

  const toView = async () => {
    history.push(`/cm-home/contract-buyer/view/${id}`);
  };

  const domainInterface = useRef({
    initDomain,
    onChangeConstractSelectSellerName,
    onChangerepresentativeSeller,
    onChangerepresentativeBuyer,
    onChangeConstractVAT,

    handleSaveState,
    handleSaveDataProduct,
    onChangeBankSwiftCode,
    onChangeConstractPaymentMethodsCheckBox,
    onChangeConstractText,
    onChangeConstractSelect,
    onChangeConstractDate,
    onChangeDataContractAddendum,
    onChangeDataContractAddendumInit,
    onChangeCountAddendum,
    onChangeConstractLicense,
    onChangeConstractLicenseInit,
    setContractLicenseList,
    generateFilePdf,
    submitHandler,

    openEditSuccessfullModal,
    openEditFailModal,
    openModalFee,
    closeModalFee,
    closeEditFailedModal,
    closeEditSuccessfullModal,

    editSteps,
    setStepsCurrent,
    toEditHandler,
    deleteContract,
    exitHandler,
    toView,
    toSignDigitalHandler,
  });
  return [context, domainInterface.current];
}

export default useCM0401Domain;
