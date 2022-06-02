import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, Button } from 'antd';

// import './AM.01.04.02BankAdminUser_View.less';
import '../../../../../../../assets/less/LC-common.less';
// import { useA00Domain } from '../domains/AM.01.04.02ViewDomain';
import { KTTitle } from 'core/ui';

const AM010402LockModal = ({ lang = 'vi', ...props }) => {
  const { t } = useTranslation();
  // const [, am010402Domain] = useA00Domain();

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
          <Button className="common-btn">Có</Button>,
          <Button onClick={onModalClose} className="secondary-btn">
            Không
          </Button>,
        ]}
        size={3}
      >
        <KTTitle>Bạn có chắc chắn muốn khóa người dùng?</KTTitle>
      </Modal>
    </>
  );
};

export default AM010402LockModal;
