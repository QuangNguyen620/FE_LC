import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Col, Row, Input, Button, Form, Space, Divider, Modal } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import '../../../common/less/AM.01.05.02.less';
import '../../../../../../../../assets/less/LC-common.less';

import DeleteModal from '../../../common/modal/delete/DeleteModal';
import ResetPassModal from '../../../common/modal/reset_pass/ResetPassModal';
import ActiveModal from '../../../common/modal/active/ActiveModal';
import DeactiveModal from '../../../common/modal/deactive/DeactiveModal';
import LockModal from '../../../common/modal/lock/LockModal';
import UnlockModal from '../../../common/modal/unlock/UnlockModal';

import { useParams } from 'react-router-dom';
import { useA00Domain } from '../domains/AM.01.05.02Domain';
import { useHistory } from 'react-router';
import { KTTitle } from 'core/ui';
var axios = require('axios');

const AM010502CorporateUserAddView = ({ lang = 'vi', ...props }) => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const history = useHistory();
  const [, am010502Domain] = useA00Domain();
  const [modalVisible, setModalVisible] = useState(false);
  const [show, setShow] = useState(false);

  const [roleGroup, setRoleGroup] = useState('');
  const [userId, setUserId] = useState('');
  const exceptThisSymbols = ['e', 'E', '+', '-', '.'];

  //------------------------------//

  var userGroupList = [];
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

          var tempCorporateGroupList = [];
          array.forEach((element) => {
            var tempCorporateGroup = {};
            tempCorporateGroup.value = element.id;
            tempCorporateGroup.label = element.userGroupCode;
            tempCorporateGroup.role = element.role;
            tempCorporateGroupList.push(tempCorporateGroup);
          });
          // setCorporateGroupList(tempCorporateGroupList);
          userGroupList = tempCorporateGroupList;
          console.log('ListGroup', tempCorporateGroupList);
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
        setUserId(user.userId);

        let groupCode = user.userGroupCode;
        userGroupList.forEach((group) => {
          if (group.label == groupCode) {
            setRoleGroup(group.role);
          }
        });
        // console.log('Role::', roleGroup);
        var status = user.userStatus;
        if (status == 1) {
          status = 'Hoạt động';
        } else if (status == 0) {
          status = 'Ngừng hoạt động';
        }
        form.setFieldsValue({
          corporateCode: user.corporateCode,
          corporateName: user.corporateName,
          userCode: user.userCode,
          userName: user.userName,
          userGroupCode: groupCode,
          phoneNumber: user.phoneNumber,
          email: user.email,
          status: status,
        });
      })
      .catch(function (error) {
        console.log(error);
        // if (error.response.status == 401) {
        //   console.log('Lỗi 401: Hết hạn token');
        // }
      });
  }, [id, form]);

  //-----update----------------//
  const [deleteModalVisible, setDeleteVisible] = useState(false);
  const [resetPassModalVisible, setResetPassVisible] = useState(false);
  const [activeModalVisible, setActiveVisible] = useState(false);
  const [deactiveModalVisible, setDeactiveVisible] = useState(false);
  const [lockModalVisible, setLockVisible] = useState(false);
  const [unlockModalVisible, setUnlockVisible] = useState(false);

  // const [userInput, setUserInput] = useState({
  //   corporateId: '',
  //   userCode: '',
  //   userName: '',
  //   listUserGroupCode: [''],
  //   userStatus: '1',
  //   phoneNumber: '',
  //   email: '',
  // });
  //------------Set user input ------------//

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  function openDeleteModal() {
    setDeleteVisible(true);
  }

  function closeDeleteModal(data) {
    console.log(data);
    setDeleteVisible(false);
  }

  function openResetPassModal() {
    setResetPassVisible(true);
  }

  function closeResetPassModal(data) {
    console.log(data);
    setResetPassVisible(false);
  }

  function openActiveModal() {
    setActiveVisible(true);
  }

  function closeActiveModal(data) {
    console.log(data);
    setActiveVisible(false);
  }

  function openDeactiveModal() {
    setDeactiveVisible(true);
  }

  function closeDeactiveModal(data) {
    console.log(data);
    setDeactiveVisible(false);
  }

  function openLockModal() {
    setLockVisible(true);
  }

  function closeLockModal(data) {
    console.log(data);
    setLockVisible(false);
  }

  function openUnlockModal() {
    setUnlockVisible(true);
  }

  function closeUnlockModal(data) {
    console.log(data);
    setUnlockVisible(false);
  }

  //-----delete----------//
  const handleDeleteOk = (data) => {
    var config = {
      method: 'delete',
      url:
        process.env.REACT_APP_API_BACKEND + '/corporate/user/delete/' + id + '',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('access_token') + '',
      },
    };
    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        // history.push('/home/corporate-user');
        setDeleteVisible(false);
        setShow(true);
      })
      .catch(function (error) {
        console.log(error);
      });
    console.log(data);
  };

  function closeModal(data) {
    console.log(data);
    setModalVisible(false);
    history.push('/home/corporate-user');
  }

  const deleteSuccess = () => {
    history.push('/home/corporate-user');
    setShow(false);
  };

  return (
    <>
      <Modal
        footer={[
          <Button className="common-btn" key="back" onClick={deleteSuccess}>
            Đóng
          </Button>,
        ]}
        visible={show}
        onOk={deleteSuccess}
      >
        <KTTitle className={'text-center'} size={3}>
          Xóa thành công
        </KTTitle>
      </Modal>

      <DeleteModal
        isVisbled={deleteModalVisible}
        onCloseModal={closeDeleteModal}
        onDelete={handleDeleteOk}
      />

      <ResetPassModal
        isVisbled={resetPassModalVisible}
        onCloseModal={closeResetPassModal}
        userIdData={userId}
      />

      <ActiveModal
        isVisbled={activeModalVisible}
        onCloseModal={closeActiveModal}
      />

      <DeactiveModal
        isVisbled={deactiveModalVisible}
        onClose={closeDeactiveModal}
        onCloseModal={closeDeactiveModal}
      />

      <LockModal
        isVisbled={lockModalVisible}
        onClose={closeLockModal}
        onCloseModal={closeLockModal}
      />

      <UnlockModal
        isVisbled={unlockModalVisible}
        onClose={closeUnlockModal}
        onCloseModal={closeUnlockModal}
      />

      <am010502Domain isVisbled={modalVisible} onCloseModal={closeModal} />
      <div className={'main-container'}>
        <Row className={'padding-md'}>
          <Col span={15}>
            <KTTitle size={2} className={'font-weight-title'}>
              Quản lý người dùng doanh nghiệp
            </KTTitle>
          </Col>
        </Row>
        <Row className={'padding-title-sub'}>
          <Col span={15}>
            <KTTitle size={4}>Xem</KTTitle>
          </Col>
        </Row>
        <Row className={'padding-md'}>
          <Col span={24}>
            <Form
              form={form}
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
                        <Col span={16}>
                          <Form.Item
                            name={'corporateCode'}
                            rules={[
                              {
                                whitespace: true,
                                required: true,
                                message:
                                  'Trường mã doanh nghiệp không được phép để trống!',
                              },
                            ]}
                          >
                            <Input disabled suffix={<SearchOutlined />} />
                          </Form.Item>
                        </Col>
                      </Row>

                      <Row>
                        <Col span={8}>
                          Tên doanh nghiệp{' '}
                          <span className={'text-require'}></span>
                        </Col>
                        <Col span={16}>
                          <Form.Item name={'corporateName'}>
                            <Input disabled />
                          </Form.Item>
                        </Col>
                      </Row>

                      <Row>
                        <Col span={8}>
                          Mã người dùng
                          <span className={'text-require'}></span>
                        </Col>
                        <Col span={16}>
                          <Form.Item name={'userCode'}>
                            <Input disabled />
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
                                whitespace: true,
                                required: true,
                                message:
                                  'Trường tên hiển thị không được phép để trống!',
                              },
                            ]}
                          >
                            <Input disabled />
                          </Form.Item>
                        </Col>
                      </Row>

                      <Row>
                        <Col span={8}>
                          Mã nhóm người dùng{' '}
                          <span className={'text-require'}>*</span>
                        </Col>
                        <Col span={16}>
                          <Form.Item name={'userGroupCode'}>
                            <Input suffix={<SearchOutlined />} disabled />
                          </Form.Item>
                        </Col>
                      </Row>

                      <Row>
                        <Col span={8}>
                          Vai trò
                          <span className={'text-require'}></span>
                        </Col>
                        <Col span={16}>
                          <Form.Item>
                            <Input disabled value={roleGroup} />
                          </Form.Item>
                        </Col>
                      </Row>

                      <Row>
                        <Col span={8}>
                          Thời gian đăng nhập lần cuối
                          <span className={'text-require'}></span>
                        </Col>
                        <Col span={16}>
                          <Form.Item name={'lastTimeLogin'}>
                            <Input disabled />
                          </Form.Item>
                        </Col>
                      </Row>

                      <Row>
                        <Col span={8}>
                          Thời gian đổi mật khẩu lần cuối
                          <span className={'text-require'}></span>
                        </Col>
                        <Col span={16}>
                          <Form.Item name={'lastTimeChangePassword'}>
                            <Input disabled />
                          </Form.Item>
                        </Col>
                      </Row>

                      <Row>
                        <Col span={8}>
                          Số lần đăng nhập thất bại
                          <span className={'text-require'}></span>
                        </Col>
                        <Col span={16}>
                          <Form.Item name={'failedLoginAttempt'}>
                            <Input disabled />
                          </Form.Item>
                        </Col>
                      </Row>

                      <Row>
                        <Col span={8}>
                          Trạng thái người dùng
                          <span className={'text-require'}></span>
                        </Col>
                        <Col span={16}>
                          <Form.Item name={'status'}>
                            <Input disabled />
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
                            ]}
                          >
                            <Input
                              type={'number'}
                              onKeyDown={(e) =>
                                exceptThisSymbols.includes(e.key) &&
                                e.preventDefault()
                              }
                              disabled
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
                                whitespace: true,
                                required: true,
                                message:
                                  'Trường email không được phép để trống!',
                              },
                            ]}
                          >
                            <Input type={'email'} disabled />
                          </Form.Item>
                        </Col>
                      </Row>
                    </section>
                  </div>

                  <div id="form-footer">
                    <Form.Item>
                      <Space className={'padding-buton'}>
                        <Button
                          onClick={(e) => {
                            am010502Domain.toEditPage(id);
                          }}
                          className="common-btn"
                          htmlType="submit"
                        >
                          Sửa
                        </Button>
                        <Button
                          onClick={openDeleteModal}
                          className="common-btn"
                          htmlType="submit"
                        >
                          Xóa
                        </Button>
                        <Button
                          className="common-btn"
                          onClick={() => {
                            am010502Domain.toAuthorizePage(id);
                          }}
                        >
                          Xem phân quyền
                        </Button>
                        <Button
                          onClick={openResetPassModal}
                          className="common-btn"
                          htmlType="submit"
                        >
                          Đặt lại mật khẩu
                        </Button>
                        <Button
                          onClick={openActiveModal}
                          className="common-btn"
                          htmlType="submit"
                        >
                          Kích hoạt
                        </Button>

                        <Button
                          onClick={openDeactiveModal}
                          className="common-btn"
                          htmlType="submit"
                        >
                          Vô hiệu hóa
                        </Button>
                        <Button
                          onClick={openLockModal}
                          className="common-btn"
                          htmlType="submit"
                        >
                          Khóa
                        </Button>
                        <Button
                          onClick={openUnlockModal}
                          className="common-btn"
                          htmlType="submit"
                        >
                          Mở khóa
                        </Button>
                        <Button className="common-btn" htmlType="submit">
                          Ngắt kết nối
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
