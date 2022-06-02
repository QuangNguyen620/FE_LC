import React, { useState } from 'react';
import {
  Col,
  Row,
  Input,
  Button,
  Form,
  Select,
  Checkbox,
  Space,
  DatePicker,
  Tabs,
  Radio,
} from 'antd';
import { KTTitle } from 'core/ui';
import { useTranslation } from 'react-i18next';
import {} from '@ant-design/icons';
import moment from 'moment';
// import { KTBodyText, KTButton, KTHeading, KTSubTitle, KTLogo } from 'core/ui';
// import ic_fis from 'assets/img/brand/logo_fis.png';
import '../../../../common/less/AM.01.05.01.less';
import '../../../../../../../../../assets/less/LC-common.less';

const { Option } = Select;

const RepresentationInfoContent = ({ lang = 'vi', ...props }) => {
  const { t } = useTranslation();

  const dateFormatList = 'DD/MM/YYYY';

  return (
    <>
      <div className={'main-container'}>
        <Row className={'padding-title'}>
          <Col span={24}>
            <Row className={'padding-title-sub1'}>
              <Col span={24}>
                <KTTitle size={3}>
                  <b>Thông tin chữ ký số</b>
                </KTTitle>
              </Col>
            </Row>
            <Row>
              <Col span={23}>
                <Row>
                  <Col span={8}>
                    Serial
                    <span className={'text-require'}>*</span>
                  </Col>
                  <Col span={16}>
                    <Form.Item name={'serial'}>
                      <Input
                        name="serial"
                        // onChange={changeDeputyUser}
                        // value={user1DeputyName}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row>
                  <Col span={8}>
                    Chữ ký <span className={'text-require'}>*</span>
                  </Col>
                  <Col span={16}>
                    <Form.Item
                      name={'signature'}
                      // rules={[
                      //   {
                      //     required: true,
                      //     message: 'Trường chức vụ không được phép để trống!',
                      //   },
                      //   {
                      //     whitespace: true,
                      //     message: 'Trường chức vụ không được phép để trống!',
                      //   },
                      // ]}
                    >
                      <Input
                        name="signature"
                        // onChange={changeDeputyUser}
                        // value={user1DeputyRoles}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    Tên thuê bao <span className={'text-require'}>*</span>
                  </Col>
                  <Col span={16}>
                    <Form.Item
                      name={'subject'}
                      // rules={[
                      //   {
                      //     required: true,
                      //     message: 'Trường chức vụ không được phép để trống!',
                      //   },
                      //   {
                      //     whitespace: true,
                      //     message: 'Trường chức vụ không được phép để trống!',
                      //   },
                      // ]}
                    >
                      <Input
                        name="subject"
                        // onChange={changeDeputyUser}
                        // value={user1DeputyRoles}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    Thời gian <span className={'text-require'}>*</span>
                  </Col>
                  <Col span={16}>
                    <Form.Item
                      name={'signtime'}
                      // rules={[
                      //   {
                      //     required: true,
                      //     message: 'Trường chức vụ không được phép để trống!',
                      //   },
                      //   {
                      //     whitespace: true,
                      //     message: 'Trường chức vụ không được phép để trống!',
                      //   },
                      // ]}
                    >
                      <Input
                        name="signtime"
                        // onChange={changeDeputyUser}
                        // value={user1DeputyRoles}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    Chứng chỉ <span className={'text-require'}></span>
                  </Col>
                  <Col span={16}>
                    <Form.Item
                      name={'certificate'}
                      // rules={[
                      //   {
                      //     required: true,
                      //     message: 'Trường chức vụ không được phép để trống!',
                      //   },
                      //   {
                      //     whitespace: true,
                      //     message: 'Trường chức vụ không được phép để trống!',
                      //   },
                      // ]}
                    >
                      <Input
                        name="certificate"
                        // onChange={changeDeputyUser}
                        // value={user1DeputyRoles}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    Ngày hiệu lực <span className={'text-require'}>*</span>
                  </Col>
                  <Col span={16}>
                    <Form.Item
                      name={'from'}
                      // rules={[
                      //   {
                      //     required: true,
                      //     message: 'Trường ngày sinh không được phép để trống!',
                      //   },
                      // ]}
                    >
                      <Input
                        name="from"
                        // onChange={changeDeputyUser}
                        // value={user1DeputyRoles}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    Ngày hết hiệu lực <span className={'text-require'}>*</span>
                  </Col>
                  <Col span={16}>
                    <Form.Item
                      name={'to'}
                      // rules={[
                      //   {
                      //     required: true,
                      //     message: 'Trường ngày sinh không được phép để trống!',
                      //   },
                      // ]}
                    >
                      <Input
                        name="to"
                        // onChange={changeDeputyUser}
                        // value={user1DeputyRoles}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    Hiệu lực
                    <span className={'text-require'}>*</span>
                  </Col>
                  <Col span={16}>
                    <Form.Item
                      name={'validity'}
                      // rules={[
                      //   {
                      //     required: true,
                      //     message: 'Trường quốc tịch không được phép để trống!',
                      //   },
                      // ]}
                    >
                      <Input
                        name="validity"
                        // onChange={changeDeputyUser}
                        // value={user1DeputyNational}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    Người phát hành
                    <span className={'text-require'}>*</span>
                  </Col>
                  <Col span={16}>
                    <Form.Item
                      name={'issuer'}
                      // rules={[
                      //   {
                      //     required: true,
                      //     message: 'Trường quốc tịch không được phép để trống!',
                      //   },
                      // ]}
                    >
                      <Input
                        name="issuer"
                        // onChange={changeDeputyUser}
                        // value={user1DeputyNational}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    MST
                    <span className={'text-require'}>*</span>
                  </Col>
                  <Col span={16}>
                    <Form.Item
                      name={'mst'}
                      // rules={[
                      //   {
                      //     required: true,
                      //     message: 'Trường quốc tịch không được phép để trống!',
                      //   },
                      // ]}
                    >
                      <Input
                        name="mst"
                        // onChange={changeDeputyUser}
                        // value={user1DeputyNational}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
              <Col span={1}></Col>
            </Row>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default RepresentationInfoContent;
