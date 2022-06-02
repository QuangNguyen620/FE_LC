/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {
  Col,
  Row,
  Input,
  Button,
  Form,
  Select,
  Space,
  Radio,
  Table,
  Card,
} from 'antd';
import { KTTitle } from 'core/ui';

import { DeleteFilled, PlusOutlined } from '@ant-design/icons';
import { CM0702Domain } from '../../domains/CM0702Domain';

import '../../../../component/less/CM.07.less';
import AddLicenseModal from '../modal/AddLicenseModal';

const { Option } = Select;

const DocumentContent = ({ _lang = 'vi', ..._props }) => {
  const { TextArea } = Input;

  const [context, domain] = CM0702Domain();

  const [addLicenseModalVisible, setAddLicenseModalVisible] = useState(false);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [selectedKey, setSelectedKey] = useState(-1);
  const [state, setState] = useState({
    dataSource: context?.lcRequest?.licenses,
    count: 0,
  });

  const columns = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
      render: (_value, _item, index) => (page - 1) * pageSize + index + 1,
    },
    {
      title: 'Tên bộ chứng từ',
      dataIndex: 'licenseName',
      key: 'licenseName',
    },
    {
      title: 'Mô tả chứng từ',
      dataIndex: 'licenseDescription',
      key: 'licenseDescription',
    },
  ];

  const editableColumns = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
      render: (_value, _item, index) => (page - 1) * pageSize + index + 1,
    },
    {
      title: 'Tên bộ chứng từ',
      dataIndex: 'licenseName',
      key: 'licenseName',
      render: (_text, record, _index) => (
        <Row gutter={24}>
          <Col span={!state?.dataSource[record.key]?.isOtherLicense ? 24 : 12}>
            <Select
              onChange={(e) => {
                onLicenseNameChange(e, record.key);
              }}
              defaultValue={state?.dataSource[record.key]?.licenseName}
              style={{ width: '100%' }}
              placeholder="Chọn bộ chứng từ"
            >
              {context?.licensesList?.map((license, indexLicense) => (
                <Option value={indexLicense}>{license.name}</Option>
              ))}
            </Select>
          </Col>
          <Col
            style={{
              display: !state?.dataSource[record.key]?.isOtherLicense
                ? 'none'
                : '',
            }}
            span={12}
          >
            <Input
              style={{ width: '100%' }}
              onChange={(e) => onOtherLicenseNameChange(e, record.key)}
              name={'otherLicense'}
              placeholder="Nhập tên bộ chứng từ"
            />
          </Col>
        </Row>
      ),
    },
    {
      title: 'Mô tả chứng từ',
      dataIndex: 'licenseDescription',
      key: 'licenseDescription',
      render: (_text, record, _index) => (
        <Input
          style={{ width: '100%' }}
          onChange={(e) => onDescriptionChange(e, record.key)}
          name={'licenseDescription'}
          placeholder="Nhập mô tả"
        />
      ),
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_, record) =>
        state.dataSource.length >= 1 ? (
          <Button
            onClick={() => {
              console.log(record.key);
              setSelectedKey(record.key);
              handleDelete(record.key);
            }}
            shape="circle"
            icon={<DeleteFilled />}
            size={'small'}
          />
        ) : null,
    },
  ];

  const onLicenseNameChange = (e, key) => {
    let dataSource = [...state.dataSource];
    var index = dataSource.findIndex(function (element) {
      return element.key == key;
    });

    if (context?.licensesList[e].value != 'other') {
      dataSource[index].licenseId = context?.licensesList[e].value;
      dataSource[index].licenseName = context?.licensesList[e].name;
      dataSource[index].isOtherLicense = false;
    } else {
      console.log('Chứng từ khác');
      dataSource[index].isOtherLicense = true;
    }
    setState({ dataSource });
    console.log(dataSource);
    domain.setLicensesList(state.dataSource);
  };

  const onOtherLicenseNameChange = (e, key) => {
    let dataSource = [...state.dataSource];
    var index = dataSource.findIndex(function (element) {
      return element.key == key;
    });
    dataSource[index].licenseId = null;
    dataSource[index].licenseName = e.target.value.trim();
    setState({ dataSource });
    console.log(dataSource);
    domain.setLicensesList(state.dataSource);
  };

  const onDescriptionChange = (e, key) => {
    let dataSource = [...state.dataSource];
    var index = dataSource.findIndex(function (element) {
      return element.key == key;
    });

    dataSource[index].licenseDescription = e.target.value.trim();
    setState({ dataSource });
    console.log(dataSource);
    domain.setLicensesList(state.dataSource);
  };

  //-----------------------//
  const onPeriodForPresentationChange = (e) => {
    domain.onPeriodForPresentationChange(e);
  };

  const onTtReimbursementChange = (e) => {
    domain.onTtReimbursementChange(e);
  };

  const onOtherConditionChange = (e) => {
    domain.onOtherConditionChange(e);
  };
  //----------------------//

  const handleAdd = async () => {
    const { count, dataSource } = state;
    const newData = {
      key: dataSource.length,
      licenseId: '',
      licenseName: '',
      licenseDescription: '',
      isOtherLicense: false,
    };

    setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
    });

    await domain.setLicensesList(state.dataSource);
  };

  const handleDelete = async (key) => {
    let dataSource = [...state.dataSource];
    var index = dataSource.findIndex(function (element) {
      return element.key == key;
    });
    console.log(index);
    dataSource.splice(index, 1);

    var tempArr = [];
    for (let i = 0; i < dataSource.length; i++) {
      const element = {
        ...dataSource[i],
        key: i,
      };
      tempArr.push(element);
    }
    setState({
      dataSource: [...dataSource],
    });
    await domain.setLicensesList(tempArr);
    setSelectedKey(-1);
  };

  const onCloseModal = () => {
    setAddLicenseModalVisible(false);
  };

  return (
    <>
      <AddLicenseModal
        isVisbled={addLicenseModalVisible}
        onCloseModal={onCloseModal}
      />
      <div style={{ background: 'white', borderRadius: '5px' }}>
        <Row style={{ padding: 16 }}>
          <Col span={24}>
            <Row>
              <Col span={23}>
                <Row
                  id="documentTable"
                  style={{ paddingBottom: 20 }}
                  gutter={24}
                >
                  <Col span={24}>
                    {context?.lcRequest?.contractType == 2 ? (
                      <Card
                        type="inner"
                        className="custom-card"
                        title={<b>Danh mục chứng từ</b>}
                        extra={
                          <Button
                            className="common-btn"
                            onClick={() => {
                              handleAdd();
                            }}
                          >
                            Thêm dòng{' '}
                            <span style={{ marginLeft: '10px' }}>
                              <PlusOutlined />
                            </span>
                          </Button>
                        }
                      >
                        <Row>
                          <Col span={24}>
                            <Table
                              name={'productList'}
                              dataSource={state.dataSource}
                              columns={editableColumns}
                              // scroll={{ x: 1100 }}

                              pagination={{
                                onChange(current) {
                                  setPage(current);
                                },
                                pageSize: pageSize,
                              }}
                            />
                          </Col>
                        </Row>
                      </Card>
                    ) : (
                      <Card
                        type="inner"
                        className="custom-card"
                        title={<b>Danh mục chứng từ</b>}
                      >
                        <Row>
                          <Col span={24}>
                            <Table
                              name={'productList'}
                              dataSource={
                                context?.lcRequest?.licensesContractType1
                              }
                              columns={columns}
                              // scroll={{ x: 1100 }}
                              pagination={{
                                onChange(current) {
                                  setPage(current);
                                },
                                pageSize: pageSize,
                              }}
                            />
                          </Col>
                        </Row>
                      </Card>
                    )}
                  </Col>
                </Row>
                <Row style={{ paddingBottom: 15 }}>
                  <Col span={24}>
                    <KTTitle size={3}>
                      <b>Điều kiện khác</b>
                    </KTTitle>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    Thời gian xuất trình
                    <span style={{ color: '#F5222D' }}></span>
                  </Col>
                  <Col span={16}>
                    <Form.Item name={'periodForPresentation'}>
                      <Input
                        onChange={(e) => {
                          onPeriodForPresentationChange(e);
                        }}
                        name={'periodForPresentation'}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    Đòi tiền bằng điện
                    <span style={{ color: '#F5222D' }}>*</span>
                  </Col>
                  <Col span={16}>
                    <Form.Item name={'ttReimbursement'}>
                      <Radio.Group
                        onChange={(e) => {
                          onTtReimbursementChange(e);
                        }}
                        defaultValue={true}
                      >
                        <Space direction="horizontal">
                          <Radio value={true}>Cho phép</Radio>
                          <Radio value={false}>Không cho phép</Radio>
                        </Space>
                      </Radio.Group>
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    Điều kiện khác <span style={{ color: '#F5222D' }}></span>
                  </Col>
                  <Col span={16}>
                    <Form.Item name={'otherCondition'}>
                      <TextArea
                        onChange={(e) => {
                          onOtherConditionChange(e);
                        }}
                        name={'otherCondition'}
                        placeholder="Nhập thông tin"
                        rows={4}
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

export default DocumentContent;
