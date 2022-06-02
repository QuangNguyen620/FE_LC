import React from 'react';
import {} from 'antd';
import { Col, Row, Input, Form, Button, Modal } from 'antd';
import { KTTitle } from 'core/ui';
import { useTranslation } from 'react-i18next';
import {} from '@ant-design/icons';
import '../../less/CM.07.less';
import '../../../../../../assets/less/LC-common.less';
import { message } from 'antd';
import { CM0708Domain } from '../../../function/cm.07.08/domains/CM.07.Domain';

const OTPModal = ({ lang = 'vi', ...props }) => {
  const { t } = useTranslation();
  const [formOTP] = Form.useForm();
  const [context, domain] = CM0708Domain();

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

  // ky so ca nhan, submit sau khi nhap otp
  const handleSubmitSignDigital = (values) => {
    console.log('VALUES', values);
    console.log('formOTP', formOTP);
    var otp = formOTP?.getFieldsValue('otp')?.otp;
    var check = checkValidate(otp);
    if (check) {
      domain.signDigitalAccountant(otp);
    } else {
      message.error('Mã otp không được bỏ trống !');
    }
  };

  return (
    <>
      <Modal
        title="Ký số hợp đồng"
        centered
        visible={context?.showFormOTPModal}
        onCancel={domain.closeFormOTPModal}
        footer={[
          <Button
            className="common-btn"
            onClick={handleSubmitSignDigital}
            htmlType="submit"
          >
            Tiếp tục
          </Button>,
          <Button
            onClick={domain.closeFormOTPModal}
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
    </>
  );
};
export default OTPModal;
