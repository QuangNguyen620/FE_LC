import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Col,
  Row,
  Form,
  Select,
  Input,
  Button,
  Space,
  Tree,
} from 'antd';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { KTTitle } from 'core/ui';
import '../../../common/less/AM.01.05.02.less';
import '../../../../../../../../assets/less/LC-common.less';
import { useA00Domain } from '../domains/AM.01.05.02_Authorize_Domain';
import { useHistory } from 'react-router';
const { Option } = Select;

const AM010401_ViewUserGroup_Authorize = ({ lang = 'vi', ...props }) => {
  const { id } = useParams();
  var axios = require('axios');
  const [form] = Form.useForm();
  const history = useHistory();
  const { t } = useTranslation();
  const [, am010502Domain] = useA00Domain();
  const [expandedKeys, setExpandedKeys] = useState(['root', 'system-admin']);
  const [checkedKeys, setCheckedKeys] = useState(['root']);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const [treeData, setTreeData] = useState([]);

  const [groupCodeGetPermisson, setGroupCodeGetPermisson] = useState('');

  //set data fo form
  useEffect(() => {
    var config = am010502Domain.getUserById(id);
    config
      .then((result) => {
        axios(result).then(function (response) {
          var user = response.data.data;
          console.log(':::', user);
          setGroupCodeGetPermisson(user.userGroupCode);
          form.setFieldsValue({
            corporateCode: user.corporateCode,
            corporateName: user.corporateName,
            userCode: user.userCode,
            userName: user.userName,
            userGroupCode: user.userGroupCode,
          });
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [id, form]);

  useEffect(() => {
    const fetchPermissionData = (groupCodeGetPermisson) => {
      var config = am010502Domain.getPermission(groupCodeGetPermisson);
      config.then((result) => {
        axios(result)
          .then(function (response) {
            console.log('res:::', response);
            if (response.data.data) {
              form.setFieldsValue({
                userGroupName: response.data.data.userGroupName,
              });

              var tempArr = [];
              tempArr.push(response.data.data.roleResponse);
              setTreeData(tempArr);
              console.log('List permission:::', response.data.data.permission);

              var tempString = response.data.data.permission;
              if (response.data.data.permission) {
                var listCheckedPermission = tempString.split(',');
                console.log(listCheckedPermission);
                setCheckedKeys(listCheckedPermission);
              }
              console.log('treeData:::', treeData);
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      });
    };
    fetchPermissionData(groupCodeGetPermisson);
  }, [groupCodeGetPermisson, form]);

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
      <div className={'main-container'}>
        <Row className={'padding-title'}>
          <Col span={24}>
            <KTTitle size={3} className={'font-weight-title'}>
              Quản lý người dùng doanh nghiệp
            </KTTitle>
          </Col>
        </Row>
        <Row className={'padding-title-sub'}>
          <Col span={24}>
            <KTTitle size={4}>Xem phân quyền</KTTitle>
          </Col>
        </Row>
        <Row className={'padding-md'}>
          <Col span={24}>
            <Form layout="horizontal" form={form}>
              <Row>
                <Col span={2}></Col>
                <Col span={20}>
                  <Row>
                    {' '}
                    <Col span={8}>Mã doanh nghiệp </Col>
                    <Col span={16}>
                      <Form.Item name={'corporateCode'}>
                        <Input disabled />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row>
                    {' '}
                    <Col span={8}>Tên doanh nghiệp </Col>
                    <Col span={16}>
                      <Form.Item name={'corporateName'}>
                        <Input disabled />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row>
                    {' '}
                    <Col span={8}>Mã người dùng </Col>
                    <Col span={16}>
                      <Form.Item name={'userCode'}>
                        <Input disabled />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row>
                    <Col span={8}>Mã nhóm người dùng </Col>
                    <Col span={16}>
                      <Form.Item name={'userGroupCode'}>
                        <Input disabled />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row>
                    <Col span={8}>Tên hiển thị</Col>
                    <Col span={16}>
                      <Form.Item name={'userName'}>
                        <Input disabled />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row>
                    <Col span={8}>Tên nhóm người dùng</Col>
                    <Col span={16}>
                      <Form.Item name={'userGroupName'}>
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
                        disabled
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
                            am010502Domain.exitHandler(id);
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
