import React from 'react';
import { message, Tag } from 'antd';
import { useEffect, useRef } from 'react';
import { useHistory } from 'react-router';
import BM010601ContextService from '../services/BM010601ContextService';

var axios = require('axios');

export function BM010601Domain() {
  const history = useHistory();
  const [context, contextService] = BM010601ContextService();
  const contextRef = useRef(context);
  const TIME_OUT = 300000;

  useEffect(() => {
    contextRef.current = context;
  }, [context]);

  const initDomain = async () => {
    var contextData = {
      list: [],
      filterModalVisible: false,
      constantValue: {
        bankList: [],
        currencyList: [],
        fundingLimitCodeList: [],
      },

      filterData: {
        bankId: null,
        typeLimit: null,
        moneyType: null,
        financingLimitCode: null,
        status: null,
        dateRangeFrom: null,
        expirationDateTo: null,
      },
    };
    contextService.initContext(contextData);
    await getSearchResult();
    await getBankList();
    await getCurrencyOptions();
  };

  function formatCash(str) {
    return str
      .split('')
      .reverse()
      .reduce((prev, next, index) => {
        return (index % 3 ? next : next + ',') + prev;
      });
  }

  function convert(str) {
    var date = new Date(str),
      mnth = ('0' + (date.getMonth() + 1)).slice(-2),
      day = ('0' + date.getDate()).slice(-2);
    return [day, mnth, date.getFullYear()].join('/');
  }

  const getBankList = async () => {
    var config = {
      method: 'get',
      url: process.env.REACT_APP_API_BACKEND + '/bank/bankinfo/getAll',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.access_token + '',
      },
      timeout: TIME_OUT,
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

  const getSearchResult = async () => {
    var bankId = contextRef?.current?.filterData?.bankId;
    var typeLimit = contextRef?.current?.filterData?.typeLimit;
    var moneyType = contextRef?.current?.filterData?.moneyType;
    var financingLimitCode =
      contextRef?.current?.filterData?.financingLimitCode;
    var status = contextRef?.current?.filterData?.status;
    var dateRangeFrom = contextRef?.current?.filterData?.dateRangeFrom;
    var expirationDateTo = contextRef?.current?.filterData?.expirationDateTo;

    getFundingLimitSponsorBankList(
      bankId,
      typeLimit,
      moneyType,
      financingLimitCode,
      status,
      dateRangeFrom,
      expirationDateTo,
    );
  };

  const getFundingLimitSponsorBankList = async (
    bankId,
    typeLimit,
    moneyType,
    financingLimitCode,
    status,
    dateRangeFrom,
    expirationDateTo,
  ) => {
    var data = {
      bankId: bankId,
      typeLimit: typeLimit,
      moneyType: moneyType,
      financingLimitCode: financingLimitCode,
      status: status,
      dateRangeFrom: dateRangeFrom,
      expirationDateTo: expirationDateTo,
    };
    var config = {
      method: 'post',
      url:
        process.env.REACT_APP_API_BACKEND +
        '/financingLimit/sponsorBank/search',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('access_token') + '',
        'Content-Type': 'application/json',
      },
      data: data,
    };
    console.log(data);
    let response = await axios(config);
    console.log(response.data.data);
    if (response.data.data == null || response.data.data == undefined) {
      message.error('Không có dữ liệu');
    } else {
      var tempList = [];
      var tempFundingLimitCodeList = [];

      if (response.data.data.length > 0) {
        response.data.data.forEach((element) => {
          var statusString = '';
          switch (element.status) {
            case 1:
              statusString = (
                <Tag color="yellow" className="custom-tag custom-tag-yellow">
                  Chờ duyệt
                </Tag>
              );
              break;

            case 2:
              statusString = (
                <Tag className="custom-tag custom-tag-green">Đã duyệt</Tag>
              );
              break;

            case 3:
              statusString = (
                <Tag color="error" className="custom-tag custom-tag-red">
                  Từ chối duyệt
                </Tag>
              );
              break;

            default:
              statusString = '';
              break;
          }

          var fundingLimit = {
            id: element.id,
            financingLimitCode: element.financingLimitCode,
            typeLimit: element.typeLimit,
            releaseBank: element.bankInfo.bankName,
            moneyType: element.moneyType,
            totalLimit: formatCash(element.totalLimit.toString()),
            totalZoningLimit: formatCash(element.totalZoningLimit.toString()),
            totalCommitmentLimit: formatCash(
              element.totalCommitmentLimit.toString(),
            ),
            totalRepaymentAmount: formatCash(
              element.totalRepaymentAmount.toString(),
            ),
            availabilityLimit: formatCash(element.availabilityLimit.toString()),
            dateRange: convert(element.dateRange),
            expirationDate: convert(element.expirationDate),
            statusString: statusString,
            status: element.status,
            createdDate: '',
            createdBy: '',
            approvedBy: '',
          };
          tempList.push(fundingLimit);

          var fundingLimitCode = element.financingLimitCode;
          tempFundingLimitCodeList.push(fundingLimitCode);
        });
      }

      console.log(tempList);
      contextService.updateContext({
        ...contextRef.current,
        list: tempList,
        constantValue: {
          ...contextRef.current.constantValue,
          fundingLimitCodeList: tempFundingLimitCodeList,
        },
      });
    }
  };

  const toAddPage = async (id) => {
    history.push(`/bm-home/funding-limit-management-funding-bank/add`);
  };

  const toViewPage = async (id) => {
    history.push(`/bm-home/funding-limit-management-funding-bank/view/${id}`);
  };

  const domainInterface = useRef({
    initDomain,
    toAddPage,
    toViewPage,
  });
  return [context, domainInterface.current];
}

export default BM010601Domain;
