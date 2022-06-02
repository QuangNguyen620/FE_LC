import React, { useState, useEffect } from 'react';
import {
  Col,
  Row,
  Input,
  Select,
  Space,
  DatePicker,
  Table,
  Radio,
  Divider,
  Button,
} from 'antd';
import { KTTitle } from 'core/ui';
import { useTranslation } from 'react-i18next';
import { DeleteFilled, EditFilled, PlusOutlined } from '@ant-design/icons';
import moment from 'moment';
import '../ViewCorporate.less';
import '../../../../../../assets/less/LC-common.less';
import { CreateCorporateDomain } from '../../domains/ViewCorporateDomain';
const { Option } = Select;

const listPositions = [
  { label: 'Người đại diện pháp luật', value: 'legal_representative' },
  { label: 'Kế toán trưởng', value: 'accountant' },
  { label: 'Nhân viên', value: 'employee' },
  { label: 'Trưởng phòng', value: 'head_of_department' },
];

const UserInfoContent = ({ lang = 'vi', ...props }) => {
  const { t } = useTranslation();
  const [context, domain] = CreateCorporateDomain();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const dateFormat = 'DD/MM/YYYY';

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

  const [state, setState] = useState({
    dataSource: context?.corporate?.corporateUserList,
    count: 0,
  });

  useEffect(() => {
    setState({
      ...state,
      dataSource: context?.corporate?.corporateUserList,
    });
  }, [context]);

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
          // onChange={(e) => onChangeUsername(e, record.key)}
          name={'userName'}
          placeholder="Nhập thông tin"
          defaultValue={state?.dataSource[record.index]?.userName}
          disabled
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
          // onChange={(e) => {
          //   onChangePosition(e, record.key);
          // }}
          style={{ width: '100%' }}
          placeholder="Nhập thông tin"
          defaultValue={state?.dataSource[record.index]?.position}
          disabled
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
          disabled
          // onChange={(e) => {
          //   onChangeIdentityType(e, record.key);
          // }}
          style={{ width: '100%' }}
          defaultValue={state?.dataSource[record.index]?.identityType}
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
          disabled
          // onChange={(e) => {
          //   // onChangeIdentityNumber(e, record.key);
          // }}
          style={{ width: '100%' }}
          name={'identityNumber'}
          defaultValue={state?.dataSource[record.index]?.identityNumber}
          placeholder="Nhập thông tin"
        />
      ),
    },
    {
      title: 'Ngày cấp',
      dataIndex: 'dateOfIdentity',
      key: 'dateOfIdentity',
      width: '15%',
      render: (text, record, index) => (
        <DatePicker
          disabled
          // onChange={(e) => {
          //   // onChangeIdentityIssuedDate(e, record.key);
          // }}
          name="dateOfIdentity"
          style={{ width: '100%' }}
          defaultValue={moment(
            state?.dataSource[record.index]?.dateOfIdentity,
            dateFormat,
          )}
          format={dateFormat}
        />
      ),
    },
    {
      title: 'Nơi cấp',
      dataIndex: 'issuedByIdentity',
      key: 'issuedByIdentity',
      width: '15%',
      render: (text, record, index) => (
        <Input
          // onChange={(e) => {
          //   // onChangeIdentityIssuedPlace(e, record.key);
          // }}
          disabled
          name={'issuedByIdentity'}
          placeholder="Nhập thông tin"
          defaultValue={state?.dataSource[record.index]?.issuedByIdentity}
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
          // onChange={(e) => {
          //   onChangePhoneNumber(e, record.key);
          // }}
          style={{ width: '100%' }}
          name={'phoneNumber'}
          disabled
          placeholder="Nhập thông tin"
          defaultValue={state?.dataSource[record.index]?.phoneNumber}
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
          // onChange={(e) => {
          //   onChangeEmail(e, record.key);
          // }}
          style={{ width: '100%' }}
          name={'email'}
          disabled
          placeholder="Nhập thông tin"
          defaultValue={state?.dataSource[record.index]?.email}
        />
      ),
    },
    {
      title: 'Tên nhóm người dùng',
      dataIndex: 'userGroupCode',
      key: 'userGroupCode',
      width: '10%',
      render: (text, record, index) => (
        <Input
          // onChange={(e) => {
          //   onChangeEmail(e, record.key);
          // }}
          style={{ width: '100%' }}
          name={'email'}
          disabled
          placeholder="Nhập thông tin"
          // defaultValue={state?.dataSource[record.index]?.userGroupCode}
          defaultValue={state?.dataSource[record.index]?.userGroupName}
        />
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
          defaultValue={state?.dataSource[record.index]?.role}
        />
      ),
    },
  ];
  return (
    <>
      <div style={{ background: 'white', borderRadius: '5px' }}>
        <Row style={{ padding: 16 }}>
          <Col span={24}>
            <Row style={{ paddingBottom: 15 }}>
              <Col span={24}>
                <KTTitle size={3}>
                  <b>Thông tin người dùng</b>
                </KTTitle>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Table
              dataSource={state.dataSource}
              columns={columns}
              scroll={{ x: 2800 }}
              pagination={{
                onChange(current) {
                  setPage(current);
                },
                pageSize: pageSize,
              }}
            />
          </Col>
        </Row>
        <Divider></Divider>
      </div>
    </>
  );
};

export default UserInfoContent;
