import React, { useState, useRef, useEffect } from 'react';
import { Document, Page } from 'react-pdf';
import './Dropzone.less';
import { Avatar, Row, Col, Modal, Progress } from 'antd';
import {
  CloudUploadOutlined,
  DeleteOutlined,
  FileOutlined,
  EyeFilled,
  EyeOutlined,
} from '@ant-design/icons';
import { CreateCorporateUploadDomain } from '../../../domains/CreateCorporateUploadDomain';
import ViewPDFModal from '../../modal/viewFile/viewPDFModal';
import log from '../../../ModuleLogger';
const Dropzone = (...props) => {
  const [context, domain] = CreateCorporateUploadDomain();

  const [visiblePDFModal, setVisiblePDFModal] = useState(false);

  const closeModal = () => {
    setVisiblePDFModal(false);
  };
  const openModal = () => {
    setVisiblePDFModal(true);
  };

  useEffect(() => {
    domain.initDomain();
  }, []);

  useEffect(() => {
    log.debug('useEffect--', context);
  }, [context]);

  const fileInputRef = useRef();

  const dragOver = (e) => {
    domain.dragOver(e);
  };

  const dragEnter = (e) => {
    domain.dragEnter(e);
  };

  const dragLeave = (e) => {
    domain.dragLeave(e);
  };

  const fileDrop = (e) => {
    domain.fileDrop(e);
  };

  const removeFile = () => {
    domain.removeFile();
  };

  const empty = () => {
    domain.empty();
  };

  const fileInputClicked = () => {
    fileInputRef.current.click();
  };

  const filesSelected = () => {
    if (fileInputRef.current.files.length) {
      domain.handleFiles(fileInputRef.current.files[0]);
    }
  };

  const submitHandler = () => {
    setVisiblePDFModal(false);
    domain.handleSubmission();
  };

  const deleletFile = () => {
    setVisiblePDFModal(false);
    domain.removeFile();
  };

  return (
    <>
      <ViewPDFModal
        isVisbled={visiblePDFModal}
        file={context?.pathFile}
        onClose={closeModal}
        submitHandler={submitHandler}
        deleletFile={deleletFile}
      />
      <div className="container">
        <div
          // className="drop-container"
          className={` ${
            context?.isFilePicked == true
              ? 'drop-container-valid'
              : 'drop-container'
          }`}
          onDragOver={dragOver}
          onDragEnter={dragEnter}
          onDragLeave={dragLeave}
          onDrop={fileDrop}
          onClick={
            context?.isFilePicked == false
              ? () => fileInputClicked()
              : () => domain.empty()
          }
        >
          <Row>
            <Col span={24}>
              {context?.isFilePicked ? (
                <></>
              ) : (
                <div className="upload-icon">
                  <Avatar
                    size="small"
                    icon={<CloudUploadOutlined className={'eye-filled'} />}
                  />
                </div>
              )}
            </Col>
            <Col span={24}>
              {context?.isFilePicked ? (
                <div>
                  <div className="file-display-container">
                    <Row gutter={24} className="file-status-bar">
                      <Col span={24}>
                        <Row gutter={24}>
                          <Col
                            style={{
                              width: '100%',
                              textAlign: 'left',
                            }}
                            span={19}
                          >
                            <Row gutter={24}>
                              <Col span={2}>
                                <Avatar
                                  className={` ${
                                    context?.selectedFile?.invalid == true
                                      ? 'file-type-logo-icn-invalid'
                                      : 'file-type-logo-icn-valid'
                                  }`}
                                  size="medium"
                                  icon={<FileOutlined />}
                                />
                              </Col>
                              <Col style={{ paddingLeft: '10%' }} span={22}>
                                <h3
                                  className={`file-name ${
                                    context?.selectedFile?.invalid
                                      ? 'file-error'
                                      : ''
                                  }`}
                                >
                                  {context?.selectedFile?.name}
                                </h3>
                              </Col>
                            </Row>
                            <Row style={{ height: '20%' }} gutter={24}>
                              <Col span={2}></Col>
                              <Col style={{ paddingLeft: '10%' }} span={22}>
                                <h5 className="file-size">
                                  {domain.fileSize(context?.selectedFile?.size)}
                                </h5>
                              </Col>
                            </Row>
                            <Row gutter={24}>
                              <Col span={2}></Col>
                              <Col style={{ paddingLeft: '10%' }} span={22}>
                                {context?.selectedFile?.invalid && (
                                  <h5 className="file-error-message">
                                    {context?.errorMessage}
                                  </h5>
                                )}
                              </Col>
                            </Row>
                          </Col>
                          <Col span={5}>
                            <div className="file-interaction">
                              <Avatar
                                style={{
                                  display:
                                    context?.selectedFile?.invalid == true
                                      ? 'none'
                                      : '',
                                  color: 'blue',
                                  backgroundColor: 'white',
                                }}
                                onClick={(e) => {
                                  openModal();
                                }}
                                size="medium"
                                icon={<EyeOutlined />}
                              />
                              <Avatar
                                style={{
                                  color: 'red',
                                  backgroundColor: 'white',
                                }}
                                onClick={() => removeFile()}
                                size="medium"
                                icon={<DeleteOutlined />}
                              />
                            </div>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="drop-message">
                    <p className="drop-message-1st-row">Click vào để tải lên</p>
                    <p className="drop-message-2nd-row">
                      {' '}
                      Định dạng PDF (max 20MB)
                    </p>
                  </div>
                  <input
                    ref={fileInputRef}
                    className="file-input"
                    type="file"
                    onChange={filesSelected}
                  />
                </div>
              )}
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};
export default Dropzone;
