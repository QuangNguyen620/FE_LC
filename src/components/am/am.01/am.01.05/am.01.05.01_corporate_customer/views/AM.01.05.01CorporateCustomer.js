import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Col,
  Row,
  Avatar,
  Tooltip,
  Table,
  Input,
  Button,
  Modal,
  Form,
  DatePicker,
} from 'antd';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { EyeFilled, SearchOutlined } from '@ant-design/icons';

import '../common/less/AM.01.05.01.less';
import '../../../../../../assets/less/LC-common.less';

import { useA00Domain } from '../domains/AM.01.05.01Domain';
import { KTTitle } from 'core/ui';
import { CSVLink } from 'react-csv';

var axios = require('axios');

const AM010501CorporateCustomer = ({ lang = 'vi', ...props }) => {
  const { t } = useTranslation();
  const [, domain] = useA00Domain();
  const [filterModalVisible, setFilterVisible] = useState(false);
  const dateFormatList = 'DD/MM/YYYY';
  const [page, setPage] = React.useState(1);
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

  const dataSource = useRef();
  const [list, setList] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      var config = {
        method: 'get',
        url: process.env.REACT_APP_API_BACKEND + '/corporate/getAll',
        headers: {
          Authorization:
            'Bearer ' + sessionStorage.getItem('access_token') + '',
          'Content-Type': 'application/json',
        },
      };

      axios(config)
        .then(function (response) {
          var tempArr = [];
          var i = 1;
          response.data.data.forEach((element) => {
            var lastModifiedDate = '';
            var lastModifiedBy = '';
            if (element.createdDate !== element.lastModifiedDate) {
              lastModifiedDate = element.lastModifiedDate;
              lastModifiedBy = element.lastModifiedBy;
            }
            var channelInit = '';
            if (element.channelInit == 'Corporate') {
              channelInit = 'Doanh nghi???p';
            } else if (element.channelInit == 'FPT') {
              channelInit = 'FPT qu???n tr???';
            } else {
              channelInit = element.channelInit;
            }
            var corporate = {
              stt: i++,
              corporateId: element.corporateId,
              corporateCode: element.corporateCode,
              corporateName: element.corporateName,
              channelInit: channelInit,
              createdDate: convert(element.createdDate),
              createdBy: element.createdBy,
              lastModifiedDate: convert(lastModifiedDate),
              lastModifiedBy: lastModifiedBy,
            };
            tempArr.push(corporate);
          });
          setList(tempArr);
          dataSource.current = tempArr;
          console.log(response);
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
      width: '5%',
      render: (value, item, index) => (page - 1) * pageSize + (index + 1),
    },

    {
      title: 'M?? doanh nghi???p',
      dataIndex: 'corporateCode',
      key: 'corporateCode',
      width: '15%',
    },
    {
      title: 'T??n doanh nghi???p',
      dataIndex: 'corporateName',
      key: 'corporateName',
      width: '15%',
    },
    {
      title: 'K??nh kh???i t???o',
      dataIndex: 'channelInit',
      key: 'channelInit',
      width: '8%',
    },
    {
      title: 'Ng??y t???o',
      dataIndex: 'createdDate',
      key: 'createdDate',
      width: '8%',
    },
    {
      title: 'Ng?????i t???o',
      dataIndex: 'createdBy',
      key: 'createdBy',
      width: '8%',
    },

    {
      title: 'Ng??y s???a',
      dataIndex: 'lastModifiedDate',
      key: 'lastModifiedDate',
      width: '8%',
    },
    {
      title: 'Ng?????i s???a',
      dataIndex: 'lastModifiedBy',
      key: 'lastModifiedBy',
      width: '8%',
    },
    {
      title: 'Thao t??c',
      dataIndex: 'activity',

      key: 'x',
      width: '5%',
      render: (text, record, index) => (
        <Row className="item-center">
          <Tooltip placement="top" title={'Xem'}>
            <Link
              onClick={(e) => {
                domain.toViewPage(record.corporateId);
                console.log("Record's key is :", record);
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
    { label: 'M?? doanh nghi???p', key: 'corporateCode' },
    { label: 'T??n doanh nghi???p', key: 'corporateName' },
    { label: 'K??nh kh???i t???o', key: 'channelInit' },
    { label: 'Ng??y t???o', key: 'createdDate' },
    { label: 'Ng?????i t???o', key: 'createdBy' },
    { label: 'Ng??y s???a', key: 'lastModifiedDate' },
    { label: 'Ng?????i s???a', key: 'lastModifiedBy' },
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
        <Row className={'padding-md'}>
          <Col span={15}>
            <KTTitle size={2}>Qu???n l?? kh??ch h??ng Doanh nghi???p</KTTitle>
          </Col>

          <Col span={9}>
            <Row className={'input-search'}>
              <Input
                prefix={<SearchOutlined />}
                onChange={(e) => {
                  const currValue = e.target.value;
                  const filteredData = dataSource.current.filter(
                    (entry) =>
                      entry?.corporateCode
                        ?.toLowerCase()
                        .includes(currValue?.toLowerCase()) ||
                      entry?.corporateName
                        ?.toLowerCase()
                        .includes(currValue?.toLowerCase()) ||
                      entry?.channelInit
                        ?.toLowerCase()
                        .includes(currValue?.toLowerCase()),
                  );
                  setPage(1);
                  setList(filteredData);
                }}
                placeholder="Nh???p m?? doanh nghi???p, T??n doanh nghi???p ..."
              />
              {/* <Button onClick={handleVisibleChange} id="filter-btn">
                B??? l???c
              </Button> */}
            </Row>
          </Col>
        </Row>
        <Row className={'padding-md'}>
          <Col span={12}></Col>

          <Col span={12}>
            <Row className={'marginR-md'}>
              <Button onClick={domain.toUploadAddPage} className="common-btn">
                Th??m m???i
              </Button>
              <ExportReactCSV
                csvHeaders={headers}
                csvData={list}
                fileName="Group_Corporate.csv"
              />
              {/* <Button className="common-btn">T???i xu???ng</Button> */}
            </Row>
          </Col>
        </Row>
        <Row className="padding-md">
          <Col span={24}>
            <Table
              bordered
              columns={columns}
              dataSource={list}
              pagination={{
                onChange(current) {
                  setPage(current);
                },
                pageSize: pageSize,
                current: page,
              }}
              scroll={{ x: 'max-content' }}
            />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default AM010501CorporateCustomer;
