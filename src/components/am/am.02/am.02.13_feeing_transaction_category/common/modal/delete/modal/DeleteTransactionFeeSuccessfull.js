import React from 'react';
import { Button, Select, Modal } from 'antd';
import { KTTitle } from 'core/ui';
import { useTranslation } from 'react-i18next';

import '../../../../../../../../assets/less/LC-common.less';

const DeleteCorporateSuccessfullModal = ({ lang = 'vi', ...props }) => {
  const { t } = useTranslation();

  function onModalClose() {
    let data = { name: 'example', type: 'closed from child' };
    props.onCloseModal(data);
  }

  return (
    <>
      <Modal
        centered
        visible={props.isVisbled}
        onCancel={props.onClose}
        footer={[
          <Button onClick={onModalClose} className="common-btn">
            Đóng
          </Button>,
        ]}
        size={3}
      >
        <KTTitle size={3}>
          <b>Xóa thành công</b>
        </KTTitle>
      </Modal>
    </>
  );
};

export default DeleteCorporateSuccessfullModal;
