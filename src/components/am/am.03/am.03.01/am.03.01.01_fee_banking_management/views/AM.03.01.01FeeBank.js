import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Col, Row, Avatar, Tooltip, Table, Input, Button } from 'antd';
import { Link } from 'react-router-dom';
import { EyeFilled, SearchOutlined } from '@ant-design/icons';

import '../common/less/AM.03.01.01.less';
import '../../../../../../assets/less/LC-common.less';

import { useA00Domain } from '../domains/AM.03.01.01Domain';
import { KTTitle } from 'core/ui';
import { CSVLink } from 'react-csv';

var axios = require('axios');

const AM030101FeeBankView = ({ lang = 'vi', ...props }) => {
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
        url: process.env.REACT_APP_API_BACKEND + '/admin/fee/getAllBankFee',
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
            var feeProcedure = '';
            var feeFrequency = '';
            var feeApply = '';
            var lastModifiedDate = '';
            var lastModifiedBy = '';

            if (element.createdDate !== element.lastModifiedDate) {
              lastModifiedDate = element.lastModifiedDate;
              lastModifiedBy = element.lastModifiedBy;
            }

            switch (element.feeProcedure) {
              case 'periodic':
                feeProcedure = 'Định kỳ';
                break;
              case 'by-service':
                feeProcedure = 'Giao dịch';
                break;
              default:
                feeProcedure = '';
                break;
            }

            switch (element.feeFrequency) {
              case 'month':
                feeFrequency = 'Tháng';
                break;
              case 'quarter':
                feeFrequency = 'Quý';
                break;
              case 'half-year':
                feeFrequency = 'Nửa năm';
                break;
              case 'year':
                feeFrequency = 'Năm';
                break;
              default:
                feeFrequency = '';
                break;
            }

            switch (element.feeApply) {
              case 'end-of-frequency':
                feeApply = 'Cuối kỳ';
                break;

              default:
                feeApply = '';
                break;
            }

            var bankFee = {
              stt: i++,
              id: element.feeId,
              feeCode: element.feeCode,
              feeName: element.feeName,
              feeProcedure: feeProcedure,
              feeFrequency: feeFrequency,
              feeApply: feeApply,
              feeChannel: element.feeChannel,
              feeDescription: element.feeDescription,
              feeStatus:
                element.feeStatus == 1 ? 'Hoạt động' : 'Ngừng hoạt động',
              createdBy: element.createdBy,
              createdDate: convert(element.createdDate),
              lastModifiedBy: lastModifiedBy,
              lastModifiedDate: convert(lastModifiedDate),
            };
            tempList.push(bankFee);
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
    },
    {
      title: 'Tên loại phí',
      dataIndex: 'feeName',
      key: 'feeName',
    },
    {
      title: 'Phương thức tính',
      dataIndex: 'feeProcedure',
      key: 'feeProcedure',
    },
    {
      title: 'Tần suất tính',
      dataIndex: 'feeFrequency',
      key: 'feeFrequency',
    },
    {
      title: 'Ngày tính',
      dataIndex: 'feeApply',
      key: 'feeApply',
    },

    {
      title: 'Mô tả',
      dataIndex: 'feeDescription',
      key: 'feeDescription',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'feeStatus',
      key: 'feeStatus',
    },
    {
      title: 'Người tạo',
      dataIndex: 'createdBy',
      key: 'createdBy',
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdDate',
      key: 'createdDate',
    },
    {
      title: 'Người sửa',
      dataIndex: 'lastModifiedBy',
      key: 'lastModifiedBy',
    },
    {
      title: 'Ngày sửa',
      dataIndex: 'lastModifiedDate',
      key: 'lastModifiedDate',
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
    { label: 'Tên loại phí', key: 'feeName' },
    { label: 'Phương thức tính', key: 'feeProcedure' },
    { label: 'Tần suất tính', key: 'feeFrequency' },
    { label: 'Ngày tính', key: 'feeApply' },
    { label: 'Mô tả', key: 'feeDescription' },
    { label: 'Trạng thái', key: 'feeStatus' },
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
            <KTTitle size={2}>Danh mục loại phí ngân hàng</KTTitle>
          </Col>

          <Col span={9}>
            <Row className={'input-search'}>
              <Input
                prefix={<SearchOutlined />}
                placeholder="Nhập mã loại phí, tên loại phí, trạng thái"
                onChange={(e) => {
                  const currValue = e.target.value;
                  const filteredData = dataSource.current.filter(
                    (entry) =>
                      entry?.feeCode
                        ?.toLowerCase()
                        .includes(currValue.toLowerCase()) ||
                      entry?.feeName
                        ?.toLowerCase()
                        .includes(currValue.toLowerCase()) ||
                      entry?.feeStatus
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
                fileName="Fee_Bank_Management.csv"
              />
              {/* <Button className="common-btn">Tải xuống</Button> */}
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

export default AM030101FeeBankView;
