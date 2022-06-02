import { message } from 'antd';
import { useRef, useEffect } from 'react';
import { useHistory } from 'react-router';
import useMultiLanguage from 'core/hooks/UseMultiLanguage';
import useBM010601Service from '../services/BM010601AddContextService';
var axios = require('axios');

export function BM010601Domain() {
  const lang = useMultiLanguage();
  const history = useHistory();
  const [context, contextService] = useBM010601Service();
  const contextRef = useRef(context);
  const TIME_OUT = 300000;

  useEffect(() => {
    contextRef.current = context;
  }, [context]);

  const convert = (str) => {
    var date = new Date(str),
      mnth = ('0' + (date.getMonth() + 1)).slice(-2),
      day = ('0' + date.getDate()).slice(-2);
    return [day, mnth, date.getFullYear()].join('/');
  };

  const initDomain = async () => {
    var contextData = {
      fundingLimit: {
        bankId: null,
        typeLimit: '',
        contractNumberLimit: '',
        dateRange: '',
        expirationDate: '',
        moneyType: '',
        descriptionOfTransactions: '',
        requestARefund: false,
        totalLimit: 0,
      },
      constantValue: {
        bankList: [],
        currencyList: [],
      },
      emptyArr: [],
      loading: false,
    };
    console.log('init domain');
    await contextService.initContext(contextData);
    console.log('get data');
    await getBankList();
    await getCurrencyOptions();
    // await initConstantList();
  };

  const initConstantList = async () => {
    await getBankList();
    await getCurrencyOptions();
    await setEmptyArr();
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

    var tempArr = [];
    if (response.data.data.length > 0) {
      response.data.data.forEach((element) => {
        var bank = {
          bankId: element.bankId,
          bankName: element.bankName,
        };
        tempArr.push(bank);
      });
    } else {
      tempArr = [];
    }

    contextService.updateContext({
      ...contextRef.current,
      constantValue: {
        ...contextRef.current.constantValue,
        bankList: tempArr,
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
        'Accept-Language': lang,
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
          currencyList: data,
        },
      });
    }
  };

  const setEmptyArr = async () => {
    contextService.updateContext({
      ...contextRef.current,
      emptyArr: [],
    });
  };

  //----------Input change-----------------//
  const onBankIdChange = (value) => {
    contextService.updateContext({
      ...contextRef.current,
      fundingLimit: {
        ...contextRef.current.fundingLimit,
        bankId: value,
      },
    });
  };

  const onTypeLimitChange = (e) => {
    contextService.updateContext({
      ...contextRef.current,
      fundingLimit: {
        ...contextRef.current.fundingLimit,
        typeLimit: e.target.value,
      },
    });
  };

  const onContractNumberLimitChange = (e) => {
    contextService.updateContext({
      ...contextRef.current,
      fundingLimit: {
        ...contextRef.current.fundingLimit,
        contractNumberLimit: e.target.value,
      },
    });
  };

  const onDateRangeChange = (e) => {
    contextService.updateContext({
      ...contextRef.current,
      fundingLimit: {
        ...contextRef.current.fundingLimit,
        dateRange: convert(e._d),
      },
    });
  };

  const onExpirationDateChange = (e) => {
    contextService.updateContext({
      ...contextRef.current,
      fundingLimit: {
        ...contextRef.current.fundingLimit,
        expirationDate: convert(e._d),
      },
    });
  };

  const onTotalLimitChange = (e) => {
    contextService.updateContext({
      ...contextRef.current,
      fundingLimit: {
        ...contextRef.current.fundingLimit,
        totalLimit: e.target.value,
      },
    });
  };

  const onMoneyTypeChange = (value) => {
    contextService.updateContext({
      ...contextRef.current,
      fundingLimit: {
        ...contextRef.current.fundingLimit,
        moneyType: value,
      },
    });
  };

  const onDescriptionOfTransactionsChange = (e) => {
    contextService.updateContext({
      ...contextRef.current,
      fundingLimit: {
        ...contextRef.current.fundingLimit,
        descriptionOfTransactions: e.target.value,
      },
    });
  };

  const onRequestARefundsChange = (e) => {
    contextService.updateContext({
      ...contextRef.current,
      fundingLimit: {
        ...contextRef.current.fundingLimit,
        requestARefund: e.target.checked,
      },
    });
  };

  //--------------------------------------//

  const submitHandler = async () => {
    contextService.updateContext({
      ...contextRef.current,
      loading: true,
    });
    var data = {
      bankId: contextRef.current.fundingLimit.bankId,
      typeLimit: contextRef.current.fundingLimit.typeLimit,
      contractNumberLimit: contextRef.current.fundingLimit.contractNumberLimit,
      dateRange: contextRef.current.fundingLimit.dateRange,
      expirationDate: contextRef.current.fundingLimit.expirationDate,
      moneyType: contextRef.current.fundingLimit.moneyType,
      descriptionOfTransactions:
        contextRef.current.fundingLimit.descriptionOfTransactions,
      requestARefund: contextRef.current.fundingLimit.requestARefund,
      totalLimit: contextRef.current.fundingLimit.totalLimit,
    };

    console.log(data);

    var config = {
      method: 'post',
      url:
        process.env.REACT_APP_API_BACKEND +
        '/financingLimit/sponsorBank/create',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('access_token') + '',
        'Content-Type': 'application/json',
      },
      data: data,
    };
    let response = await axios(config);

    contextService.updateContext({
      ...contextRef.current,
      loading: false,
    });
    if (response.data.code == 200) {
      message.success('Thêm mới thành công!');
      exitHandler();
    } else if (response.data.code !== 200) {
      message.error(response.data.message);
    }
  };

  const exitHandler = () => {
    history.push('/bm-home/funding-limit-management-funding-bank');
  };

  const domainInterface = useRef({
    initDomain,
    exitHandler,
    //----------------//
    onBankIdChange,
    onTypeLimitChange,
    onContractNumberLimitChange,
    onDateRangeChange,
    onExpirationDateChange,
    onTotalLimitChange,
    onMoneyTypeChange,
    onDescriptionOfTransactionsChange,
    onRequestARefundsChange,
    submitHandler,
  });
  return [context, domainInterface.current];
}

export default BM010601Domain;
