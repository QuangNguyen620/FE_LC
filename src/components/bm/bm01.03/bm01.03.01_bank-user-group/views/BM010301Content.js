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
                          ? 'Admin ng??n h??ng'
                          : 'Ng?????i d??ng ng??n h??ng',
                      channels: element.channels,
                      groupStatus:
                        element.status == 1 ? 'Ho???t ?????ng' : 'Ng???ng ho???t ?????ng',
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
      fixed: 'left',
      width: '5%',
    },
    {
      title: 'M?? nh??m ng?????i d??ng',
      dataIndex: 'userGroupCode',
      key: 'userGroupCode',
      fixed: 'left',
      width: '12%',
    },
    {
      title: 'T??n nh??m ng?????i d??ng',
      dataIndex: 'userGroupName',
      key: 'userGroupName',
      width: '12%',
    },
    {
      title: 'C???p chi nh??nh',
      dataIndex: 'branchLevel',
      key: 'branchLevel',
      width: '8%',
    },
    // {
    //   title: 'Chi nh??nh',
    //   dataIndex: 'branch',
    //   key: 'branch',
    // },
    // {
    //   title: 'Ph??ng ban',
    //   dataIndex: 'department',
    //   key: 'department',
    // },
    {
      title: 'Lo???i nh??m',
      dataIndex: 'groupType',
      key: 'groupType',
      width: '8%',
    },
    // {
    //   title: 'K??nh',
    //   dataIndex: 'channels',
    //   key: 'channels',
    // },

    {
      title: 'Vai tr??',
      dataIndex: 'role',
      key: 'role',
      width: '8%',
    },
    {
      title: 'M?? t???',
      dataIndex: 'description',
      key: 'description',
      width: '15%',
    },
    {
      title: 'Ng?????i t???o',
      dataIndex: 'createdBy',
      key: 'createdBy',
      width: '8%',
    },
    {
      title: 'Ng??y t???o',
      dataIndex: 'createdDate',
      key: 'createdDate',
      width: '8%',
    },
    {
      title: 'Tr???ng th??i',
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
    //   title: 'Ng?????i s???a',
    //   dataIndex: 'lastModifiedBy',
    //   key: 'lastModifiedBy',
    // },
    // {
    //   title: 'Ng??y s???a',
    //   dataIndex: 'lastModifiedDate',
    //   key: 'lastModifiedDate',
    // },
    {
      title: 'Thao t??c',
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
    { label: 'M?? nh??m ng?????i d??ng', key: 'userGroupCode' },
    { label: 'T??n nh??m ng?????i d??ng', key: 'userGroupName' },
    { label: 'C???p chi nh??nh', key: 'branchLevel' },
    { label: 'Chi nh??nh', key: 'branch' },
    // { label: 'Ph??ng ban', key: 'department' },
    { label: 'Lo???i nh??m', key: 'groupType' },
    // { label: 'K??nh', key: 'channels' },
    { label: 'Vai tr??', key: 'role' },
    { label: 'M?? t???', key: 'description' },
    { label: 'Ng?????i t???o', key: 'createdBy' },
    { label: 'Ng??y t???o', key: 'createdDate' },
    { label: 'Tr???ng th??i', key: 'status' },
    // { label: 'Ng?????i s???a', key: 'lastModifiedBy' },
    // { label: 'Ng??y s???a', key: 'lastModifiedDate' },
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
            Xu???t Excel
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
            <KTTitle size={2}>Qu???n l?? nh??m ng?????i d??ng ng??n h??ng</KTTitle>
          </Col>
          <Col span={15}>
            <Row className={'marginR-md'}>
              <Input
                className={'input-search'}
                prefix={<SearchOutlined />}
                placeholder="Nh???p m?? nh??m ng?????i d??ng ng??n h??ng/ t??n nh??m"
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
                B??? l???c <FilterOutlined />
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
                Th??m m???i <PlusOutlined />
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
