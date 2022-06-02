import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { KTTitle } from 'core/ui';
import { useTranslation } from 'react-i18next';
import {} from '@ant-design/icons';

import '../../../../../../../../assets/less/LC-common.less';
const UpdateFailedModal = ({ lang = 'vi', ...props }) => {
  const { t } = useTranslation();

  return (
    <>
      <Modal
        centered
        visible={props.isVisbled}
        onCancel={props.onClose}
        footer={[
          <Button onClick={props.onClose} className="common-btn">
            Đóng
          </Button>,
        ]}
        size={3}
      >
        <KTTitle size={4}>
          <b>Sửa bản ghi thất bại</b>
        </KTTitle>
      </Modal>
    </>
  );
};

export default UpdateFailedModal;
