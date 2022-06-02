import React from 'react';
import { Button, Modal } from 'antd';
import { KTTitle } from 'core/ui';

import {} from '@ant-design/icons';

import '../../less/CM.04.02.less';
import '../../../../../../../assets/less/LC-common.less';
// import { useCM0402Domain } from '../../../domains/CM.04.02Domain';

const SignSuccessModal = ({ lang = 'vi', ...props }) => {
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
          <b>Ký số thành công</b>
        </KTTitle>
      </Modal>
    </>
  );
};

export default SignSuccessModal;
