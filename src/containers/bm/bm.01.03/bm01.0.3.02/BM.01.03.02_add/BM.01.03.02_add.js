import React, { useState, useEffect } from 'react';
import css from './BM010302.module.less';

import BM010302AddContent from 'components/bm/bm01.03/bm01.03.02_bank-user/function/bm01.03.02_bank-user_add/views/BM010302AddContent';

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
          <BM010302AddContent />
        </Col>
      </Row>
    </>
  );
};

export default BMDashboard;
