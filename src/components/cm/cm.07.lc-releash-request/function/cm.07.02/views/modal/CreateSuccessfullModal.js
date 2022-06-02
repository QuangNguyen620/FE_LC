import React, { useState } from 'react';
import { Button, Form, Select, Modal, Row, Col, Avatar } from 'antd';
import { KTTitle } from 'core/ui';
import { useTranslation } from 'react-i18next';
import { MailOutlined } from '@ant-design/icons';
import moment from 'moment';
// import { KTBodyText, KTButton, KTHeading, KTSubTitle, KTLogo } from 'core/ui';
// import ic_fis from 'assets/img/brand/logo_fis.png';
import '../CreateCorporate.less';
import '../../../../../../assets/less/LC-common.less';
const { Option } = Select;

const AddAccountModal = ({ lang = 'vi', ...props }) => {
  const { t } = useTranslation();

  return (
    <>
      <Modal
        centered
        visible={props.isVisbled}
        onCancel={props.onClose}
        footer={[
          <Button onClick={props.onCloseModal} className="common-btn">
            Đóng
          </Button>,
          
        ]}
        size={3}
      >
        <Row style={{ paddingTop: '12px' }} gutter={24}>
          <Col span={2}></Col>
          <Col span={20}>
            <Row gutter={24}>
              <Col
                span={24}
                style={{ textAlign: 'center', paddingBottom: '10px' }}
              >
                <Avatar
                  style={{ backgroundColor: '#2eb553' }}
                  icon={<MailOutlined />}
                />
              </Col>
              <Col style={{ textAlign: 'center' }} span={24}>
                <KTTitle size={3}>
                  <b>Tạo đề nghị phát hành L/C thành công</b>
                </KTTitle>
              </Col>
              {/* <Col style={{ textAlign: 'center' }} span={24}>
                <p>
                  Quý khách vui lòng truy cập email đã đăng ký để lấy thông tin
                  đăng nhập.
                </p>
              </Col> */}
            </Row>
          </Col>
          <Col span={2}></Col>
        </Row>
      </Modal>
    </>
  );
};

export default AddAccountModal;
