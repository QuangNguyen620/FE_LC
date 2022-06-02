import React, { useContext, useState, useEffect, useRef } from 'react';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import {
  Col,
  Row,
  Form,
  Popconfirm,
  Select,
  Input,
  Button,
  Space,
  DatePicker,
  Checkbox,
  Table,
  message,
  InputNumber,
} from 'antd';
import { KTTitle } from 'core/ui';
import '../../../components/less/AM.02.13.less';
import { useA00Domain } from '../domains/AM.03.01.02Domain';
import { useHistory } from 'react-router';
import CreateFeeRuleSuccessfull from '../../../components/modal/add/modal/CreateSuccessfullModal';
import CreateFeeRuleFailed from '../../../components/modal/add/modal/CreateFailedModal';
import FeeRuleCodeExisted from '../../../components/modal/add/modal/DataExistedModal';
import { rules } from 'eslint-config-prettier';
import { DeleteFilled } from '@ant-design/icons';
import { ErrorsCode } from 'core/utils/constants';
import { disabledDateSmall } from 'core/utils/functions';

var axios = require('axios');

const { Option } = Select;

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

const feeRulesCurrencyList = [{ value: 'VND', label: 'VND' }];

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
  { value: 'fee-amount', label: 'Số tiền phí' },
];

const feeRulesRuleTransaction = [{ value: 'fee-amount', label: 'Số tiền phí' }];

const feeRulesMethodBankRanking = [
  { value: 'fixed-fee', label: 'Phí cố định' },
];

