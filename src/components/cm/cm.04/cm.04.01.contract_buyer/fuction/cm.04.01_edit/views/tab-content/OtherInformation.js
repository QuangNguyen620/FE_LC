import React, { useState } from 'react';
import { Col, Row, Input, Form, Divider } from 'antd';
import { KTTitle } from 'core/ui';
import { useTranslation } from 'react-i18next';
import {} from '@ant-design/icons';
import moment from 'moment';
import '../../../../components/less/CM.04.01.less';
import { useCM0401Domain } from '../../domains/CM.04.01Domain';

const OtherInformation = ({ lang = 'vi' }) => {
  const { t } = useTranslation();
  const [context, domain] = useCM0401Domain();
  const dateFormatList = 'DD/MM/YYYY';

  // thay đổi với các input type = date;
  function onChangeConstractText(e) {
    domain.onChangeConstractText(e);
  }

  return (
    <>
      <div className="content-step">
        <Row style={{ padding: 16 }}>
          <Col span={24}>
            <Row>
              <Col span={24}>
                <KTTitle size={3}>
                  <b>Thông tin khác</b>
                </KTTitle>
              </Col>
              <Divider />
            </Row>
            <Row>
              <Col span={23}>
                <Row style={{ paddingBottom: 15 }}>
                  <Col span={24}>
                    <KTTitle size={3}>
                      <b>Bảo hiểm hàng hóa</b>
                    </KTTitle>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    Bảo hiểm hàng hóa
                    <span style={{ color: '#F5222D' }}></span>
                  </Col>
                  <Col span={16}>
                    <Form.Item
                      name={'cargoInsurance'}
                      rules={[
                        {
                          max: 500,
                          message:
                            'Trường bảo hiểm hàng hóa không được phép vượt quá 500 ký tự!',
                        },
                      ]}
                    >
                      <Input
                        name="cargoInsurance"
                        onChange={onChangeConstractText}
                        maxLength={500}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row style={{ paddingBottom: 15 }}>
                  <Col span={24}>
                    <KTTitle size={3}>
                      <b>Quy định phạt và bồi thường hợp đồng</b>
                    </KTTitle>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    Nghĩa vụ bên mua
                    <span style={{ color: '#F5222D' }}></span>
                  </Col>
                  <Col span={16}>
                    <Form.Item
                      name={'obligationsBuyer'}
                      rules={[
                        {
                          max: 1000,
                          message:
                            'Trường nghĩa vụ bên mua không được phép vượt quá 1000 ký tự!',
                        },
                      ]}
                    >
                      <Input
                        name="obligationsBuyer"
                        onChange={onChangeConstractText}
                        maxLength={1000}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    Nghĩa vụ bên bán
                    <span style={{ color: '#F5222D' }}></span>
                  </Col>
                  <Col span={16}>
                    <Form.Item
                      name={'obligationsSeller'}
                      rules={[
                        {
                          max: 1000,
                          message:
                            'Trường nghĩa vụ bên bán không được phép vượt quá 1000 ký tự!',
                        },
                      ]}
                    >
                      <Input
                        name="obligationsSeller"
                        onChange={onChangeConstractText}
                        maxLength={1000}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    Quy định phạt và bồi thường
                    <span style={{ color: '#F5222D' }}></span>
                  </Col>
                  <Col span={16}>
                    <Form.Item
                      name={'regulationsPenaltiesAndContractCompensation'}
                      rules={[
                        {
                          max: 1000,
                          message:
                            'Trường quy định phạt và bồi thường không được phép vượt quá 1000 ký tự!',
                        },
                      ]}
                    >
                      <Input
                        name="regulationsPenaltiesAndContractCompensation"
                        onChange={onChangeConstractText}
                        maxLength={1000}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row style={{ paddingBottom: 15 }}>
                  <Col span={24}>
                    <KTTitle size={3}>
                      <b>Thủ tục tranh chấp giải quyết hợp đồng</b>
                    </KTTitle>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    Thủ tục tranh chấp giải quyết
                    <span style={{ color: '#F5222D' }}></span>
                  </Col>
                  <Col span={16}>
                    <Form.Item
                      name={'disputeSettlementProcedures'}
                      rules={[
                        {
                          max: 1000,
                          message:
                            'Trường thủ tục tranh chấp giải quyết không được phép vượt quá 1000 ký tự!',
                        },
                      ]}
                    >
                      <Input
                        name="disputeSettlementProcedures"
                        onChange={onChangeConstractText}
                        maxLength={1000}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row style={{ paddingBottom: 15 }}>
                  <Col span={24}>
                    <KTTitle size={3}>
                      <b>Trường hợp bất khả kháng</b>
                    </KTTitle>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    Trường hợp bất khả kháng
                    <span style={{ color: '#F5222D' }}></span>
                  </Col>
                  <Col span={16}>
                    <Form.Item
                      name={'caseOfForceMajeure'}
                      rules={[
                        {
                          max: 1000,
                          message:
                            'Trường trường hợp bất khả kháng không được phép vượt quá 1000 ký tự!',
                        },
                      ]}
                    >
                      <Input
                        name="caseOfForceMajeure"
                        onChange={onChangeConstractText}
                        maxLength={1000}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row style={{ paddingBottom: 15 }}>
                  <Col span={24}>
                    <KTTitle size={3}>
                      <b>Điều khoản chung</b>
                    </KTTitle>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    Điều khoản chung
                    <span style={{ color: '#F5222D' }}></span>
                  </Col>
                  <Col span={16}>
                    <Form.Item
                      name={'generalTerms'}
                      rules={[
                        // {
                        //   whitespace: true,
                        //   required: true,
                        //   message:
                        //     'Trường điều khoản chung không được phép để trống!',
                        // },
                        {
                          max: 1000,
                          message:
                            'Trường điều khoản chung không được phép vượt quá 1000 ký tự!',
                        },
                      ]}
                    >
                      <Input
                        name="generalTerms"
                        onChange={onChangeConstractText}
                        maxLength={1000}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                
                <Row style={{ paddingBottom: 15 }}>
                  <Col span={24}>
                    <KTTitle size={3}>
                      <b>Hiệu lực thi hành</b>
                    </KTTitle>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    Hiệu lực thi hành
                    <span style={{ color: '#F5222D' }}>*</span>
                  </Col>
                  <Col span={16}>
                    <Form.Item
                      name={'validityContract'}
                      rules={[
                        {
                          whitespace: true,
                          required: true,
                          message:
                            'Trường hiệu lực thi hành không được phép để trống!',
                        },
                        {
                          max: 1000,
                          message:
                            'Trường hiệu lực thi hành không được phép vượt quá 1000 ký tự!',
                        },
                      ]}
                    >
                      <Input
                        name="validityContract"
                        onChange={onChangeConstractText}
                        maxLength={1000}
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

export default OtherInformation;
