import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DownOutlined } from '@ant-design/icons';
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
  message,
} from 'antd';
import { useHistory } from 'react-router';
import { KTLogo } from 'core/ui';
import './AM.01.01.01LoginView.less';
import { useA00Domain } from '../domains/AM.01.01.01Domain';
import ic_fis from 'assets/img/brand/logo_fis.png';
import ic_VN from 'assets/img/brand/ic_VN.svg';
import ic_EN from 'assets/img/brand/ic_EN.svg';
import { setTimeout } from 'core-js';
var axios = require('axios');
const { Link } = Typography;

const AM010101LoginView = ({ lang = 'vi', ...props }) => {
  const { t } = useTranslation();
  const [, loginDomain] = useA00Domain();
  const [language_menu_visible, setMenuVisible] = useState(false);
  const history = useHistory();
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
    var data = { username: loginInfo.username, password: loginInfo.password };
    loginDomain.loginHandler(data);
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
          <Form
            layout="vertical"
            name="basic"
            className={'form_login'}
            onFinish={login}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <KTLogo mode="logo" logo={ic_fis} />
            <Form.Item
              label="T??n ????ng nh???p"
              name="username"
              rules={[
                {
                  whitespace: true,
                  required: true,
                  message: 'Tr?????ng t??n ????ng nh???p kh??ng ???????c ph??p ????? tr???ng!',
                },
                {
                  pattern: /^[A-Za-z0-9_.]{0,32}$/,
                  message: 'T??n ????ng nh???p kh??ng ch??nh x??c!',
                },
                {
                  max: 20,
                  message: 'Tr?????ng t??n ????ng nh???p kh??ng ???????c qu?? 20 k?? t???',
                },
              ]}
              className="my-custom-field"
            >
              <Input onChange={userNameChange} value={loginInfo.username} />
            </Form.Item>

            <Form.Item
              label="M???t kh???u"
              name="password"
              rules={[
                {
                  whitespace: true,
                  required: true,
                  message: 'Tr?????ng m???t kh???u kh??ng ???????c ph??p ????? tr???ng!',
                },
                {
                  min: 4,
                  max: 12,
                  message: 'Tr?????ng m???t kh???u ph???i c?? ????? d??i 6 ?????n 12 k?? t???',
                },
              ]}
            >
              <Input.Password
                onChange={passwordChange}
                value={loginInfo.password}
              />
            </Form.Item>
            <Form.Item>
              <Button id="loginButton" htmlType="submit">
                ????ng nh???p
              </Button>
            </Form.Item>
            <Form.Item>
              <Link onClick={loginDomain.forgetPassHandler}>
                Qu??n m???t kh???u?
              </Link>
            </Form.Item>
          </Form>
        </Col>
        <Col span={5}></Col>
      </Row>
    </>
  );
};

export default AM010101LoginView;
