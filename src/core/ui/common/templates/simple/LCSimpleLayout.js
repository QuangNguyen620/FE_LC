import React, { useMemo, useEffect } from 'react';
import { Layout } from 'antd';
import log from './ModuleLogger';

import cssStyle from './LCSimpleLayout.module.css';
import LCSimpleLayoutPosition from './LCSimpleLayoutPosition';
const tag = 'LCSimpleLayout';
const { Header, Content } = Layout;

const LCSimpleLayout = (props) => {
  let isSubscribed = true;
  useEffect(() => {
    // định nghĩa hàm thay thế khi load component
    const componentDidMount = async () => {
      if (!isSubscribed) {
        return;
      }
      log.info(`Initialize KTListLayout -> componentDidMount`);
    };

    componentDidMount();
    return () => (isSubscribed = false);
  }, []);

  const children = props.children;

  const headerPanel = useMemo(() => {
    return children
      ? children.find(
          (child) => child.props.position == LCSimpleLayoutPosition.HeaderPanel,
        )
      : '';
  }, [children]);

  const contentPanel = useMemo(() => {
    return children
      ? children.find(
          (child) =>
            child.props.position == LCSimpleLayoutPosition.ContentPanel,
        )
      : '';
  }, [children]);

  return useMemo(() => {
    const headerClassName = `${cssStyle['header']}`;
    const contentClassName = `${cssStyle['content']}`;
    log.trace(tag, 'render: LCSimpleLayout');
    return (
      <Layout className={cssStyle['simple-layout']}>
        {props.hideHeader ? (
          <></>
        ) : (
          <Header className={headerClassName}>{headerPanel}</Header>
        )}

        <Content className={contentClassName}>{contentPanel}</Content>
      </Layout>
    );
  }, [headerPanel, contentPanel]);
};

export { LCSimpleLayout };
