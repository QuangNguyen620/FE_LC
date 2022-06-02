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
              <Col span={23}>
                <Row style={{ paddingBottom: 15 }}>
                  <Col span={24}>
                    <KTTitle size={3}>
                      <b>Bảo hiểm hàng hóa</b>
                    </KTTitle>
                  </Col>
                </Row>
                <Row>
                  <Col span={1}></Col>
                  <Col span={7}>
                    <Form.Item> Bảo hiểm hàng hóa</Form.Item>
                    <span style={{ color: '#F5222D' }}></span>
                  </Col>
                  <Col span={16}>
                    <Form.Item name={'cargoInsurance'}>
                      {context?.cargoInsurance}
                    </Form.Item>
                  </Col>
                </Row>
                <Divider className="divider-view" />

                <Row style={{ paddingBottom: 15 }}>
                  <Col span={24}>
                    <KTTitle size={3}>
                      <b>Quy định phạt và bồi thường hợp đồng</b>
                    </KTTitle>
                  </Col>
                </Row>
                <Row>
                  <Col span={1}></Col>
                  <Col span={7}>
                    <Form.Item>Nghĩa vụ bên Mua</Form.Item>
                    <span style={{ color: '#F5222D' }}></span>
                  </Col>
                  <Col span={16}>
                    <Form.Item name={'obligationsBuyer'}>
                      {context?.obligationsBuyer}
                    </Form.Item>
                  </Col>
                  <Divider className="divider-view" />
                  <Col span={1}></Col>
                  <Col span={7}>
                    <Form.Item>Nghĩa vụ bên Bán</Form.Item>
                    <span style={{ color: '#F5222D' }}></span>
                  </Col>
                  <Col span={16}>
                    <Form.Item name={'obligationsSeller'}>
                      {context?.obligationsSeller}
                    </Form.Item>
                  </Col>
                  <Divider className="divider-view" />
                  <Col span={1}></Col>
                  <Col span={7}>
                    <Form.Item> Quy định phạt và bồi thường</Form.Item>
                    <span style={{ color: '#F5222D' }}></span>
                  </Col>
                  <Col span={16}>
                    <Form.Item
                      name={'regulationsPenaltiesAndContractCompensation'}
                    >
                      {context?.regulationsPenaltiesAndContractCompensation}
                    </Form.Item>
                  </Col>
                </Row>
                <Divider className="divider-view" />

                <Row style={{ paddingBottom: 15 }}>
                  <Col span={24}>
                    <KTTitle size={3}>
                      <b>Thủ tục tranh chấp giải quyết hợp đồng</b>
                    </KTTitle>
                  </Col>
                </Row>
                <Row>
                  <Col span={1}></Col>
                  <Col span={7}>
                    <Form.Item>Thủ tục tranh chấp giải quyết</Form.Item>
                    <span style={{ color: '#F5222D' }}></span>
                  </Col>
                  <Col span={16}>
                    <Form.Item name={'disputeSettlementProcedures'}>
                      {context?.disputeSettlementProcedures}
                    </Form.Item>
                  </Col>
                </Row>
                <Divider className="divider-view" />

                <Row style={{ paddingBottom: 15 }}>
                  <Col span={24}>
                    <KTTitle size={3}>
                      <b>Trường hợp bất khả kháng</b>
                    </KTTitle>
                  </Col>
                </Row>
                <Row>
                  <Col span={1}></Col>
                  <Col span={7}>
                    <Form.Item> Trường hợp bất khả kháng</Form.Item>
                    <span style={{ color: '#F5222D' }}></span>
                  </Col>
                  <Col span={16}>
                    <Form.Item name={'caseOfForceMajeure'}>
                      {context?.caseOfForceMajeure}
                    </Form.Item>
                  </Col>
                </Row>
                <Divider className="divider-view" />

                <Row style={{ paddingBottom: 15 }}>
                  <Col span={24}>
                    <KTTitle size={3}>
                      <b>Điều khoản chung</b>
                    </KTTitle>
                  </Col>
                </Row>
                <Row>
                  <Col span={1}></Col>
                  <Col span={7}>
                    <Form.Item> Điều khoản chung</Form.Item>
                    <span style={{ color: '#F5222D' }}></span>
                  </Col>
                  <Col span={16}>
                    <Form.Item name={'generalTerms'}>
                      {context?.generalTerms}
                    </Form.Item>
                  </Col>
                </Row>
                <Divider className="divider-view" />

                <Row style={{ paddingBottom: 15 }}>
                  <Col span={24}>
                    <KTTitle size={3}>
                      <b>Hiệu lực thi hành</b>
                    </KTTitle>
                  </Col>
                </Row>
                <Row>
                  <Col span={1}></Col>
                  <Col span={7}>
                    <Form.Item>Hiệu lực thi hành</Form.Item>
                    <span style={{ color: '#F5222D' }}></span>
                  </Col>
                  <Col span={16}>
                    <Form.Item name={'validityContract'}>
                      {context?.validityContract}
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
