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
  Divider,
} from 'antd';
import { KTTitle } from 'core/ui';
import '../../../../common/less/BM010301.less';
import { BM010301Domain } from '../../domains/BM010301ViewDomain';
import {
  BANK_ROLE_LIST,
  BANK_BRANCH_LEVEL,
  BANK_USER_GROUP_TYPE,
} from '../../../../../../../../core/common/Constant';
import log from '../../ModuleLogger';
const { TextArea } = Input;

var axios = require('axios');
const { Link } = Typography;
const CheckboxGroup = Checkbox.Group;

const branches = [{ label: '1000-Hội sở chính', value: '1000-Hội sở chính' }];

const departments = [{ label: 'P01-Phòng L/C', value: 'P01-Phòng L/C' }];

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

    form.setFieldsValue({
      groupType: BANK_USER_GROUP_TYPE?.[0].value,
      branchLevel: BANK_BRANCH_LEVEL?.[0].value,
    });
  }, []);

  useEffect(() => {
    setChannelOptions(context?.channelOptions);
    setCheckAll(context?.checkAll);
    setRequireChannel(context?.requireChannel);
    setIndeterminate(context?.indeterminate);
    log.debug('useEffect--', context);
    console.log('useEffect--', context);
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
                <Form.Item>
                  Mã nhóm người dùng <span className={'text-require'}> </span>
                </Form.Item>
              </Col>
              <Col span={16}>
                <Form.Item name={'userGroupCode'}>
                  {context?.bankUserGroup?.userGroupCode}
                </Form.Item>
              </Col>
              <Divider className="divider-view" />
            </Row>

            <Row>
              <Col span={6}>
                <Form.Item>
                  Tên nhóm người dùng <span className={'text-require'}> </span>
                </Form.Item>
              </Col>
              <Col span={16}>
                <Form.Item name={'userGroupName'}>
                  {context?.bankUserGroup?.userGroupName}
                </Form.Item>
              </Col>
              <Divider className="divider-view" />
            </Row>

            <Row>
              <Col span={6}>
                <Form.Item>
                  Ngân hàng <span className={'text-require'}> </span>
                </Form.Item>
              </Col>
              <Col span={16}>
                <Form.Item name={'bankId'}>
                  {context?.bankUserGroup?.bankId}
                </Form.Item>
              </Col>
              <Divider className="divider-view" />
            </Row>

            <Row>
              <Col span={6}>
                <Form.Item>
                  Cấp chi nhánh <span className={'text-require'}> </span>
                </Form.Item>
              </Col>
              <Col span={16}>
                <Form.Item name={'branchLevel'}>
                  {context?.bankUserGroup?.branchLevel}
                </Form.Item>
              </Col>
              <Divider className="divider-view" />
            </Row>

            <Row>
              <Col span={6}>
                <Form.Item>
                  Kênh <span className={'text-require'}> </span>
                </Form.Item>
              </Col><Col span={18}>
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
              <Divider className="divider-view" />
            </Row>

            <Row>
              <Col span={6}>
                <Form.Item>
                  Loại nhóm <span className={'text-require'}> </span>
                </Form.Item>
              </Col>
              <Col span={16}>
                <Form.Item name={'groupType'}>
                  {context?.bankUserGroup?.groupType}
                </Form.Item>
              </Col>
              <Divider className="divider-view" />
            </Row>

            <Row>
              <Col span={6}>
                <Form.Item>
                  Vai trò <span className={'text-require'}> </span>
                </Form.Item>
              </Col>
              <Col span={16}>
                <Form.Item name={'role'}>
                  {context?.bankUserGroup?.role}
                </Form.Item>
              </Col>
              <Divider className="divider-view" />
            </Row>

            <Row>
              <Col span={6}>
                <Form.Item>
                  Trạng thái <span className={'text-require'}> </span>
                </Form.Item>
              </Col>
              <Col span={16}>
                <Form.Item name={'status'}>
                  {context?.bankUserGroup?.status}
                </Form.Item>
              </Col>
              <Divider className="divider-view" />
            </Row>

            <Row>
              <Col span={6}>
                <Form.Item>
                  Mô tả <span className={'text-require'}> </span>
                </Form.Item>
              </Col>
              <Col span={16}>
                <Form.Item name={'description'}>
                  {context?.bankUserGroup?.description}
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
