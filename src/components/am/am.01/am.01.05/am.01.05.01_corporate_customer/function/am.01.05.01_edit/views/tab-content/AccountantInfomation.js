import React, { useState } from 'react';
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
} from 'antd';
import { KTTitle } from 'core/ui';
import { useTranslation } from 'react-i18next';
import moment from 'moment';

import { useA00Domain } from '../../domains/AM.01.05.01Domain';
import '../../../../common/less/AM.01.05.01.less';
import '../../../../../../../../../assets/less/LC-common.less';
const { Option } = Select;

const AccountantInfoContent = ({ lang = 'vi', ...props }) => {
  const { t } = useTranslation();
  const [, domain] = useA00Domain();
  const dateFormatList = 'DD/MM/YYYY';
  const exceptThisSymbols = ['e', 'E', '+', '-', '.'];

  const [isAnhMatTruocACPicked, setIsAnhMatTruocACPicked] = useState(false);
  const [anhMatTruocACUrl, setAnhMatTruocACUrl] = useState(null);

  const [isAnhMatSauACPicked, setIsAnhMatSauACPicked] = useState(false);
  const [anhMatSauACUrl, setAnhMatSauACUrl] = useState(null);

  const [isAnhCaNhanACPicked, setIsAnhCaNhanACPicked] = useState(false);
  const [anhCaNhanACUrl, setAnhCaNhanACUrl] = useState(null);

  const anhMatTruocACChangeHandler = (event) => {
    props.setAnhMatTruocAC(event.target.files[0]);
    console.log('Mặt trước kế toán trưởng');
    setIsAnhMatTruocACPicked(true);
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      setAnhMatTruocACUrl(reader.result);
    });
    reader.readAsDataURL(event.target.files[0]);
  };

  const anhMatSauACChangeHandler = (event) => {
    props.setAnhMatSauAC(event.target.files[0]);
    setIsAnhMatSauACPicked(true);
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      setAnhMatSauACUrl(reader.result);
    });
    reader.readAsDataURL(event.target.files[0]);
  };

  const anhCaNhanACChangeHandler = (event) => {
    props.setAnhCaNhanAC(event.target.files[0]);
    setIsAnhCaNhanACPicked(true);
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      setAnhCaNhanACUrl(reader.result);
    });
    reader.readAsDataURL(event.target.files[0]);
  };

  const getOcrIdentifyAC = async () => {
    props.getOcrIdentifyAC();
  };
  function onChangeAccountantData(e) {
    props.onAccountantChange(e);
  }
  function onChangeuser2DeputyIdentifyCreatedDate(e) {
    props.onuser2DeputyIdentifyCreatedDateChange(e);
  }

  return (
    <>
      <div className={'main-container'}>
        <Row className={'padding-title'}>
          <Col span={24}>
            <Row className={'padding-title-sub1'}>
              <Col span={24}>
                <KTTitle size={3}>
                  <b>Thông tin Kế toán trưởng</b>
                </KTTitle>
              </Col>
            </Row>
            <Row>
              <Col span={23}>
                <Row>
                  <Col span={8}>
                    Giấy tờ định danh
                    <span className={'text-require'}>*</span>
                  </Col>
                  <Col span={16}>
                    <Form.Item name={'acIDPaperType'}>
                      <Radio.Group defaultValue={'cmtnd'}>
                        <Space direction="vertical">
                          <Radio value={'cmtnd'}>Chứng minh nhân dân</Radio>
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
                        <Row span={24}>
                          <Col span={24} id="mat-truoc">
                            <div className="imgPreview">
                              {isAnhMatTruocACPicked ? (
                                <div>
                                  <div className="previewFile">
                                    <img
                                      className="previewImg"
                                      src={anhMatTruocACUrl}
                                    />
                                  </div>
                                </div>
                              ) : (
                                <p>Chọn ảnh mặt trước giấy tờ tùy thân</p>
                              )}
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col className={'margin-img'} span={24}>
                            <h4>
                              Ảnh mặt trước giấy tờ
                              <span className={'text-require'}>*</span>
                            </h4>
                          </Col>
                          <Col className={'margin-img'} span={24}>
                            <label
                              for="file-upload-mat-truoc-ac"
                              class="custom-file-upload "
                            >
                              <i class="fa fa-cloud-upload"></i> Upload
                            </label>
                            <input
                              type="file"
                              name="file-ac"
                              onChange={(e) => {
                                anhMatTruocACChangeHandler(e);
                              }}
                              id="file-upload-mat-truoc-ac"
                            />
                          </Col>
                        </Row>
                      </Col>
                      <Col span={2}></Col>
                      <Col className={'photoPreviewCont'} span={6}>
                        <Row span={24}>
                          <Col span={24} id="mat-sau">
                            <div className="imgPreview">
                              {isAnhMatSauACPicked ? (
                                <div>
                                  <div className="previewFile">
                                    <img
                                      className="previewImg"
                                      src={anhMatSauACUrl}
                                    />
                                  </div>
                                </div>
                              ) : (
                                <p>Chọn ảnh mặt sau giấy tờ tùy thân</p>
                              )}
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col className={'margin-img'} span={24}>
                            <h4>
                              Ảnh mặt sau giấy tờ
                              <span className={'text-require'}>*</span>
                            </h4>
                          </Col>
                          <Col className={'margin-img'} span={24}>
                            <label
                              for="file-upload-mat-sau-ac"
                              class="custom-file-upload "
                            >
                              <i class="fa fa-cloud-upload"></i> Upload
                            </label>
                            <input
                              type="file"
                              name="file-ac"
                              onChange={(e) => {
                                anhMatSauACChangeHandler(e);
                              }}
                              id="file-upload-mat-sau-ac"
                            />
                          </Col>
                        </Row>
                      </Col>
                      <Col span={2}></Col>
                      <Col className={'photoPreviewCont'} span={6}>
                        <Row span={24}>
                          <Col span={24} id="anh-ca-nhan">
                            <div className="imgPreview">
                              {isAnhCaNhanACPicked ? (
                                <div>
                                  <div className="previewFile">
                                    <img
                                      className="previewImg anhcanhan"
                                      src={anhCaNhanACUrl}
                                    />
                                  </div>
                                </div>
                              ) : (
                                <p>Chọn ảnh chân dung cá nhân</p>
                              )}
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col span={24}>
                            <Row className={'margin-img'} span={24}>
                              <Col span={8}>
                                <h4>
                                  eKYC cá nhân
                                  <span className={'text-require'}>*</span>
                                </h4>
                              </Col>
                              <Col span={16}>
                                <Select
                                  defaultValue="anhcanhan"
                                  className={'width-select-img'}
                                  // onChange={handleChange}
                                >
                                  <Option value="anhcanhan">Ảnh cá nhân</Option>
                                  <Option value="webcam">Quay video</Option>
                                </Select>
                              </Col>
                            </Row>
                          </Col>
                          <Col span={24}>
                            <Row className={'margin-img'} span={24}>
                              <label
                                for="file-upload-ca-nhan-ac"
                                class="custom-file-upload "
                              >
                                <i class="fa fa-cloud-upload"></i> Upload
                              </label>
                              <input
                                type="file"
                                name="file-ac"
                                onChange={(e) => {
                                  anhCaNhanACChangeHandler(e);
                                }}
                                id="file-upload-ca-nhan-ac"
                              />
                            </Row>
                          </Col>
                        </Row>
                      </Col>
                      <Col span={1}></Col>
                    </Row>
                    <Row>
                      <Col span={21}></Col>
                      <Col span={2}>
                        <Button
                          className={'button-submit-img common-btn'}
                          onClick={(e) => {
                            getOcrIdentifyAC();
                          }}
                        >
                          Trích xuất
                        </Button>
                      </Col>
                      <Col span={1}></Col>
                    </Row>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    Họ và tên
                    <span className={'text-require'}>*</span>
                  </Col>
                  <Col span={16}>
                    <Form.Item
                      name={'user2DeputyName'}
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
                        name="user2DeputyName"
                        onChange={onChangeAccountantData}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row>
                  <Col span={8}>
                    Số giấy tờ định danh{' '}
                    <span className={'text-require'}>*</span>
                  </Col>
                  <Col span={16}>
                    <Form.Item
                      name={'user2DeputyIdentifyNumber'}
                      rules={[
                        {
                          required: true,
                          message:
                            'Trường số giấy tờ định danh không được phép để trống!',
                        },
                      ]}
                    >
                      <Input
                        name="user2DeputyIdentifyNumber"
                        value={onChangeAccountantData}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    Ngày cấp <span className={'text-require'}>*</span>
                  </Col>
                  <Col span={16}>
                    <Form.Item
                      name={'user2DeputyIdentifyCreatedDate'}
                      rules={[
                        {
                          required: true,
                          message: 'Trường ngày cấp không được phép để trống!',
                        },
                      ]}
                    >
                      <DatePicker
                        name="user2DeputyIdentifyCreatedDate"
                        className={'width-date-picker'}
                        defaultValue={moment('01/01/2015')}
                        format={dateFormatList}
                        placeholder="Chọn ngày cấp"
                        onChange={onChangeuser2DeputyIdentifyCreatedDate}
                        // value={user2DeputyIdentifyCreatedDate}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row>
                  <Col span={8}>
                    Nơi Cấp <span className={'text-require'}>*</span>
                  </Col>
                  <Col span={16}>
                    <Form.Item
                      name={'user2DeputyIdentifyCreatedPlace'}
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
                        name="user2DeputyIdentifyCreatedPlace"
                        onChange={onChangeAccountantData}
                        // value={user2DeputyIdentifyCreatedPlace}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    Chức vụ <span className={'text-require'}>*</span>
                  </Col>
                  <Col span={16}>
                    <Form.Item
                      name={'user2DeputyRoles'}
                      rules={[
                        {
                          required: true,
                          message: 'Trường chức vụ không được phép để trống!',
                        },
                        {
                          whitespace: true,
                          message: 'Trường chức vụ không được phép để trống!',
                        },
                      ]}
                    >
                      <Input
                        name="user2DeputyRoles"
                        onChange={onChangeAccountantData}
                        // value={user2DeputyRoles}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    Điện thoại di động <span className={'text-require'}>*</span>
                  </Col>
                  <Col span={16}>
                    <Form.Item
                      name={'user2DeputyIdentifyPhone'}
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
                      ]}
                    >
                      <Input
                        name="user2DeputyIdentifyPhone"
                        type={'number'}
                        onKeyDown={(e) =>
                          exceptThisSymbols.includes(e.key) &&
                          e.preventDefault()
                        }
                        onChange={onChangeAccountantData}
                        // value={user1DeputyIdentifyPhone}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    Email{' '}
                    <span
                      className={'text-require'}
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
                      *
                    </span>
                  </Col>
                  <Col span={16}>
                    <Form.Item name={'user2DeputyIdentifyEmail'}>
                      <Input
                        name="user2DeputyIdentifyEmail"
                        onChange={onChangeAccountantData}
                        // value={user1DeputyIdentifyEmail}
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
