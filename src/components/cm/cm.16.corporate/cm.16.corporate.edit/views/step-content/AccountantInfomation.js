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
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { CloudUploadOutlined } from '@ant-design/icons';
import { UpdateCorporateDomain } from '../../domains/EditUploadCorporateDomain';
import log from '../../views/ModuleLogger';
import '../EditCorporate.less';
const { Option } = Select;

const listPositions = [
  { label: 'Người đại diện pháp luật', value: 'legal_representative' },
  { label: 'Kế toán trưởng', value: 'accountant' },
];
const AccountantInfoContent = ({ lang = 'vi', ...props }) => {
  const { t } = useTranslation();
  const [context, domain] = UpdateCorporateDomain();
  const dateFormatList = 'DD/MM/YYYY';
  const exceptThisSymbols = ['e', 'E', '+', '-', '.'];

  useEffect(() => {
    log.debug('useEffect--', context);
  }, [context]);

  const anhMatTruocChangeHandler = (e) => {
    domain.anhMatTruocACChangeHandler(e);
  };

  const anhMatSauChangeHandler = (e) => {
    domain.anhMatSauACChangeHandler(e);
  };

  const anhCaNhanChangeHandler = (e) => {
    domain.anhCaNhanACChangeHandler(e);
  };

  const getOcrIdentify = () => {
    domain.submitFileAC();
  };

  const paperTypeChangeHandler = (e) => {
    domain.onAccountantPaperTypeChange(e);
  };
  return (
    <>
      <div style={{ background: 'white', borderRadius: '5px' }}>
        <Row style={{ padding: 16 }}>
          <Col span={24}>
            <Row style={{ paddingBottom: 15 }}>
              <Col span={24}>
                <KTTitle size={3}>
                  <b>Thông tin Kế toán trưởng</b>
                </KTTitle>
              </Col>
            </Row>
            <Row>
              <Col span={23}>
                <Row>
                  <Col span={7}>
                    Giấy tờ định danh
                    <span style={{ color: '#F5222D' }}>*</span>
                  </Col>
                  <Col span={17}>
                    <Form.Item name={'accountantPaperType'}>
                      <Radio.Group
                        onChange={paperTypeChangeHandler}
                        // defaultValue={''}
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
                          <Row span={24}>
                            <Col span={24} id="mat-truoc">
                              {/* {context?.isAnhMatTruocACPicked ? ( */}
                              <div className="imgPreview">
                                <div>
                                  <div className="previewFile">
                                    <img
                                      className="previewImg anhcanhan gttt"
                                      src={context?.anhMatTruocACUrl}
                                    />
                                  </div>
                                </div>
                              </div>
                              {/* ) : (
                                <div className="imgPreview-placeholder">
                                  <div></div>
                                </div>
                              )} */}
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

                              <h4 style={{ color: '#8C8C8C' }}>
                                Định dạng JPG, PNG, dung lượng khống quá 5MB
                              </h4>
                            </Col>
                          </Row>
                          <Row className="photo-action">
                            <Col span={24}>
                              <label
                                for="file-upload-mat-truoc-ac"
                                class="custom-file-upload "
                              >
                                Tải lên ảnh
                              </label>
                              <input
                                type="file"
                                name="file"
                                onChange={(e) => {
                                  anhMatTruocChangeHandler(e);
                                }}
                                id="file-upload-mat-truoc-ac"
                              />
                            </Col>
                          </Row>
                        </div>
                      </Col>
                      <Col span={2}></Col>
                      <Col className={'photoPreviewCont'} span={6}>
                        <div className="photoPreviewCont-section">
                          <Row span={24}>
                            <Col span={24} id="mat-sau">
                              {context?.accountantPaperType != 'hc' ? (
                                <div className="imgPreview">
                                  <div>
                                    <div className="previewFile">
                                      <img
                                        className="previewImg anhcanhan gttt"
                                        src={context?.anhMatSauACUrl}
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
                              <h4 style={{ color: '#8C8C8C' }}>
                                Định dạng JPG, PNG, dung lượng khống quá 5MB
                              </h4>
                            </Col>
                          </Row>
                          <Row className="photo-action">
                            <Col span={24}>
                              <label
                                for="file-upload-mat-sau-ac"
                                className={` ${
                                  context?.accountantPaperType == 'hc'
                                    ? 'custom-file-upload-disable'
                                    : 'custom-file-upload'
                                }`}
                              >
                                Tải lên ảnh
                              </label>
                              <input
                                accept="image/x-png,image/jpeg,image/jpg"
                                type="file"
                                name="file"
                                onChange={(e) => {
                                  anhMatSauChangeHandler(e);
                                }}
                                disabled={
                                  context?.accountantPaperType == 'hc'
                                    ? true
                                    : false
                                }
                                id="file-upload-mat-sau-ac"
                              />
                            </Col>
                          </Row>
                        </div>
                      </Col>
                      <Col span={2}></Col>
                      <Col className={'photoPreviewCont'} span={6}>
                        <div className="photoPreviewCont-section">
                          <Row span={24}>
                            <Col span={24} id="anh-ca-nhan-ac">
                              {/* {context?.isAnhCaNhanACPicked ? ( */}
                              <div className="imgPreview">
                                <div>
                                  <div className="previewFile">
                                    <img
                                      className="previewImg anhcanhan"
                                      src={context?.anhCaNhanACUrl}
                                    />
                                  </div>
                                </div>
                              </div>
                              {/* ) : (
                                <div className="imgPreview-placeholder">
                                  <div></div>
                                </div>
                              )} */}
                            </Col>
                          </Row>
                          <Row>
                            <Col span={24}>
                              <Col
                                style={{
                                  marginLeft: '10px',
                                  marginTop: '5px',
                                }}
                                span={24}
                              >
                                <h3>
                                  eKYC cá nhân
                                  <span style={{ color: '#F5222D' }}>*</span>
                                </h3>
                                <h4 style={{ color: '#8C8C8C' }}>
                                  Định dạng JPG, PNG, dung lượng khống quá 5MB
                                </h4>
                              </Col>
                            </Col>
                          </Row>
                          <Row className="photo-action">
                            <Col span={11}>
                              <Button className="custom-file-upload-ekyc-secondary">
                                Quay camera
                              </Button>
                            </Col>
                            <Col span={2}></Col>
                            <Col span={11}>
                              <label
                                for="file-upload-ca-nhan-ac"
                                class="custom-file-upload-ekyc"
                              >
                                Tải lên ảnh
                              </label>
                              <input
                                type="file"
                                name="file"
                                onChange={(e) => {
                                  anhCaNhanChangeHandler(e);
                                }}
                                id="file-upload-ca-nhan-ac"
                              />
                            </Col>
                          </Row>
                        </div>
                      </Col>
                      <Col span={1}></Col>
                    </Row>
                    <Divider />
                    <Row style={{ marginBottom: '10px' }}>
                      <Col span={21}></Col>
                      <Col span={2}>
                        <Button
                          style={{ float: 'right' }}
                          className="common-btn extract-btn"
                          onClick={(e) => {
                            getOcrIdentify();
                          }}
                        >
                          Trích xuất{' '}
                          <span style={{ marginLeft: '10px' }}>
                            <CloudUploadOutlined />
                          </span>
                        </Button>
                      </Col>
                      <Col span={1}></Col>
                    </Row>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    Họ và tên
                    <span style={{ color: '#F5222D' }}>*</span>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      name={'acName'}
                      rules={[
                        {
                          required: true,
                          message: 'Trường họ và tên không được phép để trống!',
                        },
                        {
                          whitespace: true,
                          message: 'Trường họ và tên không được phép để trống!',
                        },
                      ]}
                    >
                      <Input
                        onChange={(e) => domain.onAcNameChange(e)}
                        name="acName"
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row>
                  <Col span={8}>
                    Số giấy tờ định danh{' '}
                    <span style={{ color: '#F5222D' }}>*</span>
                  </Col>
                  <Col span={7}>
                    <Form.Item
                      name={'acIdNumber'}
                      rules={[
                        {
                          required: true,
                          message:
                            'Trường số giấy tờ định danh không được phép để trống!',
                        },
                      ]}
                    >
                      <Input
                        onChange={(e) => domain.onAcIdNumberChange(e)}
                        name="acIdNumber"
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    Ngày sinh<span style={{ color: '#F5222D' }}>*</span>
                  </Col>
                  <Col span={7}>
                    <Form.Item
                      name={'acDOB'}
                      rules={[
                        {
                          required: true,
                          message: 'Trường ngày cấp không được phép để trống!',
                        },
                      ]}
                    >
                      <DatePicker
                        name="acDOB"
                        style={{ width: '100%' }}
                        defaultValue={moment('01/01/2015')}
                        format={dateFormatList}
                        placeholder="Chọn ngày cấp"
                        onChange={(e) => domain.onAcDOBChange(e)}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    Ngày cấp <span style={{ color: '#F5222D' }}>*</span>
                  </Col>
                  <Col span={7}>
                    <Form.Item
                      name={'acIdIssuedDate'}
                      rules={[
                        {
                          required: true,
                          message: 'Trường ngày cấp không được phép để trống!',
                        },
                      ]}
                    >
                      <DatePicker
                        name="acIdIssuedDate"
                        style={{ width: '100%' }}
                        defaultValue={moment('01/01/2015')}
                        format={dateFormatList}
                        placeholder="Chọn ngày cấp"
                        onChange={(e) => domain.onAcIdIssuedDateChange(e)}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row>
                  <Col span={8}>
                    Nơi Cấp <span style={{ color: '#F5222D' }}>*</span>
                  </Col>
                  <Col span={16}>
                    <Form.Item
                      name={'acIdIssuedPlace'}
                      rules={[
                        {
                          required: true,
                          message: 'Trường nơi cấp không được phép để trống!',
                        },
                        {
                          whitespace: true,
                          message: 'Trường nơi cấp không được phép để trống!',
                        },
                      ]}
                    >
                      <Input
                        onChange={(e) => domain.onAcIdIssuedPlaceChange(e)}
                        name="acIdIssuedPlace"
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    Chức vụ <span style={{ color: '#F5222D' }}>*</span>
                  </Col>
                  <Col span={16}>
                    <Form.Item name={'acRole'}>
                      <Select
                        name={'acRole'}
                        defaultValue={listPositions[1].value}
                        onChange={(e) => domain.onAcRoleChange(e)}
                      >
                        {listPositions.map((role) => (
                          <Select.Option value={role.value}>
                            {role.label}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    Điện thoại di động{' '}
                    <span style={{ color: '#F5222D' }}>*</span>
                  </Col>
                  <Col span={7}>
                    <Form.Item
                      name={'acPhoneNumber'}
                      rules={[
                        {
                          required: true,
                          message:
                            'Trường điện thoại di động không được phép để trống!',
                        },
                        {
                          whitespace: true,
                          message:
                            'Trường điện thoại di động không được phép để trống!',
                        },
                        {
                          max: 10,
                          message:
                            'Trường điện thoại di động không được phép vượt quá 10 ký tự!',
                        },
                      ]}
                    >
                      <Input
                        onChange={(e) => domain.onAcPhoneNumberChange(e)}
                        name="acPhoneNumber"
                        type={'number'}
                        onKeyDown={(e) =>
                          exceptThisSymbols.includes(e.key) &&
                          e.preventDefault()
                        }
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    Email <span style={{ color: '#F5222D' }}>*</span>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      name={'acEmail'}
                      rules={[
                        {
                          required: true,
                          message: 'Trường email không được phép để trống!',
                        },
                        {
                          whitespace: true,
                          message: 'Trường email không được phép để trống!',
                        },
                      ]}
                    >
                      <Input
                        onChange={(e) => domain.onAcEmailChange(e)}
                        name="acEmail"
                        type={'email'}
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

export default AccountantInfoContent;
