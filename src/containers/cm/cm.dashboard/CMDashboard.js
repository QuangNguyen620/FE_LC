import React, { useState, useEffect } from 'react';
import css from './CMDashboard.module.less';

import CMDashboardContent from 'components/cm/cm.dashboard/views/CMDashboardContent';

import { Divider, Row, Col } from 'antd';
// import { DATA_INVALID, DATA_VALID } from './A1DumpData';
// import urlSearchParams from 'core/utils/url-search-params';

const CMDashboard = (props) => {
  const [data, setData] = useState({
    status: '',
    sign: [],
  });

  return (
    <>
      <Row>
        <Col style={{ height: '100%' }} span={12}>
          <CMDashboardContent />
        </Col>
      </Row>
    </>
  );
};

export default CMDashboard;
