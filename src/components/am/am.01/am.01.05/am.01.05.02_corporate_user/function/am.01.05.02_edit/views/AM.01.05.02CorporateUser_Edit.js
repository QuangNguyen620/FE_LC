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
import { useParams } from 'react-router-dom';

import { SearchOutlined } from '@ant-design/icons';
import '../../../common/less/AM.01.05.02.less';
import '../../../../../../../../assets/less/LC-common.less';
import { useA00Domain } from '../domains/AM.01.05.02Domain';
import { useHistory } from 'react-router';
import UpdateSuccessModal from '../../../common/modal/edit/updateSuccessModal';
import { KTTitle } from 'core/ui';
var axios = require('axios');

const AM010502CorporateUserAddView = ({ lang = 'vi', ...props }) => {
  const { t } = useTranslation();
  const { id } = useParams();
  const history = useHistory();
  const [, am010502Domain] = useA00Domain();
  const [form] = Form.useForm();
  const dateFormatList = 'DD/MM/YYYY';
  const exceptThisSymbols = ['e', 'E', '+', '-', '.'];

  const [modalVisible, setModalVisible] = useState(false);
  const [successModalVisible, setDialogVisible] = useState(false);

  const [corporateList, setCorporeateList] = useState([]);
  const [corporateName, setCorporeateName] = useState('');
  const [userCode, setUserCode] = useState('');
  const [groupList, setCorporateGroupList] = useState([]);
  const [roleGroup, setRoleGroup] = useState('');
  const [searchCorporateGroupModalVisible, setCorporateGroupVisible] =
    useState(false);
  const [listCorporateGroup, setListCorporateGroup] = useState([]); // cho table
  const dataSourceGroup = useRef();
  //------------------------------//
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

  //-----update----------------//

  var userGroupList = [];
  var corporateIdEdit = '';
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
          // console.log(response);
          var array = response.data.data;
          console.log('List User', array);
          var tempCorporateGroupList = [];
          array.forEach((element) => {
            var tempCorporateGroup = {};
            tempCorporateGroup.value = element.id;
            tempCorporateGroup.label = element.userGroupCode;
            tempCorporateGroup.role = element.role;
            tempCorporateGroupList.push(tempCorporateGroup);
          });
          userGroupList = tempCorporateGroupList;
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

  useEffect(() => {
    var data = '';

    var config = {
      method: 'get',
      url: process.env.REACT_APP_API_BACKEND + '/corporate/user/get/' + id + '',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('access_token') + '',
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(response);
        var user = response.data.data;
        setUserInput(user);
        corporateIdEdit = user.corporateId;
        let groupCode = user.userGroupCode;
        userGroupList.forEach((group) => {
          if (group.label == groupCode) {
            form.setFieldsValue({
              roleGroup: group.role,
            });
            // setRoleGroup(group.role);
          }
        });

        form.setFieldsValue({
          userCode: user.userCode,
          userName: user.userName,
          userGroupCode: groupCode,
          phoneNumber: user.phoneNumber,
          email: user.email,
        });
      })
      .catch(function (error) {
        console.log(error);
        // if (error.response.status == 401) {
        //   console.log('L???i 401: H???t h???n token');
        // }
      });
  }, [id, form]);
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

          let corporateCodeData = '';
          let corporateNameData = '';
          let corporateId = corporateIdEdit; // hard code
          tempCorporateList.forEach((corporate) => {
            if (corporate.value == corporateId) {
              corporateCodeData = corporate.label;
              corporateNameData = corporate.name;
            }
          });
          setCorporeateName(corporateNameData);
          form.setFieldsValue({
            corporateCode: corporateCodeData,
            corporateName: corporateNameData,
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    fetchCorporate();
    return () => {};
  }, [form]);

  //
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
  //------------Set user input ------------//

  const onCorporateCodeChange = (value) => {
    var id = value + '';
    setUserInput({
      ...userInput,
      corporateId: id,
    });
    corporateList.forEach((corporate) => {
      if (corporate.value == value) {
        setCorporeateName(corporate.name);
      }
    });
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
    let groupCode = '';
    groupList.forEach((group) => {
      if (group.value == value) {
        groupCode = group.label;
        listGroup.push(group.label);
        // setRoleGroup(group.role);
        form.setFieldsValue({
          roleGroup: group.role,
        });
      }
    });
    setUserInput({
      ...userInput,
      userGroupCode: groupCode, // cho 1 group code
      listUserGroupCode: listGroup, // cho 1 list group code
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
    // console.log("userInfo:::", userInput)
  };

  const handleVisibleSearchCorporateGroup = () => {
    if (searchCorporateGroupModalVisible == true) {
      setCorporateGroupVisible(false);
    } else {
      setCorporateGroupVisible(true);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  // update user corporate --------------
  const submitHandler = () => {
    var data = {
      userCode: userInput.userCode.trim(),
      userName: userInput.userName.trim(),
      // listUserGroupCode: userInput.listUserGroupCode,
      userGroupCode: userInput.userGroupCode.trim(),
      phoneNumber: userInput.phoneNumber.trim(),
      email: userInput.email.trim(),
      userStatus: 1,
      channelInit: userInput.channelInit,
    };
    var corporateId = userInput.corporateId;

    console.log('Received values of form: ', data);

    var configPromise = am010502Domain.updateUser(id, corporateId, data);
    configPromise
      .then((result) => {
        axios(result)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
            setDialogVisible(true);
          })
          .catch(function (error) {
            console.log(error.data);
          });
      })
      .catch((err) => console.log(err));
  };

  function closeModal(data) {
    // console.log(data);
    setModalVisible(false);
    history.push('/home/corporate-user');
  }
  const handleSearchData = () => {
    // console.log('search');
  };
  return (
    <>
      <UpdateSuccessModal
        isVisbled={successModalVisible}
        onCloseModal={closeModal}
      />
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
            <KTTitle size={4}>Ch???nh s???a</KTTitle>
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
                                whitespace: true,
                                required: true,
                                message:
                                  'Tr?????ng m?? doanh nghi???p kh??ng ???????c ph??p ????? tr???ng!',
                              },
                            ]}
                          >
                            {/* <Input suffix={<SearchOutlined />} /> */}
                            <Select
                              disabled
                              onChange={onCorporateCodeChange}
                              options={corporateList}
                            ></Select>
                          </Form.Item>
                        </Col>

                        <Col span={1}></Col>
                        <Col span={1}>
                          <Button
                            disabled
                            type="primary"
                            icon={<SearchOutlined />}
                          ></Button>
                        </Col>
                      </Row>

                      <Row>
                        <Col span={8}>
                          T??n doanh nghi???p{' '}
                          <span className={'text-require'}></span>
                        </Col>
                        <Col span={16}>
                          <Form.Item>
                            <Input value={corporateName} disabled />
                          </Form.Item>
                        </Col>
                      </Row>

                      <Row>
                        <Col span={8}>
                          M?? ng?????i d??ng
                          <span className={'text-require'}></span>
                        </Col>
                        <Col span={16}>
                          <Form.Item name={'userCode'}>
                            <Input disabled value={userCode} />
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
                                whitespace: true,
                                required: true,
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
                            {/* <Input suffix={<SearchOutlined />} /> */}
                            <Select
                              onChange={onUserGroupCodeChange}
                              options={groupList}
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
                            <Input disabled />
                            {/* <Input value={roleGroup} disabled /> */}
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
                                whitespace: true,
                                required: true,
                                message:
                                  'Tr?????ng email kh??ng ???????c ph??p ????? tr???ng!',
                              },
                              {
                                max: 50,
                                message: 'Tr?????ng Email t???i ??a 50 k?? t???!',
                              },
                              {
                                // pattern: /^([a-z A-Z 0-9]*@[a-z A-Z 0-9]*\.[\s\S]*)/y,
                                pattern:
                                  /^[A-Za-z0-9_.]{2,32}@([a-zA-Z0-9]{2,12})(.[a-zA-Z]{2,12})+$/y,
                                message: 'Email kh??ng ch??nh x??c!',
                              },
                            ]}
                          >
                            <Input type={'email'} onChange={onEmailChange} />
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
