import React from 'react';
import { Button, Modal } from 'antd';
import { KTTitle } from 'core/ui';

import {} from '@ant-design/icons';
// import { KTBodyText, KTButton, KTHeading, KTSubTitle, KTLogo } from 'core/ui';
// import ic_fis from 'assets/img/brand/logo_fis.png';
import '../CreateCorporate.less';
import '../../../../../../assets/less/LC-common.less';

const eKYCFailModal = ({ lang = 'vi', ...props }) => {
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
          <b>Ảnh chân dung không khớp với ảnh trên GTTT</b>
        </KTTitle>
      </Modal>
    </>
  );
};

export default eKYCFailModal;
