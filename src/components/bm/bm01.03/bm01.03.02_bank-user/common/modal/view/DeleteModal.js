import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, Button } from 'antd';

// import './AM.01.04.02BankAdminUser_View.less';
import '../../../../../../../assets/less/LC-common.less';
// import { useA00Domain } from '../domains/AM.01.04.02ViewDomain';
import { KTTitle } from 'core/ui';

const AM010402DeleteModal = ({ lang = 'vi', ...props }) => {
  const { t } = useTranslation();
  // const [, am010402Domain] = useA00Domain();

  function onModalClose() {
    let data = { name: 'example', type: 'closed from child' };
    props.onCloseModal(data);
  }

  function onDelele() {
    let data = { name: 'example', type: 'delete from child' };
    props.onDelete(data);
  }

  return (
    <>
      <Modal
        centered
        visible={props.isVisbled}
        onOk={props.onDelete}
        onCancel={props.onClose}
        footer={[
          <Button onClick={onDelele} className="common-btn">
            Có
          </Button>,
          <Button onClick={onModalClose} className="secondary-btn">
            Không
          </Button>,
        ]}
        size={3}
      >
        <KTTitle>Bạn có chắc chắn muốn xóa hạng mục này?</KTTitle>
      </Modal>
    </>
  );
};

export default AM010402DeleteModal;
