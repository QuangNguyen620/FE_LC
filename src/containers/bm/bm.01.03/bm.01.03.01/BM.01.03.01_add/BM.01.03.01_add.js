import React, { useState, useEffect } from 'react';
import css from './BM010301.module.less';

import BM010301AddContent from 'components/bm/bm01.03/bm01.03.01_bank-user-group/function/bm01.03.01_bank-user-group_add/views/BM010301AddContent';

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
          <BM010301AddContent />
        </Col>
      </Row>
    </>
  );
};

export default BMDashboard;
