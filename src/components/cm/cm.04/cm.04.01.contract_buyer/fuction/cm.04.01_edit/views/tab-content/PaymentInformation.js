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
  Divider,
  InputNumber,
  Table,
} from 'antd';
import {
  MinusCircleOutlined,
  PlusOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import { KTTitle } from 'core/ui';
import { useTranslation } from 'react-i18next';
import {} from '@ant-design/icons';
import '../../../../components/less/CM.04.01.less';
import { DeleteFilled } from '@ant-design/icons';

import { useCM0401Domain } from '../../domains/CM.04.01Domain';
import DeleteUserModal from '../../../../components/modal/edit/DeleteProductModal';

const { Option } = Select;
const CheckboxGroup = Checkbox.Group;

const ConstractInfomation = ({ lang = 'vi' }) => {
  const [context, domain] = useCM0401Domain();
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [selectedKey, setSelectedKey] = useState(-1);
  const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);

  const [paymentMethodOptions, setPaymentMethodOptions] = useState([
    { label: 'Chuyển khoản', value: 1 },
    { label: 'Thư tín dụng L/C', value: 2 },
  ]);

  const [lcPaymentTypeOptions, setlcPaymentTypeOptions] = useState([
    { label: 'L/C thông thường', value: 1 },
    { label: 'UPAS L/C', value: 2 },
  ]);

  useEffect(() => {
    setlcPaymentTypeOptions(context?.lcPaymentTypeOptions);
  }, [context?.lcPaymentTypeOptions]);

  // khi thay đổi ngân hàng
  function onChangeBankSwiftCode(e) {
    domain.onChangeBankSwiftCode(e);
  }

  // thay đổi với các input type = date;
  function onChangeConstractText(e) {
    domain.onChangeConstractText(e);
  }

  // thay đổi với các input type = Select;
  function onChangeConstractSelectOrNumber(e) {
    domain.onChangeConstractSelect(this.name, e);
  }

  // thay đổi với các input type = checkbox;
  function onChangeConstractPaymentMethodsCheckBox(e) {
    domain.onChangeConstractPaymentMethodsCheckBox(e);
  }
  // form plhd
  const [licenseList, setLicenseList] = useState([]);

  // data phụ lục hợp đồng
  const [licenseListInit, setLicenseListInit] = useState(
    context?.licenseListInit,
  );

  useEffect(() => {
    setLicenseList(context?.licenseList);
    setLicenseListInit(context?.licenseListInit);
  }, [context?.licenseList]);

  var init = [];
  init = licenseListInit;

  const add = () => {
    const activeKey =
      (licenseList && licenseList.length
        ? +licenseList[licenseList.length - 1].key
        : 0) + 1;

    var tempAdd = {
      title: 'Chứng từ',
      key: activeKey,
      ['licenseId' + activeKey]: '',
    };

    var tempList = licenseList;
    tempList.push(tempAdd);

    //khởi tạo và set data số phụ lục
    // var temp =  init;
    let tempInit = {};
    tempInit.licenseId = 0;
    tempInit.licenseName = '';
    init.push(tempInit);

    onChangeConstractLicense(tempList);
    onChangeConstractLicenseInit(init);

    console.log('licenseListInit::', tempList);
    console.log('initAdd::', init);
  };

  const remove = (key) => {
    var tempList = licenseList;
    const idx = tempList.findIndex((item) => +item.key === +key);
    tempList.splice(idx, 1);
    init.splice(idx, 1);
    // tempList.push(tempAdd);

    onChangeConstractLicense(tempList);
    onChangeConstractLicenseInit(init);

    console.log('initAdd::', init);
  };

  // khi thay đổi form input bo chung tu
  function onChangeConstractLicense(data) {
    domain.onChangeConstractLicense(data);
  }
  // khi thay đổi data input bo chung tu
  function onChangeConstractLicenseInit(data) {
    domain.onChangeConstractLicenseInit(data);
  }

  // thay đổi khi chọn bộ chúng từ với mỗi select
  function onChangeLicenseId(e) {
    console.log('pane::', e);
    var index = this.name.slice(-1);
    var name = this.name;
    name = name.slice(0, name.length - 1);
    init[index - 1][name] = e;

    console.log('e::', e);
    console.log('init::', init);
    onChangeConstractLicenseInit(init);
  }
  // Xử lý của bộ chứng từ
  const [state, setState] = useState({
    // dataSource: context?.stateLicenseList,
    dataSource: [],
    count: 0,
  });

  useEffect(() => {
    console.log('stateLicenseList::: ', context?.stateLicenseList);
    setState(context?.stateLicenseList);
  }, [context?.stateLicenseList]);

  const columns = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
      width: '5%',
      render: (value, item, index) => (page - 1) * pageSize + index + 1,
    },
    {
      title: 'Tên chứng từ',
      dataIndex: 'licenseId',
      key: 'licenseId',
      width: '45%',
      render: (text, record, index) => (
        <div>
          <Row>
            <Col
              // span={11}
              style={{ width: record.licenseId === 0 ? '45%' : '100%' }}
            >
              <Select
                onChange={(e) => {
                  changeLicenseId(e, record.key);
                }}
                style={{ width: '100%' }}
                placeholder="Nhập thông tin"
                defaultValue={record.licenseId}
              >
                {context?.licenseOptions.map((license, i) => (
                  <Option key={license.key} value={license.value}>
                    {license.label}
                  </Option>
                ))}
              </Select>
            </Col>
            <Col style={{ width: '10%' }}></Col>

            <Col
              // span={11}
              style={{
                width: record.licenseId === 0 ? '45%' : '0%',
                display: record.licenseId === 0 ? 'flex' : 'none',
              }}
            >
              <Input
                defaultValue={record.licenseName}
                // style={{ width: '50%' }}
                onChange={(e) => {
                  changeLicenseName(e, record.key);
                }}
              />
            </Col>
          </Row>
        </div>
      ),
    },
    {
      title: 'Mô tả chứng từ',
      dataIndex: 'licenseDescription',
      key: 'licenseDescription',
      width: '40%',
      render: (text, record, index) => (
        <div>
          <Row>
            <Col span={24}>
              <Input
                defaultValue={record.licenseDescription}
                // style={{ width: '50%' }}
                onChange={(e) => {
                  changeLicenseDescription(e, record.key);
                }}
              />
            </Col>
          </Row>
        </div>
      ),
    },
    {
      title: 'Tác vụ',
      key: 'action',
      width: '10%',
      // fixed: 'right',
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
        ) : null,
    },
  ];

  // //------------------Code mới--------------------//

  const handleAdd = async () => {
    const { count, dataSource } = state;
    console.log('count::', count);
    const newData = {
      key: count + 1,

      contractLicenseId: null,
      licenseId: '',
      licenseName: '',
      licenseDescription: '',
    };
    var newStateLicense = {
      dataSource: [...dataSource, newData],
      count: count + 1,
    };
    setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
    });

    await domain.setContractLicenseList(newStateLicense);
  };

  const changeLicenseId = (e, key) => {
    const { count, dataSource } = state;
    // let dataSource = [...state.dataSource];
    var index = dataSource.findIndex(function (element) {
      return element.key == key;
    });
    var indexLicense = context?.licenseOptions?.findIndex(function (element) {
      return element.value == e;
    });
    dataSource[index].licenseId = e;
    dataSource[index].licenseName = context?.licenseOptions[indexLicense].label;

    setState({ ...state, dataSource: dataSource });
    var newStateLicense = {
      dataSource: dataSource,
      count: count,
    };

    // console.log(newStateLicense);
    domain.setContractLicenseList(newStateLicense);
  };

  const changeLicenseName = (e, key) => {
    const { count, dataSource } = state;
    // let dataSource = [...state.dataSource];
    var index = dataSource.findIndex(function (element) {
      return element.key == key;
    });
    dataSource[index].licenseId = 0;
    dataSource[index].licenseName = e?.target?.value;

    setState({ ...state, dataSource: dataSource });
    var newStateLicense = {
      dataSource: dataSource,
      count: count,
    };

    // console.log(newStateLicense);
    domain.setContractLicenseList(newStateLicense);
  };

  const changeLicenseDescription = (e, key) => {
    const { count, dataSource } = state;
    // let dataSource = [...state.dataSource];
    var index = dataSource.findIndex(function (element) {
      return element.key == key;
    });

    dataSource[index].licenseDescription = e?.target?.value;

    setState({ ...state, dataSource: dataSource });
    var newStateLicense = {
      dataSource: dataSource,
      count: count,
    };

    // console.log(newStateLicense);
    domain.setContractLicenseList(newStateLicense);
  };

  const handleDelete = async (key) => {
    let dataSource = [...state.dataSource];
    var index = dataSource.findIndex(function (element) {
      return element.key == key;
    });
    console.log(index);
    // dataSource.splice(index, 1);

    // var tempArr = [];
    // for (let index = 0; index < dataSource.length; index++) {
    //   const element = {
    //     ...dataSource[index],
    //     key: index,
    //   };
    //   tempArr.push(element);
    // }
    // var newStateLicense = {
    //   dataSource: [...dataSource],
    //   count: count + 1,
    // };

    setState({
      ...state,
      dataSource: dataSource.filter((item) => item.key !== key),
    });
    await domain.setContractLicenseList({
      ...state,
      dataSource: dataSource.filter((item) => item.key !== key),
    });

    setSelectedKey(-1);
  };

  const deleteHandler = () => {
    handleDelete(selectedKey);

    onModalClose();
  };
  function onModalClose() {
    setDeleteConfirmVisible(false);
  }

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
              <Col span={23}>
                <Row style={{ paddingBottom: 15 }}>
                  <Col span={24}>
                    <KTTitle size={3}>
                      <b>Thông tin thanh toán</b>
                    </KTTitle>
                  </Col>
                  <Divider />
                </Row>

                <Row>
                  <Col span={8}>
                    Phương thức thanh toán
                    <span style={{ color: '#F5222D' }}>*</span>
                  </Col>
                  <Col span={16}>
                    <Form.Item
                      name={'paymentMethods'}
                      rules={[
                        {
                          required: true,
                          message:
                            'Trường phương thức thanh toán không được phép để trống!',
                        },
                      ]}
                    >
                      <CheckboxGroup
                        style={{ display: 'flex' }}
                        options={paymentMethodOptions}
                        onChange={onChangeConstractPaymentMethodsCheckBox}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    Thanh toán chuyển khoản
                    <span style={{ color: '#F5222D' }}></span>
                  </Col>
                  <Col span={16}>
                    <Form.Item
                      name={'transferPayments'}
                      rules={
                        context?.paymentMethods == 1
                          ? [
                              {
                                whitespace: true,
                                required: true,
                                message:
                                  'Trường thanh toán chuyển khoản không được phép để trống!',
                              },
                              {
                                max: 100,
                                message:
                                  'Trường thanh toán chuyển khoản không được phép vượt quá 100 ký tự!',
                              },
                            ]
                          : [
                              {
                                max: 100,
                                message:
                                  'Trường thanh toán chuyển khoản không được phép vượt quá 100 ký tự!',
                              },
                            ]
                      }
                    >
                      <Input
                        name="transferPayments"
                        onChange={onChangeConstractText}
                        maxLength={100}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    Thanh toán L/C
                    <span style={{ color: '#F5222D' }}>*</span>
                  </Col>
                  <Col span={16}>
                    <Form.Item
                      name={'lcPayment'}
                      rules={[
                        {
                          whitespace: true,
                          required: true,
                          message:
                            'Trường thanh toán L/C không được phép để trống!',
                        },
                        {
                          max: 100,
                          message:
                            'Trường thanh toán L/C không được phép vượt quá 100 ký tự!',
                        },
                      ]}
                    >
                      <Input
                        name="lcPayment"
                        onChange={onChangeConstractText}
                        maxLength={100}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row>
                  <Col span={8}>
                    Loại L/C <span style={{ color: '#F5222D' }}>*</span>
                  </Col>
                  <Col span={16}>
                    <Form.Item
                      name={'lcId'}
                      rules={[
                        {
                          required: true,
                          message: 'Trường loại L/C không được phép để trống!',
                        },
                      ]}
                    >
                      <Select
                        name={'lcId'}
                        onChange={onChangeConstractSelectOrNumber}
                      >
                        {lcPaymentTypeOptions?.map((element) => (
                          <Select.Option value={element.id}>
                            {element.lcName}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>

                <Row>
                  <Col span={8}>
                    Thời hạn thanh toán L/C
                    <span style={{ color: '#F5222D' }}>*</span>
                  </Col>
                  <Col span={16}>
                    <Form.Item
                      name={'paymentTermLc'}
                      rules={[
                        {
                          whitespace: true,
                          required: true,
                          message:
                            'Trường thời hạn thanh toán không được phép để trống!',
                        },
                        {
                          max: 100,
                          message:
                            'Trường thời hạn thanh toán không được phép vượt quá 100 ký tự!',
                        },
                      ]}
                    >
                      <Input
                        name="paymentTermLc"
                        onChange={onChangeConstractText}
                        maxLength={100}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row>
                  <Col span={8}>
                    Ngân hàng bên bán{' '}
                    <span style={{ color: '#F5222D' }}>*</span>
                  </Col>
                  <Col span={16}>
                    <Form.Item
                      name={'bankSwiftCode'}
                      rules={[
                        {
                          required: true,
                          message:
                            'Trường ngân hàng bên bán không được phép để trống!',
                        },
                      ]}
                    >
                      <Select
                        name={'bankSwiftCode'}
                        onChange={onChangeBankSwiftCode}
                      >
                        {context?.bankSwiftCodeOptions?.map((element) => (
                          <Select.Option value={element.value}>
                            {element.label}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>

                <Row>
                  <Col span={8}>
                    Số tài khoản <span style={{ color: '#F5222D' }}>*</span>
                  </Col>
                  <Col span={16}>
                    <Form.Item
                      name={'buyerAccountNumber'}
                      rules={[
                        {
                          required: true,
                          message:
                            'Trường số tài khoản không được phép để trống!',
                        },
                      ]}
                    >
                      <Select
                        name={'buyerAccountNumber'}
                        onChange={onChangeConstractSelectOrNumber}
                      >
                        {context?.bankAccountOptions?.map((element) => (
                          <Select.Option value={element.value}>
                            {element.label}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>

                <Row className="row-table">
                  <Form component={false}>
                    <Col span={12}>
                      <KTTitle size={3}>
                        <b>Bộ chứng từ thanh toán</b>
                      </KTTitle>
                    </Col>
                    <Col span={12}>
                      <Button
                        onClick={handleAdd}
                        type="primary"
                        className="button-add-license"
                      >
                        Thêm dòng <PlusOutlined />
                      </Button>
                    </Col>
                    <Col span={24}>
                      <Table
                        columns={columns}
                        dataSource={state?.dataSource}
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
                    Lãi suất trả chậm (%/năm)
                    <span style={{ color: '#F5222D' }}></span>
                  </Col>
                  <Col span={16}>
                    <Form.Item
                      name={'latePaymentInterestRate'}
                      rules={[
                        {
                          pattern: /^[\d]{0,2}$/,
                          message:
                            'Trường lãi suất trả chậm không được phép là số âm!',
                        },
                      ]}
                    >
                      <InputNumber
                        className="width-input-number"
                        name="latePaymentInterestRate"
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
