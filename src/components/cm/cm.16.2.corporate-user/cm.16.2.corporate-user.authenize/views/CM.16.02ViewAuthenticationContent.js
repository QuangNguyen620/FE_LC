import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Col, Row, Input, Button, Form, Divider, Space, Tree } from 'antd';
import { useParams } from 'react-router-dom';

import moment from 'moment';
import { EyeFilled, SearchOutlined } from '@ant-design/icons';
import './CM.16.02ViewAuthentication.less';
// import '../../../assets/less/LC-common.less';
import { CM1602Domain } from '../domains/CM.16.02ViewAuthenticationDomain';
import { KTTitle } from 'core/ui';
var axios = require('axios');

const CM1602AuthenticationViewContent = ({ lang = 'vi', ...props }) => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [, domain] = CM1602Domain();
  const [filterModalVisible, setFilterVisible] = useState(false);
  const [form] = Form.useForm();

  const [treeData, setTreeData] = useState([]);

  // const [corporateList, setCorporeateList] = useState([]);
  // const [corporateName, setCorporeateName] = useState('');
  // const [corporateGroupList, setCorporateGroupList] = useState([]);
  const [roleGroup, setRoleGroup] = useState('');
  const [user, setUser] = useState({});
  const dateFormatList = 'DD/MM/YYYY';
  const userGroupCode = useRef('');
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
              userGroupCode.current.value = groupCode;
              console.log('---Hieu Test CM.16.2');
              console.log(userGroupCode.current.value);
              console.log('---Hieu Test CM.16.2');
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

  useEffect(() => {
    const fetchPermissionData = async () => {
      // var userGroupCode = user.userGroupCode;
      var config = domain.getPermission(user.userGroupCode);
      config.then((result) => {
        axios(result)
          .then(function (response) {
            console.log('List permision:::');
            console.log(response.data.data.roleResponse);
            var tempArr = [];
            tempArr.push(response.data.data.roleResponse);
            setTreeData(tempArr);

            console.log('List user permission:::');
            console.log(response.data.data.permission);

            var tempString = response.data.data.permission;

            var listCheckedPermission = tempString.split(',');
            console.log(listCheckedPermission);

            setCheckedKeys(listCheckedPermission);
          })
          .catch(function (error) {
            console.log(error);
          });
      });
    };
    fetchPermissionData();
  }, []);

  const [expandedKeys, setExpandedKeys] = useState(['Root']);
  const [checkedKeys, setCheckedKeys] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);

  // const [language_menu_visible, setMenuVisible] = useState(false);

  //Value state

  //------------------------------//
  const onExpand = (expandedKeysValue) => {
    console.log('onExpand', expandedKeysValue); // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.

    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };

  const onCheck = (checkedKeysValue) => {
    console.log('onCheck', checkedKeysValue);
    setCheckedKeys(checkedKeysValue);
  };

  const onSelect = (selectedKeysValue, info) => {
    console.log('onSelect', info);
    setSelectedKeys(selectedKeysValue);
  };
  //----------------------------------//

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
                          <span style={{ color: '#F5222D' }}>*</span>
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
                          Tên nhóm người dùng
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
                          <KTTitle size={3}>
                            Danh sách phân cấp người dùng
                          </KTTitle>
                        </Col>
                      </Row>
                      <Divider />
                      <Row>
                        <Col span={24}>
                          <Tree
                            checkable
                            onExpand={onExpand}
                            expandedKeys={expandedKeys}
                            autoExpandParent={autoExpandParent}
                            onCheck={onCheck}
                            checkedKeys={checkedKeys}
                            onSelect={onSelect}
                            selectedKeys={selectedKeys}
                            treeData={treeData}
                            disabled
                          />
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

export default CM1602AuthenticationViewContent;
