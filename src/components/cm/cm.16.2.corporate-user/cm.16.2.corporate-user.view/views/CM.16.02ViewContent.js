import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Col, Row, Input, Button, Form, Divider, Space } from 'antd';
import { useParams } from 'react-router-dom';

import moment from 'moment';
import { EyeFilled, SearchOutlined } from '@ant-design/icons';
import './CM.16.02View.less';
// import '../../../assets/less/LC-common.less';
import { CM1602Domain } from '../domains/CM.16.02ViewDomain';
import { KTTitle } from 'core/ui';
var axios = require('axios');

const CM1602MainViewContent = ({ lang = 'vi', ...props }) => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [, domain] = CM1602Domain();
  const [filterModalVisible, setFilterVisible] = useState(false);
  const [form] = Form.useForm();

  // const [corporateList, setCorporeateList] = useState([]);
  // const [corporateName, setCorporeateName] = useState('');
  // const [corporateGroupList, setCorporateGroupList] = useState([]);
  const [roleGroup, setRoleGroup] = useState('');

  const dateFormatList = 'DD/MM/YYYY';
  const exceptThisSymbols = ['e', 'E', '+', '-', '.'];

  function convert(str) {
    var date = new Date(str),
      mnth = ('0' + (date.getMonth() + 1)).slice(-2),
      day = ('0' + date.getDate()).slice(-2);
    return [day, mnth, date.getFullYear()].join('/');
  }
  var userGroupList = [];
  useEffect(() => {
    function fetchCorporateGroup() {
      var url =
        process.env.REACT_APP_API_BACKEND + '/corporate/group/co/getUserGroups';
      var config = {
        method: 'get',
        url: url,
        headers: {
          Authorization:
            'Bearer ' + sessionStorage.getItem('access_token') + '',
        },
      };
      // console.log(config);
      axios(config)
        .then(function (response) {
          // console.log(response);
          var array = response.data.data;

          var tempCorporateGroupList = [];
          array.forEach((element) => {
            var tempCorporateGroup = {};
            tempCorporateGroup.value = element.id;
            tempCorporateGroup.label = element.userGroupCode;
            tempCorporateGroup.role = element.role;
            tempCorporateGroupList.push(tempCorporateGroup);
          });
          // setCorporateGroupList(tempCorporateGroupList);
          userGroupList = tempCorporateGroupList;
          console.log('ListGroup', tempCorporateGroupList);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    fetchCorporateGroup();
    return () => {};
  }, []);

  useEffect(() => {
    const fetchData = () => {
      var config = domain.getCorporateUserByID(id);

      config
        .then((result) => {
          axios(result)
            .then(function (response) {
              console.log(response);
              var user = response.data.data;
              // setUserInput(user);
              let groupCode = user.userGroupCode;
              userGroupList.forEach((group) => {
                if (group.label == groupCode) {
                  setRoleGroup(group.role);
                }
              });
              console.log('Role::', roleGroup);

              form.setFieldsValue({
                corporateCode: user.corporateCode,
                corporateName: user.corporateName,
                userCode: user.userCode,
                userName: user.userName,
                userGroupCode: groupCode,
                phoneNumber: user.phoneNumber,
                email: user.email,
              });
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

  return (
    <>
      <div style={{ background: 'white', borderRadius: '5px' }}>
        <Row style={{ paddingLeft: 16, paddingTop: 16 }}>
          <Col span={15}>
            <KTTitle size={2}>Quản lý người dùng doanh nghiệp</KTTitle>
          </Col>
        </Row>
        <Row style={{ paddingLeft: 16, paddingTop: 5, paddingBottom: 15 }}>
          <Col span={15}>
            <KTTitle size={4}>Xem thông tin</KTTitle>
          </Col>
        </Row>
        <Row style={{ padding: 16 }}>
          <Col span={24}>
            <Form form={form} layout="horizontal">
              <Row>
                <Col span={23}>
                  <div id="form-body">
                    <section>
                      <Row>
                        <Col span={15}>
                          <KTTitle size={3}>
                            Thông tin chi tiết khách hàng
                          </KTTitle>
                        </Col>
                      </Row>
                      <Divider />
                      <Row>
                        <Col span={8}>
                          Mã doanh nghiệp{' '}
                          <span style={{ color: '#F5222D' }}></span>
                        </Col>
                        <Col span={16}>
                          <Form.Item name={'corporateCode'}>
                            <Input disabled />
                          </Form.Item>
                        </Col>
                      </Row>

                      <Row>
                        <Col span={8}>
                          Tên doanh nghiệp{' '}
                          <span style={{ color: '#F5222D' }}></span>
                        </Col>
                        <Col span={16}>
                          <Form.Item name={'corporateName'}>
                            <Input disabled />
                          </Form.Item>
                        </Col>
                      </Row>
                    </section>
                    <section>
                      <Row>
                        <Col span={15}>
                          <KTTitle size={3}>Thông tin người dùng</KTTitle>
                        </Col>
                      </Row>
                      <Divider />
                      <Row>
                        <Col span={8}>
                          Mã người dùng
                          <span style={{ color: '#F5222D' }}></span>
                        </Col>
                        <Col span={16}>
                          <Form.Item name={'userCode'}>
                            <Input disabled />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={8}>
                          Tên hiển thị{' '}
                          <span style={{ color: '#F5222D' }}></span>
                        </Col>
                        <Col span={16}>
                          <Form.Item
                            name={'userName'}
                            rules={[
                              {
                                required: true,
                                message:
                                  'Trường tên hiển thị không được phép để trống!',
                              },
                            ]}
                          >
                            <Input disabled />
                          </Form.Item>
                        </Col>
                      </Row>

                      <Row>
                        <Col span={8}>
                          Mã nhóm người dùng{' '}
                          <span style={{ color: '#F5222D' }}></span>
                        </Col>
                        <Col span={16}>
                          <Form.Item name={'userGroupCode'}>
                            <Input suffix={<SearchOutlined />} disabled />
                          </Form.Item>
                        </Col>
                      </Row>

                      <Row>
                        <Col span={8}>
                          Vai trò
                          <span style={{ color: '#F5222D' }}></span>
                        </Col>
                        <Col span={16}>
                          <Form.Item>
                            <Input disabled value={roleGroup} />
                          </Form.Item>
                        </Col>
                      </Row>
                    </section>
                    <section>
                      <Row>
                        <Col span={15}>
                          <KTTitle size={3}>Thông tin liên hệ</KTTitle>
                        </Col>
                      </Row>
                      <Divider />
                      <Row>
                        <Col span={8}>
                          Số điện thoại di động
                          <span style={{ color: '#F5222D' }}></span>
                        </Col>
                        <Col span={16}>
                          <Form.Item name={'phoneNumber'}>
                            <Input
                              type={'number'}
                              onKeyDown={(e) =>
                                exceptThisSymbols.includes(e.key) &&
                                e.preventDefault()
                              }
                              disabled
                            />
                          </Form.Item>
                        </Col>
                      </Row>

                      <Row>
                        <Col span={8}>
                          Địa chỉ email{' '}
                          <span style={{ color: '#F5222D' }}></span>
                        </Col>
                        <Col span={16}>
                          <Form.Item name={'email'}>
                            <Input type={'email'} disabled />
                          </Form.Item>
                        </Col>
                      </Row>
                    </section>
                  </div>

                  <div style={{ textAlign: '-webkit-center' }} id="form-footer">
                    <Form.Item>
                      <Space
                        direction="horizontal"
                        size={16}
                        style={{
                          marginRight: 'auto',
                        }}
                        wrap
                      >
                        <Button
                          className="common-btn"
                          onClick={(e) => {
                            domain.toEditPage(id);
                          }}
                        >
                          Sửa
                        </Button>
                        <Button
                          className="common-btn"
                          onClick={(e) => {
                            domain.toAuthenticationPage(id);
                          }}
                        >
                          Xem phân quyền
                        </Button>
                        <Button
                          onClick={domain.exitHandler}
                          className="secondary-btn"
                        >
                          Đóng
                        </Button>
                      </Space>
                    </Form.Item>
                  </div>
                </Col>
                <Col span={1}></Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default CM1602MainViewContent;
