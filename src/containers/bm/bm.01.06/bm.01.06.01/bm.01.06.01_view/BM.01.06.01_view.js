import React from 'react';

import BM010601ViewContent from 'components/bm/bm01.06/bm01.06.01_ funding_limit_management_funding_bank/function/bm01.06.01_view/views/BM010601ViewContent';

import { Row, Col } from 'antd';

const BM010601View = (_props) => {
  return (
    <>
      <Row>
        <Col style={{ height: '100%' }} span={24}>
          <BM010601ViewContent />
        </Col>
      </Row>
    </>
  );
};

export default BM010601View;
