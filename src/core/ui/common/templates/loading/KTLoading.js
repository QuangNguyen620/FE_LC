import React, { Component } from 'react';
// import { Col, Row, Container } from 'reactstrap';
import KTLoadingIcon from 'core/ui/common/atoms/icon/KTLoadingIcon';
import KTLogo from 'core/ui/common/atoms/icon/KTLogo';
import { Layout, Row, Col } from 'antd';
import css from './KTLoading.module.css';
import ic_fis from 'assets/img/brand/logo_fis.png';

export class KTLoadingTemplate extends Component {
  render() {
    return (
      <Layout className={css['container']}>
        <Row justify="center" align="middle" className={css['main']}>
          <Col span={24}>
            <KTLogo mode="logo" logo={ic_fis} style={{ width: '80%' }} />
          </Col>
          <Col span={24}>
            <KTLoadingIcon />
          </Col>
        </Row>
      </Layout>
    );
  }
}
