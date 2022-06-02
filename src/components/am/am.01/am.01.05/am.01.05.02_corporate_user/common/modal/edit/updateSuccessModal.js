import React from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, Button } from 'antd';

import '../../../../../../../../assets/less/LC-common.less';
import { KTTitle } from 'core/ui';

const AM010502UpdateSuccessModal = ({ lang = 'vi', ...props }) => {
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
        onCancel={onModalClose}
        footer={[
          <Button onClick={onModalClose} className="common-btn">
            Đóng
          </Button>,
        ]}
        size={3}
      >
        <KTTitle>Chỉnh sửa thành công!</KTTitle>
      </Modal>
    </>
  );
};

export default AM010502UpdateSuccessModal;
