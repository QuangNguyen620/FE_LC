import React from 'react';
import { Button, Form, Modal, Row, Col } from 'antd';
import { KTTitle } from 'core/ui';
import { useTranslation } from 'react-i18next';
import {} from '@ant-design/icons';
import '../../../less/BM010301.less';
import '../../../../../../../../assets/less/LC-common.less';

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
        onCancel={onModalClose}
        className="modal-confirm-delete"
        footer={[
          <Row>
            <Col span={12}>
              <Row>
                <Button onClick={onModalClose} className="btn-cancel-in-modal">
                  Không
                </Button>
              </Row>
            </Col>
            <Col span={12}>
              <Row>
                <Button
                  className="btn-delete-in-modal"
                  onClick={deleteHandler}
                  htmlType="submit"
                >
                  Có
                </Button>
              </Row>
            </Col>
          </Row>,
        ]}
        // size={3}
      >
        <p className="title-confirm-delete">
          Bạn có chắc chắn muốn xóa người dùng ngân hàng?
        </p>
        <p className="content-confirm-delete">
          Hành động này sẽ xóa tất cả thông tin liên quan đến nhóm người dùng
          ngân hàng.
        </p>
      </Modal>

      {/* <Modal
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
          <b>Bạn có chắc chắn muốn xóa người dùng ngân hàng?</b>
        </KTTitle>
        <p>Hành động này </p>
      </Modal> */}
    </>
  );
};

export default DeleteCorporateModal;
