import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Col,
  Row,
  Tooltip,
  Table,
  Input,
  Button,
  Form,
  DatePicker,
  Select,
  Space,
  Drawer,
  InputNumber,
} from 'antd';
import log from '../ModuleLogger';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { EyeFilled, SearchOutlined, DeleteFilled } from '@ant-design/icons';
import '../component/less/CM.07.less';
import '../../../../assets/less/LC-common.less';
import { CM1602Domain } from '../domains/CM.07.Domain';
import { LC_STATUS_LIST } from '../../../../core/common/Constant';
import { KTTitle } from 'core/ui';
import DeleteLCRequestModal from '../component/modal/delete/DeleteLCRequestModal';
import DeleteLCRequestModallSuccessfull from '../component/modal/delete/DeleteLCRequestModallSuccessfull';
var axios = require('axios');

const CM1602MainViewContent = ({ lang = 'vi', ...props }) => {
  const { t } = useTranslation();
  const [context, domain] = CM1602Domain();
  const [filterModalVisible, setFilterVisible] = useState(false);
  const dateFormatList = 'DD/MM/YYYY';
  const exceptThisSymbols = ['e', 'E', '+', '-', '.'];

  const [form] = Form.useForm();
  
  const handleVisibleChange = () => {
    if (filterModalVisible == true) {
      setFilterVisible(false);
    } else {
      setFilterVisible(true);
    }
  };

  function disabledDate(current) {
    // Can not select days before today and today
    return (
      current && current < moment(context?.filterData?.timeTo).endOf('day')
    );
  }

  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const [selectedId, setSelectedId] = useState(-1);
  // const [deleteSuccessfulDialogVisible, setDeleteSuccessfulDialogVisible] =
  //   useState(false);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  // const [value, setValue] = useState('');

  function convert(str) {
    var date = new Date(str),
      mnth = ('0' + (date.getMonth() + 1)).slice(-2),
      day = ('0' + date.getDate()).slice(-2);
    return [day, mnth, date.getFullYear()].join('/');
  }

  useEffect(() => {
    domain.initDomain();
    // dataSource.current = context.list;
  }, []);

  // useEffect(() => {}, [context?.filterData]);

  const resetFilter = (form) => {
    domain.resetFilter(form);
  };

  const search = () => {
    domain.getSearchResult();
    handleVisibleChange();
  };

  const columns = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
      render: (value, item, index) => (page - 1) * pageSize + index + 1,
    },
    {
      title: 'Mã đề nghị phát hành L/C',
      dataIndex: 'proposalCodeRelease',
      key: 'proposalCodeRelease',
      // width: '10%',
    },
    {
      title: 'Loại L/C',
      dataIndex: 'lcType',
      key: 'lcType',
      // width: '12%',
    },
    {
      title: 'Ngân hàng phát hành',
      dataIndex: 'bankConfirm',
      key: 'bankConfirm',
      // width: '8%',
    },
    {
      title: 'Bên thụ hưởng',
      dataIndex: 'corporateSell',
      key: 'corporateSell',
    },
    {
      title: 'Loại tiền',
      dataIndex: 'moneyType',
      key: 'moneyType',
    },
    {
      title: 'Trị giá L/C',
      dataIndex: 'lcValue',
      key: 'lcValue',
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdDate',
      key: 'createdDate',
    },
    {
      title: 'Trạng thái ĐN',
      dataIndex: 'status',
      key: 'status',
    },

    {
      title: 'Thao tác',
      dataIndex: 'activity',
      fixed: 'right',
      key: 'x',

      render: (text, record, index) => (
        <Space align="center">
          <Tooltip placement="top" title={'Xem'}>
            <Link
              onClick={(e) => {
                domain.toViewPage(record.id);
                console.log("Record's key is :", record);
              }}
              className="activities-btn"
            >
              <EyeFilled size={'medium'} style={{ color: 'blue' }} />
            </Link>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div style={{ background: 'white', borderRadius: '5px' }}>
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
                onClick={(e) => resetFilter(form)}
                className="secondary-btn"
              >
                Làm mới
              </Button>
              <Button
                style={{ float: 'right' }}
                onClick={(e) => search()}
                className="common-btn"
              >
                Tìm kiếm
              </Button>
            </div>
          }
        >
          <Form form={form} layout="vertical">
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name="timeFrom" label="Ngày tạo từ">
                  <DatePicker
                    onChange={domain.timeFromChange}
                    style={{ width: '100%' }}
                    placeholder="dd/mm/yyyy"
                    format={dateFormatList}
                    disabledDate={(current) => {
                      return (
                        current && current >= moment().subtract(0, 'month')
                      );
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="timeTo"
                  label="Ngày tạo đến"
                  rules={[
                    {
                      validator: async (_, timeTo) => {
                        var timeFrom = form.getFieldValue('timeFrom');
                        if (timeFrom != null) {
                          if (timeFrom >= timeTo) {
                            return Promise.reject(
                              '"Ngày tạo đến" không được trước "Ngày tạo từ"',
                            );
                          }
                        }
                      },
                    },
                  ]}
                >
                  <DatePicker
                    onChange={domain.timeToChange}
                    style={{ width: '100%' }}
                    placeholder="dd/mm/yyyy"
                    format={dateFormatList}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={24}>
                <Form.Item name="proposalCode" label="Mã đề nghị phát hành">
                  <Input
                    placeholder="Nhập thông tin"
                    onChange={domain.proposalCodeReleaseChange}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={24}>
                <Form.Item label="Ngân hàng phát hành" name={'releseashBankId'}>
                  <Select
                    onChange={domain.bankIdChange}
                    placeholder={'Chọn ngân hàng phát hành'}
                  >
                    {context?.bankList.map((bank) => (
                      <Select.Option value={bank.bankId}>
                        {bank.bankName}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={24}>
                <Form.Item label="Bên thụ hưởng" name={'corporateSellID'}>
                  <Select
                    onChange={domain.corporateSellChange}
                    placeholder={'Chọn bên thụ hưởng'}
                  >
                    {context?.corporateList.map((seller) => (
                      <Select.Option value={seller.corporateId}>
                        {seller.corporateName}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name="valueFrom" label="Trị giá L/C">
                  <InputNumber
                    // formatter={(value) =>
                    //   `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                    // }
                    // parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                    style={{ width: '100%' }}
                    name={'valueFrom'}
                    min={0}
                    placeholder="Từ"
                    onChange={(e) => domain.valueFromChange(e)}
                    type={'number'}
                    onKeyDown={(e) =>
                      exceptThisSymbols.includes(e.key) && e.preventDefault()
                    }
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="valueTo" label=" ">
                  <InputNumber
                    // formatter={(value) =>

                    //   `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                    // }
                    // parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                    style={{ width: '100%' }}
                    name={'valueFrom'}
                    min={0}
                    placeholder="Đến"
                    onChange={(e) => domain.valueToChange(e)}
                    type={'number'}
                    onKeyDown={(e) =>
                      exceptThisSymbols.includes(e.key) && e.preventDefault()
                    }
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={24}>
                <Form.Item label="Trạng thái" name={'status'}>
                  <Select
                    onChange={domain.statusChange}
                    placeholder={'Chọn trạng thái'}
                  >
                    {LC_STATUS_LIST.map((status) => (
                      <Select.Option value={status.value}>
                        {status.label}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Drawer>

        <Row style={{ padding: 16 }}>
          <Col span={15}>
            <KTTitle size={2}>Danh sách đề nghị phát hành L/C</KTTitle>
          </Col>

          <Col span={9}>
            <Row>
              <Input
                style={{ width: '70%' }}
                prefix={<SearchOutlined />}
                placeholder="Nhập mã phát hành L/C, NHPH, bên thụ hưởng..."
                // onChange={(e) => {
                //   const currValue = e.target.value;
                //   const filteredData = context.list.filter(
                //     (entry) =>
                //       entry.proposalCodeRelease
                //         .toLowerCase()
                //         .includes(currValue.toLowerCase()) ||
                //       entry.bankConfirm
                //         .toLowerCase()
                //         .includes(currValue.toLowerCase()) ||
                //       entry.corporateSell
                //         .toLowerCase()
                //         .includes(currValue.toLowerCase()),
                //   );
                //   context.list = filteredData;
                // }}
              />
              <Button onClick={handleVisibleChange} id="filter-btn">
                Bộ lọc
              </Button>
              <Button
                className="common-btn"
                onClick={(e) => domain.toAddPage()}
              >
                Thêm mới
              </Button>
            </Row>
          </Col>
        </Row>

        <Row
          style={{
            padding: 16,
          }}
        >
          <Table
            style={{ width: '100%' }}
            columns={columns}
            dataSource={context?.list}
            pagination={{
              onChange(current) {
                setPage(current);
              },
              pageSize: pageSize,
            }}
            scroll={{ x: 'max-content' }}
          />
        </Row>
      </div>
    </>
  );
};

export default CM1602MainViewContent;
