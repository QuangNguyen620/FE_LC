import { message } from 'antd';
import { useRef, useEffect } from 'react';
import { useHistory } from 'react-router';
import useMultiLanguage from 'core/hooks/UseMultiLanguage';
import useBM010601Service from '../services/BM010601ViewContextService';
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
      cancelDialogVisible: false,
      fundingLimit: {
        id: 0,
        financingLimitCode: '',
        typeLimit: '',
        contractNumberLimit: '',
        dateRange: '',
        expirationDate: '',
        moneyType: '',
        descriptionOfTransactions: '',
        requestARefund: false,
        totalZoningLimit: 0,
        totalCommitmentLimit: 0,
        totalDisbursementAmount: 0,
        totalRepaymentAmount: 0,
        availabilityLimit: 0,
        releaseBank: '',
        status: 0,
        totalLimit: 0,
        sponsorBank: '',
        financingLimitChangeHistoryList: [],
        financingLimitTransactionList: [],
        reasonForChangeFinancingLimit: '',
        reasonForRefusal: '',
      },
    };
    console.log('init domain');
    await contextService.initContext(contextData);
    console.log('get data');
  };

  const getDetail = (id) => {
    getFundingLimitDetail(id);
  };
  function formatCash(str) {
    return str
      .split('')
      .reverse()
      .reduce((prev, next, index) => {
        return (index % 3 ? next : next + ',') + prev;
      });
  }

  const getFundingLimitDetail = async (id) => {
    var config = {
      method: 'get',
      url:
        process.env.REACT_APP_API_BACKEND + '/financingLimit/view/' + id + '',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.access_token + '',
      },
      timeout: TIME_OUT,
    };
    let response = await axios(config);
    console.log(response.data.data);
    if (response?.data?.code == 200) {
      var data = response?.data?.data;

      var tempListHistory = [];

      if (data.financingLimitChangeHistoryList.length > 0) {
        data.financingLimitChangeHistoryList.forEach((element, index) => {
          var numberingChange = '';
          if (index == 0) {
            numberingChange = 'Tạo hạn mức';
          } else {
            numberingChange = 'Thay đổi lần ' + index;
          }

          var historyElement = {
            numberingChange: numberingChange,
            contractNumberLimit: element.contractNumberLimit,
            dateRange: convert(element.dateRange),
            expirationDate: convert(element.expirationDate),
            totalLimit: element.totalLimit,
          };
          tempListHistory.push(historyElement);
        });
      } else {
        tempListHistory = [];
      }

      contextService.updateContext({
        ...contextRef.current,
        fundingLimit: {
          ...contextRef.current.fundingLimit,
          id: data.id,
          financingLimitCode: data.financingLimitCode,
          typeLimit: data.typeLimit,
          contractNumberLimit: data.contractNumberLimit,
          dateRange: convert(data.dateRange),
          expirationDate: convert(data.expirationDate),
          moneyType: data.moneyType,
          descriptionOfTransactions: data.descriptionOfTransactions,
          requestARefund: data.requestARefund == true ? 'Có' : 'Không',
          totalZoningLimit: formatCash(data.totalZoningLimit + ''),
          totalCommitmentLimit: formatCash(data.totalCommitmentLimit + ''),
          totalDisbursementAmount: formatCash(
            data.totalDisbursementAmount + '',
          ),
          totalRepaymentAmount: formatCash(data.totalRepaymentAmount + ''),
          availabilityLimit: formatCash(data.availabilityLimit + ''),
          releaseBank: data.bankInfo.bankName,
          status: data.status,
          totalLimit: formatCash(data.totalLimit + ''),
          sponsorBank: data.sponsorBank,
          financingLimitChangeHistoryList: tempListHistory,
          financingLimitTransactionList: data.financingLimitTransactionList,
          reasonForChangeFinancingLimit: data.reasonForChangeFinancingLimit,
          reasonForRefusal: data.reasonForRefusal,
        },
      });
    }
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

  const limitCancel = async (id) => {
    var data = new FormData();
    data.append('id', id);

    var config = {
      method: 'post',
      url: process.env.REACT_APP_API_BACKEND + '/financingLimit/sponsorBank/delete',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('access_token') + '',
      },
      data: data,
    };

    let response = await axios(config);
    console.log(response);
    if (response.data.code == 200) {
      message.success('Hủy hạn mức thành thành công!');
      history.push(`/bm-home/funding-limit-management-funding-bank`);
      closeCancelModal();
    } else {
      message.error('Hủy hạn mức không hành thành công!');
      closeCancelModal();
    }
  };

  const cancelHandler = (id) => {
    limitCancel(id);
  };

  const exitHandler = () => {
    history.push('/bm-home/funding-limit-management-funding-bank');
  };

  const editHandler = (id) => {
    history.push(`/bm-home/funding-limit-management-funding-bank/edit/${id}`);
  };

  const domainInterface = useRef({
    initDomain,
    exitHandler,
    getDetail,
    cancelHandler,
    editHandler,
    openCancelModal,
    closeCancelModal, //----------------//
  });
  return [context, domainInterface.current];
}

export default BM010601Domain;
