import React, { useState, useEffect } from 'react';
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
  Tag,
} from 'antd';
import { CloudUploadOutlined } from '@ant-design/icons';
import { KTTitle } from 'core/ui';
import { CM0704Domain } from '../../domains/CM0704Domain';
import moment from 'moment';
import '../../../../component/less/CM.07.less';
import { LC_STATUS, LC_TYPE } from 'core/common/Constant';
const { Option } = Select;

//------Constants----//
const contractType = [
  { label: 'Ký hợp đồng điện tử trên FPT L/C Platform', value: 1 },
  { label: 'Không ký hợp đồng điện tử trên FPT L/C Platform', value: 2 },
];

const lcTypeList = [
  { label: 'L/C thông thường', value: '1' },
  { label: 'UPAS L/C', value: '2' },
];

//-----------------//

const CommonInfoContent = ({ lang = 'vi', ...props }) => {
  const [context, domain] = CM0704Domain();
  const dateFormatList = 'DD/MM/YYYY';

  const changeHandler = (event) => {
    domain.onAttachedContractChangeHandler(event);
  };

  const onContractTypeChange = (e) => {
    domain.onContractTypeChange(e);
  };

  const onContractNumberChange = (e) => {
    domain.onContractNumberChange(e);
  };

  const onReleasheBankChange = (e) => {
    domain.onReleasheBankChange(e);
  };

  const onProposalDateChange = (e) => {
    domain.onProposalDateChange(e);
  };

  const onLCTypeChange = (e) => {
    domain.onLCTypeChange(e);
  };

  const onCorporateSellChange = (e) => {
    domain.onCorporateSellChange(e);
  };

  const onCorporateSellAddressChange = (e) => {
    domain.onCorporateSellAddressChange(e);
  };

  const onCorporateBuyAddressChange = (e) => {
    domain.onCorporateBuyAddressChange(e);
  };

  const onAnnoucerBankChange = (e) => {
    domain.onAnnoucerBankChange(e);
  };

  const onAnnoucerBankAddressChange = (e) => {
    domain.onAnnoucerBankAddressChange(e);
  };

  const onTranferBankChange = (e) => {
    domain.onTranferBankChange(e);
  };

  const onConfirmationInstructionChange = (e) => {
    domain.onConfirmationInstructionChange(e);
  };

  const onConfirmingBankRequestChange = (e) => {
    domain.onConfirmingBankRequestChange(e);
  };

  const onOtherConfirmingBankChange = (e) => {
    domain.onOtherConfirmingBankChange(e);
  };

  return (
    <>
      {/* Trạng thái từ chối ký số, từ chối draft với loại lc là upas lc */}
      {(context?.lcApplication?.status == LC_STATUS.TU_CHOI_DRAFT ||
        context?.lcApplication?.status == LC_STATUS.TU_CHOI_KY_SO) &&
        context?.initLCType == LC_TYPE.UPAS_LC && (
          <div style={{ background: 'white', borderRadius: '5px' }}>
            <Row gutter={24} style={{ padding: 16 }}>
              <Col span={24}>
                <div id="contract-info">
                  <Row style={{ paddingBottom: 16 }}>
                    <Col span={24}>
                      <KTTitle size={3}>
                        <b>Thông tin hợp đồng</b>
                      </KTTitle>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={23}>
                      <Row>
                        <Col span={8}>
                          Loại hợp đồng
                          <span style={{ color: '#F5222D' }}>*</span>
                        </Col>
                        <Col span={16}>
                          <Form.Item
                            name={'contractType'}
                            rules={[
                              {
                                required: true,
                                message:
                                  'Trường loại hợp đồng không được phép để trống!',
                              },
                            ]}
                          >
                            <Select
                              disabled
                              onChange={(e) => {
                                onContractTypeChange(e);
                              }}
                              placeholder="Chọn"
                            >
                              {contractType.map((type) => (
                                <Select.Option value={type.value}>
                                  {type.label}
                                </Select.Option>
                              ))}
                            </Select>
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={8}>
                          Mã hợp đồng
                          <span style={{ color: '#F5222D' }}></span>
                        </Col>
                        <Col span={16}>
                          {context?.lcApplication?.contractType == 2 ? (
                            <Form.Item>
                              <Input disabled />
                            </Form.Item>
                          ) : (
                            <Form.Item name={'contractCode'}>
                              <Select
                                disabled
                                onChange={(e) => {
                                  domain.onContractCodeChange(e);
                                }}
                                placeholder="Chọn"
                                defaultValue={
                                  context?.lcApplication?.contractCode
                                }
                              >
                                {context?.constantValue?.contractList.map(
                                  (contract, index) => (
                                    <Select.Option value={index}>
                                      {contract.contractCode}
                                    </Select.Option>
                                  ),
                                )}
                              </Select>
                            </Form.Item>
                          )}
                        </Col>
                      </Row>
                      <Row>
                        <Col span={8}>
                          Số hợp đồng
                          <span style={{ color: '#F5222D' }}></span>
                        </Col>
                        <Col span={16}>
                          {context?.lcApplication?.contractType == 2 ? (
                            <Form.Item
                              name={'contractNumber'}
                              rules={[
                                {
                                  required: true,
                                  message:
                                    'Trường số hợp đồng không được phép để trống!',
                                },
                                {
                                  max: 20,
                                  message:
                                    'Trường số hợp đồng không được phép vượt quá 20 ký tự!',
                                },
                              ]}
                            >
                              <Input
                                disabled
                                onChange={onContractNumberChange}
                                placeholder="Nhập thông tin"
                              />
                            </Form.Item>
                          ) : (
                            <Form.Item name={'contractNumber'}>
                              <Input
                                // defaultValue={context?.lcApplication?.contractNumber}
                                disabled
                              />
                            </Form.Item>
                          )}
                        </Col>
                      </Row>
                      <Row>
                        <Col span={8}>
                          Đính kèm hợp đồng
                          <span style={{ color: '#F5222D' }}></span>
                        </Col>
                        <Col span={16}>
                          <Form.Item
                            name={'file'}
                            rules={[
                              {
                                required:
                                  context?.lcApplication?.contractType == 2 &&
                                  context?.lcApplication?.contractFileName ==
                                    null &&
                                  context?.lcApplication?.contractFileUrl ==
                                    null
                                    ? true
                                    : false,
                                message: 'Vui lòng đính kèm hợp đồng!',
                              },
                            ]}
                          >
                            <Row gutter={24}>
                              <Col span={4}>
                                <span>
                                  <label
                                    for="file-upload-contact"
                                    class="custom-file-upload-tag"
                                  >
                                    <Tag
                                      className={`  ${
                                        context?.lcApplication?.contractType ==
                                        2
                                          ? 'custom-tag'
                                          : 'custom-tag-disabled'
                                      }`}
                                      color="default"
                                    >
                                      <span>
                                        Đính kèm <CloudUploadOutlined />
                                      </span>
                                    </Tag>
                                  </label>
                                  <input
                                    type="file"
                                    name="file"
                                    onChange={changeHandler}
                                    id="file-upload-contact"
                                    // disabled={
                                    //   context?.lcApplication?.contractType == 1
                                    //     ? true
                                    //     : false
                                    // }
                                    disabled
                                    accept="application/pdf"
                                  />
                                </span>
                              </Col>
                              <Col span={20}>
                                {context?.uploadFileContract
                                  ?.isContractPicked == true ? (
                                  <div className="contract-file-info">
                                    <p className="contract-file-name">
                                      {
                                        context?.uploadFileContract
                                          ?.selectedContract.name
                                      }
                                    </p>
                                  </div>
                                ) : (
                                  <div className="contract-file-info">
                                    <p className="contract-file-name">
                                      {context?.lcApplication?.contractFileName}
                                    </p>
                                  </div>
                                )}
                              </Col>
                            </Row>
                          </Form.Item>
                        </Col>
                      </Row>
                    </Col>
                    <Col span={1}></Col>
                  </Row>
                </div>
              </Col>
              <Col span={24}>
                <div id="lc-request-info">
                  <Row style={{ paddingBottom: 16, paddingTop: 16 }}>
                    <Col span={24}>
                      <KTTitle size={3}>
                        <b>Thông tin đề nghị phát hành L/C</b>
                      </KTTitle>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={23}>
                      <Row>
                        <Col span={8}>
                          Mã đề nghị phát hành L/C
                          <span style={{ color: '#F5222D' }}></span>
                        </Col>
                        <Col span={16}>
                          <Form.Item name={'lcReleashingRequestCode'}>
                            <Input
                              disabled
                              placeholder="Hệ thống tự sinh ra sau khi đề nghị phát hành được tạo mới"
                              name={'lcReleashingRequestCode'}
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={8}>
                          Ngân hàng phát hành
                          <span style={{ color: '#F5222D' }}>*</span>
                        </Col>
                        <Col span={16}>
                          <Form.Item
                            name={'releashBank'}
                            rules={[
                              {
                                required: true,
                                message:
                                  'Trường ngân hàng phát hành không được phép để trống!',
                              },
                            ]}
                          >
                            <Select
                              disabled
                              onChange={(e) => {
                                onReleasheBankChange(e);
                              }}
                              placeholder="Chọn"
                            >
                              {context?.constantValue?.releashBankList.map(
                                (bank, index) => (
                                  <Select.Option value={bank.bankId}>
                                    {bank.bankName}
                                  </Select.Option>
                                ),
                              )}
                            </Select>
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={8}>
                          Ngày đề nghị
                          <span style={{ color: '#F5222D' }}>*</span>
                        </Col>
                        <Col span={16}>
                          <Form.Item
                            name={'proposalDate'}
                            rules={[
                              {
                                required: true,
                                message:
                                  'Trường ngày đề nghị không được phép để trống!',
                              },
                            ]}
                          >
                            <DatePicker
                              name="proposalDate"
                              disabled
                              format={dateFormatList}
                              placeholder="dd/mm/yyyy"
                              onChange={(e) => {
                                onProposalDateChange(e);
                              }}
                              allowClear={true}
                              disabledDate={(current) =>
                                current.isBefore(moment().subtract(1, 'day'))
                              }
                            />
                          </Form.Item>
                        </Col>
                      </Row>

                      <Row>
                        <Col span={8}>
                          Loại L/C <span style={{ color: '#F5222D' }}>*</span>
                        </Col>
                        <Col span={8}>
                          {context?.lcApplication?.contractType == 2 ? (
                            <Form.Item
                              name={'lcType'}
                              rules={[
                                {
                                  required: true,
                                  message:
                                    'Trường loại L/C không được phép để trống!',
                                },
                              ]}
                            >
                              <Select
                                disabled
                                onChange={onLCTypeChange}
                                placeholder="Chọn loại L/C"
                                name={'lcType'}
                              >
                                {lcTypeList.map((type) => (
                                  <Select.Option value={type.value}>
                                    {type.label}
                                  </Select.Option>
                                ))}
                              </Select>
                            </Form.Item>
                          ) : (
                            <Form.Item name={'lcType'}>
                              <Select
                                disabled
                                onChange={onLCTypeChange}
                                placeholder="Chọn loại L/C"
                                name={'lcType'}
                              >
                                {lcTypeList.map((type) => (
                                  <Select.Option value={type.value}>
                                    {type.label}
                                  </Select.Option>
                                ))}
                              </Select>
                            </Form.Item>
                          )}
                        </Col>
                      </Row>
                      <Row>
                        <Col span={8}>
                          Bên đề nghị phát hành L/C
                          <span style={{ color: '#F5222D' }}>*</span>
                        </Col>
                        <Col span={16}>
                          {context?.lcApplication?.contractType == 2 ? (
                            <Form.Item
                              name={'corporateBuy'}
                              rules={[
                                {
                                  required: true,
                                  message:
                                    'Trường bên đề nghị phát hành L/C không được phép để trống!',
                                },
                              ]}
                            >
                              <Input disabled name={'corporateBuy'} />
                            </Form.Item>
                          ) : (
                            <Form.Item name={'corporateBuy'}>
                              <Input disabled name={'corporateBuy'} />
                            </Form.Item>
                          )}
                        </Col>
                      </Row>

                      <Row>
                        <Col span={8}>
                          Địa chỉ và thông tin liên hệ bên đề nghị{' '}
                          <span style={{ color: '#F5222D' }}>*</span>
                        </Col>
                        <Col span={16}>
                          {context?.lcApplication?.contractType == 2 ? (
                            <Form.Item
                              name={'corporateBuyAddress'}
                              rules={[
                                {
                                  required: true,
                                  message:
                                    'Trường địa chỉ và thông tin liên hệ bên đề nghị phát hành L/C không được phép để trống!',
                                },
                                {
                                  max: 300,
                                  message:
                                    'Trường địa chỉ và thông tin liên hệ bên đề nghị phát hành L/C không được phép 300 ký tự!',
                                },
                              ]}
                            >
                              <Input
                                disabled
                                onChange={(e) => {
                                  onCorporateBuyAddressChange(e);
                                }}
                                name={'corporateBuyAddress'}
                              />
                            </Form.Item>
                          ) : (
                            <Form.Item name={'corporateBuyAddress'}>
                              <Input disabled name={'corporateBuyAddress'} />
                            </Form.Item>
                          )}
                        </Col>
                      </Row>
                      <Row>
                        <Col span={8}>
                          Bên Thụ hưởng{' '}
                          <span style={{ color: '#F5222D' }}>*</span>
                        </Col>
                        <Col span={16}>
                          {context?.lcApplication?.contractType == 2 ? (
                            <Form.Item
                              name={'corporateSell'}
                              rules={[
                                {
                                  required: true,
                                  message:
                                    'Trường bên thụ hưởng không được phép để trống!',
                                },
                              ]}
                            >
                              <Select
                                disabled
                                onChange={(e) => {
                                  onCorporateSellChange(e);
                                }}
                                placeholder={'Chọn Bên Thụ hưởng'}
                                name={'corporateSell'}
                              >
                                {context?.constantValue?.corporateList.map(
                                  (corporate) => (
                                    <Select.Option
                                      value={corporate.corporateId}
                                    >
                                      {corporate.corporateName}
                                    </Select.Option>
                                  ),
                                )}
                              </Select>
                            </Form.Item>
                          ) : (
                            <Form.Item
                              name={'corporateSell'}
                              rules={[
                                {
                                  required: true,
                                  message:
                                    'Trường bên thụ hưởng không được phép để trống!',
                                },
                              ]}
                            >
                              <Input disabled name={'corporateSell'} />
                            </Form.Item>
                          )}
                        </Col>
                      </Row>
                      <Row>
                        <Col span={8}>
                          Địa chỉ và thông tin liên hệ bên thụ hưởng
                          <span style={{ color: '#F5222D' }}>*</span>
                        </Col>
                        <Col span={16}>
                          {context?.lcApplication?.contractType == 2 ? (
                            <Form.Item
                              name={'corporateSellAddress'}
                              rules={[
                                {
                                  required: true,
                                  message:
                                    'Trường địa chỉ và thông tin liên hệ bên thụ hưởng không được phép để trống!',
                                },
                                {
                                  max: 300,
                                  message:
                                    'Trường địa chỉ và thông tin liên hệ bên thụ hưởng phát hành L/C không được phép 300 ký tự!',
                                },
                              ]}
                            >
                              <Input
                                disabled
                                onChange={(e) => {
                                  onCorporateSellAddressChange(e);
                                }}
                                name={'corporateSellAddress'}
                              />
                            </Form.Item>
                          ) : (
                            <Form.Item name={'corporateSellAddress'}>
                              <Input disabled name={'corporateSellAddress'} />
                            </Form.Item>
                          )}
                        </Col>
                      </Row>
                      <Row>
                        <Col span={8}>
                          Ngân hàng thông báo
                          <span style={{ color: '#F5222D' }}>*</span>
                        </Col>
                        <Col span={16}>
                          <Form.Item
                            name={'bankConfirm'}
                            rules={[
                              {
                                required: true,
                                message:
                                  'Trường ngân hàng thông báo không được phép để trống!',
                              },
                            ]}
                          >
                            <Select
                              disabled
                              onChange={(e) => onAnnoucerBankChange(e)}
                              name={'bankConfirm'}
                              placeholder={'Chọn'}
                            >
                              {context?.constantValue?.confirmBankList.map(
                                (bank) => (
                                  <Select.Option value={bank.bankId}>
                                    {bank.swiftCode + '-' + bank.bankName}
                                  </Select.Option>
                                ),
                              )}
                            </Select>
                          </Form.Item>
                        </Col>
                      </Row>

                      <Row>
                        <Col span={8}>
                          Địa chỉ ngân hàng thông báo{' '}
                          <span style={{ color: '#F5222D' }}></span>
                        </Col>
                        <Col span={16}>
                          <Form.Item
                            name={'bankConfirmAddress'}
                            rules={[
                              {
                                max: 300,
                                message:
                                  'Trường địa chỉ ngân hàng thông báo không được phép vượt quá 300 ký tự!',
                              },
                            ]}
                          >
                            <Input
                              disabled
                              onChange={(e) => onAnnoucerBankAddressChange(e)}
                              name={'bankConfirmAddress'}
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={8}>
                          Ngân hàng chuyển nhượng{' '}
                          <span style={{ color: '#F5222D' }}></span>
                        </Col>
                        <Col span={16}>
                          <Form.Item name={'bankTranfer'}>
                            <Select
                              placeholder={'Chọn'}
                              name={'bankTranfer'}
                              onChange={(e) => onTranferBankChange(e)}
                            >
                              {context?.constantValue?.bankTranferList.map(
                                (bank, index) => (
                                  <Select.Option value={bank.bankId}>
                                    {bank.bankName}
                                  </Select.Option>
                                ),
                              )}
                            </Select>
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={8}>
                          Chỉ dẫn xác nhận
                          <span style={{ color: '#F5222D' }}>*</span>
                        </Col>
                        <Col span={16}>
                          <Form.Item name={'confirmationInstruction'}>
                            <Radio.Group
                              onChange={(e) =>
                                onConfirmationInstructionChange(e)
                              }
                              defaultValue={0}
                            >
                              <Space direction="horizontal">
                                <Radio value={0}>Không xác nhận</Radio>
                                <Radio value={1}>Xác nhận</Radio>
                                <Radio value={2}>Có thể xác nhận</Radio>
                              </Space>
                            </Radio.Group>
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={8}>
                          Yêu cầu ngân hàng xác nhận
                          <span style={{ color: '#F5222D' }}>*</span>
                        </Col>
                        <Col span={16}>
                          <Form.Item name={'confirmingBankRequest'}>
                            <Radio.Group
                              onChange={(e) => onConfirmingBankRequestChange(e)}
                              defaultValue={0}
                            >
                              <Space disabled direction="horizontal">
                                <Radio value={'0'}>Ngân hàng bất kỳ</Radio>
                                <Radio value={'1'}>Theo ngân hàng</Radio>
                              </Space>
                            </Radio.Group>
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={8}>
                          Chọn NH xác nhận
                          <span style={{ color: '#F5222D' }}>*</span>
                        </Col>
                        <Col span={16}>
                          <Form.Item
                            name={'confirmingBank'}
                            rules={[
                              {
                                required:
                                  context?.lcApplication
                                    ?.confirmingBankRequest == '1'
                                    ? true
                                    : false,
                                message: 'Vui lòng chọn ngân hàng phát hành!',
                              },
                            ]}
                          >
                            <Select
                              placeholder={'Chọn'}
                              disabled
                              name={'confirmingBank'}
                              onChange={(e) => onOtherConfirmingBankChange(e)}
                            >
                              {context?.constantValue?.releashBankList.map(
                                (bank, index) => (
                                  <Select.Option value={bank.bankId}>
                                    {bank.bankName}
                                  </Select.Option>
                                ),
                              )}
                            </Select>
                          </Form.Item>
                        </Col>
                      </Row>
                    </Col>
                    <Col span={1}></Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </div>
        )}
      {/* Trạng thái từ chối ký số, từ chối draft với loại lc là  lc thông thường */}
      {(context?.lcApplication?.status == LC_STATUS.TU_CHOI_DRAFT ||
        context?.lcApplication?.status == LC_STATUS.TU_CHOI_KY_SO) &&
        context?.initLCType == LC_TYPE.LC_THONG_THUONG && (
          <div style={{ background: 'white', borderRadius: '5px' }}>
            <Row gutter={24} style={{ padding: 16 }}>
              <Col span={24}>
                <div id="contract-info">
                  <Row style={{ paddingBottom: 16 }}>
                    <Col span={24}>
                      <KTTitle size={3}>
                        <b>Thông tin hợp đồng</b>
                      </KTTitle>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={23}>
                      <Row>
                        <Col span={8}>
                          Loại hợp đồng
                          <span style={{ color: '#F5222D' }}>*</span>
                        </Col>
                        <Col span={16}>
                          <Form.Item
                            name={'contractType'}
                            rules={[
                              {
                                required: true,
                                message:
                                  'Trường loại hợp đồng không được phép để trống!',
                              },
                            ]}
                          >
                            <Select
                              onChange={(e) => {
                                onContractTypeChange(e);
                              }}
                              placeholder="Chọn"
                            >
                              {contractType.map((type) => (
                                <Select.Option value={type.value}>
                                  {type.label}
                                </Select.Option>
                              ))}
                            </Select>
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={8}>
                          Mã hợp đồng
                          <span style={{ color: '#F5222D' }}></span>
                        </Col>
                        <Col span={16}>
                          {context?.lcApplication?.contractType == 2 ? (
                            <Form.Item>
                              <Input disabled />
                            </Form.Item>
                          ) : (
                            <Form.Item name={'contractCode'}>
                              <Select
                                onChange={(e) => {
                                  domain.onContractCodeChange(e);
                                }}
                                placeholder="Chọn"
                                defaultValue={
                                  context?.lcApplication?.contractCode
                                }
                              >
                                {context?.constantValue?.contractList.map(
                                  (contract, index) => (
                                    <Select.Option value={index}>
                                      {contract.contractCode}
                                    </Select.Option>
                                  ),
                                )}
                              </Select>
                            </Form.Item>
                          )}
                        </Col>
                      </Row>
                      <Row>
                        <Col span={8}>
                          Số hợp đồng
                          <span style={{ color: '#F5222D' }}></span>
                        </Col>
                        <Col span={16}>
                          {context?.lcApplication?.contractType == 2 ? (
                            <Form.Item
                              name={'contractNumber'}
                              rules={[
                                {
                                  required: true,
                                  message:
                                    'Trường số hợp đồng không được phép để trống!',
                                },
                                {
                                  max: 20,
                                  message:
                                    'Trường số hợp đồng không được phép vượt quá 20 ký tự!',
                                },
                              ]}
                            >
                              <Input
                                onChange={onContractNumberChange}
                                placeholder="Nhập thông tin"
                              />
                            </Form.Item>
                          ) : (
                            <Form.Item name={'contractNumber'}>
                              <Input
                                // defaultValue={context?.lcApplication?.contractNumber}
                                disabled
                              />
                            </Form.Item>
                          )}
                        </Col>
                      </Row>
                      <Row>
                        <Col span={8}>
                          Đính kèm hợp đồng
                          <span style={{ color: '#F5222D' }}></span>
                        </Col>
                        <Col span={16}>
                          <Form.Item
                            name={'file'}
                            rules={[
                              {
                                required:
                                  context?.lcApplication?.contractType == 2 &&
                                  context?.lcApplication?.contractFileName ==
                                    null &&
                                  context?.lcApplication?.contractFileUrl ==
                                    null
                                    ? true
                                    : false,
                                message: 'Vui lòng đính kèm hợp đồng!',
                              },
                            ]}
                          >
                            <Row gutter={24}>
                              <Col span={4}>
                                <span>
                                  <label
                                    for="file-upload-contact"
                                    class="custom-file-upload-tag"
                                  >
                                    <Tag
                                      className={`  ${
                                        context?.lcApplication?.contractType ==
                                        2
                                          ? 'custom-tag'
                                          : 'custom-tag-disabled'
                                      }`}
                                      color="default"
                                    >
                                      <span>
                                        Đính kèm <CloudUploadOutlined />
                                      </span>
                                    </Tag>
                                  </label>
                                  <input
                                    type="file"
                                    name="file"
                                    onChange={changeHandler}
                                    id="file-upload-contact"
                                    disabled={
                                      context?.lcApplication?.contractType == 1
                                        ? true
                                        : false
                                    }
                                    accept="application/pdf"
                                  />
                                </span>
                              </Col>
                              <Col span={20}>
                                {context?.uploadFileContract
                                  ?.isContractPicked == true ? (
                                  <div className="contract-file-info">
                                    <p className="contract-file-name">
                                      {
                                        context?.uploadFileContract
                                          ?.selectedContract.name
                                      }
                                    </p>
                                  </div>
                                ) : (
                                  <div className="contract-file-info">
                                    <p className="contract-file-name">
                                      {context?.lcApplication?.contractFileName}
                                    </p>
                                  </div>
                                )}
                              </Col>
                            </Row>
                          </Form.Item>
                        </Col>
                      </Row>
                    </Col>
                    <Col span={1}></Col>
                  </Row>
                </div>
              </Col>
              <Col span={24}>
                <div id="lc-request-info">
                  <Row style={{ paddingBottom: 16, paddingTop: 16 }}>
                    <Col span={24}>
                      <KTTitle size={3}>
                        <b>Thông tin đề nghị phát hành L/C</b>
                      </KTTitle>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={23}>
                      <Row>
                        <Col span={8}>
                          Mã đề nghị phát hành L/C
                          <span style={{ color: '#F5222D' }}></span>
                        </Col>
                        <Col span={16}>
                          <Form.Item name={'lcReleashingRequestCode'}>
                            <Input
                              disabled
                              placeholder="Hệ thống tự sinh ra sau khi đề nghị phát hành được tạo mới"
                              name={'lcReleashingRequestCode'}
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={8}>
                          Ngân hàng phát hành
                          <span style={{ color: '#F5222D' }}>*</span>
                        </Col>
                        <Col span={16}>
                          <Form.Item
                            name={'releashBank'}
                            rules={[
                              {
                                required: true,
                                message:
                                  'Trường ngân hàng phát hành không được phép để trống!',
                              },
                            ]}
                          >
                            <Select
                              onChange={(e) => {
                                onReleasheBankChange(e);
                              }}
                              placeholder="Chọn"
                            >
                              {context?.constantValue?.releashBankList.map(
                                (bank, index) => (
                                  <Select.Option value={bank.bankId}>
                                    {bank.bankName}
                                  </Select.Option>
                                ),
                              )}
                            </Select>
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={8}>
                          Ngày đề nghị
                          <span style={{ color: '#F5222D' }}>*</span>
                        </Col>
                        <Col span={16}>
                          <Form.Item
                            name={'proposalDate'}
                            rules={[
                              {
                                required: true,
                                message:
                                  'Trường ngày đề nghị không được phép để trống!',
                              },
                            ]}
                          >
                            <DatePicker
                              name="proposalDate"
                              // defaultValue={moment()}
                              format={dateFormatList}
                              placeholder="dd/mm/yyyy"
                              onChange={(e) => {
                                onProposalDateChange(e);
                              }}
                              allowClear={true}
                              disabledDate={(current) =>
                                current.isBefore(moment().subtract(1, 'day'))
                              }
                            />
                          </Form.Item>
                        </Col>
                      </Row>

                      <Row>
                        <Col span={8}>
                          Loại L/C <span style={{ color: '#F5222D' }}>*</span>
                        </Col>
                        <Col span={8}>
                          {context?.lcApplication?.contractType == 2 ? (
                            <Form.Item
                              name={'lcType'}
                              rules={[
                                {
                                  required: true,
                                  message:
                                    'Trường loại L/C không được phép để trống!',
                                },
                              ]}
                            >
                              <Select
                                disabled={context?.disableField}
                                onChange={onLCTypeChange}
                                placeholder="Chọn loại L/C"
                                name={'lcType'}
                              >
                                {lcTypeList.map((type) => (
                                  <Select.Option value={type.value}>
                                    {type.label}
                                  </Select.Option>
                                ))}
                              </Select>
                            </Form.Item>
                          ) : (
                            <Form.Item name={'lcType'}>
                              <Select
                                disabled
                                onChange={onLCTypeChange}
                                placeholder="Chọn loại L/C"
                                name={'lcType'}
                              >
                                {lcTypeList.map((type) => (
                                  <Select.Option value={type.value}>
                                    {type.label}
                                  </Select.Option>
                                ))}
                              </Select>
                            </Form.Item>
                          )}
                        </Col>
                      </Row>
                      <Row>
                        <Col span={8}>
                          Bên đề nghị phát hành L/C
                          <span style={{ color: '#F5222D' }}>*</span>
                        </Col>
                        <Col span={16}>
                          {context?.lcApplication?.contractType == 2 ? (
                            <Form.Item
                              name={'corporateBuy'}
                              rules={[
                                {
                                  required: true,
                                  message:
                                    'Trường bên đề nghị phát hành L/C không được phép để trống!',
                                },
                              ]}
                            >
                              <Input disabled name={'corporateBuy'} />
                            </Form.Item>
                          ) : (
                            <Form.Item name={'corporateBuy'}>
                              <Input disabled name={'corporateBuy'} />
                            </Form.Item>
                          )}
                        </Col>
                      </Row>

                      <Row>
                        <Col span={8}>
                          Địa chỉ và thông tin liên hệ bên đề nghị{' '}
                          <span style={{ color: '#F5222D' }}>*</span>
                        </Col>
                        <Col span={16}>
                          {context?.lcApplication?.contractType == 2 ? (
                            <Form.Item
                              name={'corporateBuyAddress'}
                              rules={[
                                {
                                  required: true,
                                  message:
                                    'Trường địa chỉ và thông tin liên hệ bên đề nghị phát hành L/C không được phép để trống!',
                                },
                                {
                                  max: 300,
                                  message:
                                    'Trường địa chỉ và thông tin liên hệ bên đề nghị phát hành L/C không được phép 300 ký tự!',
                                },
                              ]}
                            >
                              <Input
                                onChange={(e) => {
                                  onCorporateBuyAddressChange(e);
                                }}
                                name={'corporateBuyAddress'}
                              />
                            </Form.Item>
                          ) : (
                            <Form.Item name={'corporateBuyAddress'}>
                              <Input disabled name={'corporateBuyAddress'} />
                            </Form.Item>
                          )}
                        </Col>
                      </Row>
                      <Row>
                        <Col span={8}>
                          Bên Thụ hưởng{' '}
                          <span style={{ color: '#F5222D' }}>*</span>
                        </Col>
                        <Col span={16}>
                          {context?.lcApplication?.contractType == 2 ? (
                            <Form.Item
                              name={'corporateSell'}
                              rules={[
                                {
                                  required: true,
                                  message:
                                    'Trường bên thụ hưởng không được phép để trống!',
                                },
                              ]}
                            >
                              <Select
                                onChange={(e) => {
                                  onCorporateSellChange(e);
                                }}
                                placeholder={'Chọn Bên Thụ hưởng'}
                                name={'corporateSell'}
                              >
                                {context?.constantValue?.corporateList.map(
                                  (corporate) => (
                                    <Select.Option
                                      value={corporate.corporateId}
                                    >
                                      {corporate.corporateName}
                                    </Select.Option>
                                  ),
                                )}
                              </Select>
                            </Form.Item>
                          ) : (
                            <Form.Item
                              name={'corporateSell'}
                              rules={[
                                {
                                  required: true,
                                  message:
                                    'Trường bên thụ hưởng không được phép để trống!',
                                },
                              ]}
                            >
                              <Input disabled name={'corporateSell'} />
                            </Form.Item>
                          )}
                        </Col>
                      </Row>
                      <Row>
                        <Col span={8}>
                          Địa chỉ và thông tin liên hệ bên thụ hưởng
                          <span style={{ color: '#F5222D' }}>*</span>
                        </Col>
                        <Col span={16}>
                          {context?.lcApplication?.contractType == 2 ? (
                            <Form.Item
                              name={'corporateSellAddress'}
                              rules={[
                                {
                                  required: true,
                                  message:
                                    'Trường địa chỉ và thông tin liên hệ bên thụ hưởng không được phép để trống!',
                                },
                                {
                                  max: 300,
                                  message:
                                    'Trường địa chỉ và thông tin liên hệ bên thụ hưởng phát hành L/C không được phép 300 ký tự!',
                                },
                              ]}
                            >
                              <Input
                                onChange={(e) => {
                                  onCorporateSellAddressChange(e);
                                }}
                                name={'corporateSellAddress'}
                              />
                            </Form.Item>
                          ) : (
                            <Form.Item name={'corporateSellAddress'}>
                              <Input disabled name={'corporateSellAddress'} />
                            </Form.Item>
                          )}
                        </Col>
                      </Row>
                      <Row>
                        <Col span={8}>
                          Ngân hàng thông báo
                          <span style={{ color: '#F5222D' }}>*</span>
                        </Col>
                        <Col span={16}>
                          <Form.Item
                            name={'bankConfirm'}
                            rules={[
                              {
                                required: true,
                                message:
                                  'Trường ngân hàng thông báo không được phép để trống!',
                              },
                            ]}
                          >
                            <Select
                              onChange={(e) => onAnnoucerBankChange(e)}
                              name={'bankConfirm'}
                              placeholder={'Chọn'}
                            >
                              {context?.constantValue?.confirmBankList.map(
                                (bank) => (
                                  <Select.Option value={bank.bankId}>
                                    {bank.swiftCode + '-' + bank.bankName}
                                  </Select.Option>
                                ),
                              )}
                            </Select>
                          </Form.Item>
                        </Col>
                      </Row>

                      <Row>
                        <Col span={8}>
                          Địa chỉ ngân hàng thông báo{' '}
                          <span style={{ color: '#F5222D' }}></span>
                        </Col>
                        <Col span={16}>
                          <Form.Item
                            name={'bankConfirmAddress'}
                            rules={[
                              {
                                max: 300,
                                message:
                                  'Trường địa chỉ ngân hàng thông báo không được phép vượt quá 300 ký tự!',
                              },
                            ]}
                          >
                            <Input
                              onChange={(e) => onAnnoucerBankAddressChange(e)}
                              name={'bankConfirmAddress'}
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={8}>
                          Ngân hàng chuyển nhượng{' '}
                          <span style={{ color: '#F5222D' }}></span>
                        </Col>
                        <Col span={16}>
                          <Form.Item name={'bankTranfer'}>
                            <Select
                              placeholder={'Chọn'}
                              name={'bankTranfer'}
                              onChange={(e) => onTranferBankChange(e)}
                            >
                              {context?.constantValue?.bankTranferList.map(
                                (bank, index) => (
                                  <Select.Option value={bank.bankId}>
                                    {bank.bankName}
                                  </Select.Option>
                                ),
                              )}
                            </Select>
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={8}>
                          Chỉ dẫn xác nhận
                          <span style={{ color: '#F5222D' }}>*</span>
                        </Col>
                        <Col span={16}>
                          <Form.Item name={'confirmationInstruction'}>
                            <Radio.Group
                              onChange={(e) =>
                                onConfirmationInstructionChange(e)
                              }
                              defaultValue={0}
                            >
                              <Space direction="horizontal">
                                <Radio value={0}>Không xác nhận</Radio>
                                <Radio value={1}>Xác nhận</Radio>
                                <Radio value={2}>Có thể xác nhận</Radio>
                              </Space>
                            </Radio.Group>
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={8}>
                          Yêu cầu ngân hàng xác nhận
                          <span style={{ color: '#F5222D' }}>*</span>
                        </Col>
                        <Col span={16}>
                          <Form.Item name={'confirmingBankRequest'}>
                            <Radio.Group
                              onChange={(e) => onConfirmingBankRequestChange(e)}
                            >
                              <Space direction="horizontal">
                                <Radio value={'0'}>Ngân hàng bất kỳ</Radio>
                                <Radio value={'1'}>Theo ngân hàng</Radio>
                              </Space>
                            </Radio.Group>
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={8}>
                          Chọn NH xác nhận
                          <span style={{ color: '#F5222D' }}>*</span>
                        </Col>
                        <Col span={16}>
                          <Form.Item
                            name={'confirmingBank'}
                            rules={[
                              {
                                required:
                                  context?.lcApplication
                                    ?.confirmingBankRequest == '1'
                                    ? true
                                    : false,
                                message: 'Vui lòng chọn ngân hàng phát hành!',
                              },
                            ]}
                          >
                            <Select
                              placeholder={'Chọn'}
                              disabled={
                                context?.lcApplication?.confirmingBankRequest ==
                                1
                                  ? false
                                  : true
                              }
                              name={'confirmingBank'}
                              onChange={(e) => onOtherConfirmingBankChange(e)}
                            >
                              {context?.constantValue?.releashBankList.map(
                                (bank, index) => (
                                  <Select.Option value={bank.bankId}>
                                    {bank.bankName}
                                  </Select.Option>
                                ),
                              )}
                            </Select>
                          </Form.Item>
                        </Col>
                      </Row>
                    </Col>
                    <Col span={1}></Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </div>
        )}
      {/* Trạng thái từ chối báo giá, từ chối tài trợ */}
      {(context?.lcApplication?.status == LC_STATUS.TU_CHOI_BAO_GIA ||
        context?.lcApplication?.status == LC_STATUS.TU_CHOI_TAI_TRO) && (
        <div style={{ background: 'white', borderRadius: '5px' }}>
          <Row gutter={24} style={{ padding: 16 }}>
            <Col span={24}>
              <div id="contract-info">
                <Row style={{ paddingBottom: 16 }}>
                  <Col span={24}>
                    <KTTitle size={3}>
                      <b>Thông tin hợp đồng</b>
                    </KTTitle>
                  </Col>
                </Row>
                <Row>
                  <Col span={23}>
                    <Row>
                      <Col span={8}>
                        Loại hợp đồng
                        <span style={{ color: '#F5222D' }}>*</span>
                      </Col>
                      <Col span={16}>
                        <Form.Item
                          name={'contractType'}
                          rules={[
                            {
                              required: true,
                              message:
                                'Trường loại hợp đồng không được phép để trống!',
                            },
                          ]}
                        >
                          <Select
                            onChange={(e) => {
                              onContractTypeChange(e);
                            }}
                            placeholder="Chọn"
                          >
                            {contractType.map((type) => (
                              <Select.Option value={type.value}>
                                {type.label}
                              </Select.Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={8}>
                        Mã hợp đồng
                        <span style={{ color: '#F5222D' }}></span>
                      </Col>
                      <Col span={16}>
                        {context?.lcApplication?.contractType == 2 ? (
                          <Form.Item>
                            <Input disabled />
                          </Form.Item>
                        ) : (
                          <Form.Item name={'contractCode'}>
                            <Select
                              onChange={(e) => {
                                domain.onContractCodeChange(e);
                              }}
                              placeholder="Chọn"
                              defaultValue={
                                context?.lcApplication?.contractCode
                              }
                            >
                              {context?.constantValue?.contractList.map(
                                (contract, index) => (
                                  <Select.Option value={index}>
                                    {contract.contractCode}
                                  </Select.Option>
                                ),
                              )}
                            </Select>
                          </Form.Item>
                        )}
                      </Col>
                    </Row>
                    <Row>
                      <Col span={8}>
                        Số hợp đồng
                        <span style={{ color: '#F5222D' }}></span>
                      </Col>
                      <Col span={16}>
                        {context?.lcApplication?.contractType == 2 ? (
                          <Form.Item
                            name={'contractNumber'}
                            rules={[
                              {
                                required: true,
                                message:
                                  'Trường số hợp đồng không được phép để trống!',
                              },
                              {
                                max: 20,
                                message:
                                  'Trường số hợp đồng không được phép vượt quá 20 ký tự!',
                              },
                            ]}
                          >
                            <Input
                              onChange={onContractNumberChange}
                              placeholder="Nhập thông tin"
                            />
                          </Form.Item>
                        ) : (
                          <Form.Item name={'contractNumber'}>
                            <Input
                              // defaultValue={context?.lcApplication?.contractNumber}
                              disabled
                            />
                          </Form.Item>
                        )}
                      </Col>
                    </Row>
                    <Row>
                      <Col span={8}>
                        Đính kèm hợp đồng
                        <span style={{ color: '#F5222D' }}></span>
                      </Col>
                      <Col span={16}>
                        <Form.Item
                          name={'file'}
                          rules={[
                            {
                              required:
                                context?.lcApplication?.contractType == 2 &&
                                context?.lcApplication?.contractFileName ==
                                  null &&
                                context?.lcApplication?.contractFileUrl == null
                                  ? true
                                  : false,
                              message: 'Vui lòng đính kèm hợp đồng!',
                            },
                          ]}
                        >
                          <Row gutter={24}>
                            <Col span={4}>
                              <span>
                                <label
                                  for="file-upload-contact"
                                  class="custom-file-upload-tag"
                                >
                                  <Tag
                                    className={`  ${
                                      context?.lcApplication?.contractType == 2
                                        ? 'custom-tag'
                                        : 'custom-tag-disabled'
                                    }`}
                                    color="default"
                                  >
                                    <span>
                                      Đính kèm <CloudUploadOutlined />
                                    </span>
                                  </Tag>
                                </label>
                                <input
                                  type="file"
                                  name="file"
                                  onChange={changeHandler}
                                  id="file-upload-contact"
                                  disabled={
                                    context?.lcApplication?.contractType == 1
                                      ? true
                                      : false
                                  }
                                  accept="application/pdf"
                                />
                              </span>
                            </Col>
                            <Col span={20}>
                              {context?.uploadFileContract?.isContractPicked ==
                              true ? (
                                <div className="contract-file-info">
                                  <p className="contract-file-name">
                                    {
                                      context?.uploadFileContract
                                        ?.selectedContract.name
                                    }
                                  </p>
                                </div>
                              ) : (
                                <div className="contract-file-info">
                                  <p className="contract-file-name">
                                    {context?.lcApplication?.contractFileName}
                                  </p>
                                </div>
                              )}
                            </Col>
                          </Row>
                        </Form.Item>
                      </Col>
                    </Row>
                  </Col>
                  <Col span={1}></Col>
                </Row>
              </div>
            </Col>
            <Col span={24}>
              <div id="lc-request-info">
                <Row style={{ paddingBottom: 16, paddingTop: 16 }}>
                  <Col span={24}>
                    <KTTitle size={3}>
                      <b>Thông tin đề nghị phát hành L/C</b>
                    </KTTitle>
                  </Col>
                </Row>
                <Row>
                  <Col span={23}>
                    <Row>
                      <Col span={8}>
                        Mã đề nghị phát hành L/C
                        <span style={{ color: '#F5222D' }}></span>
                      </Col>
                      <Col span={16}>
                        <Form.Item name={'lcReleashingRequestCode'}>
                          <Input
                            disabled
                            placeholder="Hệ thống tự sinh ra sau khi đề nghị phát hành được tạo mới"
                            name={'lcReleashingRequestCode'}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={8}>
                        Ngân hàng phát hành
                        <span style={{ color: '#F5222D' }}>*</span>
                      </Col>
                      <Col span={16}>
                        <Form.Item
                          name={'releashBank'}
                          rules={[
                            {
                              required: true,
                              message:
                                'Trường ngân hàng phát hành không được phép để trống!',
                            },
                          ]}
                        >
                          <Select
                            onChange={(e) => {
                              onReleasheBankChange(e);
                            }}
                            placeholder="Chọn"
                          >
                            {context?.constantValue?.releashBankList.map(
                              (bank, index) => (
                                <Select.Option value={bank.bankId}>
                                  {bank.bankName}
                                </Select.Option>
                              ),
                            )}
                          </Select>
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={8}>
                        Ngày đề nghị
                        <span style={{ color: '#F5222D' }}>*</span>
                      </Col>
                      <Col span={16}>
                        <Form.Item
                          name={'proposalDate'}
                          rules={[
                            {
                              required: true,
                              message:
                                'Trường ngày đề nghị không được phép để trống!',
                            },
                          ]}
                        >
                          <DatePicker
                            name="proposalDate"
                            // defaultValue={moment()}
                            format={dateFormatList}
                            placeholder="dd/mm/yyyy"
                            onChange={(e) => {
                              onProposalDateChange(e);
                            }}
                            allowClear={true}
                            disabledDate={(current) =>
                              current.isBefore(moment().subtract(1, 'day'))
                            }
                          />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row>
                      <Col span={8}>
                        Loại L/C <span style={{ color: '#F5222D' }}>*</span>
                      </Col>
                      <Col span={8}>
                        {context?.lcApplication?.contractType == 2 ? (
                          <Form.Item
                            name={'lcType'}
                            rules={[
                              {
                                required: true,
                                message:
                                  'Trường loại L/C không được phép để trống!',
                              },
                            ]}
                          >
                            <Select
                              disabled={context?.disableField}
                              onChange={onLCTypeChange}
                              placeholder="Chọn loại L/C"
                              name={'lcType'}
                            >
                              {lcTypeList.map((type) => (
                                <Select.Option value={type.value}>
                                  {type.label}
                                </Select.Option>
                              ))}
                            </Select>
                          </Form.Item>
                        ) : (
                          <Form.Item name={'lcType'}>
                            <Select
                              disabled
                              onChange={onLCTypeChange}
                              placeholder="Chọn loại L/C"
                              name={'lcType'}
                            >
                              {lcTypeList.map((type) => (
                                <Select.Option value={type.value}>
                                  {type.label}
                                </Select.Option>
                              ))}
                            </Select>
                          </Form.Item>
                        )}
                      </Col>
                    </Row>
                    <Row>
                      <Col span={8}>
                        Bên đề nghị phát hành L/C
                        <span style={{ color: '#F5222D' }}>*</span>
                      </Col>
                      <Col span={16}>
                        {context?.lcApplication?.contractType == 2 ? (
                          <Form.Item
                            name={'corporateBuy'}
                            rules={[
                              {
                                required: true,
                                message:
                                  'Trường bên đề nghị phát hành L/C không được phép để trống!',
                              },
                            ]}
                          >
                            <Input disabled name={'corporateBuy'} />
                          </Form.Item>
                        ) : (
                          <Form.Item name={'corporateBuy'}>
                            <Input disabled name={'corporateBuy'} />
                          </Form.Item>
                        )}
                      </Col>
                    </Row>

                    <Row>
                      <Col span={8}>
                        Địa chỉ và thông tin liên hệ bên đề nghị{' '}
                        <span style={{ color: '#F5222D' }}>*</span>
                      </Col>
                      <Col span={16}>
                        {context?.lcApplication?.contractType == 2 ? (
                          <Form.Item
                            name={'corporateBuyAddress'}
                            rules={[
                              {
                                required: true,
                                message:
                                  'Trường địa chỉ và thông tin liên hệ bên đề nghị phát hành L/C không được phép để trống!',
                              },
                              {
                                max: 300,
                                message:
                                  'Trường địa chỉ và thông tin liên hệ bên đề nghị phát hành L/C không được phép 300 ký tự!',
                              },
                            ]}
                          >
                            <Input
                              onChange={(e) => {
                                onCorporateBuyAddressChange(e);
                              }}
                              name={'corporateBuyAddress'}
                            />
                          </Form.Item>
                        ) : (
                          <Form.Item name={'corporateBuyAddress'}>
                            <Input disabled name={'corporateBuyAddress'} />
                          </Form.Item>
                        )}
                      </Col>
                    </Row>
                    <Row>
                      <Col span={8}>
                        Bên Thụ hưởng{' '}
                        <span style={{ color: '#F5222D' }}>*</span>
                      </Col>
                      <Col span={16}>
                        {context?.lcApplication?.contractType == 2 ? (
                          <Form.Item
                            name={'corporateSell'}
                            rules={[
                              {
                                required: true,
                                message:
                                  'Trường bên thụ hưởng không được phép để trống!',
                              },
                            ]}
                          >
                            <Select
                              onChange={(e) => {
                                onCorporateSellChange(e);
                              }}
                              placeholder={'Chọn Bên Thụ hưởng'}
                              name={'corporateSell'}
                            >
                              {context?.constantValue?.corporateList.map(
                                (corporate) => (
                                  <Select.Option value={corporate.corporateId}>
                                    {corporate.corporateName}
                                  </Select.Option>
                                ),
                              )}
                            </Select>
                          </Form.Item>
                        ) : (
                          <Form.Item
                            name={'corporateSell'}
                            rules={[
                              {
                                required: true,
                                message:
                                  'Trường bên thụ hưởng không được phép để trống!',
                              },
                            ]}
                          >
                            <Input disabled name={'corporateSell'} />
                          </Form.Item>
                        )}
                      </Col>
                    </Row>
                    <Row>
                      <Col span={8}>
                        Địa chỉ và thông tin liên hệ bên thụ hưởng
                        <span style={{ color: '#F5222D' }}>*</span>
                      </Col>
                      <Col span={16}>
                        {context?.lcApplication?.contractType == 2 ? (
                          <Form.Item
                            name={'corporateSellAddress'}
                            rules={[
                              {
                                required: true,
                                message:
                                  'Trường địa chỉ và thông tin liên hệ bên thụ hưởng không được phép để trống!',
                              },
                              {
                                max: 300,
                                message:
                                  'Trường địa chỉ và thông tin liên hệ bên thụ hưởng phát hành L/C không được phép 300 ký tự!',
                              },
                            ]}
                          >
                            <Input
                              onChange={(e) => {
                                onCorporateSellAddressChange(e);
                              }}
                              name={'corporateSellAddress'}
                            />
                          </Form.Item>
                        ) : (
                          <Form.Item name={'corporateSellAddress'}>
                            <Input disabled name={'corporateSellAddress'} />
                          </Form.Item>
                        )}
                      </Col>
                    </Row>
                    <Row>
                      <Col span={8}>
                        Ngân hàng thông báo
                        <span style={{ color: '#F5222D' }}>*</span>
                      </Col>
                      <Col span={16}>
                        <Form.Item
                          name={'bankConfirm'}
                          rules={[
                            {
                              required: true,
                              message:
                                'Trường ngân hàng thông báo không được phép để trống!',
                            },
                          ]}
                        >
                          <Select
                            onChange={(e) => onAnnoucerBankChange(e)}
                            name={'bankConfirm'}
                            placeholder={'Chọn'}
                          >
                            {context?.constantValue?.confirmBankList.map(
                              (bank) => (
                                <Select.Option value={bank.bankId}>
                                  {bank.swiftCode + '-' + bank.bankName}
                                </Select.Option>
                              ),
                            )}
                          </Select>
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row>
                      <Col span={8}>
                        Địa chỉ ngân hàng thông báo{' '}
                        <span style={{ color: '#F5222D' }}></span>
                      </Col>
                      <Col span={16}>
                        <Form.Item
                          name={'bankConfirmAddress'}
                          rules={[
                            {
                              max: 300,
                              message:
                                'Trường địa chỉ ngân hàng thông báo không được phép vượt quá 300 ký tự!',
                            },
                          ]}
                        >
                          <Input
                            onChange={(e) => onAnnoucerBankAddressChange(e)}
                            name={'bankConfirmAddress'}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={8}>
                        Ngân hàng chuyển nhượng{' '}
                        <span style={{ color: '#F5222D' }}></span>
                      </Col>
                      <Col span={16}>
                        <Form.Item name={'bankTranfer'}>
                          <Select
                            placeholder={'Chọn'}
                            name={'bankTranfer'}
                            onChange={(e) => onTranferBankChange(e)}
                          >
                            {context?.constantValue?.bankTranferList.map(
                              (bank, index) => (
                                <Select.Option value={bank.bankId}>
                                  {bank.bankName}
                                </Select.Option>
                              ),
                            )}
                          </Select>
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={8}>
                        Chỉ dẫn xác nhận
                        <span style={{ color: '#F5222D' }}>*</span>
                      </Col>
                      <Col span={16}>
                        <Form.Item name={'confirmationInstruction'}>
                          <Radio.Group
                            onChange={(e) => onConfirmationInstructionChange(e)}
                            defaultValue={0}
                          >
                            <Space direction="horizontal">
                              <Radio value={0}>Không xác nhận</Radio>
                              <Radio value={1}>Xác nhận</Radio>
                              <Radio value={2}>Có thể xác nhận</Radio>
                            </Space>
                          </Radio.Group>
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={8}>
                        Yêu cầu ngân hàng xác nhận
                        <span style={{ color: '#F5222D' }}>*</span>
                      </Col>
                      <Col span={16}>
                        <Form.Item name={'confirmingBankRequest'}>
                          <Radio.Group
                            onChange={(e) => onConfirmingBankRequestChange(e)}
                            defaultValue={0}
                          >
                            <Space direction="horizontal">
                              <Radio value={'0'}>Ngân hàng bất kỳ</Radio>
                              <Radio value={'1'}>Theo ngân hàng</Radio>
                            </Space>
                          </Radio.Group>
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={8}>
                        Chọn NH xác nhận
                        <span style={{ color: '#F5222D' }}>*</span>
                      </Col>
                      <Col span={16}>
                        <Form.Item
                          name={'confirmingBank'}
                          rules={[
                            {
                              required:
                                context?.lcApplication?.confirmingBankRequest ==
                                '1'
                                  ? true
                                  : false,
                              message: 'Vui lòng chọn ngân hàng phát hành!',
                            },
                          ]}
                        >
                          <Select
                            placeholder={'Chọn'}
                            disabled={
                              context?.lcApplication?.confirmingBankRequest == 1
                                ? false
                                : true
                            }
                            name={'confirmingBank'}
                            onChange={(e) => onOtherConfirmingBankChange(e)}
                          >
                            {context?.constantValue?.releashBankList.map(
                              (bank, index) => (
                                <Select.Option value={bank.bankId}>
                                  {bank.bankName}
                                </Select.Option>
                              ),
                            )}
                          </Select>
                        </Form.Item>
                      </Col>
                    </Row>
                  </Col>
                  <Col span={1}></Col>
                </Row>
              </div>
            </Col>
          </Row>
        </div>
      )}
    </>
  );
};

export default CommonInfoContent;
