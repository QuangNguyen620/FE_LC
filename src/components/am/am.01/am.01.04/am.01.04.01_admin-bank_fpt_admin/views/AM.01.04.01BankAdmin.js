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
  Select,
} from 'antd';
import { Link } from 'react-router-dom';
import {
  EditFilled,
  EyeFilled,
  SearchOutlined,
  UserSwitchOutlined,
} from '@ant-design/icons';
// import { KTBodyText, KTHeading, KTLogo } from 'core/ui';
import '../common/less/AM.01.04.01.less';
import '../../../../../../assets/less/LC-common.less';
import { useAM010401Domain } from '../domains/AM.01.04.01Domain';
import { KTTitle } from 'core/ui';
import { CSVLink } from 'react-csv';

var axios = require('axios');

const AM010401BankAdminView = ({ lang = 'vi', ...props }) => {
  const { t } = useTranslation();
  const [, am010401Domain] = useAM010401Domain();
  const [filterModalVisible, setFilterVisible] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
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

  function checkData(data) {
    return typeof data !== 'undefined' && data;
  }

  const [list, setList] = useState([]);
  const dataSource = useRef();
  useEffect(() => {
    const fetchData = () => {
      var config = {
        method: 'get',
        url: process.env.REACT_APP_API_BACKEND + '/admin/group/getUserGroup',
        headers: {
          Authorization:
            'Bearer ' + sessionStorage.getItem('access_token') + '',
          'Content-Type': 'application/json',
        },
      };

      axios(config)
        .then(function (response) {
          // console.log(response.data.data);
          var tempList = [];
          var i = 1;
          var dataRes = response?.data?.data;
          if (checkData(dataRes)) {
            dataRes.forEach((element, index) => {
              var lastModifiedDate = '';
              var lastModifiedBy = '';
              if (element.createdDate !== element.lastModifiedDate) {
                lastModifiedDate = element.lastModifiedDate;
                lastModifiedBy = element.lastModifiedBy;
              }
              if (element.userType !== 'CORPORATE') {
                var userGroup = {
                  stt: i++,
                  id: element.id,
                  branchLevel: element.branchLevel,
                  channels: element.channels,
                  createdBy: element.createdBy,
                  createdDate: convert(element.createdDate),
                  description: element.description,
                  groupId: element.groupId,
                  groupType:
                    element.groupType == 'bank-admin'
                      ? 'Admin ng??n h??ng'
                      : 'Qu???n tr??? h??? th???ng',
                  lastModifiedBy: lastModifiedBy,
                  lastModifiedDate: convert(lastModifiedDate),
                  role:
                    element.role == 'System'
                      ? 'Qu???n tr??? h??? th???ng'
                      : element.role,
                  status: element.status == 1 ? 'Ho???t ?????ng' : 'Ng???ng ho???t ?????ng',
                  userGroupCode: element.userGroupCode,
                  userGroupName: element.userGroupName,
                  userType:
                    element.userType == 'BANK' ? 'Ng??n h??ng' : 'FPT qu???n tr???',
                };
                tempList.push(userGroup);
              }
            });
          }
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
      render: (value, item, index) => (page - 1) * pageSize + (index + 1),
    },
    {
      title: 'M?? nh??m ng?????i d??ng',
      dataIndex: 'userGroupCode',
      key: 'userGroupCode',
    },
    {
      title: 'T??n nh??m ng?????i d??ng',
      dataIndex: 'userGroupName',
      key: 'userGroupName',
    },
    {
      title: 'K??nh',
      dataIndex: 'channels',
      key: 'channels',
    },
    {
      title: 'Lo???i ng?????i d??ng',
      dataIndex: 'userType',
      key: 'userType',
    },
    {
      title: 'Lo???i nh??m',
      dataIndex: 'groupType',
      key: 'groupType',
    },
    {
      title: 'C???p chi nh??nh',
      dataIndex: 'branchLevel',
      key: 'branchLevel',
    },
    {
      title: 'Vai tr??',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'M?? t???',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Tr???ng th??i',
      dataIndex: 'status',
      key: 'status',
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
                am010401Domain.toViewPage(record.id);
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
    { label: 'M?? nh??m ng?????i d??ng', key: 'userGroupCode' },
    { label: 'T??n nh??m ng?????i d??ng', key: 'userGroupName' },
    { label: 'K??nh', key: 'channels' },
    { label: 'Lo???i ng?????i d??ng', key: 'userType' },
    { label: 'Lo???i nh??m', key: 'groupType' },
    { label: 'C???p chi nh??nh', key: 'branchLevel' },
    { label: 'Vai tr??', key: 'role' },
    { label: 'M?? t???', key: 'description' },
    { label: 'Tr???ng th??i', key: 'status' },
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
        <Row className={'padding-md'}>
          <Col span={15}>
            <KTTitle size={2}>
              Qu???n l?? nh??m ng?????i d??ng Admin ng??n h??ng & FPT qu???n tr???
            </KTTitle>
          </Col>

          <Col span={9}>
            <Row className={'input-search'}>
              <Input
                prefix={<SearchOutlined />}
                placeholder="Nh???p m?? nh??m ng?????i d??ng, vai tr??, t??n nh??m ng?????i d??ng, k??nh"
                onChange={(e) => {
                  const currValue = e.target.value;
                  const filteredData = dataSource.current.filter(
                    (entry) =>
                      entry?.userGroupName
                        .toLowerCase()
                        .includes(currValue.toLowerCase()) ||
                      entry?.role
                        .toLowerCase()
                        .includes(currValue.toLowerCase()) ||
                      entry?.userGroupCode
                        .toLowerCase()
                        .includes(currValue.toLowerCase()) ||
                      entry?.channels
                        .toLowerCase()
                        .includes(currValue.toLowerCase()),
                  );
                  setList(filteredData);
                  setPage(1);
                }}
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
              <Button onClick={am010401Domain.toAddPage} className="common-btn">
                Th??m m???i
              </Button>
              <ExportReactCSV
                csvHeaders={headers}
                csvData={list}
                fileName="Group_User_Bank_FPT.csv"
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
                current: page,
              }}
            />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default AM010401BankAdminView;
