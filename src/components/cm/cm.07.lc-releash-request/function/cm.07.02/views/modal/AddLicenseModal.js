import React, { useState } from 'react';
import { Button, Select, Modal, Form, Row, Col, Input, message } from 'antd';
import { KTTitle } from 'core/ui';
import { useTranslation } from 'react-i18next';
import { CM0702Domain } from '../../domains/CM0702Domain';
import '../../../../component/less/CM.07.less';
import '../../../../../../../assets/less/LC-common.less';
var axios = require('axios');
const DeleteCorporateSuccessfullModal = ({ lang = 'vi', ...props }) => {
  const { t } = useTranslation();
  const [context, domain] = CM0702Domain();
  function onModalClose() {
    let data = { name: 'example', type: 'closed from child' };
    props.onCloseModal(data);
  }

  const [newLicense, setNewLicense] = useState({
    licenseId: 0,
    licenseName: '',
  });

  const onChangeLicenseName = (e) => {
    setNewLicense({
      ...newLicense,
      licenseName: e.target.value,
    });
  };

  const createNewLicense = async () => {
    var data = {
      licenseId: newLicense.licenseId,
      licenseName: newLicense.licenseName,
    };

    var config = {
      method: 'post',
      url: process.env.REACT_APP_API_BACKEND + '/admin/createLicense',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.access_token + '',
        'Content-Type': 'application/json',
      },
      data: data,
    };
    let response = await axios(config);
    console.log(response.data);
    if (response.data.code == 200) {
      message.success('Thêm mới chứng từ thành công');
    } else {
      message.error('Thêm mới chứng từ không thành công');
    }
    onModalClose();
  };

  return (
    <>
      <Modal
        title="Thêm mới bộ chứng từ"
        centered
        visible={props.isVisbled}
        onCancel={props.onClose}
        footer={[
          <Button onClick={(e) => createNewLicense()} className="common-btn">
            Thêm mới bộ chứng từ
          </Button>,
          <Button onClick={onModalClose} className="secondary-btn">
            Đóng
          </Button>,
        ]}
        size={3}
      >
        <Form>
          <Row>
            <Col span={8}>
              Tên bộ chứng từ
              <span style={{ color: '#F5222D' }}>*</span>
            </Col>
            <Col span={16}>
              <Form.Item
                name={'licenseName'}
                rules={[
                  {
                    required: true,
                    message: 'Trường tên bộ chứng từ không được phép để trống!',
                  },
                ]}
              >
                <Input
                  onChange={(e) => {
                    onChangeLicenseName(e);
                  }}
                  name={'licenseName'}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default DeleteCorporateSuccessfullModal;
