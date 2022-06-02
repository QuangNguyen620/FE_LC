import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Col, Row, Avatar, Tooltip, Table, Input, Button } from 'antd';
import { Link } from 'react-router-dom';
import { EyeFilled, SearchOutlined } from '@ant-design/icons';

import '../components/less/AM.02.13.less';
import '../../../../../../assets/less/LC-common.less';
import { useA00Domain } from '../domains/AM.03.01.02.Domain';
import { KTTitle } from 'core/ui';
import { CSVLink } from 'react-csv';

var axios = require('axios');

const AM0213View = ({ lang = 'vi', ...props }) => {
  const { t } = useTranslation();
  const [, domain] = useA00Domain();
  const [filterModalVisible, setFilterVisible] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const handleVisibleChange = () => {
    if (filterModalVisible == true) {
      setFilterVisible(false);
    } else {
      setFilterVisible(true);
    }
  };

  function convert(str) {
    if (str != undefined && str != null && str != '') {
      var date = new Date(str),
        mnth = ('0' + (date.getMonth() + 1)).slice(-2),
        day = ('0' + date.getDate()).slice(-2);
      return [day, mnth, date.getFullYear()].join('/');
    } else {
      return '';
    }
  }

  const [list, setList] = useState([]);
  const dataSource = useRef();
  useEffect(() => {
    const fetchData = () => {
      var config = {
        method: 'get',
        url:
          process.env.REACT_APP_API_BACKEND + '/admin/fee/getAllBankFeeRules',
        headers: {
          Authorization:
            'Bearer ' + sessionStorage.getItem('access_token') + '',
          'Content-Type': 'application/json',
        },
      };

      axios(config)
        .then(function (response) {
          console.log(response.data.data);
          var tempList = [];
          var i = 1;
          response.data.data.forEach((element, index) => {
            var lastModifiedDate = '';
            var lastModifiedBy = '';
            var feeTransactionChannel = '';
            var status = '';
            var feeProcedure = '';
            if (element.createdDate !== element.lastModifiedDate) {
              lastModifiedDate = element.lastModifiedDate;
              lastModifiedBy = element.lastModifiedBy;
            }

            var feeRulesBaseStr = '';
            switch (element.feeRulesBase) {
              case 'transaction':
                feeRulesBaseStr = 'Giao dịch';
                break;
              case 'lc-value':
                feeRulesBaseStr = 'Giá trị L/C';
                break;
              case 'bank-ranking':
                feeRulesBaseStr = 'Xếp hạng ngân hàng';
                break;

              default:
                feeRulesBaseStr = '';
                break;
            }
            var feeRulesMethodStr = '';
            switch (element.feeRulesMethod) {
              case 'fixed-fee':
                feeRulesMethodStr = 'Phí cố định';
                break;
              case 'full-progressive-fee':
                feeRulesMethodStr = 'Phí lũy tiến toàn phần';
                break;

              default:
                feeRulesMethodStr = element.feeRulesMethod;
                break;
            }

            var feeRule = {
              stt: i++,
              id: element.feeRulesId,
              createdBy: element.createdBy,
              createdDate: convert(element.createdDate),
              feeCode: element.feeCode + '-' + element.feeName,
              feeFrequency: element.feeFrequency,
              feeId: element.feeId,
              feeProcedure:
                element.feeProcedure == 'periodic' ? 'Định kì' : 'Giao dịch',
              feeRulesApplyDateFrom: convert(element.feeRulesApplyDateFrom),
              feeRulesApplyDateTo: convert(element.feeRulesApplyDateTo),
              feeRulesBase: feeRulesBaseStr,
              feeRulesBaseValue: feeRulesBaseStr,
              feeRulesCode: element.feeRulesCode,
              feeRulesCurrency: element.feeRulesBaseValue,
              feeRulesDescription: element.feeRulesDescription,
              feeRulesMaxValue: element.feeRulesMaxValue,
              feeRulesMethod:
                element.feeRulesMethod == 'fixed-fee'
                  ? 'Phí cố định'
                  : 'Không tính phí',
              feeRulesMinValue: element.feeRulesMinValue,
              feeRulesName: element.feeRulesName,
              feeRulesRate: element.feeRulesRate,
              feeRulesRule: element.feeRulesRule,
              feeRulesTaxVat: element.feeRulesTaxVat == true ? 'Có' : 'Không',
              feeRulesValue: element.feeRulesValue,
              feeRulesVat: element.feeRulesVat,
              feeStatus: element.feeStatus,
              feeTransactionCode:
                element.feeTransactionCode + '-' + element.feeTransactionName,
              feeTransactionId: element.feeTransactionId,
              lastModifiedBy: lastModifiedBy,
              lastModifiedDate: convert(lastModifiedDate),
            };
            tempList.push(feeRule);
          });
          setList(tempList);
          dataSource.current = tempList;
          console.log(tempList);
        })
        .catch(function (error) {
          console.log('Lỗi ở đây đang là: ', error);
        });
    };

    fetchData();
  }, []);

  const columns = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
      render: (value, item, index) => (page - 1) * pageSize + index + 1,
    },
    {
      title: 'Mã loại phí',
      dataIndex: 'feeCode',
      key: 'feeCode',
      width: 300,
    },
    {
      title: 'Mã phí',
      dataIndex: 'feeRulesCode',
      key: 'feeRulesCode',
      // width: 400,
    },
    {
      title: 'Tên phí',
      dataIndex: 'feeRulesName',
      key: 'feeRulesName',
      width: 400,
    },
    {
      title: 'Mã giao dịch tính phí',
      dataIndex: 'feeTransactionCode',
      key: 'feeTransactionCode',
      width: 400,
    },
    {
      title: 'Giá trị tính phí',
      dataIndex: 'feeRulesBaseValue',
      key: 'feeRulesBaseValue',
      // width: 400,
    },
    {
      title: 'Loại tiền tệ',
      dataIndex: 'feeRulesCurrency',
      key: 'feeRulesCurrency',
      // width: 400,
    },
    {
      title: 'Ngày hiệu lực',
      dataIndex: 'feeRulesApplyDateFrom',
      key: 'feeRulesApplyDateFrom',
      // width: 400,
    },
    // {
    //   title: 'Ngày hết hiệu lực',
    //   dataIndex: 'feeRulesApplyDateTo',
    //   key: 'feeRulesApplyDateTo',
    //   // width: 400,
    // },
    {
      title: 'Mô tả',
      dataIndex: 'feeRulesDescription',
      key: 'feeRulesDescription',
      width: 500,
    },
    {
      title: 'Phương pháp tính phí',
      dataIndex: 'feeRulesMethod',
      key: 'feeRulesMethod',
      width: 400,
    },
    {
      title: 'Tính thuế GTGT',
      dataIndex: 'feeRulesTaxVat',
      key: 'feeRulesTaxVat',
      // width: 400,
    },
    {
      title: '%VAT',
      dataIndex: 'feeRulesVat',
      key: 'feeRulesVat',
      // width: 400,
    },
    {
      title: 'Người tạo',
      dataIndex: 'createdBy',
      key: 'createdBy',
      // width: 400,
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdDate',
      key: 'createdDate',
      // width: 400,
    },
    {
      title: 'Người sửa',
      dataIndex: 'lastModifiedBy',
      key: 'lastModifiedBy',
      // width: 400,
    },
    {
      title: 'Ngày sửa',
      dataIndex: 'lastModifiedDate',
      key: 'lastModifiedDate',
      // width: 400,
    },
    {
      title: 'Thao tác',
      dataIndex: 'activity',
      width: 130,
      key: 'x',
      render: (text, record, index) => (
        <Row className="item-center">
          <Tooltip placement="top" title={'Xem'}>
            <Link
              onClick={(e) => {
                domain.toViewPage(record.id);
                console.log("Record's key is :", record.id);
              }}
              className="activities-btn"
            >
              <Avatar
                size="small"
                icon={<EyeFilled className={'eye-filled'} />}
              />
            </Link>
          </Tooltip>
        </Row>
      ),
    },
  ];

  const headers = [
    { label: 'STT', key: 'stt' },
    { label: 'Mã loại phí', key: 'feeCode' },
    { label: 'Mã phí', key: 'feeRulesCode' },
    { label: 'Tên phí', key: 'feeRulesName' },
    { label: 'Mã giao dịch tính phí', key: 'feeTransactionCode' },
    { label: 'Giá trị tính phí', key: 'feeRulesBaseValue' },
    { label: 'Loại tiền tệ', key: 'feeRulesCurrency' },
    { label: 'Ngày hiệu lực', key: 'feeRulesApplyDateFrom' },
    { label: 'Ngày hết hiệu lực', key: 'feeRulesApplyDateTo' },
    { label: 'Mô tả', key: 'feeRulesDescription' },
    { label: 'Phương pháp tính phí', key: 'feeRulesMethod' },
    { label: 'Tính thuế GTGT', key: 'feeRulesTaxVat' },
    { label: 'Thuế GTGT', key: 'feeRulesVat' },
    { label: 'Người tạo', key: 'createdBy' },
    { label: 'Ngày tạo', key: 'createdDate' },
    { label: 'Người sửa', key: 'lastModifiedBy' },
    { label: 'Ngày sửa', key: 'lastModifiedDate' },
  ];

  const ExportReactCSV = ({ csvHeaders, csvData, fileName }) => {
    if (csvData) {
      return (
        <CSVLink headers={csvHeaders} data={csvData} filename={fileName}>
          <Button variant="success" className="common-btn">
            Tải xuống
          </Button>
        </CSVLink>
      );
    } else {
      return null;
    }
  };

  return (
    <>
      <div className={'main-container'}>
        <Row className="padding-md">
          <Col span={15}>
            <KTTitle size={2}>Quy tắc tính phí</KTTitle>
          </Col>

          <Col span={9}>
            <Row className={'input-search'}>
              <Input
                prefix={<SearchOutlined />}
                placeholder="Nhập mã loại phí, mã phí, tên phí,"
                onChange={(e) => {
                  const currValue = e.target.value;
                  const filteredData = dataSource.current.filter(
                    (entry) =>
                      entry?.feeCode
                        ?.toLowerCase()
                        .includes(currValue.toLowerCase()) ||
                      entry?.feeRulesCode
                        ?.toLowerCase()
                        .includes(currValue.toLowerCase()) ||
                      entry?.feeRulesName
                        ?.toLowerCase()
                        .includes(currValue.toLowerCase()),
                  );
                  setList(filteredData);
                }}
              />
              {/* <Button onClick={handleVisibleChange} id="filter-btn">
                Bộ lọc
              </Button> */}
            </Row>
          </Col>
        </Row>
        <Row className="padding-md">
          <Col span={12}></Col>

          <Col span={12}>
            <Row className={'marginR-md'}>
              <Button onClick={domain.toAddPage} className="common-btn">
                Thêm mới
              </Button>
              <ExportReactCSV
                csvHeaders={headers}
                csvData={list}
                fileName="Fee_Bank_Rules.csv"
              />
              {/* <Button className="common-btn">Tải xuống</Button> */}
            </Row>
          </Col>
        </Row>
        <Row className="padding-md">
          <Col>
            <Table
              columns={columns}
              dataSource={list}
              scroll={{ x: '100%' }}
              pagination={{
                onChange(current) {
                  setPage(current);
                },
                pageSize: pageSize,
              }}
            />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default AM0213View;
