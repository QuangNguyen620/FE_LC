import React, { useState, useEffect } from 'react';
import css from './bm.01.06.01.module.less';

import BM010601AddContent from 'components/bm/bm01.06/bm01.06.01_ funding_limit_management_funding_bank/function/bm01.06.01_add/views/BM010601AddContent';

import { Divider, Row, Col } from 'antd';

const BMDashboard = (props) => {
  const [data, setData] = useState({
    status: '',
    sign: [],
  });

  return (
    <>
      <Row>
        <Col style={{ height: '100%' }} span={24}>
          <BM010601AddContent />
        </Col>
      </Row>
    </>
  );
};

export default BMDashboard;
