import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, Button, message } from 'antd';

// import './AM.01.04.02BankAdminUser_View.less';
import '../../../../../../../assets/less/LC-common.less';
import { BM010302Domain } from '../../../domains/BM010302Domain';
import { KTTitle } from 'core/ui';
var axios = require('axios');

const BM010302ResetPassModal = ({ lang = 'vi', ...props }) => {
  const { t } = useTranslation();
  const [, domain] = BM010302Domain();
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

    var configPromise = domain.resetPassword(props.dataResetPass);
    console.log('config', configPromise);
    configPromise
      .then((result) => {
        axios(result)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
            if (response.data == 'Success') {
              message.info(response.data.message);
            } else if (response.data == 'Fail') {
              message.error('Đổi mật khẩu thất bại!');
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

export default BM010302ResetPassModal;
