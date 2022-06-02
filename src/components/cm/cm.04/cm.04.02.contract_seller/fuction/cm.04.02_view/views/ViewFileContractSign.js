import React, { useEffect, useState } from 'react';
import {
  Col,
  Row,
  Divider,
  Button,
  Form,
  Space,
  Checkbox,
  Modal,
  Input,
  message,
  Spin,
} from 'antd';
import Iframe from 'react-iframe';
import { KTTitle } from 'core/ui';
import '../../../components/less/CM.04.02.less';
import { useCM0402Domain } from '../domains/CM.04.02Domain';
import {
  CheckCircleFilled,
  CloseCircleFilled,
  EyeFilled,
} from '@ant-design/icons';

import SignSuccessModal from '../../../components/modal/sign/SignSuccessModal';
import CertificateModal from '../../../components/modal/sign/CertificateModal';
import CertificateDownloadModal from '../../../components/modal/sign/CertificateDownloadModal';

const ConstractInfomation = ({ lang = 'vi' }) => {
  // const [file, setUrlFile] = useState('https://www.orimi.com/pdf-test.pdf');
  const [file, setUrlFile] = useState('');
  const [form] = Form.useForm();
  const [formSign] = Form.useForm();
  const [formOTP] = Form.useForm();

  const [context, domain] = useCM0402Domain();

  useEffect(() => {
    console.log('Call init');
    domain.initSignDomain();
  }, []);

  useEffect(() => {
    console.log('context::: ', context);
    setUrlFile(context?.urlMinio);
  }, [context?.urlMinio]);

  function checkValidate(data) {
    if (data != undefined && data != null) {
      if (data.trim() != '') {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
  //-----reject----------//
  const handleRejectOk = (values) => {
    console.log('VALUES', values);
    var check = checkValidate(
      formSign.getFieldsValue('reasonReject').reasonReject,
    );
    if (check) {
      var reason = formSign.getFieldsValue('reasonReject')?.reasonReject;
      if (context?.showButtonConfirm) {
        domain.rejectConfirmMakerSeller(reason);
      } else if (context?.showButtonSign) {
        domain.rejectSignDigitalCheckerSeller(reason);
      }
    } else {
      message.error('Lý do từ chối không được bỏ trống !');
    }
  };

  //-----Submit----------//
  // ky so ca nhan, submit sau khi nhap otp
  const handleSubmitSignDigital = (values) => {
    console.log('VALUES', values);
    console.log('formOTP', formOTP);
    var otp = formOTP?.getFieldsValue('otp')?.otp;
    var check = checkValidate(otp);
    if (check) {
      domain.signDigitalCheckerSeller(otp);
    } else {
      message.error('Mã otp không được bỏ trống !');
    }
  };

  // ky so doanh nghiep lay tu extensions token
  function submitHandler(values) {
    if (context?.showButtonConfirm) {
      domain.submitSellerConfirm();
    } else if (context?.showButtonSign) {
      domain.openCertificateModal();

      // if (context?.certificateData != null) {
      //   // domain.submitSellerSignDigital();
      //   domain.signByTokenCheckerSeller();
      // } else {
      //   message.error('Vui lòng chọn chứng từ');
      // }
    }
  }

  return (
    <>
      <SignSuccessModal
        isVisbled={context?.showSignSuccess}
        onClose={domain.closeSignSuccessModal}
        onCloseModal={domain.closeSignSuccessModal}
      />

      <CertificateModal
        isVisbled={context?.showCertificateModal}
        onClose={domain.closeCertificateModal}
        onCloseModal={domain.closeCertificateModal}
      />

      <CertificateDownloadModal
        isVisbled={context?.showCertificateDownloadModal}
        onClose={domain.closeCertificateDownloadModal}
        onCloseModal={domain.closeCertificateDownloadModal}
      />

      <Modal
        centered
        visible={context?.showRejectVisible}
        onCancel={domain.closeRejectModal}
        footer={[
          <Row>
            <Col span={12}></Col>
            <Col span={12}>
              <Row
                style={{
                  float: 'right',
                }}
              >
                <Button
                  onClick={domain.closeRejectModal}
                  className="secondary-btn"
                >
                  Đóng
                </Button>
                <Button
                  onClick={handleRejectOk}
                  htmlType="submit"
                  style={{
                    color: '#FFFFFF',
                    backgroundColor: '#F5222D',
                  }}
                >
                  Từ chối
                </Button>
              </Row>
            </Col>
          </Row>,
          // <Button
          //   className="common-btn"
          //   onClick={handleRejectOk}
          //   htmlType="submit"
          // >
          //   Tiếp tục
          // </Button>,
          // <Button onClick={domain.closeRejectModal} className="secondary-btn">
          //   Đóng
          // </Button>,
        ]}
        size={3}
      >
        <Form
          form={formSign}
          // onFinish={handleRejectOk}
          // onFinishFailed={onFinishFailed}
          layout="horizontal"
        >
          <Row>
            <Col span={24}>
              <KTTitle size={3}>
                <b>Bạn có chắc chắn muốn từ chối ký số hợp đồng?</b>
              </KTTitle>
            </Col>
            <Col span={24}>
              <Row>Hành động này sẽ từ chối ký số hợp đồng?</Row>
            </Col>
          </Row>
          <Divider />
          <Row>
            <Col span={8}>
              <b>Lý do từ chối</b>
              <span className={'text-require'}>*</span>
            </Col>
            <Col span={16}>
              <Form.Item
                name={'reasonReject'}
                rules={[
                  {
                    whitespace: true,
                    required: true,
                    message: 'Trường lý do từ chối không được phép để trống!',
                  },
                  {
                    max: 1000,
                    message:
                      'Trường lý do từ chối chung không được vượt quá 1000 ký tự!',
                  },
                ]}
              >
                <Input
                  name="reasonReject"
                  placeholder="Nhập lý do từ chối"
                  // onChange={onChangeConstractText}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
      <Modal
        title="Ký số hợp đồng"
        centered
        visible={context?.showSignDigital}
        onCancel={domain.closeSignDigitalModal}
        footer={[
          <Button
            className="common-btn"
            onClick={handleSubmitSignDigital}
            htmlType="submit"
          >
            Tiếp tục
          </Button>,
          <Button
            onClick={domain.closeSignDigitalModal}
            className="secondary-btn"
          >
            Đóng
          </Button>,
        ]}
        size={3}
      >
        <Form
          form={formOTP}
          // onFinish={handleRejectOk}
          // onFinishFailed={onFinishFailed}
          layout="horizontal"
        >
          <Row>
            <Col span={8}>
              Mã OTP
              <span style={{ color: '#F5222D' }}>*</span>
            </Col>
            <Col span={16}>
              <Form.Item
                name={'otp'}
                rules={[
                  {
                    whitespace: true,
                    required: true,
                    message: 'Trường Mã OTP không được phép để trống!',
                  },
                  // {
                  //   max: 6,
                  //   message:
                  //     'Trường lý do từ chối chung không được vượt quá 6 ký tự!',
                  // },
                ]}
              >
                <Input name="otp" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>

      <div className="content-step">
        <Spin Spin size="large" spinning={context?.loading}>
          <Form
            form={form}
            onFinish={submitHandler}
            // onFinishFailed={onFinishFailed}
            layout="horizontal"
          >
            <div>
              <Row>
                <Col span={24}>
                  <Row>
                    <Col span={24}>
                      <Row style={{ paddingBottom: 15 }}>
                        <Col span={24}>
                          <KTTitle size={2}>
                            <b>Xem trước hợp đồng</b>
                          </KTTitle>
                        </Col>
                        <Divider className="divider-customer" />
                      </Row>

                      <Iframe
                        url={file}
                        className={'preview-pdf'}
                        display="initial"
                        position="relative"
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row
                style={{
                  display: context?.showButtonSign ? 'flex' : 'none',
                }}
              >
                <Col span={24}>
                  <Form.Item
                    name="checkboxContract"
                    valuePropName="checked"
                    initialValue={'checked'}
                    rules={[
                      {
                        validator: (_, value) =>
                          value
                            ? Promise.resolve()
                            : Promise.reject(
                                new Error(
                                  'Quý khách vui lòng đồng ý với các điều kiện và điều khoản',
                                ),
                              ),
                      },
                    ]}
                  >
                    <Checkbox>
                      Tôi đã đọc, hiểu, đồng ý với nội dung của văn bản điện tử
                      và thống nhất sử dụng phương thức điện tử để giao dịch
                    </Checkbox>
                  </Form.Item>
                </Col>
              </Row>
              <Row
                style={{
                  display: context?.showButtonSign ? 'flex' : 'none',
                }}
              >
                <Col span={24}>
                  <Form.Item
                    name="checkboxAnnex"
                    valuePropName="checked"
                    initialValue={'checked'}
                    rules={[
                      {
                        validator: (_, value) =>
                          value
                            ? Promise.resolve()
                            : Promise.reject(
                                new Error(
                                  'Quý khách vui lòng đồng ý với các điều kiện và điều khoản',
                                ),
                              ),
                      },
                    ]}
                  >
                    <Checkbox checked>
                      Các phụ lục đi kèm là một phần không thể tách rời của Hợp
                      đồng
                    </Checkbox>
                  </Form.Item>
                </Col>
              </Row>

              <Row className="padding-md">
                <Col span={24}>
                  <Form.Item>
                    <Row>
                      <Col span={12}>
                        <Button
                          onClick={domain.exitHandler}
                          className=" button-previous"
                        >
                          {'< Quay lại'}
                        </Button>
                      </Col>
                      <Col span={12}>
                        <Space
                          direction="horizontal"
                          size={16}
                          style={{
                            display: context?.showButtonConfirm
                              ? 'flex'
                              : 'none',
                            marginRight: 'auto',
                          }}
                        >
                          <Button
                            className="button-delete"
                            onClick={(e) => {
                              domain.openRejectModal();
                            }}
                          >
                            Từ chối{' '}
                            <CloseCircleFilled className={'icon-delete'} />
                          </Button>
                          <Button
                            className="common-btn button-next"
                            htmlType="submit"
                          >
                            Xác nhận
                            <CheckCircleFilled className={'icon-check'} />
                          </Button>
                        </Space>
                        <Space
                          direction="horizontal"
                          size={16}
                          style={{
                            display: context?.showButtonSign ? 'flex' : 'none',
                            marginRight: 'auto',
                          }}
                        >
                          <Button
                            className="button-delete"
                            onClick={(e) => {
                              domain.openRejectModal();
                            }}
                          >
                            Từ chối{' '}
                            <CloseCircleFilled className={'icon-delete'} />
                          </Button>
                          {/* <Button
                            className="common-btn button-next"
                            onClick={(e) => {
                              domain.openCertificateModal();
                            }}
                          >
                            Lấy chứng thư số
                            <EyeFilled id={'icon-certicate'} />
                          </Button> */}
                          <Button
                            className="common-btn button-next"
                            htmlType="submit"
                          >
                            Ký số
                            <CheckCircleFilled className={'icon-check'} />
                          </Button>
                        </Space>
                      </Col>
                    </Row>
                  </Form.Item>
                </Col>
              </Row>
            </div>
          </Form>
        </Spin>
      </div>
    </>
  );
};
export default ConstractInfomation;
