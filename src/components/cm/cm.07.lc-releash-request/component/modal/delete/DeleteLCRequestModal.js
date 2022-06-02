import React from 'react';
import { Button, Form, Modal } from 'antd';
import { KTTitle } from 'core/ui';
import { useTranslation } from 'react-i18next';
import {} from '@ant-design/icons';
import '../../less/CM.07.less';
import '../../../../../../assets/less/LC-common.less';

const DeleteCorporateModal = ({ lang = 'vi', ...props }) => {
  const { t } = useTranslation();

  function onModalClose() {
    let data = { name: 'example', type: 'closed from child' };
    props.onCloseModal(data);
  }

  const deleteHandler = () => {
    let data = { name: 'example', type: 'delete from child' };
    props.deleteHandler(data);
    props.onCloseModal(data);
  };

  return (
    <>
      <Modal
        centered
        visible={props.isVisbled}
        onCancel={props.onClose}
        footer={[
          <Button
            className="common-btn"
            onClick={deleteHandler}
            htmlType="submit"
          >
            Có
          </Button>,
          <Button onClick={onModalClose} className="secondary-btn">
            Đóng
          </Button>,
        ]}
        size={3}
      >
        <KTTitle size={3}>
          <b>
            Bạn có chắc chắn muốn xóa Bản ghi Đề nghị phát hành L/C đã chọn?
          </b>
        </KTTitle>
      </Modal>
    </>
  );
};

export default DeleteCorporateModal;
