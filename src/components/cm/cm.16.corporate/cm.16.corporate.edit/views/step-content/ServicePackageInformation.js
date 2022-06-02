import React, { useState, useEffect } from 'react';
import { Col, Row, Select, Space, Table, Form, Radio, Input } from 'antd';
import { KTTitle } from 'core/ui';
import { useTranslation } from 'react-i18next';
import {} from '@ant-design/icons';
import moment from 'moment';
import { UpdateCorporateDomain } from '../../domains/EditUploadCorporateDomain';
import '../EditCorporate.less';
import '../../../../../../assets/less/LC-common.less';

const { Option } = Select;

const ServicePackageContent = ({ lang = 'vi', ...props }) => {
  const { t } = useTranslation();

  // const dateFormatList = 'DD/MM/YYYY';
  const [form] = Form.useForm();
  const [context, domain] = UpdateCorporateDomain();
  const columns = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
      render: (text, record, index) => (
        <Space size="middle" wrap>
          <p>{index + 1}</p>
        </Space>
      ),
    },
    {
      title: 'Loại phí',
      dataIndex: 'costType',
      key: 'costType',
    },
    {
      title: 'Mức phí',
      dataIndex: 'costLevel',
      key: 'costLevel',
    },
    {
      title: 'Ghi chú',
      dataIndex: 'note',
      key: 'note',
    },
  ];

  const data = [
    { costType: 'Trả phí theo giao dịch', costLevel: '', note: '' },
    {
      costType: 'Ký hợp đồng điện tử',
      costLevel: '20.000 VND/ giao dịch',
      note: 'Áp dụng Doanh nghiệp mua/ Doanh nghiệp bán',
    },
    {
      costType: 'Xuất trình chứng từ',
      costLevel: '20.000 VND/ giao dịch',
      note: 'Áp dụng doanh nghiệp bán',
    },
    {
      costType: 'Trả phí theo tháng',
      costLevel: '200.000 VND/ tháng',
      note: 'Không giới hạn số lần giao dịch ký Hợp đồng điện tử xuất trình chứng từ trong tháng',
    },
  ];

  return (
    <>
      <div style={{ background: 'white', borderRadius: '5px' }}>
        <Row style={{ padding: 16 }}>
          <Col span={24}>
            <Row style={{ paddingBottom: 15 }}>
              <Col span={24}>
                <KTTitle size={3}>
                  <b>Gói dịch vụ</b>
                </KTTitle>
              </Col>
            </Row>
            <Row>
              <Col span={23}>
                <Row>
                  <Col span={8}>
                    Lựa chọn gói dịch vụ{' '}
                    <span style={{ color: '#F5222D' }}>*</span>
                  </Col>
                  <Col span={16}>
                    <Form.Item>
                      <Radio.Group
                        defaultValue={context?.corporate?.packageServiceId}
                        onChange={(e) => domain.onServicePackageChange(e)}
                        name={'packageServiceId'}
                      >
                        <Space direction="horizontal">
                          <Radio value={'1'}>Trả phí theo giao dịch</Radio>
                          <Radio value={'2'}>Trả phí theo tháng</Radio>
                        </Space>
                      </Radio.Group>
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <b>Biểu phí áp dụng</b>
                  </Col>
                  <Col span={24}>
                    <Table columns={columns} dataSource={data} />
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

export default ServicePackageContent;
