import React, { useContext, useState, useEffect, useRef } from 'react';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import {
  Col,
  Row,
  Form,
  Select,
  Popconfirm,
  Input,
  Button,
  Space,
  DatePicker,
  Checkbox,
  Table,
  message,
} from 'antd';
import { KTTitle } from 'core/ui';
import '../../../components/less/AM.02.13.less';
import { useA00Domain } from '../domains/AM.03.01.02Domain';
import { useHistory } from 'react-router';
import UpdateSuccessfullModal from '../../../components/modal/edit/modal/UpdateSuccessfullModal';
import UpdateFailedModal from '../../../components/modal/edit/modal/UpdateFailedModal';
import { DeleteFilled } from '@ant-design/icons';

import { useParams } from 'react-router-dom';
var axios = require('axios');

const { Option } = Select;
const exceptThisSymbols = ['e', 'E', '+', '-', '.'];

const feeTransactionChannels = [
  { value: 'BANK', label: 'Ngân hàng' },
  { value: 'CORPORATE', label: 'Doanh nghiệp' },
];

// Hiển thị giá trị là:
// - Xếp hạng ngân hàng
// - Giá trị L/C
// - Giao dịch

const feeRulesBaseList = [
  { value: 'bank-ranking', label: 'Xếp hạng ngân hàng' },
  { value: 'lc-value', label: 'Giá trị L/C' },
  { value: 'transaction', label: 'Giao dịch' },
];

const feeRulesCurrencyList = [{ value: 'VND', label: 'VNĐ' }];

const feeRulesMethodLC = [
  { value: 'fixed-fee', label: 'Phí cố định' },
  { value: 'full-progressive-fee', label: 'Phí lũy tiến toàn phần' },
];

const feeRulesMethodTransaction = [
  { value: 'fixed-fee', label: 'Phí cố định' },
  { value: 'fee-free', label: 'Không tính phí' },
];

const feeRulesRuleLC = [
  { value: 'percent-rate', label: 'Tỷ lệ phần trăm (%)' },
];

const EditableContext = React.createContext(null);
const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

const feeRulesRuleTransaction = [{ value: 'fee-amount', label: 'Số tiền phí' }];

