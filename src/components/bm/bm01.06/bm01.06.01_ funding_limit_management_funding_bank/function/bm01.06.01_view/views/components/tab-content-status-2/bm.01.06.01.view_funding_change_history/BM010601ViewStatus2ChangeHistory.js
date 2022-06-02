import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Col, Row, Button, Form, Tabs, Card, Divider, Table } from 'antd';
import { LeftOutlined, EditFilled, DeleteFilled } from '@ant-design/icons';
import { KTTitle } from 'core/ui';

import { BM010601Domain } from '../../../../domains/BM010601ViewDomain';
import { TABLE_PAGE_SIZE } from 'core/common/Constant';

const BM010601ViewContent = ({ lang = 'vi', ...props }) => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [context, domain] = BM010601Domain();
  const [page, setPage] = useState(1);
  // useEffect(() => {
  //   console.log('context?.fundingLimit?.status');
  //   console.log(context?.fundingLimit?.status);
  // }, [context]);

  const columns = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
      render: (_value, _item, _index) =>
        (page - 1) * TABLE_PAGE_SIZE + _index + 1,
    },
    {
      title: 'Thứ tự thay đổi',
      dataIndex: 'numberingChange',
      key: 'numberingChange',
      with: 200,
    },
    {
      title: 'Số hợp đồng',
      dataIndex: 'contractNumberLimit',
      key: 'contractNumberLimit',
      with: 300,
    },
    {
      title: 'Ngày cấp hạn mức',
      dataIndex: 'dateRange',
      key: 'dateRange',
      with: 200,
    },
    {
      title: 'Ngày hết hạn',
      dataIndex: 'expirationDate',
      key: 'expirationDate',
      with: 200,
    },
    {
      title: 'Tổng hạn mức',
      dataIndex: 'totalLimit',
      key: 'totalLimit',
      with: 200,
    },
  ];
  return (
    <>
      <div style={{ background: 'white', borderRadius: '5px' }}>
        <Row style={{ padding: 16 }}>
          <Col span={24}>
            <Row className="padding-md">
              <Col span={24}>
                <Table
                  columns={columns}
                  dataSource={
                    context?.fundingLimit?.financingLimitChangeHistoryList
                  }
                  scroll={{ x: 500 }}
                  pagination={{
                    onChange(current) {
                      setPage(current);
                    },
                    pageSize: TABLE_PAGE_SIZE,
                  }}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default BM010601ViewContent;
