import React, { useEffect, useState } from 'react';
import { Document, Page } from 'react-pdf';
import { Col, Row, Divider, Button } from 'antd';
import Iframe from 'react-iframe';
import { KTTitle } from 'core/ui';
import { useCM0401Domain } from '../../domains/CM.04.01Domain';
import ModalFeeContract from '../../../../components/modal/add/modal/ModalFeeContract';
import {
  CheckCircleFilled,
  CheckCircleOutlined,
  EyeFilled,
} from '@ant-design/icons';

const ConstractInfomation = ({ lang = 'vi' }) => {
  // const [file, setUrlFile] = useState('https://www.orimi.com/pdf-test.pdf');
  const [file, setUrlFile] = useState('');

  const [context, domain] = useCM0401Domain();
  const [viewModalFee, setViewModalFee] = useState(false);

  useEffect(() => {
    // console.log('context::: ', context);
    setUrlFile(context?.urlMinio);
  }, [context?.urlMinio]);

  function openModalFee() {
    // console.log('view file');
    setViewModalFee(true);
  }

  function closeModalFee() {
    // console.log('view file');
    setViewModalFee(false);
  }
  return (
    <>
      <ModalFeeContract
        isVisbled={viewModalFee}
        onCloseModal={closeModalFee}
        onClose={closeModalFee}
      />
      <div className="content-step">
        <Row>
          <Col span={24}>
            <Row>
              <Col span={24}>
                <Row style={{ paddingBottom: 15 }}>
                  <Col span={24}>
                    <KTTitle size={2}>
                      <b>Xem trước hợp đồng</b>
                    </KTTitle>
                  </Col>
                  <Divider className="divider-customer" />
                </Row>

                <Iframe
                  url={file}
                  className={'preview-pdf'}
                  display="initial"
                  position="relative"
                />
              </Col>
            </Row>
            <Row className={'footer-steps'}>
              <Col span={12}>
                <Button
                  className="button-previous"
                  onClick={() => {
                    domain.toAddHandler();
                  }}
                >
                  {'< Quay lại'}
                </Button>
              </Col>

              <Col span={12}>
                <Button
                  className="common-btn button-next"
                  onClick={openModalFee}
                >
                  {'Xác nhận thêm mới HĐ'}
                  <CheckCircleFilled />
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </>
  );
};
export default ConstractInfomation;
