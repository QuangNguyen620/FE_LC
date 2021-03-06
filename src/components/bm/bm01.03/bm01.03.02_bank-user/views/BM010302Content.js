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
                        ? 'Admin ng??n h??ng'
                        : 'Ng?????i d??ng ng??n h??ng',

                    userStatus:
                      element.userStatus == '1'
                        ? 'Ho???t ?????ng'
                        : 'Ng???ng ho???t ?????ng',

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
      title: 'M?? ng?????i d??ng',
      dataIndex: 'userCode',
      key: 'userCode',
    },
    {
      title: 'T??n ng?????i d??ng',
      dataIndex: 'userName',
      key: 'userName',
    },
    {
      title: 'C???p chi nh??nh',
      dataIndex: 'branchLevels',
      key: 'branchLevels',
    },
    {
      title: 'K??nh',
      dataIndex: 'channels',
      key: 'channels',
    },
    {
      title: 'Lo???i nh??m',
      dataIndex: 'groupType',
      key: 'groupType',
    },
    {
      title: 'M?? nh??m ng?????i d??ng',
      dataIndex: 'userGroupCode',
      key: 'userGroupCode',
    },
    {
      title: 'Vai tr??',
      dataIndex: 'roles',
      key: 'roles',
    },
    {
      title: 'Tr???ng th??i',
      dataIndex: 'userStatus',
      key: 'userStatus',
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
    { label: 'M?? ng?????i d??ng', key: 'userCode' },
    { label: 'T??n ng?????i d??ng', key: 'userName' },
    { label: 'C???p chi nh??nh', key: 'branchLevels' },
    { label: 'Chi nh??nh', key: 'branch' },
    { label: 'Ph??ng ban', key: 'department' },
    { label: 'K??nh', key: 'channels' },
    { label: 'Lo???i nh??m', key: 'groupType' },
    { label: 'M?? nh??m ng?????i d??ng', key: 'userGroupCode' },
    { label: 'Vai tr??', key: 'roles' },
    { label: 'Tr???ng th??i', key: 'userStatus' },
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
        {/* <Modal
          title="B??? l???c t??m ki???m"
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
              T??m ki???m
            </Button>,
            <Button
              key="back"
              className="secondary-btn"
              onClick={handleVisibleChange}
            >
              ????ng
            </Button>,
          ]}
        >
          <Form layout="horizontal">
            <Form.Item>
              <Row>
                <Col span={8}>M?? nh??m ng?????i d??ng</Col>
                <Col span={3}></Col>
                <Col span={13}>
                  <Input />
                </Col>
              </Row>
            </Form.Item>
            <Form.Item>
              <Row>
                <Col span={8}>T??n nh??m ng?????i d??ng</Col>
                <Col span={3}></Col>
                <Col span={13}>
                  <Input />
                </Col>
              </Row>
            </Form.Item>
            <Form.Item>
              <Row>
                <Col span={8}>K??nh</Col>
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
                <Col span={8}>Lo???i ng?????i d??ng</Col>
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
                <Col span={8}>Lo???i nh??m</Col>
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
                <Col span={8}>Vai tr??</Col>
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
            <KTTitle size={2}>Qu???n l?? ng?????i d??ng ng??n h??ng</KTTitle>
          </Col>

          <Col span={9}>
            <Row className={'input-search'}>
              <Input
                prefix={<SearchOutlined />}
                placeholder="Nh???p m?? nh??m ng?????i d??ng, t??n nh??m ng?????i d??ng, vai tr??, k??nh, chi nh??nh"
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
              {/* <Button id="filter-btn">B??? l???c</Button> */}
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
                Th??m m???i
              </Button>
              <ExportReactCSV
                csvHeaders={headers}
                csvData={list}
                fileName="Bank_User.csv"
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

export default BM010302View;
