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
import { DeleteFilled, PlusOutlined } from '@ant-design/icons';
import { CreateCorporateDomain } from '../../domains/ViewCorporateDomain';
import '../ViewCorporate.less';
import '../../../../../../assets/less/LC-common.less';

const { Option } = Select;

const AccountInfoContent = ({ lang = 'vi', ...props }) => {
  const { t } = useTranslation();
  const [context, domain] = CreateCorporateDomain();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const bankOptions = [{ label: 'Ngân hàng Công Thương - VCB', value: 1 }];

  const bankAccountType = [
    { label: 'TK thanh toán', value: 'payment-account' },
    { label: 'TK ký quỹ', value: 'holding-account' },
    { label: 'TK thu phí', value: 'fee-account' },
  ];

  const [state, setState] = useState({
    dataSource: context?.corporate?.corporateAccountList,
    count: 0,
  });

  useEffect(() => {
    setState({
      ...state,
      dataSource: context?.corporate?.corporateAccountList,
    });
  }, [context]);

  const [bankAccount, setBankAccountData] = useState({
    bankId: 1,
    corporateAccountName: '',
    corporateAccountNumber: '',
    corporateAccountStatus: 0,
    corporateAccountType: '',
  });

  const columns = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
      width: '4%',
      fixed: 'left',
      render: (value, item, index) => (page - 1) * pageSize + index + 1,
    },
    {
      title: 'Số tài khoản',
      dataIndex: 'corporateAccountNumber',
      key: 'corporateAccountNumber',
      width: '25%',
      render: (text, record, index) => (
        <Input
          disabled
          style={{ width: '100%' }}
          // onChange={(e) => onChangeCorporateAccountNumber(e, record.key)}
          name={'corporateAccountNumber'}
          placeholder="Nhập thông tin"
          defaultValue={state?.dataSource[record.index]?.corporateAccountNumber}
        />
      ),
    },
    {
      title: 'Loại tài khoản',
      dataIndex: 'corporateAccountType',
      key: 'corporateAccountType',
      width: '15%',
      render: (text, record, index) => (
        <Select
          disabled
          // onChange={(e) => {
          //   onChangeCorporateAccountType(e, record.key);
          // }}
          style={{ width: '100%' }}
          placeholder="Nhập thông tin"
          name={'corporateAccountType'}
          defaultValue={state?.dataSource[record.index]?.corporateAccountType}
        >
          {bankAccountType.map((type) => (
            <Option key={type.value} value={type.value}>
              {type.label}
            </Option>
          ))}
        </Select>
      ),
    },
    {
      title: 'Tên tài khoản',
      dataIndex: 'corporateAccountName',
      key: 'corporateAccountName',
      width: '20%',
      render: (text, record, index) => (
        <Input
          disabled
          style={{ width: '100%' }}
          // onChange={(e) => onChangeCorporateAccountName(e, record.key)}
          name={'corporateAccountName'}
          placeholder="Nhập thông tin"
          defaultValue={state?.dataSource[record.index]?.corporateAccountName}
        />
      ),
    },
    {
      title: 'Ngân hàng',
      dataIndex: 'bankId',
      key: 'bankId',
      width: '20%',
      render: (text, record, index) => (
        <Select
          disabled
          // onChange={(e) => {
          //   onChangeBank(e, record.key);
          // }}
          style={{ width: '100%' }}
          placeholder="Nhập thông tin"
          name={'bankId'}
          defaultValue={state?.dataSource[record.index]?.bankId}
        >
          {context?.constantValue?.bankList.map((bank) => (
            <Option key={bank.bankId} value={bank.bankId}>
              {bank.bankCode + '-' + bank.bankName}
            </Option>
          ))}
        </Select>
      ),
    },
    {
      title: 'Tác vụ',
      key: 'action',
      width: '4%',
      render: (text, record, index) => (
        <Space align="center" size="middle" wrap>
          <Button
            onClick={(e) => {
              console.log(record.index);
            }}
            shape="circle"
            icon={<DeleteFilled />}
            size={'small'}
          />
        </Space>
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
                  <b>Danh sách tài khoản doanh nghiệp</b>
                </KTTitle>
              </Col>
            </Row>
            {/* <Row style={{ float: 'right', marginRight: '16px' }}>
              <Button
                className="common-btn"
                onClick={(e) => {
                  openModal();
                }}
                disabled
              >
                Thêm dòng{' '}
                <span style={{ marginLeft: '10px' }}>
                  <PlusOutlined />
                </span>
              </Button>
            </Row> */}
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Table
              columns={columns}
              dataSource={state.dataSource}
              pagination={{
                onChange(current) {
                  setPage(current);
                },
                pageSize: pageSize,
              }}
            />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default AccountInfoContent;
