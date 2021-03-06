import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Col, Row, Avatar, Tooltip, Table, Input, Button } from 'antd';
import { Link } from 'react-router-dom';
import { EyeFilled, SearchOutlined } from '@ant-design/icons';

import '../common/less/AM.02.13.less';
import '../../../../../assets/less/LC-common.less';
import { useA00Domain } from '../domains/AM.01.04.01Domain';
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
          process.env.REACT_APP_API_BACKEND +
          '/admin/fee/getAllBankFeeTransaction',
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
            if (element.createdDate !== element.lastModifiedDate) {
              lastModifiedDate = element.lastModifiedDate;
              lastModifiedBy = element.lastModifiedBy;
            }

            if (element.feeTransactionChannel.toLowerCase() == 'bank') {
              feeTransactionChannel = 'Ng??n h??ng';
            } else {
              feeTransactionChannel = 'Doanh nghi???p';
            }

            if (element.feeTransactionStatus == '1') {
              status = 'Ho???t ?????ng';
            } else {
              status = 'Ng???ng ho???t ?????ng';
            }

            var transaction = {
              stt: i++,
              id: element.feeTransactionId,
              feeTransactionCode: element.feeTransactionCode,
              feeTransactionName: element.feeTransactionName,
              feeTransactionChannel: feeTransactionChannel,
              feeTransactionStatus: status,
              createdBy: element.createdBy,
              createdDate: convert(element.createdDate),
              lastModifiedBy: lastModifiedBy,
              lastModifiedDate: convert(lastModifiedDate),
            };
            tempList.push(transaction);
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
      title: 'M?? lo???i giao d???ch',
      dataIndex: 'feeTransactionCode',
      key: 'feeTransactionCode',
    },
    {
      title: 'T??n lo???i giao d???ch',
      dataIndex: 'feeTransactionName',
      key: 'feeTransactionName',
    },
    {
      title: 'Ph??n lo???i k??nh',
      dataIndex: 'feeTransactionChannel',
      key: 'feeTransactionChannel',
    },

    {
      title: 'Tr???ng th??i',
      dataIndex: 'feeTransactionStatus',
      key: 'feeTransactionStatus',
    },
    {
      title: 'Ng?????i t???o',
      dataIndex: 'createdBy',
      key: 'createdBy',
    },
    {
      title: 'Ng??y t???o',
      dataIndex: 'createdDate',
      key: 'createdDate',
    },
    {
      title: 'Ng?????i s???a',
      dataIndex: 'lastModifiedBy',
      key: 'lastModifiedBy',
    },
    {
      title: 'Ng??y s???a',
      dataIndex: 'lastModifiedDate',
      key: 'lastModifiedDate',
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
    { label: 'M?? lo???i giao d???ch', key: 'feeTransactionCode' },
    { label: 'T??n lo???i giao d???ch', key: 'feeTransactionName' },
    { label: 'Ph??n lo???i k??nh', key: 'feeTransactionChannel' },
    { label: 'Tr???ng th??i', key: 'feeTransactionStatus' },
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
            <KTTitle size={2}>Danh m???c lo???i giao d???ch t??nh ph??</KTTitle>
          </Col>

          <Col span={9}>
            <Row className={'input-search'}>
              <Input
                prefix={<SearchOutlined />}
                placeholder="Nh???p m?? lo???i giao d???ch, t??n lo???i giao d???ch"
                onChange={(e) => {
                  const currValue = e.target.value;
                  const filteredData = dataSource.current.filter(
                    (entry) =>
                      entry?.feeTransactionCode
                        ?.toLowerCase()
                        .includes(currValue.toLowerCase()) ||
                      entry?.feeTransactionName
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
                fileName="Fee_Transation_Category.csv"
              />
              {/* <Button className="common-btn">T???i xu???ng</Button> */}
            </Row>
          </Col>
        </Row>
        <Row className="padding-md">
          <Col span={24}>
            <Table
              columns={columns}
              dataSource={list}
              scroll={{ x: 300 }}
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
