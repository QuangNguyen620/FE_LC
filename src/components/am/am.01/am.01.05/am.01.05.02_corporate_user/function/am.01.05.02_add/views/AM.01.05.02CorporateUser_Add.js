import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Col,
  Row,
  Input,
  Button,
  Form,
  Space,
  Divider,
  Select,
  Modal,
  Table,
  Radio,
} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import '../../../common/less/AM.01.05.02.less';
import '../../../../../../../../assets/less/LC-common.less';
import { useA00Domain } from '../domains/AM.01.05.02Domain';
import { useHistory } from 'react-router';
import AddSuccessModal from '../../../common/modal/add/AddSuccessModal';
import AddFailModal from '../../../common/modal/add/AddFailModal';
import AddFailModalConflict from '../../../common/modal/add/AddFailModalConflict';
import { KTTitle } from 'core/ui';
var axios = require('axios');

const AM010502CorporateUserAddView = ({ lang = 'vi', ...props }) => {
  const { t } = useTranslation();
  const history = useHistory();
  const [, am010502Domain] = useA00Domain();
  const exceptThisSymbols = ['e', 'E', '+', '-', '.'];

  const [modalVisible, setModalVisible] = useState(false);
  const [modalAddFailVisible, setModalAddFailVisible] = useState(false);
  const [modalAddConflictVisible, setModalAddConflictVisible] = useState(false);

  const [searchCorporateModalVisible, setCorporateVisible] = useState(false);
  const [searchCorporateGroupModalVisible, setCorporateGroupVisible] =
    useState(false);

  const [corporateList, setCorporeateList] = useState([]); //cho option
  const [corporateName, setCorporeateName] = useState('');
  const [corporateGroupList, setCorporateGroupList] = useState([]);
  const [roleGroup, setRoleGroup] = useState('');
  const [listCorporate, setListCorporate] = useState([]); // cho table
  const [listCorporateGroup, setListCorporateGroup] = useState([]); // cho table
  const [form] = Form.useForm();
  const dataSource = useRef();
  const dataSourceGroup = useRef();
  //------------------------------//
  useEffect(() => {
    function fetchCorporate() {
      var url = process.env.REACT_APP_API_BACKEND + '/corporate/getAll';
      var config = {
        method: 'get',
        url: url,
        headers: {
          Authorization:
            'Bearer ' + sessionStorage.getItem('access_token') + '',
        },
      };
      // console.log(config);
      axios(config)
        .then(function (response) {
          var array = response.data.data;
          var tempCorporateList = [];
          array.forEach((element) => {
            var tempCorporate = {};
            tempCorporate.value = element.corporateId;
            tempCorporate.label = element.corporateCode;
            tempCorporate.name = element.corporateName;
            tempCorporateList.push(tempCorporate);
          });
          setCorporeateList(tempCorporateList);
          // console.log("List", tempCorporateList);
          setListCorporate(array);
          dataSource.current = array;
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    fetchCorporate();

    return () => {};
  }, []);

  useEffect(() => {
    function fetchCorporateGroup() {
      var url =
        process.env.REACT_APP_API_BACKEND + '/corporate/group/co/getUserGroups';
      var config = {
        method: 'get',
        url: url,
        headers: {
          Authorization:
            'Bearer ' + sessionStorage.getItem('access_token') + '',
        },
      };
      // console.log(config);
      axios(config)
        .then(function (response) {
          console.log('corporateGroup', response);
          var array = response.data.data;

          var tempCorporateGroupList = [];
          array.forEach((element) => {
            var tempCorporateGroup = {};
            tempCorporateGroup.value = element.id;
            tempCorporateGroup.label = element.userGroupCode;
            tempCorporateGroup.role = element.role;
            tempCorporateGroupList.push(tempCorporateGroup);
          });
          setCorporateGroupList(tempCorporateGroupList);
          // console.log("List", tempCorporateList);
          setListCorporateGroup(array);
          dataSourceGroup.current = array;
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    fetchCorporateGroup();

    return () => {};
  }, []);

  //-----update----------------//

  const [userInput, setUserInput] = useState({
    corporateId: '',
    userCode: '',
    userName: '',
    listUserGroupCode: [],
    userGroupCode: '',
    userStatus: '1',
    phoneNumber: '',
    email: '',
    channelInit: 'FPT',
  });
  //------------Set user input ------------//
  const onCorporateCodeChange = (value) => {
    var id = value + '';
    setUserInput({
      ...userInput,
      corporateId: id,
    });
    corporateList.forEach((corporate) => {
      if (corporate.value == value) {
        form.setFieldsValue({
          corporateName: corporate.name,
        });
        // setCorporeateName(corporate.name);
      }
    });
    console.log(corporateName);
  };

  const onUserCodeChange = (e) => {
    setUserInput({
      ...userInput,
      userCode: e.target.value,
    });
  };

  const onUserNameChange = (e) => {
    setUserInput({
      ...userInput,
      userName: e.target.value,
    });
  };

  const onUserGroupCodeChange = (value) => {
    let listGroup = [];
    let GroupCode = '';
    corporateGroupList.forEach((group) => {
      if (group.value == value) {
        listGroup.push(group.label);
        GroupCode = group.label;
        // setRoleGroup(group.role);
        form.setFieldsValue({
          roleGroup: group.role,
        });
      }
    });
    setUserInput({
      ...userInput,
      // listUserGroupCode: listGroup
      userGroupCode: GroupCode,
    });
  };

  const onPhoneNumberChange = (e) => {
    setUserInput({
      ...userInput,
      phoneNumber: e.target.value,
    });
  };

  const onEmailChange = (e) => {
    setUserInput({
      ...userInput,
      email: e.target.value,
    });
    // console.log('userInfo:::', userInput);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  // Add new user group--------------
  const submitHandler = () => {
    var data = [
      {
        userCode: userInput.userCode.trim(),
        userName: userInput.userName.trim(),
        listUserGroupCode: userInput.listUserGroupCode,
        userGroupCode: userInput.userGroupCode,
        phoneNumber: userInput.phoneNumber,
        email: userInput.email,
        userStatus: 1,
        channelInit: userInput.channelInit,
      },
    ];

    var corporateId = userInput.corporateId;
    console.log('Received values of form: ', data, ' //', corporateId);

    var configPromise = am010502Domain.addNewUser(data, corporateId);
    configPromise
      .then((result) => {
        axios(result)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
            setModalVisible(true);
          })
          .catch(function (error) {
            console.log(error);
            if (error.response.data.code == 409) {
              setModalAddConflictVisible(true);
            } else {
              setModalAddFailVisible(true);
            }
          });
      })
      .catch((err) => console.log(err));
  };

  function closeModal(data) {
    console.log(data);
    setModalVisible(false);
    history.push('/home/corporate-user');
  }

  function closeModalFail(data) {
    console.log(data);
    setModalAddFailVisible(false);
    // history.push('/home/corporate-user/add');
  }
  function closeModalConflict(data) {
    console.log(data);
    setModalAddConflictVisible(false);
  }

  const columnCorporate = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
      render: (text, record, index) => (
        <Space>
          <p>{index + 1}</p>
        </Space>
      ),
    },
    {
      title: 'Mã doanh nghiệp',
      dataIndex: 'corporateCode',
      key: 'corporateCode',
    },
    {
      title: 'Tên doanh nghiệp',
      dataIndex: 'corporateName',
      key: 'corporateName',
    },
    {
      title: 'Chọn',
      dataIndex: 'activity',
      width: 130,
      key: 'x',

      render: (text, record) => (
        <Radio
          value={text}
          onClick={(e) => {
            // console.log("Record's key is :", record);
            onClickCorporate(record);
          }}
        >
          {text}
        </Radio>
      ),
    },
  ];
  const columnCorporateGroup = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
      render: (text, record, index) => (
        <Space>
          <p>{index + 1}</p>
        </Space>
      ),
    },
    {
      title: 'Mã nhóm người dùng',
      dataIndex: 'userGroupCode',
      key: 'userGroupCode',
    },
    {
      title: 'Tên nhóm người dùng',
      dataIndex: 'userGroupName',
      key: 'userGroupName',
    },
    {
      title: 'Chọn',
      dataIndex: 'activity',
      width: 130,
      key: 'x',

      render: (text, record) => (
        <Radio
          value={text}
          onClick={(e) => {
            // console.log("Record's key is :", record);
            onClickCorporateGroup(record);
          }}
        >
          {text}
        </Radio>
      ),
    },
  ];

  function onClickCorporate(data) {
    console.log(data);
    form.setFieldsValue({
      corporateCode: data.corporateCode,
      corporateName: data.corporateName,
    });
    setCorporateVisible(false);
    setUserInput({
      ...userInput,
      corporateId: data.corporateId,
    });
  }
  function onClickCorporateGroup(data) {
    console.log(data);
    form.setFieldsValue({
      userGroupCode: data.userGroupCode,
      roleGroup: data.role,
    });
    setCorporateGroupVisible(false);
    setUserInput({
      ...userInput,
      userGroupCode: data.userGroupCode,
    });
  }

  const handleVisibleSearchCorporate = () => {
    if (searchCorporateModalVisible == true) {
      setCorporateVisible(false);
    } else {
      setCorporateVisible(true);
    }
  };
  const handleVisibleSearchCorporateGroup = () => {
    if (searchCorporateGroupModalVisible == true) {
      setCorporateGroupVisible(false);
    } else {
      setCorporateGroupVisible(true);
    }
  };

  const handleSearchData = () => {
    // console.log('search');
  };

  return (
    <>
      <AddFailModal
        isVisbled={modalAddFailVisible}
        onCloseModal={closeModalFail}
      />
      <AddFailModalConflict
        isVisbled={modalAddConflictVisible}
        onCloseModal={closeModalConflict}
      />
      <AddSuccessModal isVisbled={modalVisible} onCloseModal={closeModal} />
      <Modal
        title="Tìm kiếm khách hàng doanh nghiệp"
        centered
        width={720}
        visible={searchCorporateModalVisible}
        // onOk={handleVisibleChange}
        onCancel={handleVisibleSearchCorporate}
        footer={[
          <Button
            key="submit"
            className="common-btn"
            onClick={handleVisibleSearchCorporate}
          >
            Xác nhận
          </Button>,
        ]}
      >
        <Form layout="horizontal">
          <Row>
            <Col span={6}>Mã doanh nghiệp </Col>
            <Col span={12}>
              <Form.Item>
                <Input
                  onChange={(e) => {
                    const currValue = e.target.value;
                    const filteredData = dataSource.current.filter((entry) =>
                      entry.corporateCode
                        ?.toLowerCase()
                        .includes(currValue?.toLowerCase()),
                    );
                    setListCorporate(filteredData);
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={6}>Tên doanh nghiệp </Col>
            <Col span={12}>
              <Form.Item>
                <Input
                  onChange={(e) => {
                    const currValue = e.target.value;
                    const filteredData = dataSource.current.filter((entry) =>
                      entry.corporateName
                        ?.toLowerCase()
                        .includes(currValue?.toLowerCase()),
                    );
                    setListCorporate(filteredData);
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Space className={'padding-buton'}>
              <Button
                key="submit"
                className="common-btn"
                onClick={handleSearchData}
              >
                Tìm kiếm
              </Button>
              <Button
                key="back"
                className="secondary-btn"
                onClick={handleVisibleSearchCorporate}
              >
                Đóng
              </Button>
            </Space>
          </Form.Item>
          <Row className="padding-md">
            <Col span={24}>
              <Table
                columns={columnCorporate}
                dataSource={listCorporate}
                scroll={{ x: 300 }}
                pagination={{ pageSize: 4 }}
              />
            </Col>
          </Row>
        </Form>
      </Modal>
      <Modal
        title="Tìm kiếm nhóm người dùng doanh nghiệp"
        centered
        width={720}
        visible={searchCorporateGroupModalVisible}
        // onOk={handleVisibleChange}
        onCancel={handleVisibleSearchCorporateGroup}
        footer={[
          <Button
            key="submit"
            className="common-btn"
            onClick={handleVisibleSearchCorporateGroup}
          >
            Xác nhận
          </Button>,
        ]}
      >
        <Form layout="horizontal">
          <Row>
            <Col span={6}>Mã nhóm doanh nghiệp </Col>
            <Col span={12}>
              <Form.Item>
                <Input
                  onChange={(e) => {
                    const currValue = e.target.value;
                    const filteredData = dataSourceGroup.current.filter(
                      (entry) =>
                        entry.userGroupCode
                          ?.toLowerCase()
                          .includes(currValue?.toLowerCase()),
                    );
                    setListCorporateGroup(filteredData);
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={6}>Tên nhóm doanh nghiệp </Col>
            <Col span={12}>
              <Form.Item>
                <Input
                  onChange={(e) => {
                    const currValue = e.target.value;
                    const filteredData = dataSourceGroup.current.filter(
                      (entry) =>
                        entry.userGroupName
                          ?.toLowerCase()
                          .includes(currValue?.toLowerCase()),
                    );
                    setListCorporateGroup(filteredData);
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Space className={'padding-buton'}>
              <Button
                key="submit"
                className="common-btn"
                onClick={handleSearchData}
              >
                Tìm kiếm
              </Button>
              <Button
                key="back"
                className="secondary-btn"
                onClick={handleVisibleSearchCorporateGroup}
              >
                Đóng
              </Button>
            </Space>
          </Form.Item>
          <Row className="padding-md">
            <Col span={24}>
              <Table
                columns={columnCorporateGroup}
                dataSource={listCorporateGroup}
                scroll={{ x: 300 }}
                pagination={{ pageSize: 4 }}
              />
            </Col>
          </Row>
        </Form>
      </Modal>
      <div className={'main-container'}>
        <Row className={'padding-title'}>
          <Col span={15}>
            <KTTitle size={2}>
              <b>Quản lý người dùng doanh nghiệp</b>
            </KTTitle>
          </Col>
        </Row>
        <Row className={'padding-title-sub'}>
          <Col span={15}>
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
            >
              <Row>
                <Col span={23}>
                  <div id="form-body">
                    <Row>
                      <Col span={15}>
                        <KTTitle size={3} className={'font-weight-title'}>
                          Thông tin chi tiết khách hàng
                        </KTTitle>
                      </Col>
                    </Row>
                    <Divider />
                    <section className={'padding-section'}>
                      <Row>
                        <Col span={8}>
                          Mã doanh nghiệp{' '}
                          <span className={'text-require'}>*</span>
                        </Col>
                        <Col span={14}>
                          <Form.Item
                            name={'corporateCode'}
                            rules={[
                              {
                                required: true,
                                message:
                                  'Trường mã doanh nghiệp không được phép để trống!',
                              },
                            ]}
                          >
                            {/* <Input suffix={<SearchOutlined />} onChange={onCorporateCodeChange} /> */}
                            <Select
                              onChange={onCorporateCodeChange}
                              options={corporateList}
                            ></Select>
                          </Form.Item>
                        </Col>
                        <Col span={1}></Col>
                        <Col span={1}>
                          <Button
                            type="primary"
                            icon={<SearchOutlined />}
                            onClick={handleVisibleSearchCorporate}
                          ></Button>
                        </Col>
                      </Row>

                      <Row>
                        <Col span={8}>
                          Tên doanh nghiệp{' '}
                          <span className={'text-require'}></span>
                        </Col>
                        <Col span={16}>
                          <Form.Item name={'corporateName'}>
                            <Input disabled value={corporateName} />
                          </Form.Item>
                        </Col>
                      </Row>

                      <Row>
                        <Col span={8}>
                          Mã người dùng
                          <span className={'text-require'}></span>
                        </Col>
                        <Col span={16}>
                          <Form.Item
                            name={'userCode'}
                            // rules={[
                            //   {
                            //     required: true,
                            //     whitespace: true,
                            //     message:
                            //       'Trường mã người dùng không được phép để trống!',
                            //   },
                            //   {
                            //     max: 50,
                            //     message:
                            //       'Trường mã người dùng tối đa 50 ký tự!',
                            //   },
                            // ]}
                          >
                            <Input disabled onChange={onUserCodeChange} />
                          </Form.Item>
                        </Col>
                      </Row>
                    </section>
                    <Row>
                      <Col span={15}>
                        <KTTitle size={3} className={'font-weight-title'}>
                          Thông tin người dùng
                        </KTTitle>
                      </Col>
                    </Row>
                    <Divider />
                    <section className={'padding-section'}>
                      <Row>
                        <Col span={8}>
                          Tên hiển thị <span className={'text-require'}>*</span>
                        </Col>
                        <Col span={16}>
                          <Form.Item
                            name={'userName'}
                            rules={[
                              {
                                required: true,
                                whitespace: true,
                                message:
                                  'Trường tên hiển thị không được phép để trống!',
                              },
                              {
                                max: 50,
                                message: 'Trường tên hiển thị tối đa 50 ký tự!',
                              },
                            ]}
                          >
                            <Input onChange={onUserNameChange} />
                          </Form.Item>
                        </Col>
                      </Row>

                      <Row>
                        <Col span={8}>
                          Mã nhóm người dùng{' '}
                          <span className={'text-require'}>*</span>
                        </Col>
                        <Col span={14}>
                          <Form.Item
                            name={'userGroupCode'}
                            rules={[
                              {
                                required: true,
                                message:
                                  'Trường mã nhóm người dùng không được phép để trống!',
                              },
                            ]}
                          >
                            {/* <Input suffix={<SearchOutlined />} onChange={onUserGroupCodeChange}/> */}
                            <Select
                              onChange={onUserGroupCodeChange}
                              options={corporateGroupList}
                            ></Select>
                          </Form.Item>
                        </Col>
                        <Col span={1}></Col>
                        <Col span={1}>
                          <Button
                            type="primary"
                            icon={<SearchOutlined />}
                            onClick={handleVisibleSearchCorporateGroup}
                          ></Button>
                        </Col>
                      </Row>

                      <Row>
                        <Col span={8}>
                          Vai trò
                          <span className={'text-require'}></span>
                        </Col>
                        <Col span={16}>
                          <Form.Item name={'roleGroup'}>
                            <Input disabled value={roleGroup} />
                          </Form.Item>
                        </Col>
                      </Row>
                    </section>
                    <Row>
                      <Col span={15}>
                        <KTTitle size={3} className={'font-weight-title'}>
                          Thông tin liên hệ
                        </KTTitle>
                      </Col>
                    </Row>
                    <Divider />
                    <section className={'padding-section'}>
                      <Row>
                        <Col span={8}>
                          Số điện thoại di động
                          <span className={'text-require'}>*</span>
                        </Col>
                        <Col span={16}>
                          <Form.Item
                            name={'phoneNumber'}
                            rules={[
                              {
                                whitespace: true,
                                required: true,
                                message:
                                  'Trường số điện thoại di động không được phép để trống!',
                              },
                              {
                                max: 20,
                                message:
                                  'Trường số điện thoại di động tối đa 20 ký tự!',
                              },
                            ]}
                          >
                            <Input
                              type={'number'}
                              onKeyDown={(e) =>
                                exceptThisSymbols.includes(e.key) &&
                                e.preventDefault()
                              }
                              onChange={onPhoneNumberChange}
                            />
                          </Form.Item>
                        </Col>
                      </Row>

                      <Row>
                        <Col span={8}>
                          Địa chỉ email{' '}
                          <span className={'text-require'}>*</span>
                        </Col>
                        <Col span={16}>
                          <Form.Item
                            name={'email'}
                            rules={[
                              {
                                required: true,
                                whitespace: true,
                                message:
                                  'Trường email không được phép để trống!',
                              },
                              {
                                max: 50,
                                message: 'Trường Email tối đa 50 ký tự!',
                              },
                              // {
                              //   type: 'email',
                              //   message: 'Email không chính xác!',
                              // },
                              {
                                pattern:
                                  /^[A-Za-z0-9_.]{2,32}@([a-zA-Z0-9]{2,12})(.[a-zA-Z]{2,12})+$/y,
                                // pattern:
                                //   /^([a-z A-Z 0-9\.]*@[a-z A-Z 0-9]*\.[a-z A-Z\.]*)/y,
                                message: 'Email không chính xác!',
                              },
                            ]}
                          >
                            <Input onChange={onEmailChange} />
                          </Form.Item>
                        </Col>
                      </Row>
                    </section>
                  </div>

                  <div id="form-footer">
                    <Form.Item>
                      <Space className={'padding-buton'}>
                        <Button className="common-btn" htmlType="submit">
                          Xác nhận
                        </Button>
                        <Button
                          onClick={am010502Domain.exitHandler}
                          className="secondary-btn"
                        >
                          Đóng
                        </Button>
                      </Space>
                    </Form.Item>
                  </div>
                </Col>
                <Col span={1}></Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default AM010502CorporateUserAddView;
