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
  InputNumber,
  Tag,
} from 'antd';
import { EyeFilled } from '@ant-design/icons';
import { KTTitle } from 'core/ui';
import { useTranslation } from 'react-i18next';
import moment from 'moment';

import { CreateCorporateDomain } from '../../domains/ViewCorporateDomain';
import '../ViewCorporate.less';
import ViewPDFModal from '../modal/viewFile/viewPDFModal';
const { Option } = Select;

const CommonInfoContent = ({ lang = 'vi', ...props }) => {
  const dateFormatList = 'DD/MM/YYYY';
  const [context, domain] = CreateCorporateDomain();
  const [visiblePDFModal, setVisiblePDFModal] = useState(false);

  const closeModal = () => {
    setVisiblePDFModal(false);
  };
  const openModal = () => {
    setVisiblePDFModal(true);
    console.log(context?.corporate?.businessRegistrationCertificateUrl);
  };
  return (
    <>
      <ViewPDFModal
        isVisbled={visiblePDFModal}
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
                        onClick={(e) => {
                          openModal();
                        }}
                        className="file-tag-clickable"
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
                    <span style={{ color: '#F5222D' }}></span>
                  </Col>
                  <Col span={16}>
                    <Form.Item name={'corporateCode'}>
                      {context?.corporate?.corporateCode}
                    </Form.Item>
                  </Col>
                </Row>

                <Row>
                  <Col span={8}>
                    Tên doanh nghiệp <span style={{ color: '#F5222D' }}></span>
                  </Col>
                  <Col span={16}>
                    <Form.Item name={'corporateName'}>
                      {context?.corporate?.corporateName}
                    </Form.Item>
                  </Col>
                </Row>

                <Row>
                  <Col span={8}>
                    Loại hình doanh nghiệp
                    <span style={{ color: '#F5222D' }}></span>
                  </Col>
                  <Col span={16}>
                    <Form.Item name={'corporateType'}>
                      {context?.corporate?.corporateType}
                    </Form.Item>
                  </Col>
                </Row>

                <Row>
                  <Col span={8}>
                    Địa chỉ trụ sở chính{' '}
                    <span style={{ color: '#F5222D' }}>*</span>
                  </Col>
                  <Col span={16}>
                    <Form.Item name={'hqAddress'}>
                      {context?.corporate?.hqAddress}
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    Điện thoại <span style={{ color: '#F5222D' }}>*</span>
                  </Col>
                  <Col span={16}>
                    <Form.Item name={'phoneNumber'}>
                      {context?.corporate?.phoneNumber}
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    FAX<span style={{ color: '#F5222D' }}></span>
                  </Col>
                  <Col span={16}>
                    <Form.Item name={'fax'}>
                      {context?.corporate?.fax}
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    Email <span style={{ color: '#F5222D' }}></span>
                  </Col>
                  <Col span={16}>
                    <Form.Item name={'email'}>
                      {context?.corporate?.email}
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    Website<span style={{ color: '#F5222D' }}>*</span>
                  </Col>
                  <Col span={16}>
                    <Form.Item name={'website'}>
                      {context?.corporate?.website}
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    Vốn điều lệ (VNĐ){' '}
                    <span style={{ color: '#F5222D' }}>*</span>
                  </Col>
                  <Col span={16}>
                    <Form.Item name={'budget'}>
                      {context?.corporate?.budget}
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    Lần đăng kí <span style={{ color: '#F5222D' }}>*</span>
                  </Col>
                  <Col span={16}>
                    <Form.Item name={'registerTime'}>
                      {context?.corporate?.registerTime}
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    Ngày đăng ký <span style={{ color: '#F5222D' }}>*</span>
                  </Col>
                  <Col span={16}>
                    <Form.Item name={'registerDate'}>
                      {context?.corporate?.registerDate}
                    </Form.Item>
                  </Col>
                </Row>

                <Row>
                  <Col span={8}>
                    Người đại diện pháp luật{' '}
                    <span style={{ color: '#F5222D' }}>*</span>
                  </Col>
                  <Col span={16}>
                    <Form.Item name={'lawRepresentatorFullName'}>
                      {context?.corporate?.lawRepresentatorFullName}
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    Số giấy tờ định danh{' '}
                    <span style={{ color: '#F5222D' }}>*</span>
                  </Col>
                  <Col span={16}>
                    <Form.Item name={'identificationPaperNumber'}>
                      {context?.corporate?.identificationPaperNumber}
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    Nơi cấp <span style={{ color: '#F5222D' }}>*</span>
                  </Col>
                  <Col span={16}>
                    <Form.Item name={'identificationPaperCreatedPlace'}>
                      {context?.corporate?.identificationPaperCreatedPlace}
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    Ngày cấp <span style={{ color: '#F5222D' }}>*</span>
                  </Col>
                  <Col span={16}>
                    <Form.Item name={'identificationPaperCreatedDate'}>
                      {context?.corporate?.identificationPaperCreatedDate}
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
