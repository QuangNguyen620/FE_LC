import React from 'react';

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
  message,
} from 'antd';
import { KTTitle } from 'core/ui';
import '../../../common/less/AM.01.04.01.less';
import DeleteUserGroupModal from '../../../common/modal/delete/DeleteUserGroupModal';
import DeleteUserGrouSuccessfulModal from '../../../common/modal/delete/DeleteUserGroupModalSuccessfull';
import { useAM010401Domain } from '../domains/AM.01.04.01Domain';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';
var axios = require('axios');

const CheckboxGroup = Checkbox.Group;

// const plainOptions = ['AIN', 'BIN', 'CIN', 'CMB'];
// const defaultCheckedList = ['AIN-Admin Internet', 'BIN-Bank Internet'];

const fptGroupType = [{ label: 'Quản trị hệ thống', value: 'sys-admin' }];
const bankGroupType = [{ label: 'Admin ngân hàng', value: 'bank-admin' }];

const AM010103ForgetPassView = ({ lang = 'vi', ...props }) => {
  const { id } = useParams();
  const { t } = useTranslation();
  const [context, domain] = useAM010401Domain();
  const [form] = Form.useForm();
  const history = useHistory();

  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const [deleteSuccessfulDialogVisible, setDeleteSuccessfulDialogVisible] =
    useState(false);

  var channelChecked = [];

  const [checkedList, setCheckedList] = React.useState(channelChecked);
  const [indeterminate, setIndeterminate] = React.useState(true);
  const [checkAll, setCheckAll] = React.useState(false);
  const [site, setSite] = React.useState('BANK');
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

  const [plainOptions, setPlainOptions] = useState([]);

  useEffect(() => {
    domain.initDomain();
  }, []);

  useEffect(() => {
    console.log('context----', context);
    setPlainOptions(context?.plainOptions);
    setCheckAll(context?.checkAll);

    form.setFieldsValue({
      user_group_code: context?.userGroupCode,
      user_group_name: context?.userGroupName,
      site_choosing: context?.userType,
      group_type: context?.groupType,
      branch_level: context?.branchLevel,
      role: context?.role,
      status: context?.status,
      description: context?.description,
    });

    if (context?.userType == 'BANK') {
      setSite('BANK');
    } else if (context?.userType == 'FPT') {
      setSite('FPT');
    }
  }, [context]);

  const handleDelete = (data) => {
    var config = {
      method: 'delete',
      url:
        process.env.REACT_APP_API_BACKEND +
        '/admin/group/deleteUserGroup?id=' +
        id +
        '',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('access_token') + '',
        'Accept-Language': 'vi',
      },
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        if (response.data.success) {
          message.info(response.data.message);
          history.push('/home/bank-fpt-admin-manage');
          setDeleteDialogVisible(false);
        } else {
          message.error(response.data.message);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    console.log(data);
  };

  function openDeleteModal() {
    setDeleteDialogVisible(true);
  }

  function closeDeleteModal(data) {
    console.log(data);
    setDeleteDialogVisible(false);
    // history.push('/home/bank-fpt-admin-manage');
  }
  function closeDeleteSuccessfulModal() {
    setDeleteSuccessfulDialogVisible(false);
    useAM010401Domain.exitHandler();
  }

  return (
    <>
      <DeleteUserGrouSuccessfulModal
        isVisbled={deleteSuccessfulDialogVisible}
        onCloseModal={closeDeleteSuccessfulModal}
        onClose={closeDeleteSuccessfulModal}
      />

      <DeleteUserGroupModal
        isVisbled={deleteDialogVisible}
        onCloseModal={closeDeleteModal}
        onClose={closeDeleteModal}
        deleteHandler={handleDelete}
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
            <KTTitle size={4}>Xem</KTTitle>
          </Col>
        </Row>
        <Row className={'padding-md'}>
          <Col span={24}>
            <Form form={form} layout="horizontal">
              <Row>
                <Col span={8}>Loại người dùng</Col>
                <Col span={16}>
                  <Form.Item name={'site_choosing'}>
                    <Radio.Group className={'width-radio'} disabled>
                      <Row>
                        <Col span={12}>
                          <Radio value={'BANK'}>Admin ngân hàng</Radio>
                        </Col>
                        <Col span={12}>
                          <Radio value={'FPT'}>FPT quản trị</Radio>
                        </Col>
                      </Row>
                    </Radio.Group>
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                {' '}
                <Col span={8}>
                  Mã nhóm người dùng <span className={'text-require'}>*</span>
                </Col>
                <Col span={16}>
                  <Form.Item name={'user_group_code'}>
                    <Input disabled />
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col span={8}>
                  Tên nhóm người dùng <span className={'text-require'}>*</span>
                </Col>
                <Col span={16}>
                  <Form.Item name={'user_group_name'}>
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
                    <Select disabled></Select>
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col span={8}>
                  Kênh <span className={'text-require'}>*</span>
                </Col>
                <Col span={16}>
                  <Form.Item name={'channel'}>
                    <Checkbox
                      disabled
                      indeterminate={indeterminate}
                      // onChange={onCheckAllChange}
                      checked={checkAll}
                    >
                      Tất cả
                    </Checkbox>
                    {plainOptions?.map((channel) => (
                      <Col span={24}>
                        <Checkbox
                          disabled
                          value={channel?.value}
                          // onChange={onChange}
                          checked={channel?.checked}
                        >
                          {channel?.label}
                        </Checkbox>
                      </Col>
                    ))}
                    {/* <CheckboxGroup
                      disabled
                      className={'display-grid'}
                      options={plainOptions}
                      value={checkedList}
                    /> */}
                  </Form.Item>
                </Col>
              </Row>

              <Row
                style={{
                  display: site == 'BANK' || site == '' ? 'flex' : 'none',
                }}
              >
                <Col span={8}>
                  Cấp chi nhánh <span className={'text-require'}>*</span>
                </Col>
                <Col span={16}>
                  <Form.Item
                    name={'branch_level'}
                    rules={[
                      {
                        required: site == 'BANK' || site == '' ? true : false,
                        message:
                          'Trường cấp chi nhánh không được phép để trống!',
                      },
                    ]}
                  >
                    <Select disabled>
                      {/* {branchOptions.map((branch) => (
                        <Select.Option value={branch.value}>
                          {branch.label}
                        </Select.Option>
                      ))} */}
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
                    <Select disabled>
                      {/* {roleOptions.map((role) => (
                            <Select.Option value={role.value}>
                              {role.label}
                            </Select.Option>
                          ))} */}
                    </Select>
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
                      <Select.Option value="Hoạt động">Hoạt động</Select.Option>
                      <Select.Option value="Ngừng hoạt động">
                        Ngừng hoạt động
                      </Select.Option>
                    </Select>
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

              <div id="form-footer">
                <Form.Item>
                  <Space className={'padding-buton'}>
                    <Button
                      onClick={() => {
                        domain.editHandler(id);
                      }}
                      className="common-btn"
                    >
                      Sửa
                    </Button>

                    <Button
                      onClick={() => {
                        domain.toAuthorizePage(id);
                      }}
                      className="common-btn"
                    >
                      Phân quyền
                    </Button>
                    <Button onClick={openDeleteModal} className="common-btn">
                      Xóa
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
            </Form>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default AM010103ForgetPassView;
