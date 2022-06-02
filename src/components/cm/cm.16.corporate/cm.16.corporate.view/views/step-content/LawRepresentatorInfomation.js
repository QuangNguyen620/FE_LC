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
  message,
  Divider,
} from 'antd';
import log from '../ModuleLogger';
import { CloudUploadOutlined } from '@ant-design/icons';
import { KTTitle } from 'core/ui';
import moment from 'moment';
import '../ViewCorporate.less';
import { CreateCorporateDomain } from '../../domains/ViewCorporateDomain';
const { Option } = Select;

const listPositions = [
  { label: 'Người đại diện pháp luật', value: 'legal_representative' },
  { label: 'Kế toán trưởng', value: 'accountant' },
];
const RepresentationInfoContent = ({ lang = 'vi', ...props }) => {
  const dateFormatList = 'DD/MM/YYYY';
  const [context, domain] = CreateCorporateDomain();
  useEffect(() => {
    log.debug('useEffect--', context);
  }, [context]);
  const anhMatTruocChangeHandler = (e) => {
    domain.anhMatTruocLRChangeHandler(e);
  };

  const anhMatSauChangeHandler = (e) => {
    domain.anhMatSauLRChangeHandler(e);
  };

  const anhCaNhanChangeHandler = (e) => {
    domain.anhCaNhanLRChangeHandler(e);
  };

  const getOcrIdentify = () => {
    domain.submitFileLR();
  };

  return (
    <>
      <div style={{ background: 'white', borderRadius: '5px' }}>
        <Row style={{ padding: 16 }}>
          <Col span={24}>
            <Row style={{ paddingBottom: 15 }}>
              <Col span={24}>
                <KTTitle size={3}>
                  <b>Thông tin Người đại diện </b>
                </KTTitle>
              </Col>
            </Row>
            <Row>
              <Col span={23}>
                <Row>
                  <Col span={7}>
                    Giấy tờ định danh
                    <span style={{ color: '#F5222D' }}></span>
                  </Col>
                  <Col span={17}>
                    <Form.Item name={'lRIDPaperType'}>
                      <Radio.Group
                        defaultValue={context?.lawRepresentatorPaperType}
                        disabled
                      >
                        <Space direction="horizontal">
                          <Radio value={''}>CMND/CCCD/CCCD gắn chíp</Radio>
                          <Radio value={'hc'}>Hộ chiếu</Radio>
                        </Space>
                      </Radio.Group>
                    </Form.Item>
                  </Col>
                </Row>
                <Row className={'photoPreviewContRow'}>
                  <Col span={24}>
                    <Row>
                      <Col span={1}></Col>
                      <Col className={'photoPreviewCont'} span={6}>
                        <div className="photoPreviewCont-section">
                          <Row gutter={24}>
                            <Col span={24} id="mat-truoc">
                              <div className="imgPreview">
                                <div>
                                  <div className="previewFile">
                                    <img
                                      className="previewImg anhcanhan gttt"
                                      src={context?.anhMatTruocUrl}
                                      alt="Ảnh mặt trước"
                                    />
                                  </div>
                                </div>
                              </div>
                            </Col>
                          </Row>
                          <Row>
                            <Col
                              style={{ marginLeft: '10px', marginTop: '5px' }}
                              span={24}
                            >
                              <h3>
                                Ảnh mặt trước giấy tờ
                                <span style={{ color: '#F5222D' }}>*</span>
                              </h3>
                            </Col>
                          </Row>
                        </div>
                      </Col>
                      <Col span={2}></Col>
                      <Col className={'photoPreviewCont'} span={6}>
                        <div className="photoPreviewCont-section">
                          <Row span={24}>
                            <Col span={24} id="mat-sau">
                              {context?.lawRepresentatorPaperType != 'hc' ? (
                                <div className="imgPreview">
                                  <div>
                                    <div className="previewFile">
                                      <img
                                        className="previewImg anhcanhan gttt"
                                        src={context?.anhMatSauUrl}
                                        alt="Ảnh mặt sau"
                                      />
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <div className="imgPreview-placeholder">
                                  <div></div>
                                </div>
                              )}
                            </Col>
                          </Row>
                          <Row>
                            <Col
                              style={{ marginLeft: '10px', marginTop: '5px' }}
                              span={24}
                            >
                              <h3>
                                Ảnh mặt sau giấy tờ
                                <span style={{ color: '#F5222D' }}>*</span>
                              </h3>
                              {/* <h4 style={{ color: '#8C8C8C' }}>
                                Định dạng JPG, PNG, dung lượng khống quá 5MB
                              </h4> */}
                            </Col>
                          </Row>
                        </div>
                      </Col>
                      <Col span={2}></Col>
                      <Col className={'photoPreviewCont'} span={6}>
                        <div className="photoPreviewCont-section">
                          <Row span={24}>
                            <Col span={24} id="anh-ca-nhan">
                              <div className="imgPreview">
                                <div>
                                  <div className="previewFile">
                                    <img
                                      className="previewImg anhcanhan"
                                      src={context?.anhCaNhanUrl}
                                      alt="Ảnh cá nhân"
                                    />
                                  </div>
                                </div>
                              </div>
                            </Col>
                          </Row>
                          <Row>
                            <Col span={24}>
                              <Col
                                style={{ marginLeft: '10px', marginTop: '5px' }}
                                span={24}
                              >
                                <h3>
                                  eKYC cá nhân
                                  <span style={{ color: '#F5222D' }}>*</span>
                                </h3>
                                {/* <h4 style={{ color: '#8C8C8C' }}>
                                  Định dạng JPG, PNG, dung lượng khống quá 5MB
                                </h4> */}
                              </Col>
                            </Col>
                          </Row>
                        </div>
                      </Col>
                      <Col span={1}></Col>
                    </Row>
                    <Divider />
                  </Col>
                </Row>
                <div className="ekyc-result-container">
                  <Row style={{ paddingBottom: 15 }}>
                    <Col span={24}>
                      <KTTitle size={3}>
                        <b>Xác thực thông tin người đại diện</b>
                      </KTTitle>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={8}>
                      Họ và tên
                      <span style={{ color: '#F5222D' }}></span>
                    </Col>
                    <Col span={8}>
                      <Form.Item name={'lawRepresentatorName'}>
                        {context?.corporate?.lawRepresentatorName}
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row>
                    <Col span={8}>
                      Số giấy tờ định danh{' '}
                      <span style={{ color: '#F5222D' }}></span>
                    </Col>
                    <Col span={7}>
                      <Form.Item name={'lRIdNumber'}>
                        {context?.corporate?.lRIdNumber}
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={8}>
                      Ngày sinh<span style={{ color: '#F5222D' }}></span>
                    </Col>
                    <Col span={7}>
                      <Form.Item name={'lRDOB'}>
                        {context?.corporate?.lRDOB}
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={8}>
                      Ngày cấp <span style={{ color: '#F5222D' }}></span>
                    </Col>
                    <Col span={7}>
                      <Form.Item name={'lRIdIssuedDate'}>
                        {context?.corporate?.lRIdIssuedDate}
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row>
                    <Col span={8}>
                      Nơi Cấp <span style={{ color: '#F5222D' }}></span>
                    </Col>
                    <Col span={16}>
                      <Form.Item name={'lRIdIssuedPlace'}>
                        {context?.corporate?.lRIdIssuedPlace}
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={8}>
                      Chức vụ <span style={{ color: '#F5222D' }}></span>
                    </Col>
                    <Col span={16}>
                      <Form.Item name={'lRRole'}>
                        {context?.corporate?.lRRole}
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={8}>
                      Điện thoại di động{' '}
                      <span style={{ color: '#F5222D' }}></span>
                    </Col>
                    <Col span={7}>
                      <Form.Item name={'lRPhoneNumber'}>
                        {context?.corporate?.lRPhoneNumber}
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={8}>
                      Email <span style={{ color: '#F5222D' }}></span>
                    </Col>
                    <Col span={8}>
                      <Form.Item name={'lREmail'}>
                        {context?.corporate?.lREmail}
                      </Form.Item>
                    </Col>
                  </Row>
                </div>
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
