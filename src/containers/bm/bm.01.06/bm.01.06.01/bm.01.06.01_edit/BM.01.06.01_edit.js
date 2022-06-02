import React from 'react';

import BM010601EditContent from 'components/bm/bm01.06/bm01.06.01_ funding_limit_management_funding_bank/function/bm01.06.01_edit/views/BM010601EditContent';

import { Row, Col } from 'antd';

const BMDashboard = (_props) => {
  return (
    <>
      <Row>
        <Col style={{ height: '100%' }} span={24}>
          <BM010601EditContent />
        </Col>
      </Row>
    </>
  );
};

export default BMDashboard;
