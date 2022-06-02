import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Col,
  Row,
  Input,
  Button,
  Form,
  Divider,
  Modal,
  message,
  Card,
  Spin,
} from 'antd';
import '../../../component/less/CM.07.less';
import '../../../../../../assets/less/LC-common.less';
import { CM0708Domain } from '../domains/CM.07.Domain';
import {
  CheckOutlined,
  CloseCircleFilled,
  WarningFilled,
} from '@ant-design/icons';
import { KTTitle } from 'core/ui';
import Iframe from 'react-iframe';
import OTPModal from 'components/cm/cm.07.lc-releash-request/component/modal/sign/OTPModal';
import CertificateModal from 'components/cm/cm.07.lc-releash-request/component/modal/sign/CertificateModal';
import CertificateDownloadModal from 'components/cm/cm.07.lc-releash-request/component/modal/sign/CertificateDownloadModal';
import { useParams } from 'react-router-dom';
var axios = require('axios');

const CM0702View = ({ lang = 'vi', ...props }) => {
  const { t } = useTranslation();
  const [context, domain] = CM0708Domain();
  const [file, setUrlFile] = useState('');
  const [formSign] = Form.useForm();
  const { id } = useParams();

  useEffect(() => {
    domain.initDomain();
  }, []);

  useEffect(() => {
    console.log('context::: ', context);
    setUrlFile(context?.lcApplication?.urlViewFileKySo);
  }, [context?.lcApplication]);

  function checkValidate(data) {
    if (data != undefined && data != null) {
      return data.trim() != '';
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
      if (context?.viewBtnSignAccountant) {
        domain.rejectDigitalAccountant(reason);
      } else if (context?.viewBtnSignCorporate) {
        console.log('tu choi ben doanh nghiệp');
        domain.rejectDigitalAccountant(reason);
      }
    } else {
      message.error('Lý do từ chối không được bỏ trống !');
    }
  };

  return (
    <Spin Spin size="large" spinning={context?.loading}>
      <OTPModal />
      <CertificateModal />
      <CertificateDownloadModal />

      <Modal
        centered
        title={
          <KTTitle size={2}>
            {' '}
            <span>
              <WarningFilled
                style={{
                  color: 'orange',
                  marginRight: '8px',
                  fontSize: '23px',
                }}
              />
            </span>
            <b>Bạn có chắc chắn muốn từ chối ký số?</b>
          </KTTitle>
        }
        visible={context?.showRejectVisible}
        // visible={true}
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
                  // className="secondary-btn"
                >
                  Quay lại
                </Button>
                <Button
                  onClick={handleRejectOk}
                  htmlType="submit"
                  style={{
                    color: '#FFF',
                    backgroundColor: '#fa8c16',
                  }}
                >
                  Xác nhận từ chối
                </Button>
              </Row>
            </Col>
          </Row>,
        ]}
        size={3}
      >
        <Form form={formSign} layout="horizontal">
          <Row>
            <Col span={24}>
              <b>Vui lòng nhập lý do từ chối</b>
              <span className={'text-require'}> *</span>
            </Col>
            <Col span={24}>
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

      <div style={{ background: 'white', borderRadius: '5px' }}>
        <Row style={{ padding: 16 }}>
          <Col span={24}>
            <Form layout="horizontal">
              <Row>
                <Col span={24}>
                  <Form.Item>
                    <Iframe
                      url={file}
                      className={'preview-pdf'}
                      display="initial"
                      position="relative"
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>

        <div style={{ background: 'white', borderRadius: '5px' }}>
          <Row style={{ padding: 16 }}>
            <Col span={24}>
              <Form layout="horizontal">
                <Row>
                  <Col span={24}>
                    <Iframe
                      url={file}
                      className={'preview-pdf'}
                      display="initial"
                      position="relative"
                    />
                  </Col>
                  <Col span={12}>
                    {context?.viewBtnSignAccountant && (
                      <div>
                        <Button
                          className=" right-step-action common-btn"
                          onClick={domain.submitAccountantSignDigital}
                        >
                          Ký số kế toán trưởng
                          <span style={{ marginLeft: '5px' }}>
                            <CheckOutlined />
                          </span>
                        </Button>
                        <Button
                          className="right-step-action delete-btn"
                          onClick={domain.openRejectModal}
                        >
                          Từ chối
                          <span style={{ marginRight: '5px' }}>
                            <CloseCircleFilled />
                          </span>
                        </Button>
                      </div>
                    )}
                    {context?.viewBtnSignCorporate && (
                      <div>
                        <Button
                          className=" right-step-action common-btn"
                          onClick={domain.openCertificateModal}
                        >
                          Ký số doanh nghiệp{' '}
                          <span style={{ marginLeft: '5px' }}>
                            <CheckOutlined />
                          </span>
                        </Button>
                        <Button
                          className="right-step-action delete-btn"
                          onClick={domain.openRejectModal}
                        >
                          Từ chối{' '}
                          <span style={{ marginRight: '5px' }}>
                            <CloseCircleFilled />
                          </span>
                        </Button>
                      </div>
                    )}
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </div>
      </div>
    </Spin>
  );
};

export default CM0702View;
