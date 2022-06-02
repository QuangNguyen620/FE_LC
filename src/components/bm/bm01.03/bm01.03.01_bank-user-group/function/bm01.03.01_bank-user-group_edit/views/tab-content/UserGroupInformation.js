import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { EyeFilled, SearchOutlined } from '@ant-design/icons';
import {
  Col,
  Row,
  Typography,
  Input,
  Button,
  Form,
  Select,
  Space,
  Checkbox,
  message,
} from 'antd';
import { KTTitle } from 'core/ui';
import '../../../../common/less/BM010301.less';
import { BM010301Domain } from '../../domains/BM010301EditDomain';
import {
  BANK_ROLE_LIST,
  BANK_BRANCH_LEVEL,
  BANK_USER_GROUP_TYPE,
} from '../../../../../../../../core/common/Constant';
import log from '../../ModuleLogger';
const { TextArea } = Input;

const defaultCheckedList = [];
const UserGroupInformation = ({ lang = 'vi', ...props }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [context, domain] = BM010301Domain();
  const [channelOptions, setChannelOptions] = useState([
    { label: 'AIN', value: 'AIN', checked: true },
  ]);
  const [checkedList, setCheckedList] = React.useState(defaultCheckedList);
  const [indeterminate, setIndeterminate] = React.useState(false);
  const [checkAll, setCheckAll] = React.useState(false);
  const [requireChannel, setRequireChannel] = useState(false);

  useEffect(() => {
    console.log('innit--', context);
    domain.initDomain();
  }, []);

  useEffect(() => {
    setChannelOptions(context?.channelOptions);
    setCheckAll(context?.checkAll);
    setRequireChannel(context?.requireChannel);
    setIndeterminate(context?.indeterminate);
    log.debug('useEffect--', context);
  }, [context]);

  const onChange = (e) => {
    form.validateFields(['channel']);
    var checked = e?.target?.checked;
    var value = e?.target?.value;
    var count = 0;
    var plainOptionNew = channelOptions;
    channelOptions.forEach((channel, index) => {
      var tempChannel = channel;
      if (value == channel.value) {
        tempChannel.checked = checked;
      }
      plainOptionNew[index] = tempChannel;
    });
    domain.setChannelOptions(plainOptionNew);
    console.log(plainOptionNew);
  };

  const onCheckAllChange = (e) => {
    var plainOptionNew = [];
    form.validateFields(['channel']);
    channelOptions.forEach((channel) => {
      var tempChannel = channel;
      tempChannel.checked = e.target.checked;
      plainOptionNew.push(tempChannel);
    });
    domain.setCheckAll(e.target.checked);

    setChannelOptions(plainOptionNew);
    setCheckedList(e.target.checked ? channelOptions : []);
    setIndeterminate(false);
  };
  //------------------------------//

  //input value change
  const userGroupCodeChange = (e) => {
    domain.userGroupCodeChange(e);
  };

  const userGroupNameChange = (e) => {
    domain.userGroupNameChange(e);
  };

  const branchLevelChange = (e) => {
    domain.branchLevelChange(e);
  };

  const branchChange = (e) => {
    domain.branchChange(e);
  };

  const departmentChange = (e) => {
    domain.departmentChange(e);
  };

  const roleChange = (e) => {
    domain.roleChange(e);
  };

  const groupTypeChange = (e) => {
    domain.groupTypeChange(e);
  };

  const statusChange = (e) => {
    domain.statusChange(e);
  };
  const desciptionChange = (e) => {
    domain.desciptionChange(e);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  //-------------------------------------//

  return (
    <>
      <div className={'form-tabpane'}>
        <Row>
          <Col span={24}>
            <Row>
              <Col span={6}>
                Mã nhóm người dùng <span className={'text-require'}>*</span>
              </Col>
              <Col span={6}>
                <Form.Item
                  name={'userGroupCode'}
                  // rules={[
                  //   {
                  //     whitespace: true,
                  //     required: true,
                  //     message:
                  //       'Trường mã nhóm người dùng không được phép để trống!',
                  //   },
                  //   {
                  //     max: 20,
                  //     message:
                  //       'Trường mã nhóm người dùng không được phép vượt quá 20 kí tự!',
                  //   },

                  //   {
                  //     pattern: /^[a-zA-Z0-9_]+$/,
                  //     message:
                  //       'Mã nhóm người dùng không chứa kí tự đặc biệt ngoại trừ (_)',
                  //   },
                  // ]}
                >
                  <Input
                    onChange={userGroupCodeChange}
                    disabled
                    placeholder={'Nhập mô tả'}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span={6}>
                Tên nhóm người dùng <span className={'text-require'}>*</span>
              </Col>
              <Col span={6}>
                <Form.Item
                  name={'userGroupName'}
                  rules={[
                    {
                      required: true,
                      message:
                        'Trường tên nhóm người dùng không được phép để trống!',
                    },
                    {
                      max: 100,
                      message:
                        'Trường tên nhóm người dùng không được phép vượt quá 100 kí tự!',
                    },
                    {
                      whitespace: true,
                      message:
                        'Trường tên nhóm người dùng không được phép để trống!',
                    },
                  ]}
                >
                  <Input
                    onChange={userGroupNameChange}
                    placeholder={'Nhập mô tả'}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span={6}>
                Ngân hàng <span className={'text-require'}>*</span>
              </Col>
              <Col span={9}>
                <Form.Item
                  name={'bankId'}
                  rules={[
                    {
                      required: true,
                      message: 'Trường ngân hàng không được phép để trống!',
                    },
                  ]}
                  initialValue={context?.bankUserGroup?.bankId}
                >
                  <Select disabled>
                    {context?.constantValue?.bankList.map((bank) => (
                      <Select.Option value={bank.bankId}>
                        {bank.bankName}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span={6}>
                Cấp chi nhánh <span className={'text-require'}>*</span>
              </Col>
              <Col span={6}>
                <Form.Item
                  name={'branchLevel'}
                  rules={[
                    {
                      required: true,
                      message: 'Trường cấp chi nhánh không được phép để trống!',
                    },
                  ]}
                  initialValue={BANK_BRANCH_LEVEL?.[0].value}
                >
                  <Select onChange={branchLevelChange}>
                    {BANK_BRANCH_LEVEL.map((branch) => (
                      <Select.Option value={branch.value}>
                        {branch.label}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span={6}>
                Kênh <span className={'text-require'}>*</span>
              </Col>
              <Col span={18}>
                <Form.Item
                  name={'channel'}
                  rules={[
                    {
                      required: requireChannel,
                      message: 'Trường kênh không được phép để trống!',
                    },
                  ]}
                >
                  <Row>
                    <Col span={6}>
                      <Checkbox
                        indeterminate={indeterminate}
                        onChange={onCheckAllChange}
                        checked={checkAll}
                        disabled
                      >
                        Tất cả
                      </Checkbox>
                    </Col>
                    {channelOptions?.map((channel) => (
                      <Col span={6}>
                        <Checkbox
                          value={channel?.value}
                          onChange={onChange}
                          checked={channel?.checked}
                          disabled
                        >
                          {channel?.label}
                        </Checkbox>
                      </Col>
                    ))}
                  </Row>
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                Loại nhóm<span className={'text-require'}>*</span>
              </Col>
              <Col span={6}>
                <Form.Item
                  name={'groupType'}
                  rules={[
                    {
                      required: true,
                      message: 'Trường loại nhóm không được phép để trống!',
                    },
                  ]}
                  initialValue={BANK_USER_GROUP_TYPE?.[0].value}
                >
                  <Select
                    onChange={groupTypeChange}
                    disabled
                    placeholder={'Chọn'}
                  >
                    {BANK_USER_GROUP_TYPE.map((groupType) => (
                      <Select.Option value={groupType.value}>
                        {groupType.label}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                Vai trò <span className={'text-require'}>*</span>
              </Col>
              <Col span={6}>
                <Form.Item
                  name={'role'}
                  rules={[
                    {
                      required: true,
                      message: 'Trường vai trò không được phép để trống!',
                    },
                  ]}
                >
                  <Select onChange={roleChange} placeholder={'Chọn'}>
                    {BANK_ROLE_LIST.map((role) => (
                      <Select.Option value={role.value}>
                        {role.name}
                      </Select.Option>
                    ))}
                    placeholder={'Chọn'}
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span={6}>
                Trạng thái <span className={'text-require'}>*</span>
              </Col>
              <Col span={6}>
                <Form.Item
                  // rules={[
                  //   {
                  //     required: true,
                  //     message: 'Trường trạng thái không được phép để trống!',
                  //   },
                  // ]}
                  name={'status'}
                >
                  <Select defaultValue={1} onChange={statusChange}>
                    <Select.Option value={1}>Hoạt động</Select.Option>
                    <Select.Option value={0}>Ngừng hoạt động</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span={6}>Mô tả </Col>
              <Col span={16}>
                <Form.Item
                  name={'description'}
                  rules={[
                    {
                      max: 255,
                      message:
                        'Trường mô tả không được phép vượt quá 255 kí tự!',
                    },
                  ]}
                >
                  <TextArea
                    onChange={desciptionChange}
                    placeholder={'Nhập mô tả'}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Col span={2}></Col>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default UserGroupInformation;
