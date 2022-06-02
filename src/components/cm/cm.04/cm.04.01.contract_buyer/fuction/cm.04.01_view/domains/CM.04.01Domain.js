import { message } from 'antd';
import { useCallback, useRef, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import useCM0401ContextService from '../services/CM.04.01ContextService';
import { useParams } from 'react-router-dom';
import { convert } from '@storybook/theming';
import moment from 'moment';
import log from '../ModuleLogger';

var axios = require('axios');

export function useCM0401Domain() {
  const history = useHistory();
  const { id } = useParams();
  const [context, contextService] = useCM0401ContextService();
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

  //get Options or hardcode Options
  const [listPositions, setListPositions] = useState([
    { label: 'Người đại diện pháp luật', value: 'legal_representative' },
    { label: 'Kế toán trưởng', value: 'accountant' },
  ]);

  const initDomain = async () => {
    var contextData = await getContract();

    var allCorporateOption = await getAllCorporate();
    var userInfoLogin = await getInfoUserLogin();
    var licenseOptions = await getAllLicense();
    var commodityOptions = await getCommodityOptions();
    var currencyOptions = await getCurrencyOptions();
    var lcPaymentTypeOptions = await getLCPaymentTypeOptions();

    var feeCreateContract = await getFeeCreateContract();

    if (
      contextData?.sellerName != undefined &&
      contextData?.sellerName != null &&
      allCorporateOption != undefined &&
      allCorporateOption != null
    ) {
      allCorporateOption.forEach((seller) => {
        if (seller.value == contextData?.sellerName) {
          contextData.sellerCorporateName = seller.label; // set ten ben ban
          seller.userOptions.forEach((user) => {
            if (contextData.representativeSeller == user.value) {
              console.log('userRepresentativeSeller::', user);
              contextData.representativeSellerName = user.label;
            }
          });
          listPositions.forEach((position) => {
            if (contextData.sellerPosition == position.value) {
              contextData.sellerPositionName = position.label;
            }
          });
          contextData.representativeSellerOptions = seller.userOptions;
          //set list bank options là các bank của account corporate đã chọn
          var bankSwiftCodeOptions = seller.bankOptions;
          contextData.bankSwiftCodeOptions = bankSwiftCodeOptions;

          // var bankSwiftCodes = contextData?.bankSwiftCodeOptions;
          if (
            bankSwiftCodeOptions != undefined &&
            bankSwiftCodeOptions != null
          ) {
            bankSwiftCodeOptions.forEach((bank) => {
              if (bank.value == contextData?.bankAccountId) {
                // check theo id bank, set list tài khoản corporate theo bank
                contextData.bankAccountOptions = bank?.accountOptions;

                var accountOptions = bank?.accountOptions;
                if (accountOptions != undefined && accountOptions != null) {
                  accountOptions.forEach((bankAccount) => {
                    if (bankAccount.value == contextData?.buyerAccountNumber) {
                      // console.log("bankAccount:::", bankAccount)
                      contextData.buyerAccountNumberName = bankAccount.label; //get STK
                    }
                  });
                  contextData.bankSwiftCodeName = bank.label; //get ten ngan hang
                }
              }
            });
          }
        }
      });
    }
    // hàm này phải được thực thi ngay sau khi lấy data của 2 api trên nếu ko sẽ mất đồng bộ và mất data của thằng bên dưới
    var buyerCorporateId = contextData?.buyerCorporateId;
    if (allCorporateOption != undefined && allCorporateOption != null) {
      allCorporateOption.forEach((buyer) => {
        if (buyer.value == buyerCorporateId) {
          contextData.buyerCorporateName = buyer.label; // set ten ben mua
          // contextService.updateContext({
          //   ...contextRef.current,
          contextData.buyerName = buyerCorporateId;
          // contextData.buyerAddress = buyerCorporate.corporateAddress;
          contextData.buyerNameOptions = [buyer];
          contextData.representativeBuyerOptions = buyer.userOptions;

          buyer.userOptions.forEach((user) => {
            if (contextData.representativeBuyer == user.value) {
              console.log('userRepresentativeBuyer::', user);
              contextData.representativeBuyerName = user.label;
            }
          });
          listPositions.forEach((position) => {
            if (contextData.buyerPosition == position.value) {
              contextData.buyerPositionName = position.label;
            }
          });
        }
      });
    }

    if (commodityOptions != undefined && commodityOptions != null) {
      commodityOptions.forEach((commodity) => {
        if (commodity.commoditiesId == contextData?.commodityId) {
          contextData.commodityName = commodity.commoditiesName;
        }
      });
    }
    if (currencyOptions != undefined && currencyOptions != null) {
      currencyOptions.forEach((currency) => {
        if (currency.currencyCode == contextData?.currency) {
          contextData.currencyName = currency.currencyCode;
        }
      });
    }

    var contractValueNoVAT = contextData?.contractValueBeforeVat;
    if (contractValueNoVAT != undefined && contractValueNoVAT != null) {
      contextData.contractValueBeforeVatName = contractValueNoVAT
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    } else {
      contextData.contractValueBeforeVatName = '';
    }

    var contractValue = contextData?.contractValue;
    if (contractValue != undefined && contractValue != null) {
      contextData.contractValueName = contractValue
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    } else {
      contextData.contractValueName = '';
    }

    if (lcPaymentTypeOptions != undefined && lcPaymentTypeOptions != null) {
      lcPaymentTypeOptions.forEach((lcPaymentType) => {
        if (lcPaymentType.id == contextData?.lcPaymentType) {
          contextData.lcPaymentTypeName = lcPaymentType.lcName;
        }
      });
    }

    contextData.sellerNameOptions = allCorporateOption;
    contextData.licenseOptions = licenseOptions;
    contextData.dataUserLogin = userInfoLogin;
    contextData.feeCreateContract = feeCreateContract;
    contextData.loading = false;

    if (
      contextData.reasonsForRefusingTheBuyer == undefined ||
      contextData.reasonsForRefusingTheBuyer == null ||
      contextData.reasonsForRefusingTheBuyer == ''
    ) {
      contextData.showViewRejectSignBuyer = false;
    } else {
      contextData.showViewRejectSignBuyer = true;
    }

    await contextService.initContext(contextData);

    // await getContract();
  };

  const initSignDomain = async () => {
    var contextData = await getContract();
    var userInfoLogin = await getInfoUserLogin();

    contextData.dataUserLogin = userInfoLogin;
    contextData.showSignSuccess = false;
    contextData.showFormOTP = false;
    contextData.showCertificateModal = false;
    contextData.loading = false;

    contextData.signDigitalRequest = {
      maKy: '',
      agreementUUID: '',
      codeTransaction: '',
      otp: '',
    };

    // console.log('userInfoLogin:::', userInfoLogin);
    // console.log('contextData:::', contextData);
    // checkuser đăng nhập có phải user ng đại diện
    contextData.showButtonSign = false;
    if (
      userInfoLogin?.corporate?.corporateId == contextData?.buyerCorporateId &&
      contextData?.status == 1 &&
      userInfoLogin.position == 'legal_representative'
      // userInfoLogin.id == contextData?.representativeBuyer
    ) {
      contextData.showButtonSign = true;
    } else {
      log.info('khong phai user checker');
    }

    contextData.setListCertificate = [];

    contextData.certificateData = null;

    contextData.linkDownloadCer =
      'https://dev-lc-storage.xcbt.online/s3-lc-dev/certificate/xSigner.rar';

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
    };

    var contractData = {};

    let response = await axios(config);
    if (response?.data?.code == 200) {
      console.log('responseView:::', response.data.data);
      if (response.data) {
        var temp = response.data.data;
        var corporateAccount = temp.corporateAccount;

        contractData.contractCode = temp.contractCode;
        contractData.contractNo = temp.contractNo;
        contractData.pursuantLaw = temp.pursuantLaw.replaceAll('\n', '\n');
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

        contractData.status = temp.status;
        contractData.urlMinio = temp.urlMinio;
        contractData.base64File = temp.base64File;
        contractData.reasonsForRefusingTheSeller =
          temp.reasonsForRefusingTheSeller;
        contractData.reasonsForRefusingTheBuyer =
          temp.reasonsForRefusingTheBuyer;
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
      state.count = productListData.lengt;

      //custom paymentMethods option
      var paymentMethods = [];
      if (contractData.paymentMethods == 1) {
        paymentMethods = [1];
      } else if (contractData.paymentMethods == 2) {
        paymentMethods = [2];
      } else {
        paymentMethods = [1, 2];
      }

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
      // stateLicenseList.dataSource = licenseListNew;
      // stateLicenseList.count = licenseListNew.length;

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

      //custom contractAddendum // tab3 - đính kèm plhd
      var contractAddendums = [];
      var contractAddendumInit = [];
      var addendumList = [];
      if (response.data.data.contractAddendum) {
        addendumList = response.data.data.contractAddendum;
      }

      addendumList.forEach((addendum, index) => {
        var tempAddendum = {};
        var tempAddendumInit = {};
        tempAddendum.title = 'Phụ lục hợp đồng';
        tempAddendum.key = index + 1;
        // tempAddendum['addendumNo' + (index + 1)] = addendum.addendumNo;
        tempAddendum['addendumNo' + (index + 1)] = index + 1;
        tempAddendum['addendumName' + (index + 1)] = addendum.addendumName;
        tempAddendum['addendumContent' + (index + 1)] =
          addendum.addendumContent;

        tempAddendumInit = addendum;
        tempAddendumInit.title = 'Phụ lục ' + (index + 1);
        tempAddendumInit.key = index + 1;
        tempAddendumInit.addendumNo = index + 1;

        contractAddendums.push(tempAddendum);
        contractAddendumInit.push(tempAddendumInit);
      });

      contractData.state = state;
      contractData.productData = productListData;
      contractData.contractAddendum = contractAddendums;
      contractData.contractAddendumInit = addendumList;
      contractData.paymentMethods = paymentMethods;

      // contractData.licenseList = licenseList;
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
    };
    let response = await axios(config);
    if (response?.data?.code == 200) {
      var corporateOptions = [];
      // set option cho người địa diện
      response.data.data.forEach((element) => {
        var corporate = {};
        var userOptions = [];
        var bankOptions = [];
        // bankOptions.accountOptions = [];

        corporate.label = element.corporateName;
        corporate.value = element.corporateId;
        corporate.corporateAddress = element.corporateAddress;
        // get option user và gán vào options corporate
        element.userInfoList.forEach((userInfo) => {
          if (
            userInfo.position == 'legal_representative' ||
            userInfo.position == 'accountant'
          ) {
            var user = {};
            user.label = userInfo.userName;
            user.value = userInfo.id;
            user.role = userInfo.position;
            userOptions.push(user);
          }
        });
        corporate.userOptions = userOptions;
        // get options bank gán vào options corporate

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
          //kiểm tra bank này đã có trong option chưa
          bankOptions.forEach((bankInfo) => {
            if (bankInfo.value == bankCurrent.value) {
              //bank đã tồn tại, add accCorporate
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

  // get select Option bộ chứng từ
  const getAllLicense = async () => {
    var config = {
      method: 'get',
      url: process.env.REACT_APP_API_BACKEND + '/admin/license/getAll',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('access_token') + '',
        'Content-Type': 'application/json',
        'Accept-Language': 'vi',
      },
    };
    let response = await axios(config);

    var licenseOptions = [];
    if (response?.data?.code == 200) {
      // console.log('licenseList::: ', response.data.data);
      response.data.data.forEach((license) => {
        var licenseOption = {};
        licenseOption.label = license.licenseName;
        licenseOption.value = license.licenseId;

        licenseOptions.push(licenseOption);
      });
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
    };
    let response = await axios(config);
    if (response?.data?.code == 200) {
      console.log('getLCPaymentTypeOptions', response);
      data = response?.data?.data;
    }
    return data;
  };

  // const getAllLicense = async () => {
  //   var config = {
  //     method: 'get',
  //     url: process.env.REACT_APP_API_BACKEND + '/admin/license/getAll',
  //     headers: {
  //       Authorization: 'Bearer ' + sessionStorage.getItem('access_token') + '',
  //       'Content-Type': 'application/json',
  //       'Accept-Language': 'vi',
  //     },
  //   };
  //   return config;
  // };

  const getFeeCreateContract = async () => {
    //hard code
    var feeCreateContract = {
      feeType: 'Phí ký hợp đồng điện tử',
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
    // };
    // let response = await axios(config);
    // if (response?.data?.code == 200) {
    //   contextService.updateContext({
    //     ...contextRef.current,
    //     licenseOptions: licenseOptions,
    //   });
    // }
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
    };
    return config;
  };

  //------------- ky so theo ca nhan
  //Lấy thông tin ký số FPT CA.
  const signInSignatureCheckerBuyer = async () => {
    console.log('values:::', contextRef.current);
    // var data = {
    //   contractId: id,
    // };
    console.log('id: ', id);

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
        showFormOTP: true,
      });
    } else {
      message.error(response.data.message);
    }
  };
  // Ký số lên file thông qua OCR.
  const signDigitalCheckerBuyer = async (otp) => {
    var signDigitalData = contextRef.current?.signDigitalRequest;
    var data = {
      maKy: signDigitalData?.maKy,
      agreementUUID: signDigitalData?.agreementUUID,
      codeTransaction: signDigitalData?.codeTransaction,
      otp: otp,
    };
    console.log('data: ', data);
    //var fileName = 'FileContract_' + dateInt + '.pdf';
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
      timeout: TIME_OUT,
    };
    let response = await axios(config);
    console.log('urlMinioRes: ', response);
    if (response?.data?.code == 200 || response?.data?.code == 201) {
      contextService.updateContext({
        ...contextRef.current,
        urlMinio: response?.data?.data,
        showFormOTP: false,
      });
      await sendEmailSign();
    } else {
      message.error(response.data.message);
    }
  };

  // -------- Ky so doanh nghiep theo extensions token
  const signByTokenCheckerBuyer = async () => {
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
          await sendEmailSign();
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

  // Send Email và update trạng thái
  const sendEmailSign = async () => {
    console.log('values:::', contextRef.current);
    // var values = contextRef.current;console.log(response);
    var dateTimeNow = moment(new Date()).format(dateTimeFormatList);
    console.log(dateTimeNow);

    console.log('contractId:::', id);
    var data = {
      contractId: id,
      status: 3, // 3 : Checker bên mua đã ký số, chờ bên bán xác nhận
      buyerDigitalSignature: { id: contextRef.current?.dataUserLogin?.id },
      buyerDigitalSigningDate: dateTimeNow,
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
      console.log('responseSendMail::', response);
      // exitHandler();
      // openSignSuccessModal();
      await message.success('Ký số thành công!');
      contextService.updateContext({
        ...contextRef.current,
        loading: false,
      });
      setTimeout(() => {
        exitHandler();
      }, 1500);
      return;
      // await message.success('Ký số thành công!');
    } else {
      console.log(response?.data?.message);
      // message.error(response.data.message);
    }
    contextService.updateContext({
      ...contextRef.current,
      loading: false,
    });
  };

  const rejectSignatureCheckerBuyer = async (reason) => {
    var data = {
      contractId: id,
      status: 2,
      buyerDigitalSignature: { id: contextRef.current?.dataUserLogin?.id }, // người từ chối ký bên mua
      buyerDigitalSigningDate: dateTimeNow, // ngày từ chối ký bên mua
      reasonsForRefusingTheBuyer: reason,
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

    contextService.updateContext({
      ...contextRef.current,
      loading: true,
      showRejectVisible: false,
    });

    let response = await axios(config);
    if (response?.data?.code == 200 || response?.data?.code == 201) {
      console.log(response);

      await message.success('Từ chối thành công!');
      setTimeout(() => {
        contextService.updateContext({
          ...contextRef.current,
          loading: false,
        });
        exitHandler();
      }, 1500);
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

  const openSignDigitalModal = async () => {
    contextService.updateContext({
      ...contextRef.current,
      showFormOTP: true,
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
    await signByTokenCheckerBuyer();
  };

  const closeSignDigitalModal = async () => {
    contextService.updateContext({
      ...contextRef.current,
      showFormOTP: false,
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

  const openRejectModal = async () => {
    var dateInt = new Date().getTime();
    console.log(dateInt);
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

  const editHandler = async (id) => {
    history.push(`/cm-home/contract-buyer/edit/${id}`);
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

  const createCertList = async () => {};

  const domainInterface = useRef({
    initDomain,
    initSignDomain,
    getAllCorporate,
    getInfoUserLogin,
    getAllLicense,

    signInSignatureCheckerBuyer,
    signDigitalCheckerBuyer,
    signByTokenCheckerBuyer,
    rejectSignatureCheckerBuyer,

    closeSignDigitalModal,
    openSignSuccessModal,
    closeSignSuccessModal,
    openRejectModal,
    closeRejectModal,
    closeCertificateDownloadModal,

    pickCertificateData,
    openCertificateModal,
    closeCertificateModal,

    deleteContract,
    editHandler,
    exitHandler,
    toView,
    toSignDigitalHandler,
    createCertList,
  });
  return [context, domainInterface.current];
}

export default useCM0401Domain;
