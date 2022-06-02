import React, { useMemo, useEffect } from 'react';

import { Layout, Row, Col, Button } from 'antd';
import { KTHeading } from 'core/ui';
import {
  MailTwoTone,
  MessageTwoTone,
  FileTextTwoTone,
  SettingTwoTone,
} from '@ant-design/icons';
import log from './LCEmptyLayoutLogger';
import cssStyle from './LCEmptyLayout.module.css';
const tag = 'LCEmptyLayout';
const { Content, Header, Footer } = Layout;

const LCEmptyLayout = ({ children }) => {
  let isSubscribed = true;
  useEffect(() => {
    // định nghĩa hàm thay thế khi load component
    const componentDidMount = async () => {
      if (!isSubscribed) {
        return;
      }
      log.info(`Initialize LCEmptyLayout -> componentDidMount`);
    };

    componentDidMount();
    return () => (isSubscribed = false);
  }, []);

  return useMemo(() => {
    log.trace(tag, 'render: LCEmptyLayout');
    return (
      <Layout className={cssStyle['public-layout']}>
        <Content>{children}</Content>
      </Layout>
    );
  }, []);
};

export default LCEmptyLayout;
