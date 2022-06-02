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
              channelInit = 'Doanh nghiệp';
            } else if (element.channelInit == 'FPT') {
              channelInit = 'FPT quản trị';
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
      width: '5%',
      render: (value, item, index) => (page - 1) * pageSize + (index + 1),
    },

    {
      title: 'Mã doanh nghiệp',
      dataIndex: 'corporateCode',
      key: 'corporateCode',
      width: '15%',
    },
    {
      title: 'Tên doanh nghiệp',
      dataIndex: 'corporateName',
      key: 'corporateName',
      width: '15%',
    },
    {
      title: 'Kênh khởi tạo',
      dataIndex: 'channelInit',
      key: 'channelInit',
      width: '8%',
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdDate',
      key: 'createdDate',
      width: '8%',
    },
    {
      title: 'Người tạo',
      dataIndex: 'createdBy',
      key: 'createdBy',
      width: '8%',
    },

    {
      title: 'Ngày sửa',
      dataIndex: 'lastModifiedDate',
      key: 'lastModifiedDate',
      width: '8%',
    },
    {
      title: 'Người sửa',
      dataIndex: 'lastModifiedBy',
      key: 'lastModifiedBy',
      width: '8%',
    },
    {
      title: 'Thao tác',
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
    { label: 'Mã doanh nghiệp', key: 'corporateCode' },
    { label: 'Tên doanh nghiệp', key: 'corporateName' },
    { label: 'Kênh khởi tạo', key: 'channelInit' },
    { label: 'Ngày tạo', key: 'createdDate' },
    { label: 'Người tạo', key: 'createdBy' },
    { label: 'Ngày sửa', key: 'lastModifiedDate' },
    { label: 'Người sửa', key: 'lastModifiedBy' },
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
        <Row className={'padding-md'}>
          <Col span={15}>
            <KTTitle size={2}>Quản lý khách hàng Doanh nghiệp</KTTitle>
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
                placeholder="Nhập mã doanh nghiệp, Tên doanh nghiệp ..."
              />
              {/* <Button onClick={handleVisibleChange} id="filter-btn">
                Bộ lọc
              </Button> */}
            </Row>
          </Col>
        </Row>
        <Row className={'padding-md'}>
          <Col span={12}></Col>

          <Col span={12}>
            <Row className={'marginR-md'}>
              <Button onClick={domain.toUploadAddPage} className="common-btn">
                Thêm mới
              </Button>
              <ExportReactCSV
                csvHeaders={headers}
                csvData={list}
                fileName="Group_Corporate.csv"
              />
              {/* <Button className="common-btn">Tải xuống</Button> */}
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
