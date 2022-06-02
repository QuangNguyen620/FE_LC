import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, Row, message } from 'antd';
import {} from '@ant-design/icons';
import '../../less/CM.07.less';
import '../../../../../../assets/less/LC-common.less';
import { CM0708Domain } from '../../../function/cm.07.08/domains/CM.07.Domain';
import Iframe from 'react-iframe';
import { KTTitle } from 'core/ui';

const AddAccountModal = ({ lang = 'vi', ...props }) => {
  const [context, domain] = CM0708Domain();
  const [linkDownloadCer, setLinkDownloadCer] = useState(
    '',
    // 'https://dev-lc-storage.xcbt.online/s3-lc-dev/certificate/xSigner.rar',
  );

  useEffect(() => {
    console.log('context::: ', context);
    setLinkDownloadCer(context?.linkDownloadCer);
  }, [context?.linkDownloadCer]);

  function clickDownload() {
    domain.closeCertificateDownloadModal();
  }
  function closeDownloadCertificate() {
    domain.closeCertificateDownloadModal();
  }

  return (
    <>
      <div>
        <Modal
          width={500}
          centered
          visible={context?.showCertificateDownloadModal}
          onCancel={closeDownloadCertificate}
          footer={[
            <Button onClick={clickDownload} className="common-btn">
              <a href={linkDownloadCer} target="_blank">
                Download
              </a>
            </Button>,
            <Button onClick={closeDownloadCertificate}>Hủy</Button>,
          ]}
        >
          <Row>
            <KTTitle>
              Vui lòng cài ứng dụng sau để thực hiện ký số tổ chức
            </KTTitle>
          </Row>
        </Modal>
      </div>
    </>
  );
};

export default AddAccountModal;