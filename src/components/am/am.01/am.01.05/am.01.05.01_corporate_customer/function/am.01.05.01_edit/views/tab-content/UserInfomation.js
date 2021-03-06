import React, { useState, useEffect } from 'react';
import {
  Col,
  Row,
  Input,
  Button,
  Form,
  Select,
  Checkbox,
  Space,
  DatePicker,
  Tabs,
  Table,
} from 'antd';
import { KTTitle } from 'core/ui';
import { useTranslation } from 'react-i18next';
import { DeleteFilled } from '@ant-design/icons';
import moment from 'moment';
import AddUserModal from '../modal/AddUserModal';
import DeleteUserModal from '../modal/delete/DeleteUserModal';
import DeleteUserSuccessfullModal from '../modal/delete/DeleteUserSuccessfullModal';
// import { KTBodyText, KTButton, KTHeading, KTSubTitle, KTLogo } from 'core/ui';
// import ic_fis from 'assets/img/brand/logo_fis.png';
import '../../../../common/less/AM.01.05.01.less';
import '../../../../../../../../../assets/less/LC-common.less';

const { Option } = Select;

const UserInfoContent = ({ lang = 'vi', ...props }) => {
  const { t } = useTranslation();

  // const dateFormatList = 'DD/MM/YYYY';

  const [form] = Form.useForm();

  const [dialogVisible, setVisible] = useState(false);

  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const [deleteSuccessfulDialogVisible, setDeleteSuccessfulDialogVisible] =
    useState(false);

  const [seltectedUserIndex, setSelectedUserIndex] = useState(-1);

  const { TabPane } = Tabs;

  function callback(key) {
    console.log(key);
  }
  // props.listUserAccount = [];

  const [userInfo, setUserInfoData] = useState({
    email: '',
    phoneNumber: '',
    role: '',
    userGroupCode: '',
    userName: '',
    userStatus: '',
    position: '',
    identityType: 'CCCD/CMND',
    identityNumber: 0,
    dateOfIdentity: '01/01/2015',
    issuedByIdentity: '',
    id: -1,
  });

  function onChangeUserData(e) {
    setUserInfoData({ ...userInfo, [e.target.name]: e.target.value });
  }

  function onChangeUserRole(e) {
    console.log(e);
    setUserInfoData({ ...userInfo, role: e });
  }

  function onChangeUserGroup(e) {
    console.log(e);
    setUserInfoData({ ...userInfo, userGroupCode: e });
  }

  function onChangeIdentityType(e) {
    console.log(e);
    setUserInfoData({ ...userInfo, identityType: e.target.value });
  }

  const submitHandler = () => {
    var userData = {
      email: userInfo.email,
      phoneNumber: userInfo.phoneNumber,
      role: userInfo.role,
      userGroupCode: userInfo.userGroupCode,
      userName: userInfo.userName,
      userStatus: '1',
      position: userInfo.position,
      identityType: userInfo.identityType,
      identityNumber: userInfo.identityNumber,
      dateOfIdentity: userInfo.dateOfIdentity,
      issuedByIdentity: userInfo.issuedByIdentity,
      id: -1,
    };
    console.log('Received values of form: ', userData);
    props.listUserAccount.push(userData);
    console.log(props.listUserAccount);
  };

  const deleteHandler = () => {
    var index = seltectedUserIndex;
    if (index > -1) {
      props.listUserAccount.splice(index, 1);
    }
    setDeleteSuccessfulDialogVisible(true);
    return props.listUserAccount;
  };

  const columns = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
      render: (text, record, index) => (
        <Space size="middle">
          <p>{index + 1}</p>
        </Space>
      ),
    },
    {
      title: 'T??n hi???n th???',
      dataIndex: 'userName',
      key: 'userName',
    },
    {
      title: 'Ch???c v???',
      dataIndex: 'position',
      key: 'position',
    },
    {
      title: 'Gi???y t??? ?????nh danh',
      dataIndex: 'identityType',
      key: 'identityType',
    },
    {
      title: 'S??? ??i???n tho???i',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: 'H??m th?? ??i???n t???',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'M?? nh??m ng?????i d??ng',
      dataIndex: 'userGroupCode',
      key: 'userGroupCode',
    },
    {
      title: 'Vai tr??',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Thao t??c',
      key: 'action',
      render: (text, record, index) => (
        <Space size="middle" wrap>
          {/* <a>Invite {record.name}</a> */}
          <Button
            disabled={record.id == -1 ? false : true}
            onClick={(e) => {
              openDeleteModal(index);
            }}
            shape="circle"
            icon={<DeleteFilled />}
            size={'small'}
          />
        </Space>
      ),
    },
  ];

  function closeModal(data) {
    console.log(data);
    setVisible(false);
  }

  function openModal(data) {
    setVisible(true);
    console.log(data);
  }

  function closeDeleteModal(data) {
    setDeleteDialogVisible(false);
  }

  function openDeleteModal(data) {
    setDeleteDialogVisible(true);
    setSelectedUserIndex(data);
  }
  function closeDeleteSuccessfulModal() {
    setDeleteSuccessfulDialogVisible(false);
  }

  return (
    <>
      <div className={'main-container'}>
        <DeleteUserSuccessfullModal
          isVisbled={deleteSuccessfulDialogVisible}
          onCloseModal={closeDeleteSuccessfulModal}
          onClose={closeDeleteSuccessfulModal}
        />

        <DeleteUserModal
          isVisbled={deleteDialogVisible}
          onCloseModal={closeDeleteModal}
          onClose={closeDeleteModal}
          deleteHandler={deleteHandler}
        />

        <AddUserModal
          isVisbled={dialogVisible}
          onCloseModal={closeModal}
          onClose={closeModal}
          userInfo={userInfo}
          onChangeUserAccount={onChangeUserData}
          onChangeUserRole={onChangeUserRole}
          onChangeUserGroup={onChangeUserGroup}
          onChangeIdentityType={onChangeIdentityType}
          submitHandler={submitHandler}
        />
        <Row className={'padding-md'}>
          <Col span={24}>
            <Row className={'padding-title-sub1'}>
              <Col span={24}>
                <KTTitle size={3}>
                  <b>Th??ng tin ng?????i d??ng</b>
                </KTTitle>
              </Col>
            </Row>
            <Row className={'marginR-md'}>
              <Button
                className="common-btn"
                onClick={(e) => {
                  openModal();
                }}
              >
                Th??m m???i
              </Button>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Table
              columns={columns}
              dataSource={[...props.listUserAccount]}
              pagination={{ pageSize: 4 }}
            />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default UserInfoContent;
