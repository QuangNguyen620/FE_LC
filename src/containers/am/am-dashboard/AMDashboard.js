import React, { useState, useEffect } from 'react';
import css from './A1VerifyScreen.module.less';

import AMDashboardContent from 'components/am/am-dashboard/views/AMDashboardContent';

import { Divider, Row, Col } from 'antd';
// import { DATA_INVALID, DATA_VALID } from './A1DumpData';
// import urlSearchParams from 'core/utils/url-search-params';

const AMDashboard = (props) => {
  const [data, setData] = useState({
    status: '',
    sign: [],
  });

  return (
    <>
      <Row>
        <Col style={{ height: '100%' }} span={12}>
          <AMDashboardContent />
        </Col>
      </Row>
    </>
  );
};

export default AMDashboard;
