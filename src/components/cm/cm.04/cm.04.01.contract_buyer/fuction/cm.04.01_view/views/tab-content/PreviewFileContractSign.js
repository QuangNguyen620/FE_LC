import React, { useEffect, useState } from 'react';
import { Document, Page } from 'react-pdf';
import { Col, Row, Divider } from 'antd';
import Iframe from 'react-iframe';
import { KTTitle } from 'core/ui';
import { useCM0401Domain } from '../../domains/CM.04.01Domain';

const ConstractInfomation = ({ lang = 'vi' }) => {
  // const [file, setUrlFile] = useState('https://www.orimi.com/pdf-test.pdf');
  const [file, setUrlFile] = useState('');

  const [context, domain] = useCM0401Domain();

  useEffect(() => {
    // console.log('context::: ', context);
    setUrlFile(context?.urlMinio);
  }, [context?.urlMinio]);

  return (
    <>
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
          </Col>
        </Row>
      </div>
    </>
  );
};
export default ConstractInfomation;
