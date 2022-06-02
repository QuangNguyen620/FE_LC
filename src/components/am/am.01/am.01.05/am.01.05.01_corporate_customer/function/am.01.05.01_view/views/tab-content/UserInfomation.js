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
      title: 'Tên hiển thị',
      dataIndex: 'userName',
      key: 'userName',
    },
    {
      title: 'Chức vụ',
      dataIndex: 'position',
      key: 'position',
    },
    {
      title: 'Giấy tờ định danh',
      dataIndex: 'identityType',
      key: 'identityType',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: 'Hòm thư điện tử',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Mã nhóm người dùng',
      dataIndex: 'userGroupCode',
      key: 'userGroupCode',
    },
    {
      title: 'Vai trò',
      dataIndex: 'role',
      key: 'role',
    },
    // {
    //   title: 'Trạng thái',
    //   dataIndex: 'userStatus',
    //   key: 'userStatus',
    //   render: (text, record, index) => {
    //     if (text == '1') {
    //       return 'Hoạt động';
    //     } else if (record.userStatus == '0') {
    //       return 'Không hoạt động';
    //     } else {
    //       return text;
    //     }
    //   },
    // },
    {
      title: 'Thao tác',
      key: 'action',
      render: (text, record, index) => (
        <Space size="middle" wrap>
          {/* <a>Invite {record.name}</a> */}
          <Button
            disabled
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
        <Row className={'padding-title'}>
          <Col span={24}>
            <Row className={'padding-title-sub1'}>
              <Col span={24}>
                <KTTitle size={3}>
                  <b>Thông tin người dùng</b>
                </KTTitle>
              </Col>
            </Row>
            {/* <Row className={'marginR-md'}>
              <Button
                className="common-btn"
                onClick={(e) => {
                  openModal();
                }}
              >
                Thêm mới
              </Button>
            </Row> */}
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
