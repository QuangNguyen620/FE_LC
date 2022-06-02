import React, { useEffect, useState } from 'react';
import { Col, Row, Form, Divider } from 'antd';
import { KTTitle } from 'core/ui';
import { useTranslation } from 'react-i18next';
import {} from '@ant-design/icons';
import '../../../../components/less/CM.04.01.less';
import { useCM0401Domain } from '../../domains/CM.04.01Domain';

const ConstractInfomation = ({ lang = 'vi' }) => {
  const [context, domain] = useCM0401Domain();
  const { t } = useTranslation();
  const dateFormatList = 'DD/MM/YYYY';

  useEffect(() => {
    // console.log('context::: ', context);
  }, [context]);

  return (
    <>
      <div className="view-reject-buyer">
        <Row>
          <Col span={24}>
            <Row>
              <Col span={24}>
                <KTTitle size={2}>
                  <b> Lý do từ chối</b>
                </KTTitle>
              </Col>
              <Divider className="divider-customer" />
            </Row>
            <Row>
              <Col span={23}>
                <Row>
                  <Col span={1}></Col>
                  <Col span={7}>
                    <Form.Item>Lý do từ chối bên mua</Form.Item>
                  </Col>
                  <Col span={16}>
                    <Form.Item name={'contractCode'}>
                      {context?.reasonsForRefusingTheBuyer}
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
              <Col span={1}></Col>
              <Divider className="divider-customer" />
            </Row>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ConstractInfomation;
