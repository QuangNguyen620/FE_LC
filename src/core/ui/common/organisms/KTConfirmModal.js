import React from 'react';
import { Modal, Row, Typography, Col } from 'antd';
import { render, unmountComponentAtNode } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { KTButton } from 'core/ui/common/atoms/button';
import './KTConfirmModal.css';

const { Text } = Typography;

const KTConfirmModal = ({
  title,
  content,
  onOk,
  okText,
  cancelText,
  okType,
  confirmLoading,
  cancelType,
}) => {
  const { t } = useTranslation();

  const onClose = () => {
    removeConfirmModal();
  };

  const handleOKButton = (button) => {
    if (onOk) {
      onOk();
    }
    onClose();
  };

  return (
    <div id="kt-confirm-modal">
      <Modal
        wrapClassName="kt-confirm-modal"
        width={420}
        title={title ? title : t('base.actions.confirm')}
        visible={true}
        confirmLoading={confirmLoading}
        onCancel={() => onClose()}
        footer={null}
        centered
      >
        <Row justify="center" style={{ textAlign: 'center' }}>
          <Text type="secondary">{content}</Text>
        </Row>
        <Row justify="center" style={{ marginTop: 15 }}>
          <Col span={10}>
            <KTButton
              type={cancelType ? cancelType : 'default'}
              block
              onClick={onClose}
            >
              {cancelText || t('base.actions.cancel')}
            </KTButton>
          </Col>
          <Col span={1}></Col>
          <Col span={10}>
            <KTButton
              type={okType ? okType : 'primary'}
              block
              onClick={handleOKButton}
            >
              {okText ? okText : t('base.actions.confirm')}
            </KTButton>
          </Col>
        </Row>
      </Modal>
    </div>
  );
};

const createConfirmModal = (properties) => {
  let divTarget = document.getElementById('kt-confirm-modal');
  if (divTarget) {
    render(<KTConfirmModal {...properties} />, divTarget);
  } else {
    divTarget = document.createElement('div');
    divTarget.id = 'kt-confirm-modal';
    document.body.appendChild(divTarget);
    render(<KTConfirmModal {...properties} />, divTarget);
  }
};

const removeConfirmModal = () => {
  const target = document.getElementById('kt-confirm-modal');
  if (target) {
    unmountComponentAtNode(target);
    target.parentNode.removeChild(target);
  }
};

export const KTconfirm = (properties) => {
  createConfirmModal(properties);
};

export default KTConfirmModal;
