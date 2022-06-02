import React, { useState } from 'react';
import {
  Col,
  Row,
  Input,
  Form,
  Select,
  DatePicker,
  InputNumber,
  Tag,
} from 'antd';
import { EyeFilled } from '@ant-design/icons';
import { KTTitle } from 'core/ui';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import ViewPDFModal from '../modal/viewFile/viewPDFModal';
import { UpdateCorporateDomain } from '../../domains/EditUploadCorporateDomain';
import '../EditCorporate.less';
const { Option } = Select;

const CommonInfoContent = ({ lang = 'vi', ...props }) => {
  const dateFormatList = 'DD/MM/YYYY';
  const exceptThisSymbols = ['e', 'E', '+', '-', '.'];

  const [context, domain] = UpdateCorporateDomain();
  const [visiblePDFModal, setVisiblePDFModal] = useState(false);

  const closeModal = () => {
    console.log('on');
    setVisiblePDFModal(false);
  };
  const openModal = () => {
    console.log('off');
    setVisiblePDFModal(true);
    console.log(context?.corporate?.businessRegistrationCertificateUrlMinio);
  };
  return (
    <>
      <ViewPDFModal
        isVisbled={visiblePDFModal}
        uploadFile={domain.uploadFile}
        toUploadFile={domain.toUploadFile}
        file={context?.corporate?.businessRegistrationCertificateUrlMinio}
        onClose={closeModal}
      />

      <div style={{ background: 'white', borderRadius: '5px' }}>
        <Row style={{ padding: 16 }}>
          <Col span={24}>
            <Row style={{ paddingBottom: 15 }}>
              <Col span={24}>
                <KTTitle size={3}>
                  <b>Thông tin chung</b>
                </KTTitle>
              </Col>
            </Row>
            <Row>
              <Col span={23}>
                <Row>
                  <Col span={8}>
                    Loại giấy tờ<span style={{ color: '#F5222D' }}></span>
                  </Col>
                  <Col span={16}>
                    <Form.Item name={'paperType'}>
                      Giấy phép đăng ký doanh nghiệp
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    Giấy tờ đã tải lên
                    <span style={{ color: '#F5222D' }}></span>
                  </Col>
                  <Col span={16}>
                    <Form.Item name={'uploadedFile'}>
                      <Tag
                        className="file-tag-clickable"
                        onClick={(e) => {
                          openModal();
                        }}
                        color="processing"
                      >
                        {context?.corporate?.businessRegistrationCertificateUrl}
                        {'  '}
                        <span>
                          <EyeFilled />
                        </span>
                      </Tag>
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    Mã số doanh nghiệp
                    <span style={{ color: '#F5222D' }}>*</span>
                  </Col>
                  <Col span={16}>
                    <Form.Item name={'corporateCode'}>
                      {context?.corporate?.corporateCode}
                    </Form.Item>
                  </Col>
                </Row>

                <Row>
                  <Col span={8}>
                    Tên doanh nghiệp <span style={{ color: '#F5222D' }}>*</span>
                  </Col>
                  <Col span={16}>
                    <Form.Item
                      name={'corporateName'}
                      rules={[
                        {
                          required: true,
                          whitespace: true,
                          message:
                            'Trường tên doanh nghiệp không được phép để trống!',
                        },
                        {
                          max: 100,
                          message:
                            'Trường tên doanh nghiệp không được phép vượt quá 100 ký tự',
                        },
                      ]}
                    >
                      <Input
                        onChange={(e) => domain.onCorporateNameChange(e)}
                        name="corporateName"
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row>
                  <Col span={8}>
                    Loại hình doanh nghiệp
                    <span style={{ color: '#F5222D' }}>*</span>
                  </Col>
                  <Col span={16}>
                    <Form.Item
                      name={'corporateType'}
                      rules={[
                        {
                          required: true,
                          message:
                            'Trường loại hình doanh nghiệp không được phép để trống!',
                        },
                        {
                          whitespace: true,
                          message:
                            'Trường loại hình doanh nghiệp không được phép để trống!',
                        },
                        {
                          max: 50,
                          message:
                            'Trường loại hình doanh nghiệp không được phép vượt quá 50 ký tự',
                        },
                      ]}
                    >
                      <Input
                        onChange={(e) => domain.onCorporateTypeChange(e)}
                        name="corporateType"
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row>
                  <Col span={8}>
                    Địa chỉ trụ sở chính{' '}
                    <span style={{ color: '#F5222D' }}>*</span>
                  </Col>
                  <Col span={16}>
                    <Form.Item
                      name={'hqAddress'}
                      rules={[
                        {
                          required: true,
                          whitespace: true,
                          message:
                            'Trường địa chỉ trụ sở chính không được phép để trống!',
                        },
                        {
                          max: 300,
                          message:
                            'Trường địa chỉ trụ sở chính không được phép vượt quá 300 ký tự',
                        },
                      ]}
                    >
                      <Input
                        onChange={(e) => domain.onHQAddressChange(e)}
                        name="hqAddress"
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    Điện thoại <span style={{ color: '#F5222D' }}>*</span>
                  </Col>
                  <Col span={16}>
                    <Form.Item
                      name={'phoneNumber'}
                      rules={[
                        {
                          required: true,
                          whitespace: true,
                          message:
                            'Trường điện thoại không được phép để trống!',
                        },
                        {
                          max: 50,
                          message:
                            'Trường điện thoại không được phép vượt quá 50 ký tự',
                        },
                      ]}
                    >
                      <Input
                        onChange={(e) => domain.onPhoneNumberChange(e)}
                        name="phoneNumber"
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    FAX<span style={{ color: '#F5222D' }}></span>
                  </Col>
                  <Col span={16}>
                    <Form.Item
                      name={'fax'}
                      rules={[
                        {
                          max: 50,
                          message:
                            'Trường fax không được phép vượt quá 50 ký tự',
                        },
                      ]}
                    >
                      <Input
                        onChange={(e) => domain.onFaxChange(e)}
                        name="fax"
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    Email <span style={{ color: '#F5222D' }}></span>
                  </Col>
                  <Col span={16}>
                    <Form.Item
                      name={'email'}
                      rules={[
                        {
                          max: 50,
                          message:
                            'Trường email không được phép vượt quá 50 ký tự',
                        },
                        // {
                        //   pattern:
                        //     /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                        //   message: 'Email không đúng định dạng!',
                        // },
                      ]}
                    >
                      <Input
                        onChange={(e) => domain.onEmailChange(e)}
                        name="email"
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    Website<span style={{ color: '#F5222D' }}></span>
                  </Col>
                  <Col span={16}>
                    <Form.Item
                      name={'website'}
                      rules={[
                        {
                          max: 50,
                          message:
                            'Trường website không được phép vượt quá 50 ký tự',
                        },
                        // {
                        //   pattern:
                        //     /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/,
                        //   message: 'Website không đúng định dạng!',
                        // },
                      ]}
                    >
                      <Input
                        onChange={(e) => domain.onWebsiteChange(e)}
                        name="website"
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    Vốn điều lệ (VNĐ){' '}
                    <span style={{ color: '#F5222D' }}>*</span>
                  </Col>
                  <Col span={16}>
                    <Form.Item
                      name={'budget'}
                      rules={[
                        {
                          required: true,
                          whitespace: true,
                          message: 'Trường vốn điều lệ không được bỏ trống!',
                        },
                        {
                          pattern: /^[\d]{0,50}$/,
                          message:
                            'Trường vốn điều lệ không được vượt quá 50 ký tự',
                        },
                      ]}
                    >
                      <InputNumber
                        onChange={(e) => domain.onBudgetChange(e)}
                        span={16}
                        style={{ width: '100%' }}
                        formatter={(value) =>
                          `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                        }
                        parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                        name="budget"
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    Lần đăng kí <span style={{ color: '#F5222D' }}>*</span>
                  </Col>
                  <Col span={16}>
                    <Form.Item
                      name={'registerTime'}
                      rules={[
                        {
                          max: 10,
                          message:
                            'Trường lần đăng ký không được phép vượt quá 10 ký tự',
                        },
                        {
                          required: true,
                          whitespace: true,
                          message: 'Trường lần đăng ký không được bỏ trống!',
                        },
                      ]}
                    >
                      <Input
                        onChange={(e) => domain.onRegisterTimeChange(e)}
                        name="registerTime"
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
                    Ngày đăng ký <span style={{ color: '#F5222D' }}>*</span>
                  </Col>
                  <Col span={16}>
                    <Form.Item
                      name={'registerDate'}
                      rules={[
                        {
                          required: true,
                          message: 'Trường ngày đăng ký không được bỏ trống!',
                        },
                      ]}
                    >
                      <DatePicker
                        name="registerDate"
                        style={{ width: '100%' }}
                        defaultValue={moment('01/01/2015')}
                        format={dateFormatList}
                        placeholder="Chọn ngày đăng ký"
                        onChange={(e) => domain.onRegisterDateChange(e)}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row>
                  <Col span={8}>
                    Người đại diện pháp luật{' '}
                    <span style={{ color: '#F5222D' }}>*</span>
                  </Col>
                  <Col span={16}>
                    <Form.Item
                      name={'lawRepresentatorFullName'}
                      rules={[
                        {
                          required: true,
                          whitespace: true,
                          message:
                            'Trường người đại diện pháp luật không được bỏ trống!',
                        },
                        {
                          max: 50,
                          message:
                            'Trường người đại diện pháp luật không được vượt quá 50 ký tự',
                        },
                      ]}
                    >
                      <Input
                        onChange={(e) =>
                          domain.onLawRepresentatorFullNameChange(e)
                        }
                        name="lawRepresentatorFullName"
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    Số giấy tờ định danh{' '}
                    <span style={{ color: '#F5222D' }}>*</span>
                  </Col>
                  <Col span={16}>
                    <Form.Item
                      name={'identificationPaperNumber'}
                      rules={[
                        {
                          required: true,
                          whitespace: true,
                          message:
                            'Trường số giấy tờ định danh không được bỏ trống!',
                        },
                        {
                          max: 20,
                          message:
                            'Trường số giấy tờ định danh không được vượt quá 20 ký tự',
                        },
                      ]}
                    >
                      <Input
                        onChange={(e) =>
                          domain.onIdentificationPaperNumberChange(e)
                        }
                        name="identificationPaperNumber"
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    Nơi cấp <span style={{ color: '#F5222D' }}>*</span>
                  </Col>
                  <Col span={16}>
                    <Form.Item
                      name={'identificationPaperCreatedPlace'}
                      rules={[
                        {
                          required: true,
                          whitespace: true,
                          message: 'Trường nơi cấp không được bỏ trống!',
                        },
                        {
                          max: 50,
                          message:
                            'Trường nơi cấp không được vượt quá 50 ký tự',
                        },
                      ]}
                    >
                      <Input
                        onChange={(e) =>
                          domain.onIdentificationPaperCreatedPlaceChange(e)
                        }
                        name="identificationPaperCreatedPlace"
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    Ngày cấp <span style={{ color: '#F5222D' }}>*</span>
                  </Col>
                  <Col span={16}>
                    <Form.Item
                      name={'identificationPaperCreatedDate'}
                      rules={[
                        {
                          required: true,
                          message: 'Trường ngày cấp không được bỏ trống!',
                        },
                      ]}
                    >
                      <DatePicker
                        name="identificationPaperCreatedDate"
                        style={{ width: '100%' }}
                        format={dateFormatList}
                        placeholder="Chọn ngày cấp"
                        onChange={(e) =>
                          domain.onIdentificationPaperCreatedDateChange(e)
                        }
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

export default CommonInfoContent;
