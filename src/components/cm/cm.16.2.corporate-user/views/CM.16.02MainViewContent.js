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
  DatePicker,
  Space,
} from 'antd';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { EyeFilled, SearchOutlined } from '@ant-design/icons';
// import './AM.01.05.01CorporateCustomer.less';
// import '../../../assets/less/LC-common.less';
import { CM1602Domain } from '../domains/CM.16.02Domain';
import { KTTitle } from 'core/ui';
var axios = require('axios');

const CM1602MainViewContent = ({ lang = 'vi', ...props }) => {
  const { t } = useTranslation();
  const [, domain] = CM1602Domain();
  const [filterModalVisible, setFilterVisible] = useState(false);
  const dateFormatList = 'DD/MM/YYYY';
  const handleVisibleChange = () => {
    if (filterModalVisible == true) {
      setFilterVisible(false);
    } else {
      setFilterVisible(true);
    }
  };

  const [list, setList] = useState([]);

  const dataSource = useRef();
  // const [value, setValue] = useState('');

  function convert(str) {
    var date = new Date(str),
      mnth = ('0' + (date.getMonth() + 1)).slice(-2),
      day = ('0' + date.getDate()).slice(-2);
    return [day, mnth, date.getFullYear()].join('/');
  }

  useEffect(() => {
    const fetchData = () => {
      var config = domain.getAllCorporateUser();

      config
        .then((result) => {
          axios(result)
            .then(function (response) {
              var tempList = [];
              response.data.data.forEach((element, index) => {
                console.log(element);
                console.log(index);
                var userGroupCode = '';
                var userRole = '';

                if (element.userGroupEntitys.length > 0) {
                  userGroupCode = element.userGroupEntitys[0].userGroupCode;
                  userRole = element.userGroupEntitys[0].role;
                } else {
                  userGroupCode = '';
                  userRole = '';
                }

                var user = {
                  id: element.id,
                  stt: index + 1,
                  userId: element.userCode,
                  userName: element.userName,
                  userGroupCode: userGroupCode,
                  role: userRole,
                  status:
                    element.userStatus == 1 ? 'Ho???t ?????ng' : 'Kh??ng ho???t ?????ng',
                  createdDate: convert(element.createdDate),
                  createdBy: element.createdBy,
                  editedDate: convert(element.lastModifiedDate),
                  editedBy: element.lastModifiedBy,
                };

                tempList.push(user);
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
    },
    {
      title: 'M?? ng?????i d??ng',
      dataIndex: 'userId',
      key: 'userId',
      // width: '10%',
    },
    {
      title: 'T??n hi???n th???',
      dataIndex: 'userName',
      key: 'userName',
      // width: '12%',
    },
    {
      title: 'M?? nh??m ND',
      dataIndex: 'userGroupCode',
      key: 'userGroupCode',
      // width: '8%',
    },
    {
      title: 'Vai tr??',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Tr???ng th??i',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Ng??y t???o',
      dataIndex: 'createdDate',
      key: 'createdDate',
    },
    {
      title: 'Ng?????i t???o',
      dataIndex: 'createdBy',
      key: 'createdBy',
    },
    {
      title: 'Ng??y s???a',
      dataIndex: 'editedDate',
      key: 'editedDate',
    },

    {
      title: 'Ng?????i s???a',
      dataIndex: 'editedBy',
      key: 'editedBy',
    },
    {
      title: 'Thao t??c',
      dataIndex: 'activity',
      key: 'x',

      render: (text, record, index) => (
        <Row>
          <Tooltip placement="top" title={'Xem'}>
            <Link
              onClick={(e) => {
                domain.toViewPage(record.id);
                console.log("Record's key is :", record);
              }}
              className="activities-btn"
            >
              <Avatar
                size="small"
                icon={<EyeFilled style={{ color: '#595959' }} />}
              />
            </Link>
          </Tooltip>
        </Row>
      ),
    },
  ];

  return (
    <>
      <div style={{ background: 'white', borderRadius: '5px' }}>
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
                <Col span={8}>M?? doanh nghi???p</Col>
                <Col span={3}></Col>
                <Col span={13}>
                  <Input />
                </Col>
              </Row>
            </Form.Item>
            <Form.Item>
              <Row>
                <Col span={8}>T??n doanh nghi???p</Col>
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
                  <Input />
                </Col>
              </Row>
            </Form.Item>

            <Form.Item>
              <Row>
                <Col span={8}>Ng??y t???o t???</Col>
                <Col span={3}></Col>
                <Col span={13}>
                  <DatePicker
                    style={{ width: '100%' }}
                    defaultValue={moment('01/01/2015')}
                    format={dateFormatList}
                  />
                </Col>
              </Row>
            </Form.Item>

            <Form.Item>
              <Row>
                <Col span={8}>Ng??y t???o ?????n</Col>
                <Col span={3}></Col>
                <Col span={13}>
                  <DatePicker
                    style={{ width: '100%' }}
                    defaultValue={moment('01/01/2015')}
                    format={dateFormatList}
                  />
                </Col>
              </Row>
            </Form.Item>
          </Form>
        </Modal>

        <Row style={{ padding: 16 }}>
          <Col span={15}>
            <KTTitle size={2}>Danh s??ch ng?????i d??ng doanh nghi???p</KTTitle>
          </Col>

          <Col span={9}>
            <Row style={{ float: 'right' }}>
              <Input
                style={{ width: '70%' }}
                prefix={<SearchOutlined />}
                onChange={(e) => {
                  const currValue = e.target.value;
                  const filteredData = dataSource.current.filter(
                    (entry) =>
                      entry.userName
                        .toLowerCase()
                        .includes(currValue.toLowerCase()) ||
                      entry.role
                        .toLowerCase()
                        .includes(currValue.toLowerCase()) ||
                      entry.userGroupCode
                        .toLowerCase()
                        .includes(currValue.toLowerCase()),
                  );
                  setList(filteredData);
                }}
              />
              <Button onClick={handleVisibleChange} id="filter-btn">
                B??? l???c
              </Button>
            </Row>
          </Col>
        </Row>

        <Row
          style={{
            padding: 16,
          }}
        >
          <Table
            style={{ width: '100%' }}
            bordered
            columns={columns}
            dataSource={list}
            pagination={{ pageSize: 4 }}
            scroll={{ x: 'max-content' }}
          />
        </Row>
      </div>
    </>
  );
};

export default CM1602MainViewContent;
