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
import '../common/less/BM010303.less';
import { BM010303Domain } from '../domains/BM010303Domain';
import { CSVLink } from 'react-csv';

var axios = require('axios');
const { Link } = Typography;

const BM010303View = ({ lang = 'vi', ...props }) => {
  const { t } = useTranslation();
  const [, domain] = BM010303Domain();

  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const dataSource = useRef();
  // const [value, setValue] = useState('');

  const authList = [
    { name: 'None', value: 'none' },
    { name: 'Mật khẩu giao dịch', value: 'password' },
    { name: 'OTP-Xác thực SMS', value: 'otp' },
  ];

  function convert(str) {
    var date = new Date(str),
      mnth = ('0' + (date.getMonth() + 1)).slice(-2),
      day = ('0' + date.getDate()).slice(-2);
    return [day, mnth, date.getFullYear()].join('/');
  }

  useEffect(() => {
    const fetchData = () => {
      var config = domain.getAllUserAuth();

      config
        .then((result) => {
          axios(result)
            .then(function (response) {
              console.log(response);
              var tempList = [];
              var i = 1;
              response.data.data.forEach((element) => {
                var authentication = '';
                var checkAuth = true;
                authList.forEach((auth) => {
                  if (element.authentication == auth.value) {
                    authentication = auth.name;
                    checkAuth = false;
                  }
                });
                if (checkAuth) {
                  authentication = element.authentication;
                }
                var groupType = '';
                var role = '';
                element.userGroupEntitys.forEach((element) => {
                  groupType = element.groupType.toLowerCase();
                  role = element.role;
                });

                var userAu = {
                  stt: i++,
                  id: element.id,
                  userName: element.userName,
                  userCode: element.userCode,
                  branch: element.branch,
                  department: element.department,
                  groupTypes:
                    groupType == 'bank-admin'
                      ? 'Admin ngân hàng'
                      : groupType == 'bank-user'
                      ? 'Người dùng ngân hàng'
                      : groupType,
                  roles: role,
                  authentication: authentication,
                  userStatus:
                    element.userStatus == 1 ? 'Hoạt động' : 'Ngừng hoạt động',
                };

                tempList.push(userAu);
                // }
              });
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
      title: 'Chi nhánh',
      dataIndex: 'branch',
      key: 'branch',
    },
    {
      title: 'Phòng ban',
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: 'Loại nhóm',
      dataIndex: 'groupTypes',
      key: 'groupTypes',
    },
    {
      title: 'Vai trò',
      dataIndex: 'roles',
      key: 'roles',
    },
    // {
    //   title: 'Phương thức xác thực',
    //   dataIndex: 'authentication',
    //   key: 'authentication',
    // },
    {
      title: 'Trạng thái',
      dataIndex: 'userStatus',
      key: 'userStatus',
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
    { label: 'Chi nhánh', key: 'branch' },
    { label: 'Phòng ban', key: 'department' },
    { label: 'Loại nhóm', key: 'groupTypes' },
    { label: 'Vai trò', key: 'roles' },
    // { label: 'Phương thức xác thực', key: 'authentication' },
    { label: 'Trạng thái', key: 'userStatus' },
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
            <KTTitle size={2}>
              Quản lý phương thức xác thực người dùng ngân hàng
            </KTTitle>
          </Col>

          <Col span={9}>
            <Row className={'input-search'}>
              <Input
                prefix={<SearchOutlined />}
                placeholder="Mã người dùng/Tên người dùng"
                onChange={(e) => {
                  const currValue = e.target.value;
                  const filteredData = dataSource.current.filter(
                    (entry) =>
                      entry?.userName
                        ?.toLowerCase()
                        .includes(currValue.toLowerCase()) ||
                      entry?.userCode
                        ?.toLowerCase()
                        .includes(currValue.toLowerCase()),
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
              <ExportReactCSV
                csvHeaders={headers}
                csvData={list}
                fileName="Bank_Authentication.csv"
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

export default BM010303View;
