import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';
import { Col, Row, Form, Select, Input, Button, Space, message } from 'antd';
import { KTTitle } from 'core/ui';

import '../../../common/less/AM.03.01.01.less';
import '../../../../../../../../assets/less/LC-common.less';

import { useA00Domain } from '../domains/AM.03.01.01Domain';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { ErrorsCode } from 'core/utils/constants';

var axios = require('axios');

const { Option } = Select;

const feeProcedures = [
  { label: 'Định kỳ', value: 'periodic' },
  { label: 'Giao dịch', value: 'by-service' },
];

const frequencies = [
  { label: 'Tháng', value: 'month' },
  { label: 'Quý', value: 'quarter' },
  { label: 'Nửa năm', value: 'half-year' },
  { label: 'Năm', value: 'year' },
];

const feeApply = [{ label: 'Cuối kỳ', value: 'end-of-frequency' }];

toast.configure();

const AM010103ForgetPassView = ({ lang = 'vi', ...props }) => {
  const { t } = useTranslation();
  const [, domain] = useA00Domain();
  const history = useHistory();
  const notify = (message) => toast.success(message);
  const [show, setShow] = useState(false);
  const [showExistedGroup, setShowExistedGroup] = useState(false);
  const [form] = Form.useForm();
  //Value state
  const [userInput, setInput] = useState({
    feeCode: '',
    feeName: '',
    feeProcedure: '',
    frequency: '',
    feeApply: '',
    description: '',
    status: 1,
  });

  const [feeProcedureOptions, setFeeProcedures] = useState(feeProcedures);
  const [frequencyOptions, setFrequencies] = useState(frequencies);
  const [feeApplyOptions, setFeeApplyOptions] = useState(feeApply);

  useEffect(() => {
    setFeeProcedures(feeProcedures);
    setFrequencies(frequencies);
    setFeeApplyOptions(feeApplyOptions);
    setInput({
      ...userInput,
      feeProcedure: feeProcedures[0].value,
      frequency: frequencies[0].value,
      feeApply: feeApply[0].value,
      status: 1,
    });
  }, []);

  // //input value change

  const feeCodeChange = (event) => {
    var feeCode = event.target.value;
    if (feeCode.trim() != '' || feeCode.trim() != null) {
      setInput({
        ...userInput,
        feeCode: feeCode.trim(),
      });
    }
  };

  const feeNameChange = (event) => {
    var feeName = event.target.value;
    if (feeName.trim() != '' || feeName.trim() != null) {
      setInput({
        ...userInput,
        feeName: feeName.trim(),
      });
    }
  };

  const feeProcedureChange = (value) => {
    setInput({
      ...userInput,
      feeProcedure: value,
    });
  };

  const frequencyChange = (value) => {
    console.log(value);
    setInput({
      ...userInput,
      frequency: value,
    });
  };

  const feeApplyChange = (value) => {
    setInput({
      ...userInput,
      feeApply: value,
    });
  };

  const statusChange = (value) => {
    setInput({
      ...userInput,
      status: value,
    });
  };
  const desciptionChange = (event) => {
    setInput({
      ...userInput,
      description: event.target.value.trim(),
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  // Add new user group--------------
  const submitHandler = () => {
    var data = {
      feeCode: userInput.feeCode,
      feeName: userInput.feeName,
      feeProcedure: userInput.feeProcedure,
      feeFrequency:
        userInput.feeProcedure == feeProcedureOptions[0].value
          ? userInput.frequency
          : '',
      feeApply:
        userInput.feeProcedure == feeProcedureOptions[0].value
          ? userInput.feeApply
          : '',
      feeDescription: userInput.description,
      feeStatus: userInput.status,
      feeChannel: 'BANK',
      feeId: 0,
    };

    console.log('Received values of form: ', data);

    var configPromise = domain.addNewFee(data);
    configPromise
      .then((result) => {
        axios(result)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
            if (response.data.code == ErrorsCode.BAD_REQUEST) {
              message.info(response.data.message);
            }
            if (response.data.code == 201) {
              message.info(response.data.message);
              setTimeout(() => {
                domain.exitHandler();
              }, 1000);
            }
          })
          .catch(function (error) {
            console.log(error);
            // if (error.response.data.data == 'Create UserGroup already exist') {
            //   console.log('Trùng mã nhóm người dùng');
            //   setShowExistedGroup(true);
            // }
          });
      })
      .catch((err) => console.log('hieutt---' + err));
  };
  //-------------------------------------//

  // function closeCreateSuccessfullModal() {
  //   setShow(false);
  //   history.push('/home/fee-bank-manage');
  // }

  // function closeExistedGroupModal() {
  //   setShowExistedGroup(false);
  // }

  return (
    <>
      <div className={'main-container'}>
        <Row className={'padding-title'}>
          <Col span={24}>
            <KTTitle size={3}>
              <b>Danh mục loại phí ngân hàng</b>
            </KTTitle>
          </Col>
        </Row>
        <Row className={'padding-title-sub'}>
          <Col span={24}>
            <KTTitle size={4}>Thêm mới</KTTitle>
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
                        whitespace: true,
                        required: true,
                        message: 'Trường mã loại phí không được phép để trống!',
                      },
                      {
                        max: 30,
                        message:
                          'Trường mã loại phí không được phép vượt quá 30 kí tự!',
                      },
                    ]}
                  >
                    <Input onChange={feeCodeChange} />
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col span={8}>
                  Tên loại phí <span className={'text-require'}>*</span>
                </Col>
                <Col span={16}>
                  <Form.Item
                    name={'feeName'}
                    rules={[
                      {
                        whitespace: true,
                        required: true,
                        message:
                          'Trường tên loại phí không được phép để trống!',
                      },
                      {
                        max: 300,
                        message:
                          'Trường tên loại phí không được phép vượt quá 300 kí tự!',
                      },
                    ]}
                  >
                    <Input onChange={feeNameChange} />
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col span={8}>
                  Phương thức tính <span className={'text-require'}>*</span>
                </Col>
                <Col span={16}>
                  <Form.Item name={'feeProcedure'}>
                    <Select
                      onChange={feeProcedureChange}
                      defaultValue={feeProcedureOptions[0].value}
                    >
                      {feeProcedureOptions.map((feeProcedure) => (
                        <Select.Option value={feeProcedure.value}>
                          {feeProcedure.label}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Row
                style={{
                  display:
                    userInput.feeProcedure == feeProcedureOptions[0].value
                      ? 'flex'
                      : 'none',
                }}
              >
                <Col span={8}>
                  Tần suất tính <span className={'text-require'}></span>
                </Col>
                <Col span={16}>
                  <Form.Item name={'frequency'}>
                    <Select
                      onChange={frequencyChange}
                      // value={userInput.branch_level}
                      defaultValue={frequencyOptions[0].value}
                    >
                      {frequencyOptions.map((frequency) => (
                        <Select.Option value={frequency.value}>
                          {frequency.label}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Row
                style={{
                  display:
                    userInput.feeProcedure == feeProcedureOptions[0].value
                      ? 'flex'
                      : 'none',
                }}
              >
                <Col span={8}>
                  Ngày tính <span className={'text-require'}></span>
                </Col>
                <Col span={16}>
                  <Form.Item name={'feeApply'}>
                    <Select
                      onChange={feeApplyChange}
                      defaultValue={feeApplyOptions[0].value}
                    >
                      {feeApplyOptions.map((feeApply) => (
                        <Select.Option value={feeApply.value}>
                          {feeApply.label}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={8}>Mô tả </Col>
                <Col span={16}>
                  <Form.Item
                    name={'description'}
                    rules={[
                      {
                        max: 255,
                        message:
                          'Trường mô tả không được phép vượt quá 255 kí tự!',
                      },
                    ]}
                  >
                    <Input onChange={desciptionChange} />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={8}>
                  Trạng thái <span className={'text-require'}>*</span>
                </Col>
                <Col span={16}>
                  <Form.Item name={'status'}>
                    <Select onChange={statusChange} defaultValue="1">
                      <Select.Option value="1">Hoạt động</Select.Option>
                      <Select.Option value="0">Ngừng hoạt động</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

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

export default AM010103ForgetPassView;
