import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Col, Row, Form, Select, Input, Button, Space, Tree } from 'antd';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { KTTitle } from 'core/ui';
import '../../../common/less/AM.01.04.01.less';
import '../../../../../../../../assets/less/LC-common.less';
import { useHistory } from 'react-router';
import { useAM010401Domain } from '../domains/AM.01.04.01_Authorize_Domain';

import UpdateSuccessfull from '../../../common/modal/authorize/UpdateRoleSuccessfullModal';
import UpdateFailed from '../../../common/modal/authorize/UpdateRoleFailedlModal';

var axios = require('axios');
const { Option } = Select;

const AM010401_ViewUserGroup_Authorize = ({ lang = 'vi', ...props }) => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const history = useHistory();
  const { t } = useTranslation();
  const [, am010401Domain] = useAM010401Domain();
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

  const [userGroupId, setUserGroupId] = useState(id);
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

  const onSelect = (selectedKeysValue) => {
    console.log('onSelect', selectedKeysValue);
    // setSelectedKeys(selectedKeysValue);
  };

  const userGroupCodeChange = (value) => {
    console.log(value);
    setUserGroupId(value);
  };

  useEffect(() => {
    const fetchData = async () => {
      var data = '';

      var config = {
        method: 'get',
        url:
          process.env.REACT_APP_API_BACKEND +
          '/admin/group/getUserGroupById?id=' +
          userGroupId +
          '',
        headers: {
          Authorization:
            'Bearer ' + sessionStorage.getItem('access_token') + '',
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          var userGroup = response.data.data;
          setUserGroup(userGroup);

          console.log('User group:::');
          console.log(userGroup);
          form.setFieldsValue({
            user_group_code: userGroup.userGroupCode,
            user_group_name: userGroup.userGroupName,
            user_type: userGroup.userType,
            group_type:
              userGroup.groupType == 'bank-admin'
                ? 'Admin ngân hàng'
                : 'Quản trị hệ thống',
            branch_level: userGroup.branchLevel,
            role: userGroup.role,
            status: userGroup.status,
            description: userGroup.description,
          });

          var config = am010401Domain.getUserGroupRoles(
            userGroup.userGroupCode,
          );
          config.then((result) => {
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
                console.log(error);
              });
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    };

    fetchData();
  }, [userGroupId]);

  useEffect(() => {
    const fetchUserGroupCodeData = () => {
      var config = {
        method: 'get',
        url: process.env.REACT_APP_API_BACKEND + '/admin/group/getUserGroup',
        headers: {
          Authorization:
            'Bearer ' + sessionStorage.getItem('access_token') + '',
          'Content-Type': 'application/json',
        },
      };

      axios(config)
        .then(function (response) {
          console.log('Test');
          console.log(response.data.data);
          var tempList = [];
          response.data.data.forEach((element) => {
            if (element.userType != 'CORPORATE') {
              var userGroup = {
                id: element.id,
                userGroupCode: element.userGroupCode,
              };
              tempList.push(userGroup);
            }
          });
          setUserGroupCodeList(tempList);
        })
        .catch(function (error) {
          console.log('Lỗi ở đây đang là: ', error);
        });
    };

    fetchUserGroupCodeData();
  }, []);

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  // Add new user group--------------
  const submitHandler = () => {
    var data = checkedKeys;

    console.log('Received values of form: ', userGroup.userGroupCode);

    var configPromise = am010401Domain.updateUserGroupRoles(
      userGroup.userGroupCode,
      data,
    );
    configPromise
      .then((result) => {
        axios(result)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
            setUpdateSuccessfulDialogVisible(true);
          })
          .catch(function (error) {
            console.log(error.data);
            setUpdateFailedDialogVisible(true);
          });
      })
      .catch((err) => console.log(err));
  };

  //----------------------------------//
  function closeUpdateSuccessfullModal() {
    setUpdateSuccessfulDialogVisible(false);
    am010401Domain.exitHandler(id);
  }
  function closeUpdateFailedModal() {
    setUpdateFailedDialogVisible(false);
    // history.push('/home/corporate-customer');
  }
  return (
    <>
      <UpdateFailed
        isVisbled={updateFailedDialogVisible}
        onCloseModal={closeUpdateFailedModal}
        onClose={closeUpdateFailedModal}
      />
      <UpdateSuccessfull
        isVisbled={updateSuccessfulDialogVisible}
        onCloseModal={closeUpdateSuccessfullModal}
        onClose={closeUpdateSuccessfullModal}
      />
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
        <Row className={'padding-md'}>
          <Col span={24}>
            <Form
              onFinish={submitHandler}
              onFinishFailed={onFinishFailed}
              form={form}
              layout="horizontal"
            >
              <Row>
                <Col span={2}></Col>
                <Col span={20}>
                  <Row>
                    <Col span={8}>
                      Mã nhóm người dùng{' '}
                      <span className={'text-require'}>*</span>
                    </Col>
                    <Col span={16}>
                      <Form.Item name={'user_group_code'}>
                        <Select
                          onChange={userGroupCodeChange}
                          defaultValue={'user_group_code_1'}
                        >
                          {userGroupCodeList.map((userGroup) => (
                            <Select.Option value={userGroup.id}>
                              {userGroup.userGroupCode}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row>
                    <Col span={8}>
                      Tên nhóm người dùng{' '}
                      <span className={'text-require'}>*</span>
                    </Col>
                    <Col span={16}>
                      <Form.Item name={'user_group_name'}>
                        <Input disabled />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row>
                    <Col span={8}>
                      Loại người dùng <span className={'text-require'}>*</span>
                    </Col>
                    <Col span={16}>
                      <Form.Item name={'user_type'}>
                        <Input disabled />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row>
                    <Col span={8}>
                      Loại nhóm <span className={'text-require'}>*</span>
                    </Col>
                    <Col span={16}>
                      <Form.Item name={'group_type'}>
                        <Input disabled />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row>
                    <Col span={8}>
                      Vai trò <span className={'text-require'}>*</span>
                    </Col>
                    <Col span={16}>
                      <Form.Item name={'role'}>
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
                        <Button className="common-btn" htmlType="submit">
                          Xác nhận
                        </Button>

                        <Button
                          onClick={() => {
                            am010401Domain.exitHandler(id);
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

export default AM010401_ViewUserGroup_Authorize;
