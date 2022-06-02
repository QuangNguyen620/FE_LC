import React, { useState, useEffect } from 'react';
import {
  Col,
  Row,
  Select,
  Space,
  Table,
  Form,
  Radio,
  Input,
  Checkbox,
} from 'antd';
import { KTTitle } from 'core/ui';
import { useTranslation } from 'react-i18next';
import {} from '@ant-design/icons';
import moment from 'moment';

import '../../../../common/less/AM.01.05.01.less';
import '../../../../../../../../../assets/less/LC-common.less';
const { Option } = Select;

const ServicePackageContent = ({ lang = 'vi', ...props }) => {
  const { t } = useTranslation();
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = useState(20);

  // const dateFormatList = 'DD/MM/YYYY';
  const [form] = Form.useForm();

  const columns = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
      render: (value, item, index) => (page - 1) * pageSize + (index + 1),
      width: '15%',
    },
    {
      title: 'Nội dung kiểm tra',
      dataIndex: 'description',
      key: 'description',
      width: '70%',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (text, record, index) => (
        <Space size="middle" wrap>
          <Checkbox disabled checked={record.status} />
        </Space>
      ),
      width: '15%',
    },
  ];

  const checkInfoCorporate = [
    {
      description:
        'Kiểm tra chéo các nội dung trên giấy chứng nhận đăng ký doanh nghiệp với thông tin từ cục thuế',
      status: true,
    },
  ];
  const checkInfoUser1 = [
    {
      description:
        'Kiểm tra chéo tên người đại diện pháp luật với tên người đại diện pháp luật từ thông tin Cục thuế',
      status: false,
    },
    {
      description: 'Kiểm tra chéo ảnh cá nhân và ảnh trên giấy tờ tùy thân',
      status: true,
    },
  ];
  const checkInfoUser2 = [
    {
      description: 'Kiểm tra chéo tên Kế toán trưởng từ thông tin Cục thuế',
      status: true,
    },
    {
      description: 'Kiểm tra chéo ảnh cá nhân và ảnh trên giấy tờ tùy thân',
      status: true,
    },
  ];
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
                    <b>Thông tin kiểm tra chéo</b>
                  </KTTitle>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col span={5} className={'padding-title-sub1'}>
              Thông tin doanh nghiệp <span className={'text-require'}></span>
            </Col>
          </Row>
          <Row span={24} className={'padding-md'}>
            <Col span={24}>
              <Table
                bordered
                columns={columns}
                dataSource={checkInfoCorporate}
                // pagination={{
                //   onChange(current) {
                //     setPage(current);
                //   },
                //   pageSize: pageSize,
                // }}
                // scroll={{ x: 'max-content' }}
              />
            </Col>
          </Row>
          <Row>
            <Col span={5} className={'padding-title-sub1'}>
              Thông tin người đại diện <span className={'text-require'}></span>
            </Col>
          </Row>
          <Row span={24} className={'padding-md'}>
            <Col span={24}>
              <Table
                bordered
                columns={columns}
                dataSource={checkInfoUser1}
                // pagination={{
                //   onChange(current) {
                //     setPage(current);
                //   },
                //   pageSize: pageSize,
                // }}
                // scroll={{ x: 'max-content' }}
              />
            </Col>
          </Row>
          <Row>
            <Col span={5} className={'padding-title-sub1'}>
              Thông tin kế toán trưởng <span className={'text-require'}></span>
            </Col>
          </Row>
          <Row span={24} className={'padding-md'}>
            <Col span={24}>
              <Table
                bordered
                columns={columns}
                dataSource={checkInfoUser2}
                // pagination={{
                //   onChange(current) {
                //     setPage(current);
                //   },
                //   pageSize: pageSize,
                // }}
                // scroll={{ x: 'max-content' }}
              />
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
};

export default ServicePackageContent;
