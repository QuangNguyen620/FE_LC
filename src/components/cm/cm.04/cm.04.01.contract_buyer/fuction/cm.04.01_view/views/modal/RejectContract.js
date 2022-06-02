import React, { useState } from 'react';
import { Button, Form, Select, Modal } from 'antd';
import { KTTitle } from 'core/ui';
import { useTranslation } from 'react-i18next';
import {} from '@ant-design/icons';

import '../../../../components/less/CM.04.01.less';
import '../../../../../../../../assets/less/LC-common.less';
const { Option } = Select;

const RejectContract = ({ lang = 'vi', ...props }) => {
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

  return <></>;
};

export default RejectContract;