const feeRulesRuleBankRanking = [{ value: 'fee-amount', label: 'Số tiền phí' }];

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
  inputType,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
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
            message: ` Trường ${title} không được để trống.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
        {/* {inputNode} */}
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

const AM030102Add = ({ lang = 'vi', ...props }) => {
  const { t } = useTranslation();
  const [, domain] = useA00Domain();
  const history = useHistory();
  const dateFormatList = 'DD/MM/YYYY';
  const [form] = Form.useForm();
  const stats = '';
  const exceptThisSymbols = ['e', 'E', '+', '-', '.'];

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
  //Value state
  const [userInput, setInput] = useState({
    feeRulesId: 0,
    feeId: 0,
    feeTransactionId: 0,
    feeRulesCode: '',
    feeRulesName: '',
    feeRulesBase: '',
    feeRulesBaseValue: 'VND',
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

  const [fullProgressionLc, setFullProgressionLc] = useState({
    dataSource: [],
    count: 0,
  });
  const { dataSource } = fullProgressionLc;
  const [dataTable, setDataTable] = useState([]);

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

  const [applyDateFrom, setApplyDateFrom] = useState('');

  const [bankRatingOptions, setBankRatingOptions] = useState([]);
  //------------------------------//

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
      dataIndex: 'feeMinValue',
      key: 'feeMinValue',
      editable: true,
    },

    {
      title: 'Số tiền tối đa',
      dataIndex: 'feeMaxValue',
      key: 'feeMaxValue',
      editable: true,
    },
    {
      title: 'Tác vụ',
      dataIndex: 'operation',
      render: (_, record) =>
        fullProgressionLc.dataSource.length >= 1 ? (
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

  const handleDelete = (key) => {
    const dataSource = [...fullProgressionLc.dataSource];
    setFullProgressionLc({
      ...fullProgressionLc,
      dataSource: dataSource.filter((item) => item.key !== key),
    });
    setDataTable(dataSource.filter((item) => item.key !== key));
  };

  // các xử lý liên quan table product
  const [form1] = Form.useForm();

  const handleAdd = () => {
    const { count, dataSource } = fullProgressionLc;
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
    setFullProgressionLc({
      dataSource: [...dataSource, newData],
      count: count + 1,
    });

    setDataTable([...dataSource, newData]);
  };

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

  // render table edit
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
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
        // inputType: col.dataIndex === 'age' ? 'number' : 'text',

        handleSave: handleSave,
      }),
    };
    columnsEdit.push(tempObj);
  });

  // các xử lý liên quan table bankRank
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
      editable: true,
      render: (text, record, index) => (
        <Select
          onChange={(e) => {
            onChangeBankRatingId(e, record.key);
          }}
          style={{ width: '100%' }}
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
      editable: true,
      render: (text, record, index) => (
        <Input
          onChange={(e) => {
            onChangeFeeAmount(e, record.key);
          }}
          style={{ width: '100%' }}
          name={'feeAmount'}
          placeholder="Nhập thông tin"
        />
      ),
    },
    {
      title: 'Tác vụ',
      dataIndex: 'operation',
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
  const [bankRating, setBankRating] = useState({
    dataSourceBank: [],
    count: 0,
  });
  const { dataSourceBank } = bankRating;
  const [dataTableBank, setDataTableBank] = useState([]);

  const [dateFrom, setDateFrom] = useState(new Date());

  const [titleFeeRuleBase, setTitleFeeRuleBase] = useState('');

  const handleDeleteBank = (key) => {
    const dataSourceBank = [...bankRating.dataSourceBank];
    setBankRating({
      ...bankRating,
      dataSourceBank: dataSourceBank.filter((item) => item.key !== key),
    });
    setDataTableBank(dataSourceBank.filter((item) => item.key !== key));
  };

  const [formBank] = Form.useForm();

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

    setDataTableBank([...dataSourceBank, newDataBank]);
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
    setDataTableBank(bankRating?.dataSourceBank);
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
    setDataTableBank(bankRating?.dataSourceBank);

    console.log('dataSourceBank::: ', dataSourceBank);
  };
  // const handleSaveBank = (row) => {
  //   const newData = [...bankRating.dataSourceBank];
  //   const index = newData.findIndex((item) => row.key === item.key);
  //   const item = newData[index];
  //   newData.splice(index, 1, { ...item, ...row });
  //   setBankRating({
  //     dataSourceBank: newData,
  //   });
  //   setDataTableBank(newData);
  // };

  // const componentsBank = {
  //   body: {
  //     row: EditableRow,
  //     cell: EditableCell,
  //   },
  // };

  // var columnsEditBank = [];
  // bankRankColumns.forEach((col) => {
  //   var tempObj = {};
  //   if (!col.editable) {
  //     tempObj = col;
  //   }

  //   tempObj = {
  //     ...col,
  //     onCell: (record) => ({
  //       record,
  //       editable: col.editable,
  //       dataIndex: col.dataIndex,
  //       title: col.title,
  //       handleSave: handleSaveBank,
  //     }),
  //   };
  //   columnsEditBank.push(tempObj);
  // });
  // end edit table bank rating

  useEffect(() => {
    const getFeeBankCode = () => {
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

    getFeeBankCode();

    getCurrency();
  }, []);

  useEffect(() => {
    const getAllBankFeeTransactionCode = () => {
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
              console.log(response.data.data);
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

    let newDate = new Date();
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    let dateValue = convert(newDate);

    if (feeBankCodeOptions[value].feeProcedure === 'periodic') {
      if (feeBankCodeOptions[value].feeFrequency == 'month') {
        dateValue = '';
        dateValue += '01';
        console.log(dateValue);
        dateValue += '/';
        if (month + 1 >= 10) {
          dateValue += month + 1;
          dateValue += '/';
          if (month + 1 == 12) {
            dateValue += year + 1;
          } else {
            dateValue += year;
          }
        } else {
          dateValue += '0';
          dateValue += month + 1;
          dateValue += '/';
          dateValue += year;
        }
      } else if (feeBankCodeOptions[value].feeFrequency == 'quarter') {
        dateValue = '';
        dateValue += '01';
        dateValue += '/';
        if (month <= 3) {
          dateValue += '04';
          dateValue += '/';
          dateValue += year;
        } else if (month <= 6) {
          dateValue += '07';
          dateValue += '/';
          dateValue += year;
          console.log(dateValue);
        } else if (month <= 9) {
          dateValue += '10';
          dateValue += '/';
          dateValue += year;
        } else if (month >= 10) {
          dateValue += '01';
          dateValue += '/';
          dateValue += year + 1;
        }
      } else if (feeBankCodeOptions[value].feeFrequency == 'half-year') {
        dateValue = '';
        dateValue += '01';
        dateValue += '/';
        if (month <= 6) {
          dateValue += '07';
          dateValue += '/';
          dateValue += year;
        } else {
          dateValue += '01';
          dateValue += '/';
          dateValue += year + 1;
        }
      } else if (feeBankCodeOptions[value].feeFrequency == 'year') {
        dateValue = '';
        dateValue += '01';
        dateValue += '/';
        dateValue += '01';
        dateValue += '/';
        dateValue += year + 1;
      }
    }

    console.log('DATE: ' + dateValue);
    form.setFieldsValue({
      feeRulesApplyDateFrom: moment(dateValue, dateFormatList),
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
    } else if (value == 'bank-ranking') {
      setFeeRulesMethodOptionList(feeRulesMethodBankRanking);
      setFeeRulesRuleOptionList(feeRulesRuleBankRanking);
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
    if (value == 'bank-ranking') {
      setTitleFeeRuleBase('Quy tắc tính phí theo xếp hạng ngân hàng');
    } else {
      setTitleFeeRuleBase('Quy tắc tính phí theo giao dịch và giá trị L/c');
    }
  };

  const feeRulesBaseValueChange = async (value) => {
    setInput({
      ...userInput,
      feeRulesBaseValue: value,
    });
  };

  function feeRulesApplyDateFromChange(e) {
    console.log(e);
    // console.log(feeProcedure)
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
      feeRulesRule: value,
      feeRulesValue: '',
      feeRulesMinValue: '',
      feeRulesMaxValue: '',
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
    console.log(event);
    // var number = parseInt(event.target.value, 10 );
    // console.log(number);
    // if(number > 100){
    //   console.log("Trường tỷ lệ phí là số và phải < 100")
    // }
    // else {
    setInput({
      ...userInput,
      feeRulesRate: event,
    });
    // }
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
    setInput({
      ...userInput,
      feeRulesTaxVat: event.target.checked,
    });
  };

  const feeRulesVatChange = async (value) => {
    setInput({
      ...userInput,
      feeRulesVat: value,
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  // Add new user group--------------
  const submitHandler = () => {
    var data = {
      feeRulesId: 0,
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
      listFeeRuleBankRating: dataTableBank,
    };

    console.log('Received values of form: ', data);

    var configPromise = domain.addNewBankFeeRule(data);
    configPromise
      .then((result) => {
        axios(result)
          .then(function (response) {
            if (response?.data?.success == true) {
              setShowSuccessfull(true);
            } else if (
              response.data.code == ErrorsCode.FEE_RULE_CODE_DUPLICATE
            ) {
              message.error(response.data.message);
            } else {
              message.error(response?.data?.message);
              // setShowFailed(true);
            }
          })
          .catch(function (error) {
            console.log(error.response.data);
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

  function closeExistedModal() {
    setShowExisted(false);
  }

  return (
    <>
      <CreateFeeRuleSuccessfull
        isVisbled={showSuccessfull}
        onCloseModal={closeCreateSuccessfullModal}
        onClose={closeCreateSuccessfullModal}
      />
      <CreateFeeRuleFailed
        isVisbled={showFailed}
        onCloseModal={closeCreateFailedModal}
        onClose={closeCreateFailedModal}
      />
      <FeeRuleCodeExisted
        isVisbled={showExisted}
        onCloseModal={closeExistedModal}
        onClose={closeExistedModal}
      />
      <div className={'main-container'}>
        <Row className={'padding-title'}>
          <Col span={24}>
            <KTTitle size={3}>
              <b>Quy tắc tính phí ngân hàng</b>
            </KTTitle>
          </Col>
        </Row>
        {/* <Row className={'padding-title-sub'}>
          <Col span={24}>
            <KTTitle size={4}>Thêm mới</KTTitle>
          </Col>
        </Row> */}
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
                    <Select onChange={feeCodeChange}>
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
                    <Select onChange={feeTransactionCodeChange}>
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
                  <Form.Item
                    name={'feeRulesCode'}
                    rules={[
                      {
                        required: true,
                        message: 'Trường mã phí không được phép để trống!',
                      },
                      {
                        whitespace: true,
                        message: 'Trường mã phí không được phép để trống!',
                      },
                      {
                        max: 30,
                        message:
                          'Trường mã phí không được phép vượt qua 30 ký tự!',
                      },
                    ]}
                  >
                    <Input
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
                  <Form.Item
                    name={'feeRulesName'}
                    rules={[
                      {
                        required: true,
                        message: 'Trường tên phí không được phép để trống!',
                      },
                      {
                        whitespace: true,
                        message: 'Trường tên phí không được phép để trống!',
                      },
                      {
                        max: 300,
                        message:
                          'Trường tên phí không được phép vượt qua 300 ký tự!',
                      },
                    ]}
                  >
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
                  <Form.Item
                    name={'feeRulesBase'}
                    rules={[
                      {
                        required: true,
                        message:
                          'Trường căn cứ tính phí không được phép để trống!',
                      },
                      {
                        whitespace: true,
                        message:
                          'Trường căn cứ tính phí không được phép để trống!',
                      },
                    ]}
                  >
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
                    <Select
                      defaultValue={userInput.feeRulesBaseValue}
                      onChange={feeRulesBaseValueChange}
                    >
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
                      format={dateFormatList}
                      placeholder="Chọn ngày hiệu lực"
                      onChange={feeRulesApplyDateFromChange}
                      disabledDate={
                        form.feeProcedure == 'periodic'
                          ? false
                          : disabledDateSmall
                      }
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={8}>
                  Mô tả <span style={{ color: '#F5222D' }}></span>
                </Col>
                <Col span={16}>
                  <Form.Item
                    name={'feeRulesDescription'}
                    rules={[
                      {
                        max: 300,
                        message:
                          'Trường mô tả không được phép vượt qua 300 ký tự!',
                      },
                    ]}
                  >
                    <Input
                      name={'feeRulesDescription'}
                      onChange={feeRulesDescriptionChange}
                    />
                  </Form.Item>
                </Col>
              </Row>
              {/* Điều kiện hiển thị chung */}
              <div
                style={{
                  display: userInput.feeRulesBase == '' ? 'none' : 'block',
                }}
              >
                {/* Quy tắc tính phí */}
                <Row style={{ paddingBottom: 10 }}>
                  <Col span={24}>
                    <KTTitle size={3}>
                      <b>{titleFeeRuleBase}</b>
                    </KTTitle>
                  </Col>
                </Row>

                {/* Phương pháp tính phí */}
                <Row>
                  <Col span={8}>
                    Phương pháp tính <span className={'text-require'}>*</span>
                  </Col>
                  <Col span={16}>
                    <Form.Item
                      name={'feeRulesMethod'}
                      rules={[
                        {
                          required: true,
                          message:
                            'Trường phương pháp tính không được phép để trống!',
                        },
                        {
                          whitespace: true,
                          message:
                            'Trường phương pháp tính không được phép để trống!',
                        },
                      ]}
                    >
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

                {/* Quy tắc tính phí */}
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

                {/* Số tiền phí */}
                <Row
                  style={{
                    display:
                      userInput.feeRulesBase == 'bank-ranking'
                        ? 'none'
                        : 'flex',
                  }}
                >
                  <Col span={8}>
                    Số tiền phí <span style={{ color: '#F5222D' }}>*</span>
                  </Col>
                  <Col span={16}>
                    <Form.Item
                      name={'feeRuleValue'}
                      rules={[
                        {
                          required:
                            userInput.feeRulesMethod == 'fixed-fee' &&
                            userInput.feeRulesRule == 'fee-amount'
                              ? true
                              : false,
                          message: 'Trường số tiền phí không được để trống!',
                        },
                      ]}
                    >
                      <InputNumber
                        style={{ width: '100%' }}
                        min={0}
                        name={'feeRuleValue'}
                        disabled={
                          userInput.feeRulesBase == 'transaction' &&
                          userInput.feeRulesMethod == 'fixed-fee' &&
                          userInput.feeRulesRule == 'fee-amount'
                            ? false
                            : true
                        }
                      />
                    </Form.Item>
                  </Col>
                </Row>

                {/* Tỷ lệ phí */}
                <Row
                  style={{
                    display:
                      userInput.feeRulesBase == 'bank-ranking'
                        ? 'none'
                        : 'flex',
                  }}
                >
                  <Col span={8}>
                    Tỷ lệ phí (%) <span style={{ color: '#F5222D' }}>*</span>
                  </Col>
                  <Col span={16}>
                    <Form.Item
                      onChange={feeRulesRateChange}
                      name={'feeRulesRate'}
                      rules={[
                        {
                          required:
                            userInput.feeRulesMethod == 'fixed-fee' &&
                            userInput.feeRulesBase == 'lc-value'
                              ? true
                              : false,
                          message: 'Trường tỷ lệ phí không được để trống!',
                        },
                      ]}
                    >
                      <InputNumber
                        style={{ width: '100%' }}
                        min={1}
                        max={100}
                        name={'feeRulesRate'}
                        disabled={
                          userInput.feeRulesBase == 'lc-value' &&
                          userInput.feeRulesMethod == 'fixed-fee' &&
                          userInput.feeRulesRule == 'percent-rate'
                            ? false
                            : true
                        }
                        onChange={feeRulesRateChange}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                {/* Số tiền tối thiểu */}
                <Row
                  style={{
                    display:
                      userInput.feeRulesBase == 'bank-ranking'
                        ? 'none'
                        : 'flex',
                  }}
                >
                  <Col span={8}>
                    Số tiền tối thiểu{' '}
                    <span style={{ color: '#F5222D' }}>*</span>
                  </Col>
                  <Col span={16}>
                    <Form.Item
                      name={'feeRulesMinValue'}
                      rules={[
                        {
                          required:
                            userInput.feeRulesMethod == 'fixed-fee' &&
                            userInput.feeRulesBase == 'lc-value'
                              ? true
                              : false,
                          message:
                            'Trường số tiền tối thiểu không được để trống!',
                        },
                      ]}
                    >
                      <InputNumber
                        style={{ width: '100%' }}
                        min={1}
                        name={'feeRulesMinValue'}
                        disabled={
                          userInput.feeRulesBase == 'lc-value' &&
                          userInput.feeRulesMethod == 'fixed-fee' &&
                          userInput.feeRulesRule == 'percent-rate'
                            ? false
                            : true
                        }
                      />
                    </Form.Item>
                  </Col>
                </Row>

                {/* Số tiền tối đa */}
                <Row
                  style={{
                    display:
                      userInput.feeRulesBase == 'bank-ranking'
                        ? 'none'
                        : 'flex',
                  }}
                >
                  <Col span={8}>
                    Số tiền tối đa <span style={{ color: '#F5222D' }}></span>
                  </Col>
                  <Col span={16}>
                    <Form.Item
                      name={'feeRulesMaxValue'}
                      rules={[
                        {
                          validator: async (_, feeRulesMaxValue) => {
                            var feeRulesMinValue =
                              form.getFieldValue('feeRulesMinValue');
                            if (feeRulesMinValue != null) {
                              if (feeRulesMaxValue < feeRulesMinValue) {
                                return Promise.reject(
                                  'Số tiền tối đa không thể nhỏ hơn số tiền tối thiểu.',
                                );
                              }
                            }
                          },
                        },
                        {
                          required:
                            userInput.feeRulesMethod == 'fixed-fee' &&
                            userInput.feeRulesBase == 'lc-value'
                              ? true
                              : false,
                          message: 'Trường số tiền tối đa không được để trống!',
                        },
                      ]}
                    >
                      <InputNumber
                        style={{ width: '100%' }}
                        min={stats}
                        name={'feeRulesMaxValue'}
                        disabled={
                          userInput.feeRulesBase == 'lc-value' &&
                          userInput.feeRulesMethod == 'fixed-fee' &&
                          userInput.feeRulesRule == 'percent-rate'
                            ? false
                            : true
                        }
                      />
                    </Form.Item>
                  </Col>
                </Row>

                {/* Tính thuế VAT */}
                <Row>
                  <Col span={8}>
                    Tính thuế GTGT (VAT){' '}
                    <span style={{ color: '#F5222D' }}></span>
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
                      >
                        Có
                      </Checkbox>
                    </Form.Item>
                  </Col>
                </Row>

                {/* %VAT */}
                <Row>
                  <Col span={8}>
                    % VAT <span style={{ color: '#F5222D' }}></span>
                  </Col>
                  <Col span={16}>
                    <Form.Item name={'feeRulesVat'}>
                      <InputNumber
                        onChange={feeRulesVatChange}
                        // type={'number'}
                        onKeyDown={(e) =>
                          exceptThisSymbols.includes(e.key) &&
                          e.preventDefault()
                        }
                        name={'feeRulesVat'}
                        disabled={
                          userInput.feeRulesTaxVat == false ? true : false
                        }
                        max={100}
                        min={0}
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
                <Row className="padding-md">
                  <Col span={24}>
                    <Row className={'padding-title-sub2'}>
                      <Col span={24}>
                        <KTTitle size={3}></KTTitle>
                      </Col>
                    </Row>
                    {/* <Row className={'marginR-md'}>
                      <Button className="common-btn">Thêm mới</Button>
                    </Row> */}
                  </Col>
                </Row>
                <Row>
                  <Form form={form1} component={false}>
                    <Col span={24}>
                      <Button
                        onClick={handleAdd}
                        type="primary"
                        style={{ marginBottom: 16, float: 'right' }}
                      >
                        Thêm dòng +
                      </Button>
                      <Table
                        components={components}
                        rowClassName={() => 'editable-row'}
                        bordered
                        dataSource={dataSource}
                        columns={columnsEdit}
                      />
                    </Col>
                  </Form>
                </Row>
                {/* <Row>
                  <Col span={24}>
                    <Table
                      columns={lcValueColumns}
                      // dataSource={[]}
                      pagination={{ pageSize: 10 }}
                    />
                  </Col>
                </Row> */}
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
                <Row className="padding-md">
                  <Col span={24}>
                    <Row className={'padding-title-sub2'}>
                      <Col span={24}>
                        <KTTitle size={3}></KTTitle>
                      </Col>
                    </Row>
                    {/* <Row className={'marginR-md'}>
                      <Button className="common-btn">Thêm mới</Button>
                    </Row> */}
                  </Col>
                </Row>
                <Row>
                  <Form form={formBank} component={false}>
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
              </div>

              <div id="form-footer">
                <Form.Item>
                  <Space className={'padding-buton'}>
                    <Button className="common-btn" htmlType="submit">
                      Xác nhận
                    </Button>
                    <Button
                      onClick={domain.exitHandler}
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
