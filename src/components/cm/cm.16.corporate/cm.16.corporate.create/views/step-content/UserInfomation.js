import React, { useState, useEffect, useContext, useRef } from 'react';
import {
  Col,
  Row,
  Input,
  Button,
  Form,
  Select,
  Checkbox,
  Space,
  Radio,
  Tabs,
  Popconfirm,
  Table,
  DatePicker,
} from 'antd';
// import AntdValidateTable from 'antd-validate-table';
// import AntdValidateTable from '../packages/index'
import log from '../../views/ModuleLogger';
import { KTTitle } from 'core/ui';
import { useTranslation } from 'react-i18next';
import { DeleteFilled, EditFilled, PlusOutlined } from '@ant-design/icons';
import moment from 'moment';
import { CreateCorporateDomain } from '../../domains/CreateCorporateDomain';
import '../CreateCorporate.less';
import DeleteUserModal from '../modal/delete/DeleteUserModal';
import '../../../../../../assets/less/LC-common.less';
import { number } from 'prop-types';
const { Option } = Select;
// const EditableContext = React.createContext(null);
const listPositions = [
  { label: 'Người đại diện pháp luật', value: 'legal_representative' },
  { label: 'Kế toán trưởng', value: 'accountant' },
  { label: 'Nhân viên', value: 'employee' },
  { label: 'Trưởng phòng', value: 'head_of_department' },
];

