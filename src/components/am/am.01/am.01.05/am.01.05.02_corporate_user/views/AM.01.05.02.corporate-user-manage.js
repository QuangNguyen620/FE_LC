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
  Space,
} from 'antd';
import { Link } from 'react-router-dom';
import { EyeFilled, SearchOutlined } from '@ant-design/icons';

import '../common/less/AM.01.05.02.less';
import '../../../../../../assets/less/LC-common.less';
import { useA00Domain } from '../domains/AM.01.05.02Domain';
import { KTTitle } from 'core/ui';
import moment from 'moment';
import { CSVLink } from 'react-csv';

var axios = require('axios');

const AM010502CorporateUserView = ({ lang = 'vi', ...props }) => {
  const { t } = useTranslation();
  const [, am010502Domain] = useA00Domain();
  const [filterModalVisible, setFilterVisible] = useState(false);
  const dataSource = useRef();

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

  useEffect(() => {
    const fetchData = () => {
      var config = {
        method: 'get',
        url: process.env.REACT_APP_API_BACKEND + '/corporate/user/getAll',
        headers: {
          Authorization:
            'Bearer ' + sessionStorage.getItem('access_token') + '',
          'Content-Type': 'application/json',
        },
      };
      axios(config)
        .then(function (response) {
          var userList = response.data.data;
          for (let i = 0; i < userList.length; i++) {
            userList[i].stt = i + 1;
            if (
              userList[i].lastModifiedDate.slice(0, 19) ===
              userList[i].createdDate.slice(0, 19)
            ) {
              userList[i].lastModifiedDate = null;
              userList[i].lastModifiedBy = null;
            }
            if (userList[i]?.channelInit?.toLowerCase() == 'corporate') {
              userList[i].channelInit = 'Doanh nghi???p';
            }
            if (userList[i]?.userStatus == 0) {
              userList[i].userStatus = 'Ng??ng ho???t ?????ng';
            } else {
              userList[i].userStatus = 'Ho???t ?????ng';
            }
          }
          setList(userList);
          dataSource.current = userList;
          console.log('ListUser', userList);
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
      // render: (text, record, index) => (
      //   <Space>
      //     <p>{index + 1}</p>
      //   </Space>
      // ),
    },
    {
      title: 'M?? doanh nghi???p',
      dataIndex: 'corporateCode',
      key: 'corporateCode',
    },
    {
      title: 'T??n doanh nghi???p',
      dataIndex: 'corporateName',
      key: 'corporateName',
    },
    {
      title: 'M?? ng?????i d??ng',
      dataIndex: 'userCode',
      key: 'userCode',
    },
    {
      title: 'M?? nh??m ng?????i d??ng',
      dataIndex: 'userGroupCode',
      key: 'userGroupCode',
    },
    {
      title: 'K??nh kh???i t???o',
      dataIndex: 'channelInit',
      key: 'channelInit',
    },
    {
      title: 'Ng??y t???o',
      dataIndex: 'createdDate',
      key: 'createdDate',
      render: (text) => {
        if (text == null) {
          return '';
        } else {
          return moment(text).format('DD/MM/YYYY');
        }
      },
    },
    {
      title: 'Ng?????i t???o',
      dataIndex: 'createdBy',
      key: 'createdBy',
    },
    {
      title: 'Ng??y s???a',
      dataIndex: 'lastModifiedDate',
      key: 'lastModifiedDate',
      render: (text) => {
        if (text == null) {
          return '';
        } else {
          return moment(text).format('DD/MM/YYYY');
        }
      },
    },
    {
      title: 'Ng?????i s???a',
      dataIndex: 'lastModifiedBy',
      key: 'lastModifiedBy',
    },
    {
      title: 'Tr???ng th??i',
      dataIndex: 'userStatus',
      key: 'userStatus',
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
                am010502Domain.toViewPage(record.id);
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
    { label: 'M?? doanh nghi???p', key: 'corporateCode' },
    { label: 'T??n doanh nghi???p', key: 'corporateName' },
    { label: 'M?? ng?????i d??ng', key: 'userCode' },
    { label: 'M?? nh??m ng?????i d??ng', key: 'userGroupCode' },
    { label: 'K??nh kh???i t???o', key: 'channelInit' },
    { label: 'Ng??y t???o', key: 'createdDate' },
    { label: 'Ng?????i t???o', key: 'createdBy' },
    { label: 'Ng??y s???a', key: 'lastModifiedDate' },
    { label: 'Ng?????i s???a', key: 'lastModifiedBy' },
    { label: 'Tr???ng th??i', key: 'userStatus' },
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
        <Modal
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
        </Modal>

        <Row className={'padding-md'}>
          <Col span={15}>
            <KTTitle size={2}>
              <b>Danh s??ch ng?????i d??ng</b>
            </KTTitle>
          </Col>

          <Col span={9}>
            <Row className={'input-search'}>
              <Input
                prefix={<SearchOutlined />}
                onChange={(e) => {
                  const currValue = e.target.value;
                  const filteredData = dataSource.current.filter(
                    (entry) =>
                      entry.corporateCode
                        ?.toLowerCase()
                        .includes(currValue?.toLowerCase()) ||
                      entry?.corporateName
                        ?.toLowerCase()
                        .includes(currValue?.toLowerCase()) ||
                      entry?.userCode
                        ?.toLowerCase()
                        .includes(currValue?.toLowerCase()) ||
                      entry?.userGroupCode
                        ?.toLowerCase()
                        .includes(currValue?.toLowerCase()) ||
                      entry?.userGroupCode
                        ?.toLowerCase()
                        .includes(currValue?.toLowerCase()) ||
                      entry?.channelInit
                        ?.toLowerCase()
                        .includes(currValue?.toLowerCase()),
                  );
                  setList(filteredData);
                }}
                placeholder="Nh???p m?? ng?????i d??ng, T??n ng?????i d??ng ..."
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
              <Button onClick={am010502Domain.toAddPage} className="common-btn">
                Th??m m???i
              </Button>
              <ExportReactCSV
                csvHeaders={headers}
                csvData={list}
                fileName="Corporate_User.csv"
              />
              {/* <Button className="common-btn">T???i xu???ng</Button> */}
            </Row>
          </Col>
        </Row>
        <Row className={'padding-md'}>
          <Col span={24}>
            <Table
              columns={columns}
              dataSource={list}
              scroll={{ x: 300 }}
              pagination={{ pageSize: 20 }}
            />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default AM010502CorporateUserView;
