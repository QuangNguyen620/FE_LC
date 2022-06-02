import React, { useState } from 'react';
import {
  Col,
  Row,
  Input,
  Button,
  Form,
  Select,
  Checkbox,
  Space,
  DatePicker,
  Tabs,
  Table,
  Modal,
} from 'antd';
import { KTTitle } from 'core/ui';
import { useTranslation } from 'react-i18next';
import {} from '@ant-design/icons';
import moment from 'moment';

import '../../less/CM.04.01.less';
import '../../../../../../../assets/less/LC-common.less';
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
        className="modal-confirm-delete"
        footer={[
          <Row>
            <Col span={12}>
              <Row>
                <Button
                  onClick={onModalClose}
                  className="btn-cancel-in-modal"
                  // className="secondary-btn"
                >
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
          Bạn có chắc chắn muốn xóa bản ghi đã chọn?
        </p>
        <p className="content-confirm-delete">
          Hành động này sẽ xóa thông tin hàng hóa.
        </p>
      </Modal>
    </>
  );
};

export default AddAccountModal;
