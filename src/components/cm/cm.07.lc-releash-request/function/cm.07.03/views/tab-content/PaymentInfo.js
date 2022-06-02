import React, { useState, useEffect } from 'react';
import {
  Col,
  Row,
  Input,
  Button,
  Form,
  Select,
  Space,
  DatePicker,
  Radio,
  Divider,
} from 'antd';
import { KTTitle } from 'core/ui';
import moment from 'moment';
import { CM1602Domain } from '../../domains/CM.07.Domain';
import '../../../../component/less/CM.07.less';
const { Option } = Select;

const PaymentInfoContent = ({ lang = 'vi', ...props }) => {
  const dateFormatList = 'DD/MM/YYYY';
  const [context, domain] = CM1602Domain();
  return (
    <>
      <div style={{ background: 'white', borderRadius: '5px' }}>
        <Row style={{ padding: 16 }}>
          <Col span={24}>
            <Row>
              <Col span={23}>
                <Row>
                  <Col span={8}>
                    Trị giá L/C
                    <span style={{ color: '#F5222D' }}></span>
                  </Col>
                  <Col span={16}>
                    <p>{context?.lcApplication?.valueLc}</p>
                  </Col>
                </Row>
                <Divider></Divider>
                <Row>
                  <Col span={8}>
                    Dung sai trên số tiền (%)
                    <span style={{ color: '#F5222D' }}></span>
                  </Col>
                  <Col span={16}>
                    <p>
                      {context?.lcApplication?.positiveTolerance +
                        ' / ' +
                        context?.lcApplication?.negativeTolerance}
                    </p>
                  </Col>
                </Row>
                <Divider></Divider>
                <Row>
                  <Col span={8}>
                    Chứng từ xuất trình tại
                    <span style={{ color: '#F5222D' }}></span>
                  </Col>
                  <Col span={16}>
                    <p>{context?.lcApplication?.presentationAt}</p>
                  </Col>
                </Row>
                <Divider></Divider>
                <Row>
                  <Col span={8}>
                    Ngân hàng sẽ xuất trình chứng từ
                    <span style={{ color: '#F5222D' }}></span>
                  </Col>
                  <Col span={16}>
                    <p>{context?.lcApplication?.bankIdPresentationAt}</p>
                  </Col>
                </Row>
                <Divider></Divider>
                <Row>
                  <Col span={8}>
                    Điều khoản thanh toán
                    <span style={{ color: '#F5222D' }}></span>
                  </Col>
                  <Col span={16}>
                    <p>{context?.lcApplication?.termOfPayment}</p>
                  </Col>
                </Row>
                <Divider></Divider>
                <Row>
                  <Col span={8}>
                    Chi tiết điều khoản thanh toán
                    <span style={{ color: '#F5222D' }}></span>
                  </Col>
                  <Col span={16}>
                    <p>{context?.lcApplication?.noteTermOfPayment}</p>
                  </Col>
                </Row>
                <Divider></Divider>{' '}
                <Row>
                  <Col span={8}>
                    Số tiền thanh toán
                    <span style={{ color: '#F5222D' }}></span>
                  </Col>
                  <Col span={16}>
                    <p>{context?.lcApplication?.paymentAmount}</p>
                  </Col>
                </Row>
                <Divider></Divider>
                <Row>
                  <Col span={8}>
                    Ngày hết hạn
                    <span style={{ color: '#F5222D' }}></span>
                  </Col>
                  <Col span={16}>
                    <p>{context?.lcApplication?.dueDate}</p>
                  </Col>
                </Row>
                <Divider></Divider>
                <Row>
                  <Col span={8}>
                    Nơi hết hạn
                    <span style={{ color: '#F5222D' }}></span>
                  </Col>
                  <Col span={16}>
                    <p>{context?.lcApplication?.dueAddress}</p>
                  </Col>
                </Row>
                <Divider></Divider>
                <Row>
                  <Col span={8}>
                    Phí
                    <span style={{ color: '#F5222D' }}></span>
                  </Col>
                  <Col span={16}>
                    <p>{context?.lcApplication?.fee}</p>
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

export default PaymentInfoContent;
