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
                      ? 'Admin ngân hàng'
                      : 'Quản trị hệ thống',
                  lastModifiedBy: lastModifiedBy,
                  lastModifiedDate: convert(lastModifiedDate),
                  role:
                    element.role == 'System'
                      ? 'Quản trị hệ thống'
                      : element.role,
                  status: element.status == 1 ? 'Hoạt động' : 'Ngừng hoạt động',
                  userGroupCode: element.userGroupCode,
                  userGroupName: element.userGroupName,
                  userType:
                    element.userType == 'BANK' ? 'Ngân hàng' : 'FPT quản trị',
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
      render: (value, item, index) => (page - 1) * pageSize + (index + 1),
    },
    {
      title: 'Mã nhóm người dùng',
      dataIndex: 'userGroupCode',
      key: 'userGroupCode',
    },
    {
      title: 'Tên nhóm người dùng',
      dataIndex: 'userGroupName',
      key: 'userGroupName',
    },
    {
      title: 'Kênh',
      dataIndex: 'channels',
      key: 'channels',
    },
    {
      title: 'Loại người dùng',
      dataIndex: 'userType',
      key: 'userType',
    },
    {
      title: 'Loại nhóm',
      dataIndex: 'groupType',
      key: 'groupType',
    },
    {
      title: 'Cấp chi nhánh',
      dataIndex: 'branchLevel',
      key: 'branchLevel',
    },
    {
      title: 'Vai trò',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
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
    { label: 'Mã nhóm người dùng', key: 'userGroupCode' },
    { label: 'Tên nhóm người dùng', key: 'userGroupName' },
    { label: 'Kênh', key: 'channels' },
    { label: 'Loại người dùng', key: 'userType' },
    { label: 'Loại nhóm', key: 'groupType' },
    { label: 'Cấp chi nhánh', key: 'branchLevel' },
    { label: 'Vai trò', key: 'role' },
    { label: 'Mô tả', key: 'description' },
    { label: 'Trạng thái', key: 'status' },
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
        <Row className={'padding-md'}>
          <Col span={15}>
            <KTTitle size={2}>
              Quản lý nhóm người dùng Admin ngân hàng & FPT quản trị
            </KTTitle>
          </Col>

          <Col span={9}>
            <Row className={'input-search'}>
              <Input
                prefix={<SearchOutlined />}
                placeholder="Nhập mã nhóm người dùng, vai trò, tên nhóm người dùng, kênh"
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
                Bộ lọc
              </Button> */}
            </Row>
          </Col>
        </Row>
        <Row className={'padding-md'}>
          <Col span={12}></Col>

          <Col span={12}>
            <Row className={'marginR-md'}>
              <Button onClick={am010401Domain.toAddPage} className="common-btn">
                Thêm mới
              </Button>
              <ExportReactCSV
                csvHeaders={headers}
                csvData={list}
                fileName="Group_User_Bank_FPT.csv"
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
