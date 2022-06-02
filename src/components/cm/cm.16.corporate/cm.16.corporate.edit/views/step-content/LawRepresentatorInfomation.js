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
import log from '../../views/ModuleLogger';
import { CloudUploadOutlined } from '@ant-design/icons';
import { KTTitle } from 'core/ui';
import moment from 'moment';
import '../EditCorporate.less';
import { UpdateCorporateDomain } from '../../domains/EditUploadCorporateDomain';
const { Option } = Select;

const listPositions = [
  { label: 'Người đại diện pháp luật', value: 'legal_representative' },
  { label: 'Kế toán trưởng', value: 'accountant' },
];
const RepresentationInfoContent = ({ lang = 'vi', ...props }) => {
  const dateFormatList = 'DD/MM/YYYY';
  const exceptThisSymbols = ['e', 'E', '+', '-', '.'];

  const [context, domain] = UpdateCorporateDomain();
  useEffect(() => {
    log.debug('useEffect111--', context);
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

  const paperTypeChangeHandler = (e) => {
    domain.onLawRepresentatorPaperTypeChange(e);
  };
  return (
    <>
      <div style={{ background: 'white', borderRadius: '5px' }}>
        <Row style={{ padding: 16 }}>
          <Col span={24}>
            <Row style={{ paddingBottom: 15 }}>
              <Col span={24}>
                <KTTitle size={3}>
                  <b>Thông tin Người đại diện pháp lý</b>
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
                    <Form.Item name={'lawRepresentatorPaperType'}>
                      <Radio.Group
                        // defaultValue={''}
                        onChange={paperTypeChangeHandler}
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
                              {/* {context?.isAnhMatTruocPicked == true ? ( */}
                              <div className="imgPreview">
                                <div>
                                  <div className="previewFile">
                                    <img
                                      className="previewImg anhcanhan gttt"
                                      src={context?.anhMatTruocUrl}
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
                                for="file-upload-mat-truoc"
                                className={'custom-file-upload'}
                              >
                                Tải lên ảnh
                              </label>
                              <input
                                accept="image/x-png,image/jpeg,image/jpg"
                                type="file"
                                name="file"
                                onChange={(e) => {
                                  anhMatTruocChangeHandler(e);
                                }}
                                id="file-upload-mat-truoc"
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
                              <h4 style={{ color: '#8C8C8C' }}>
                                Định dạng JPG, PNG, dung lượng khống quá 5MB
                              </h4>
                            </Col>
                          </Row>
                          <Row className="photo-action">
                            <Col span={24}>
                              <label
                                for="file-upload-mat-sau"
                                className={` ${
                                  context?.lawRepresentatorPaperType == 'hc'
                                    ? 'custom-file-upload-disable'
                                    : 'custom-file-upload '
                                }`}
                              >
                                Tải lên ảnh
                              </label>
                              <input
                                type="file"
                                name="file"
                                disabled={
                                  context?.lawRepresentatorPaperType == 'hc'
                                    ? true
                                    : false
                                }
                                onChange={(e) => {
                                  anhMatSauChangeHandler(e);
                                }}
                                id="file-upload-mat-sau"
                              />
                            </Col>
                          </Row>
                        </div>
                      </Col>
                      <Col span={2}></Col>
                      <Col className={'photoPreviewCont'} span={6}>
                        <div className="photoPreviewCont-section">
                          <Row span={24}>
                            <Col span={24} id="anh-ca-nhan">
                              {/* {context?.isAnhCaNhanPicked ? ( */}
                              <div className="imgPreview">
                                <div>
                                  <div className="previewFile">
                                    <img
                                      className="previewImg anhcanhan"
                                      src={context?.anhCaNhanUrl}
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
                                style={{ marginLeft: '10px', marginTop: '5px' }}
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
                                for="file-upload-ca-nhan"
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
                                id="file-upload-ca-nhan"
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
                      name={'lawRepresentatorName'}
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
                        name="lawRepresentatorName"
                        onChange={(e) => domain.onLawRepresentatorNameChange(e)}
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
                      name={'lRIdNumber'}
                      rules={[
                        {
                          required: true,
                          message:
                            'Trường số giấy tờ định danh không được phép để trống!',
                        },
                      ]}
                    >
                      <Input
                        name="lRIdNumber"
                        onChange={(e) =>
                          domain.onLawRepresentatorIdNumberChange(e)
                        }
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
                      name={'lRDOB'}
                      rules={[
                        {
                          required: true,
                          message: 'Trường ngày sinh không được phép để trống!',
                        },
                      ]}
                    >
                      <DatePicker
                        name="lRDOB"
                        style={{ width: '100%' }}
                        // defaultValue={moment('01/01/2015')}
                        format={dateFormatList}
                        placeholder="Chọn ngày sinh"
                        onChange={(e) => domain.onLawRepresentatorDOBChange(e)}
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
                      name={'lRIdIssuedDate'}
                      rules={[
                        {
                          required: true,
                          message: 'Trường ngày cấp không được phép để trống!',
                        },
                      ]}
                    >
                      <DatePicker
                        name="lRIdIssuedDate"
                        style={{ width: '100%' }}
                        // defaultValue={moment('01/01/2015')}
                        format={dateFormatList}
                        placeholder="Chọn ngày cấp"
                        onChange={(e) =>
                          domain.onLawRepresentatorIssuedDateChange(e)
                        }
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
                      name={'lRIdIssuedPlace'}
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
                        name="lRIdIssuedPlace"
                        onChange={(e) =>
                          domain.onLawRepresentatorIssuedPlaceChange(e)
                        }
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    Chức vụ <span style={{ color: '#F5222D' }}>*</span>
                  </Col>
                  <Col span={16}>
                    <Form.Item name={'lRRole'}>
                      <Select
                        name={'lRRole'}
                        onChange={(e) => domain.onLawRepresentatorRoleChange(e)}
                        defaultValue={listPositions[0].value}
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
                      name={'lRPhoneNumber'}
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
                        name="lRPhoneNumber"
                        type={'number'}
                        onKeyDown={(e) =>
                          exceptThisSymbols.includes(e.key) &&
                          e.preventDefault()
                        }
                        onChange={(e) =>
                          domain.onLawRepresentatorPhoneNumberChange(e)
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
                      name={'lREmail'}
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
                        name="lREmail"
                        onChange={(e) =>
                          domain.onLawRepresentatorEmailChange(e)
                        }
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

export default RepresentationInfoContent;
