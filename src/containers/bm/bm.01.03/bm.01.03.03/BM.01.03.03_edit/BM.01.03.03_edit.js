import React, { useState, useEffect } from 'react';
import css from './BM010303.module.less';

import BM010303EditContent from 'components/bm/bm01.03/bm01.03.03_bank-user-authentication/function/bm01.03.03_bank-user-authentication_edit/views/BM010303EditContent';

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
          <BM010303EditContent />
        </Col>
      </Row>
    </>
  );
};

export default BMDashboard;
