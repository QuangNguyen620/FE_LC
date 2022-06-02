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

import '../../../../common/less/AM.01.05.01.less';
import '../../../../../../../../../assets/less/LC-common.less';

const { Option } = Select;

const AccountInfoContent = ({ lang = 'vi', ...props }) => {
  const { t } = useTranslation();

  // const dateFormatList = 'DD/MM/YYYY';

  const [form] = Form.useForm();

  const [dialogVisible, setVisible] = useState(false);

  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const [deleteSuccessfulDialogVisible, setDeleteSuccessfulDialogVisible] =
    useState(false);

  const [seltectedAccountIndex, setSelectedAccountIndex] = useState(-1);

  const bankOptions = [{ label: 'Ngân hàng Công Thương - VCB', value: 1 }];

  const { TabPane } = Tabs;

  function callback(key) {
    console.log(key);
  }
  // props.listBankAccount = [];

  const [bankAccount, setBankAccountData] = useState({
    bankId: 1,
    corporateAccountName: '',
    corporateAccountNumber: '',
    corporateAccountStatus: 0,
    corporateAccountType: '',
    // corporateAccountId: -1,
  });

  function onChangeBankAccountData(e) {
    setBankAccountData({ ...bankAccount, [e.target.name]: e.target.value });
  }
  function onChangeBankAccountBankId(e) {
    setBankAccountData({ ...bankAccount, bankId: e });
  }

  const submitHandler = () => {
    var bankAccountData = {
      bankId: bankAccount.bankId,
      corporateAccountName: bankAccount.corporateAccountName,
      corporateAccountNumber: bankAccount.corporateAccountNumber,
      corporateAccountStatus: 1,
      corporateAccountType: bankAccount.corporateAccountType,
      // corporateAccountId: -1,
    };

    console.log('Received values of form: ', bankAccountData);
    props.listBankAccount.push(bankAccountData);
    console.log(props.listBankAccount);
  };

  const deleteHandler = () => {
    var index = seltectedAccountIndex;
    if (index > -1) {
      props.listBankAccount.splice(index, 1);
    }
    setDeleteSuccessfulDialogVisible(true);
    return props.listBankAccount;
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
      title: 'Số tài khoản',
      dataIndex: 'corporateAccountNumber',
      key: 'corporateAccountNumber',
    },
    {
      title: 'Tên tài khoản',
      dataIndex: 'corporateAccountName',
      key: 'corporateAccountName',
    },
    {
      title: 'Loại tài khoản',
      dataIndex: 'corporateAccountType',
      key: 'corporateAccountType',
    },
    {
      title: 'Tên ngân hàng',
      dataIndex: 'bankId',
      key: 'bankId',
      render: (text) => {
        var bankName = '';
        for (let i = 0; i < bankOptions.length; i++) {
          if (bankOptions[i].value == text) {
            bankName = bankOptions[i].label + ' ';
          }
        }
        return bankName;
      },
    },
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
    setSelectedAccountIndex(data);
    console.log(seltectedAccountIndex);
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
                  <b>Danh sách tài khoản doanh nghiệp</b>
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
              dataSource={[...props.listBankAccount]}
              pagination={{ pageSize: 4 }}
            />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default AccountInfoContent;
