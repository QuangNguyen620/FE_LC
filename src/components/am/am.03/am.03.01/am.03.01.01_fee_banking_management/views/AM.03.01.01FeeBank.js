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
                feeProcedure = '?????nh k???';
                break;
              case 'by-service':
                feeProcedure = 'Giao d???ch';
                break;
              default:
                feeProcedure = '';
                break;
            }

            switch (element.feeFrequency) {
              case 'month':
                feeFrequency = 'Th??ng';
                break;
              case 'quarter':
                feeFrequency = 'Qu??';
                break;
              case 'half-year':
                feeFrequency = 'N???a n??m';
                break;
              case 'year':
                feeFrequency = 'N??m';
                break;
              default:
                feeFrequency = '';
                break;
            }

            switch (element.feeApply) {
              case 'end-of-frequency':
                feeApply = 'Cu???i k???';
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
                element.feeStatus == 1 ? 'Ho???t ?????ng' : 'Ng???ng ho???t ?????ng',
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
    },
    {
      title: 'T??n lo???i ph??',
      dataIndex: 'feeName',
      key: 'feeName',
    },
    {
      title: 'Ph????ng th???c t??nh',
      dataIndex: 'feeProcedure',
      key: 'feeProcedure',
    },
    {
      title: 'T???n su???t t??nh',
      dataIndex: 'feeFrequency',
      key: 'feeFrequency',
    },
    {
      title: 'Ng??y t??nh',
      dataIndex: 'feeApply',
      key: 'feeApply',
    },

    {
      title: 'M?? t???',
      dataIndex: 'feeDescription',
      key: 'feeDescription',
    },
    {
      title: 'Tr???ng th??i',
      dataIndex: 'feeStatus',
      key: 'feeStatus',
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
    { label: 'M?? lo???i ph??', key: 'feeCode' },
    { label: 'T??n lo???i ph??', key: 'feeName' },
    { label: 'Ph????ng th???c t??nh', key: 'feeProcedure' },
    { label: 'T???n su???t t??nh', key: 'feeFrequency' },
    { label: 'Ng??y t??nh', key: 'feeApply' },
    { label: 'M?? t???', key: 'feeDescription' },
    { label: 'Tr???ng th??i', key: 'feeStatus' },
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
            <KTTitle size={2}>Danh m???c lo???i ph?? ng??n h??ng</KTTitle>
          </Col>

          <Col span={9}>
            <Row className={'input-search'}>
              <Input
                prefix={<SearchOutlined />}
                placeholder="Nh???p m?? lo???i ph??, t??n lo???i ph??, tr???ng th??i"
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
                fileName="Fee_Bank_Management.csv"
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

export default AM030101FeeBankView;
