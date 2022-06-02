import React from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, Button } from 'antd';

import '../../../../../../../../assets/less/LC-common.less';

import { KTTitle } from 'core/ui';

const AM010401UpdateSuccessModal = ({ lang = 'vi', ...props }) => {
  const { t } = useTranslation();
  // const [, am010402Domain] = useA00Domain();

  function onModalClose() {
    let data = { name: 'example', type: 'closed from child' };
    props.onCloseModal(data);
  }

  // function onDelele() {
  //   let data = { name: 'example', type: 'delete from child' };
  //   props.onDelete(data);
  // }

  return (
    <>
      <Modal
        centered
        visible={props.isVisbled}
        onCancel={onModalClose}
        onOk={props.onClose}
        footer={[
          <Button onClick={onModalClose} className="common-btn">
            Đóng
          </Button>,
        ]}
        size={3}
      >
        <KTTitle>Sửa thành công!</KTTitle>
      </Modal>
    </>
  );
};

export default AM010401UpdateSuccessModal;
