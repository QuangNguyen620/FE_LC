import React, { useState, useEffect } from 'react';
import { Col, Row, Input, Form, Select, Checkbox, Divider, Table } from 'antd';
import { KTTitle } from 'core/ui';
import { useTranslation } from 'react-i18next';
import {} from '@ant-design/icons';
import '../../../../components/less/CM.04.01.less';
import { useCM0401Domain } from '../../domains/CM.04.01Domain';

const CheckboxGroup = Checkbox.Group;

const ConstractInfomation = ({ lang = 'vi' }) => {
  const [context, domain] = useCM0401Domain();
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [paymentMethodOptions] = useState([
    { label: 'Chuyển khoản', value: 1 },
    { label: 'Thư tín dụng L/C', value: 2 },
  ]);

  // const [lcPaymentTypeOptions, setlcPaymentTypeOptions] = useState([
  //   { label: 'L/C thông thường', value: 1 },
  //   { label: 'UPAS L/C', value: 2 },
  // ]);

  // khi thay đổi ngân hàng
  // function onChangeBankSwiftCode(e) {
  //   domain.onChangeBankSwiftCode(e);
  // }

  // thay đổi với các input type = date;
  // function onChangeConstractText(e) {
  //   domain.onChangeConstractText(e);
  // }

  // thay đổi với các input type = Select;
  // function onChangeConstractSelect(e) {
  //   domain.onChangeConstractSelect(this.name, e);
  // }

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
    console.log(
      'licenseListInit::: ',
      context?.licenseList,
      context?.licenseListInit,
    );
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
      width: '10%',
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
            <Col style={{ width: record.licenseId === 0 ? '45%' : '100%' }}>
              {record.licenseName}
            </Col>
            <Col style={{ width: '10%' }}></Col>

            {/* <Col
              // span={11}
              style={{
                width: record.licenseId === 0 ? '45%' : '0%',
                display: record.licenseId === 0 ? 'flex' : 'none',
              }}
            >
              <Input
                disabled
                defaultValue={record.licenseName}
                // style={{ width: '50%' }}
                onChange={(e) => {
                  changeLicenseName(e, record.key);
                }}
              />
            </Col> */}
          </Row>
        </div>
      ),
    },
    {
      title: 'Mô tả chứng từ',
      dataIndex: 'licenseDescription',
      key: 'licenseDescription',
      width: '45%',
      render: (text, record, index) => (
        <div>
          <Row>
            <Col span={24}>
              {record.licenseDescription}
              {/* <Input
                defaultValue={record.licenseDescription}
                // style={{ width: '50%' }}
                onChange={(e) => {
                  changeLicenseDescription(e, record.key);
                }}
              /> */}
            </Col>
          </Row>
        </div>
      ),
    },
  ];

  // //------------------Code mới--------------------//

  const handleAdd = async () => {
    const { count, dataSource } = state;
    console.log('count::', count);
    const newData = {
      key: count + 1,

      licenseId: '',
      licenseName: '',
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

  const handleDelete = async (key) => {
    let dataSource = [...state.dataSource];
    var index = dataSource.findIndex(function (element) {
      return element.key == key;
    });
    console.log(index);

    setState({
      ...state,
      dataSource: dataSource.filter((item) => item.key !== key),
    });
    await domain.setContractLicenseList({
      ...state,
      dataSource: dataSource.filter((item) => item.key !== key),
    });
  };
  return (
    <>
      <div className="content-step">
        <Row>
          <Col span={24}>
            <Row>
              <Col span={1}></Col>
              <Col span={7}>
                <Form.Item>Phương thức thanh toán</Form.Item>
                <span style={{ color: '#F5222D' }}></span>
              </Col>
              <Col span={16}>
                <Form.Item name={'paymentMethods'}>
                  <CheckboxGroup
                    disabled
                    style={{ display: 'flex' }}
                    options={paymentMethodOptions}
                    onChange={onChangeConstractPaymentMethodsCheckBox}
                  />
                </Form.Item>
              </Col>
              <Divider className="divider-view" />
              <Col span={1}></Col>
              <Col span={7}>
                <Form.Item> Thanh toán chuyển khoản</Form.Item>
                <span style={{ color: '#F5222D' }}></span>
              </Col>
              <Col span={16}>
                <Form.Item name={'transferPayments'}>
                  {context?.transferPayments}
                </Form.Item>
              </Col>
              <Divider className="divider-view" />
              <Col span={1}></Col>
              <Col span={7}>
                <Form.Item>Thanh toán L/C</Form.Item>
                <span style={{ color: '#F5222D' }}></span>
              </Col>
              <Col span={16}>
                <Form.Item name={'lcPayment'}>{context?.lcPayment}</Form.Item>
              </Col>
              <Divider className="divider-view" />
              <Col span={1}></Col>
              <Col span={7}>
                <Form.Item> Loại L/C </Form.Item>
                <span style={{ color: '#F5222D' }}></span>
              </Col>
              <Col span={16}>
                <Form.Item name={'lcId'}>
                  {context?.lcPaymentTypeName}
                </Form.Item>
              </Col>
              <Divider className="divider-view" />
              <Col span={1}></Col>
              <Col span={7}>
                <Form.Item>Thời hạn thanh toán LC</Form.Item>
                <span style={{ color: '#F5222D' }}></span>
              </Col>
              <Col span={16}>
                <Form.Item name={'paymentTermLc'}>
                  {context?.paymentTermLc}
                </Form.Item>
              </Col>
              <Divider className="divider-view" />
              <Col span={1}></Col>
              <Col span={7}>
                <Form.Item>Ngân hàng bên bán</Form.Item>{' '}
                <span style={{ color: '#F5222D' }}></span>
              </Col>
              <Col span={16}>
                <Form.Item name={'bankSwiftCode'}>
                  {context?.bankSwiftCodeName}
                </Form.Item>
              </Col>
              <Divider className="divider-view" />
              <Col span={1}></Col>
              <Col span={7}>
                <Form.Item>Số tài khoản</Form.Item>{' '}
                <span style={{ color: '#F5222D' }}></span>
              </Col>
              <Col span={16}>
                <Form.Item name={'buyerAccountNumber'}>
                  {context?.buyerAccountNumberName}
                </Form.Item>
              </Col>
            </Row>

            <Row className="row-table">
              <Col span={24}>
                <KTTitle size={3}>
                  <b>Bộ chứng từ thanh toán</b>
                </KTTitle>
              </Col>
              <Form component={false}>
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
              <Divider className="divider-view" />
              <Col span={1}></Col>
              <Col span={7}>
                <Form.Item>Lãi suất trả chậm (%/năm)</Form.Item>
                <span style={{ color: '#F5222D' }}></span>
              </Col>
              <Col span={16}>
                <Form.Item name={'latePaymentInterestRate'}>
                  {context?.latePaymentInterestRate}
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ConstractInfomation;
