import React from 'react';
import { Button, Modal } from 'antd';
import { KTTitle } from 'core/ui';

import {} from '@ant-design/icons';

import '../../../../../../../../../assets/less/LC-common.less';

const AddAccountModal = ({ lang = 'vi', ...props }) => {
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
          <b>Thêm mới không thành công</b>
        </KTTitle>
      </Modal>
    </>
  );
};

export default AddAccountModal;
