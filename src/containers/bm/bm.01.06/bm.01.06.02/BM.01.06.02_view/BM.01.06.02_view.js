import React from 'react';

import BM010602ViewContent from 'components/bm/bm01.06/bm01.06.02_ funding_limit_management_releashing_bank/function/bm01.06.02_view/views/BM010602ViewContent';

import { Row, Col } from 'antd';

const BMDashboard = (_props) => {
  return (
    <>
      <Row>
        <Col style={{ height: '100%' }} span={24}>
          <BM010602ViewContent />
        </Col>
      </Row>
    </>
  );
};

export default BMDashboard;
