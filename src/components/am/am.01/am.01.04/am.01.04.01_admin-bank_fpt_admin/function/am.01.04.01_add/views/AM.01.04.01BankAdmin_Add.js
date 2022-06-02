import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';
import {
  Col,
  Row,
  Form,
  Select,
  Input,
  Radio,
  Checkbox,
  Button,
  Space,
  Modal,
} from 'antd';
import { KTTitle } from 'core/ui';
import '../../../common/less/AM.01.04.01.less';
import '../../../../../../../../assets/less/LC-common.less';
import CreateSuccessfullModal from '../../../common/modal/add/CreateSuccessfullModal';
import GroupExistedModal from '../../../common/modal/error/GroupExistedModal';
import { useAM010401Domain } from '../domains/AM.01.04.01Domain';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import moment from 'moment';
var axios = require('axios');

const { Option } = Select;

const CheckboxGroup = Checkbox.Group;

const defaultCheckedList = [];

const bankRolelOptions = [
  { label: 'Maker', value: 'Maker' },
  { label: 'Approver', value: 'Approver' },
];
const fptRoleOptions = [{ label: 'Quản trị hệ thống', value: 'System' }];

const fptSiteBranchLevel = [{ label: 'Hội sở chính', value: 'HO' }];

const bankSiteBranchLevel = [{ label: 'Hội sở chính', value: 'HO' }];

const fptGroupType = [{ label: 'Quản trị hệ thống', value: 'sys-admin' }];
const bankGroupType = [{ label: 'Admin ngân hàng', value: 'bank-admin' }];

toast.configure();