const UserInfoContent = ({ lang = 'vi', ...props }) => {
  const { t } = useTranslation();
  const [context, domain] = CreateCorporateDomain();
  const validaRef = useRef();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const dateFormat = 'DD/MM/YYYY';
  const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
  const [selectedKey, setSelectedKey] = useState(-1);

  function convert(str) {
    if (str != undefined && str != null && str != '') {
      var date = new Date(str),
        mnth = ('0' + (date.getMonth() + 1)).slice(-2),
        day = ('0' + date.getDate()).slice(-2);
      return [day, mnth, date.getFullYear()].join('/');
    } else {
      return '';
    }
  }

  const [state, setState] = useState(
    context?.corporate?.stateCorporateUserList,
  );

  const [userInfo, setUserInfoData] = useState({
    userName: '',
    position: '',
    identityType: '',
    identityNumber: '',
    dateOfIdentity: '',
    issuedByIdentity: '',
    phoneNumber: '',
    email: '',
    userGroupCode: '',
    role: '',
  });

  const onChangeUsername = (e, key) => {
    let dataSource = [...state.dataSource];

    var index = dataSource.findIndex(function (element) {
      return element.key == key;
    });
    dataSource[index].userName = e.target.value; //new value
    setState({
      ...state,
      dataSource: dataSource,
    });
    console.log(dataSource);
    domain.setStateUserList({
      ...state,
      dataSource: dataSource,
    });
  };

  const onChangePosition = (e, key) => {
    let dataSource = [...state.dataSource];
    var index = dataSource.findIndex(function (element) {
      return element.key == key;
    });
    dataSource[index].position = e;
    setState({
      ...state,
      dataSource: dataSource,
    });
    console.log(dataSource);
    domain.setStateUserList({
      ...state,
      dataSource: dataSource,
    });
  };

  const onChangeIdentityType = (e, key) => {
    let dataSource = [...state.dataSource];
    var index = dataSource.findIndex(function (element) {
      return element.key == key;
    });
    dataSource[index].identityType = e.target.value;
    setState({
      ...state,
      dataSource: dataSource,
    });
    console.log(dataSource);
    domain.setStateUserList({
      ...state,
      dataSource: dataSource,
    });
  };

  const onChangeIdentityNumber = (e, key) => {
    let dataSource = [...state.dataSource];
    var index = dataSource.findIndex(function (element) {
      return element.key == key;
    });
    dataSource[index].identityNumber = e.target.value;
    setState({
      ...state,
      dataSource: dataSource,
    });
    console.log(dataSource);
    domain.setStateUserList({
      ...state,
      dataSource: dataSource,
    });
  };

  const onChangeIdentityIssuedDate = (e, key) => {
    let dataSource = [...state.dataSource];
    var index = dataSource.findIndex(function (element) {
      return element.key == key;
    });
    dataSource[index].dateOfIdentity = convert(e?._d);
    setState({
      ...state,
      dataSource: dataSource,
    });
    console.log(dataSource);
    domain.setStateUserList({
      ...state,
      dataSource: dataSource,
    });
  };

  const onChangeIdentityIssuedPlace = (e, key) => {
    let dataSource = [...state.dataSource];
    var index = dataSource.findIndex(function (element) {
      return element.key == key;
    });
    dataSource[index].issuedByIdentity = e.target.value;
    setState({
      ...state,
      dataSource: dataSource,
    });
    console.log(dataSource);
    domain.setStateUserList({
      ...state,
      dataSource: dataSource,
    });
  };

  const onChangePhoneNumber = (e, key) => {
    let dataSource = [...state.dataSource];
    var index = dataSource.findIndex(function (element) {
      return element.key == key;
    });
    dataSource[index].phoneNumber = e.target.value;
    setState({
      ...state,
      dataSource: dataSource,
    });
    console.log(dataSource);
    domain.setStateUserList({
      ...state,
      dataSource: dataSource,
    });
  };

  const onChangeEmail = (e, key) => {
    let dataSource = [...state.dataSource];
    var index = dataSource.findIndex(function (element) {
      return element.key == key;
    });
    dataSource[index].email = e.target.value;
    setState({
      ...state,
      dataSource: dataSource,
    });
    console.log(dataSource);
    domain.setStateUserList({
      ...state,
      dataSource: dataSource,
    });
  };

  const onChangeUserGroupCode = (e, key) => {
    let dataSource = [...state.dataSource];
    var index = dataSource.findIndex(function (element) {
      return element.key == key;
    });
    var i = context?.userGroupCode.findIndex(function (element) {
      return element.userGroupCode == e;
    });
    dataSource[index].userGroupCode = e;
    dataSource[index].role = context?.userGroupCode[i].role;
    setState({
      ...state,
      dataSource: dataSource,
    });
    console.log(dataSource);
    domain.setStateUserList({
      ...state,
      dataSource: dataSource,
    });
  };

  const handleDelete = async (key) => {
    let dataSource = [...state.dataSource];
    var pageMax = Math.ceil(dataSource.length / pageSize);
    if ((dataSource.length - 1) % pageSize == 0) {
      if (page == pageMax) {
        setPage(page - 1);
      }
    }
    setState({
      ...state,
      dataSource: dataSource.filter((item) => item.key !== key),
    });
    await domain.setStateUserList({
      ...state,
      dataSource: dataSource.filter((item) => item.key !== key),
    });
    setSelectedKey(-1);
  };

  // //------------------Code mới--------------------//

  const handleAdd = async () => {
    const { count, dataSource } = state;
    const newData = {
      key: count,

      userName: '',
      position: '',
      identityType: '',
      identityNumber: '',
      dateOfIdentity: '01/01/2015',
      issuedByIdentity: '',
      phoneNumber: '',
      email: '',
      userGroupCode: '',
      role: '',
      userStatus: 1,
    };
    setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
    });

    await domain.setStateUserList({
      dataSource: [...dataSource, newData],
      count: count + 1,
    });
  };

  //------------Custom component------------------//

  //------------------Code mới--------------------//
  const columns = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
      width: '3%',
      fixed: 'left',
      render: (value, item, index) => (page - 1) * pageSize + index + 1,
    },

    {
      title: 'Tên hiển thị',
      dataIndex: 'userName',
      key: 'userName',
      editable: true,
      width: '14%',

      render: (text, record, index) => (
        <Input
          style={{ width: '100%' }}
          onChange={(e) => onChangeUsername(e, record.key)}
          name={'userName'}
          placeholder="Nhập thông tin"
          defaultValue={
            state?.dataSource[(page - 1) * pageSize + index]?.userName
          }
        />
      ),
    },
    {
      title: 'Chức vụ',
      dataIndex: 'position',
      key: 'position',
      editable: true,
      width: '16%',
      render: (text, record, index) => (
        <Select
          onChange={(e) => {
            onChangePosition(e, record.key);
          }}
          style={{ width: '100%' }}
          placeholder="Nhập thông tin"
          defaultValue={
            state?.dataSource[(page - 1) * pageSize + index]?.position
          }
        >
          {listPositions.map((position) => (
            <Option key={position.value} value={position.value}>
              {position.label}
            </Option>
          ))}
        </Select>
      ),
    },
    {
      title: 'Giấy tờ định danh',
      dataIndex: 'identityType',
      key: 'identityType',
      editable: true,
      width: '15%',
      render: (text, record, index) => (
        <Radio.Group
          onChange={(e) => {
            onChangeIdentityType(e, record.key);
          }}
          style={{ width: '100%' }}
          defaultValue={
            state?.dataSource[(page - 1) * pageSize + index]?.identityType
          }
          name={'identityType'}
        >
          <Space direction="vertical">
            <Radio value={'cmnd/cccd/cccd_chip'}>
              CMND/ CCCD/CCCD gắn chip
            </Radio>
            <Radio value={'ho_chieu'}>Hộ chiếu</Radio>
          </Space>
        </Radio.Group>
      ),
    },
    {
      title: 'Số giấy tờ định danh',
      dataIndex: 'identityNumber',
      key: 'identityNumber',
      editable: true,
      width: '10%',
      render: (text, record, index) => (
        <Input
          onChange={(e) => {
            onChangeIdentityNumber(e, record.key);
          }}
          style={{ width: '100%' }}
          name={'identityNumber'}
          defaultValue={
            state?.dataSource[(page - 1) * pageSize + index]?.identityNumber
          }
          placeholder="Nhập thông tin"
        />
      ),
    },
    {
      title: 'Ngày cấp',
      dataIndex: 'identityIssuedDate',
      key: 'identityIssuedDate',
      width: '15%',
      render: (text, record, index) => (
        <DatePicker
          onChange={(e) => {
            onChangeIdentityIssuedDate(e, record.key);
          }}
          name="identityIssuedDate"
          style={{ width: '100%' }}
          defaultValue={moment(
            state?.dataSource[(page - 1) * pageSize + index]?.dateOfIdentity,
            dateFormat,
          )}
          format={dateFormat}
        />
      ),
    },
    {
      title: 'Nơi cấp',
      dataIndex: 'identityIssuedPlace',
      key: 'identityIssuedPlace',
      width: '15%',
      render: (text, record, index) => (
        <Input
          onChange={(e) => {
            onChangeIdentityIssuedPlace(e, record.key);
          }}
          name={'identityIssuedPlace'}
          placeholder="Nhập thông tin"
          defaultValue={
            state?.dataSource[(page - 1) * pageSize + index]?.issuedByIdentity
          }
        />
      ),
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      width: '14%',
      render: (text, record, index) => (
        <Input
          onChange={(e) => {
            onChangePhoneNumber(e, record.key);
          }}
          style={{ width: '100%' }}
          type={number}
          name={'phoneNumber'}
          placeholder="Nhập thông tin"
          defaultValue={
            state?.dataSource[(page - 1) * pageSize + index]?.phoneNumber
          }
        />
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: '14%',
      render: (text, record, index) => (
        <Input
          onChange={(e) => {
            onChangeEmail(e, record.key);
          }}
          style={{ width: '100%' }}
          name={'email'}
          placeholder="Nhập thông tin"
          defaultValue={state?.dataSource[(page - 1) * pageSize + index]?.email}
        />
      ),
    },
    {
      title: 'Tên nhóm người dùng',
      dataIndex: 'userGroupCode',
      key: 'userGroupCode',
      width: '10%',
      render: (text, record, index) => (
        <Select
          onChange={(e) => {
            onChangeUserGroupCode(e, record.key);
          }}
          style={{ width: '100%' }}
          placeholder="Nhập thông tin"
          defaultValue={
            state?.dataSource[(page - 1) * pageSize + index]?.userGroupCode
          }
        >
          {context?.userGroupCode.map((userGroup, i) => (
            <Option key={userGroup.id} value={userGroup.userGroupCode}>
              {userGroup.userGroupName}
            </Option>
          ))}
        </Select>
      ),
    },
    {
      title: 'Vai trò',
      dataIndex: 'role',
      key: 'role',
      width: '10%',
      render: (text, record, index) => (
        <Input
          disabled
          style={{ width: '100%' }}
          name={'role'}
          placeholder="Nhập thông tin"
          value={state?.dataSource[(page - 1) * pageSize + index]?.role}
        />
      ),
    },

    {
      title: 'Tác vụ',
      key: 'action',
      width: '5%',
      fixed: 'right',
      render: (_, record) =>
        state.dataSource.length >= 1 ? (
          // <Popconfirm
          //   title="Bạn có chắc chăn muốn xóa bản ghi này?"
          //   onConfirm={() => handleDelete(record.key)}
          // >
          <Button
            style={{
              display: record.key == 0 || record.key == 1 ? 'none' : '',
            }}
            onClick={(e) => {
              console.log(record.key);
              setSelectedKey(record.key);
              setDeleteConfirmVisible(true);
            }}
            shape="circle"
            icon={<DeleteFilled />}
            size={'small'}
          />
        ) : // </Popconfirm>
        null,
      // render: (_, record) =>
      //   state.dataSource.length >= 1 ? (
      //     <Popconfirm
      //       title="Bạn có chắc chăn muốn xóa bản ghi này?"
      //       onConfirm={() => handleDelete(record.key)}
      //     >
      //       <Button
      //         onClick={(e) => {
      //           console.log(record.key);
      //         }}
      //         shape="circle"
      //         icon={<DeleteFilled />}
      //         size={'small'}
      //       />
      //     </Popconfirm>
      //   ) : null,
    },
  ];
  const deleteHandler = () => {
    handleDelete(selectedKey);

    onModalClose();
  };
  function onModalClose() {
    setDeleteConfirmVisible(false);
  }
  return (
    <>
      <div>
        <DeleteUserModal
          isVisbled={deleteConfirmVisible}
          onClose={onModalClose}
          onCloseModal={onModalClose}
          deleteHandler={deleteHandler}
        />
        <Row style={{ padding: 15 }}>
          <Col span={24}>
            <KTTitle size={3}>
              <b>Thông tin người dùng</b>
            </KTTitle>
          </Col>
        </Row>
        <div style={{ background: 'white', borderRadius: '5px' }}>
          <Row style={{ padding: 15 }}>
            <Col span={24}>
              <Row style={{ paddingBottom: 10 }}>
                <Col span={24}>
                  <KTTitle size={3}>
                    <b>Danh sách người dùng</b>
                  </KTTitle>
                </Col>
              </Row>
              <Row style={{ float: 'right', marginRight: '16px' }}>
                <Button
                  className="common-btn"
                  onClick={(e) => {
                    handleAdd();
                  }}
                >
                  Thêm dòng{' '}
                  <span style={{ marginLeft: '10px' }}>
                    <PlusOutlined />
                  </span>
                </Button>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Table
                dataSource={[...state?.dataSource]}
                columns={columns}
                scroll={{ x: 2800 }}
                pagination={{
                  current: page,
                  onChange(current) {
                    setPage(current);
                  },
                  pageSize: pageSize,
                }}
              />
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default UserInfoContent;
