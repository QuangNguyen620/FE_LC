import React from 'react';
import { useTranslation } from 'react-i18next';
import { Col, Row, Form, Select, Input, Button, Space, message } from 'antd';
import { KTTitle } from 'core/ui';
import '../../../common/less/AM.02.13.less';
import { useA00Domain } from '../domains/AM.02.13Domain';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';
import UpdateTransactionSuccessful from '../../../common/modal/edit/modal/UpdateSuccessfullModal';
import UpdateTransactionFailed from '../../../common/modal/edit/modal/UpdateFailedModal';
var axios = require('axios');

const { Option } = Select;

const feeTransactionChannels = [
  { value: 'BANK', label: 'Ngân hàng' },
  { value: 'CORPORATE', label: 'Doanh nghiệp' },
];

const AM0213Edit = ({ lang = 'vi', ...props }) => {
  const { id } = useParams();
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

  const [feeTransaction, setFeeTransaction] = useState({});

  const [channelOptions, setChannelOptions] = useState(feeTransactionChannels);
  const [showSuccessfull, setShowSuccessfull] = useState(false);
  const [showFailed, setShowFailed] = useState(false);

  useEffect(() => {
    const fetchData = () => {
      var configPromise = domain.getBankFeeTransaction(id);

      configPromise
        .then((result) => {
          axios(result)
            .then(function (response) {
              var element = response.data.data;
              console.log(element);
              setFeeTransaction(element);
              form.setFieldsValue({
                feeTransactionCode: element.feeTransactionCode,
                feeTransactionName: element.feeTransactionName,
                feeTransactionChannel: element.feeTransactionChannel,
                feeTransactionStatus: element.feeTransactionStatus,
                // feeTransactionChannel:
                //   element.feeTransactionChannel.toLowerCase() == 'bank'
                //     ? 'Ngân hàng'
                //     : '',
                // feeTransactionStatus:
                //   element.feeTransactionStatus == '1'
                //     ? 'Hoạt động'
                //     : 'Ngừng hoạt động',
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

  //--------------------------------//

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

  //------------------------------//

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  //-----Edit fee transaction----//
  const submitHandler = () => {
    var data = {
      feeTransactionId: id,
      feeTransactionCode: feeTransaction.feeTransactionCode.trim(),
      feeTransactionName:
        userInput.feeTransactionName == ''
          ? feeTransaction.feeTransactionName
          : userInput.feeTransactionName.trim(),
      feeTransactionChannel:
        userInput.feeTransactionChannel == ''
          ? feeTransaction.feeTransactionChannel
          : userInput.feeTransactionChannel,
      feeTransactionStatus:
        userInput.feeTransactionStatus === ''
          ? feeTransaction.feeTransactionStatus
          : userInput.feeTransactionStatus,
    };

    console.log('Received values of form: ', data);

    var configPromise = domain.editBankFeeTransaction(data);
    configPromise
      .then((result) => {
        axios(result)
          .then(function (response) {
            console.log(response);
            if (response.data.success) {
              if (response.data.code == 200) {
                message.success(response.data.message);
                setTimeout(() => {
                  domain.exitHandler(id);
                }, 1000);
              }
            } else {
              message.error(response.data.message);
            }
            // setShowSuccessfull(true);
          })
          .catch(function (error) {
            console.log(error);
            // if (error.response.data.data == 'Create UserGroup already exist') {
            //   console.log('Trùng mã nhóm người dùng');
            //   // setShowExistedGroup(true);
            // }
          });
      })
      .catch((err) => console.log('hieutt---' + err));
  };
  //-------------------------------------//
  function closeUpdateSuccessfulModal(data) {
    setShowSuccessfull(false);
    history.push('/home/fee-transaction/view/' + id + '');
  }

  return (
    <>
      <UpdateTransactionSuccessful
        isVisbled={showSuccessfull}
        onClose={closeUpdateSuccessfulModal}
        onCloseModal={closeUpdateSuccessfulModal}
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
            <KTTitle size={4}>Chỉnh sửa</KTTitle>
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
                  <Form.Item name={'feeTransactionCode'}>
                    <Input disabled />
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
                      <Select.Option value={1}>Hoạt động</Select.Option>
                      <Select.Option value={0}>Ngừng hoạt động</Select.Option>
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

export default AM0213Edit;
