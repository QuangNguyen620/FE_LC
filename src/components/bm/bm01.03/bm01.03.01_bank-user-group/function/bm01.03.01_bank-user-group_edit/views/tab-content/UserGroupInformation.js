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
                M?? nh??m ng?????i d??ng <span className={'text-require'}>*</span>
              </Col>
              <Col span={6}>
                <Form.Item
                  name={'userGroupCode'}
                  // rules={[
                  //   {
                  //     whitespace: true,
                  //     required: true,
                  //     message:
                  //       'Tr?????ng m?? nh??m ng?????i d??ng kh??ng ???????c ph??p ????? tr???ng!',
                  //   },
                  //   {
                  //     max: 20,
                  //     message:
                  //       'Tr?????ng m?? nh??m ng?????i d??ng kh??ng ???????c ph??p v?????t qu?? 20 k?? t???!',
                  //   },

                  //   {
                  //     pattern: /^[a-zA-Z0-9_]+$/,
                  //     message:
                  //       'M?? nh??m ng?????i d??ng kh??ng ch???a k?? t??? ?????c bi???t ngo???i tr??? (_)',
                  //   },
                  // ]}
                >
                  <Input
                    onChange={userGroupCodeChange}
                    disabled
                    placeholder={'Nh???p m?? t???'}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span={6}>
                T??n nh??m ng?????i d??ng <span className={'text-require'}>*</span>
              </Col>
              <Col span={6}>
                <Form.Item
                  name={'userGroupName'}
                  rules={[
                    {
                      required: true,
                      message:
                        'Tr?????ng t??n nh??m ng?????i d??ng kh??ng ???????c ph??p ????? tr???ng!',
                    },
                    {
                      max: 100,
                      message:
                        'Tr?????ng t??n nh??m ng?????i d??ng kh??ng ???????c ph??p v?????t qu?? 100 k?? t???!',
                    },
                    {
                      whitespace: true,
                      message:
                        'Tr?????ng t??n nh??m ng?????i d??ng kh??ng ???????c ph??p ????? tr???ng!',
                    },
                  ]}
                >
                  <Input
                    onChange={userGroupNameChange}
                    placeholder={'Nh???p m?? t???'}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span={6}>
                Ng??n h??ng <span className={'text-require'}>*</span>
              </Col>
              <Col span={9}>
                <Form.Item
                  name={'bankId'}
                  rules={[
                    {
                      required: true,
                      message: 'Tr?????ng ng??n h??ng kh??ng ???????c ph??p ????? tr???ng!',
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
                C???p chi nh??nh <span className={'text-require'}>*</span>
              </Col>
              <Col span={6}>
                <Form.Item
                  name={'branchLevel'}
                  rules={[
                    {
                      required: true,
                      message: 'Tr?????ng c???p chi nh??nh kh??ng ???????c ph??p ????? tr???ng!',
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
                K??nh <span className={'text-require'}>*</span>
              </Col>
              <Col span={18}>
                <Form.Item
                  name={'channel'}
                  rules={[
                    {
                      required: requireChannel,
                      message: 'Tr?????ng k??nh kh??ng ???????c ph??p ????? tr???ng!',
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
                        T???t c???
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
                Lo???i nh??m<span className={'text-require'}>*</span>
              </Col>
              <Col span={6}>
                <Form.Item
                  name={'groupType'}
                  rules={[
                    {
                      required: true,
                      message: 'Tr?????ng lo???i nh??m kh??ng ???????c ph??p ????? tr???ng!',
                    },
                  ]}
                  initialValue={BANK_USER_GROUP_TYPE?.[0].value}
                >
                  <Select
                    onChange={groupTypeChange}
                    disabled
                    placeholder={'Ch???n'}
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
                Vai tr?? <span className={'text-require'}>*</span>
              </Col>
              <Col span={6}>
                <Form.Item
                  name={'role'}
                  rules={[
                    {
                      required: true,
                      message: 'Tr?????ng vai tr?? kh??ng ???????c ph??p ????? tr???ng!',
                    },
                  ]}
                >
                  <Select onChange={roleChange} placeholder={'Ch???n'}>
                    {BANK_ROLE_LIST.map((role) => (
                      <Select.Option value={role.value}>
                        {role.name}
                      </Select.Option>
                    ))}
                    placeholder={'Ch???n'}
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span={6}>
                Tr???ng th??i <span className={'text-require'}>*</span>
              </Col>
              <Col span={6}>
                <Form.Item
                  // rules={[
                  //   {
                  //     required: true,
                  //     message: 'Tr?????ng tr???ng th??i kh??ng ???????c ph??p ????? tr???ng!',
                  //   },
                  // ]}
                  name={'status'}
                >
                  <Select defaultValue={1} onChange={statusChange}>
                    <Select.Option value={1}>Ho???t ?????ng</Select.Option>
                    <Select.Option value={0}>Ng???ng ho???t ?????ng</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span={6}>M?? t??? </Col>
              <Col span={16}>
                <Form.Item
                  name={'description'}
                  rules={[
                    {
                      max: 255,
                      message:
                        'Tr?????ng m?? t??? kh??ng ???????c ph??p v?????t qu?? 255 k?? t???!',
                    },
                  ]}
                >
                  <TextArea
                    onChange={desciptionChange}
                    placeholder={'Nh???p m?? t???'}
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
