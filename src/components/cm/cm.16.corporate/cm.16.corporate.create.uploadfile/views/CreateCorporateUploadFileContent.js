import React, { useContext, createContext, useState, useEffect } from 'react';
import log from '../ModuleLogger';
import { KTLogo } from 'core/ui';
import { Col, Row, Button, Form, Select, Card, Space, Spin } from 'antd';
import { KTTitle } from 'core/ui';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import { CreateCorporateUploadDomain } from '../domains/CreateCorporateUploadDomain';
import Dropzone from '../views/component/dropzone/Dropzone';

import './CreateCorporate.less';
import '../../../../../assets/less/LC-common.less';
import ic_fis from 'assets/img/brand/logo_fis.png';
var axios = require('axios');
var fs = require('fs');
const { Option } = Select;

var FormData = require('form-data');

const CreateCorporateUploadFileContent = ({ lang = 'vi', ...props }) => {
  const { t } = useTranslation();
  const [context, domain] = CreateCorporateUploadDomain();

  useEffect(() => {
    domain.initDomain();
  }, []);

  useEffect(() => {
    log.debug('useEffect--', context);
  }, [context]);

  return (
    <>
      <div class="upload-file-form-container">
        <Row style={{ paddingTop: '100px', paddingBottom: '162px' }}>
          <Col span={8}></Col>
          <Col align="middle" className="card-container" span={8}>
            <Spin Spin size="large" spinning={context?.loading}>
              <Card className="custom-card" bordered={false}>
                <Form onFinish={domain.handleSubmission} layout="horizontal">
                  <KTLogo mode="logo" logo={ic_fis} />
                  <Row className="padding-md">
                    <Col span={24}>
                      <KTTitle size={2}>
                        <b>
                          Vui lòng tải lên giấy chứng nhận đăng ký doanh nghiệp
                        </b>
                      </KTTitle>
                    </Col>
                  </Row>
                  <Row className="padding-md">
                    <Col span={24}>
                      <KTTitle size={5}>
                        <span style={{ color: '#F5222D' }}>*</span> Lưu ý: Tệp
                        tải lên là tệp PDF có chữ ký số của công ty
                      </KTTitle>
                    </Col>
                  </Row>
                  <Row className="padding-md">
                    <Col span={24}>
                      <div>
                        <Form.Item name={'fileDir'}>
                          <Dropzone />
                        </Form.Item>
                      </div>
                    </Col>
                  </Row>
                  <div
                    className="padding-md"
                    style={{ textAlign: '-webkit-center' }}
                    id="form-footer"
                  >
                    <Form.Item>
                      <Space
                        direction="horizontal"
                        size={24}
                        style={{
                          marginRight: 'auto',
                        }}
                      >
                        <Button
                          onClick={(e) => {
                            domain.exitHandler(e);
                          }}
                          className="secondary-btn"
                        >
                          Thoát
                        </Button>
                        <Button
                          disabled={
                            context?.selectedFile?.invalid == true ||
                            context?.isFilePicked == false
                              ? true
                              : false
                          }
                          className={` ${
                            context?.selectedFile?.invalid == true ||
                            context?.isFilePicked == false
                              ? 'common-btn-disabled'
                              : 'common-btn'
                          }`}
                          htmlType="submit"
                        >
                          Tiếp tục
                        </Button>
                      </Space>
                    </Form.Item>
                  </div>
                </Form>
              </Card>
            </Spin>
          </Col>
          <Col span={8}></Col>
        </Row>
      </div>
    </>
  );
};

export default CreateCorporateUploadFileContent;
