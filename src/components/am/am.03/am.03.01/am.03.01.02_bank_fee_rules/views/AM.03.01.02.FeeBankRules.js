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
                feeRulesBaseStr = 'Giao d???ch';
                break;
              case 'lc-value':
                feeRulesBaseStr = 'Gi?? tr??? L/C';
                break;
              case 'bank-ranking':
                feeRulesBaseStr = 'X???p h???ng ng??n h??ng';
                break;

              default:
                feeRulesBaseStr = '';
                break;
            }
            var feeRulesMethodStr = '';
            switch (element.feeRulesMethod) {
              case 'fixed-fee':
                feeRulesMethodStr = 'Ph?? c??? ?????nh';
                break;
              case 'full-progressive-fee':
                feeRulesMethodStr = 'Ph?? l??y ti???n to??n ph???n';
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
                element.feeProcedure == 'periodic' ? '?????nh k??' : 'Giao d???ch',
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
                  ? 'Ph?? c??? ?????nh'
                  : 'Kh??ng t??nh ph??',
              feeRulesMinValue: element.feeRulesMinValue,
              feeRulesName: element.feeRulesName,
              feeRulesRate: element.feeRulesRate,
              feeRulesRule: element.feeRulesRule,
              feeRulesTaxVat: element.feeRulesTaxVat == true ? 'C??' : 'Kh??ng',
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
          console.log('L???i ??? ????y ??ang l??: ', error);
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
      title: 'M?? lo???i ph??',
      dataIndex: 'feeCode',
      key: 'feeCode',
      width: 300,
    },
    {
      title: 'M?? ph??',
      dataIndex: 'feeRulesCode',
      key: 'feeRulesCode',
      // width: 400,
    },
    {
      title: 'T??n ph??',
      dataIndex: 'feeRulesName',
      key: 'feeRulesName',
      width: 400,
    },
    {
      title: 'M?? giao d???ch t??nh ph??',
      dataIndex: 'feeTransactionCode',
      key: 'feeTransactionCode',
      width: 400,
    },
    {
      title: 'Gi?? tr??? t??nh ph??',
      dataIndex: 'feeRulesBaseValue',
      key: 'feeRulesBaseValue',
      // width: 400,
    },
    {
      title: 'Lo???i ti???n t???',
      dataIndex: 'feeRulesCurrency',
      key: 'feeRulesCurrency',
      // width: 400,
    },
    {
      title: 'Ng??y hi???u l???c',
      dataIndex: 'feeRulesApplyDateFrom',
      key: 'feeRulesApplyDateFrom',
      // width: 400,
    },
    // {
    //   title: 'Ng??y h???t hi???u l???c',
    //   dataIndex: 'feeRulesApplyDateTo',
    //   key: 'feeRulesApplyDateTo',
    //   // width: 400,
    // },
    {
      title: 'M?? t???',
      dataIndex: 'feeRulesDescription',
      key: 'feeRulesDescription',
      width: 500,
    },
    {
      title: 'Ph????ng ph??p t??nh ph??',
      dataIndex: 'feeRulesMethod',
      key: 'feeRulesMethod',
      width: 400,
    },
    {
      title: 'T??nh thu??? GTGT',
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
      title: 'Ng?????i t???o',
      dataIndex: 'createdBy',
      key: 'createdBy',
      // width: 400,
    },
    {
      title: 'Ng??y t???o',
      dataIndex: 'createdDate',
      key: 'createdDate',
      // width: 400,
    },
    {
      title: 'Ng?????i s???a',
      dataIndex: 'lastModifiedBy',
      key: 'lastModifiedBy',
      // width: 400,
    },
    {
      title: 'Ng??y s???a',
      dataIndex: 'lastModifiedDate',
      key: 'lastModifiedDate',
      // width: 400,
    },
    {
      title: 'Thao t??c',
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
    { label: 'M?? lo???i ph??', key: 'feeCode' },
    { label: 'M?? ph??', key: 'feeRulesCode' },
    { label: 'T??n ph??', key: 'feeRulesName' },
    { label: 'M?? giao d???ch t??nh ph??', key: 'feeTransactionCode' },
    { label: 'Gi?? tr??? t??nh ph??', key: 'feeRulesBaseValue' },
    { label: 'Lo???i ti???n t???', key: 'feeRulesCurrency' },
    { label: 'Ng??y hi???u l???c', key: 'feeRulesApplyDateFrom' },
    { label: 'Ng??y h???t hi???u l???c', key: 'feeRulesApplyDateTo' },
    { label: 'M?? t???', key: 'feeRulesDescription' },
    { label: 'Ph????ng ph??p t??nh ph??', key: 'feeRulesMethod' },
    { label: 'T??nh thu??? GTGT', key: 'feeRulesTaxVat' },
    { label: 'Thu??? GTGT', key: 'feeRulesVat' },
    { label: 'Ng?????i t???o', key: 'createdBy' },
    { label: 'Ng??y t???o', key: 'createdDate' },
    { label: 'Ng?????i s???a', key: 'lastModifiedBy' },
    { label: 'Ng??y s???a', key: 'lastModifiedDate' },
  ];

  const ExportReactCSV = ({ csvHeaders, csvData, fileName }) => {
    if (csvData) {
      return (
        <CSVLink headers={csvHeaders} data={csvData} filename={fileName}>
          <Button variant="success" className="common-btn">
            T???i xu???ng
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
            <KTTitle size={2}>Quy t???c t??nh ph??</KTTitle>
          </Col>

          <Col span={9}>
            <Row className={'input-search'}>
              <Input
                prefix={<SearchOutlined />}
                placeholder="Nh???p m?? lo???i ph??, m?? ph??, t??n ph??,"
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
                B??? l???c
              </Button> */}
            </Row>
          </Col>
        </Row>
        <Row className="padding-md">
          <Col span={12}></Col>

          <Col span={12}>
            <Row className={'marginR-md'}>
              <Button onClick={domain.toAddPage} className="common-btn">
                Th??m m???i
              </Button>
              <ExportReactCSV
                csvHeaders={headers}
                csvData={list}
                fileName="Fee_Bank_Rules.csv"
              />
              {/* <Button className="common-btn">T???i xu???ng</Button> */}
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
