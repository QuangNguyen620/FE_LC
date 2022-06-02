import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { KTTitle } from 'core/ui';
import { useTranslation } from 'react-i18next';
import {} from '@ant-design/icons';
import '../../../../../../../../assets/less/LC-common.less';
import { useCM0401Domain } from '../../../../fuction/cm.04.01_edit/domains/CM.04.01Domain';

const UpdateSuccessfulModal = ({ lang = 'vi', ...props }) => {
  const { t } = useTranslation();
  const [context, domain] = useCM0401Domain();

  function onModalClose() {
    let data = { name: 'example', type: 'closed from child' };
    props.onCloseModal(data);
  }

  return (
    <>
      <Modal
        centered
        visible={props.isVisbled}
        onCancel={domain.closeEditSuccessfullModal}
        footer={[
          <Button
            onClick={domain.closeEditSuccessfullModal}
            className="common-btn"
          >
            Đóng
          </Button>,
        ]}
        size={3}
      >
        <KTTitle size={4}>
          <b>Sửa Bản ghi thành công</b>
        </KTTitle>
      </Modal>
    </>
  );
};

export default UpdateSuccessfulModal;
