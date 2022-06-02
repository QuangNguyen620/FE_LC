import React from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, Button, message } from 'antd';

import '../../../../../../../../assets/less/LC-common.less';
import { useA00Domain } from '../../../function/am.01.05.02_view/domains/AM.01.05.02Domain';

import { KTTitle } from 'core/ui';
var axios = require('axios');

const AM010402ResetPassModal = ({ lang = 'vi', ...props }) => {
  const { t } = useTranslation();
  const [, am010502Domain] = useA00Domain();

  function onModalClose() {
    let data = { name: 'example', type: 'closed from child' };
    props.onCloseModal(data);
  }

  const submitHandler = () => {
    var data = {
      userId: props.userIdData,
    };
    console.log('Received values of form: ', data);
    onModalClose();

    var configPromise = am010502Domain.resetPassword(data);
    console.log('config', configPromise);
    configPromise
      .then((result) => {
        axios(result)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
            if (response.data == 'Success') {
              message.info(response.data.message);
            } else if (response.data == 'Fail') {
              message.error(response.data.message);
            }
          })
          .catch(function (error) {
            message.error('Đặt lại mật khẩu thất bại!');
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
