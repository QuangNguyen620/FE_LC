import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Col, Row, Button, Table, Tabs, Card, Divider, Space } from 'antd';
import { DownloadOutlined, EditFilled, DeleteFilled } from '@ant-design/icons';
import { KTTitle } from 'core/ui';
import { CSVLink } from 'react-csv';
import { BM010601Domain } from '../../../../domains/BM010601ViewDomain';
import '../../../../../../../../../../assets/less/LC-common.less';
const BM010601ViewContent = ({ lang = 'vi', ...props }) => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [context, domain] = BM010601Domain();
  const { TabPane } = Tabs;
  useEffect(() => {
    console.log('context?.fundingLimit?.status');
    console.log(context?.fundingLimit?.status);
  }, [context]);

  function callback(key) {
    console.log(key);
  }

  const columns = [
    {
      title: 'Mã đề nghị tài trợ',
      dataIndex: 'financingLimitCode',
      key: 'financingLimitCode',
      with: 200,
    },
    {
      title: 'Số L/C',
      dataIndex: 'typeLimit',
      key: 'typeLimit',
      with: 200,
    },
    {
      title: 'Mã đề nghị tu chỉnh L/C',
      dataIndex: 'releaseBank',
      key: 'releaseBank',
      with: 300,
    },
    {
      title: 'Mã tu chỉnh L/C',
      dataIndex: 'moneyType',
      key: 'moneyType',
      with: 200,
    },
    {
      title: 'Mã giao dịch xuất trình',
      dataIndex: 'totalLimit',
      key: 'totalLimit',
      with: 200,
    },
    {
      title: 'Trạng thái GDXT',
      dataIndex: 'totalZoningLimit',
      key: 'totalZoningLimit',
      with: 200,
    },
    {
      title: 'Lý do điều chỉnh hạn mức',
      dataIndex: 'totalCommitmentLimit',
      key: 'totalCommitmentLimit',
      with: 200,
    },

    {
      title: 'Kỳ hạn',
      dataIndex: 'totalRepaymentAmount',
      key: 'totalRepaymentAmount',
      with: 200,
    },
    {
      title: 'Ngày tài trợ',
      dataIndex: 'availabilityLimit',
      key: 'availabilityLimit',
      with: 200,
    },
    {
      title: 'Ngày đến hạn',
      dataIndex: 'dateRange',
      key: 'dateRange',
      with: 200,
    },
    {
      title: 'Hạn mức khoanh',
      dataIndex: 'expirationDate',
      key: 'expirationDate',
      with: 200,
    },
    {
      title: 'Hạn mức cam kết',
      dataIndex: 'createdDate',
      key: 'createdDate',
      with: 200,
    },
    {
      title: 'Số tiền giải ngân',
      dataIndex: 'createdBy',
      key: 'createdBy',
      with: 200,
    },
    {
      title: 'Số tiền cam kết',
      dataIndex: 'approvedBy',
      key: 'approvedBy',
      with: 200,
    },
  ];

  const ExportReactCSV = ({ csvHeaders, csvData, fileName }) => {
    if (csvData) {
      return (
        <CSVLink headers={csvHeaders} data={csvData} filename={fileName}>
          <Button
            icon={<DownloadOutlined />}
            className="common-btn  right-step-action"
          >
            Xuất Excel
          </Button>
        </CSVLink>
      );
    } else {
      return null;
    }
  };

  const headers = [
    { label: 'Mã HMTT', key: 'financingLimitCode' },
    { label: 'Loại hạn mức', key: 'typeLimit' },
    { label: 'Ngân hàng phát hành', key: 'releaseBank' },
    { label: 'Loại tiền', key: 'moneyType' },
    { label: 'Tổng hạn mức', key: 'totalLimit' },
    { label: 'Số tiền khoanh', key: 'totalZoningLimit' },
    { label: 'Số tiền cam kết', key: 'totalCommitmentLimit' },
    { label: 'Số tiền trả nợ', key: 'totalRepaymentAmount' },
    { label: 'Hạn mức khả dụng', key: 'availabilityLimit' },
    { label: 'Ngày hiệu lực', key: 'dateRange' },
    { label: 'Ngày hết hạn', key: 'expirationDate' },
    { label: 'Ngày tạo', key: 'createdDate' },
    { label: 'Người tạo', key: 'createdBy' },
    { label: 'Người duyệt tạo', key: 'approvedBy' },
    { label: 'Trạng thái hợp đồng', key: 'status' },
  ];

  return (
    <>
      <div style={{ background: 'white', borderRadius: '5px' }}>
        <Row style={{ padding: 16 }}>
          <Col span={24}>
            <Row className="padding-md">
              <Col span={12}>
                <Row gutter={24}>
                  <Col span={24}>
                    <KTTitle size={3}>Danh sách các giao dịch</KTTitle>
                  </Col>
                </Row>
              </Col>

              <Col span={12}>
                <Row
                  gutter={24}
                  // className={'input-search'}
                >
                  <Col span={12}></Col>
                  <Col span={12}>
                    <ExportReactCSV
                      csvHeaders={headers}
                      csvData={
                        context?.fundingLimit?.financingLimitTransactionList
                      }
                      fileName="financingLimitTransactionList.csv"
                    />
                  </Col>
                </Row>
              </Col>
            </Row>

            <Row className="padding-md">
              <Col span={24}>
                <Table
                  columns={columns}
                  dataSource={
                    context?.fundingLimit?.financingLimitTransactionList
                  }
                  scroll={{ x: 500 }}
                  // pagination={{
                  //   onChange(current) {
                  //     setPage(current);
                  //   },
                  //   pageSize: TABLE_PAGE_SIZE,
                  // }}
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
