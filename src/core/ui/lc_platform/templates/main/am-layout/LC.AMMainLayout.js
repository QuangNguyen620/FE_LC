import React, { useState, useMemo, useEffect } from 'react';
import { useHistory } from 'react-router';

import { Col, Layout, Row } from 'antd';
import cssLayout from '../LCMainLayout.module.less';
import useKTMainLayout from '../LCMainLayoutDomain';
import useUser from 'core/modules/user/domain/UserDomain';
import navigation from 'app/AppMenu/_nav';
import log from '../LCMainLayoutLogger.js';
import _ from 'lodash';
import { KTLogo } from 'core/ui';
import ic_fis from 'assets/img/brand/logo_fis.png';
import ic_VN from 'assets/img/brand/ic_VN.svg';
import LCMainHeader from '../LCMainHeader_AM';
import AMMainSidebar from './AMMainSidebar';

import LCMainFooter from '../LCMainFooter';
import { useA00Domain } from '../domains/CommonDomain_AM';
const { Content } = Layout;
const tag = 'KTMainLayout';

const LCMainLayout = React.memo((props) => {
  const history = useHistory();
  const user = useUser()[0];
  const [mainLayout] = useKTMainLayout();
  const [, commonDomain] = useA00Domain();
  const [loading, setLoading] = useState(true);
  const [subscription, setSubscription] = useState();
  useEffect(() => {
    console.log( localStorage.getItem('login_username'));
  }, [mainLayout]);

  useEffect(() => {
    if (
      sessionStorage.getItem('access_token') == '' ||
      sessionStorage.getItem('access_token') == null
    ) {
      history.push('/');
    }
  }, [sessionStorage.getItem('access_token')]);

  const menuItems = useMemo(() => {
    log.trace(tag, 'render: KTMainLayout ---> menu items');
    let navConfig = {
      items: [],
    };
    if (!user) {
      setLoading(false);
      return [];
    }
    navigation.items.map((item) => {
      if (
        typeof item.roles == 'undefined' ||
        (typeof item.roles != 'undefined' &&
          item.roles.indexOf(user.role_id) > -1)
      ) {
        if (typeof item.children != 'undefined') {
          let tmpChildren = [];
          item.children.forEach((child) => {
            if (
              typeof child.roles == 'undefined' ||
              (typeof child.roles != 'undefined' &&
                child.roles.indexOf(user.role_id) > -1)
            ) {
              tmpChildren.push(child);
            }
          });
          item.children = tmpChildren;
        }
        navConfig.items.push(item);
      }
    });
    // setLoading(false);
    setInterval(() => {
      setLoading(false);
    }, 300);
    return navConfig.items;
  }, [user, subscription]);

  log.info(`render: KTMainLayout --> ${mainLayout?.menuCollapsed}`);
  return (
    <Layout className={`${cssLayout['site-layout']}`} id="KTMainLayout">
      <LCMainHeader />

      <Layout>
        <Row
          style={{
            height: '100%',
          }}
        >
          <Col
            id="KTMainLayout-sidebar-wrapper"
            style={{
              height: '100%',
              background: 'white',
            }}
            span={4}
          >
            <AMMainSidebar />
            {/* <CMMainSidebar /> */}
          </Col>
          <Col span={20} id="KTMainLayout-content-wrapper">
            <Row>
              <Content
                id="KTMainLayout-content"
                style={{
                  height: '100%',
                }}
                className={cssLayout['layout-main-content']}
              >
                {props.children}
              </Content>
            </Row>
            <Row className={cssLayout['KTMainLayout-footer-wrapper']}>
              <LCMainFooter />
            </Row>
          </Col>
        </Row>
      </Layout>
    </Layout>
  );
  // }, [menuItems, mainLayout, props.children]);
});

export { LCMainLayout };
