import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { CheckCircleFilled, LeftOutlined } from '@ant-design/icons';
import {
  Col,
  Row,
  Typography,
  Input,
  Button,
  Form,
  Select,
  Divider,
  Checkbox,
  message,
  Tabs,
} from 'antd';
import { KTTitle } from 'core/ui';
import '../../../common/less/BM010301.less';
import { BM010301Domain } from '../domains/BM010301EditDomain';
import log from '../ModuleLogger';
import UserGroupInformation from './tab-content/UserGroupInformation';
import AuthorizeUserGroup from './tab-content/AuthorizeUserGroup';

var axios = require('axios');
const { TabPane } = Tabs;
function callback(key) {
  console.log(key);
}
const { Link } = Typography;
const CheckboxGroup = Checkbox.Group;

const branches = [{ label: '1000-Hội sở chính', value: '1000-Hội sở chính' }];

const departments = [{ label: 'P01-Phòng L/C', value: 'P01-Phòng L/C' }];
const plainOptions = [
  'AIN - Admin Internet',
  'BIN - Bank Internet',
  'CIN - Corporate Internet',
  'CMB - Corporate Mobile',
];
const defaultCheckedList = [];
const BM010301AddView = ({ lang = 'vi', ...props }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [context, domain] = BM010301Domain();

  useEffect(() => {
    domain.initDomain();
  }, []);

  useEffect(() => {
    form.setFieldsValue({
      userGroupCode: context?.bankUserGroup?.userGroupCode,
      userGroupName: context?.bankUserGroup?.userGroupName,
      bankId: context?.bankUserGroup?.bankId,
      branchLevel: context?.bankUserGroup?.branchLevel,
      groupType: context?.bankUserGroup?.groupType,
      channels: context?.bankUserGroup?.channels,
      description: context?.bankUserGroup?.description,
      groupId: context?.bankUserGroup?.groupId,
      role: context?.bankUserGroup?.role,
      status: context?.bankUserGroup?.status,
      userType: context?.bankUserGroup?.userType,
      department: context?.bankUserGroup?.department,
      branch: context?.bankUserGroup?.branch,
      permission: context?.bankUserGroup?.permission,
      permissionList: context?.bankUserGroup?.permissionList,
    });
    log.debug('useEffect--', context);
  }, [context]);

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const onSubmitHandler = () => {
    form
      .validateFields()
      .then(() => {
        // Here make api call of something else
        domain.updateUserGroup();
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div>
        <Form
          form={form}
          onFinish={onSubmitHandler}
          onFinishFailed={onFinishFailed}
          layout="horizontal"
        >
          <Row>
            <Col span={3} />
            <Col span={18}>
              <div className={'main-container'}>
                <Row className={'padding-title'}>
                  <Col span={24}>
                    <KTTitle size={3}>
                      <b>Quản lý nhóm người dùng ngân hàng </b>
                    </KTTitle>
                  </Col>
                </Row>
                <Divider className="divider-title" />
                <Tabs defaultActiveKey="1" onChange={callback}>
                  <TabPane tab="Thông tin nhóm người dùng" key="1" form={form}>
                    <UserGroupInformation />
                  </TabPane>
                  <TabPane tab="Phân quyền nhóm người dùng" key="2" form={form}>
                    <AuthorizeUserGroup />
                  </TabPane>
                </Tabs>
              </div>
              <Divider className="divider-customer" />
              <div>
                <Row className={'footer-steps'}>
                  <Col span={12}>
                    <Button
                      className="button-previous"
                      onClick={() => {
                        domain.toViewHandler();
                      }}
                    >
                      <LeftOutlined />
                      {'Quay lại'}
                    </Button>
                  </Col>

                  <Col span={12}>
                    <Button
                      className="common-btn button-next"
                      htmlType="submit"
                    >
                      Xác nhận chỉnh sửa
                      <CheckCircleFilled />
                    </Button>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col span={3} />
          </Row>
        </Form>
      </div>
    </>
  );
};

export default BM010301AddView;
