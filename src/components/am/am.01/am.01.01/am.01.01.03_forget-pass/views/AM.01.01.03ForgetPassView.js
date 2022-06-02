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
  Checkbox,
} from 'antd';
import { KTLogo } from 'core/ui';
import './AM.01.01.03ForgetPass.less';
import { useA00Domain } from '../domains/AM.01.01.03Domain';
import { useHistory } from 'react-router';
import ic_fis from 'assets/img/brand/logo_fis.png';
import ic_VN from 'assets/img/brand/ic_VN.svg';
import ic_EN from 'assets/img/brand/ic_EN.svg';
var axios = require('axios');

const { Link } = Typography;

const AM010103ForgetPassView = ({ lang = 'vi', ...props }) => {
  const { t } = useTranslation();
  const history = useHistory();
  const [, forgetPassDomain] = useA00Domain();
  const [language_menu_visible, setMenuVisible] = useState(false);

  const menu = (
    <Menu>
      <Menu.Item key="alt-lang">
        <Link href={lang == 'vi' ? '?lang=en' : '?lang=vi'}>
          <KTLogo icon={lang == 'vi' ? ic_EN : ic_VN} />
        </Link>
      </Menu.Item>
    </Menu>
  );

  const [passwordReq, setPasswordReq] = useState({
    userCode: '',
    email: '',
    phoneNumber: '',
    passwordNew: '',
  });

  const handleVisibleChange = (flag) => {
    setMenuVisible(flag);
  };

  const submitHandler = (value) => {
    var data = {
      userCode: value.userCode,
      email: value.email,
      phoneNumber: value.phoneNumber
    };
    console.log('Received values of form: ', data);

    var configPromise = forgetPassDomain.submitHandler(data);
    console.log('config', configPromise);
    configPromise
      .then((result) => {
        axios(result)
          .then(function (response) {
            if (response.data.success) {
              message.info(response.data.message);
              history.push('/');
            } else {
              message.info(response.data.message);
              history.push('/forgetpassword');
            }
          })
          .catch(function (error) {
            message.error('Quên mật khẩu thất bại!');
          });
      })
      .catch((err) => console.log('hieutt---' + err));
  };

  const onChangeUserCode = (e) => {
    setPasswordReq({
      ...passwordReq,
      userCode: e.target.value,
    });
  };

  const onChangeEmail = (e) => {};

  const onChangePhoneNumber = (e) => {};

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
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
        <Col align="middle" span={14}>
          <Form
            className={'form_login'}
            layout="vertical"
            name="basic"
            onFinish={submitHandler}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <KTLogo mode="logo" logo={ic_fis} />
            <Form.Item
              label="Tên đăng nhập"
              name="userCode"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập tên đăng nhập!',
                },
              ]}
              className="my-custom-field"
            >
              <Input onChange={onChangeUserCode} />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập nhập email!',
                },
              ]}
            >
              <Input onChange={onChangeEmail} />
            </Form.Item>
            

            <Form.Item>
              <Space className={'padding_buton'}>
                <Button id="confirm-btn" htmlType="submit">
                  Xác nhận
                </Button>
                <Button onClick={forgetPassDomain.exitHandler} id="close-btn">
                  Đóng
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Col>
        <Col span={5}></Col>
      </Row>
    </>
  );
};

export default AM010103ForgetPassView;
