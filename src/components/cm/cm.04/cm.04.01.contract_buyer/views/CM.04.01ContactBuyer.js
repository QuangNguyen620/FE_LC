import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Col, Row, Avatar, Tooltip, Table, Input, Button, Tag } from 'antd';
import { Link } from 'react-router-dom';
import {
  EyeFilled,
  FilterOutlined,
  SearchOutlined,
  DownloadOutlined,
} from '@ant-design/icons';

import '../components/less/CM.04.01.less';
import '../../../../../assets/less/LC-common.less';
import { useA00Domain } from '../domains/CM.04.01Domain';
import { KTTitle } from 'core/ui';
import { CSVLink } from 'react-csv';
import log from '../ModuleLogger';

var axios = require('axios');

const CM0401View = ({ lang = 'vi', ...props }) => {
  const { t } = useTranslation();
  const [context, domain] = useA00Domain();
  const [filterModalVisible, setFilterVisible] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  const [list, setList] = useState([]);
  const dataSource = useRef();

  useEffect(() => {
    domain.initDomain();
  }, []);

  useEffect(() => {
    log.debug('useEffect--', context);

    console.log('context:::', context);
    setList(context?.list);
    dataSource.current = context?.list;
  }, [context]);

  const columns = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
      render: (value, item, index) => (page - 1) * pageSize + index + 1,
      fixed: 'left',
      width: '5%',
    },
    {
      title: 'Mã hợp đồng',
      dataIndex: 'contractCode',
      key: 'contractCode',
      fixed: 'left',
      width: '10%',
    },
    // {
    //   title: 'Tên bên mua',
    //   dataIndex: 'buyerName',
    //   key: 'buyerName',
    // },
    {
      title: 'Tên bên bán',
      dataIndex: 'sallerName',
      key: 'sallerName',
      width: '20%',
    },
    {
      title: 'Loại hàng hóa',
      dataIndex: 'commoditiesName',
      key: 'commoditiesName',
      width: '10%',
    },
    {
      title: 'Loại tiền',
      dataIndex: 'currency',
      key: 'currency',
      width: '8%',
    },
    {
      title: 'Trị giá hợp đồng',
      dataIndex: 'contractValue',
      key: 'contractValue',
      width: '12%',
    },
    {
      title: 'Trạng thái hợp đồng',
      dataIndex: 'contractStatus',
      key: 'contractStatus',
      width: '15%',
      render: (text, record, index) => {
        {
          let status = record?.status;
          let color = 'green';
          // let color = 'orange';
          if (status == 0) {
            color = 'blue';
          } else if (status == 1 || status == 3 || status == 5) {
            color = 'orange';
          } else if (status == 2 || status == 4 || status == 6) {
            color = 'red';
          } else if (status == 7) {
            color = 'green';
          }
          return (
            <Tag color={color} className={'tag-table'}>
              {text}
            </Tag>
          );
        }
      },
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
      width: '12%',
    },
    {
      title: 'Ngày ký số bên mua',
      dataIndex: 'buyerDigitalSigningDate',
      key: 'buyerDigitalSigningDate',
      width: '8%',
    },
    {
      title: 'Người ký số bên mua',
      dataIndex: 'buyerDigitalSignature',
      key: 'buyerDigitalSignature',
      width: '12%',
    },
    {
      title: 'Ngày xác nhận',
      dataIndex: 'sellerConfirmationDate',
      key: 'sellerConfirmationDate',
      width: '8%',
    },
    {
      title: 'Người xác nhận',
      dataIndex: 'sellerVerifier',
      key: 'sellerVerifier',
      width: '12%',
    },
    {
      title: 'Ngày ký số bên bán',
      dataIndex: 'sellerDigitalSigningDate',
      key: 'sellerDigitalSigningDate',
      width: '8%',
    },
    {
      title: 'Người ký số bên bán',
      dataIndex: 'sellerDigitalSignature',
      key: 'sellerDigitalSignature',
      width: '12%',
    },
    {
      title: 'Lý do từ chối Bên Bán',
      dataIndex: 'reasonsForRefusingTheSeller',
      key: 'reasonsForRefusingTheSeller',
      width: '25%',
    },
    {
      title: 'Tác vụ',
      dataIndex: 'activity',
      width: '8%',
      key: 'x',
      fixed: 'right',
      render: (text, record, index) => (
        <Row className="item-center">
          <Tooltip placement="top" title={'Xem'}>
            <Link
              onClick={(e) => {
                domain.toViewPage(record.contractId);
                console.log("Record's key is :", record.contractId);
              }}
              className="activities-btn"
            >
              <Avatar
                size="small"
                className={'avatar'}
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
    { label: 'Mã hợp đồng', key: 'contractCode' },
    // { label: 'Tên bên mua', key: 'buyerName' },
    { label: 'Tên bên bán', key: 'sallerName' },
    { label: 'Loại hàng hóa', key: 'commoditiesName' },
    { label: 'Loại tiền', key: 'currency' },
    { label: 'Trị giá hợp đồng', key: 'contractValue' },
    { label: 'Trạng thái hợp đồng', key: 'contractStatus' },
    { label: 'Người tạo', key: 'createdBy' },
    { label: 'Ngày tạo', key: 'createdDate' },
    { label: 'Ngày ký số bên mua', key: 'buyerDigitalSigningDate' },
    { label: 'Người ký số bên mua', key: 'buyerDigitalSignature' },
    { label: 'Ngày xác nhận', key: 'sellerConfirmationDate' },
    { label: 'Người xác nhận', key: 'sellerVerifier' },
    { label: 'Ngày ký số bên bán', key: 'sellerDigitalSigningDate' },
    { label: 'Người ký số bên bán', key: 'sellerDigitalSignature' },
    { label: 'Lý do từ chối Bên Bán', key: 'reasonsForRefusingTheSeller' },
  ];

  const ExportReactCSV = ({ csvHeaders, csvData, fileName }) => {
    if (csvData) {
      return (
        <CSVLink headers={csvHeaders} data={csvData} filename={fileName}>
          <Button variant="success" id={'btn-download'}>
            Xuất Excel <DownloadOutlined />
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
          <Col span={9}>
            <KTTitle size={2}>
              <b>Danh sách hợp đồng mua bán</b>
            </KTTitle>
          </Col>
          <Col span={8}>
            <Row className={'input-search'}>
              <Input
                prefix={<SearchOutlined />}
                placeholder="Nhập mã hợp đồng, tên bên mua, tên bên bán"
                onChange={(e) => {
                  const currValue = e.target.value;
                  const filteredData = dataSource.current.filter(
                    (entry) =>
                      entry?.contractNo.includes(currValue) ||
                      entry?.buyerName.includes(currValue) ||
                      entry?.contractStatus.includes(currValue),
                  );
                  setList(filteredData);
                }}
              />
              {/* <Button onClick={handleVisibleChange} id="filter-btn">
                Bộ lọc
              </Button> */}
            </Row>
          </Col>
          <Col span={7}>
            <Row className={'marginR-md'}>
              <Button
                // onClick={domain.toAddPage}
                id={'btn-filter'}
              >
                Bộ lọc <FilterOutlined />
              </Button>
              <ExportReactCSV
                csvHeaders={headers}
                csvData={list}
                fileName="Contract_Buyer.csv"
              />
              <Button onClick={domain.toAddPage} className="common-btn">
                Thêm mới +
              </Button>
            </Row>
          </Col>
        </Row>
        {/* <Row className={'padding-md'}>
          <Col span={12}></Col>

          <Col span={12}>
            <Row className={'marginR-md'}>
              <Button onClick={domain.toAddPage} className="common-btn">
                Thêm mới
              </Button>
              <ExportReactCSV
                csvHeaders={headers}
                csvData={list}
                fileName="Contract_Buyer.csv"
              />
              //<Button className="common-btn">Tải xuống</Button> 
            </Row>
          </Col>
        </Row> */}
        <Row
          style={{
            padding: 16,
          }}
        >
          <Col span={24}>
            <Table
              style={{ width: '100%' }}
              columns={columns}
              dataSource={list}
              scroll={{ x: 3000, y: 540 }}
              // scroll={{ x: 1300}}
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

export default CM0401View;
