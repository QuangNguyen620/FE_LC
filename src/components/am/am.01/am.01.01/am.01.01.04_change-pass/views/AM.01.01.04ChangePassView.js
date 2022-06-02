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
  Checkbox,
  List,
  message,
} from 'antd';
import { KTBodyText, KTHeading, KTLogo } from 'core/ui';
import './AM.01.01.04ChangePass.less';
import { useA00Domain } from '../domains/AM.01.01.04Domain';
import { useHistory } from 'react-router';
import ic_fis from 'assets/img/brand/logo_fis.png';
import ic_VN from 'assets/img/brand/ic_VN.svg';
import ic_EN from 'assets/img/brand/ic_EN.svg';
var axios = require('axios');

const { Link } = Typography;

const passwordRequire = [
  'Mật khẩu phải có độ dài 6 đến 12 ký tự',
  'Mật khẩu phải chứa ít nhất 1 kí tự viết thường, 1 ký tự viết hoa, 1 ký tự số và 1 ký tự đặc biệt (Ví dụ: ` ~ ! @ # $ % ^ & * ( ) _ + - = { } | " ;...) ',
];

const AM010103ForgetPassView = ({ lang = 'vi', ...props }) => {
  const history = useHistory();
  const { t } = useTranslation();
  const [, forgetPassDomain] = useA00Domain();
  const [language_menu_visible, setMenuVisible] = useState(false);
  // const [passwordNew, setPasswordNew] = useState('');
  const handleVisibleChange = (flag) => {
    setMenuVisible(flag);
  };
  var passwordNew = '';
  const menu = (
    <Menu>
      <Menu.Item key="alt-lang">
        <Link href={lang == 'vi' ? '?lang=en' : '?lang=vi'}>
          <KTLogo icon={lang == 'vi' ? ic_EN : ic_VN} />
        </Link>
      </Menu.Item>
    </Menu>
  );
  const submitHandler = () => {
    var data = {
      passwordNew: passwordNew,
    };
    console.log('Received values of form: ', data);

    var configPromise = forgetPassDomain.submitHandler(data);
    console.log('config', configPromise);
    configPromise
      .then((result) => {
        axios(result)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
            message.info(response.data.message);
            history.push('/');
          })
          .catch(function (error) {
            message.error('Đổi mật khẩu thất bại!');
          });
      })
      .catch((err) => console.log('hieutt---' + err));
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const onChangePass = (e) => {
    passwordNew = e.target.value;
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
            className={'form_login'}
            layout="vertical"
            name="basic"
            onFinish={submitHandler}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <KTLogo mode="logo" logo={ic_fis} />

            <Form.Item
              label="Mật khẩu mới"
              name="passwordNew"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập nhập mật khẩu mới !',
                },
                {
                  pattern: new RegExp(
                    '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,})',
                  ),
                  message: 'Mật khẩu chưa đủ mạnh',
                },
              ]}
            >
              <Input.Password onChange={onChangePass} />
            </Form.Item>
            <Form.Item
              label="Xác nhận mật khẩu"
              name="confirm password"
              dependencies={['passwordNew']}
              rules={[
                {
                  required: true,
                  message: 'Vui lòng xác nhận mật khẩu!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('passwordNew') === value) {
                      return Promise.resolve();
                    }

                    return Promise.reject(
                      new Error(
                        'Mật khẩu xác nhận phải trùng với mật khẩu mới!',
                      ),
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Row>
              <KTHeading level={7}>Điều khoản & các điều kiện</KTHeading>
            </Row>
            <Row>
              <Space direction="horizontal" size={16}>
                <Form.Item
                  name="agreement"
                  valuePropName="checked"
                  rules={[
                    {
                      validator: (_, value) =>
                        value
                          ? Promise.resolve()
                          : Promise.reject(
                              new Error(
                                'Vui lòng đồng ý với các điều khoản và điều kiện',
                              ),
                            ),
                    },
                  ]}
                >
                  <Checkbox>
                    <KTHeading level={8}>
                      Tôi đã đọc, hiểu và đồng ý với các điều khoản và điều kiện
                    </KTHeading>
                  </Checkbox>
                </Form.Item>
              </Space>
            </Row>
            <List
              className={'text_require'}
              dataSource={passwordRequire}
              renderItem={(item) => (
                <List.Item>
                  <KTBodyText size={4}>{item}</KTBodyText>
                </List.Item>
              )}
            />

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
