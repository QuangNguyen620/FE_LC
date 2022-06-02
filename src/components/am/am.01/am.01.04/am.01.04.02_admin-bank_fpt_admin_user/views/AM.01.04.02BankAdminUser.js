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
  Checkbox,
} from 'antd';
import { Link } from 'react-router-dom';
import { EyeFilled, SearchOutlined } from '@ant-design/icons';

import '../common/less/AM.01.04.02.less';
import '../../../../../../assets/less/LC-common.less';

import { useA00Domain } from '../domains/AM.01.04.02Domain';
import { KTTitle } from 'core/ui';
import { CSVLink } from 'react-csv';

var axios = require('axios');

const AM010402BankAdminView = ({ lang = 'vi', ...props }) => {
  const { t } = useTranslation();
  const [, am010402Domain] = useA00Domain();

  const [filterModalVisible, setFilterVisible] = useState(false);
  const [idTableData, SetID] = useState('');
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = useState(20);
  const handleVisibleChange = () => {
    if (filterModalVisible == true) {
      setFilterVisible(false);
    } else {
      setFilterVisible(true);
    }
  };
  const dataSource = useRef();
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
  const columns = [
    {
      title: 'STT',
      key: 'index',
      render: (value, item, index) => (page - 1) * pageSize + (index + 1),
      width: 250,
    },
    {
      title: 'Mã ngân hàng',
      dataIndex: 'bankCode',
      key: 'bankCode',
      width: 250,
    },
    {
      title: 'Mã người dùng',
      dataIndex: 'userCode',
      key: 'userCode',
      width: 150,
    },
    {
      title: 'Tên người dùng',
      dataIndex: 'userName',
      key: 'userName',
      width: 150,
    },
    {
      title: 'Cấp chi nhánh',
      dataIndex: 'branchLevels',
      key: 'branchLevels',
      width: 150,
    },
    {
      title: 'Kênh',
      dataIndex: 'channels',
      key: 'channels',
      width: 150,
    },
    {
      title: 'Loại người dùng',
      dataIndex: 'userType',
      key: 'userType',
      width: 150,
    },
    {
      title: 'Loại nhóm',
      dataIndex: 'groupTypes',
      key: 'groupTypes',
      width: 150,
    },
    {
      title: 'Mã nhóm người dùng',
      dataIndex: 'userGroupCodes',
      key: 'userGroupCodes',
      width: 150,
    },
    {
      title: 'Vai trò',
      dataIndex: 'roles',
      key: 'roles',
      width: 150,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'userStatus',
      key: 'userStatus',
      width: 150,
    },
    {
      title: 'Người tạo',
      dataIndex: 'createdBy',
      key: 'createdBy',
      width: 150,
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdDate',
      key: 'createdDate',
      width: 150,
    },
    {
      title: 'Người sửa',
      dataIndex: 'lastModifiedBy',
      key: 'lastModifiedBy',
      width: 150,
    },
    {
      title: 'Ngày sửa',
      dataIndex: 'lastModifiedDate',
      key: 'lastModifiedDate',
      width: 150,
    },
    {
      title: 'Thao tác',
      dataIndex: 'activity',
      width: 100,
      key: 'x',
      render: (text, record, index) => (
        <Row className="item-center">
          <Tooltip placement="top" title={'Xem'}>
            <Link
              onClick={(e) => {
                am010402Domain.toViewPage(record.id);
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
    { label: 'STT', key: 'index' },
    { label: 'Mã ngân hàng', key: 'bankCode' },
    { label: 'Mã người dùng', key: 'userCode' },
    { label: 'Tên người dùng', key: 'userName' },
    { label: 'Cấp chi nhánh', key: 'branchLevels' },
    { label: 'Kênh', key: 'channels' },
    { label: 'Loại người dùng', key: 'userType' },
    { label: 'Loại nhóm', key: 'groupTypes' },
    { label: 'Mã nhóm người dùng', key: 'userGroupCodes' },
    { label: 'Vai trò', key: 'roles' },
    { label: 'Trạng thái', key: 'userStatus' },
    { label: 'Người tạo', key: 'createdBy' },
    { label: 'Ngày tạo', key: 'createdDate' },
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

  const [list, setList] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      var config = {
        method: 'get',
        url: process.env.REACT_APP_API_BACKEND + '/user/getUsers',
        headers: {
          Authorization:
            'Bearer ' + sessionStorage.getItem('access_token') + '',
        },
      };

      axios(config).then(function (response) {
        console.log(response.data.data);

        var tempArray = [];
        var i = 1;
        response.data.data.forEach((element) => {
          if (element.userType !== 'CORPORATE') {
            var lastModifiedDate = '';
            var lastModifiedBy = '';
            if (element.createdDate !== element.lastModifiedDate) {
              lastModifiedDate = element.lastModifiedDate;
              lastModifiedBy = element.lastModifiedBy;
            }
            var userGroupCodes = element.userGroupCodes.join(', ');

            var channelSet = new Set(element.channels);
            let channelArr = [...channelSet];
            var channels = channelArr.join(',');

            var user = {
              index: i,
              bankCode: element.bankCode == '' ? '' : element.bankCode,
              userCode: element.userCode,
              userName: element.userName,
              branchLevels: element.branchLevels,
              branch: element.branch,
              department: element.department,
              channels: channels,
              userType:
                element.userType == 'BANK' ? 'Ngân hàng' : 'FPT quản trị',
              groupTypes:
                element.groupTypes == 'sys-admin'
                  ? 'Quản trị hệ thống'
                  : 'Admin ngân hàng',
              userGroupCodes: userGroupCodes,
              roles: element.roles,
              userStatus:
                element.userStatus == 1 ? 'Hoạt động' : 'Ngừng hoạt động',
              createdBy: element.createdBy,
              createdDate: convert(element.createdDate),
              lastModifiedBy: lastModifiedBy,
              lastModifiedDate: convert(lastModifiedDate),
              id: element.id,
            };
            console.log(user);
            user.STT = i++;
            tempArray.push(user);
          }
        });

        setList(tempArray);
        dataSource.current = tempArray;
      });
    };

    fetchData();
  }, []);

  return (
    <>
      <div className={'main-container'}>
        <Row className={'padding-md'}>
          <Col span={15}>
            <KTTitle size={2}>
              Quản lý người dùng ngân hàng & FPT quản trị
            </KTTitle>
          </Col>

          <Col span={9}>
            <Row className={'input-search'}>
              <Input
                prefix={<SearchOutlined />}
                onChange={(e) => {
                  const currValue = e.target.value;
                  const filteredData = dataSource.current.filter((entry) =>
                    // entry?.userName
                    //   .toLowerCase()
                    //   .includes(currValue.toLowerCase()) ||
                    // entry?.userCode !== null
                    //   ? entry?.userCode
                    //       .toLowerCase()
                    //       .includes(currValue.toLowerCase())
                    //   : '',
                    Object.keys(entry).some((k) => 
                      String(entry[k]).toLowerCase().includes(currValue.toLowerCase())
                    )
                  );
                  setPage(1);
                  setList(filteredData);
                }}
                placeholder="Nhập mã ngân hàng, mã người dùng, tên người dùng"
              />
            </Row>
          </Col>
        </Row>
        <Row className={'padding-md'}>
          <Col span={12}></Col>

          <Col span={12}>
            <Row className={'marginR-md'}>
              <Button onClick={am010402Domain.toAddPage} className="common-btn">
                Thêm mới
              </Button>
              <ExportReactCSV
                csvHeaders={headers}
                csvData={list}
                fileName="User_Bank_FPT.csv"
              />
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

export default AM010402BankAdminView;
