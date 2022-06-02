import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Col,
  Row,
  Typography,
  Input,
  Button,
  Tooltip,
  Avatar,
  Table,
  Tag,
} from 'antd';
import { KTTitle } from 'core/ui';
import '../common/less/BM010301.less';
import { BM010301Domain } from '../domains/BM010301Domain';
import { CSVLink } from 'react-csv';
import {
  EyeFilled,
  PlusOutlined,
  SearchOutlined,
  DownloadOutlined,
  FilterOutlined,
} from '@ant-design/icons';

var axios = require('axios');
const { Link } = Typography;

const BM010301View = ({ lang = 'vi', ...props }) => {
  const { t } = useTranslation();
  const [, domain] = BM010301Domain();

  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const dataSource = useRef();
  // const [value, setValue] = useState('');

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

  useEffect(() => {
    const fetchData = () => {
      var config = domain.getAllUserGroup();

      config
        .then((result) => {
          axios(result)
            .then(function (response) {
              var tempList = [];
              var i = 1;
              var userGroupList = response?.data?.data;
              if (checkData(userGroupList)) {
                userGroupList.forEach((element) => {
                  // console.log(element);
                  var lastModifiedDate = '';
                  var lastModifiedBy = '';
                  if (
                    element.createdDate.slice(0, 19) !==
                    element.lastModifiedDate.slice(0, 19)
                  ) {
                    lastModifiedDate = element.lastModifiedDate;
                    lastModifiedBy = element.lastModifiedBy;
                  }
                  console.log(lastModifiedDate);
                  if (
                    element.groupType.toLowerCase() == 'bank-admin' ||
                    element.groupType.toLowerCase() == 'bank-user'
                  ) {
                    var userGroup = {
                      stt: i++,
                      id: element.id,
                      userGroupName: element.userGroupName,
                      userGroupCode: element.userGroupCode,
                      groupType:
                        element.groupType == 'bank-admin'
                          ? 'Admin ngân hàng'
                          : 'Người dùng ngân hàng',
                      channels: element.channels,
                      groupStatus:
                        element.status == 1 ? 'Hoạt động' : 'Ngừng hoạt động',
                      status: element.status,
                      role: element.role,
                      branchLevel: element.branchLevel,
                      createdDate: convert(element.createdDate),
                      createdBy: element.createdBy,
                      lastModifiedDate: convert(lastModifiedDate),
                      lastModifiedBy: lastModifiedBy,
                      description: element.description,
                      branch: element.branch,
                      department: element.department,
                    };

                    tempList.push(userGroup);
                  }
                });
              }
              setList(tempList);
              dataSource.current = tempList;
              console.log('Data source:::');
              console.log(dataSource.current);
            })
            .catch(function (error) {
              console.log(error);
            });
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
      fixed: 'left',
      width: '5%',
    },
    {
      title: 'Mã nhóm người dùng',
      dataIndex: 'userGroupCode',
      key: 'userGroupCode',
      fixed: 'left',
      width: '12%',
    },
    {
      title: 'Tên nhóm người dùng',
      dataIndex: 'userGroupName',
      key: 'userGroupName',
      width: '12%',
    },
    {
      title: 'Cấp chi nhánh',
      dataIndex: 'branchLevel',
      key: 'branchLevel',
      width: '8%',
    },
    // {
    //   title: 'Chi nhánh',
    //   dataIndex: 'branch',
    //   key: 'branch',
    // },
    // {
    //   title: 'Phòng ban',
    //   dataIndex: 'department',
    //   key: 'department',
    // },
    {
      title: 'Loại nhóm',
      dataIndex: 'groupType',
      key: 'groupType',
      width: '8%',
    },
    // {
    //   title: 'Kênh',
    //   dataIndex: 'channels',
    //   key: 'channels',
    // },

    {
      title: 'Vai trò',
      dataIndex: 'role',
      key: 'role',
      width: '8%',
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      width: '15%',
    },
    {
      title: 'Người tạo',
      dataIndex: 'createdBy',
      key: 'createdBy',
      width: '8%',
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdDate',
      key: 'createdDate',
      width: '8%',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'groupStatus',
      key: 'groupStatus',
      width: '10%',
      render: (text, record, index) => {
        {
          let status = record?.status;
          let color = 'green';
          if (status == 0) {
            color = 'default';
          } else if (status == 1) {
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
    // {
    //   title: 'Người sửa',
    //   dataIndex: 'lastModifiedBy',
    //   key: 'lastModifiedBy',
    // },
    // {
    //   title: 'Ngày sửa',
    //   dataIndex: 'lastModifiedDate',
    //   key: 'lastModifiedDate',
    // },
    {
      title: 'Thao tác',
      dataIndex: 'activity',
      width: 130,
      width: '5%',
      fixed: 'right',
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
    { label: 'Mã nhóm người dùng', key: 'userGroupCode' },
    { label: 'Tên nhóm người dùng', key: 'userGroupName' },
    { label: 'Cấp chi nhánh', key: 'branchLevel' },
    { label: 'Chi nhánh', key: 'branch' },
    // { label: 'Phòng ban', key: 'department' },
    { label: 'Loại nhóm', key: 'groupType' },
    // { label: 'Kênh', key: 'channels' },
    { label: 'Vai trò', key: 'role' },
    { label: 'Mô tả', key: 'description' },
    { label: 'Người tạo', key: 'createdBy' },
    { label: 'Ngày tạo', key: 'createdDate' },
    { label: 'Trạng thái', key: 'status' },
    // { label: 'Người sửa', key: 'lastModifiedBy' },
    // { label: 'Ngày sửa', key: 'lastModifiedDate' },
  ];

  const ExportReactCSV = ({ csvHeaders, csvData, fileName }) => {
    if (csvData) {
      return (
        <CSVLink
          headers={csvHeaders}
          data={csvData}
          filename={fileName}
          id={'btn-export'}
        >
          <Button variant="success" id={'btn-export'}>
            Xuất Excel
            <DownloadOutlined />
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
          <Col span={9}>
            <KTTitle size={2}>Quản lý nhóm người dùng ngân hàng</KTTitle>
          </Col>
          <Col span={15}>
            <Row className={'marginR-md'}>
              <Input
                className={'input-search'}
                prefix={<SearchOutlined />}
                placeholder="Nhập mã nhóm người dùng ngân hàng/ tên nhóm"
                onChange={(e) => {
                  const currValue = e.target.value;
                  const filteredData = dataSource?.current?.filter(
                    (entry) =>
                      entry?.userGroupName
                        ?.toLowerCase()
                        .includes(currValue.toLowerCase()) ||
                      entry?.role
                        ?.toLowerCase()
                        .includes(currValue.toLowerCase()) ||
                      entry?.userGroupCode
                        ?.toLowerCase()
                        .includes(currValue.toLowerCase()) ||
                      // entry?.channels
                      //   ?.toLowerCase()
                      //   .includes(currValue.toLowerCase()) ||
                      entry?.branchLevel
                        ?.toLowerCase()
                        .includes(currValue.toLowerCase()),
                  );
                  setList(filteredData);
                }}
              />
              <Button id={'btn-filter'}>
                Bộ lọc <FilterOutlined />
              </Button>
              <ExportReactCSV
                csvHeaders={headers}
                csvData={list}
                fileName="Contract_Buyer.csv"
              />
              <Button
                id={'btn-add'}
                onClick={(e) => domain.toAddPage()}
                className="common-btn"
              >
                Thêm mới <PlusOutlined />
              </Button>
            </Row>
          </Col>
        </Row>
        <Row className="padding-md">
          <Col span={24}>
            <Table
              columns={columns}
              dataSource={list}
              scroll={{ x: 1500 }}
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

export default BM010301View;
