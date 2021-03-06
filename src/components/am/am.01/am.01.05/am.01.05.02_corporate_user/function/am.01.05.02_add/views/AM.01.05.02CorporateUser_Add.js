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
      title: 'M?? doanh nghi???p',
      dataIndex: 'corporateCode',
      key: 'corporateCode',
    },
    {
      title: 'T??n doanh nghi???p',
      dataIndex: 'corporateName',
      key: 'corporateName',
    },
    {
      title: 'Ch???n',
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
      title: 'M?? nh??m ng?????i d??ng',
      dataIndex: 'userGroupCode',
      key: 'userGroupCode',
    },
    {
      title: 'T??n nh??m ng?????i d??ng',
      dataIndex: 'userGroupName',
      key: 'userGroupName',
    },
    {
      title: 'Ch???n',
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
        title="T??m ki???m kh??ch h??ng doanh nghi???p"
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
            X??c nh???n
          </Button>,
        ]}
      >
        <Form layout="horizontal">
          <Row>
            <Col span={6}>M?? doanh nghi???p </Col>
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
            <Col span={6}>T??n doanh nghi???p </Col>
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
                T??m ki???m
              </Button>
              <Button
                key="back"
                className="secondary-btn"
                onClick={handleVisibleSearchCorporate}
              >
                ????ng
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
        title="T??m ki???m nh??m ng?????i d??ng doanh nghi???p"
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
            X??c nh???n
          </Button>,
        ]}
      >
        <Form layout="horizontal">
          <Row>
            <Col span={6}>M?? nh??m doanh nghi???p </Col>
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
            <Col span={6}>T??n nh??m doanh nghi???p </Col>
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
                T??m ki???m
              </Button>
              <Button
                key="back"
                className="secondary-btn"
                onClick={handleVisibleSearchCorporateGroup}
              >
                ????ng
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
              <b>Qu???n l?? ng?????i d??ng doanh nghi???p</b>
            </KTTitle>
          </Col>
        </Row>
        <Row className={'padding-title-sub'}>
          <Col span={15}>
            <KTTitle size={4}>Th??m m???i</KTTitle>
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
                          Th??ng tin chi ti???t kh??ch h??ng
                        </KTTitle>
                      </Col>
                    </Row>
                    <Divider />
                    <section className={'padding-section'}>
                      <Row>
                        <Col span={8}>
                          M?? doanh nghi???p{' '}
                          <span className={'text-require'}>*</span>
                        </Col>
                        <Col span={14}>
                          <Form.Item
                            name={'corporateCode'}
                            rules={[
                              {
                                required: true,
                                message:
                                  'Tr?????ng m?? doanh nghi???p kh??ng ???????c ph??p ????? tr???ng!',
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
                          T??n doanh nghi???p{' '}
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
                          M?? ng?????i d??ng
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
                            //       'Tr?????ng m?? ng?????i d??ng kh??ng ???????c ph??p ????? tr???ng!',
                            //   },
                            //   {
                            //     max: 50,
                            //     message:
                            //       'Tr?????ng m?? ng?????i d??ng t???i ??a 50 k?? t???!',
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
                          Th??ng tin ng?????i d??ng
                        </KTTitle>
                      </Col>
                    </Row>
                    <Divider />
                    <section className={'padding-section'}>
                      <Row>
                        <Col span={8}>
                          T??n hi???n th??? <span className={'text-require'}>*</span>
                        </Col>
                        <Col span={16}>
                          <Form.Item
                            name={'userName'}
                            rules={[
                              {
                                required: true,
                                whitespace: true,
                                message:
                                  'Tr?????ng t??n hi???n th??? kh??ng ???????c ph??p ????? tr???ng!',
                              },
                              {
                                max: 50,
                                message: 'Tr?????ng t??n hi???n th??? t???i ??a 50 k?? t???!',
                              },
                            ]}
                          >
                            <Input onChange={onUserNameChange} />
                          </Form.Item>
                        </Col>
                      </Row>

                      <Row>
                        <Col span={8}>
                          M?? nh??m ng?????i d??ng{' '}
                          <span className={'text-require'}>*</span>
                        </Col>
                        <Col span={14}>
                          <Form.Item
                            name={'userGroupCode'}
                            rules={[
                              {
                                required: true,
                                message:
                                  'Tr?????ng m?? nh??m ng?????i d??ng kh??ng ???????c ph??p ????? tr???ng!',
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
                          Vai tr??
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
                          Th??ng tin li??n h???
                        </KTTitle>
                      </Col>
                    </Row>
                    <Divider />
                    <section className={'padding-section'}>
                      <Row>
                        <Col span={8}>
                          S??? ??i???n tho???i di ?????ng
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
                                  'Tr?????ng s??? ??i???n tho???i di ?????ng kh??ng ???????c ph??p ????? tr???ng!',
                              },
                              {
                                max: 20,
                                message:
                                  'Tr?????ng s??? ??i???n tho???i di ?????ng t???i ??a 20 k?? t???!',
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
                          ?????a ch??? email{' '}
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
                                  'Tr?????ng email kh??ng ???????c ph??p ????? tr???ng!',
                              },
                              {
                                max: 50,
                                message: 'Tr?????ng Email t???i ??a 50 k?? t???!',
                              },
                              // {
                              //   type: 'email',
                              //   message: 'Email kh??ng ch??nh x??c!',
                              // },
                              {
                                pattern:
                                  /^[A-Za-z0-9_.]{2,32}@([a-zA-Z0-9]{2,12})(.[a-zA-Z]{2,12})+$/y,
                                // pattern:
                                //   /^([a-z A-Z 0-9\.]*@[a-z A-Z 0-9]*\.[a-z A-Z\.]*)/y,
                                message: 'Email kh??ng ch??nh x??c!',
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
                          X??c nh???n
                        </Button>
                        <Button
                          onClick={am010502Domain.exitHandler}
                          className="secondary-btn"
                        >
                          ????ng
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
