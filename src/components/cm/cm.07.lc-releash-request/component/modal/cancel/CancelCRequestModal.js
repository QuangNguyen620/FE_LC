import React from 'react';
import { Button, Form, Modal } from 'antd';
import { KTTitle } from 'core/ui';
import { useTranslation } from 'react-i18next';
import {} from '@ant-design/icons';
import '../../less/CM.07.less';
import '../../../../../../assets/less/LC-common.less';

const DeleteCorporateModal = ({ lang = 'vi', ...props }) => {
  const { t } = useTranslation();

  function onModalClose() {
    let data = { name: 'example', type: 'closed from child' };
    props.onCloseModal(data);
  }

  const cancelHandler = () => {
    let data = { name: 'example', type: 'delete from child' };
    props.cancelHandler(data);
  };

  return (
    <>
      <Modal
        centered
        visible={props.isVisbled}
        onCancel={props.onClose}
        footer={[
          <Button onClick={onModalClose} className="secondary-btn">
            Không
          </Button>,
          <Button className="cancel-lc-btn" onClick={(e) => cancelHandler()}>
            Hủy đề nghị
          </Button>,
        ]}
        size={3}
      >
        <KTTitle size={3}>
          <b>Bạn có chắc chắn muốn hủy đề nghị phát hành L/C?</b>
        </KTTitle>
      </Modal>
    </>
  );
};

export default DeleteCorporateModal;
