import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { EyeFilled, SearchOutlined } from '@ant-design/icons';
import {
  Col,
  Row,
  Typography,
  Input,
  Button,
  Tooltip,
  Avatar,
  Table,
} from 'antd';
import { KTTitle } from 'core/ui';
import '../common/less/BM010302.less';
import { BM010302Domain } from '../domains/BM010302Domain.js';
import { CSVLink } from 'react-csv';

var axios = require('axios');
const { Link } = Typography;

const BM010302View = ({ lang = 'vi', ...props }) => {
  const { t } = useTranslation();
  const [, domain] = BM010302Domain();

  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
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

  useEffect(() => {
    const fetchData = () => {
      var config = domain.getAllUser();

      config
        .then((result) => {
          axios(result)
            .then(function (response) {
              console.log('res:::', response.data.data);
              var tempList = [];
              var i = 1;
              response.data.data.forEach((element) => {
                if (
                  true
                  // element.userType == 'bank-admin' ||
                  // element.userType == 'bank-user'
                ) {
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

                  var userGroup = {
                    stt: i++,
                    id: element.id,
                    userId: element.userId,
                    userCode: element.userCode,
                    userName: element.userName,
                    channels: channels,
                    groupType: element.groupType,
                    userGroupCode: userGroupCodes,
                    roles: element.roles,
                    userStatus: element.userStatus,
                    branchLevels: element.branchLevels,
                    groupType:
                      element.groupType == 'bank-admin'
                        ? 'Admin ngân hàng'
                        : 'Người dùng ngân hàng',

                    userStatus:
                      element.userStatus == '1'
                        ? 'Hoạt động'
                        : 'Ngừng hoạt động',

                    createdDate: convert(element.createdDate),
                    createdBy: element.createdBy,
                    lastModifiedDate: convert(lastModifiedDate),
                    lastModifiedBy: lastModifiedBy,
                  };

                  tempList.push(userGroup);
                }
              });
              setList(tempList);
              dataSource.current = tempList;
              console.log('Data source::: ' + dataSource.current);
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
    },
    {
      title: 'Mã người dùng',
      dataIndex: 'userCode',
      key: 'userCode',
    },
    {
      title: 'Tên người dùng',
      dataIndex: 'userName',
      key: 'userName',
    },
    {
      title: 'Cấp chi nhánh',
      dataIndex: 'branchLevels',
      key: 'branchLevels',
    },
    {
      title: 'Kênh',
      dataIndex: 'channels',
      key: 'channels',
    },
    {
      title: 'Loại nhóm',
      dataIndex: 'groupType',
      key: 'groupType',
    },
    {
      title: 'Mã nhóm người dùng',
      dataIndex: 'userGroupCode',
      key: 'userGroupCode',
    },
    {
      title: 'Vai trò',
      dataIndex: 'roles',
      key: 'roles',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'userStatus',
      key: 'userStatus',
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
        <Row>
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
    { label: 'Mã người dùng', key: 'userCode' },
    { label: 'Tên người dùng', key: 'userName' },
    { label: 'Cấp chi nhánh', key: 'branchLevels' },
    { label: 'Chi nhánh', key: 'branch' },
    { label: 'Phòng ban', key: 'department' },
    { label: 'Kênh', key: 'channels' },
    { label: 'Loại nhóm', key: 'groupType' },
    { label: 'Mã nhóm người dùng', key: 'userGroupCode' },
    { label: 'Vai trò', key: 'roles' },
    { label: 'Trạng thái', key: 'userStatus' },
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
        {/* <Modal
          title="Bộ lọc tìm kiếm"
          centered
          visible={filterModalVisible}
          // onOk={handleVisibleChange}
          onCancel={handleVisibleChange}
          footer={[
            <Button
              key="submit"
              className="common-btn"
              onClick={handleVisibleChange}
            >
              Tìm kiếm
            </Button>,
            <Button
              key="back"
              className="secondary-btn"
              onClick={handleVisibleChange}
            >
              Đóng
            </Button>,
          ]}
        >
          <Form layout="horizontal">
            <Form.Item>
              <Row>
                <Col span={8}>Mã nhóm người dùng</Col>
                <Col span={3}></Col>
                <Col span={13}>
                  <Input />
                </Col>
              </Row>
            </Form.Item>
            <Form.Item>
              <Row>
                <Col span={8}>Tên nhóm người dùng</Col>
                <Col span={3}></Col>
                <Col span={13}>
                  <Input />
                </Col>
              </Row>
            </Form.Item>
            <Form.Item>
              <Row>
                <Col span={8}>Kênh</Col>
                <Col span={3}></Col>
                <Col span={13}>
                  <Select>
                    <Select.Option value="chanel-demo">Demo</Select.Option>
                  </Select>
                </Col>
              </Row>
            </Form.Item>
            <Form.Item>
              <Row>
                <Col span={8}>Loại người dùng</Col>
                <Col span={3}></Col>
                <Col span={13}>
                  <Select>
                    <Select.Option value="user-type-1">Demo</Select.Option>
                  </Select>
                </Col>
              </Row>
            </Form.Item>
            <Form.Item>
              <Row>
                <Col span={8}>Loại nhóm</Col>
                <Col span={3}></Col>
                <Col span={13}>
                  <Select>
                    <Select.Option value="group-1">Demo</Select.Option>
                  </Select>
                </Col>
              </Row>
            </Form.Item>
            <Form.Item>
              <Row>
                <Col span={8}>Vai trò</Col>
                <Col span={3}></Col>
                <Col span={13}>
                  <Select>
                    <Select.Option value="role-1">Demo</Select.Option>
                  </Select>
                </Col>
              </Row>
            </Form.Item>
          </Form>
        </Modal> */}

        <Row className="padding-md">
          <Col span={15}>
            <KTTitle size={2}>Quản lý người dùng ngân hàng</KTTitle>
          </Col>

          <Col span={9}>
            <Row className={'input-search'}>
              <Input
                prefix={<SearchOutlined />}
                placeholder="Nhập mã nhóm người dùng, tên nhóm người dùng, vai trò, kênh, chi nhánh"
                onChange={(e) => {
                  const currValue = e.target.value;
                  const filteredData = dataSource.current.filter(
                    (entry) =>
                      entry?.userCode.includes(currValue) ||
                      entry?.userName.includes(currValue) ||
                      entry?.employeeCode.includes(currValue) ||
                      entry?.department.includes(currValue) ||
                      entry?.branchLevels.includes(currValue),
                  );
                  setList(filteredData);
                }}
              />
              {/* <Button id="filter-btn">Bộ lọc</Button> */}
            </Row>
          </Col>
        </Row>
        <Row className="padding-md">
          <Col span={12}></Col>

          <Col span={12}>
            <Row className={'marginR-md'}>
              <Button
                className="common-btn"
                onClick={(e) => domain.toAddPage()}
              >
                Thêm mới
              </Button>
              <ExportReactCSV
                csvHeaders={headers}
                csvData={list}
                fileName="Bank_User.csv"
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

export default BM010302View;
