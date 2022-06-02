import React, { useState, useEffect } from 'react';
import { Col, Row, Select, Space, Table, Form, Radio, Input } from 'antd';
import { KTTitle } from 'core/ui';
import { useTranslation } from 'react-i18next';
import {} from '@ant-design/icons';
import moment from 'moment';

import '../../../../common/less/AM.01.05.01.less';
import '../../../../../../../../../assets/less/LC-common.less';

const { Option } = Select;

const ServicePackageContent = ({
  lang = 'vi',
  onServicePackageChange,
  packageServiceId,
  ...props
}) => {
  const { t } = useTranslation();

  // const dateFormatList = 'DD/MM/YYYY';
  const [form] = Form.useForm();

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
  function changeServicePackage(e) {
    onServicePackageChange(e);
  }
  function changeServicePackageId(e) {
    console.log(e);
    form.setFieldsValue({
      packageServiceId: e.target.value,
    });
  }
  return (
    <>
      <div className={'main-container'}>
        <Form form={form}>
          {' '}
          <Row className={'padding-md'}>
            <Col span={24}>
              <Row className={'padding-title-sub1'}>
                <Col span={24}>
                  <KTTitle size={3}>
                    <b>Biểu phí áp dụng</b>
                  </KTTitle>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Table columns={columns} dataSource={data} />
            </Col>
          </Row>
          <Row>
            <Col span={5}>
              Lựa chọn gói dịch vụ <span className={'text-require'}>*</span>
            </Col>
            <Col span={8}>
              <Form.Item>
                <Radio.Group
                  onChange={changeServicePackage}
                  name={'packageServiceId'}
                  value={packageServiceId}
                >
                  <Space direction="vertical">
                    <Radio value={'1'}>Trả phí theo giao dịch</Radio>
                    <Radio value={'2'}>Trả phí theo tháng</Radio>
                  </Space>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
          {/* <Row>
            <Col span={0}>
              <Form.Item name={'packageServiceId'}>
                <Input
                  onChange={changeServicePackage}
                  value={packageServiceId}
                  defaultValue={'1'}
                />
              </Form.Item>
            </Col>
          </Row> */}
        </Form>
      </div>
    </>
  );
};

export default ServicePackageContent;
