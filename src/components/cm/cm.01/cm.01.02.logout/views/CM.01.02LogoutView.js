import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DownOutlined, CheckCircleFilled } from '@ant-design/icons';
import {
  Col,
  Row,
  Space,
  Menu,
  Dropdown,
  Typography,
  Form,
  Input,
  Button,
  Checkbox,
} from 'antd';
import { KTLogo, KTHeading, KTBodyText } from 'core/ui';
import './CM.01.02LogoutView.less';
import { useA00Domain } from '../domains/CM.01.02Domain';
import ic_fis from 'assets/img/brand/logo_fis.png';
import ic_VN from 'assets/img/brand/ic_VN.svg';
import ic_EN from 'assets/img/brand/ic_EN.svg';

const { Link } = Typography;

const CM0102LogoutView = ({ lang = 'vi', ...props }) => {
  const { t } = useTranslation();
  const [, loginDomain] = useA00Domain();
  const [language_menu_visible, setMenuVisible] = useState(false);

  const handleVisibleChange = (flag) => {
    setMenuVisible(flag);
  };
  const menu = (
    <Menu>
      <Menu.Item key="alt-lang">
        <Link href={lang == 'vi' ? '?lang=en' : '?lang=vi'}>
          <KTLogo icon={lang == 'vi' ? ic_EN : ic_VN} />
        </Link>
      </Menu.Item>
    </Menu>
  );

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const login = (event) => {
    loginDomain.loginHandler(loginInfo.username, loginInfo.password);
  };

  const [loginInfo, setInfo] = useState({ username: '', password: '' });

  const userNameChange = (event) => {
    setInfo({ ...loginInfo, username: event.target.value });
  };

  const passwordChange = (event) => {
    setInfo({ ...loginInfo, password: event.target.value });
  };

  return (
    <>
      <Row className={'padding_md'}>
        <Col span={22}></Col>
        <Col span={2}>
          <Dropdown
            overlay={menu}
            onVisibleChange={handleVisibleChange}
            visible={language_menu_visible}
          >
            <div onClick={(e) => e.preventDefault()}>
              <KTLogo icon={lang == 'vi' ? ic_VN : ic_EN} /> <DownOutlined />
            </div>
          </Dropdown>
        </Col>
      </Row>
      <Row className={'form_height'}>
        <Col span={5}></Col>

        <Col span={14} align="middle">
          <KTLogo mode="logo" logo={ic_fis} />
          <Row>
            <Space direction="horizontal" size={16}>
              <CheckCircleFilled className={'check_circle'} />
              <KTHeading
                size={4}
                color="primary"
                className={'text_logout_heading'}
              >
                Đăng xuất thành công
              </KTHeading>
            </Space>
          </Row>
          <Row>
            <KTBodyText className={'text_logout_body'}>
              Cảm ơn bạn đã sử dụng hệ thống!
            </KTBodyText>
          </Row>

          <Button id="loginButton" onClick={loginDomain.loginHandler}>
            Đăng nhập
          </Button>
        </Col>
        <Col span={5}></Col>
      </Row>
    </>
  );
};

export default CM0102LogoutView;
