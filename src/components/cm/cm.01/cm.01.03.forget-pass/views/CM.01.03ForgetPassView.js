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
import './CM.01.03ForgetPass.less';
import { useA00Domain } from '../domains/CM.01.03Domain';
import { useHistory } from 'react-router';
import ic_fis from 'assets/img/brand/logo_fis.png';
import ic_VN from 'assets/img/brand/ic_VN.svg';
import ic_EN from 'assets/img/brand/ic_EN.svg';
var axios = require('axios');

const { Link } = Typography;

const CM0103ForgetPassView = ({ lang = 'vi', ...props }) => {
  const { t } = useTranslation();
  const history = useHistory();
  const [, forgetPassDomain] = useA00Domain();
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

  const [passwordReq, setPasswordReq] = useState({
    userCode: '',
    email: '',
    phoneNumber: '',
    passwordNew: '',
  });

  const submitHandler = (value) => {
    var data = {
      userCode: passwordReq.userCode,
      email: value.email,
    };
    console.log('Received values of form: ', data);

    var configPromise = forgetPassDomain.submitHandler(data);
    console.log('config', configPromise);
    configPromise
      .then((result) => {
        axios(result)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
            if (response.data.success) {
              message.info(response.data.message);
              history.push('/login');
            } else {
              message.error(response.data.message);
              history.push('/forgetpass');
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

        <Col span={14} align="middle">
          <Form
            layout="vertical"
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 24,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={submitHandler}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <KTLogo mode="logo" logo={ic_fis} />
            <Form.Item
              label="Tên đăng nhập"
              name="username"
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
            {/* <Form.Item
              label="Số điện thoại"
              name="phone-number"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập nhập số điện thoại !',
                },
              ]}
            >
              <Input onChange={onChangePhoneNumber} />
            </Form.Item> */}

            

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

export default CM0103ForgetPassView;
