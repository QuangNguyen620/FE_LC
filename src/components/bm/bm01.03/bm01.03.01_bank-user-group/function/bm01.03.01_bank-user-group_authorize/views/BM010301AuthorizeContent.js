import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Col, Row, Form, Select, Input, Button, Space, Tree } from 'antd';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { KTTitle } from 'core/ui';

import { useHistory } from 'react-router';
import { BM010301Domain } from '../domains/BM010301AuthorizeDomain';
import UpdatePermisionSuccessful from '../../../common/modal/update/update-user-group-authorize/UpdatePermisionModalSuccessfull';
import UpdatePermisionFailed from '../../../common/modal/update/update-user-group-authorize/UpdatePermisionModalFailed';
var axios = require('axios');
const { Option } = Select;

const BM010301AuthorizeView = ({ lang = 'vi', ...props }) => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const history = useHistory();
  const { t } = useTranslation();
  const [, domain] = BM010301Domain();

  const [updateSuccessfulDialogVisible, setUpdateSuccessfulDialogVisible] =
    useState(false);
  const [updateFailedDialogVisible, setUpdateFailedDialogVisible] =
    useState(false);

  const [expandedKeys, setExpandedKeys] = useState(['Root', 'system-admin']);
  const [checkedKeys, setCheckedKeys] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);

  // const [language_menu_visible, setMenuVisible] = useState(false);
  const [treeData, setTreeData] = useState([]);
  const [userGroup, setUserGroup] = useState({
    groupId: '',
    userGroupCode: '',
    userGroupName: '',
    channels: '',
    userType: '',
    groupType: '',
    branchLevel: '',
    branch: '',
    department: '',
    role: '',
    status: 0,
    description: '',
    permission: null,
    rolesDescription: '',
    roleResponse: null,
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
    setCheckedKeys([]);
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     var data = '';

  //     var config = {
  //       method: 'get',
  //       url:
  //         process.env.REACT_APP_API_BACKEND + '/admin/group/getUserGroupById?id=' +
  //         userGroupId +
  //         '',
  //       headers: {
  //         Authorization:
  //           'Bearer ' + sessionStorage.getItem('access_token') + '',
  //       },
  //       data: data,
  //     };

  //     axios(config)
  //       .then(function (response) {
  //         var userGroup = response.data.data;
  //         setUserGroup(userGroup);

  //         console.log('User group:::');
  //         console.log(userGroup);
  //         form.setFieldsValue({
  //           user_group_code: userGroup.userGroupCode,
  //           user_group_name: userGroup.userGroupName,
  //           user_type: userGroup.userType,
  //           group_type:
  //             userGroup.groupType == 'bank-admin'
  //               ? 'Admin ng??n h??ng'
  //               : 'Qu???n tr??? h??? th???ng',
  //           branch_level: userGroup.branchLevel,
  //           role: userGroup.role,
  //           status: userGroup.status,
  //           description: userGroup.description,
  //         });

  //         var config = am010401Domain.getUserGroupRoles(
  //           userGroup.userGroupCode,
  //         );
  //         config.then((result) => {
  //           axios(result)
  //             .then(function (response) {
  //               var tempArr = [];
  //               console.log(response.data.data);
  //               tempArr.push(response.data.data.roleResponse);
  //               setTreeData(tempArr);
  //               var tempString = response.data.data.permission;
  //               var listCheckedPermission = tempString.split(',');
  //               setCheckedKeys(listCheckedPermission);
  //             })
  //             .catch(function (error) {
  //               console.log(error);
  //             });
  //         });
  //       })
  //       .catch(function (error) {
  //         console.log(error);
  //       });
  //   };

  //   fetchData();
  // }, [userGroupId]);

  // useEffect(() => {
  //   const fetchUserGroupCodeData = () => {
  //     var config = {
  //       method: 'get',
  //       url: process.env.REACT_APP_API_BACKEND + '/admin/group/getUserGroup',
  //       headers: {
  //         Authorization:
  //           'Bearer ' + sessionStorage.getItem('access_token') + '',
  //         'Content-Type': 'application/json',
  //       },
  //     };

  //     axios(config)
  //       .then(function (response) {
  //         console.log('Test');
  //         console.log(response.data.data);
  //         var tempList = [];
  //         response.data.data.forEach((element) => {
  //           if (element.userType != 'CORPORATE') {
  //             var userGroup = {
  //               id: element.id,
  //               userGroupCode: element.userGroupCode,
  //             };
  //             tempList.push(userGroup);
  //           }
  //         });
  //         setUserGroupCodeList(tempList);
  //       })
  //       .catch(function (error) {
  //         console.log('L???i ??? ????y ??ang l??: ', error);
  //       });
  //   };

  //   fetchUserGroupCodeData();
  // }, []);

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  // Add new user group--------------
  const submitHandler = () => {
    var data = checkedKeys;

    console.log('Received values of form: ', userGroup.userGroupCode);
    console.log('Received values of form: ', data);

    var configPromise = domain.updateUserGroupRoles(
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
    domain.exitHandler(id);
  }
  function closeUpdateFailedModal() {
    setUpdateFailedDialogVisible(false);
    // history.push('/home/corporate-customer');
  }
  return (
    <>
      <UpdatePermisionFailed
        isVisbled={updateFailedDialogVisible}
        onCloseModal={closeUpdateFailedModal}
        onClose={closeUpdateFailedModal}
      />
      <UpdatePermisionSuccessful
        isVisbled={updateSuccessfulDialogVisible}
        onCloseModal={closeUpdateSuccessfullModal}
        onClose={closeUpdateSuccessfullModal}
      />
      <div className={'main-container'}>
        <Row className={'padding-title'}>
          <Col span={24}>
            <KTTitle size={3}>
              <b>Qu???n l?? nh??m ng?????i d??ng Admin ng??n h??ng & FPT qu???n tr???</b>
            </KTTitle>
          </Col>
        </Row>
        <Row className={'padding-title-sub'}>
          <Col span={24}>
            <KTTitle size={4}>Ph??n quy???n</KTTitle>
          </Col>
        </Row>
        <Row className="padding-md">
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
                    {' '}
                    <Col span={8}>
                      M?? nh??m ng?????i d??ng{' '}
                      <span className={'text-require'}>*</span>
                    </Col>
                    <Col span={16}>
                      <Form.Item name={'user_group_code'}>
                        <Select onChange={userGroupCodeChange}>
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
                      T??n nh??m ng?????i d??ng{' '}
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
                      C???p chi nh??nh <span className={'text-require'}>*</span>
                    </Col>
                    <Col span={16}>
                      <Form.Item name={'branch_level'}>
                        <Input disabled />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={8}>
                      Chi nh??nh <span className={'text-require'}>*</span>
                    </Col>
                    <Col span={16}>
                      <Form.Item name={'branch'}>
                        <Input disabled />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={8}>
                      Ph??ng ban <span className={'text-require'}>*</span>
                    </Col>
                    <Col span={16}>
                      <Form.Item name={'department'}>
                        <Input disabled />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={8}>
                      Vai tr?? <span className={'text-require'}>*</span>
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
                        <b>Danh s??ch ph??n quy???n</b>
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
                        // onSelect={onSelect}
                        selectedKeys={selectedKeys}
                        treeData={treeData}
                      />
                    </Col>
                  </Row>

                  <div id="form-footer">
                    <Form.Item>
                      <Space className={'padding-buton'}>
                        <Button className="common-btn" htmlType="submit">
                          X??c nh???n
                        </Button>

                        <Button
                          onClick={() => {
                            domain.exitHandler(id);
                          }}
                          className="secondary-btn"
                        >
                          ????ng
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
