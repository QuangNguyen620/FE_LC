import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';
import { Col, Row, Form, Select, Input, Button, Space, message } from 'antd';
import { KTTitle } from 'core/ui';
import '../../../common/less/AM.03.01.01.less';
import './AM.03.01.01FeeBank_Edit.less';
import { useParams } from 'react-router-dom';
import { useA00Domain } from '../domains/AM.03.01.01Domain';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';

import UpdateBankFeeSuccessfulModal from '../views/modal/UpdateSuccessfullModal';
import UpdateBankFeeFailedModal from '../views/modal/UpdateFailedModal';
import { ErrorsCode } from 'core/utils/constants';

var axios = require('axios');

const { Option } = Select;

const feeProcedures = [
  { label: 'Định kì', value: 'periodic' },
  { label: 'Giao dịch', value: 'by-service' },
];

const frequencies = [
  { label: 'Tháng', value: 'month' },
  { label: 'Quý', value: 'quarter' },
  { label: 'Nửa năm', value: 'half-year' },
  { label: 'Năm', value: 'year' },
];

const feeApply = [{ label: 'Cuối kì', value: 'end-of-frequency' }];

toast.configure();

const AM010103ForgetPassView = ({ lang = 'vi', ...props }) => {
  const { t } = useTranslation();
  const { id } = useParams();
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

  const [bankFee, setBankFee] = useState({});
  const [feeProcedureOptions, setFeeProcedures] = useState(feeProcedures);
  const [frequencyOptions, setFrequencies] = useState(frequencies);
  const [feeApplyOptions, setFeeApplyOptions] = useState(feeApply);

  const [showUpdateSuccessfull, setShowUpdateSuccessfull] = useState(false);
  const [showUpdateFailed, setShowUpdateFailed] = useState(false);

  useEffect(() => {
    const fetchData = () => {
      var configPromise = domain.getBankFee(id);

      configPromise
        .then((result) => {
          axios(result)
            .then(function (response) {
              console.log(response.data.data);
              var element = response.data.data;

              var feeProcedure = '';
              var feeFrequency = '';
              var feeApply = '';

              switch (element.feeProcedure) {
                case 'periodic':
                  feeProcedure = 'Định kì';
                  break;
                case 'by-service':
                  feeProcedure = 'Giao dịch';
                  break;
                default:
                  feeProcedure = '';
                  break;
              }

              switch (element.feeFrequency) {
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

              switch (element.feeApply) {
                case 'end-of-frequency':
                  feeApply = 'Cuối kì';
                  break;

                default:
                  feeApply = '';
                  break;
              }

              form.setFieldsValue({
                feeCode: element.feeCode,
                feeName: element.feeName,
                feeProcedure: feeProcedure,
                frequency: feeFrequency,
                feeApply: feeApply,
                description: element.feeDescription,
                status:
                  element.feeStatus == 1 ? 'Hoạt động' : 'Ngừng hoạt động',
              });

              setBankFee(element);
              setInput({
                ...userInput,
                feeCode: element.feeCode,
                feeName: element.feeName,
                feeProcedure: element.feeProcedure,
                frequency: element.feeFrequency,
                feeApply: element.feeApply,
                description: element.feeDescription,
                status: element.feeStatus,
              });
            })
            .catch(function (error) {
              console.log(error.response.data);
            });
        })
        .catch((err) => console.log('hieutt---' + err));
    };

    fetchData();
  }, [id, form]);

  // useEffect(() => {
  //   setFeeProcedures(feeProcedures);
  //   setFrequencies(frequencies);
  //   setFeeApplyOptions(feeApplyOptions);
  // setInput({
  //   ...userInput,
  //   feeProcedure: feeProcedures[0].value,
  //   frequency: frequencies[0].value,
  //   feeApply: feeApply[0].value,
  //   status: 1,
  // });
  // }, []);

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
      feeId: parseInt(id),
    };

    console.log('Received values of form: ', data);

    var configPromise = domain.editBankFee(data);
    configPromise
      .then((result) => {
        axios(result)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
            if (response.data.success) {
              if (response.data.code == 200) {
                message.info(response.data.message);
                setTimeout(() => {
                  domain.exitHandler(id);
                }, 1000);
              }
            } else {
              message.error(response.data.message);
              //message.error('Cập nhật không thành công');
            }
            // setShowUpdateSuccessfull(true);
          })
          .catch(function (error) {
            console.log(error);
            message.error('Cập nhật không thành công');
            // setShowUpdateFailed(true);
          });
      })
      .catch((err) => console.log('hieutt---' + err));
  };
  //-------------------------------------//
  //------------------------------//

  function closeUpdateSuccessfulModal() {
    setShowUpdateSuccessfull(false);
    domain.exitHandler(id);
  }

  function closeUpdateFailedModal() {
    setShowUpdateFailed(false);
  }

  return (
    <>
      <UpdateBankFeeSuccessfulModal
        isVisbled={showUpdateSuccessfull}
        onClose={closeUpdateSuccessfulModal}
        onCloseModal={closeUpdateSuccessfulModal}
      />

      <UpdateBankFeeFailedModal
        isVisbled={showUpdateFailed}
        onClose={closeUpdateFailedModal}
        onCloseModal={closeUpdateFailedModal}
      />

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
            <KTTitle size={4}>Sửa</KTTitle>
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
                    <Input disabled onChange={feeCodeChange} />
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
                    // bankFee.feeProcedure == feeProcedureOptions[0].value ||
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
                      onClick={(e) => {
                        domain.exitHandler(id);
                      }}
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
