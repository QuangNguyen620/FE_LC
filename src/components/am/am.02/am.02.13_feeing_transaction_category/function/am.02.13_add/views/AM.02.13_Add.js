import React from 'react';
import { useTranslation } from 'react-i18next';
import { Col, Row, Form, Select, Input, Button, Space } from 'antd';
import { KTTitle } from 'core/ui';
import '../../../common/less/AM.02.13.less';
import { useA00Domain } from '../domains/AM.02.13Domain';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';

import { message } from 'antd';
import CreateFeeTransactionSuccessfull from '../../../common/modal/add/modal/CreateSuccessfullModal';
import TransactionCodeExisted from '../../../common/modal/add/modal/DataExistedModal';
import { ErrorsCode } from 'core/utils/constants';
var axios = require('axios');

const { Option } = Select;

const feeTransactionChannels = [
  { value: 'BANK', label: 'Ngân hàng' },
  { value: 'CORPORATE', label: 'Doanh nghiệp' },
];

const AM0213Add = ({ lang = 'vi', ...props }) => {
  const { t } = useTranslation();
  const [, domain] = useA00Domain();
  const history = useHistory();

  const [form] = Form.useForm();
  //Value state
  const [userInput, setInput] = useState({
    feeTransactionCode: '',
    feeTransactionName: '',
    feeTransactionChannel: '',
    feeTransactionStatus: '',
  });

  const [channelOptions, setChannelOptions] = useState(feeTransactionChannels);
  const [showSuccessfull, setShowSuccessfull] = useState(false);
  const [showExisted, setShowExisted] = useState(false);
  //------------------------------//

  useEffect(() => {
    setChannelOptions(feeTransactionChannels);
    setInput({
      ...userInput,
      feeTransactionChannel: feeTransactionChannels[0].value,
      feeTransactionStatus: 1,
    });
  }, []);

  const transactionCodeChange = (event) => {
    setInput({
      ...userInput,
      feeTransactionCode: event.target.value,
    });
  };

  const transactionNameChange = (event) => {
    setInput({
      ...userInput,
      feeTransactionName: event.target.value,
    });
  };

  const statusChange = (value) => {
    setInput({
      ...userInput,
      feeTransactionStatus: value,
    });
  };

  const channelChange = (value) => {
    setInput({
      ...userInput,
      feeTransactionChannel: value,
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  // Add new user group--------------
  const submitHandler = () => {
    var data = {
      feeTransactionCode: userInput.feeTransactionCode.trim(),
      feeTransactionName: userInput.feeTransactionName.trim(),
      feeTransactionChannel: userInput.feeTransactionChannel,
      feeTransactionStatus: userInput.feeTransactionStatus,
    };

    console.log('Received values of form: ', data);

    var configPromise = domain.addNewFeeTransaction(data);
    configPromise
      .then((result) => {
        axios(result)
          .then(function (response) {
            console.log(response);
            if (response.data.success) {
              if (response.data.code == 201) {
                message.success('Thêm mới thành công');
                setTimeout(() => {
                  domain.exitHandler();
                }, 1000);
              }
            } else {
              message.error(response.data.message);
              // if (response.data.code == ErrorsCode.BAD_REQUEST) {
              //   message.error(
              //     'Trường mã loại giao dịch tính phí không được phép trùng lặp',
              //   );
              // }
            }
            // setShowSuccessfull(true);
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
    history.push('/home/fee-transaction');
  }

  function closeExistedModal() {
    setShowExisted(false);
  }

  return (
    <>
      <CreateFeeTransactionSuccessfull
        isVisbled={showSuccessfull}
        onCloseModal={closeCreateSuccessfullModal}
        onClose={closeCreateSuccessfullModal}
      />

      <TransactionCodeExisted
        isVisbled={showExisted}
        onCloseModal={closeExistedModal}
        onClose={closeExistedModal}
      />

      <div className={'main-container'}>
        <Row className={'padding-title'}>
          <Col span={24}>
            <KTTitle size={3}>
              <b>Danh mục loại giao dịch tính phí</b>
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
                      {
                        whitespace: true,
                        message:
                          'Trường mã giao dịch tính phí không được phép nhập khoảng trắng!',
                      },
                      {
                        max: 10,
                        message:
                          'Trường mã giao dịch tính phí không được phép vượt quá 10 ký tự!',
                      },
                    ]}
                  >
                    <Input onChange={transactionCodeChange} />
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col span={8}>
                  Tên loại giao dịch <span className={'text-require'}>*</span>
                </Col>
                <Col span={16}>
                  <Form.Item
                    name={'feeTransactionName'}
                    rules={[
                      {
                        required: true,
                        message:
                          'Trường tên loại giao dịch không được phép để trống!',
                      },
                      {
                        whitespace: true,
                        message:
                          'Trường tên loại giao dịch không được phép nhập khoảng trắng!',
                      },
                      {
                        max: 300,
                        message:
                          'Trường tên loại giao dịch không được phép vượt quá 300 ký tự!',
                      },
                    ]}
                  >
                    <Input onChange={transactionNameChange} />
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col span={8}>
                  Phân loại kênh<span className={'text-require'}>*</span>
                </Col>
                <Col span={16}>
                  <Form.Item name={'feeTransactionChannel'}>
                    <Select
                      onChange={channelChange}
                      defaultValue={channelOptions[0].value}
                    >
                      {channelOptions.map((channel) => (
                        <Select.Option value={channel.value}>
                          {channel.label}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col span={8}>
                  Trạng thái <span className={'text-require'}>*</span>
                </Col>
                <Col span={16}>
                  <Form.Item name={'feeTransactionStatus'}>
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

export default AM0213Add;
