import React from 'react';
import { message, Tag } from 'antd';
import { useEffect, useRef } from 'react';
import { useHistory } from 'react-router';
import CM07Service from '../services/CM.07Service';
import moment from 'moment';

var axios = require('axios');

export function CM1602Domain() {
  const history = useHistory();
  const [context, contextService] = CM07Service();
  const contextRef = useRef(context);

  function convert(str) {
    var date = new Date(str),
      mnth = ('0' + (date.getMonth() + 1)).slice(-2),
      day = ('0' + date.getDate()).slice(-2);
    return [day, mnth, date.getFullYear()].join('/');
  }

  function formatCash(str) {
    return str
      .split('')
      .reverse()
      .reduce((prev, next, index) => {
        return (index % 3 ? next : next + ',') + prev;
      });
  }

  useEffect(() => {
    contextRef.current = context;
  }, [context]);

  // const [list, setList] = useState([]);

  const initDomain = async () => {
    var contextData = {
      list: [],
      deleteSuccessfulDialogVisible: false,
      filterModalVisible: false,
      bankList: [],
      corporateList: [],

      filterData: {
        bankId: null,
        proposalCodeRelease: null,
        status: null,
        timeFrom: null,
        timeTo: null,
        valueFrom: null,
        valueTo: null,
        corporateSellId: null,
      },
    };
    contextService.initContext(contextData);
    getSearchResult();
    getAllBankList();
    getAllCorporate();
  };

  const getSearchResult = () => {
    var bankId = contextRef?.current?.filterData?.bankId;
    var proposalCodeRelease =
      contextRef?.current?.filterData?.proposalCodeRelease;
    var status = contextRef?.current?.filterData?.status;
    var timeFrom = contextRef?.current?.filterData?.timeFrom;
    var timeTo = contextRef?.current?.filterData?.timeTo;
    var valueFrom = contextRef?.current?.filterData?.valueFrom;
    var valueTo = contextRef?.current?.filterData?.valueTo;
    var corporateSellId = contextRef?.current?.filterData?.corporateSellId;

    getLCApplicationRequest(
      bankId,
      proposalCodeRelease,
      status,
      timeFrom,
      timeTo,
      valueFrom,
      valueTo,
      corporateSellId,
    );
  };

  const resetFilter = (form) => {
    form.resetFields();
    var bankId = null;
    var proposalCodeRelease = null;
    var status = null;
    var timeFrom = null;
    var timeTo = null;
    var valueFrom = null;
    var valueTo = null;
    var corporateSellId = null;

    getLCApplicationRequest(
      bankId,
      proposalCodeRelease,
      status,
      timeFrom,
      timeTo,
      valueFrom,
      valueTo,
      corporateSellId,
    );
    contextService.updateContext({
      ...contextRef.current,
      filterData: {
        ...contextRef.current.filterData,
        bankId: null,
        proposalCodeRelease: null,
        status: null,
        timeFrom: null,
        timeTo: null,
        valueFrom: null,
        valueTo: null,
        corporateSellId: null,
      },
    });
  };

  const deleteByID = (id) => {
    var data = new FormData();
    data.append('id', id);
    deleteApplicationOpeningLc(data);
  };

  const deleteApplicationOpeningLc = async (data) => {
    var config = {
      method: 'post',
      url:
        process.env.REACT_APP_API_BACKEND +
        '/corporate/deleteApplicationOpeningLc',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('access_token') + '',
      },
      data: data,
    };

    let response = await axios(config);
    if (response.status == 200 && response.data == '') {
      getLCApplicationRequest();
      contextService.updateContext({
        ...contextRef.current,
        deleteSuccessfulDialogVisible: true,
      });
    }
  };

  const closeDeleteModal = () => {
    contextService.updateContext({
      ...contextRef.current,
      deleteSuccessfulDialogVisible: false,
    });
  };

  const getLCApplicationRequest = async (
    bankId,
    proposalCodeRelease,
    status,
    timeFrom,
    timeTo,
    valueFrom,
    valueTo,
    corporateSellId,
  ) => {
    var data = {
      bankId: bankId,
      proposalCodeRelease: proposalCodeRelease,
      status: status,
      timeFrom: timeFrom,
      timeTo: timeTo,
      valueFrom: valueFrom,
      valueTo: valueTo,
      corporateSellId: corporateSellId,
    };
    var config = {
      method: 'post',
      url:
        process.env.REACT_APP_API_BACKEND +
        '/corporate/searchApplicationOpeningLc',
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
      // localStorage.corporateId
      response.data.data.forEach((element) => {
        console.log('element');

        var statusStr = '';
        var lcTypeStr = '';
        switch (element.status) {
          case 1:
            statusStr = (
              <Tag color="blue" className="tag-table">
                Khởi tạo
              </Tag>
            );
            break;
          case 2:
            statusStr = (
              <Tag color="yellow" className="tag-table">
                Chờ ký số kế toán trưởng
              </Tag>
            );
            break;
          case 3:
            statusStr = (
              <Tag color="yellow" className="tag-table">
                Chờ ký doanh nghiệp
              </Tag>
            );
            break;
          case 4:
            statusStr = (
              <Tag color="green" className="tag-table">
                Đã ký số
              </Tag>
            );
            break;
          case 5:
            statusStr = (
              <Tag color="red" className="tag-table">
                Từ chối ký số
              </Tag>
            );
            break;
          case 6:
            statusStr = (
              <Tag color="red" className="tag-table">
                Từ chối xử lý
              </Tag>
            );
            break;
          case 7:
            statusStr = (
              <Tag color="green" className="tag-table">
                Đã xử lý
              </Tag>
            );
            break;
          case 8:
            statusStr = (
              <Tag color="yellow" className="tag-table">
                Chờ xác nhận Draft
              </Tag>
            );
            break;
          case 9:
            statusStr = (
              <Tag color="red" className="tag-table">
                Từ chối Draft
              </Tag>
            );
            break;
          case 10:
            statusStr = (
              <Tag color="yellow" className="tag-table">
                Chờ xác nhận tài trợ
              </Tag>
            );
            break;
          case 11:
            statusStr = (
              <Tag color="red" className="tag-table">
                Từ chối tài trợ
              </Tag>
            );
            break;
          case 12:
            statusStr = (
              <Tag color="red" className="tag-table">
                Từ chối báo giá
              </Tag>
            );
            break;
          case 13:
            statusStr = (
              <Tag color="green" className="tag-table">
                Chấp nhận báo giá
              </Tag>
            );
            break;
          case 14:
            statusStr = (
              <Tag color="red" className="tag-table">
                Hủy
              </Tag>
            );
            break;
          default:
            statusStr = '';
            break;
        }

        switch (element.lcType) {
          case '1':
            lcTypeStr = 'L/C thông thường';
            break;
          case '2':
            lcTypeStr = 'UPAS L/C';
            break;
          default:
            lcTypeStr = '';
            break;
        }

        var lcRequest = {
          id: element.id,
          proposalCodeRelease: element.proposalCodeRelease,
          lcType: lcTypeStr,
          bankConfirm: element.bankInfo.bankName,
          corporateSell: element.corporateSell.corporateName,
          moneyType: element.moneyType,
          lcValue: formatCash(element.valueLc.toString()),
          createdDate: convert(element.createdDate),
          status: statusStr,
        };

        tempList.push(lcRequest);
      });
      console.log(tempList);
      contextService.updateContext({
        ...contextRef.current,
        list: tempList,
      });
    }
  };

  const bankIdChange = (value) => {
    console.log(value);
    contextService.updateContext({
      ...contextRef.current,
      filterData: {
        ...contextRef.current.filterData,
        bankId: value,
      },
    });
  };

  const proposalCodeReleaseChange = (event) => {
    contextService.updateContext({
      ...contextRef.current,
      filterData: {
        ...contextRef.current.filterData,
        proposalCodeRelease: event.target.value,
      },
    });
  };

  const statusChange = (event) => {
    contextService.updateContext({
      ...contextRef.current,
      filterData: {
        ...contextRef.current.filterData,
        status: event,
      },
    });
  };

  const timeFromChange = (event) => {
    contextService.updateContext({
      ...contextRef.current,
      filterData: {
        ...contextRef.current.filterData,
        timeFrom: convert(event._d),
      },
    });
  };

  const timeToChange = (event) => {
    contextService.updateContext({
      ...contextRef.current,
      filterData: {
        ...contextRef.current.filterData,
        timeTo: convert(event._d),
      },
    });
  };

  const valueFromChange = (event) => {
    contextService.updateContext({
      ...contextRef.current,
      filterData: {
        ...contextRef.current.filterData,
        valueFrom: event,
      },
    });
  };

  const valueToChange = (event) => {
    contextService.updateContext({
      ...contextRef.current,
      filterData: {
        ...contextRef.current.filterData,
        valueTo: event,
      },
    });
  };

  const corporateSellChange = (value) => {
    contextService.updateContext({
      ...contextRef.current,
      filterData: {
        ...contextRef.current.filterData,
        corporateSellId: value,
      },
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
    };

    let response = await axios(config);
    console.log('List bank response');
    console.log(response.data.data);
    contextService.updateContext({
      ...contextRef.current,
      bankList: response.data.data,
    });
  };

  const getAllCorporate = async () => {
    console.log('Thằng này chạy thứ 2');
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
      corporateList: response.data.data,
    });
    // return response;
  };

  const toViewPage = (id) => {
    history.push(`/cm-home/lc-request-manage/view/${id}`);
  };

  const toAddPage = async (id) => {
    history.push(`/cm-home/lc-request-manage/add`);
  };

  const domainInterface = useRef({
    initDomain,
    toAddPage,
    getLCApplicationRequest,
    getSearchResult,
    bankIdChange,
    proposalCodeReleaseChange,
    statusChange,
    timeFromChange,
    timeToChange,
    corporateSellChange,
    valueToChange,
    valueFromChange,
    deleteByID,
    closeDeleteModal,
    resetFilter,
    toViewPage,
  });
  return [context, domainInterface.current];
}

export default CM1602Domain;