const AM010103ForgetPassView = ({ lang = 'vi', ...props }) => {
  const { t } = useTranslation();
  const [context, domain] = useAM010401Domain();
  const history = useHistory();
  const notify = (message) => toast.success(message);
  const [show, setShow] = useState(false);
  const [showExistedGroup, setShowExistedGroup] = useState(false);
  const [form] = Form.useForm();
  //Value state
  const [userInput, setInput] = useState({
    user_group_code: '',
    user_group_name: '',
    user_type: '',
    group_type: '',
    branch_level: '',
    role: '',
    status: 1,
    description: '',
  });

  const [checkedList, setCheckedList] = React.useState(defaultCheckedList);
  const [indeterminate, setIndeterminate] = React.useState(false);
  const [checkAll, setCheckAll] = React.useState(false);

  //set value  cho trường chọn
  const [site, setSite] = useState('BANK');
  const [roleOptions, setRoleOption] = useState([]);
  const [branchOptions, setBranchOptions] = useState(bankSiteBranchLevel);
  const [groupTypeOptions, setGroupTypeOption] = useState(bankGroupType);
  const [plainOptions, setPlainOptions] = useState([
    { label: 'AIN', value: 'AIN', checked: true },
  ]);
  const [requireChannel, setRequireChannel] = useState(false);

  useEffect(() => {
    domain.initDomain();
  }, []);

  useEffect(() => {
    console.log('context----', context);
    setPlainOptions(context?.plainOptions);
    setCheckAll(context?.checkAll);
    setRequireChannel(context?.requireChannel);
  }, [context]);

  const onSiteChange = (e) => {
    setSite(e.target.value);
    form.setFieldsValue({ role: '', group_type: '' });

    if (e.target.value == 'BANK') {
      setBranchOptions(bankSiteBranchLevel);
      setRoleOption(bankRolelOptions);
      setGroupTypeOption(bankGroupType);
    } else {
      setBranchOptions(fptSiteBranchLevel);
      setRoleOption(fptRoleOptions);
      setGroupTypeOption(fptGroupType);
    }
  };

  useEffect(() => {
    setSite('BANK');
    setBranchOptions(bankSiteBranchLevel);
    setRoleOption(bankRolelOptions);
    setGroupTypeOption(bankGroupType);
  }, []);

  //input value change
  const userGroupCodeChange = (event) => {
    var userGroupCode = event.target.value;
    if (userGroupCode.trim() != '' || userGroupCode.trim() != null) {
      setInput({
        ...userInput,
        user_group_code: userGroupCode.trim(),
      });
    }
  };

  const userGroupNameChange = (event) => {
    var userGroupName = event.target.value;
    if (userGroupName.trim() != '' || userGroupName.trim() != null) {
      setInput({
        ...userInput,
        user_group_name: userGroupName.trim(),
      });
    }
  };

  const branchLevelChange = (value) => {
    setInput({
      ...userInput,
      branch_level: value,
    });
  };

  const roleChange = (value) => {
    setInput({
      ...userInput,
      role: value,
    });
  };

  const groupTypeChange = (value) => {
    setInput({
      ...userInput,
      group_type: value,
    });
  };

  const statusChange = (value) => {
    setInput({
      ...userInput,
      status: value,
    });
  };
  const desciptionChange = (event) => {
    setInput({
      ...userInput,
      description: event.target.value,
    });
  };

  //-----Channel checkbox----------//
  const onChange = (e) => {
    form.validateFields(["channel"]);
    var checked = e?.target?.checked;
    var value = e?.target?.value;
    var count = 0;
    var plainOptionNew = plainOptions;
    plainOptions.forEach((channel, index) => {
      var tempChannel = channel;
      if (value == channel.value) {
        tempChannel.checked = checked;
      }
      plainOptionNew[index] = tempChannel;
    });
    domain.setPlainOptions(plainOptionNew);
    console.log(plainOptionNew);
    // setCheckedList(list);
    // setIndeterminate(!!list.length && list.length < plainOptions.length);
    // setCheckAll(list.length === plainOptions.length);
  };

  const onCheckAllChange = (e) => {
    var plainOptionNew = [];
    form.validateFields(["channel"]);
    plainOptions.forEach((channel) => {
      var tempChannel = channel;
      tempChannel.checked = e.target.checked;
      plainOptionNew.push(tempChannel);
    });
    domain.setCheckAll(e.target.checked);

    setPlainOptions(plainOptionNew);
    setCheckedList(e.target.checked ? plainOptions : []);
    setIndeterminate(false);
  };
  //------------------------------//

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  // Add new user group--------------
  const submitHandler = () => {
    var channelString = '';

    plainOptions.forEach((channel) => {
      if (channel.checked) {
        channelString += channel.value + ',';
      }
    });
    if (channelString.length > 0) {
      channelString = channelString.slice(0, -1);
    }

    var data = {
      branchLevel: site == 'BANK' ? userInput.branch_level : '',
      channels: channelString,
      createdBy: 'fptadmin',
      createdDate: new Date(),
      description: userInput.description.trim(),
      groupType: userInput.group_type,
      lastModifiedBy: '',
      lastModifiedDate: '',
      role: userInput.role,
      status: userInput.status,
      userGroupCode: userInput.user_group_code.trim(),
      userGroupName: userInput.user_group_name.trim(),
      userType: site,
    };

    console.log('Received values of form: ', data);

    var configPromise = domain.addNewUserGroup(data);
    configPromise
      .then((result) => {
        axios(result)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
            setShow(true);
          })
          .catch(function (error) {
            console.log(error.response.data);
            if (error.response.data.data == 'Create UserGroup already exist') {
              console.log('Trùng mã nhóm người dùng');
              setShowExistedGroup(true);
            }
          });
      })
      .catch((err) => console.log('hieutt---' + err));
  };
  //-------------------------------------//

  function closeCreateSuccessfullModal() {
    setShow(false);
    history.push('/home/bank-fpt-admin-manage');
  }

  function closeExistedGroupModal() {
    setShowExistedGroup(false);
  }

  return (
    <>
      <CreateSuccessfullModal
        isVisbled={show}
        onCloseModal={closeCreateSuccessfullModal}
        onClose={closeCreateSuccessfullModal}
      />

      <GroupExistedModal
        isVisbled={showExistedGroup}
        onCloseModal={closeExistedGroupModal}
        onClose={closeExistedGroupModal}
      />
      <div className={'main-container'}>
        <Row className={'padding-title'}>
          <Col span={24}>
            <KTTitle size={3}>
              <b>Quản lý nhóm người dùng Admin ngân hàng & FPT quản trị</b>
            </KTTitle>
          </Col>
        </Row>
        <Row className={'padding-title-sub'}>
          <Col span={24}>
            <KTTitle size={4}>Thêm mới</KTTitle>
          </Col>
        </Row>
        <Row className={'padding-md'}>
          <Col span={24}>
            <Form
              form={form}
              onFinish={submitHandler}
              onFinishFailed={onFinishFailed}
              layout="horizontal"
              scrollToFirstError
            >
              <Row>
                <Col span={8}>Loại người dùng</Col>
                <Col span={16}>
                  <Form.Item name={'site_choosing'}>
                    <Radio.Group
                      className={'width-radio'}
                      onChange={onSiteChange}
                      value={site}
                      defaultValue={'BANK'}
                    >
                      <Row>
                        <Col span={12}>
                          <Radio value={'BANK'}>Admin ngân hàng</Radio>
                        </Col>
                        <Col span={12}>
                          <Radio value={'FPT'}>FPT quản trị</Radio>
                        </Col>
                      </Row>
                    </Radio.Group>
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col span={8}>
                  Mã nhóm người dùng <span className={'text-require'}>*</span>
                </Col>
                <Col span={16}>
                  <Form.Item
                    name={'user_group_code'}
                    rules={[
                      {
                        required: true,
                        message: 'Trường loại nhóm không được phép để trống!',
                      },
                      {
                        max: 20,
                        message:
                          'Trường mã nhóm người dùng không được phép vượt quá 20 kí tự!',
                      },
                      {
                        whitespace: true,
                        message:
                          'Trường mã nhóm người dùng không được phép để trống!',
                      },
                    ]}
                  >
                    <Input onChange={userGroupCodeChange} />
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col span={8}>
                  Tên nhóm người dùng <span className={'text-require'}>*</span>
                </Col>
                <Col span={16}>
                  <Form.Item
                    name={'user_group_name'}
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
                    <Input onChange={userGroupNameChange} />
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col span={8}>
                  Loại nhóm <span className={'text-require'}>*</span>
                </Col>
                <Col span={16}>
                  <Form.Item
                    name={'group_type'}
                    rules={[
                      {
                        required: true,
                        message:
                          'Trường loại nhóm dùng không được phép để trống!',
                      },
                    ]}
                  >
                    <Select defaultValue={''} onChange={groupTypeChange}>
                      {groupTypeOptions.map((groupType) => (
                        <Select.Option value={groupType.value}>
                          {groupType.label}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col span={8}>
                  Kênh <span className={'text-require'}>*</span>
                </Col>
                <Col span={16}>
                  <Form.Item
                    name={'channel'}
                    rules={[
                      {
                        required: requireChannel,
                        message: 'Trường kênh không được phép để trống!',
                      },
                    ]}
                  >
                    <Checkbox
                      indeterminate={indeterminate}
                      onChange={onCheckAllChange}
                      checked={checkAll}
                    >
                      Tất cả
                    </Checkbox>
                    {plainOptions?.map((channel) => (
                      <Col span={24}>
                        <Checkbox
                          value={channel?.value}
                          onChange={onChange}
                          checked={channel?.checked}
                        >
                          {channel?.label}
                        </Checkbox>
                      </Col>
                    ))}

                    {/* <CheckboxGroup
                      className={'display-grid'}
                      options={plainOptions}
                      value={checkedList}
                      onChange={onChange}
                    /> */}
                  </Form.Item>
                </Col>
              </Row>

              <Row
                style={{
                  display: site == 'BANK' || site == '' ? 'flex' : 'none',
                }}
              >
                <Col span={8}>
                  Cấp chi nhánh <span className={'text-require'}>*</span>
                </Col>
                <Col span={16}>
                  <Form.Item
                    name={'branch_level'}
                    rules={[
                      {
                        required: site == 'BANK' || site == '' ? true : false,
                        message:
                          'Trường cấp chi nhánh không được phép để trống!',
                      },
                    ]}
                  >
                    <Select
                      onChange={branchLevelChange}
                      value={userInput.branch_level}
                    >
                      {branchOptions.map((branch) => (
                        <Select.Option value={branch.value}>
                          {branch.label}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col span={8}>
                  Vai trò <span className={'text-require'}>*</span>
                </Col>
                <Col span={16}>
                  <Form.Item
                    name={'role'}
                    rules={[
                      {
                        required: true,
                        message: 'Trường vai trò không được phép để trống!',
                      },
                    ]}
                  >
                    <Select value={null} onChange={roleChange}>
                      {roleOptions.map((role) => (
                        <Select.Option value={role.value}>
                          {role.label}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col span={8}>
                  Trạng thái <span className={'text-require'}>*</span>
                </Col>
                <Col span={16}>
                  <Form.Item name={'status'}>
                    <Select onChange={statusChange} defaultValue="1">
                      <Select.Option value="1">Hoạt động</Select.Option>
                      <Select.Option value="0">Ngừng hoạt động</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col span={8}>Mô tả </Col>
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
                    <Input onChange={desciptionChange} />
                  </Form.Item>
                </Col>
              </Row>

              <div id="form-footer">
                <Form.Item>
                  <Space className={'padding-buton'}>
                    <Button className="common-btn" htmlType="submit">
                      Xác nhận
                    </Button>
                    <Button
                      onClick={domain.exitHandler}
                      className="secondary-btn"
                    >
                      Đóng
                    </Button>
                  </Space>
                </Form.Item>
              </div>

              <Col span={2}></Col>
            </Form>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default AM010103ForgetPassView;
