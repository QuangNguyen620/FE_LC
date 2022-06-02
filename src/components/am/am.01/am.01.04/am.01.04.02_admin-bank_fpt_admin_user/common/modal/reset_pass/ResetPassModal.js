import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, Button, message } from 'antd';

import '../../../../../../../../assets/less/LC-common.less';

import { useA00Domain } from '../../../function/am.01.04.02_view/domains/AM.01.04.02ViewDomain';
import { KTTitle } from 'core/ui';
var axios = require('axios');

const AM010402ResetPassModal = ({ lang = 'vi', ...props }) => {
  const { t } = useTranslation();
  const [, am010402Domain] = useA00Domain();
  // const userIdData = props.userId;

  // const [userIdData, setUserType] = React.useState(props.userId);
  function onModalClose() {
    let data = { name: 'example', type: 'closed from child' };
    props.onCloseModal(data);
  }

  const submitHandler = () => {
    // var data = props.dataResetPass;
    // console.log('Received values of form: ', data);
    onModalClose();

    var configPromise = am010402Domain.resetPassword(props.dataResetPass);
    console.log('config', configPromise);
    configPromise
      .then((result) => {
        axios(result)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
            if (response.data.success) {
              message.info(response.data.message);
            } else {
              message.error(response.data.message);
            }
          })
          .catch(function (error) {
            message.error('Đổi mật khẩu thất bại!');
          });
      })
      .catch((err) => console.log('hieutt---' + err));
  };

  return (
    <>
      <Modal
        centered
        visible={props.isVisbled}
        onCancel={onModalClose}
        footer={[
          <Button onClick={submitHandler} className="common-btn">
            Có
          </Button>,
          <Button onClick={onModalClose} className="secondary-btn">
            Không
          </Button>,
        ]}
        size={3}
      >
        <KTTitle>Bạn có chắc chắn muốn đặt lại mật khẩu người dùng?</KTTitle>
      </Modal>
    </>
  );
};

export default AM010402ResetPassModal;
