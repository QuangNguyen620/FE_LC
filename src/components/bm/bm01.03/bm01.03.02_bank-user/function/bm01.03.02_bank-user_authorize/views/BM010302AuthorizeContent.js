import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Col, Row, Form, Select, Input, Button, Space, Tree } from 'antd';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { KTTitle } from 'core/ui';

import { useHistory } from 'react-router';
import { BM010302Domain } from '../domains/BM010302AuthorizeDomain';

var axios = require('axios');
const { Option } = Select;

const BM010301AuthorizeView = ({ lang = 'vi', ...props }) => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const history = useHistory();
  const { t } = useTranslation();
  const [, domain] = BM010302Domain();

  const [updateSuccessfulDialogVisible, setUpdateSuccessfulDialogVisible] =
    useState(false);
  const [updateFailedDialogVisible, setUpdateFailedDialogVisible] =
    useState(false);

  const [expandedKeys, setExpandedKeys] = useState(['Root', 'system-admin']);
  const [checkedKeys, setCheckedKeys] = useState(['Root']);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);

  // const [language_menu_visible, setMenuVisible] = useState(false);
  const [treeData, setTreeData] = useState([]);
  const [userGroup, setUserGroup] = useState({
    id: 0,
    userGroupCode: '',
    userGroupName: '',
    userType: '',
    groupType: '',
    branchLevel: '',
    role: '',
    status: '',
    description: '',
  });
  const [userGroupCodeList, setUserGroupCodeList] = useState([]);
  //Value state

  const [userGroups, setUserGroups] = useState([]);
  //------------------------------//
  // var userGroups = [];
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

  const onSelect = (selectedKeysValue) => {
    console.log('onSelect', selectedKeysValue);
    // setSelectedKeys(selectedKeysValue);
  };

  useEffect(() => {
    const fetchData = () => {
      var config = domain.getUser(id);

      config
        .then((result) => {
          axios(result)
            .then(function (response) {
              var user = response.data.data;
              console.log(user);
              // userGroups = user.userGroupCodes;
              setUserGroups(user.userGroupCodes);
              // var groupType = user.groupType;
              form.setFieldsValue({
                userCode: user.userCode,
                userName: user.userName,
              });
            })
            .catch(function (error) {
              console.log(error.response);
            });
        })
        .catch(function (error) {
          console.log('Lỗi ở đây đang là: ', error);
        });
    };

    fetchData();
  }, [id, form]);

  useEffect(() => {
    function fetchData(userGroups) {
      var config = domain.getUserGroupRoles(userGroups[0]);

      config
        .then((result) => {
          axios(result)
            .then(function (response) {
              var tempArr = [];
              console.log(response.data.data);
              tempArr.push(response.data.data.roleResponse);
              setTreeData(tempArr);
              var tempString = response.data.data.permission;
              var listCheckedPermission = tempString.split(',');
              setCheckedKeys(listCheckedPermission);
            })
            .catch(function (error) {
              console.log(error.response);
            });
        })
        .catch(function (error) {
          console.log('Lỗi ở đây đang là: ', error);
        });
    }
    fetchData(userGroups);
  }, [userGroups]);

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <>
      <div className={'main-container'}>
        <Row className={'padding-title'}>
          <Col span={24}>
            <KTTitle size={3}>
              <b>Quản lý nhóm người dùng Admin ngân hàng & FPT quản trị</b>
            </KTTitle>
          </Col>
        </Row>
        <Row className={'padding-title-sub'}>
          <Col span={24}>
            <KTTitle size={4}>Phân quyền</KTTitle>
          </Col>
        </Row>
        <Row className="padding-md">
          <Col span={24}>
            <Form
              // onFinish={submitHandler}
              // onFinishFailed={onFinishFailed}
              form={form}
              layout="horizontal"
            >
              <Row>
                <Col span={2}></Col>
                <Col span={20}>
                  <Row>
                    {' '}
                    <Col span={8}>
                      Mã người dùng <span className={'text-require'}>*</span>
                    </Col>
                    <Col span={16}>
                      <Form.Item name={'userCode'}>
                        <Input disabled />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row>
                    <Col span={8}>
                      Tên người dùng <span className={'text-require'}>*</span>
                    </Col>
                    <Col span={16}>
                      <Form.Item name={'userName'}>
                        <Input disabled />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row>
                    <Col span={24}>
                      <KTTitle size={5}>
                        <b>Danh sách phân quyền</b>
                      </KTTitle>
                    </Col>
                  </Row>
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
                      />
                    </Col>
                  </Row>

                  <div id="form-footer">
                    <Form.Item>
                      <Space className={'padding-buton'}>
                        <Button
                          onClick={() => {
                            domain.exitHandler();
                          }}
                          className="secondary-btn"
                        >
                          Đóng
                        </Button>
                      </Space>
                    </Form.Item>
                  </div>
                </Col>
                <Col span={2}></Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default BM010301AuthorizeView;
