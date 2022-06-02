import React, { useMemo, useState, useEffect } from 'react';
import { HashRouter, Route, Routes, Link, useLocation } from 'react-router-dom';
import { Menu, Row, Col, Dropdown, Space, Divider, Avatar } from 'antd';
import Breadcrumbs from './Breadcrumbs';
import {
  DownOutlined,
  HomeFilled,
  BellOutlined,
  UserOutlined,
  KeyOutlined,
} from '@ant-design/icons';
import { useA00Domain } from './domains/CommonDomain_AM';
import './LCMainLayout.module.less';
// import useKTMainLayout from './LCMainLayoutDomain';

// import useAuth from 'core/modules/auth/domain/AuthDomain';
import log from './LCMainLayoutLogger';
// import { useWebCacheApi } from 'core/hooks/UseWebCacheApi';

import { KTLogo, KTHeading, KTBodyText } from 'core/ui';
import ic_fis from 'assets/img/brand/logo_fis.png';
import ic_VN from 'assets/img/brand/ic_VN.svg';
import ic_EN from 'assets/img/brand/ic_EN.svg';
import useMultiLanguage from 'core/hooks/UseMultiLanguage';
const tag = 'KTMainHeader';

const KTMainHeader = (props) => {
  // const [openKeys, setOpenKeys] = React.useState(['sub1']);

  function handleClick(e) {
    console.log('click', e);
  }

  const language = useMultiLanguage();
  const [menuLanguageVisible, setMenuVisible] = useState(false);
  const [userName, setUserName] = useState(localStorage.login_username);
  const handleVisibleChange = (flag) => {
    setMenuVisible(flag);
  };
  const [logedInUser, setLogedInUser] = useState({
    authentication: '',
    bankCode: '',
    branch: '',
    createdBy: '',
    createdDate: '',
    dateOfIdentity: '',
    department: '',
    email: '',
    employeeCode: 'null',
    id: '',
    identityNumber: '',
    identityType: '',
    issuedByIdentity: '',
    lastModifiedBy: '',
    lastModifiedDate: '',
    phoneNumber: '',
    userGroupEntitys: [],
    userId: '',
    userName: '',
    userStatus: '',
    userType: '',
  });

  const [, loginDomain] = useA00Domain();

  useEffect(() => {
    loginDomain.loadUserData();
    setTimeout(function () {
      setUserName(localStorage.login_username);
    }, 1000);
  }, [sessionStorage.access_token]);

  return useMemo(() => {
    const storybookEnabled =
      process.env.REACT_APP_STORYBOOK_ENABLE == 'true' || false;
    log.trace(tag, 'render:', storybookEnabled);

    const menu = (
      <Menu>
        <Menu.Item key="alt-lang">
          <Link href={language == 'vi' ? '?lang=en' : '?lang=vi'}>
            <KTLogo icon={language == 'vi' ? ic_EN : ic_VN} />
          </Link>
        </Menu.Item>
      </Menu>
    );

    const userMenu = (
      <Menu>
        <Menu.Item key="0">
          <Link onClick={loginDomain.changePassHandler}>
            {' '}
            <Space direction="horizontal" size={16}>
              <KeyOutlined color={'#595959'} />
              <KTBodyText
                size={4}
                color={'#595959'}
                style={{
                  textAlign: 'left',
                }}
              >
                Đổi mật khẩu
              </KTBodyText>
            </Space>
          </Link>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="1">
          <Link target="/">
            {' '}
            <Space direction="horizontal" size={16}>
              <UserOutlined color={'#595959'} />
              <KTBodyText
                size={4}
                color={'#595959'}
                style={{
                  textAlign: 'left',
                }}
              >
                Thông tin tài khoản
              </KTBodyText>
            </Space>
          </Link>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="3">
          <Link onClick={loginDomain.logoutHandler}>
            {' '}
            <Space direction="horizontal" size={16}>
              <HomeFilled color={'#595959'} />
              <KTBodyText
                size={4}
                color={'#595959'}
                style={{
                  textAlign: 'left',
                }}
              >
                Đăng xuất
              </KTBodyText>
            </Space>
          </Link>
        </Menu.Item>
      </Menu>
    );

    return (
      <>
        <Row
          justify="center"
          align="middle"
          style={{
            height: 70,
            padding: '0px 16px',
          }}
        >
          <Col flex="128px">
            <KTLogo
              logo={ic_fis}
              mode="logo"
              style={{
                height: 50,
                margin: '10px 0px',
              }}
            />
          </Col>
          <Col flex="auto" align="left">
            <KTHeading
              level={5}
              color={'#262626'}
              simple
              style={{
                textAlign: 'center',
                padding: '0px 16px',
              }}
            >
              Quản Trị Hệ Thống
            </KTHeading>
          </Col>

          <Col flex="410px" align="middle">
            <Space direction="horizontal" size={16}>
              <div>
                <div className="nav-icon">
                  <BellOutlined color={'#595959'} />
                </div>
                <div
                  style={{
                    width: '15px',
                    height: '15px',
                    background: '#ff4d4f',
                    borderRadius: '50%',
                    padding: '5px',
                    fontSize: '11px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 'bold',
                    position: 'absolute',
                    top: '-2px',
                    right: '300px',
                  }}
                  className="counter"
                >
                  2
                </div>
              </div>

              <Divider type="vertical" />
              <Dropdown overlay={userMenu}>
                <Link onClick={(e) => e.preventDefault()}>
                  <Space direction="horizontal" size={12}>
                    <KTBodyText
                      size={4}
                      color={'#595959'}
                      style={{
                        textAlign: 'left',
                      }}
                    >
                      {userName}
                    </KTBodyText>
                    <Avatar size="small" icon={<UserOutlined />} />
                    <DownOutlined color={'#595959'} />
                  </Space>
                </Link>
              </Dropdown>
              <Divider type="vertical" />

              <Dropdown
                overlay={menu}
                onVisibleChange={handleVisibleChange}
                visible={menuLanguageVisible}
              >
                <div onClick={(e) => e.preventDefault()}>
                  <KTLogo icon={ic_VN} /> <DownOutlined />
                </div>
              </Dropdown>
            </Space>
          </Col>
        </Row>
        <Row
          justify="center"
          align="middle"
          style={{
            padding: '0px 16px',
          }}
        >
          <Col span={2}></Col>
          <Col flex="auto" align="left">
            <Breadcrumbs />
          </Col>
        </Row>
      </>
    );
  }, [language, menuLanguageVisible, userName]);
};

export default KTMainHeader;
