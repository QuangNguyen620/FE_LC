import React from 'react';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';
import {
  Col,
  Row,
  Form,
  Select,
  Input,
  Radio,
  Checkbox,
  Button,
  Space,
} from 'antd';
import { KTTitle } from 'core/ui';
import '../../../common/less/AM.01.05A.less';
import DeleteModal from '../../../common/modal/delete/DeleteModal.js';
import DeleteModalFail from '../../../common/modal/delete/DeleteModalFail.js';
import DeleteModalSuccess from '../../../common/modal/delete/DeleteModalSuccess.js';
import { useA00Domain } from '../domains/AM.01.05ADomain';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';
var axios = require('axios');

const { Option } = Select;

const channelOptions = [
  { label: 'CIN - Corporate Internet', value: 'CIN' },
  { label: 'AIN - Admin Internet', value: 'AIN' },
  { label: 'BIN - Admin Internet', value: 'BIN' },
  { label: 'CMB - Corporate Mobile', value: 'CMB' },
];
const rolelOptions = [
  { label: 'Maker', value: 'Maker' },
  { label: 'Approver', value: 'Approver' },
];
toast.configure();

const AM0105ACorporateGroup = ({ lang = 'vi', ...props }) => {
  const { id } = useParams();
  const { t } = useTranslation();
  const [, am0105ADomain] = useA00Domain();
  const [form] = Form.useForm();
  const history = useHistory();
  const [deleteModalVisible, setDeleteVisible] = useState(false);
  const [deleteFailModalVisible, setDeleteFailVisible] = useState(false);
  const [deleteSuccessModalVisible, setDeleteSuccessVisible] = useState(false);

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
    channel: 'CIN',
  });

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
          var userGroup = response.data.data;
          userGroup.status = userGroup.status + '';
          setUserGroup(userGroup);
          console.log(userGroup);
          form.setFieldsValue({
            user_group_code: userGroup.userGroupCode,
            user_group_name: userGroup.userGroupName,
            user_type: userGroup.userType,
            group_type: userGroup.groupType,
            branch_level: userGroup.branchLevel,
            role: userGroup.role,
            channel: userGroup.channels,
            status: userGroup.status,
            description: userGroup.description,
          });
        })
        .catch(function (error) {
          console.log(error.response);
          if (error.response.status == 401) {
            console.log('Lỗi 401: Hết hạn token');
          }
        });
    };

    fetchData();
    console.log(userGroup);
  }, [id, form]);

  const handleDeleteOk = (data) => {
    var config = {
      method: 'delete',
      url:
        process.env.REACT_APP_API_BACKEND +
        '/corporate/group/co/deleteUserGroup?id=' +
        id +
        '',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('access_token') + '',
      },
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setDeleteVisible(false);
        setDeleteSuccessVisible(true);
      })
      .catch(function (error) {
        setDeleteVisible(false);
        setDeleteFailVisible(true);
        console.log(error);
      });
    console.log(data);
  };

  function openDeleteModal() {
    setDeleteVisible(true);
  }

  function closeDeleteModal(data) {
    console.log(data);
    setDeleteVisible(false);
  }

  function closeDeleteFailModal(data) {
    console.log(data);
    setDeleteFailVisible(false);
  }

  function closeDeleteSuccessModal(data) {
    console.log(data);
    setDeleteSuccessVisible(false);
    history.push('/home/admin-corporate-group');
  }
  return (
    <>
      <DeleteModal
        isVisbled={deleteModalVisible}
        onCloseModal={closeDeleteModal}
        onDelete={handleDeleteOk}
      />
      <DeleteModalFail
        isVisbled={deleteFailModalVisible}
        onCloseModal={closeDeleteFailModal}
      />
      <DeleteModalSuccess
        isVisbled={deleteSuccessModalVisible}
        onCloseModal={closeDeleteSuccessModal}
      />

      <div className={'main-container'}>
        <Row className={'padding-title'}>
          <Col span={24}>
            <KTTitle size={3} className={'font-weight-title'}>
              <b>Quản lý nhóm người dùng Doanh nghiệp</b>
            </KTTitle>
          </Col>
        </Row>
        <Row className={'padding-title-sub'}>
          <Col span={24}>
            <KTTitle size={4}>Xem</KTTitle>
          </Col>
        </Row>

        <Row className="padding-md">
          <Col span={24}>
            <Form
              form={form}
              layout="horizontal"
              initialValues={{
                user_group_code: userGroup
                  ? userGroup.userGroupCode
                  : 'This does not work',
                user_group_name: userGroup
                  ? userGroup.userGroupName
                  : 'This does not work',
                user_type: userGroup
                  ? userGroup.userType
                  : 'This does not work',
                group_type: userGroup
                  ? userGroup.groupType
                  : 'This does not work',
                branch_level: userGroup
                  ? userGroup.branchLevel
                  : 'This does not work',
                role: userGroup ? userGroup.role : 'This does not work',
                status: userGroup ? userGroup.status : 'This does not work',
                description: userGroup
                  ? userGroup.description
                  : 'This does not work',
              }}
            >
              <Row>
                <Col span={2}></Col>
                <Col span={20}>
                  <Row>
                    {' '}
                    <Col span={8}>
                      Mã nhóm người dùng{' '}
                      <span className={'text-require'}>*</span>
                    </Col>
                    <Col span={16}>
                      <Form.Item name={'user_group_code'}>
                        <Input disabled />
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
                    <Col span={8}>Mô tả </Col>
                    <Col span={16}>
                      <Form.Item name={'description'}>
                        <Input disabled />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row>
                    <Col span={8}>
                      Kênh <span className={'text-require'}>*</span>
                    </Col>
                    <Col span={16}>
                      <Form.Item name={'channel'}>
                        <Select disabled>
                          {channelOptions.map((channel) => (
                            <Select.Option value={channel.value}>
                              {channel.label}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row>
                    <Col span={8}>
                      Vai trò <span className={'text-require'}>*</span>
                    </Col>
                    <Col span={16}>
                      <Form.Item name={'role'}>
                        <Radio.Group disabled>
                          {rolelOptions.map((role) => (
                            <Radio value={role.value}>{role.label}</Radio>
                          ))}
                        </Radio.Group>
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row>
                    <Col span={8}>
                      Trạng thái <span className={'text-require'}>*</span>
                    </Col>
                    <Col span={16}>
                      <Form.Item name={'status'}>
                        <Select disabled>
                          <Option value="1">Hoạt động</Option>
                          <Option value="0">Ngừng hoạt động</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>

                  <div id="form-footer">
                    <Form.Item>
                      <Space className={'padding-buton'}>
                        <Button
                          onClick={() => {
                            am0105ADomain.editHandler(id);
                          }}
                          className="common-btn"
                        >
                          Sửa
                        </Button>

                        <Button
                          onClick={() => {
                            am0105ADomain.toAuthorizePage(id);
                          }}
                          className="common-btn"
                        >
                          Phân quyền
                        </Button>
                        <Button
                          onClick={openDeleteModal}
                          className="common-btn"
                        >
                          Xóa
                        </Button>
                        <Button
                          onClick={am0105ADomain.exitHandler}
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

export default AM0105ACorporateGroup;
