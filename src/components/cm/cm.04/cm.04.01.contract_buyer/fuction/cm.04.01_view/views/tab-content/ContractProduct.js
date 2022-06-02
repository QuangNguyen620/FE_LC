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
import { DeleteFilled } from '@ant-design/icons';
import { useCM0401Domain } from '../../domains/CM.04.01Domain';

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
        // rules={[
        //   {
        //     required: true,
        //     message: `${title} is required.`,
        //   },
        // ]}
      >
        <Input disabled ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        // onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

const ConstractInfomation = ({ lang = 'vi' }) => {
  const [state, setState] = useState({
    dataSource: [
      {
        stt: 1,
        key: 1,
        commodity: 'Thep cuon',
        origin: 'VN',
        amount: 10,
        unit: 'm',
        unitPrice: 1000,
        intoMoney: 10000,
      },
      {
        stt: 2,
        key: 2,
        commodity: 'Thep cuon2',
        origin: 'VN',
        amount: 20,
        unit: '2m',
        unitPrice: 2000,
        intoMoney: 40000,
      },
    ],
    count: 2,
  });

  useEffect(() => {
    console.log('context::: ', context);
    setState(context?.state);
  }, [context?.state]);

  const productColumns = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
    },
    {
      title: 'Mặt hàng',
      dataIndex: 'commodity',
      key: 'commodity',
      editable: true,
    },
    {
      title: 'Xuất xứ',
      dataIndex: 'origin',
      key: 'origin',
      editable: true,
    },
    {
      title: 'Số lượng',
      dataIndex: 'amount',
      key: 'amount',
      editable: true,
      render: (value, item, index) =>
        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
    },
    {
      title: 'Đơn vị',
      dataIndex: 'unit',
      key: 'unit',
      editable: true,
    },
    {
      title: 'Đơn giá',
      dataIndex: 'unitPrice',
      key: 'unitPrice',
      editable: true,
      render: (value, item, index) =>
        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
    },
    {
      title: 'Thành tiền',
      dataIndex: 'intoMoney',
      key: 'intoMoney',
      render: (value, item, index) =>
        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
    },
    // {
    //   title: 'Tác vụ',
    //   dataIndex: 'operation',
    //   render: (_, record) =>
    //     state.dataSource.length >= 1 ? (
    //       <Popconfirm
    //         className="item-center"
    //         title="Bạn có chắc chắn xóa?"
    //         onConfirm={() => handleDelete(record.key)}
    //       >
    //         <a>
    //           <DeleteFilled className={'icon-delete'} />
    //         </a>
    //       </Popconfirm>
    //     ) : null,
    // },
  ];

  const { dataSource } = state;
  const [context, domain] = useCM0401Domain();

  const currencyOptions = [
    { label: 'VNĐ', value: 'VND' },
    { label: 'USD', value: 'USD' },
  ];
  const commodityOptions = [{ label: 'Hàng hóa 01', value: 1 }];

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
    const dataSource = [...state.dataSource];
    setState({
      dataSource: dataSource.filter((item) => item.key !== key),
    });
    domain.handleSaveDataProduct(dataSource.filter((item) => item.key !== key));
  };

  // các xử lý liên quan table product
  const [form1] = Form.useForm();

  const handleAdd = () => {
    const { count, dataSource } = state;
    console.log('key::', count);
    const newData = {
      stt: count + 1,
      key: count + 1,
      commodity: 'Thep cuon',
      origin: 'VN',
      amount: 10,
      unit: 'm',
      unitPrice: 1000,
      // noteOfPrice: '1000/m',
      intoMoney: 10000,
    };
    setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
    });

    domain.handleSaveDataProduct([...dataSource, newData]);
  };

  const handleSave = (row) => {
    var intoMoney = row.amount * row.unitPrice;
    row.intoMoney = intoMoney;

    const newData = [...state.dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    setState({
      dataSource: newData,
    });
    domain.handleSaveDataProduct(newData);
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
        handleSave: handleSave,
      }),
    };
    columnsEdit.push(tempObj);
  });
  return (
    <>
      <div className="content-step">
        <Row>
          <Col span={24}>
            <Row>
              <Col span={23}>
                <Row>
                  <Col span={1}></Col>
                  <Col span={7}>
                    <Form.Item>Mô tả hàng hóa</Form.Item>
                    <span style={{ color: '#F5222D' }}></span>
                  </Col>
                  <Col span={16}>
                    <Form.Item name={'descriptionCommodity'}>
                      <pre className={'pre-textare-view'}>
                        {context?.descriptionCommodity}
                      </pre>
                    </Form.Item>
                  </Col>
                  <Divider className="divider-view" />
                  <Col span={1}></Col>
                  <Col span={7}>
                    <Form.Item> Loại hàng hóa</Form.Item>{' '}
                    <span style={{ color: '#F5222D' }}></span>
                  </Col>
                  <Col span={16}>
                    <Form.Item name={'commodityId'}>
                      {context?.commodityName}
                    </Form.Item>
                  </Col>
                  <Divider className="divider-view" />
                </Row>
                <Row>
                  <Col span={24}>
                    <KTTitle size={3}>
                      <b>Danh sách hàng hóa</b>
                    </KTTitle>
                  </Col>
                  <Form form={form1} component={false}>
                    <Col span={24}>
                      <Table
                        components={components}
                        bordered
                        dataSource={dataSource}
                        columns={columnsEdit}
                      />
                    </Col>
                  </Form>
                </Row>
                <Row>
                  <Col span={1}></Col>
                  <Col span={7}>
                    <Form.Item>Loại tiền</Form.Item>
                    <span style={{ color: '#F5222D' }}></span>
                  </Col>
                  <Col span={16}>
                    <Form.Item name={'currency'}>
                      {context?.currencyName}
                    </Form.Item>
                  </Col>
                  <Divider className="divider-view" />
                  <Col span={1}></Col>
                  <Col span={7}>
                    <Form.Item>Tổng giá trị Hợp đồng chưa có VAT</Form.Item>
                    <span style={{ color: '#F5222D' }}></span>
                  </Col>
                  <Col span={16}>
                    <Form.Item name={'contractValue'}>
                      {context?.contractValueBeforeVatName}
                    </Form.Item>
                  </Col>
                  <Divider className="divider-view" />
                  <Col span={1}></Col>
                  <Col span={7}>
                    <Form.Item> VAT(%)</Form.Item>
                    <span style={{ color: '#F5222D' }}></span>
                  </Col>
                  <Col span={16}>
                    <Form.Item name={'contractVat'}>
                      {context?.contractVat}
                    </Form.Item>
                  </Col>
                  <Divider className="divider-view" />
                  <Col span={1}></Col>
                  <Col span={7}>
                    <Form.Item>Tổng giá trị Hợp đồng có VAT</Form.Item>
                    <span style={{ color: '#F5222D' }}></span>
                  </Col>
                  <Col span={16}>
                    <Form.Item name={'contractValue'}>
                      {context?.contractValueName}
                    </Form.Item>
                  </Col>
                  <Divider className="divider-view" />
                  <Col span={1}></Col>
                  <Col span={7}>
                    <Form.Item> Dung sai giảm số tiền (%)</Form.Item>
                    <span style={{ color: '#F5222D' }}></span>
                  </Col>
                  <Col span={16}>
                    <Form.Item name={'amountReductionTolerance'}>
                      {context?.amountReductionTolerance}
                    </Form.Item>
                  </Col>
                  <Divider className="divider-view" />
                  <Col span={1}></Col>
                  <Col span={7}>
                    <Form.Item> Dung sai tăng số tiền (%)</Form.Item>
                    <span style={{ color: '#F5222D' }}></span>
                  </Col>
                  <Col span={16}>
                    <Form.Item name={'toleranceIncreaseAmount'}>
                      {context?.toleranceIncreaseAmount}
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
