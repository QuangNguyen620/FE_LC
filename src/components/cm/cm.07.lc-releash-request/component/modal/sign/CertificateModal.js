import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, Row } from 'antd';
import { KTTitle } from 'core/ui';
import {} from '@ant-design/icons';

import '../../less/CM.07.less';
import '../../../../../../assets/less/LC-common.less';
import { message } from 'antd';
import { CM0708Domain } from '../../../function/cm.07.08/domains/CM.07.Domain';

const CertificateModal = ({ lang = 'vi', ...props }) => {
  const [context, domain] = CM0708Domain();

  var dataCertificate = null;
  const [list, setList] = useState([]);
  useEffect(() => {
    setList(context?.setListCertificate);
  }, [context?.setListCertificate]);

  const columns = [
    {
      title: 'Mã số thuế',
      dataIndex: 'mst',
      key: 'mst',
    },
    {
      title: 'Chủ thể',
      dataIndex: 'subject',
      key: 'subject',
    },
    {
      title: 'Đơn vị CA',
      dataIndex: 'issuer',
      key: 'issuer',
    },
    {
      title: 'Hiệu lực từ ngày',
      dataIndex: 'validFrom',
      key: 'validFrom',
    },
    {
      title: 'Hiệu lực đến ngày',
      dataIndex: 'validTo',
      key: 'validTo',
    },
  ];
  function pickData() {
    domain.pickCertificateData(dataCertificate);
  }
  function cancelPick() {
    domain.closeCertificateModal();
  }
  return (
    <>
      <div>
        <Modal
          width={1000}
          centered
          visible={context?.showCertificateModal}
          onCancel={cancelPick}
          footer={[
            <Button onClick={pickData} className="common-btn">
              Chọn
            </Button>,
            <Button onClick={cancelPick}>Bỏ qua</Button>,
          ]}
          // size={3}
        >
          <Row>
            <Table
              columns={columns}
              dataSource={list}
              rowSelection={{
                columnTitle: 'Chọn',
                type: 'radio',
                onSelect: (record) => {
                  dataCertificate = record;
                  // console.log(record);
                },
              }}
            />
          </Row>
        </Modal>
      </div>
    </>
  );
};

export default CertificateModal;
