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
  Modal,
  Tree,
} from 'antd';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { KTTitle } from 'core/ui';
import '../../../common/less/AM.01.05A.less';
import { useA00Domain } from '../domains/AM.01.05A_Authorize_Domain';
import { useHistory } from 'react-router';
const { Option } = Select;

const AM010401_ViewUserGroup_Authorize = ({ lang = 'vi', ...props }) => {
  const { id } = useParams();
  var axios = require('axios');
  const [form] = Form.useForm();
  const history = useHistory();
  const { t } = useTranslation();
  const [, am0105ADomain] = useA00Domain();
  const [expandedKeys, setExpandedKeys] = useState(['root', 'system-admin']);
  const [checkedKeys, setCheckedKeys] = useState(['root']);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const [treeData, setTreeData] = useState([]);

  const [groupCodeGetPermisson, setGroupCodeGetPermisson] = useState('');
  const [modalSuccess, setModalSuccess] = useState(false);

  //set data fo form
  useEffect(() => {
    const fetchData = () => {
      var data = '';

      var config = {
        method: 'get',
        url:
          process.env.REACT_APP_API_BACKEND +
          '/corporate/group/co/getUserGroupById?id=' +
          id +
          '',
        headers: {
          Authorization:
            'Bearer ' + sessionStorage.getItem('access_token') + '',
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          // console.log('response:::', response);
          var userGroup = response.data.data;
          // console.log('Group:::', userGroup);
          setGroupCodeGetPermisson(userGroup.userGroupCode);
          form.setFieldsValue({
            userGroupCode: userGroup.userGroupCode,
            userGroupName: userGroup.userGroupName,
            channel: userGroup.channels,
          });
        })
        .catch(function (error) {
          console.log(error.response);
        });
    };
    fetchData();
  }, [id, form]);

  useEffect(() => {
    const fetchPermissionData = (groupCodeGetPermisson) => {
      var config = am0105ADomain.getPermission(groupCodeGetPermisson);
      config.then((result) => {
        axios(result)
          .then(function (response) {
            if (response.data.data) {
              console.log(response.data.data.roleResponse);
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
  }, [groupCodeGetPermisson]);

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

  const handleOk = () => {
    history.push('/home/admin-corporate-group/view/' + id);
    setModalSuccess(false);
  };
  //----------------------------------//

  const submitHandler = () => {
    var body = [];
    checkedKeys.forEach((checkedKey) => {
      body.push(checkedKey);
    });
    console.log(body);
    console.log('Received values of form: ', body);

    var config = am0105ADomain.updatePermission(groupCodeGetPermisson, body);
    config
      .then((result) => {
        axios(result)
          .then(function (response) {
            console.log(response);
            setModalSuccess(true);
          })
          .catch(function (error) {
            console.log(error.data);
          });
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Modal
        footer={[
          <Button className="common-btn" onClick={handleOk}>
            Đóng
          </Button>,
        ]}
        visible={modalSuccess}
        onOk={handleOk}
      >
        <KTTitle className={'text-center'} size={3}>
          Cập nhật phân quyền thành công
        </KTTitle>
      </Modal>

      <div className={'main-container'}>
        <Row className={'padding-title'}>
          <Col span={24}>
            <KTTitle size={3} className={'font-weight-title'}>
              Quản lý nhóm người dùng doanh nghiệp
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
            <Form layout="horizontal" form={form} onFinish={submitHandler}>
              <Row>
                <Col span={2}></Col>
                <Col span={20}>
                  <Row>
                    {' '}
                    <Col span={8}>Mã nhóm người dùng </Col>
                    <Col span={16}>
                      <Form.Item name={'userGroupCode'}>
                        <Input disabled />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row>
                    <Col span={8}>Tên nhóm người dùng </Col>
                    <Col span={16}>
                      <Form.Item name={'userGroupName'}>
                        <Input disabled />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row>
                    <Col span={8}>Kênh</Col>
                    <Col span={16}>
                      <Form.Item name={'channel'}>
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
                            am0105ADomain.exitHandler(id);
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
