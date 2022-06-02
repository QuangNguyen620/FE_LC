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
import moment from 'moment';
import '../../../../common/less/AM.01.05.01.less';
import '../../../../../../../../../assets/less/LC-common.less';
const { Option } = Select;

const RepresentationInfoContent = ({ lang = 'vi', ...props }) => {
  const dateFormatList = 'DD/MM/YYYY';
  const exceptThisSymbols = ['e', 'E', '+', '-', '.'];

  const [isAnhMatTruocPicked, setIsAnhMatTruocPicked] = useState(false);
  const [anhMatTruocUrl, setAnhMatTruocUrl] = useState(null);

  const [isAnhMatSauPicked, setIsAnhMatSauPicked] = useState(false);
  const [anhMatSauUrl, setAnhMatSauUrl] = useState(null);

  const [isAnhCaNhanPicked, setIsAnhCaNhanPicked] = useState(false);
  const [anhCaNhanUrl, setAnhCaNhanUrl] = useState(null);

  const anhMatTruocChangeHandler = (event) => {
    props.setAnhMatTruoc(event.target.files[0]);
    setIsAnhMatTruocPicked(true);
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      setAnhMatTruocUrl(reader.result);
    });
    reader.readAsDataURL(event.target.files[0]);
  };

  const anhMatSauChangeHandler = (event) => {
    props.setAnhMatSau(event.target.files[0]);
    setIsAnhMatSauPicked(true);
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      setAnhMatSauUrl(reader.result);
    });
    reader.readAsDataURL(event.target.files[0]);
  };

  const anhCaNhanChangeHandler = (event) => {
    props.setAnhCaNhan(event.target.files[0]);
    setIsAnhCaNhanPicked(true);
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      setAnhCaNhanUrl(reader.result);
    });
    reader.readAsDataURL(event.target.files[0]);
  };

  const getOcrIdentify = async () => {
    props.getOcrIdentify();
  };

  const onChangeLawRepresentatorData = (e) => {
    props.onLawRepresentatorChange(e);
  };

  const onChangeuser1DeputyIdentifyCreatedDate = (e) => {
    props.onUser1DeputyIdentifyCreatedDateChange(e);
  };

  return (
    <>
      <div className={'main-container'}>
        <Row className={'padding-title'}>
          <Col span={24}>
            <Row className={'padding-title-sub1'}>
              <Col span={24}>
                <KTTitle size={3}>
                  <b>Thông tin Người đại diện pháp lý</b>
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
                    <Form.Item name={'lRIDPaperType'}>
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
                              {isAnhMatTruocPicked ? (
                                <div>
                                  <div className="previewFile">
                                    <img
                                      className="previewImg anhcanhan"
                                      src={anhMatTruocUrl}
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
                              for="file-upload-mat-truoc"
                              class="custom-file-upload "
                            >
                              <i class="fa fa-cloud-upload"></i> Upload
                            </label>
                            <input
                              type="file"
                              name="file"
                              onChange={(e) => {
                                anhMatTruocChangeHandler(e);
                              }}
                              id="file-upload-mat-truoc"
                            />
                          </Col>
                        </Row>
                      </Col>
                      <Col span={2}></Col>
                      <Col className={'photoPreviewCont'} span={6}>
                        <Row span={24}>
                          <Col span={24} id="mat-sau">
                            <div className="imgPreview">
                              {isAnhMatSauPicked ? (
                                <div>
                                  <div className="previewFile">
                                    <img
                                      className="previewImg anhcanhan"
                                      src={anhMatSauUrl}
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
                              for="file-upload-mat-sau"
                              class="custom-file-upload "
                            >
                              <i class="fa fa-cloud-upload"></i> Upload
                            </label>
                            <input
                              type="file"
                              name="file"
                              onChange={(e) => {
                                anhMatSauChangeHandler(e);
                              }}
                              id="file-upload-mat-sau"
                            />
                          </Col>
                        </Row>
                      </Col>
                      <Col span={2}></Col>
                      <Col className={'photoPreviewCont'} span={6}>
                        <Row span={24}>
                          <Col span={24} id="anh-ca-nhan">
                            <div className="imgPreview">
                              {isAnhCaNhanPicked ? (
                                <div>
                                  <div className="previewFile">
                                    <img
                                      className="previewImg anhcanhan"
                                      src={anhCaNhanUrl}
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
                                for="file-upload-ca-nhan"
                                class="custom-file-upload "
                              >
                                <i class="fa fa-cloud-upload"></i> Upload
                              </label>
                              <input
                                type="file"
                                name="file"
                                onChange={(e) => {
                                  anhCaNhanChangeHandler(e);
                                }}
                                id="file-upload-ca-nhan"
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
                            getOcrIdentify();
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
                      name={'user1DeputyName'}
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
                        name="user1DeputyName"
                        onChange={onChangeLawRepresentatorData}
                        // value={user1DeputyIdentifyNumber}
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
                      name={'user1DeputyIdentifyNumber'}
                      rules={[
                        {
                          required: true,
                          message:
                            'Trường số giấy tờ định danh không được phép để trống!',
                        },
                      ]}
                    >
                      <Input
                        name="user1DeputyIdentifyNumber"
                        onChange={onChangeLawRepresentatorData}
                        // value={user1DeputyIdentifyNumber}
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
                      name={'user1DeputyIdentifyCreatedDate'}
                      rules={[
                        {
                          required: true,
                          message: 'Trường ngày cấp không được phép để trống!',
                        },
                      ]}
                    >
                      <DatePicker
                        name="user1DeputyIdentifyCreatedDate"
                        className={'width-date-picker'}
                        defaultValue={moment('01/01/2015')}
                        format={dateFormatList}
                        placeholder="Chọn ngày cấp"
                        onChange={onChangeuser1DeputyIdentifyCreatedDate}
                        // value={user1DeputyIdentifyCreatedDate}
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
                      name={'user1DeputyIdentifyCreatedPlace'}
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
                        name="user1DeputyIdentifyCreatedPlace"
                        onChange={onChangeLawRepresentatorData}
                        // value={user1DeputyIdentifyCreatedPlace}
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
                      name={'user1DeputyRoles'}
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
                        name="user1DeputyRoles"
                        onChange={onChangeLawRepresentatorData}
                        // value={user1DeputyRoles}
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
                      name={'user1DeputyIdentifyPhone'}
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
                        name="user1DeputyIdentifyPhone"
                        type={'number'}
                        onKeyDown={(e) =>
                          exceptThisSymbols.includes(e.key) &&
                          e.preventDefault()
                        }
                        onChange={onChangeLawRepresentatorData}
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
                    <Form.Item name={'user1DeputyIdentifyEmail'}>
                      <Input
                        name="user1DeputyIdentifyEmail"
                        onChange={onChangeLawRepresentatorData}
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

export default RepresentationInfoContent;
