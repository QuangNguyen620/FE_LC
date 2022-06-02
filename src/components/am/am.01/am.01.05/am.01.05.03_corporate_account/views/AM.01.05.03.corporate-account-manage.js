import React, { useState, useEffect, useRef } from 'react';
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
  DatePicker,
} from 'antd';
import { Link } from 'react-router-dom';
import { EyeFilled, SearchOutlined } from '@ant-design/icons';
// import { KTBodyText, KTHeading, KTLogo } from 'core/ui';
import '../common/less/AM.01.05.03.less';
import '../../../../../../assets/less/LC-common.less';
import { useA00Domain } from '../domains/AM.01.05.03Domain';
import { KTTitle } from 'core/ui';
import { CSVLink } from 'react-csv';

var axios = require('axios');

const AM010503CorporateAccountView = ({ lang = 'vi', ...props }) => {
  const [, am010503Domain] = useA00Domain();
  const [filterModalVisible, setFilterVisible] = useState(false);
  const dataSource = useRef();

  const handleVisibleChange = () => {
    if (filterModalVisible == true) {
      setFilterVisible(false);
    } else {
      setFilterVisible(true);
    }
  };

  const [list, setList] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      var config = {
        method: 'get',
        url: process.env.REACT_APP_API_BACKEND + '/corporate/account/getAll',
        headers: {
          Authorization:
            'Bearer ' + sessionStorage.getItem('access_token') + '',
          'Content-Type': 'application/json',
        },
      };
      axios(config)
        .then(function (response) {
          var array = response.data.data;
          var index = 0;
          // thêm stt cho list
          array.forEach((element) => {
            element.stt = index++;
          });
          setList(array);
          dataSource.current = array;
          console.log('ListAcc', array);
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
      render: (text, record, index) => (
        <Space>
          <p>{index + 1}</p>
        </Space>
      ),
    },
    {
      title: 'Mã doanh nghiệp',
      dataIndex: 'corporateCode',
      key: 'corporateCode',
    },
    {
      title: 'Tên doanh nghiệp',
      dataIndex: 'corporateName',
      key: 'corporateName',
    },
    {
      title: 'Số tài khoản',
      dataIndex: 'corporateAccountNumber',
      key: 'corporateAccountNumber',
    },
    {
      title: 'Tên tài khoản',
      dataIndex: 'corporateAccountName',
      key: 'corporateAccountName',
    },
    {
      title: 'Loại tài khoản',
      dataIndex: 'corporateAccountType',
      key: 'corporateAccountType',
    },
    {
      title: 'Ngân hàng',
      dataIndex: 'bankName',
      key: 'bankName',
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
                am010503Domain.toViewPage(record.corporateAccountId);
                console.log("Record's key is :", record.corporateAccountId);
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
    { label: 'Mã doanh nghiệp', key: 'corporateCode' },
    { label: 'Tên doanh nghiệp', key: 'corporateName' },
    { label: 'Số tài khoản', key: 'corporateAccountNumber' },
    { label: 'Tên tài khoản', key: 'corporateAccountName' },
    { label: 'Loại tài khoản', key: 'corporateAccountType' },
    { label: 'Ngân hàng', key: 'bankName' },
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
        <Modal
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
                <Col span={8}>Mã doanh nghiệp</Col>
                <Col span={3}></Col>
                <Col span={13}>
                  <Input />
                </Col>
              </Row>
            </Form.Item>
            <Form.Item>
              <Row>
                <Col span={8}>Tên doanh nghiệp</Col>
                <Col span={3}></Col>
                <Col span={13}>
                  <Input />
                </Col>
              </Row>
            </Form.Item>
            <Form.Item>
              <Row>
                <Col span={8}>Ngân hàng</Col>
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
                <Col span={8}>Ngày tạo từ</Col>
                <Col span={3}></Col>
                <Col span={13}>
                  <DatePicker />
                </Col>
              </Row>
            </Form.Item>
            <Form.Item>
              <Row>
                <Col span={8}>Ngày tạo đến</Col>
                <Col span={3}></Col>
                <Col span={13}>
                  <DatePicker />
                </Col>
              </Row>
            </Form.Item>
          </Form>
        </Modal>

        <Row className={'padding-md'}>
          <Col span={15}>
            <KTTitle size={2}>Danh sách tài khoản Doanh nghiệp</KTTitle>
          </Col>

          <Col span={9}>
            <Row className={'input-search'}>
              <Input
                prefix={<SearchOutlined />}
                onChange={(e) => {
                  const currValue = e.target.value;
                  const filteredData = dataSource.current.filter(
                    (entry) =>
                      entry.bankName
                        ?.toLowerCase()
                        .includes(currValue?.toLowerCase()) ||
                      entry.corporateAccountName
                        ?.toLowerCase()
                        .includes(currValue?.toLowerCase()) ||
                      entry.corporateCode
                        ?.toLowerCase()
                        .includes(currValue?.toLowerCase()) ||
                      entry.corporateName
                        ?.toLowerCase()
                        .includes(currValue?.toLowerCase()),
                  );
                  setList(filteredData);
                }}
                placeholder="Nhập mã doanh nghiệp, Tên doanh nghiệp, ngân hàng ..."
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
              <ExportReactCSV
                csvHeaders={headers}
                csvData={list}
                fileName="Corporate_Account.csv"
              />
              {/* <Button className="common-btn">Tải xuống</Button> */}
            </Row>
          </Col>
        </Row>
        <Row className={'padding-md'}>
          <Col span={24}>
            <Table
              columns={columns}
              dataSource={list}
              scroll={{ x: 300 }}
              pagination={{ pageSize: 4 }}
            />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default AM010503CorporateAccountView;
