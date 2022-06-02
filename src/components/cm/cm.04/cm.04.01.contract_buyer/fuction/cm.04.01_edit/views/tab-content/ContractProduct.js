import React, { useContext, useState, useEffect, useRef } from 'react';
import '../../../../components/less/CM.04.01.less';
import {
  Col,
  Row,
  Input,
  Button,
  Form,
  Select,
  Table,
  Popconfirm,
  InputNumber,
  Divider,
} from 'antd';
import { KTTitle } from 'core/ui';
import { DeleteFilled, PlusOutlined } from '@ant-design/icons';
import { useCM0401Domain } from '../../domains/CM.04.01Domain';
import DeleteUserModal from '../../../../components/modal/add/DeleteProductModal';

const { TextArea } = Input;
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
  type,
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
      // toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    console.log('render field', type);
    childNode =
      type == 'input' ? (
        <Form.Item
          style={{
            margin: 0,
          }}
          name={dataIndex}
          rules={[
            {
              required: true,
              message: `${title} không được để trống!`,
            },
          ]}
        >
          <Input ref={inputRef} onPressEnter={save} onBlur={save} />
        </Form.Item>
      ) : (
        <Form.Item
          style={{
            margin: 0,
          }}
          name={dataIndex}
          rules={[
            {
              required: true,
              message: `${title} không được để trống!`,
            },
          ]}
        >
          <InputNumber ref={inputRef} onPressEnter={save} onBlur={save} />
        </Form.Item>
      );
  }

  return <td {...restProps}>{childNode}</td>;
};

