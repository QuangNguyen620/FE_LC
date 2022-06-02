import React, { useState, useEffect } from 'react';
import { Col, Row, Input, Button, Form, Space } from 'antd';
import '../../../common/less/AM.01.05.03.less';
import '../../../../../../../../assets/less/LC-common.less';
import { useParams } from 'react-router-dom';
import { useA00Domain } from '../domains/AM.01.05.03Domain';
import { useHistory } from 'react-router';
import { KTTitle } from 'core/ui';
var axios = require('axios');

const AM010503CorporateAccountAddView = ({ lang = 'vi', ...props }) => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const history = useHistory();
  const [, am010503Domain] = useA00Domain();
  const [modalVisible, setModalVisible] = useState(false);

  //------------Call api get account ------------//
  useEffect(() => {
    var data = '';
    var config = {
      method: 'get',
      url:
        process.env.REACT_APP_API_BACKEND + '/corporate/account/get/' + id + '',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('access_token') + '',
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(response);
        var user = response.data.data;

        form.setFieldsValue({
          corporateCode: user.corporateCode,
          corporateName: user.corporateName,
          corporateAccountNumber: user.corporateAccountNumber,
          corporateAccountName: user.corporateAccountName,
          corporateAccountType: user.corporateAccountType,
          bankName: user.bankName,
        });
      })
      .catch(function (error) {
        console.log(error);
        // if (error.response.status == 401) {
        //   console.log('Lỗi 401: Hết hạn token');
        // }
      });
  }, [id, form]);
  //------------Set user input ------------//

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  function closeModal(data) {
    console.log(data);
    setModalVisible(false);
    history.push('/home/corporate-account');
  }

  return (
    <>
      <am010502Domain isVisbled={modalVisible} onCloseModal={closeModal} />
      <div className={'main-container'}>
        <Row className={'padding-title'}>
          <Col span={15}>
            <KTTitle size={2} className={'font-weight-title'}>
              Thông tin tài khoản khách hàng
            </KTTitle>
          </Col>
        </Row>
        <Row className={'padding-title'}>
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
                      <Col span={8}>
                        Mã doanh nghiệp{' '}
                        <span className={'text-require'}>*</span>
                      </Col>
                      <Col span={16}>
                        <Form.Item name={'corporateCode'}>
                          <Input disabled />
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
                        Số tài khoản
                        <span className={'text-require'}></span>
                      </Col>
                      <Col span={16}>
                        <Form.Item name={'corporateAccountNumber'}>
                          <Input disabled />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={8}>
                        Tên chủ tài khoản{' '}
                        <span className={'text-require'}>*</span>
                      </Col>
                      <Col span={16}>
                        <Form.Item name={'corporateAccountName'}>
                          <Input disabled />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={8}>
                        Loại tài khoản
                        <span className={'text-require'}></span>
                      </Col>
                      <Col span={16}>
                        <Form.Item name={'corporateAccountType'}>
                          <Input disabled />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={8}>
                        Tên ngân hàng
                        <span className={'text-require'}>*</span>
                      </Col>
                      <Col span={16}>
                        <Form.Item name={'bankName'}>
                          <Input disabled />
                        </Form.Item>
                      </Col>
                    </Row>
                  </div>

                  <div id="form-footer">
                    <Form.Item>
                      <Space className={'padding-buton'}>
                        <Button
                          onClick={am010503Domain.exitHandler}
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

export default AM010503CorporateAccountAddView;
