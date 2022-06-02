import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Col, Row, Input, Button, Form, Divider, Space } from 'antd';
import { useParams } from 'react-router-dom';

import moment from 'moment';
import { EyeFilled, SearchOutlined } from '@ant-design/icons';
import './CM.16.02Edit.less';
// import '../../../assets/less/LC-common.less';
import UpdateSuccessfullModal from 'components/cm/cm.16.2.corporate-user/cm.16.2.corporate-user.edit/views/modal/updateSuccessModal';
import { CM1602Domain } from '../domains/CM.16.02EditDomain';
import { KTTitle } from 'core/ui';
var axios = require('axios');

const CM1602MainViewContent = ({ lang = 'vi', ...props }) => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [, domain] = CM1602Domain();
  const [filterModalVisible, setFilterVisible] = useState(false);
  const [form] = Form.useForm();

  const [modalVisible, setModalVisible] = useState(false);
  // const [corporateList, setCorporeateList] = useState([]);
  // const [corporateName, setCorporeateName] = useState('');
  // const [corporateGroupList, setCorporateGroupList] = useState([]);
  const [roleGroup, setRoleGroup] = useState('');

  const dateFormatList = 'DD/MM/YYYY';
  const exceptThisSymbols = ['e', 'E', '+', '-', '.'];

  const handleVisibleChange = () => {
    if (filterModalVisible == true) {
      setFilterVisible(false);
    } else {
      setFilterVisible(true);
    }
  };

  const [user, setUser] = useState({
    corporateId: '',
    userCode: '',
    userName: '',
    listUserGroupCode: [],
    userGroupCode: '',
    userStatus: '1',
    phoneNumber: '',
    email: '',
  });

  // const [list, setList] = useState([]);

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
              setUser(user);
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
  //------------Set state input----------------//

  const onUserNameChange = (e) => {
    setUser({
      ...user,
      userName: e.target.value,
    });
  };

  const onPhoneNumberChange = (e) => {
    setUser({
      ...user,
      phoneNumber: e.target.value,
    });
  };

  const onEmailChange = (e) => {
    setUser({
      ...user,
      email: e.target.value,
    });
  };

  //---------------------------------------------//

  function closeModal(data) {
    console.log(data);
    setModalVisible(false);
    domain.exitHandler(id);
  }

  // update user corporate --------------
  const submitHandler = () => {
    var data = {
      userCode: user.userCode,
      userName: user.userName,
      // listUserGroupCode: userInput.listUserGroupCode,
      userGroupCode: user.userGroupCode,
      phoneNumber: user.phoneNumber,
      email: user.email,
      userStatus: user.userStatus,
    };

    console.log('Received values of form: ', data);

    var configPromise = domain.updateUserHandler(
      localStorage.corporateId,
      id,
      data,
    );
    configPromise
      .then((result) => {
        axios(result)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
            setModalVisible(true);
          })
          .catch(function (error) {
            console.log(error.data);
          });
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <UpdateSuccessfullModal
        isVisbled={modalVisible}
        onCloseModal={closeModal}
      />
      <div style={{ background: 'white', borderRadius: '5px' }}>
        <Row style={{ paddingLeft: 16, paddingTop: 16 }}>
          <Col span={15}>
            <KTTitle size={2}>Quản lý người dùng doanh nghiệp</KTTitle>
          </Col>
        </Row>
        <Row style={{ paddingLeft: 16, paddingTop: 5, paddingBottom: 15 }}>
          <Col span={15}>
            <KTTitle size={4}>Sửa thông tin</KTTitle>
          </Col>
        </Row>
        <Row style={{ padding: 16 }}>
          <Col span={24}>
            <Form
              form={form}
              onFinish={submitHandler}
              // onFinishFailed={onFinishFailed}
              layout="horizontal"
            >
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
                          <span style={{ color: '#F5222D' }}>*</span>
                        </Col>
                        <Col span={16}>
                          <Form.Item
                            name={'corporateCode'}
                            rules={[
                              {
                                required: true,
                                message:
                                  'Trường mã doanh nghiệp không được phép để trống!',
                              },
                            ]}
                          >
                            <Input disabled suffix={<SearchOutlined />} />
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
                          <span style={{ color: '#F5222D' }}>*</span>
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
                            <Input onChange={onUserNameChange} />
                          </Form.Item>
                        </Col>
                      </Row>

                      <Row>
                        <Col span={8}>
                          Mã nhóm người dùng{' '}
                          <span style={{ color: '#F5222D' }}>*</span>
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
                          <span style={{ color: '#F5222D' }}>*</span>
                        </Col>
                        <Col span={16}>
                          <Form.Item
                            name={'phoneNumber'}
                            rules={[
                              {
                                required: true,
                                message:
                                  'Trường số điện thoại di động không được phép để trống!',
                              },
                            ]}
                          >
                            <Input
                              onChange={onPhoneNumberChange}
                              type={'number'}
                              onKeyDown={(e) =>
                                exceptThisSymbols.includes(e.key) &&
                                e.preventDefault()
                              }
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
                          <Form.Item
                            name={'email'}
                            rules={[
                              {
                                required: true,
                                message:
                                  'Trường email không được phép để trống!',
                              },
                            ]}
                          >
                            <Input
                              disabled
                              type={'email'}
                              onChange={onEmailChange}
                            />
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
                        <Button className="common-btn" htmlType="submit">
                          Xác nhận
                        </Button>
                        <Button
                          onClick={(e) => {
                            domain.exitHandler(id);
                          }}
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
