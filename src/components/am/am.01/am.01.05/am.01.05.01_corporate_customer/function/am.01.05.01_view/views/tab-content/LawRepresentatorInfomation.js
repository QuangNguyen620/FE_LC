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

  const onChangeLRIdIssuedDate = (e) => {
    props.onLRIdIssuedDateChange(e);
  };

  return (
    <>
      <div className={'main-container'}>
        <Row className={'padding-title'}>
          <Col span={24}>
            <Row className={'padding-title-sub1'}>
              <Col span={24}>
                <KTTitle size={3}>
                  <b>Th??ng tin Ng?????i ?????i di???n ph??p l??</b>
                </KTTitle>
              </Col>
            </Row>
            <Row>
              <Col span={23}>
                <Row>
                  <Col span={8}>
                    Gi???y t??? ?????nh danh
                    <span className={'text-require'}>*</span>
                  </Col>
                  <Col span={16}>
                    <Form.Item name={'lRIDPaperType'}>
                      <Radio.Group disabled defaultValue={''}>
                        <Space direction="vertical">
                          <Radio value={''}>Ch???ng minh nh??n d??n</Radio>
                          <Radio value={'hc'}>H??? chi???u</Radio>
                        </Space>
                      </Radio.Group>
                    </Form.Item>
                  </Col>
                </Row>

                {/* <Row className={'photoPreviewContRow'}>
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
                                <p>Ch???n ???nh m???t tr?????c gi???y t??? t??y th??n</p>
                              )}
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col
                            
                            className={'margin-img'}
                            span={24}
                          >
                            <h4>
                              ???nh m???t tr?????c gi???y t???
                              <span  className={'text-require'}>*</span>
                            </h4>
                          </Col>
                          <Col
                            
                            className={'margin-img'}
                            span={24}
                          >
                            <label
                              for="file-upload-mat-truoc"
                              class="custom-file-upload "
                            >
                              <i class="fa fa-cloud-upload"></i> Upload
                            </label>
                            <Input disabled
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
                                <p>Ch???n ???nh m???t sau gi???y t??? t??y th??n</p>
                              )}
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col
                            
                            className={'margin-img'}
                            span={24}
                          >
                            <h4>
                              ???nh m???t sau gi???y t???
                              <span  className={'text-require'}>*</span>
                            </h4>
                          </Col>
                          <Col
                            
                            className={'margin-img'}
                            span={24}
                          >
                            <label
                              for="file-upload-mat-sau"
                              class="custom-file-upload "
                            >
                              <i class="fa fa-cloud-upload"></i> Upload
                            </label>
                            <Input disabled
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
                                <p>Ch???n ???nh ch??n dung c?? nh??n</p>
                              )}
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col span={24}>
                            <Row
                              
                            className={'margin-img'}
                              span={24}
                            >
                              <Col span={8}>
                                <h4>
                                  eKYC c?? nh??n
                                  <span  className={'text-require'}>*</span>
                                </h4>
                              </Col>
                              <Col span={16}>
                                <Select
                                  defaultValue="anhcanhan"
                                  className={'width-select-img'}
                                  // onChange={handleChange}
                                >
                                  <Option value="anhcanhan">???nh c?? nh??n</Option>
                                  <Option value="webcam">Quay video</Option>
                                </Select>
                              </Col>
                            </Row>
                          </Col>
                          <Col span={24}>
                            <Row
                              
                            className={'margin-img'}
                              span={24}
                            >
                              <label
                                for="file-upload-ca-nhan"
                                class="custom-file-upload "
                              >
                                <i class="fa fa-cloud-upload"></i> Upload
                              </label>
                              <Input disabled
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
                          Tr??ch xu???t
                        </Button>
                      </Col>
                      <Col span={1}></Col>
                    </Row>
                  </Col>
                </Row> */}

                <Row>
                  <Col span={8}>
                    H??? v?? t??n
                    <span className={'text-require'}>*</span>
                  </Col>
                  <Col span={16}>
                    <Form.Item
                      name={'user1DeputyName'}
                      rules={[
                        {
                          required: true,
                          message: 'Tr?????ng h??? v?? t??n kh??ng ???????c ph??p ????? tr???ng!',
                        },
                        {
                          whitespace: true,
                          message: 'Tr?????ng h??? v?? t??n kh??ng ???????c ph??p ????? tr???ng!',
                        },
                      ]}
                    >
                      <Input
                        disabled
                        name="user1DeputyName"
                        onChange={onChangeLawRepresentatorData}
                        // value={user1DeputyIdentifyNumber}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row>
                  <Col span={8}>
                    S??? gi???y t??? ?????nh danh{' '}
                    <span className={'text-require'}>*</span>
                  </Col>
                  <Col span={16}>
                    <Form.Item
                      name={'user1DeputyIdentifyNumber'}
                      rules={[
                        {
                          required: true,
                          message:
                            'Tr?????ng s??? gi???y t??? ?????nh danh kh??ng ???????c ph??p ????? tr???ng!',
                        },
                      ]}
                    >
                      <Input
                        disabled
                        name="user1DeputyIdentifyNumber"
                        onChange={onChangeLawRepresentatorData}
                        // value={user1DeputyIdentifyNumber}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    Ng??y c???p <span className={'text-require'}>*</span>
                  </Col>
                  <Col span={16}>
                    <Form.Item
                      name={'user1DeputyIdentifyCreatedDate'}
                      rules={[
                        {
                          required: true,
                          message: 'Tr?????ng ng??y c???p kh??ng ???????c ph??p ????? tr???ng!',
                        },
                      ]}
                    >
                      <DatePicker
                        disabled
                        name="user1DeputyIdentifyCreatedDate"
                        className={'width-date-picker'}
                        defaultValue={moment('01/01/2015')}
                        format={dateFormatList}
                        placeholder="Ch???n ng??y c???p"
                        onChange={onChangeLRIdIssuedDate}
                        // value={user1DeputyIdentifyCreatedDate}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row>
                  <Col span={8}>
                    N??i C???p <span className={'text-require'}>*</span>
                  </Col>
                  <Col span={16}>
                    <Form.Item
                      name={'user1DeputyIdentifyCreatedPlace'}
                      rules={[
                        {
                          required: true,
                          message: 'Tr?????ng n??i c???p kh??ng ???????c ph??p ????? tr???ng!',
                        },
                        {
                          whitespace: true,
                          message: 'Tr?????ng n??i c???p kh??ng ???????c ph??p ????? tr???ng!',
                        },
                      ]}
                    >
                      <Input
                        disabled
                        name="user1DeputyIdentifyCreatedPlace"
                        onChange={onChangeLawRepresentatorData}
                        // value={user1DeputyIdentifyCreatedPlace}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    Ch???c v??? <span className={'text-require'}>*</span>
                  </Col>
                  <Col span={16}>
                    <Form.Item
                      name={'user1DeputyRoles'}
                      rules={[
                        {
                          required: true,
                          message: 'Tr?????ng ch???c v??? kh??ng ???????c ph??p ????? tr???ng!',
                        },
                        {
                          whitespace: true,
                          message: 'Tr?????ng ch???c v??? kh??ng ???????c ph??p ????? tr???ng!',
                        },
                      ]}
                    >
                      <Input
                        disabled
                        name="user1DeputyRoles"
                        onChange={onChangeLawRepresentatorData}
                        // value={user1DeputyRoles}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    ??i???n tho???i di ?????ng <span className={'text-require'}>*</span>
                  </Col>
                  <Col span={16}>
                    <Form.Item
                      name={'user1DeputyIdentifyPhone'}
                      rules={[
                        {
                          required: true,
                          message:
                            'Tr?????ng ??i???n tho???i di ?????ng kh??ng ???????c ph??p ????? tr???ng!',
                        },
                        {
                          whitespace: true,
                          message:
                            'Tr?????ng ??i???n tho???i di ?????ng kh??ng ???????c ph??p ????? tr???ng!',
                        },
                      ]}
                    >
                      <Input
                        disabled
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
                    Email <span className={'text-require'}>*</span>
                  </Col>
                  <Col span={16}>
                    <Form.Item
                      name={'user1DeputyIdentifyEmail'}
                      rules={[
                        {
                          required: true,
                          message: 'Tr?????ng email kh??ng ???????c ph??p ????? tr???ng!',
                        },
                        {
                          whitespace: true,
                          message: 'Tr?????ng email kh??ng ???????c ph??p ????? tr???ng!',
                        },
                      ]}
                    >
                      <Input
                        disabled
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
