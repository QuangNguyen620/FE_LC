import React, { useState, useEffect } from 'react';
import css from './BMDashboard.module.less';

import BMDashboardContent from 'components/cm/cm.dashboard/views/CMDashboardContent';

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
        <Col style={{ height: '100%' }} span={12}>
          <BMDashboardContent />
        </Col>
      </Row>
    </>
  );
};

export default BMDashboard;
