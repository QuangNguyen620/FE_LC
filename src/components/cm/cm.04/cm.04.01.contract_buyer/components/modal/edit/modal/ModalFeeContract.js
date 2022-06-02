import React, { useEffect, useState } from 'react';
import { Col, Row, Form, Button, Modal, Checkbox } from 'antd';

import { CheckCircleFilled } from '@ant-design/icons';

import '../../../less/CM.04.01.less';
import '../../../../../../../../assets/less/LC-common.less';
import { useCM0401Domain } from '../../../../fuction/cm.04.01_edit/domains/CM.04.01Domain';

const ModalFeeContract = ({ lang = 'vi', ...props }) => {
  const [context, domain] = useCM0401Domain();
  const [formModal] = Form.useForm();

  const [checked, setChecked] = useState(true);

  function checkBoxChecked(e) {
    console.log(e);
    setChecked(e?.target?.checked);
  }

  useEffect(() => {
    console.log('useEffect--', context);
  }, [context?.feeCreateContract]);

  return (
    <>
      <Modal
        title="Thông tin thu phí"
        centered
        visible={props.isVisbled}
        onCancel={props.onClose}
        footer={
          [
            // <Button onClick={onModalClose} className="common-btn">
            //   Đóng
            // </Button>,
          ]
        }
        size={3}
      >
        <Form
          form={formModal}
          onFinish={domain.submitHandler}
          // onFinishFailed={onFinishFailed}
          layout="horizontal"
        >
          <Row style={{ padding: 16 }}>
            <Col span={24}>
              <Row>
                <Col span={24}>
                  <Row>
                    <Col span={8}>
                      Loại phí
                      <span style={{ color: '#F5222D' }}></span>
                    </Col>
                    <Col span={16}>
                      <Form.Item name={'feeType'}>
                        {context?.feeCreateContract?.feeType}
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row>
                    <Col span={8}>
                      Phí(VND) <span style={{ color: '#F5222D' }}></span>
                    </Col>
                    <Col span={16}>
                      <Form.Item name={'fee'}>
                        {context?.feeCreateContract?.fee}
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={8}>
                      Thuế VAT(10%) <span style={{ color: '#F5222D' }}></span>
                    </Col>
                    <Col span={16}>
                      <Form.Item name={'vatFee'}>
                        {context?.feeCreateContract?.vatFee}
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={8}>
                      Tổng phí <span style={{ color: '#F5222D' }}></span>
                    </Col>
                    <Col span={16}>
                      <Form.Item name={'totalFee'}>
                        <div id={'totalFee'}>
                          {context?.feeCreateContract?.totalFee}
                        </div>
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <Form.Item
                    name="checkboxAnnex"
                    valuePropName="checked"
                    initialValue={'checked'}
                    rules={[
                      {
                        validator: (_, value) =>
                          value
                            ? Promise.resolve()
                            : Promise.reject(new Error(' ')),
                      },
                    ]}
                  >
                    <Checkbox checked onChange={checkBoxChecked}>
                      Tôi đồng ý với mức thu phí này
                    </Checkbox>
                  </Form.Item>
                </Col>
                <Col span={1}></Col>

                <Col span={10}>
                  <Form.Item>
                    <Row>
                      <Button
                        style={{
                          float: 'right',
                          display: checked ? 'none' : 'flex',
                          backgroundColor: '#D9D9D9',
                          color: '#FFFFFF',
                        }}
                        // className="common-btn"
                      >
                        {'Xác nhận chỉnh sửa HĐ'}
                        <CheckCircleFilled />
                      </Button>
                      <Button
                        style={{
                          float: 'right',
                          display: checked ? 'flex' : 'none',
                        }}
                        className="common-btn"
                        htmlType="submit"
                      >
                        {'Xác nhận chỉnh sửa HĐ'}
                        <CheckCircleFilled />
                      </Button>
                    </Row>
                    {/* <Space direction="horizontal" size={24}>
                      <Button
                        style={{
                          float: 'right',
                          display:
                            checked == false
                              ? 'none'
                              : checked == true
                              ? 'flex'
                              : 'none',
                        }}
                        className="common-btn"
                        htmlType="submit"
                      >
                        {'Xác nhận chỉnh sửa HĐ'}
                        <CheckCircleFilled />
                      </Button>
                    </Space> */}
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default ModalFeeContract;
