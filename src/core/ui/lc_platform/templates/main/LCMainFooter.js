import React, { useMemo, useState } from 'react';
import { Menu, Button, Space } from 'antd';
// import { Link } from 'react-router-dom';
// import {
//   SettingOutlined,
//   LogoutOutlined,
//   CopyOutlined,
//   PayCircleFilled,
// } from '@ant-design/icons';
import cssLayout from './LCMainLayout.module.less';

// import log from './LCMainLayoutLogger';

// import { KTLogo } from 'core/ui';
// // import ic_fis from 'assets/img/brand/logo_fis.png';
// import ic_VN from 'assets/img/brand/ic_VN.svg';

const tag = 'KTMainFooter';

const KTMainFooter = (props) => {
  return (
    <>
      <div
        style={{
          width: '100%',
        }}
        className={cssLayout['footer-content-wrapper']}
      >
        <p
          style={{
            float: 'right',
            paddingTop: '10px',
            paddingRight: '10px',
          }}
          className={cssLayout['footer-content']}
        >
          @ FPT Information System 2021
        </p>
      </div>
    </>
  );
};

export default KTMainFooter;
