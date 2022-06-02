import React, { useState } from 'react';
import { Button, Form, Modal, Row, Col } from 'antd';
import Iframe from 'react-iframe';
import { KTTitle } from 'core/ui';

import { useTranslation } from 'react-i18next';
import {} from '@ant-design/icons';
import '../../CreateCorporate.less';
import '../../../../../../../assets/less/LC-common.less';
import { DeleteFilled } from '@ant-design/icons';

const ViewPDFModal = ({ lang = 'vi', ...props }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  return (
    <>
      <Modal
        visible={props.isVisbled}
        onCancel={props.onClose}
        footer={[
          <Row className="row-footer-modal-view-pdf">
            <Col span={24} className="col-footer-modal-view-pdf">
              <Button
                className="btn-delete-file-in-modal"
                onClick={props.deleletFile}
              >
                Xóa file{' '}
                <DeleteFilled className="icon-delete-file-in-modal" />
              </Button>
              <Button className="common-btn" onClick={props.submitHandler}>
                Tiếp tục
              </Button>
            </Col>
          </Row>,
        ]}
        size={3}
        width={1000}
        style={{ top: 20 }}
      >
        <Row style={{ marginTop: 20 }} gutter={24}>
          <Col span={24}>
            <Iframe
              // styles={{ width: '100%' }}
              width="100%"
              height="800px"
              url={props.file}
              className={'preview-pdf'}
              display="initial"
              position="relative"
            />
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default ViewPDFModal;