const AM030102Add = ({ lang = 'vi', ...props }) => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [, domain] = useA00Domain();
  const history = useHistory();
  const dateFormatList = 'DD/MM/YYYY';
  const [form] = Form.useForm();

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

  const [showSuccessfull, setShowSuccessfull] = useState(false);
  const [showFailed, setShowFailed] = useState(false);
  const [showExisted, setShowExisted] = useState(false);

  const [feeBankCodeOptions, setFeeBankCodeList] = useState([]);
  const [feeBankTransitionCodeOptions, setFeeBankTransitionCodeList] = useState(
    [],
  );

  const [feeRulesBaseOptions, setFeeRulesBaseOptionList] =
    useState(feeRulesBaseList);

  const [feeRulesCurrencyOptions, setFeeRulesCurrencyOptionList] = useState([]);

  const [feeRulesMethodOptions, setFeeRulesMethodOptionList] = useState([]);

  const [feeRulesRuleOptions, setFeeRulesRuleOptionList] = useState([]);

  const [checked, setChecked] = React.useState(false);

  const [bankRatingOptions, setBankRatingOptions] = useState([]);
  //------------------------------//

  //Value state
  const [userInput, setInput] = useState({
    feeRulesId: 0,
    feeId: 0,
    feeTransactionId: 0,
    feeRulesCode: '',
    feeRulesName: '',
    feeRulesBase: '',
    feeRulesBaseValue: '',
    feeRulesCurrency: '',
    feeRulesDescription: '',
    feeRulesMaxValue: 0,
    feeRulesMethod: '',
    feeRulesMinValue: 0,
    feeRulesRate: 0,
    feeRulesRule: '',
    feeRulesTaxVat: false,
    feeRulesValue: 0,
    feeRulesVat: 0,
    feeStatus: 0,
    feeRulesApplyDateFrom: '',
    feeRulesApplyDateTo: '',
  });

  const [fullProgressionLc, setFullProgressionLc] = useState([]);
  const [state, setState] = useState({
    dataSource: [],
    count: 0,
  });
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  // các xử lý liên quan table fee
  const [form1] = Form.useForm();

  const handleAdd = () => {
    console.log(state);
    const { dataSource: fullProgressionLc, count } = state;
    console.log('key::', count);
    const newData = {
      stt: count + 1,
      key: count + 1,
      valueFrom: null,
      valueTo: null,
      feeAmount: null,
      feeRate: null,
      feeMinValue: null,
      feeMaxValue: null,
    };
    setState({
      dataSource: [...fullProgressionLc, newData],
      count: count + 1,
    });

    setDataTable([...fullProgressionLc, newData]);

    console.log(state);
  };

  const lcValueColumns = [
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
      title: 'Giá trị từ',
      dataIndex: 'valueFrom',
      key: 'valueFrom',
      editable: true,
    },
    {
      title: 'Giá trị đến',
      dataIndex: 'valueTo',
      key: 'valueTo',
      editable: true,
    },
    {
      title: 'Số tiền phí',
      dataIndex: 'feeAmount',
      key: 'feeAmount',
      editable: true,
    },
    {
      title: 'Tỷ lệ phần trăm',
      dataIndex: 'feeRate',
      key: 'feeRate',
      editable: true,
    },

    {
      title: 'Số tiền tối thiểu',
      dataIndex: 'minAmount',
      key: 'minAmount',
      editable: true,
    },

    {
      title: 'Số tiền tối đa',
      dataIndex: 'maxAmount',
      key: 'maxAmount',
      editable: true,
    },
    {
      title: 'Tác vụ',
      dataIndex: 'operation',
      render: (_, record) =>
        state.dataSource.length >= 1 ? (
          <Popconfirm
            className="item-center"
            title="Bạn có chắc chắn xóa?"
            onConfirm={() => handleDelete(record.key)}
          >
            <a>
              <DeleteFilled className={'icon-delete'} />
            </a>
          </Popconfirm>
        ) : null,
    },
  ];
  var columnsEdit = [];
  lcValueColumns.forEach((col) => {
    var tempObj = {};
    if (!col.editable) {
      tempObj = col;
    }

    tempObj = {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave: handleSave,
      }),
    };
    columnsEdit.push(tempObj);
  });

  const handleSave = (row) => {
    const newData = [...fullProgressionLc.dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    setFullProgressionLc({
      dataSource: newData,
    });
    setDataTable(newData);
  };
  const handleDelete = (key) => {
    //const dataSource = [...fullProgressionLc.dataSource];
    setState({
      ...state,
      dataSource: dataSource.filter((item) => item.key !== key),
    });
    setDataTable(dataSource.filter((item) => item.key !== key));
  };

  const bankRankColumns = [
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
      title: 'Hạng ngân hàng',
      dataIndex: 'bankRatingId',
      key: 'bankRatingId',
      render: (text, record, index) => (
        <Select
          onChange={(e) => {
            onChangeBankRatingId(e, record.key);
          }}
          style={{ width: '100%' }}
          defaultValue={dataSourceBank[index]?.bankRatingId}
        >
          {bankRatingOptions.map((bankRating, i) => (
            <Option key={i} value={bankRating.id}>
              {bankRating.rating}
            </Option>
          ))}
        </Select>
      ),
    },
    {
      title: 'Số tiền phí',
      dataIndex: 'feeAmount',
      key: 'feeAmount',
      render: (text, record, index) => (
        <Input
          onChange={(e) => {
            onChangeFeeAmount(e, record.key);
          }}
          style={{ width: '100%' }}
          name={'feeAmount'}
          defaultValue={dataSourceBank[index]?.feeAmount}
        />
      ),
    },

    {
      title: 'Thao tác',
      key: 'action',
      render: (_, record) =>
        bankRating.dataSourceBank.length >= 1 ? (
          <Popconfirm
            className="item-center"
            title="Bạn có chắc chắn xóa?"
            onConfirm={() => handleDeleteBank(record.key)}
          >
            <a>
              <DeleteFilled className={'icon-delete'} />
            </a>
          </Popconfirm>
        ) : null,
    },
  ];

  const [dataTable, setDataTable] = useState([]);
  const { dataSource } = fullProgressionLc;
  var columnsEdit = [];
  lcValueColumns.forEach((col) => {
    var tempObj = {};
    if (!col.editable) {
      tempObj = col;
    }
    columnsEdit.push(tempObj);
  });

  //-------- Xử lý liên quan đến xếp hạng ngân hàng
  // const [dataTableBank, setDataTableBank] = useState([]);
  const [bankRating, setBankRating] = useState({
    dataSourceBank: [],
    count: 0,
  });
  const { dataSourceBank } = bankRating;
  var columnsEditBank = [];
  bankRankColumns.forEach((col) => {
    var tempObjBank = {};
    if (!col.editable) {
      tempObjBank = col;
    }
    columnsEditBank.push(tempObjBank);
  });

  const handleAddBank = () => {
    const { count, dataSourceBank } = bankRating;
    console.log('key::', count);
    const newDataBank = {
      stt: count + 1,
      key: count + 1,
      bankRatingId: null,
      feeAmount: null,
    };
    setBankRating({
      dataSourceBank: [...dataSourceBank, newDataBank],
      count: count + 1,
    });

    // setDataTableBank([...dataSourceBank, newDataBank]);
  };

  const handleDeleteBank = (key) => {
    const dataSourceBank = [...bankRating.dataSourceBank];
    setBankRating({
      ...bankRating,
      dataSourceBank: dataSourceBank.filter((item) => item.key !== key),
    });
    // setDataTableBank(dataSourceBank.filter((item) => item.key !== key));
  };

  const onChangeBankRatingId = (e, key) => {
    let dataSourceBank = [...bankRating.dataSourceBank];
    var index = dataSourceBank.findIndex(function (element) {
      return element.key == key;
    });
    dataSourceBank[index].bankRatingId = e;
    setBankRating({
      ...bankRating,
      dataSourceBank: dataSourceBank,
    });
    // setDataTableBank(bankRating?.dataSourceBank);
    console.log('dataSourceBank::: ', dataSourceBank);
    // domain.setUserList(state.dataSource);
  };

  const onChangeFeeAmount = (e, key) => {
    let dataSourceBank = [...bankRating.dataSourceBank];
    var index = dataSourceBank.findIndex(function (element) {
      return element.key == key;
    });
    dataSourceBank[index].feeAmount = e.target.value;
    setBankRating({
      ...bankRating,
      dataSourceBank: dataSourceBank,
    });
    // setDataTableBank(bankRating?.dataSourceBank);

    console.log('dataSourceBank::: ', dataSourceBank);
  };

  //End Xử lý liên quan đến xếp hạng ngân hàng ----------//

  const feeCodeList = useRef();

  useEffect(() => {
    const getFeeBankCode = async () => {
      var configPromise = domain.getFeeBankCode();

      configPromise
        .then((result) => {
          axios(result)
            .then(function (response) {
              console.log(response.data.data);
              var tempList = [];
              response.data.data.forEach((element) => {
                var option = {
                  value: element.feeId,
                  label: element.feeCode + '-' + element.feeName,
                  feeProcedure: element.feeProcedure,
                  feeFrequency: element.feeFrequency,
                };
                tempList.push(option);
              });
              setFeeBankCodeList(tempList);
              feeCodeList.current = tempList;
            })
            .catch(function (error) {
              console.log(error.response.data);
            });
        })
        .catch((err) => console.log('hieutt---' + err));
    };
    const getCurrency = () => {
      var configPromise = domain.getAllCurrency();

      configPromise
        .then((result) => {
          axios(result)
            .then(function (response) {
              console.log(response.data.data);
              var tempList = [];
              response.data.data.forEach((element) => {
                var option = {
                  value: element.currencyId,
                  label: element.currencyCode + '-' + element.currencyName,
                };
                tempList.push(option);
              });
              setFeeRulesCurrencyOptionList(tempList);
            })
            .catch(function (error) {
              console.log(error.response.data);
            });
        })
        .catch((err) => console.log('hieutt---' + err));
    };

    getCurrency();
    getFeeBankCode();
  }, []);

  const feeTransactionCodeList = useRef();
  useEffect(() => {
    const getAllBankFeeTransactionCode = async () => {
      var configPromise = domain.getAllBankFeeTransactionCode();

      configPromise
        .then((result) => {
          axios(result)
            .then(function (response) {
              console.log(response.data.data);
              var tempList = [];
              response.data.data.forEach((element) => {
                if (element.feeTransactionChannel == 'BANK') {
                  var option = {
                    value: element.feeTransactionId,
                    label:
                      element.feeTransactionCode +
                      '-' +
                      element.feeTransactionName,
                  };
                  tempList.push(option);
                }
              });
              setFeeBankTransitionCodeList(tempList);
              feeTransactionCodeList.current = tempList;
            })
            .catch(function (error) {
              console.log(error.response.data);
            });
        })
        .catch((err) => console.log('hieutt---' + err));
    };

    getAllBankFeeTransactionCode();
  }, []);

  useEffect(() => {
    const getAllBankRating = () => {
      var configPromise = domain.getAllBankRating();

      configPromise
        .then((result) => {
          axios(result)
            .then(function (response) {
              console.log('BankRatingOptions::', response.data.data);
              var tempList = response.data.data;
              setBankRatingOptions(tempList);
            })
            .catch(function (error) {
              console.log(error.response.data);
            });
        })
        .catch((err) => console.log('hieutt---' + err));
    };

    getAllBankRating();
  }, []);

  useEffect(() => {
    const getDetailBankFeeRule = async () => {
      var configPromise = domain.getDetailBankFeeRule(id);

      configPromise
        .then((result) => {
          axios(result)
            .then(function (response) {
              console.log('Test get bank fee');
              console.log(response.data.data);
              var element = response.data.data;

              var feeCodeStr = '';
              var feeFrequency = '';
              var feeProcedure = '';
              var feeCodeLength = feeCodeList.current.length;
              for (let index = 0; index < feeCodeLength; index++) {
                var arrItm = feeCodeList.current[index];
                if (element.feeId == arrItm.value) {
                  feeCodeStr = arrItm.label;
                  feeFrequency = arrItm.feeFrequency;
                  feeProcedure = arrItm.feeProcedure;
                }
              }

              if (element.feeRulesBase == 'lc-value') {
                setFeeRulesMethodOptionList(feeRulesMethodLC);
                setFeeRulesRuleOptionList(feeRulesRuleLC);
              } else if (element.feeRulesBase == 'transaction') {
                setFeeRulesMethodOptionList(feeRulesMethodTransaction);
                setFeeRulesRuleOptionList(feeRulesRuleTransaction);
              } else {
                setFeeRulesMethodOptionList([]);
                setFeeRulesRuleOptionList([]);
              }
              var fullProgressionLcList = {};
              var state = {};
              state.dataSource = element.fullProgressionLcList;
              state.count = element.fullProgressionLcList.length;
              setFullProgressionLc(state);
              console.log(state);

              var listFeeRuleBankRating = element.listFeeRuleBankRating;
              var stateBank = {};
              var dataSourceBank = [];
              listFeeRuleBankRating.forEach((feeRuleBankRating, index) => {
                var bankRating = {};
                bankRating.key = index + 1;
                bankRating.id = feeRuleBankRating.id;
                bankRating.feeAmount = feeRuleBankRating.feeAmount;
                bankRating.bankRatingId = feeRuleBankRating.bankRating.id;
                dataSourceBank.push(bankRating);
              });
              stateBank.dataSourceBank = dataSourceBank;
              // stateBank.dataSourceBank = listFeeRuleBankRating;
              stateBank.count = element.listFeeRuleBankRating.length;
              setBankRating(stateBank);
              console.log(stateBank);

              setState({
                dataSource: element.fullProgressionLcList,
                count: element.fullProgressionLcList.length,
              });

              var feeFrequencyStr = '';
              switch (feeFrequency) {
                case 'month':
                  feeFrequencyStr = 'Tháng';
                  break;
                case 'quarter':
                  feeFrequencyStr = 'Quý';
                  break;
                case 'half-year':
                  feeFrequencyStr = 'Nửa năm';
                  break;
                case 'year':
                  feeFrequencyStr = 'Năm';
                  break;
                default:
                  feeFrequencyStr = '';
                  break;
              }

              var feeTransactionCodeStr = '';
              var feeTransactionCodeLength =
                feeTransactionCodeList?.current.length;

              for (let index = 0; index < feeTransactionCodeLength; index++) {
                var arrItm = feeTransactionCodeList.current[index];
                if (element.feeTransactionId == arrItm.value) {
                  feeTransactionCodeStr = arrItm.label;
                }
              }

              form.setFieldsValue({
                feeCode: feeCodeStr,
                feeTransactionCode: feeTransactionCodeStr,
                feeRulesCode: element.feeRulesCode,
                feeRulesName: element.feeRulesName,
                feeProcedure:
                  feeProcedure == 'periodic' ? 'Định kì' : 'Giao dịch',
                feeFrequency: feeFrequencyStr,
                feeRulesBase: element.feeRulesBase,
                feeRulesBaseValue: element.feeRulesBaseValue,
                // feeRulesApplyDateFrom: element.feeRulesApplyDateFrom,
                feeRulesDescription: element.feeRulesDescription,
                feeRulesMethod: element.feeRulesMethod,
                feeRulesRule: element.feeRulesRule,
                feeRulesValue: element.feeRulesValue,
                feeRulesRate: element.feeRulesRate,
                feeRulesMinValue: element.feeRulesMinValue,
                feeRulesMaxValue: element.feeRulesMaxValue,
                feeRulesVat: element.feeRulesVat,
              });

              setChecked(element.feeRulesTaxVat);
              setInput(element);
            })
            .catch(function (error) {
              console.log(error);
            });
        })
        .catch((err) => console.log('hieutt---' + err));
    };

    getDetailBankFeeRule();
  }, [form, id]);

  const feeCodeChange = async (value) => {
    console.log(feeBankCodeOptions[value].value);

    var feeFrequency = '';
    switch (feeBankCodeOptions[value].feeFrequency) {
      case 'month':
        feeFrequency = 'Tháng';
        break;
      case 'quarter':
        feeFrequency = 'Quý';
        break;
      case 'half-year':
        feeFrequency = 'Nửa năm';
        break;
      case 'year':
        feeFrequency = 'Năm';
        break;
      default:
        feeFrequency = '';
        break;
    }
    form.setFieldsValue({
      feeProcedure:
        feeBankCodeOptions[value].feeProcedure == 'periodic'
          ? 'Định kì'
          : 'Giao dịch',
      feeFrequency: feeFrequency,
    });
    setInput({
      ...userInput,
      feeId: feeBankCodeOptions[value].value,
    });
  };

  const feeTransactionCodeChange = async (value) => {
    setInput({
      ...userInput,
      feeTransactionId: value,
    });
  };

  const feeRulesCodeChange = async (event) => {
    setInput({
      ...userInput,
      feeRulesCode: event.target.value.trim(),
    });
  };

  const feeRulesNameChange = async (event) => {
    setInput({
      ...userInput,
      feeRulesName: event.target.value.trim(),
    });
  };

  const feeRuleBaseChange = async (value) => {
    console.log(value);
    if (value == 'lc-value') {
      setFeeRulesMethodOptionList(feeRulesMethodLC);
      setFeeRulesRuleOptionList(feeRulesRuleLC);
    } else if (value == 'transaction') {
      setFeeRulesMethodOptionList(feeRulesMethodTransaction);
      setFeeRulesRuleOptionList(feeRulesRuleTransaction);
    } else {
      setFeeRulesMethodOptionList([]);
      setFeeRulesRuleOptionList([]);
    }
    setInput({
      ...userInput,
      feeRulesBase: value,
      feeRulesMethod: '',
      feeRulesRule: '',
    });

    form.setFieldsValue({
      feeRulesMethod: '',
      feeRulesRule: '',
    });
  };

  const feeRulesBaseValueChange = async (value) => {
    setInput({
      ...userInput,
      feeRulesBaseValue: value,
    });
  };

  function feeRulesApplyDateFromChange(e) {
    setInput({
      ...userInput,
      feeRulesApplyDateFrom: e._d,
    });
  }

  const feeRulesDescriptionChange = async (event) => {
    setInput({
      ...userInput,
      feeRulesDescription: event.target.value,
    });
  };
  const feeRuleMethodChange = async (value) => {
    console.log(value);
    if (value == 'fee-free') {
      setInput({
        ...userInput,
        feeRulesRule: '',
      });
    }
    setInput({
      ...userInput,
      feeRulesMethod: value,
    });
  };

  const feeRuleRuleChange = async (value) => {
    setInput({
      ...userInput,
      feeRulesRule: value,
    });
  };

  const feeRulesValueChange = async (event) => {
    setInput({
      ...userInput,
      feeRulesValue: event.target.value,
    });
  };

  const feeRulesRateChange = async (event) => {
    setInput({
      ...userInput,
      feeRulesRate: event.target.value,
    });
  };

  const feeRulesMinValueChange = async (event) => {
    setInput({
      ...userInput,
      feeRulesMinValue: event.target.value,
    });
  };

  const feeRulesMaxValueChange = async (event) => {
    setInput({
      ...userInput,
      feeRulesMaxValue: event.target.value,
    });
  };
  // e.target.checked

  const feeRulesTaxVatChange = async (event) => {
    setChecked(event.target.checked);
    setInput({
      ...userInput,
      feeRulesTaxVat: event.target.checked,
    });
  };

  const feeRulesVatChange = async (event) => {
    setInput({
      ...userInput,
      feeRulesVat: event.target.value,
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  // Add new user group--------------
  const submitHandler = () => {
    console.log('dataTableBank:::', bankRating?.dataSourceBank);
    var data = {
      feeRulesId: id,
      feeId: userInput.feeId,
      feeTransactionId: userInput.feeTransactionId,
      feeRulesCode: userInput.feeRulesCode,
      feeRulesName: userInput.feeRulesName,
      feeRulesBase: userInput.feeRulesBase,
      feeRulesBaseValue: userInput.feeRulesBaseValue,
      feeRulesCurrency: userInput.feeRulesCurrency,
      feeRulesDescription: userInput.feeRulesDescription,
      feeRulesMaxValue: userInput.feeRulesMaxValue,
      feeRulesMethod: userInput.feeRulesMethod,
      feeRulesMinValue: userInput.feeRulesMinValue,
      feeRulesRate: userInput.feeRulesRate,
      feeRulesRule: userInput.feeRulesRule,
      feeRulesTaxVat: userInput.feeRulesTaxVat,
      feeRulesValue: userInput.feeRulesValue,
      feeRulesVat: userInput.feeRulesVat,
      feeStatus: userInput.feeStatus,
      feeRulesApplyDateFrom: userInput.feeRulesApplyDateFrom,
      feeRulesApplyDateTo: userInput.feeRulesApplyDateTo,
      fullProgressionLcList: dataTable,
      listFeeRuleBankRating: bankRating?.dataSourceBank,
    };

    console.log('Received values of form: ', data);

    var configPromise = domain.editBankFeeRule(data);
    configPromise
      .then((result) => {
        axios(result)
          .then(function (response) {
            if (response?.data?.success == true) {
              setShowSuccessfull(true);
            } else {
              message.error(response?.data?.message);
              setShowFailed(true);
            }
          })
          .catch(function (error) {
            console.log(error?.response?.data);
            // if (error.response.data.data == 'Create UserGroup already exist') {
            //   console.log('Trùng mã nhóm người dùng');
            //   // setShowExistedGroup(true);
            // }
          });
      })
      .catch((err) => console.log('hieutt---' + err));
  };
  //-------------------------------------//

  function closeCreateSuccessfullModal() {
    setShowSuccessfull(false);
    history.push('/home/fee-bank-rule');
  }

  function closeCreateFailedModal() {
    setShowFailed(false);
  }

  return (
    <>
      <UpdateSuccessfullModal
        isVisbled={showSuccessfull}
        onCloseModal={closeCreateSuccessfullModal}
        onClose={closeCreateSuccessfullModal}
      />
      <UpdateFailedModal
        isVisbled={showFailed}
        onCloseModal={closeCreateFailedModal}
        onClose={closeCreateFailedModal}
      />

      <div className={'main-container'}>
        <Row className={'padding-title'}>
          <Col span={24}>
            <KTTitle size={3}>
              <b>Quy tắc tính phí ngân hàng</b>
            </KTTitle>
          </Col>
        </Row>
        <Row className={'padding-title-sub'}>
          <Col span={24}>
            <KTTitle size={4}>Sửa thông tin</KTTitle>
          </Col>
        </Row>
        <Row className="padding-md">
          <Col span={24}>
            <Form
              form={form}
              onFinish={submitHandler}
              onFinishFailed={onFinishFailed}
              layout="horizontal"
            >
              <Row className={'padding-title-sub2'}>
                <Col span={24}>
                  <KTTitle size={3}>
                    <b>Thông tin chung</b>
                  </KTTitle>
                </Col>
              </Row>
              <Row>
                {' '}
                <Col span={8}>
                  Mã loại phí <span className={'text-require'}>*</span>
                </Col>
                <Col span={16}>
                  <Form.Item
                    name={'feeCode'}
                    rules={[
                      {
                        required: true,
                        message: 'Trường mã loại phí không được phép để trống!',
                      },
                    ]}
                  >
                    <Select
                      disabled
                      value={userInput.feeId}
                      onChange={feeCodeChange}
                    >
                      {feeBankCodeOptions.map((option, index) => (
                        <Select.Option value={index}>
                          {option.label}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={8}>
                  Mã giao dịch tính phí{' '}
                  <span className={'text-require'}>*</span>
                </Col>
                <Col span={16}>
                  <Form.Item
                    name={'feeTransactionCode'}
                    rules={[
                      {
                        required: true,
                        message:
                          'Trường mã giao dịch tính phí không được phép để trống!',
                      },
                    ]}
                  >
                    <Select disabled onChange={feeTransactionCodeChange}>
                      {feeBankTransitionCodeOptions.map((option) => (
                        <Select.Option value={option.value}>
                          {option.label}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={8}>
                  Mã phí<span className={'text-require'}>*</span>
                </Col>
                <Col span={16}>
                  <Form.Item name={'feeRulesCode'}>
                    <Input
                      disabled
                      onChange={feeRulesCodeChange}
                      name={'feeRulesCode'}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={8}>
                  Tên phí <span className={'text-require'}>*</span>
                </Col>
                <Col span={16}>
                  <Form.Item name={'feeRulesName'}>
                    <Input
                      onChange={feeRulesNameChange}
                      name={'feeRulesName'}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={8}>
                  Phương thức tính phí <span className={'text-require'}>*</span>
                </Col>
                <Col span={16}>
                  <Form.Item name={'feeProcedure'}>
                    <Input name={'feeProcedure'} disabled />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={8}>
                  Tần suất tính <span className={'text-require'}>*</span>
                </Col>
                <Col span={16}>
                  <Form.Item name={'feeFrequency'}>
                    <Input disabled name={'feeFrequency'} />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={8}>
                  Căn cứ tính phí <span className={'text-require'}>*</span>
                </Col>
                <Col span={16}>
                  <Form.Item name={'feeRulesBase'}>
                    <Select onChange={feeRuleBaseChange}>
                      {feeRulesBaseOptions.map((option) => (
                        <Select.Option value={option.value}>
                          {option.label}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={8}>
                  Loại tiền tệ<span className={'text-require'}>*</span>
                </Col>
                <Col span={16}>
                  <Form.Item name={'feeRulesBaseValue'}>
                    <Select onChange={feeRulesBaseValueChange}>
                      {feeRulesCurrencyOptions.map((option) => (
                        <Select.Option value={option.value}>
                          {option.label}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={8}>
                  Ngày hiệu lực <span className={'text-require'}>*</span>
                </Col>
                <Col span={16}>
                  <Form.Item name={'feeRulesApplyDateFrom'}>
                    <DatePicker
                      name="feeRulesApplyDateFrom"
                      className={'width-date-picker'}
                      // defaultValue={moment('01/01/2015')}
                      format={dateFormatList}
                      placeholder="Chọn ngày hiệu lực"
                      onChange={feeRulesApplyDateFromChange}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={8}>
                  Mô tả <span className={'text-require'}>*</span>
                </Col>
                <Col span={16}>
                  <Form.Item name={'feeRulesDescription'}>
                    <Input
                      name={'feeRulesDescription'}
                      onChange={feeRulesDescriptionChange}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <div
                style={{
                  display:
                    userInput.feeRulesBase == 'bank-ranking' ||
                    userInput.feeRulesBase == ''
                      ? 'none'
                      : 'block',
                }}
              >
                <Row className={'padding-title-sub2'}>
                  <Col span={24}>
                    <KTTitle size={3}>
                      <b>Quy tắc tính phí theo giao dịch và giá trị L/c</b>
                    </KTTitle>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    Phương pháp tính <span className={'text-require'}>*</span>
                  </Col>
                  <Col span={16}>
                    <Form.Item name={'feeRulesMethod'}>
                      <Select
                        onChange={feeRuleMethodChange}
                        defaultValue={
                          feeRulesMethodOptions.length > 0
                            ? feeRulesMethodOptions[0].value
                            : ''
                        }
                      >
                        {feeRulesMethodOptions.map((option) => (
                          <Select.Option value={option.value}>
                            {option.label}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    Quy tắc tính phí <span className={'text-require'}></span>
                  </Col>
                  <Col span={16}>
                    <Form.Item name={'feeRulesRule'}>
                      <Select
                        disabled={
                          userInput.feeRulesMethod == 'fee-free' ||
                          userInput.feeRulesMethod == ''
                            ? true
                            : false
                        }
                        onChange={feeRuleRuleChange}
                      >
                        {feeRulesRuleOptions.map((option) => (
                          <Select.Option value={option.value}>
                            {option.label}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                <Row
                  style={{
                    display:
                      userInput.feeRulesMethod == 'fixed-fee' &&
                      userInput.feeRulesRule == 'fee-amount'
                        ? 'flex'
                        : 'none',
                  }}
                >
                  <Col span={8}>
                    Số tiền phí <span className={'text-require'}></span>
                  </Col>
                  <Col span={16}>
                    <Form.Item name={'feeRulesValue'}>
                      <Input
                        type={'number'}
                        onKeyDown={(e) =>
                          exceptThisSymbols.includes(e.key) &&
                          e.preventDefault()
                        }
                        onChange={feeRulesValueChange}
                        name={'feeRulesValue'}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row
                  style={{
                    display:
                      userInput.feeRulesMethod == 'fixed-fee' &&
                      userInput.feeRulesRule == 'percent-rate'
                        ? 'flex'
                        : 'none',
                  }}
                >
                  <Col span={8}>
                    Tỷ lệ phí (%) <span className={'text-require'}>*</span>
                  </Col>
                  <Col span={16}>
                    <Form.Item
                      onChange={feeRulesRateChange}
                      name={'feeRulesRate'}
                    >
                      <Input
                        disabled
                        type={'number'}
                        onKeyDown={(e) =>
                          exceptThisSymbols.includes(e.key) &&
                          e.preventDefault()
                        }
                        name={'feeRulesRate'}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row
                  style={{
                    display:
                      userInput.feeRulesMethod == 'fixed-fee' &&
                      userInput.feeRulesRule == 'percent-rate'
                        ? 'flex'
                        : 'none',
                  }}
                >
                  <Col span={8}>
                    Số tiền tối thiểu <span className={'text-require'}></span>
                  </Col>
                  <Col span={16}>
                    <Form.Item name={'feeRulesMinValue'}>
                      <Input
                        type={'number'}
                        onKeyDown={(e) =>
                          exceptThisSymbols.includes(e.key) &&
                          e.preventDefault()
                        }
                        onChange={feeRulesMinValueChange}
                        name={'feeRulesMinValue'}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row
                  style={{
                    display:
                      userInput.feeRulesMethod == 'fixed-fee' &&
                      userInput.feeRulesRule == 'percent-rate'
                        ? 'flex'
                        : 'none',
                  }}
                >
                  <Col span={8}>
                    Số tiền tối đa <span className={'text-require'}></span>
                  </Col>
                  <Col span={16}>
                    <Form.Item name={'feeRulesMaxValue'}>
                      <Input
                        type={'number'}
                        onKeyDown={(e) =>
                          exceptThisSymbols.includes(e.key) &&
                          e.preventDefault()
                        }
                        onChange={feeRulesMaxValueChange}
                        name={'feeRulesMaxValue'}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    Tính thuế GTGT (VAT){' '}
                    <span className={'text-require'}>*</span>
                  </Col>
                  <Col span={16}>
                    <Form.Item name={'feeRulesTaxVat'}>
                      <Checkbox
                        onChange={feeRulesTaxVatChange}
                        disabled={
                          userInput.feeRulesMethod == 'fee-free' ||
                          userInput.feeRulesMethod == ''
                            ? true
                            : false
                        }
                        checked={checked}
                      >
                        Có
                      </Checkbox>
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    % VAT <span className={'text-require'}>*</span>
                  </Col>
                  <Col span={16}>
                    <Form.Item name={'feeRulesVat'}>
                      <Input
                        onChange={feeRulesVatChange}
                        type={'number'}
                        onKeyDown={(e) =>
                          exceptThisSymbols.includes(e.key) &&
                          e.preventDefault()
                        }
                        name={'feeRulesVat'}
                        disabled={
                          userInput.feeRulesTaxVat == false ? true : false
                        }
                        // disabled
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </div>

              <div
                style={{
                  display:
                    userInput.feeRulesBase == 'lc-value' &&
                    userInput.feeRulesMethod == 'full-progressive-fee'
                      ? 'block'
                      : 'none',
                }}
              >
                <Row className={'padding-title-sub2'}>
                  <Col span={24}>
                    <KTTitle size={3}>
                      <b>Lũy tiến toàn phần theo giá trị L/C</b>
                    </KTTitle>
                  </Col>
                </Row>
                {/* <Row className="padding-md">
                  <Col span={24}>
                    <Row className={'padding-title-sub2'}>
                      <Col span={24}>
                        <KTTitle size={3}></KTTitle>
                      </Col>
                    </Row>
                    <Row className={'marginR-md'}>
                      <Button className="common-btn">Thêm mới</Button>
                    </Row>
                  </Col>
                </Row> */}
                {/* <Row>
                  <Col span={24}>
                    <Table
                      columns={lcValueColumns}
                      dataSource={ state.fullProgressionLc }
                      pagination={{ pageSize: 10 }}
                    />
                  </Col>
                </Row> */}
                <Row>
                  <Form component={false}>
                    <Col span={24}>
                      <Button
                        onClick={handleAdd}
                        type="primary"
                        style={{ marginBottom: 16, float: 'right' }}
                      >
                        Thêm dòng +
                      </Button>
                      <Table
                        columns={columnsEdit}
                        components={components}
                        rowClassName={() => 'editable-row'}
                        bordered
                        dataSource={state.dataSource}
                        pagination={{ pageSize: 10 }}
                      />
                    </Col>
                  </Form>
                </Row>
              </div>

              <div
                style={{
                  display:
                    userInput.feeRulesBase == 'bank-ranking' ? 'block' : 'none',
                }}
              >
                <Row className={'padding-title-sub2'}>
                  <Col span={24}>
                    <KTTitle size={3}>
                      <b>Xếp hạng ngân hàng</b>
                    </KTTitle>
                  </Col>
                </Row>
                {/* <Row className="padding-md">
                  <Col span={24}>
                    <Row className={'padding-title-sub2'}>
                      <Col span={24}>
                        <KTTitle size={3}></KTTitle>
                      </Col>
                    </Row>
                    <Row className={'marginR-md'}>
                      <Button className="common-btn">Thêm mới</Button>
                    </Row> 
                  </Col>
                </Row> */}

                <Row>
                  <Form component={false}>
                    <Col span={24}>
                      <Button
                        onClick={handleAddBank}
                        type="primary"
                        style={{ marginBottom: 16, float: 'right' }}
                      >
                        Thêm dòng +
                      </Button>
                      <Table
                        // components={componentsBank}
                        rowClassName={() => 'editable-row'}
                        bordered
                        dataSource={dataSourceBank}
                        columns={bankRankColumns}
                      />
                    </Col>
                  </Form>
                </Row>
                {/* <Row>
                  <Col span={24}>
                    <Table
                      columns={bankRankColumns}
                      dataSource={[]}
                      pagination={{ pageSize: 10 }}
                    />
                  </Col>
                </Row> */}
              </div>

              <div id="form-footer">
                <Form.Item>
                  <Space className={'padding-buton'}>
                    <Button className="common-btn" htmlType="submit">
                      Xác nhận
                    </Button>
                    <Button
                      onClick={(e) => domain.exitHandler(id)}
                      className="secondary-btn"
                    >
                      Đóng
                    </Button>
                  </Space>
                </Form.Item>
              </div>
              <Col span={2}></Col>
            </Form>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default AM030102Add;
