import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Col, Row, Button, Form, Select, Space, Upload, message } from 'antd';
import { KTTitle } from 'core/ui';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import { CreateCorporateDomain } from '../domains/CreateCorporateDomain';
import './CreateCorporate.less';
import '../../../../../../../../../assets/less/LC-common.less';
var axios = require('axios');
var fs = require('fs');
const { Option } = Select;

var FormData = require('form-data');

const CreateCorporateContent = ({ lang = 'vi', ...props }) => {
  const { t } = useTranslation();
  const [, domain] = CreateCorporateDomain();
  const history = useHistory();
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [fileUrl, setFileUrl] = useState(null);
  const [paperType, setPaperType] = useState('gpdkdn');

  const paperTypeChange = (value) => {
    setPaperType(value);
    console.log(value);
  };

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    console.log(event.target.files[0]);
    setIsFilePicked(true);
    // const reader = new FileReader();
    // reader.addEventListener('load', () => {
    //   setFileUrl(reader.result);
    // });
    // reader.readAsDataURL(event.target.files[0]);
  };

  const [validateSign, setValidateSign] = useState(true);

  const handleSubmission = async () => {
    var data = new FormData();
    data.append('ocrCode', paperType);
    data.append('file', selectedFile);
    data.append('tocDoOcr', '1');

    var config = {
      method: 'post',
      url: process.env.REACT_APP_API_BACKEND + '/ocr/getOcrCorporateBussiness',
      data: data,
    };
    var ocrData = {};
    axios(config)
      .then(function (response) {
        console.log(response);
        if (response.data.data == null || response.data.data == undefined) {
          message.error(response.data.message);
          message.error('File ch??a ???????c k?? s???!');
        } else {
          setValidateSign(false);
          var ocrCorporateBussinessResponse =
            response.data.data.ocrCorporateBussinessResponse;
          var ocrCorporateSignatureResponse =
            response.data.data.ocrCorporateSignatureResponse;
          history.push({
            pathname: '/home/corporate-customer/add',

            state: {
              ocrCorporateBussinessResponse: ocrCorporateBussinessResponse,
              paperType: paperType,
              ocrCorporateSignatureResponse: ocrCorporateSignatureResponse,
            },
          });
        }
      })
      .catch(function (error) {
        console.log(error);
        message.error('OCR kh??ng th??nh c??ng!');
      });
  };

  // const [numPages, setNumPages] = useState(null);
  // const [pageNumber, setPageNumber] = useState(1);

  // function onDocumentLoadSuccess({ numPages }) {
  //   setNumPages(numPages);
  //   setPageNumber(1);
  // }

  return (
    <>
      <div className={'main-container'}>
        <Row className={'padding-title'}>
          <Col span={15}>
            <KTTitle size={2}>Th??ng tin doanh nghi???p</KTTitle>
          </Col>
        </Row>

        <Row className={'padding-lg'}>
          <Col span={24}>
            <Form
              onFinish={handleSubmission}
              // onFinishFailed={onFinishFailed}
              layout="horizontal"
            >
              <Row>
                <Col span={23}>
                  <Row>
                    <Col span={2}>
                      Lo???i gi???y t??? <span className={'text-require'}>*</span>
                    </Col>
                    <Col span={22}>
                      <Form.Item name={'paperType'}>
                        <Select
                          disabled
                          defaultValue="gpdkdn"
                          className={'width-select'}
                          onChange={paperTypeChange}
                        >
                          <Option value="gpdkdn">
                            Gi???y ch???ng nh???n ????ng k?? doanh nghi???p
                          </Option>
                          <Option value="gcndkkd">
                            Gi???y ph??p ch???ng nh???n ????ng k?? kinh doanh
                          </Option>
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <Form.Item name={'fileDir'}>
                        <label
                          for="file-upload-dkdn"
                          class="custom-file-upload "
                        >
                          <i class="fa fa-cloud-upload"></i> Upload
                        </label>
                        <input
                          id="file-upload-dkdn"
                          type="file"
                          name="file"
                          onChange={changeHandler}
                        />
                      </Form.Item>
                      {isFilePicked ? (
                        <div>
                          <p>Filename: {selectedFile.name}</p>
                          <p>Filetype: {selectedFile.type}</p>
                          <p>Size in bytes: {selectedFile.size}</p>
                          {/* {selectedFile.type == 'image/jpeg' ? (
                            <div className="previewFile">
                              <img className="previewFile" src={fileUrl} />
                            </div>
                          ) : (
                            <Document
                              file={fileUrl}
                              onLoadSuccess={onDocumentLoadSuccess}
                            >
                              <Page pageNumber={pageNumber} />
                            </Document>
                          )} */}
                        </div>
                      ) : (
                        <p>Select a file to show details</p>
                      )}
                    </Col>
                  </Row>
                  <Row>
                    <Col span={2}>
                      L??u ?? <span className={'text-require'}>*</span>
                    </Col>
                    <Col span={22}>
                      T???i l??n t???p pdf c?? ch??? k?? s??? c???a c??ng ty
                    </Col>
                  </Row>
                  <div id="form-footer">
                    <Form.Item>
                      <Space className={'padding-buton'}>
                        <Button className="common-btn" htmlType="submit">
                          Ti???p theo
                        </Button>
                        <Button
                          onClick={(e) => {
                            domain.exitHandler(e);
                          }}
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

export default CreateCorporateContent;
