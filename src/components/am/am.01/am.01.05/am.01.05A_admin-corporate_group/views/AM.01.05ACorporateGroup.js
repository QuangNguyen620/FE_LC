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
  Space,
} from 'antd';
import { Link } from 'react-router-dom';
import { EyeFilled, SearchOutlined } from '@ant-design/icons';

import '../common/less/AM.01.05A.less';
import '../../../../../../assets/less/LC-common.less';
import { useA00Domain } from '../domains/AM.01.05ADomain';
import { KTTitle } from 'core/ui';
import moment from 'moment';
import { CSVLink } from 'react-csv';

var axios = require('axios');

const AM0105ACorporateGroup = ({ lang = 'vi', ...props }) => {
  const { t } = useTranslation();
  const [, am0105ADomain] = useA00Domain();
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
        url:
          process.env.REACT_APP_API_BACKEND +
          '/corporate/group/co/getUserGroups',
        headers: {
          Authorization:
            'Bearer ' + sessionStorage.getItem('access_token') + '',
          'Content-Type': 'application/json',
        },
      };

      axios(config)
        .then(function (response) {
          console.log(response);

          var listGroup = [];
          listGroup = response.data.data;
          var i = 1;
          listGroup.forEach((group) => {
            group.stt = i++;
            group.status = group.status == 1 ? 'Hoạt động' : 'Ngưng hoạt động';
          });
          setList(listGroup);
          dataSource.current = listGroup;
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
    },
    {
      title: 'Mã nhóm người dùng',
      dataIndex: 'userGroupCode',
      key: 'userGroupCode',
      width: '10%',
    },
    {
      title: 'Tên nhóm người dùng',
      dataIndex: 'userGroupName',
      key: 'userGroupName',
      width: '12%',
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      width: '20%',
    },
    {
      title: 'Kênh',
      dataIndex: 'channels',
      key: 'channels',
      width: '8%',
    },
    {
      title: 'Vai trò',
      dataIndex: 'role',
      key: 'role',
      width: '8%',
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdDate',
      key: 'createdDate',
      width: '8%',
      render: (text) => moment(text).format('DD/MM/YYYY'),
    },
    {
      title: 'Người tạo',
      dataIndex: 'createdBy',
      key: 'createdBy',
      width: '8%',
    },
    {
      title: 'Ngày sửa',
      dataIndex: 'lastModifiedDate',
      key: 'lastModifiedDate',
      width: '8%',
      render: (text) => moment(text).format('DD/MM/YYYY'),
    },
    {
      title: 'Người sửa',
      dataIndex: 'lastModifiedBy',
      key: 'lastModifiedBy',
      width: '8%',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: '8%',
    },
    {
      title: 'Thao tác',
      dataIndex: 'activity',
      width: 130,
      key: 'x',
      width: '8%',
      render: (text, record, index) => (
        <Row className="item-center">
          <Tooltip placement="top" title={'Xem'}>
            <Link
              onClick={(e) => {
                am0105ADomain.toViewPage(record.id);
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
    { label: 'Mô tả', key: 'description' },
    { label: 'Kênh', key: 'channels' },
    { label: 'Vai trò', key: 'role' },
    { label: 'Ngày tạo', key: 'createdDate' },
    { label: 'Người tạo', key: 'createdBy' },
    { label: 'Ngày sửa', key: 'lastModifiedDate' },
    { label: 'Người sửa', key: 'lastModifiedBy' },
    { label: 'Trạng thái', key: 'status' },
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
        ></Modal>

        <Row className={'padding-md'}>
          <Col span={15}>
            <KTTitle size={2}>
              <b>Quản lý nhóm người dùng Doanh nghiệp</b>
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
                      entry?.userGroupCode
                        ?.toLowerCase()
                        .includes(currValue?.toLowerCase()) ||
                      entry?.userGroupName
                        ?.toLowerCase()
                        .includes(currValue?.toLowerCase()) ||
                      entry?.role
                        ?.toLowerCase()
                        .includes(currValue?.toLowerCase()),
                  );
                  setList(filteredData);
                }}
                placeholder="Nhập mã nhóm người dùng, Tên nhóm người dùng ..."
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
              <Button onClick={am0105ADomain.toAddPage} className="common-btn">
                Thêm mới
              </Button>{' '}
              <ExportReactCSV
                csvHeaders={headers}
                csvData={list}
                fileName="Corporate_Group.csv"
              />
              {/* <Button className="common-btn">Tải xuống</Button> */}
            </Row>
          </Col>
        </Row>

        <Row className="padding-md">
          <Col>
            <Table
              bordered
              columns={columns}
              dataSource={list}
              pagination={{ pageSize: 20 }}
              scroll={{ x: 'max-content' }}
            />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default AM0105ACorporateGroup;