const ConstractInfomation = ({ lang = 'vi' }) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  const [context, domain] = useCM0401Domain();
  const [selectedKey, setSelectedKey] = useState(-1);
  const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);

  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [commodityOptions, setCommodityOptions] = useState([]);

  const [state, setState] = useState({
    dataSource: [],
    count: 0,
  });

  useEffect(() => {
    console.log('context::: ', context);
    setState(context?.state);
  }, [context?.state]);

  useEffect(() => {
    console.log('currencyOptions::: ', context);
    setCurrencyOptions(context?.currencyOptions);
  }, [context?.currencyOptions]);

  useEffect(() => {
    console.log('state::: ', context);
    setCommodityOptions(context?.commodityOptions);
  }, [context?.commodityOptions]);

  const { dataSource } = state;

  const productColumns = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
      width: '3%',
      fixed: 'left',
      type: 'input',
      render: (value, item, index) => (page - 1) * pageSize + index + 1,
    },
    {
      title: 'Mặt hàng',
      dataIndex: 'commodity',
      key: 'commodity',
      width: '10%',
      type: 'input',
      editable: true,
      render: (text, record, index) => (
        <Input
          style={{ width: '100%' }}
          onChange={(e) => onChangeTextProduct('commodity', e, record.key)}
          name={'commodity'}
          placeholder="Nhập thông tin"
          defaultValue={
            state?.dataSource[(page - 1) * pageSize + index]?.commodity
          }
        />
      ),
    },
    {
      title: 'Xuất xứ',
      dataIndex: 'origin',
      key: 'origin',
      width: '8%',
      type: 'input',
      editable: true,
      render: (text, record, index) => (
        <Input
          style={{ width: '100%' }}
          onChange={(e) => onChangeTextProduct('origin', e, record.key)}
          name={'commodity'}
          placeholder="Nhập thông tin"
          defaultValue={
            state?.dataSource[(page - 1) * pageSize + index]?.origin
          }
        />
      ),
    },
    {
      title: 'Số lượng',
      dataIndex: 'amount',
      key: 'amount',
      width: '5%',
      type: 'number',
      editable: true,
      render: (text, record, index) => (
        <InputNumber
          style={{ width: '100%' }}
          onChange={(e) => onChangeNumberProduct('amount', e, record.key)}
          name={'commodity'}
          placeholder="Nhập thông tin"
          defaultValue={
            state?.dataSource[(page - 1) * pageSize + index]?.amount
          }
        />
      ),
    },
    {
      title: 'Đơn vị',
      dataIndex: 'unit',
      key: 'unit',
      width: '5%',
      type: 'input',
      editable: true,
      render: (text, record, index) => (
        <Input
          style={{ width: '100%' }}
          onChange={(e) => onChangeTextProduct('unit', e, record.key)}
          name={'commodity'}
          placeholder="Nhập thông tin"
          defaultValue={state?.dataSource[(page - 1) * pageSize + index]?.unit}
        />
      ),
    },
    {
      title: 'Đơn giá',
      dataIndex: 'unitPrice',
      key: 'unitPrice',
      width: '5%',
      type: 'number',
      editable: true,
      render: (text, record, index) => (
        <InputNumber
          style={{ width: '100%' }}
          onChange={(e) => onChangeNumberProduct('unitPrice', e, record.key)}
          name={'commodity'}
          placeholder="Nhập thông tin"
          defaultValue={
            state?.dataSource[(page - 1) * pageSize + index]?.unitPrice
          }
        />
      ),
    },
    {
      title: 'Thành tiền',
      dataIndex: 'intoMoney',
      key: 'intoMoney',
      width: '8%',
      type: 'number',
      render: (value, item, index) =>
        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
    },
    {
      title: 'Tác vụ',
      dataIndex: 'operation',
      width: '4%',
      type: 'input',
      fixed: 'right',
      render: (_, record) =>
        state.dataSource.length >= 1 ? (
          <Button
            onClick={(e) => {
              console.log(record.key);
              setSelectedKey(record.key);
              setDeleteConfirmVisible(true);
            }}
            className={'btn-delete-in-table'}
            icon={<DeleteFilled className={'icon-delete'} />}
            size={'small'}
          />
        ) : // <Popconfirm
        //   className="item-center"
        //   title="Bạn có chắc chắn xóa?"
        //   onConfirm={() => handleDelete(record.key)}
        // >
        //   <a>
        //     <DeleteFilled className={'icon-delete'} />
        //   </a>
        // </Popconfirm>
        null,
    },
  ];

  // thay đổi với các input là VAT
  function onChangeConstractVAT(e) {
    //console.log(e);
    //console.log(this.name);
    domain.onChangeConstractVAT(this.name, e);
  }

  // thay đổi với các input type = date;
  function onChangeConstractText(e) {
    //console.log(e);
    domain.onChangeConstractText(e);
  }

  // thay đổi với các input type = Select;
  function onChangeConstractSelectOrNumber(e) {
    //console.log(e);
    domain.onChangeConstractSelect(this.name, e);
  }

  // thay đổi với các input type = Select;
  function onChangeConstractSelect(e) {
    //console.log(e);
    domain.onChangeConstractSelect(this.name, e);
  }

  const handleDelete = (key) => {
    // const dataSource = [...state.dataSource];
    setState({
      ...state,
      dataSource: dataSource.filter((item) => item.key !== key),
    });
    domain.handleSaveState({
      ...state,
      dataSource: dataSource.filter((item) => item.key !== key),
    });
    // domain.handleSaveDataProduct(dataSource.filter((item) => item.key !== key));

    setSelectedKey(-1);
  };

  // các xử lý liên quan table product
  const [form1] = Form.useForm();

  const handleAdd = () => {
    const { count, dataSource } = state;
    console.log('key::', count);
    const newData = {
      stt: count + 1,
      key: count + 1,
      commodity: '',
      origin: '',
      amount: 0,
      unit: '',
      unitPrice: 0,
      // noteOfPrice: '1000/m',
      intoMoney: 0,
    };
    setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
    });

    domain.handleSaveState({
      dataSource: [...dataSource, newData],
      count: count + 1,
    });
    // domain.handleSaveDataProduct([...dataSource, newData]);
  };

  const handleSave = (row) => {
    var intoMoney = row.amount * row.unitPrice;
    row.intoMoney = intoMoney;

    const newData = [...state.dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    setState({
      ...state,
      dataSource: newData,
    });
    domain.handleSaveState({
      ...state,
      dataSource: newData,
    });
    // domain.handleSaveDataProduct(newData);
  };

  // render table edit
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  var columnsEdit = [];
  console.log('ContractProduct');
  productColumns.forEach((col) => {
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
        type: col.type,
        handleSave: handleSave,
      }),
    };
    columnsEdit.push(tempObj);
  });
  const deleteHandler = () => {
    handleDelete(selectedKey);

    onModalClose();
  };
  function onModalClose() {
    setDeleteConfirmVisible(false);
  }

  const onChangeTextProduct = (name, e, key) => {
    console.log('onChangeTextProduct');
    var value = e?.target?.value;
    let dataSource = [...state.dataSource];
    var index = dataSource.findIndex(function (element) {
      return element.key == key;
    });
    var row = dataSource[index];
    row[name] = value;
    if (row?.amount != null && row?.unitPrice != null) {
      var intoMoney = row.amount * row.unitPrice;
      row.intoMoney = intoMoney;
    }
    dataSource[index] = row;
    setState({
      ...state,
      dataSource: dataSource,
    });
    console.log(dataSource);
    domain.handleSaveState({
      ...state,
      dataSource: dataSource,
    });
  };

  const onChangeNumberProduct = (name, e, key) => {
    console.log('onChangeTextProduct');
    let dataSource = [...state.dataSource];
    var index = dataSource.findIndex(function (element) {
      return element.key == key;
    });
    var row = dataSource[index];
    row[name] = e;
    if (row?.amount != null && row?.unitPrice != null) {
      var intoMoney = row.amount * row.unitPrice;
      row.intoMoney = intoMoney;
    }
    dataSource[index] = row;
    setState({
      ...state,
      dataSource: dataSource,
    });
    console.log(dataSource);
    domain.handleSaveState({
      ...state,
      dataSource: dataSource,
    });
  };

  return (
    <>
      <DeleteUserModal
        isVisbled={deleteConfirmVisible}
        onClose={onModalClose}
        onCloseModal={onModalClose}
        deleteHandler={deleteHandler}
      />
      <div className="content-step">
        <Row>
          <Col span={24}>
            <Row>
              <Col span={24}>
                <KTTitle size={3}>
                  <b>Thông tin hàng hóa</b>
                </KTTitle>
              </Col>
              <Divider />
            </Row>
            <Row>
              <Col span={23}>
                <Row>
                  <Col span={8}>
                    Mô tả hàng hóa
                    <span style={{ color: '#F5222D' }}></span>
                  </Col>
                  <Col span={16}>
                    <Form.Item
                      name={'descriptionCommodity'}
                      rules={[
                        {
                          max: 500,
                          message:
                            'Trường mô tả hàng hóa không được phép vượt quá 500 ký tự!',
                        },
                      ]}
                    >
                      <TextArea
                        name="descriptionCommodity"
                        onChange={onChangeConstractText}
                        placeholder="Nhập nội dung"
                        maxLength={500}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    Loại hàng hóa <span style={{ color: '#F5222D' }}>*</span>
                  </Col>
                  <Col span={16}>
                    <Form.Item name={'commodityId'}>
                      <Select
                        name={'commodityId'}
                        onChange={onChangeConstractSelect}
                        placeholder="Chọn"
                      >
                        {commodityOptions?.map((element) => (
                          <Select.Option value={element.commoditiesId}>
                            {element.commoditiesName}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                <div></div>
                <Row>
                  <Form form={form1} component={false}>
                    <Col span={12}>
                      <KTTitle size={3}>
                        <b>Danh sách hàng hóa</b>
                      </KTTitle>
                    </Col>
                    <Col span={12}>
                      <Button
                        onClick={handleAdd}
                        type="primary"
                        style={{
                          marginBottom: 16,
                          marginRight: 16,
                          float: 'right',
                        }}
                      >
                        Thêm dòng <PlusOutlined />
                      </Button>
                    </Col>
                    <Col span={24}>
                      <Table
                        scroll={{ x: 1200 }}
                        // components={columns}
                        rowClassName={() => 'editable-row'}
                        bordered
                        dataSource={state?.dataSource}
                        columns={productColumns}
                        pagination={{
                          onChange(current) {
                            setPage(current);
                          },
                          pageSize: pageSize,
                        }}
                      />
                    </Col>
                  </Form>
                </Row>
                <Row>
                  <Col span={8}>
                    Loại tiền<span style={{ color: '#F5222D' }}>*</span>
                  </Col>
                  <Col span={16}>
                    <Form.Item name={'currency'}>
                      <Select
                        name={'currency'}
                        onChange={onChangeConstractSelect}
                      >
                        {currencyOptions?.map((element) => (
                          <Select.Option value={element.currencyCode}>
                            {element.currencyCode}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>{' '}
                <Row>
                  <Col span={8}>
                    Tổng giá trị hợp đồng chưa có VAT
                    <span style={{ color: '#F5222D' }}>*</span>
                  </Col>
                  <Col span={16}>
                    <Form.Item name={'contractValueBeforeVat'}>
                      <InputNumber
                        disabled
                        span={16}
                        style={{ width: '100%' }}
                        formatter={(value) =>
                          `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                        }
                        parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                        name="contractValueBeforeVat"
                        // onChange={onChangeConstractSelectOrNumber}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    VAT(%)
                    <span style={{ color: '#F5222D' }}>*</span>
                  </Col>
                  <Col span={16}>
                    <Form.Item
                      name={'contractVat'}
                      rules={[
                        {
                          required: true,
                          message: 'Trường VAT không được phép để trống!',
                        },
                        {
                          pattern: /^[\d]{0,2}$/,
                          message: 'Trường VAT không được phép là số âm!',
                        },
                      ]}
                    >
                      <InputNumber
                        className="width-input-number"
                        // style={{ width: '100%' }}
                        name="contractVat"
                        onChange={onChangeConstractVAT}
                        maxLength={2}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    Tổng giá trị hợp đồng có VAT
                    <span style={{ color: '#F5222D' }}>*</span>
                  </Col>
                  <Col span={16}>
                    <Form.Item name={'contractValue'}>
                      {/* <Input
                            name="contractValue"
                            onChange={onChangeConstractText}
                          /> */}
                      <InputNumber
                        span={16}
                        style={{ width: '100%' }}
                        formatter={(value) =>
                          `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                        }
                        parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                        name="contractValue"
                        onChange={onChangeConstractSelectOrNumber}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    Dung sai giảm số tiền (%)
                    <span style={{ color: '#F5222D' }}></span>
                  </Col>
                  <Col span={16}>
                    <Form.Item
                      name={'amountReductionTolerance'}
                      rules={[
                        {
                          pattern: /^[\d]{0,2}$/,
                          message:
                            'Trường dung sai giảm số tiền không được phép là số âm!',
                        },
                      ]}
                    >
                      <InputNumber
                        className="width-input-number"
                        name="amountReductionTolerance"
                        onChange={onChangeConstractSelectOrNumber}
                        maxLength={2}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    Dung sai tăng số tiền (%)
                    <span style={{ color: '#F5222D' }}></span>
                  </Col>
                  <Col span={16}>
                    <Form.Item
                      name={'toleranceIncreaseAmount'}
                      rules={[
                        {
                          pattern: /^[\d]{0,2}$/,
                          message:
                            'Trường dung sai tăng số tiền không được phép là số âm!',
                        },
                      ]}
                    >
                      <InputNumber
                        className="width-input-number"
                        name="toleranceIncreaseAmount"
                        onChange={onChangeConstractSelectOrNumber}
                        maxLength={2}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
              <Col span={1}></Col>
            </Row>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ConstractInfomation;
