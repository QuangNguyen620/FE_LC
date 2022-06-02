import React, { useMemo, useEffect } from 'react';
import { Layout, Row, Col, Button } from 'antd';
import { KTHeading } from 'core/ui';
import {
  MailTwoTone,
  MessageTwoTone,
  FileTextTwoTone,
  SettingTwoTone,
} from '@ant-design/icons';
import log from './ModuleLogger';
import cssStyle from './KTPublicLayout.module.css';
const tag = 'KTPublicLayout';
const { Content } = Layout;

const KTPublicLayout = ({ children }) => {
  let isSubscribed = true;
  useEffect(() => {
    // định nghĩa hàm thay thế khi load component
    const componentDidMount = async () => {
      if (!isSubscribed) {
        return;
      }
      log.info(`Initialize KTPublicLayout -> componentDidMount`);
    };

    componentDidMount();
    return () => (isSubscribed = false);
  }, []);

  return useMemo(() => {
    log.trace(tag, 'render: KTPublicLayout');
    return (
      <Layout className={cssStyle['public-layout']}>
        <Row>
          <Col span={12} className={cssStyle['public-layout-left']}>
            <KTHeading
              level={4}
              color="white"
              style={{
                textAlign: 'center',
                margin: 30,
              }}
            >
              {/* {t('a00.title.002')} */}
              SÀN GIAO DỊCH L/C FPT BLOCKCHAIN PLATFORM
            </KTHeading>
            <Row
              style={{
                height: '60%',
                padding: 20,
              }}
            >
              <Col span={4}></Col>
              <Col span={16}>
                <div className={cssStyle['public-layout-left-img']}></div>
              </Col>
              <Col span={4}></Col>
            </Row>
            <Row
              style={{
                height: '20%',
                padding: 20,
              }}
            >
              <Col span={4}></Col>
              <Col span={16}>
                <Row className={cssStyle['public-layout-left-button-group']}>
                  <Col span={6}>
                    <Button
                      className={cssStyle['additional-button']}
                      icon={<MailTwoTone style={{ fontSize: '48px' }} />}
                    />
                  </Col>
                  <Col span={6}>
                    {' '}
                    <Button
                      className={cssStyle['additional-button']}
                      icon={<MessageTwoTone style={{ fontSize: '48px' }} />}
                    />
                  </Col>
                  <Col span={6}>
                    <Button
                      className={cssStyle['additional-button']}
                      icon={<FileTextTwoTone style={{ fontSize: '48px' }} />}
                    />
                  </Col>
                  <Col span={6}>
                    <Button
                      className={cssStyle['additional-button']}
                      icon={<SettingTwoTone style={{ fontSize: '48px' }} />}
                    />
                  </Col>
                </Row>
              </Col>
              <Col span={4}></Col>
            </Row>
          </Col>
          <Col span={12} className={cssStyle['public-layout-right']}>
            <Row>
              <Content>{children}</Content>
            </Row>
          </Col>
        </Row>
      </Layout>
    );
  }, []);
};

export default KTPublicLayout;
