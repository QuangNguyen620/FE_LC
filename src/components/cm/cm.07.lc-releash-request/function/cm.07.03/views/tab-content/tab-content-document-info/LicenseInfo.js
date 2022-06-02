import React, { useState } from 'react';
import { Col, Row, Input, Table, Card } from 'antd';
import { KTTitle } from 'core/ui';
import { useTranslation } from 'react-i18next';
import { CM1602Domain } from '../../../domains/CM.07.Domain';
const LicenseInfoContent = ({ lang = 'vi', ...props }) => {
  const [context, domain] = CM1602Domain();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const { t } = useTranslation();
  const { TextArea } = Input;
  const dateFormatList = 'DD/MM/YYYY';
  const columns = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
      render: (value, item, index) => (page - 1) * pageSize + index + 1,
    },
    {
      title: 'Tên bộ chứng từ',
      dataIndex: 'licenseName',
      key: 'licenseName',
    },
    {
      title: 'Mô tả',
      dataIndex: 'licenseDescription',
      key: 'licenseDescription',
    },
  ];
  return (
    <>
      <div style={{ background: 'white', borderRadius: '5px' }}>
        <Row style={{ padding: 16 }}>
          <Col span={24}>
            <Row>
              <Col span={23}>
                <div>
                  <Card
                    type="inner"
                    className="custom-card"
                    title={<b>Danh mục chứng từ</b>}
                  >
                    <Row>
                      <Col span={24}>
                        <Table
                          name={'licenseList'}
                          dataSource={context?.lcApplication?.licenses}
                          columns={columns}
                          scroll={{ x: 1100 }}
                          pagination={{
                            onChange(current) {
                              setPage(current);
                            },
                            pageSize: pageSize,
                          }}
                        />
                      </Col>
                    </Row>
                  </Card>
                </div>
              </Col>
              <Col span={1}></Col>
            </Row>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default LicenseInfoContent;
