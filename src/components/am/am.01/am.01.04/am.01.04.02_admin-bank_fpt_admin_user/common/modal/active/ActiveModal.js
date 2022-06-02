import React from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, Button } from 'antd';

import '../../../../../../../../assets/less/LC-common.less';

import { KTTitle } from 'core/ui';

const AM010402ActiveModal = ({ lang = 'vi', ...props }) => {
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
          <Button className="common-btn">Có</Button>,
          <Button onClick={onModalClose} className="secondary-btn">
            Không
          </Button>,
        ]}
        size={3}
      >
        <KTTitle>Bạn có chắc chắn muốn kích hoạt người dùng?</KTTitle>
      </Modal>
    </>
  );
};

export default AM010402ActiveModal;
