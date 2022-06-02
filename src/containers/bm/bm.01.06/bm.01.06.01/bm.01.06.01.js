import React, { useState, useEffect } from 'react';
import css from './bm.01.06.01.module.less';

import BM010601ViewContent from 'components/bm/bm01.06/bm01.06.01_ funding_limit_management_funding_bank/views/BM010601Content';

import { Divider, Row, Col } from 'antd';
// import { DATA_INVALID, DATA_VALID } from './A1DumpData';
// import urlSearchParams from 'core/utils/url-search-params';

const BMDashboard = (props) => {
  const [data, setData] = useState({
    status: '',
    sign: [],
  });

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

export default BMDashboard;
