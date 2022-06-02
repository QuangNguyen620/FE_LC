import React, { useState } from 'react';
import { Button, Form, Modal, Row, Col } from 'antd';
import Iframe from 'react-iframe';
import { KTTitle } from 'core/ui';

import { useTranslation } from 'react-i18next';
import {} from '@ant-design/icons';
import '../../EditCorporate.less';
import '../../../../../../../assets/less/LC-common.less';
import DeleteFileCorporateModal from '../upload/DeleteFileCorporateModal';

const ViewPDFModal = ({ lang = 'vi', ...props }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [visibleDeletePDFModal, setVisibleDeletePDFModal] = useState(false);

  const closeDeleteFilePDFModal = () => {
    setVisibleDeletePDFModal(false);
  };
  const openDeleteFilePDFModal = () => {
    setVisibleDeletePDFModal(true);
  };

  const deleteHandler = () => {
    let data = { name: 'example', type: 'closed from child' };
    setVisibleDeletePDFModal(false);
    props.onClose(data);

    console.log('deleteHandler');
  };

  return (
    <>
      <DeleteFileCorporateModal
        isVisbled={visibleDeletePDFModal}
        onCloseModal={closeDeleteFilePDFModal}
        deleteHandler={deleteHandler}
      />

      <Modal
        visible={props.isVisbled}
        onCancel={props.onClose}
        footer={[
          // <Button className="common-btn" onClick={props.onClose}>
          //   Đóng
          // </Button>,
          <Button className="common-btn" onClick={openDeleteFilePDFModal}>
            Tải lại file
          </Button>,
        ]}
        size={3}
        width={1000}
        style={{ top: 20 }}
      >
        <Row style={{ marginTop: 20 }} gutter={24}>
          <Col span={24}>
            <Iframe
              // styles={{ width: '100%' }}
              width="100%"
              height="800px"
              url={props.file}
              className={'preview-pdf'}
              display="initial"
              position="relative"
            />
          </Col>
        </Row>

        {/* <object data={props.file} type="application/pdf">
          <iframe src={props.file}></iframe>
        </object> */}
        {/* <FileViewer
          fileType="pdf"
          filePath={props.file}
          // errorComponent={CustomErrorComponent}
          // onError={this.onError}
        /> */}
      </Modal>
    </>
  );
};

export default ViewPDFModal;
