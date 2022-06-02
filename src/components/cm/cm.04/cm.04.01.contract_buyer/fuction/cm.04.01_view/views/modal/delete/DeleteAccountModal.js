import React, { useState } from 'react';
import { Button, Form, Select, Modal } from 'antd';
import { KTTitle } from 'core/ui';
import { useTranslation } from 'react-i18next';
import {} from '@ant-design/icons';

import '../../AM.01.05.01CorporateCustomer_Add.less';
import '../../../../../../../../assets/less/LC-common.less';
const { Option } = Select;

const AddAccountModal = ({ lang = 'vi', ...props }) => {
  const { t } = useTranslation();

  // const dateFormatList = 'DD/MM/YYYY';

  const [form] = Form.useForm();

  function onModalClose() {
    let data = { name: 'example', type: 'closed from child' };
    props.onCloseModal(data);
  }

  const deleteHandler = () => {
    // var data = props.bankAccount;
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
          <b>Quý khách có chắc chắn muốn xóa bản ghi đã chọn?</b>
        </KTTitle>
      </Modal>
    </>
  );
};

export default AddAccountModal;
