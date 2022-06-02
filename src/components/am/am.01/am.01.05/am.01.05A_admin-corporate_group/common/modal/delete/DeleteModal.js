import React from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, Button } from 'antd';

import '../../../../../../../../assets/less/LC-common.less';
import { KTTitle } from 'core/ui';

const AM0105ADeleteModal = ({ lang = 'vi', ...props }) => {
  const { t } = useTranslation();

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
        onCancel={onModalClose}
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

export default AM0105ADeleteModal;
