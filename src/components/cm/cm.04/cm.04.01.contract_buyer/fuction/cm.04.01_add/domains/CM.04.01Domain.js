import React from 'react';
import { message, Form } from 'antd';
import { useHistory } from 'react-router';
import { useRef, useEffect } from 'react';
import useCM0401ContextService from '../services/CM.04.01ContextService';
import moment from 'moment';
import { ErrorsCode } from 'core/utils/constants';
import useMultiLanguage from 'core/hooks/UseMultiLanguage';
import ConstractInfomation from '../views/tab-content/ConstractInfomation';
import ContractProduct from '../views/tab-content/ContractProduct';
import DeliveryInformation from '../views/tab-content/DeliveryInformation';
import PaymentInformation from '../views/tab-content/PaymentInformation';
import OtherInformation from '../views/tab-content/OtherInformation';
import ContractAdendum from '../views/tab-content/ContractAdendum';
import PreviewFileContractSign from '../views/tab-content/PreviewFileContractSign';

var axios = require('axios');

export function useCM0401Domain() {
  const lang = useMultiLanguage();
  const history = useHistory();
  const [context, contextService] = useCM0401ContextService();
  const contextRef = useRef(context);
  const [form] = Form.useForm();

  //format
  const dateFormatList = 'DD/MM/YYYY';
  const dateTimeFormatList = 'DD/MM/YYYY HH:mm:ss';
  const dateTimeNow = moment(new Date()).format(dateTimeFormatList);
  const dateInt = new Date().getTime();
  const TIME_OUT = 300000;

  // const [contractId, setContractId] = useState(0);
  // var contractId = 0;

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

  function checkData(data) {
    return typeof data !== 'undefined' && data;
  }

  var paymentMethodOptions = [
    { label: 'Chuyển khoản', value: 1 },
    { label: 'Thư tín dụng L/C', value: 2 },
  ];

  useEffect(() => {
    contextRef.current = context;
    console.log('change context domain', contextRef.current);
  }, [context]);

  const initDomain = async () => {
    var contextData = {
      pursuantLaw: '', //Căn cứ Luật
      contractNo: '', // Số hợp đồng -- tự sinh
      contractEstablishmentDate: convert(new Date()), //Ngày lập HĐ
      sellerCorporateId: '', //Tên bên bán
      sellerName: '', //Tên bên bán
      sellerAddress: '', //Địa chỉ bên bán
      representativeSeller: '', //Đại diện bên bán
      sellerPosition: '', // Chức vụ bên bán

      buyerCorporateId: '', // id corporate bên mua
      buyerName: '', //Tên bên mua
      buyerAddress: '', //Địa chỉ bên mua
      representativeBuyer: '', //Đại diện bên mua
      buyerPosition: '', // Chức vụ bên mua

      descriptionCommodity: '', //Mô tả hàng hóa
      commodityId: '',
      contractValueBeforTax: 0, //Giá trị hợp đồng trước thuế
      contractValueBeforeVat: 0,
      contractVat: 0, //vat
      contractValue: 0, //Giá trị hợp đồng
      currency: 'VND', //Loại tiền tệ
      amountReductionTolerance: 0, // Dung sai giảm số tiền (%)
      toleranceIncreaseAmount: 0, // Dung sai tăng số tiền (%)

      deliveryVehicle: '', //Phương thức giao hàng
      deliveryTerm: '', //Thời hạn giao hàng
      deliveryDeadline: '', //Hạn giao hàng
      placeDelivery: '', //Địa điểm giao hàng
      deliveryLocation: '', //Địa điểm nhận hàng
      productQuality: '', //Chất lượng hàng
      termsOfExchange: '', //Quy định đổi hàng
      goodsWarranty: '', //Bảo hành hàng hóa

      paymentMethods: '', //Phương thức thanh toán
      transferPayments: '', //Thanh toán chuyển khoản
      lcPayment: '', //Thanh toán L/C
      lcPaymentType: '', //Loại L/C
      lcId: '', //Loại L/C
      paymentTermLc: '', //Thời hạn thanh toán lc
      bankAccountId: '', //id ngan hàng bên bán
      bankSwiftCode: '', //Ngân hàng bên bán
      buyerAccountNumber: '', //Số tài khoản
      setOfPaymentDocuments: '', //Bộ chứng từ thanh toán
      latePaymentInterestRate: 0, //Lãi suất trả chậm (%/năm)

      cargoInsurance: '', //Bảo hiểm hàng hóa
      obligationsBuyer: '', //Nghĩa vụ bên mua
      obligationsSeller: '', //Nghĩa vụ bên bán
      regulationsPenaltiesAndContractCompensation: '', //Quy định phạt và bồi thường hợp đồng
      disputeSettlementProcedures: '', //Thủ tục tranh chấp giải quyết
      caseOfForceMajeure: '', //Trường hợp bất khả kháng
      validityContract: '', //Hiệu lự HĐ
      generalTerms: '', //Điều khoản chung
      pathFileInMinio: '',
      urlMinio: '',
      base64File: '',
      //temp
      contractAddendum: [
        // {
        // title: 'Phụ lục hợp đồng',
        // content: 'Content of Tab phụ lục hợp đồng',
        // key: '1',
        // addendumNo1: '1',
        // addendumName1: '',
        // addendumContent1: '',
        // },
      ],

      contractAddendumInit: [
        // {
        // addendumNo: 1,
        // addendumName: '',
        // addendumContent: '',
        // },
      ],
      countAddendum: 1,
      licenseList: [
        {
          title: 'Chứng từ',
          key: '1',
          licenseId1: '',
          licenseName1: '',
        },
      ],

      licenseListInit: [
        {
          licenseId: 0,
          licenseName: '',
        },
      ],

      state: {
        dataSource: [],
        count: 0,
      },

      productData: [],

      stateLicenseList: {
        dataSource: [],
        count: 0,
      },

      steps: [
        {
          key: 1,
          title: 'Thông tin chung',
          content: <ConstractInfomation form={form} />,
          display: 'flex',
        },
        {
          key: 2,
          title: 'Thông tin hàng hóa',
          content: <ContractProduct form={form} />,
          display: 'flex',
        },
        {
          key: 3,
          title: 'Thông tin giao hàng',
          content: <DeliveryInformation form={form} />,
          display: 'flex',
        },
        {
          key: 4,
          title: 'Thông tin thanh toán',
          content: <PaymentInformation form={form} />,
          display: 'flex',
        },
        {
          key: 5,
          title: 'Thông tin khác',
          content: <OtherInformation form={form} />,
          display: 'flex',
        },
        {
          key: 6,
          title: 'Phụ lục đính kèm',
          content: <ContractAdendum form={form} />,
          display: 'none',
        },
        // {
        //   key: 7,
        //   title: 'Xem trước hợp đồng',
        //   content: <PreviewFileContractSign />,
        // },
      ],
      stepsCurrent: 0,

      //option
      dataUserLogin: {},
      sellerNameOptions: [],
      representativeSellerOptions: [],
      buyerNameOptions: [],
      representativeBuyerOptions: [],
      commodityOptions: [],

      paymentMethodOptions: paymentMethodOptions,
      lcPaymentTypeOptions: [],
      bankSwiftCodeOptions: [],
      bankAccountOptions: [],
      licenseOptions: [],

      stayPage: true,
      nextPage: false,
      showAddSuccess: false,
      showAddFailed: false,
      showExistedGroup: false,

      viewContainer: true,
      viewFilePDF: false,

      loading: false,
    };
    await contextService.initContext(contextData);

    var allCorporateOption = await getAllCorporate();
    var userInfoLogin = await getInfoUserLogin();
    var commodityOptions = await getCommodityOptions();
    var currencyOptions = await getCurrencyOptions();
    var lcPaymentTypeOptions = await getLCPaymentTypeOptions();

    var licenseOptions = await getAllLicense();
    var feeCreateContract = await getFeeCreateContract();

    console.log('licenseOptions::: ', licenseOptions);
    console.log('feeCreateContract::: ', feeCreateContract);

    // contextService.updateContext({
    //   ...contextRef.current,
    //   licenseOptions: licenseOptions,
    // });

    // hàm này phải được thực thi ngay sau khi lấy data của 2 api trên nếu ko sẽ mất đồng bộ và mất data của thằng bên dưới
    var buyerCorporate = userInfoLogin?.corporate;

    var sellerNameOptions = [];
    var buyerNameOptions = [];
    var representativeBuyerOptions = [];
    var buyerName = '';
    var buyerAddress = '';
    if (buyerCorporate != undefined && buyerCorporate != null) {
      if (allCorporateOption != undefined && allCorporateOption != null) {
        allCorporateOption.forEach((buyer) => {
          if (buyer.value == buyerCorporate.corporateId) {
            buyerNameOptions.push(buyer);
            representativeBuyerOptions = buyer.userOptions;
            buyerName = buyerCorporate.corporateId;
            buyerAddress = buyerCorporate.corporateAddress;
            // contextService.updateContext({
            //   ...contextRef.current,
            //   buyerName: buyerCorporate.corporateId,
            //   buyerAddress: buyerCorporate.corporateAddress,
            //   buyerNameOptions: [buyer],
            //   representativeBuyerOptions: buyer.userOptions,
            // });
          } else {
            sellerNameOptions.push(buyer);
          }
        });
      }
    }
    contextService.updateContext({
      ...contextRef.current,
      sellerNameOptions: sellerNameOptions,
      buyerName: buyerName,
      buyerAddress: buyerAddress,
      buyerNameOptions: buyerNameOptions,
      representativeBuyerOptions: representativeBuyerOptions,

      licenseOptions: licenseOptions,
      feeCreateContract: feeCreateContract,
      commodityOptions: commodityOptions,
      currencyOptions: currencyOptions,
      lcPaymentTypeOptions: lcPaymentTypeOptions,
    });
  };

  //get all option corprate - bên bán
  const getAllCorporate = async () => {
    var config = {
      method: 'get',
      url: process.env.REACT_APP_API_BACKEND + '/corporate/getAllCorporate',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('access_token') + '',
        'Content-Type': 'application/json',
        'Accept-Language': lang,
      },
      timeout: TIME_OUT,
    };
    let response = await axios(config);
    if (response?.data?.code == 200) {
      console.log(response);
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
        // get options bank gán vào options corporate

        element.corporateAccountList.forEach((acc) => {
          var bank = acc.bank;
          var bankCurrent = {};
          bankCurrent.accountOptions = [];
          var checkExits = true;
          // var corporateAccounts = [];
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
        'Accept-Language': lang,
      },
      timeout: TIME_OUT,
    };
    let response = await axios(config);
    if (response?.data?.code == 200) {
      contextService.updateContext({
        ...contextRef.current,
        dataUserLogin: response.data.data,
      });
    }
    return response.data.data;
  };

  const getCommodityOptions = async () => {
    var data = [];
    var config = {
      method: 'get',
      url: process.env.REACT_APP_API_BACKEND + '/admin/commodity/getAll',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('access_token') + '',
        'Content-Type': 'application/json',
        'Accept-Language': lang,
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
        'Accept-Language': lang,
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
        'Accept-Language': lang,
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

  // get select Option bộ chứng từ
  const getAllLicense = async () => {
    var config = {
      method: 'get',
      url: process.env.REACT_APP_API_BACKEND + '/admin/license/getAll',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('access_token') + '',
        'Content-Type': 'application/json',
        'Accept-Language': lang,
      },
      timeout: TIME_OUT,
    };
    let response = await axios(config);
    if (response?.data?.code == 200) {
      // console.log('licenseList::: ', response.data.data);
      var licenseOptions = [];
      var licenseOther = {
        label: 'Khác',
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

  // get select Option bộ chứng từ
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
    //     'Accept-Language': lang,
    //   },
    // timeout: TIME_OUT,
    // };
    // let response = await axios(config);
    // if (response?.data?.code == 200) {
    //    return response?.data?.code;
    // }
  };

  // call back khi thay đổi list sellerNameOptions or dataUserLogin
  // get option cho tên bên mua- dựa vào user đăng nhập
  //get option cho user login - bên mua
  // useEffect(
  //   () => {
  //     const fetchData = () => {
  //       console.log('call userEffect');
  //       var buyerCorporate = contextRef.current?.dataUserLogin?.corporate;
  //       if (buyerCorporate != undefined && buyerCorporate != null) {
  //         //set tên doanh nghiệp vs user đăng nhập
  //         var allCorporateOption = contextRef.current?.sellerNameOptions;
  //         if (allCorporateOption != undefined && allCorporateOption != null) {
  //           allCorporateOption.forEach((buyer) => {
  //             if (buyer.value == buyerCorporate.corporateId) {
  //               console.log('update tên doanh nghiệp');
  //               contextService.updateContext({
  //                 ...contextRef.current,
  //                 buyerName: buyerCorporate.corporateId,
  //                 buyerAddress: buyerCorporate.corporateAddress,
  //                 buyerNameOptions: [buyer],
  //                 representativeBuyerOptions: buyer.userOptions,
  //               });
  //             }
  //           });
  //         }
  //       }
  //     };
  //     fetchData();
  //   },
  //   [
  //     // contextRef.current?.sellerNameOptions,
  //     // contextRef.current?.dataUserLogin,
  //   ],
  // );

  // set optin cho ng dai dien bên mua

  // thay đổi với các input là tên người bán,
  // khi thay đổi tên người bán sẽ thay đổi option user bà option bank
  function onChangeConstractSelectSellerName(name, e) {
    console.log('sellerNameOptions::: ', contextRef.current?.sellerNameOptions);
    var allCorporateOption = contextRef?.current?.sellerNameOptions;
    var sellerAddress = '';
    var representativeSellerOptions = [];
    var bankSwiftCodeOptions = [];
    if (allCorporateOption) {
      allCorporateOption.forEach((seller) => {
        if (seller.value == e) {
          sellerAddress = seller.corporateAddress; //set địa chỉ của corporate đã chọn

          //set list user options là các user của corporate đã chọn
          representativeSellerOptions = seller.userOptions;
          //set list bank options là các bank của account corporate đã chọn
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

  // thay đổi với các input là đại diện bên bán;
  function onChangerepresentativeSeller(name, e) {
    var sellerPosition = '';

    var representativeSellerOptions =
      contextRef.current?.representativeSellerOptions;
    representativeSellerOptions.forEach((seller) => {
      if (seller.value == e) {
        if (seller.role == 'accountant') {
          sellerPosition = 'Kế toán trưởng';
        } else {
          sellerPosition = 'Người đại diện pháp luật';
        }
      }
    });
    contextService.updateContext({
      ...contextRef.current,
      [name]: e,
      sellerPosition: sellerPosition,
    });
  }

  // thay đổi với các input là đại diện bên mua
  function onChangerepresentativeBuyer(name, e) {
    var buyerPosition = '';
    var representativeBuyers = contextRef.current?.representativeBuyerOptions;
    representativeBuyers.forEach((buyer) => {
      if (buyer.value == e) {
        if (buyer.role == 'accountant') {
          buyerPosition = 'Kế toán trưởng';
        } else {
          buyerPosition = 'Người đại diện pháp luật';
        }
      }
    });
    contextService.updateContext({
      ...contextRef.current,
      [name]: e,
      buyerPosition: buyerPosition,
    });
  }

  // thay đổi ngân hàng bên bán sẽ thay đổi options tài khoản
  function onChangeBankSwiftCode(e) {
    var bankSwiftCodes = contextRef.current?.bankSwiftCodeOptions;
    bankSwiftCodes.forEach((bank) => {
      if (bank.value == e) {
        // check theo id bank, set list tài khoản corporate theo bank
        contextService.updateContext({
          ...contextRef.current,
          bankSwiftCode: e,
          bankAccountOptions: bank?.accountOptions,
        });
      }
    });
  }

  // thay đổi với các input phương thức thanh toán
  function onChangeConstractPaymentMethodsCheckBox(e) {
    var paymentMethods = 0;
    e.forEach((paymentMethod) => {
      paymentMethods += paymentMethod * 1;
    });
    contextService.updateContext({
      ...contextRef.current,
      paymentMethods: paymentMethods,
    });
  }

  // thay đổi với các input type = date;
  function onChangeConstractText(e) {
    var data = e.target.value;
    contextService.updateContext({
      ...contextRef.current,
      [e.target.name]: data?.trim(),
    });
  }

  // thay đổi với các input type = Select;
  function onChangeConstractSelect(name, e) {
    contextService.updateContext({
      ...contextRef.current,
      [name]: e,
    });
  }

  // thay đổi với các input type = date;
  function onChangeConstractDate(name, e) {
    contextService.updateContext({
      ...contextRef.current,
      [name]: convert(e?._d),
    });
  }

  // thay đổi với table và vat
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
    // console.log('handleSaveDataProduct', data);
    // // setProductData(data);
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

  // thay đổi form với tab phụ lục ;
  const onChangeDataContractAddendum = (data) => {
    contextService.updateContext({
      ...contextRef.current,
      contractAddendum: data,
    });
    console.log('onChangeDataContractAddendum', data);
  };

  // thay đổi data với tab phụ lục ;
  const onChangeDataContractAddendumInit = (data) => {
    contextService.updateContext({
      ...contextRef.current,
      contractAddendumInit: data,
    });
    console.log('onChangeDataContractAddendumInit', data);
  };

  // thay đổi form với tab phụ lục ;
  const onChangeCountAddendum = (data) => {
    contextService.updateContext({
      ...contextRef.current,
      countAddendum: data,
    });
    console.log('onChangeCountAddendum', data);
  };

  // thay đổi form với bộ chứng từ ;
  const onChangeConstractLicense = (data) => {
    contextService.updateContext({
      ...contextRef.current,
      licenseList: data,
    });
    console.log('onChangeConstractLicense', data);
  };

  // thay đổi  data với bộ chứng từ ;
  const onChangeConstractLicenseInit = (data) => {
    contextService.updateContext({
      ...contextRef.current,
      licenseListInit: data,
    });
    console.log('onChangeConstractLicenseInit', data);
  };

  // const onChangeLicense = (data) => {
  //   contextService.updateContext({
  //     ...contextRef.current,
  //     licenseList: data,
  //   });
  //   console.log('licenseList', data);
  // };
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
    // var licenseOptions = values?.licenseOptions;
    // var licenseListForm = values?.licenseListInit;
    var licenseListNew = values?.stateLicenseList?.dataSource;

    // custom bảng hàng hóa
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
    //custom tab plhd

    var contractAddendum = [];
    if (contractAddendumInit != undefined && contractAddendumInit != null) {
      contractAddendumInit.forEach((addendum, index) => {
        var tempAddendum = {};
        tempAddendum.addendumContent = addendum.addendumContent;
        tempAddendum.addendumName = addendum.addendumName;
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
      pursuantLaw: values?.pursuantLaw,
      contractNo: contractNoNew,
      contractEstablishmentDate: values?.contractEstablishmentDate,
      sellerCorporateId: values?.sellerName,
      representativeSeller: values?.representativeSeller,
      buyerCorporateId: values?.buyerName,
      representativeBuyer: values?.representativeBuyer,
      sellerAddress: values?.sellerAddress, //Địa chỉ bên bán
      buyerAddress: values?.buyerAddress, //Địa chỉ bên mua

      descriptionCommodity: values?.descriptionCommodity,
      commodityId: values?.commodityId,
      contractVat: values?.contractVat,
      contractValue: values?.contractValue,
      contractValueBeforeVat: values?.contractValueBeforeVat,

      currency: values?.currency,
      amountReductionTolerance: values?.amountReductionTolerance,
      toleranceIncreaseAmount: values?.toleranceIncreaseAmount,
      deliveryVehicle: values?.deliveryVehicle,
      deliveryTerm: values?.deliveryTerm,
      deliveryDeadline: values?.deliveryDeadline,
      placeDelivery: values?.placeDelivery,
      deliveryLocation: values?.deliveryLocation,
      productQuality: values?.productQuality,
      termsOfExchange: values?.termsOfExchange,
      goodsWarranty: values?.goodsWarranty,
      paymentMethods: values?.paymentMethods,
      transferPayments: values?.transferPayments,
      lcPayment: values?.lcPayment,
      lcPaymentType: values?.lcPaymentType,
      lcId: values?.lcPaymentType,
      paymentTermLc: values?.paymentTermLc,

      buyerAccountNumber: values?.buyerAccountNumber,
      bankAccountId: values?.buyerAccountNumber, // id corporateAccount

      latePaymentInterestRate: values?.latePaymentInterestRate,
      cargoInsurance: values?.cargoInsurance,
      obligationsBuyer: values?.obligationsBuyer,
      obligationsSeller: values?.obligationsSeller,
      regulationsPenaltiesAndContractCompensation:
        values.regulationsPenaltiesAndContractCompensation,
      disputeSettlementProcedures: values?.disputeSettlementProcedures,
      caseOfForceMajeure: values?.caseOfForceMajeure,
      validityContract: values?.validityContract,
      generalTerms: values?.generalTerms,

      proposalReleaseLcId: 0, //không rõ là trường gì?

      products: products,
      listLicence: licenseList,
      // listContractLicense: licenseList, // check lại
      listContractLicenseRequests: listContractLicenseRequests,
      contractAddendum: contractAddendum, //list plhd

      buyerDigitalSignature: { id: 0 }, // người mua ký
      buyerDigitalSigningDate: dateTimeNow, // ngày người mua ký
      sellerConfirmationDate: dateTimeNow, // maker người bán xác nhận
      sellerVerifier: { id: 0 }, // ngàymaker người bán xác nhận
      sellerDigitalSignature: { id: 0 }, // maker người bán xác nhận
      sellerDigitalSigningDate: dateTimeNow, // ngày maker người bán xác nhận

      // buyerDigitalSignature: null, // người mua ký
      // buyerDigitalSigningDate: dateTimeNow, // ngày người mua ký
      // sellerVerifier: null, // maker người bán xác nhận
      // sellerConfirmationDate: dateTimeNow, //  ngày maker người bán xác nhận
      // sellerDigitalSignature: null, // maker người bán xác nhận
      // sellerDigitalSigningDate: dateTimeNow, // ngày maker người bán xác nhận

      reasonsForRefusingTheSeller: '', // lý do từ chối

      status: 1, // maker người mua tạo contract -> chờ ký số bên mua
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
        'Accept-Language': lang,
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
      message.error(response?.data?.message);
      contextService.updateContext({
        ...contextRef.current,
        loading: false,
      });
    }
  };

  const submitHandler = async () => {
    if (checkData(contextRef?.current?.pathFileInMinio)) {
      var resAddContract = addContract();
      resAddContract.then((response) => {
        console.log('resAddContract', response);
        if (response != undefined && response != null) {
          message.success('Thêm mới bản ghi thành công!');
          setTimeout(() => {
            sendEmail(response?.data?.contractId);
            exitHandler();
          }, 1000);
        } else {
          // message.error('Thêm mới bản ghi thất bại!');
        }
      });
    } else {
      message.error('Vui lòng đợi file hợp đồng được xuất xong');
    }
  };

  const addContract = async () => {
    console.log('values:::', contextRef.current);
    var values = contextRef.current;
    if (
      values?.pathFileInMinio == undefined ||
      values?.pathFileInMinio == null ||
      values?.pathFileInMinio == ''
    ) {
      message.error('Vui lòng tải lại file hợp đồng!');
      // return;
    }

    var productData = values?.productData;
    var contractAddendumInit = values?.contractAddendumInit;
    // var licenseOptions = values?.licenseOptions;
    // var licenseListForm = values?.licenseListInit;
    var licenseListNew = values?.stateLicenseList?.dataSource;
    // custom bảng hàng hóa
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

    //custom tab license
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

    //custom tab plhd
    var contractAddendum = [];
    if (contractAddendumInit != undefined && contractAddendumInit != null) {
      contractAddendumInit.forEach((addendum, index) => {
        var tempAddendum = {};
        tempAddendum.addendumContent = addendum.addendumContent;
        tempAddendum.addendumName = addendum.addendumName;
        tempAddendum.addendumNo = addendum.addendumNo;
        tempAddendum.addendumNo = index + 1;
        contractAddendum.push(tempAddendum);
      });
    }

    var contractNoNew = values?.contractNo?.trim();
    if (contractNoNew == undefined || contractNoNew == '') {
      contractNoNew = null;
    }
    var data = {
      pursuantLaw: values?.pursuantLaw,
      contractNo: contractNoNew,
      contractEstablishmentDate: values?.contractEstablishmentDate,
      sellerCorporateId: values?.sellerName,
      representativeSeller: values?.representativeSeller,
      buyerCorporateId: values?.buyerName,
      representativeBuyer: values?.representativeBuyer,
      sellerAddress: values?.sellerAddress, //Địa chỉ bên bán
      buyerAddress: values?.buyerAddress, //Địa chỉ bên mua

      descriptionCommodity: values?.descriptionCommodity,
      commodityId: values?.commodityId,
      contractVat: values?.contractVat,
      contractValue: values?.contractValue,
      contractValueBeforeVat: values?.contractValueBeforeVat,
      currency: values?.currency,
      amountReductionTolerance: values?.amountReductionTolerance,
      toleranceIncreaseAmount: values?.toleranceIncreaseAmount,
      deliveryVehicle: values?.deliveryVehicle,
      deliveryTerm: values?.deliveryTerm,
      deliveryDeadline: values?.deliveryDeadline,
      placeDelivery: values?.placeDelivery,
      deliveryLocation: values?.deliveryLocation,
      productQuality: values?.productQuality,
      termsOfExchange: values?.termsOfExchange,
      goodsWarranty: values?.goodsWarranty,
      paymentMethods: values?.paymentMethods,
      transferPayments: values?.transferPayments,
      lcPayment: values?.lcPayment,
      lcPaymentType: values?.lcPaymentType,
      lcId: values?.lcPaymentType,
      paymentTermLc: values?.paymentTermLc,

      buyerAccountNumber: values?.buyerAccountNumber,
      bankAccountId: values?.buyerAccountNumber, // id corporateAccount

      latePaymentInterestRate: values?.latePaymentInterestRate,
      cargoInsurance: values?.cargoInsurance,
      obligationsBuyer: values?.obligationsBuyer,
      obligationsSeller: values?.obligationsSeller,
      regulationsPenaltiesAndContractCompensation:
        values.regulationsPenaltiesAndContractCompensation,
      disputeSettlementProcedures: values?.disputeSettlementProcedures,
      caseOfForceMajeure: values?.caseOfForceMajeure,
      validityContract: values?.validityContract,
      generalTerms: values?.generalTerms,

      // urlMinio: values?.urlMinio,
      urlMinio: values?.pathFileInMinio, // sẽ lưu path file, không lưu url
      base64File: values?.base64File,

      proposalReleaseLcId: 0, //không rõ là trường gì?

      products: products,
      // listLicence: licenseList,
      // listContractLicense: licenseList, // check lại
      listContractLicenseRequests: listContractLicenseRequests,
      contractAddendum: contractAddendum, //list plhd

      // buyerDigitalSignature: null, // người mua ký
      // buyerDigitalSigningDate: dateTimeNow, // ngày người mua ký
      // sellerVerifier: null, // maker người bán xác nhận
      // sellerConfirmationDate: dateTimeNow, //  ngày maker người bán xác nhận
      // sellerDigitalSignature: null, // maker người bán xác nhận
      // sellerDigitalSigningDate: dateTimeNow, // ngày maker người bán xác nhận
      // reasonsForRefusingTheSeller: '', // lý do từ chối

      status: 1, // maker người mua tạo contract -> chờ ký số bên mua
    };

    console.log('Received values of form: ', data);
    console.log('Json: ', JSON.stringify(data));

    var config = {
      method: 'post',
      url:
        process.env.REACT_APP_API_BACKEND +
        '/corporate/contract/createContract',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('access_token') + '',
        'Content-Type': 'application/json',
        'Accept-Language': lang,
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
      contextService.updateContext({
        ...contextRef.current,
        loading: false,
        stepsCurrent: 0,
      });
      return response?.data;
    } else if (response?.data?.code == ErrorsCode.CONFLICT) {
      message.error('Trường số hợp đồng không được phép trùng lặp!');
      // message.error(response?.data?.message);
    } else if (response?.data?.code == ErrorsCode.BAD_REQUEST) {
      // message.error(response?.data?.message);
      message.error('Thêm mới bản ghi thất bại!');
    } else {
      message.error(response?.data?.message);
    }

    contextService.updateContext({
      ...contextRef.current,
      loading: false,
      stepsCurrent: 0,
    });
    // return null;
  };

  const sendEmail = async (contractIdRes) => {
    console.log('contractIdRes:::', contractIdRes);

    var data = { contractId: contractIdRes, status: 1 };
    var config = {
      method: 'put',
      url:
        process.env.REACT_APP_API_BACKEND +
        '/corporate/contract/updateDigitalSignature',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('access_token') + '',
        'Content-Type': 'application/json',
        'Accept-Language': lang,
      },
      data: data,
      timeout: TIME_OUT,
    };
    let response = await axios(config);
    if (response?.data?.code == 200 || response?.data?.code == 201) {
      console.log(response);
    } else {
      console.log(response?.data?.message);
      // message.error(response?.data?.message);
    }
  };

  const editSteps = async (data) => {
    var stepsNew = contextRef.current.steps;
    if (stepsNew[5].display === 'flex') {
      const activeKey = contextRef.current.countAddendum;
      var init = contextRef.current.contractAddendumInit;
      var tempAdd = {
        title: 'Phụ lục hợp đồng',
        content: 'Content of new Tab',
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

  const toAddHandler = async () => {
    contextService.updateContext({
      ...contextRef.current,
      viewContainer: true,
      viewFilePDF: false,
    });
  };

  const exitHandler = async () => {
    console.log('exit_add');
    history.push('/cm-home/contract-buyer');
  };

  // const openEditSuccessfullModal = async () => {
  //   contextService.updateContext({
  //     ...contextRef.current,
  //     showAddSuccess: true,
  //     loading: false,
  //   });
  // };

  const closeModalSuccess = async () => {
    contextService.updateContext({
      ...contextRef.current,
      showAddSuccess: false,
    });
    exitHandler();
  };

  const closeModalFailed = async () => {
    contextService.updateContext({
      ...contextRef.current,
      showAddFailed: false,
    });
  };

  const domainInterface = useRef({
    initDomain,
    getInfoUserLogin,
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

    editSteps,
    setStepsCurrent,
    exitHandler,
    toAddHandler,
    closeModalSuccess,
    closeModalFailed,
  });
  return [context, domainInterface.current];
}

export default useCM0401Domain;
