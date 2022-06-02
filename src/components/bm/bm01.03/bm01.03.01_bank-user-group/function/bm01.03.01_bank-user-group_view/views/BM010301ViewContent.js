import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Col,
  Row,
  Typography,
  Input,
  Button,
  Form,
  Divider,
  Space,
  Checkbox,
  message,
  Tabs,
} from 'antd';
import { KTTitle } from 'core/ui';
import '../../../common/less/BM010301.less';
import { BM010301Domain } from '../domains/BM010301ViewDomain';
import { useParams } from 'react-router-dom';
import log from '../ModuleLogger';
import UserGroupInformation from './tab-content/UserGroupInformation';
import AuthorizeUserGroup from './tab-content/AuthorizeUserGroup';
import DeleteUserGroupModal from '../../../common/modal/delete/delete-user-group/DeleteUserGroupModal';
import { LeftOutlined, DeleteFilled, EditFilled } from '@ant-design/icons';

const { TabPane } = Tabs;
function callback(key) {
  console.log(key);
}
const BM010301AddView = ({ lang = 'vi', ...props }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [context, domain] = BM010301Domain();
  const { id } = useParams();

  const [isVisbledModal, setIsVisbledModal] = useState(false);
  const [closeModal, setCloseModal] = useState(false);

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
        domain.addNewUserGroup();
      })
      .catch((err) => console.log(err));
  };

  const openDeleteModal = () => {
    setIsVisbledModal(true);
  };

  const closeDeleteModal = () => {
    setIsVisbledModal(false);
  };

  const deleteHandler = () => {
    domain.deleteHandler();
  };

  return (
    <>
      <div>
        <DeleteUserGroupModal
          isVisbled={isVisbledModal}
          onCloseModal={closeDeleteModal}
          deleteHandler={deleteHandler}
        />
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
                  <Col span={17}>
                    <Button
                      className="button-previous"
                      onClick={() => {
                        domain.exitHandler();
                      }}
                    >
                      <LeftOutlined /> {'Quay lại'}
                    </Button>
                  </Col>

                  <Col span={7} className="col-btn-view">
                    <Button
                      className="button-delete"
                      onClick={(e) => {
                        openDeleteModal();
                      }}
                    >
                      Xóa nhóm
                      <DeleteFilled className={'icon-delete'} />
                    </Button>
                    <Button
                      className="button-edit"
                      onClick={(e) => domain.toEditPage(id)}
                    >
                      Chỉnh sửa <EditFilled className={'icon-edit'} />
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
