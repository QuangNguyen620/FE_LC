/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import {
  EyeFilled,
  SearchOutlined,
  FilterOutlined,
  DownloadOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import {
  Col,
  Row,
  Typography,
  Input,
  Button,
  Tooltip,
  Avatar,
  Table,
  Space,
  Drawer,
  Form,
  Select,
  DatePicker,
  Checkbox,
} from 'antd';
import { KTTitle } from 'core/ui';
import '../common/less/BM010301.less';
import '../../../../../assets/less/LC-common.less';
import { BM010601Domain } from '../domains/BM010602Domain';
import { CSVLink } from 'react-csv';
import {
  TABLE_PAGE_SIZE,
  FUNDING_LIMIT_STATUS_LIST,
} from 'core/common/Constant';

const { Link } = Typography;

const BM010301View = ({ lang = 'vi', ...props }) => {
  const [context, domain] = BM010601Domain();
  const [page, setPage] = useState(1);

  const dateFormatList = 'DD/MM/YYYY';

  const [form] = Form.useForm();

  const [filterModalVisible, setFilterVisible] = useState(false);
  const handleVisibleChange = () => {
    if (filterModalVisible == true) {
      setFilterVisible(false);
    } else {
      setFilterVisible(true);
    }
  };

  useEffect(() => {
    domain.initDomain();
  }, []);

  const columns = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
      render: (_value, _item, _index) =>
        (page - 1) * TABLE_PAGE_SIZE + _index + 1,
    },
    {
      title: 'Mã HMTT',
      dataIndex: 'financingLimitCode',
      key: 'financingLimitCode',
      with: 200,
    },
    {
      title: 'Loại hạn mức',
      dataIndex: 'typeLimit',
      key: 'typeLimit',
      with: 200,
    },
    {
      title: 'Ngân hàng tài trợ',
      dataIndex: 'sponsorBank',
      key: 'sponsorBank',
      with: 300,
    },
    {
      title: 'Loại tiền',
      dataIndex: 'moneyType',
      key: 'moneyType',
      with: 200,
    },
    {
      title: 'Tổng hạn mức',
      dataIndex: 'totalLimit',
      key: 'totalLimit',
      with: 200,
    },
    {
      title: 'Số tiền khoanh',
      dataIndex: 'totalZoningLimit',
      key: 'totalZoningLimit',
      with: 200,
    },
    {
      title: 'Số tiền cam kết',
      dataIndex: 'totalCommitmentLimit',
      key: 'totalCommitmentLimit',
      with: 200,
    },

    {
      title: 'Số tiền trả nợ',
      dataIndex: 'totalRepaymentAmount',
      key: 'totalRepaymentAmount',
      with: 200,
    },
    {
      title: 'Hạn mức khả dụng',
      dataIndex: 'availabilityLimit',
      key: 'availabilityLimit',
      with: 200,
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
      title: 'Trạng thái hợp đồng',
      dataIndex: 'statusString',
      key: 'statusString',
      with: 200,
    },
    {
      title: 'Tác vụ',
      dataIndex: 'activity',
      width: 130,
      key: 'x',
      render: (text, record, index) => (
        <Row className="item-center">
          <Tooltip placement="top" title={'Xem'}>
            <Link
              onClick={(e) => {
                domain.toViewPage(record.id);
                console.log("Record's key is :", record.id);
              }}
              className="activities-btn"
            >
              <Avatar
                style={{ backgroundColor: '#f0f5ff' }}
                size="small"
                icon={
                  <EyeFilled
                    style={{ color: '#2F54EB' }}
                    className={'eye-filled'}
                  />
                }
              />
            </Link>
          </Tooltip>
        </Row>
      ),
    },
  ];

  const headers = [
    { label: 'Mã HMTT', key: 'financingLimitCode' },
    { label: 'Loại hạn mức', key: 'typeLimit' },
    { label: 'Ngân hàng tài trợ', key: 'sponsorBanknm ' },
    { label: 'Loại tiền', key: 'moneyType' },
    { label: 'Tổng hạn mức', key: 'totalLimit' },
    { label: 'Số tiền khoanh', key: 'totalZoningLimit' },
    { label: 'Số tiền cam kết', key: 'totalCommitmentLimit' },
    { label: 'Số tiền trả nợ', key: 'totalRepaymentAmount' },
    { label: 'Hạn mức khả dụng', key: 'availabilityLimit' },
    { label: 'Ngày hiệu lực', key: 'dateRange' },
    { label: 'Ngày hết hạn', key: 'expirationDate' },
    { label: 'Trạng thái hợp đồng', key: 'status' },
  ];

  const ExportReactCSV = ({ csvHeaders, csvData, fileName }) => {
    if (csvData) {
      return (
        <CSVLink headers={csvHeaders} data={csvData} filename={fileName}>
          <Button icon={<DownloadOutlined />} className="download-btn">
            Xuất Excel
          </Button>
        </CSVLink>
      );
    } else {
      return null;
    }
  };

  return (
    <>
      <div className={'main-container'}>
        <Drawer
          title="Bộ lọc"
          placement="right"
          size="large"
          width={600}
          onClose={handleVisibleChange}
          visible={filterModalVisible}
          footer={
            <div>
              {' '}
              <Button
                // onClick={(e) => resetFilter(form)}
                className="secondary-btn"
              >
                Làm mới
              </Button>
              <Button
                style={{ float: 'right' }}
                // onClick={(e) => search()}
                className="common-btn"
              >
                Tìm kiếm
              </Button>
            </div>
          }
        >
          <Form form={form} layout="vertical">
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item label={<b>Mã HMTT</b>} name={'fundingLimitCode'}>
                  <Select
                    // onChange={domain.bankIdChange}
                    placeholder={'Chọn'}
                  >
                    {/* {context?.bankList.map((bank) => (
                      <Select.Option value={bank.bankId}>
                        {bank.bankName}
                      </Select.Option>
                    ))} */}
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={24}>
                <Form.Item label={<b>Loại HM</b>} name={'limitType'}>
                  <Select
                    // onChange={domain.corporateSellChange}
                    placeholder={'Chọn'}
                  >
                    {/* {context?.corporateList.map((seller) => (
                      <Select.Option value={seller.corporateId}>
                        {seller.corporateName}
                      </Select.Option>
                    ))} */}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  label={<b>Ngân hàng phát hành</b>}
                  name={'releashBankId'}
                >
                  <Select placeholder={'Chọn'}>
                    {context?.constantValue?.bankList.map((bank) => (
                      <Select.Option value={bank.bankId}>
                        {bank.bankName}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label={<b>Ngày cấp hạn mức</b>} name={''}>
                  <DatePicker
                    onChange={domain.timeFromChange}
                    style={{ width: '100%' }}
                    placeholder="dd/mm/yyyy"
                    format={dateFormatList}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label={<b>Ngày hết hạn</b>} name={''}>
                  <DatePicker
                    onChange={domain.timeFromChange}
                    style={{ width: '100%' }}
                    placeholder="dd/mm/yyyy"
                    format={dateFormatList}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={24}>
                <Form.Item label={<b>Loại tiền</b>} name={'moneyType'}>
                  <Select placeholder={'Chọn'}>
                    {context?.constantValue?.currencyList.map((currency) => (
                      <Select.Option value={currency.currencyCode}>
                        {currency.currencyCode}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item label={<b>Trạng thái</b>} name={'status'}>
                  <Checkbox.Group
                    options={FUNDING_LIMIT_STATUS_LIST}
                    defaultValue={[1]}
                    // onChange={onChange}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Drawer>
        <Row className="padding-md">
          <Col span={12}>
            <Row gutter={24}>
              <Col span={24}>
                <KTTitle size={2}>Danh mục hạn mức tài trợ</KTTitle>
              </Col>
              <Col span={24}>
                <KTTitle size={4} className={'subtitle'}>
                  {context?.list?.length} hạn mức
                </KTTitle>
              </Col>
            </Row>
          </Col>

          <Col span={12}>
            <Row
              gutter={24}
              // className={'input-search'}
            >
              <Col span={24}>
                <Space className="right-step-action" size={'middle'} wrap>
                  <Input
                    prefix={<SearchOutlined />}
                    placeholder="Nhập mã nhóm người dùng, tên nhóm người dùng, vai trò, kênh, chi nhánh"
                    // onChange={(e) => {
                    //   const currValue = e.target.value;
                    //   const filteredData = dataSource.current.filter(
                    //     (entry) =>
                    //       entry?.userGroupName
                    //         ?.toLowerCase()
                    //         .includes(currValue.toLowerCase()) ||
                    //       entry?.role
                    //         ?.toLowerCase()
                    //         .includes(currValue.toLowerCase()) ||
                    //       entry?.userGroupCode
                    //         ?.toLowerCase()
                    //         .includes(currValue.toLowerCase()) ||
                    //       entry?.channels
                    //         ?.toLowerCase()
                    //         .includes(currValue.toLowerCase()) ||
                    //       entry?.branchLevel
                    //         ?.toLowerCase()
                    //         .includes(currValue.toLowerCase()),
                    //   );
                    //   setList(filteredData);
                    // }}
                  />
                  <Button
                    id="filter-btn"
                    className="secondary-btn"
                    icon={<FilterOutlined />}
                    onClick={handleVisibleChange}
                  >
                    Bộ lọc
                  </Button>

                  <ExportReactCSV
                    csvHeaders={headers}
                    csvData={context?.list}
                    fileName="Funding_Limit_Funding_Bank.csv"
                  />
                </Space>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row className="padding-md">
          <Col span={24}>
            <Table
              columns={columns}
              dataSource={context?.list}
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
      </div>
    </>
  );
};

export default BM010301View;
