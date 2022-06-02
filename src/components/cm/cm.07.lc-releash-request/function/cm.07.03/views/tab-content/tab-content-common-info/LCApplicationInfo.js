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
import { CM1602Domain } from '../../../domains/CM.07.Domain';
// import '../../../../component/less/CM.07.less';
const { Option } = Select;

const CommonInfoContent = ({ lang = 'vi', ...props }) => {
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
                    Mã đề nghị phát hành L/C
                    <span style={{ color: '#F5222D' }}></span>
                  </Col>
                  <Col span={16}>
                    <p>{context?.lcApplication?.proposalCodeRelease}</p>
                  </Col>
                </Row>
                <Divider></Divider>
                <Row>
                  <Col span={8}>
                    Ngân hàng phát hành{' '}
                    <span style={{ color: '#F5222D' }}></span>
                  </Col>
                  <Col span={16}>
                    <p>{context?.lcApplication?.bankReleash}</p>
                  </Col>
                </Row>
                <Divider></Divider>
                <Row>
                  <Col span={8}>
                    Ngày đề nghị
                    <span style={{ color: '#F5222D' }}></span>
                  </Col>
                  <Col span={16}>
                    <p>{context?.lcApplication?.proposalDate}</p>
                  </Col>
                </Row>
                <Divider></Divider>
                <Row>
                  <Col span={8}>
                    Loại L/C <span style={{ color: '#F5222D' }}></span>
                  </Col>
                  <Col span={16}>
                    <p>{context?.lcApplication?.lcType}</p>
                  </Col>
                </Row>
                <Divider></Divider>
                <Row>
                  <Col span={8}>
                    Bên đề nghị phát hành L/C
                    <span style={{ color: '#F5222D' }}></span>
                  </Col>
                  <Col span={16}>
                    <p>{context?.lcApplication?.corporateBuy}</p>
                  </Col>
                </Row>
                <Divider></Divider>
                <Row>
                  <Col span={8}>
                    Địa chỉ và thông tin liên hệ bên đề nghị{' '}
                    <span style={{ color: '#F5222D' }}></span>
                  </Col>
                  <Col span={16}>
                    <p>{context?.lcApplication?.corporateBuyAddress}</p>
                  </Col>
                </Row>
                <Divider></Divider>
                <Row>
                  <Col span={8}>
                    Bên Thụ hưởng <span style={{ color: '#F5222D' }}></span>
                  </Col>
                  <Col span={16}>
                    <p>{context?.lcApplication?.corporateSell}</p>
                  </Col>
                </Row>
                <Divider></Divider>
                <Row>
                  <Col span={8}>
                    Địa chỉ và thông tin liên hệ bên thụ hưởng
                    <span style={{ color: '#F5222D' }}></span>
                  </Col>
                  <Col span={16}>
                    <p>{context?.lcApplication?.corporateSellAddress}</p>
                  </Col>
                </Row>
                <Divider></Divider>
                <Row>
                  <Col span={8}>
                    Ngân hàng thông báo{' '}
                    <span style={{ color: '#F5222D' }}></span>
                  </Col>
                  <Col span={16}>
                    <p>{context?.lcApplication?.bankConfirm}</p>
                  </Col>
                </Row>
                <Divider></Divider>
                <Row>
                  <Col span={8}>
                    Địa chỉ ngân hàng thông báo{' '}
                    <span style={{ color: '#F5222D' }}></span>
                  </Col>
                  <Col span={16}>
                    <p>{context?.lcApplication?.bankConfirmAddress}</p>
                  </Col>
                </Row>
                <Divider></Divider>
                <Row>
                  <Col span={8}>
                    Ngân hàng chuyển nhượng{' '}
                    <span style={{ color: '#F5222D' }}></span>
                  </Col>
                  <Col span={16}>
                    <p>{context?.lcApplication?.bankTranfer}</p>
                  </Col>
                </Row>
                <Divider></Divider>
                <Row>
                  <Col span={8}>
                    Chỉ dẫn xác nhận
                    <span style={{ color: '#F5222D' }}></span>
                  </Col>
                  <Col span={16}>
                    <p>{context?.lcApplication?.confirmationInstruction}</p>
                  </Col>
                </Row>
                <Divider></Divider>
                <Row>
                  <Col span={8}>
                    Yêu cầu ngân hàng xác nhận
                    <span style={{ color: '#F5222D' }}></span>
                  </Col>
                  <Col span={16}>
                    <p>{context?.lcApplication?.confirmingBankRequest}</p>
                  </Col>
                </Row>
                <Divider></Divider>
                <Row>
                  <Col span={8}>
                    Ngân hàng xác nhận
                    <span style={{ color: '#F5222D' }}></span>
                  </Col>
                  <Col span={16}>
                    <p>{context?.lcApplication?.bankIdConfirmRequest}</p>
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

export default CommonInfoContent;
