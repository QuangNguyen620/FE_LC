import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { KTTitle } from 'core/ui';
import { useTranslation } from 'react-i18next';
import {} from '@ant-design/icons';

import '../AM.01.04.01BankAdmin_Add.less';
import '../../../../../../../assets/less/LC-common.less';

const AddAccountModal = ({ lang = 'vi', ...props }) => {
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
          <b>Mã nhóm người dùng đã tồn tại!</b>
        </KTTitle>
      </Modal>
    </>
  );
};

export default AddAccountModal;
