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
import DeleteAccountModal from '../modal/delete/DeleteAccountModal';
import '../CreateCorporate.less';
import '../../../../../../assets/less/LC-common.less';
import { CreateCorporateDomain } from '../../domains/CreateCorporateDomain';

const { Option } = Select;

const AccountInfoContent = ({ lang = 'vi', ...props }) => {
  const { t } = useTranslation();
  const [context, domain] = CreateCorporateDomain();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const bankOptions = [{ label: 'Ngân hàng Công Thương - VCB', value: 1 }];
  const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
  const [selectedKey, setSelectedKey] = useState(-1);
  const bankAccountType = [
    { label: 'TK thanh toán', value: 'payment-account' },
    { label: 'TK ký quỹ', value: 'holding-account' },
    { label: 'TK thu phí', value: 'fee-account' },
  ];

  // const [state, setState] = useState({
  //   dataSource: context?.corporate?.corporateAccountList,
  //   count: 0,
  // });

  // const [state, setState] = useState({
  //   dataSource: [],
  //   count: 0,
  // });

  const [state, setState] = useState(
    context?.corporate?.stateCorporateAccountList,
  );

  useEffect(() => {
    console.log('State:::', state);
  }, [state]);
  const [bankAccount, setBankAccountData] = useState({
    corporateAccountNumber: '',
    corporateAccountName: '',
    corporateAccountType: '',
    bankId: '',
  });

  const handleAdd = async () => {
    const { count, dataSource } = state;
    const newData = {
      key: count,
      corporateAccountId: count,
      corporateAccountNumber: '',
      corporateAccountName: '',
      corporateAccountType: '',
      bankId: '',
      corporateAccountStatus: 1,
    };
    setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
    });

    await domain.setStateAccountList({
      dataSource: [...dataSource, newData],
      count: count + 1,
    });
  };

  const onChangeCorporateAccountNumber = (e, key) => {
    let dataSource = [...state.dataSource]; // create the copy of state array
    var index = dataSource.findIndex(function (element) {
      return element.key == key;
    });
    dataSource[index].corporateAccountNumber = e.target.value; //new value
    setState({
      ...state,
      dataSource: dataSource,
    });
    console.log(dataSource);

    domain.setStateAccountList({
      ...state,
      dataSource: dataSource,
    });
  };

  const onChangeCorporateAccountType = (e, key) => {
    let dataSource = [...state.dataSource]; // create the copy of state array
    var index = dataSource.findIndex(function (element) {
      return element.key == key;
    });
    dataSource[index].corporateAccountType = e; //new value
    setState({
      ...state,
      dataSource: dataSource,
    });
    console.log(dataSource);
    domain.setStateAccountList({
      ...state,
      dataSource: dataSource,
    });
  };

  const onChangeCorporateAccountName = (e, key) => {
    let dataSource = [...state.dataSource]; // create the copy of state array
    var index = dataSource.findIndex(function (element) {
      return element.key == key;
    });
    dataSource[index].corporateAccountName = e.target.value; //new value
    setState({
      ...state,
      dataSource: dataSource,
    });
    console.log(dataSource);
    domain.setStateAccountList({
      ...state,
      dataSource: dataSource,
    });
  };

  const onChangeBank = (e, key) => {
    let dataSource = [...state.dataSource]; // create the copy of state array
    var index = dataSource.findIndex(function (element) {
      return element.key == key;
    });
    dataSource[index].bankId = e; //new value
    setState({
      ...state,
      dataSource: dataSource,
    });
    console.log(dataSource);
    domain.setStateAccountList({
      ...state,
      dataSource: dataSource,
    });
  };

  const handleDelete = async (key) => {
    let dataSource = [...state.dataSource];
    var pageMax = Math.ceil(dataSource.length / pageSize);
    if ((dataSource.length - 1) % pageSize == 0) {
      if (page == pageMax && page != 1) {
        setPage(page - 1);
      }
    }
    setState({
      ...state,
      dataSource: dataSource.filter((item) => item.key !== key),
    });

    await domain.setStateAccountList({
      ...state,
      dataSource: dataSource.filter((item) => item.key !== key),
    });
    setSelectedKey(-1);
  };

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
          style={{ width: '100%' }}
          onChange={(e) => onChangeCorporateAccountNumber(e, record.key)}
          name={'corporateAccountNumber'}
          placeholder="Nhập thông tin"
          defaultValue={
            state?.dataSource[(page - 1) * pageSize + index]
              ?.corporateAccountNumber
          }
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
          onChange={(e) => {
            onChangeCorporateAccountType(e, record.key);
          }}
          style={{ width: '100%' }}
          placeholder="Nhập thông tin"
          name={'corporateAccountType'}
          defaultValue={
            state?.dataSource[(page - 1) * pageSize + index]
              ?.corporateAccountType
          }
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
          style={{ width: '100%' }}
          onChange={(e) => onChangeCorporateAccountName(e, record.key)}
          name={'corporateAccountName'}
          placeholder="Nhập thông tin"
          defaultValue={
            state?.dataSource[(page - 1) * pageSize + index]
              ?.corporateAccountName
          }
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
          onChange={(e) => {
            onChangeBank(e, record.key);
          }}
          style={{ width: '100%' }}
          placeholder="Nhập thông tin"
          name={'bankId'}
          defaultValue={
            state?.dataSource[(page - 1) * pageSize + index]?.bankId
          }
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
              console.log(record.key);
              setSelectedKey(record.key);
              setDeleteConfirmVisible(true);
            }}
            shape="circle"
            icon={<DeleteFilled />}
            size={'small'}
          />
        </Space>
      ),
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
      <DeleteAccountModal
        isVisbled={deleteConfirmVisible}
        onClose={onModalClose}
        onCloseModal={onModalClose}
        deleteHandler={deleteHandler}
      />
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
              columns={columns}
              dataSource={[...state?.dataSource]}
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
    </>
  );
};

export default AccountInfoContent;
