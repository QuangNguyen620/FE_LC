import React from 'react';
import { useTranslation } from 'react-i18next';
import { Col, Row, Form, Select, Input, Button, Space } from 'antd';
import { KTTitle } from 'core/ui';
import '../../../common/less/AM.02.13.less';
import { useA00Domain } from '../domains/AM.02.13Domain';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';

import DeleteTransactionModal from '../../../common/modal/delete/modal/DeleteTransactionFeeModal';
import DeleteTransactionSuccessfulModal from '../../../common/modal/delete/modal/DeleteTransactionFeeSuccessfull';
import DeleteTransactionFailedModal from '../../../common/modal/delete/modal/DeleteTransactionFeelFailed';
import { ErrorsCode } from 'core/utils/constants';

var axios = require('axios');
const { Option } = Select;

const feeTransactionChannels = [
  { value: 'BANK', label: 'Ngân hàng' },
  { value: 'CORPORATE', label: 'Doanh nghiệp' },
];

const AM0213View = ({ lang = 'vi', ...props }) => {
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

  const [channelOptions, setChannelOptions] = useState(feeTransactionChannels);
  const [showDelete, setShowDelete] = useState(false);
  const [showDeleteSuccessfull, setShowDeleteSuccessfull] = useState(false);
  const [showDeleteFailed, setShowDeleteFailed] = useState(false);

  useEffect(() => {
    const fetchData = () => {
      var configPromise = domain.getBankFeeTransaction(id);

      configPromise
        .then((result) => {
          axios(result)
            .then(function (response) {
              console.log(response.data.data);
              var element = response.data.data;
              form.setFieldsValue({
                feeTransactionCode: element.feeTransactionCode,
                feeTransactionName: element.feeTransactionName,
                feeTransactionChannel:
                  element.feeTransactionChannel == 'BANK'
                    ? 'Ngân hàng'
                    : 'Doanh nghiệp',
                feeTransactionStatus:
                  element.feeTransactionStatus == '1'
                    ? 'Hoạt động'
                    : 'Ngừng hoạt động',
              });
            })
            .catch(function (error) {
              console.log(error?.response?.data);
            });
        })
        .catch((err) => console.log('hieutt---' + err));
    };

    fetchData();
  }, [id, form]);

  //------------------------------//
  function openDeleteModal() {
    setShowDelete(true);
  }

  function closeDeleteModal(data) {
    setShowDelete(false);
  }

  function closeDeleteSuccessfulModal(data) {
    setShowDeleteSuccessfull(false);
    domain.exitHandler();
  }

  function closeDeleteFailedModal(data) {
    setShowDeleteFailed(false);
  }

  //-----delete----------//
  const handleDeleteOk = () => {
    var configPromise = domain.deleteBankFeeTransaction(id);

    configPromise
      .then((result) => {
        axios(result)
          .then(function (response) {
            console.log('response::', response);
            if (response.data.success) {
              if (response.data.code == 200) {
                setShowDeleteSuccessfull(true);
              }
            } else {
              if (response.data.code == ErrorsCode.BAD_REQUEST) {
                setShowDeleteFailed(true);
              }
            }
          })
          .catch(function (error) {
            console.log(error.response);
            setShowDeleteFailed(true);
          });
      })
      .catch((err) => console.log('hieutt---' + err));
  };

  return (
    <>
      <DeleteTransactionModal
        isVisbled={showDelete}
        onCloseModal={closeDeleteModal}
        deleteHandler={handleDeleteOk}
      />

      <DeleteTransactionSuccessfulModal
        isVisbled={showDeleteSuccessfull}
        onClose={closeDeleteSuccessfulModal}
        onCloseModal={closeDeleteSuccessfulModal}
      />

      <DeleteTransactionFailedModal
        isVisbled={showDeleteFailed}
        onClose={closeDeleteFailedModal}
        onCloseModal={closeDeleteFailedModal}
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
            <KTTitle size={4}>Xem</KTTitle>
          </Col>
        </Row>
        <Row className="padding-md">
          <Col span={24}>
            <Form form={form} layout="horizontal">
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
                  <Form.Item name={'feeTransactionName'}>
                    <Input disabled />
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col span={8}>
                  Phân loại kênh<span className={'text-require'}>*</span>
                </Col>
                <Col span={16}>
                  <Form.Item name={'feeTransactionChannel'}>
                    <Select disabled defaultValue={channelOptions[0].value}>
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
                    <Select disabled defaultValue="1">
                      <Select.Option value="1">Hoạt động</Select.Option>
                      <Select.Option value="0">Ngừng hoạt động</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <div id="form-footer">
                <Form.Item>
                  <Space className={'padding-buton'}>
                    <Button
                      className="common-btn"
                      onClick={(e) => {
                        domain.editHandler(id);
                      }}
                    >
                      Sửa
                    </Button>
                    <Button
                      className="common-btn"
                      onClick={(e) => {
                        openDeleteModal();
                      }}
                    >
                      Xóa
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

export default AM0213View;
