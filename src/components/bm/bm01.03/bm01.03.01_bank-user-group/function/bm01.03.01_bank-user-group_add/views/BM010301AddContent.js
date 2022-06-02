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
import { BM010301Domain } from '../domains/BM010301AddDomain';
import {
  BANK_ROLE_LIST,
  BANK_BRANCH_LEVEL,
  BANK_USER_GROUP_TYPE,
} from '../../../../../../../core/common/Constant';
import CreateSuccessfullModal from '../../../common/modal/CreateSuccessfullModal';
import CreateFailModal from '../../../common/modal/CreateFailModal';
import log from '../ModuleLogger';
import UserGroupInformation from './tab-content/UserGroupInformation';
import AuthorizeUserGroup from './tab-content/AuthorizeUserGroup';

var axios = require('axios');
const { TabPane } = Tabs;
function callback(key) {
  console.log(key);
}

const BM010301AddView = ({ lang = 'vi', ...props }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [context, domain] = BM010301Domain();

  useEffect(() => {
    domain.initDomain();
  }, []);

  useEffect(() => {
    form.setFieldsValue({
      bankId: context?.bankUserGroup?.bankId,
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
        domain.addNewUserGroup();
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
                        domain.exitHandler();
                      }}
                    >
                      <LeftOutlined />
                      {' Quay lại'}
                    </Button>
                  </Col>

                  <Col span={12}>
                    <Button
                      className="common-btn button-next"
                      htmlType="submit"
                    >
                      Xác nhận tạo nhóm mới
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
