import React, { useState } from 'react';

import { Col, Row, Input, Form, Select } from 'antd';
import { KTTitle } from 'core/ui';
import { useTranslation } from 'react-i18next';
import {} from '@ant-design/icons';
import moment from 'moment';
// import { KTBodyText, KTButton, KTHeading, KTSubTitle, KTLogo } from 'core/ui';
// import ic_fis from 'assets/img/brand/logo_fis.png';
import '../../../../components/less/CM.04.01.less';
import { useCM0401Domain } from '../../domains/CM.04.01Domain';

const { Option } = Select;

const ConstractInfomation = ({ lang = 'vi', ...props }) => {
  const [context, domain] = useCM0401Domain();
  const { t } = useTranslation();

  const dateFormatList = 'DD/MM/YYYY';

  return (
    <>
      <div className={'main-container'}>
        <Row className={'padding-md'}>
          <Col span={24}>
            <Row>
              <Col span={23}>
                <Row>
                  <Col span={8}>
                    Loại phí
                    <span className={'text-require'}></span>
                  </Col>
                  <Col span={16}>
                    <Form.Item name={'feeType'}>
                      {context?.feeCreateContract?.feeType}
                    </Form.Item>
                  </Col>
                </Row>

                <Row>
                  <Col span={8}>
                    Phí(VND) <span className={'text-require'}></span>
                  </Col>
                  <Col span={16}>
                    <Form.Item name={'fee'}>
                      {context?.feeCreateContract?.fee}
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    Thuế VAT(10%) <span className={'text-require'}></span>
                  </Col>
                  <Col span={16}>
                    <Form.Item name={'vatFee'}>
                      {context?.feeCreateContract?.vatFee}
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    Tổng phí <span className={'text-require'}></span>
                  </Col>
                  <Col span={16}>
                    <Form.Item name={'totalFee'}>
                      {context?.feeCreateContract?.totalFee}
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

export default ConstractInfomation;
