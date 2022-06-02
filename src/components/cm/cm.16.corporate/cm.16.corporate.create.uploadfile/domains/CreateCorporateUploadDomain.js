import log from '../ModuleLogger';
import { message } from 'antd';
import { useEffect, useRef } from 'react';
import { useHistory } from 'react-router';
import CreateCorporateUploadService from '../services/CreateCorporateUploadService';
var axios = require('axios');

export function CreateCorporateUploadDomain() {
  const history = useHistory();
  const [context, contextService] = CreateCorporateUploadService();
  const contextRef = useRef(context);
  useEffect(() => {
    contextRef.current = context;
  }, [context]);

  const initDomain = async () => {
    // khởi tạo nghiệp vụ
    var contextData = {
      paperType: 'gpdkdn',
      selectedFile: '',
      pathFile: '',
      isFilePicked: false,
      errorMessage: '',
      loading: false,
      isModalVisible: false,
      ocrCorporateBussinessResponse: '',
    };
    contextService.initContext(contextData);
  };

  const changeHandler = (event) => {
    contextService.updateContext({
      ...contextRef.current,
      selectedFile: event.target.files[0],
      isFilePicked: true,
    });
  };

  //--------------Code mới--------------------//
  const fileInputRef = useRef();

  const showModal = () => {
    contextService.updateContext({
      ...contextRef.current,
      isModalVisible: true,
    });
  };

  const handleOk = () => {
    contextService.updateContext({
      ...contextRef.current,
      isModalVisible: false,
    });
  };

  const handleCancel = () => {
    contextService.updateContext({
      ...contextRef.current,
      isModalVisible: false,
    });
  };

  const dragOver = (e) => {
    e.preventDefault();
  };

  const dragEnter = (e) => {
    e.preventDefault();
  };

  const dragLeave = (e) => {
    e.preventDefault();
  };

  const handleFiles = (file) => {
    if (validateFile(file)) {
      if (validateFileSize(file)) {
        var tmppath = URL.createObjectURL(file);
        contextService.updateContext({
          ...contextRef.current,
          selectedFile: file,
          isFilePicked: true,
          pathFile: tmppath,
        });

        file['invalid'] = false;
      } else {
        contextService.updateContext({
          ...contextRef.current,
          selectedFile: file,
          isFilePicked: true,
          errorMessage: 'Dung lượng file vượt quá dung lượng cho phép!',
        });
        file['invalid'] = true;
      }
    } else {
      contextService.updateContext({
        ...contextRef.current,
        selectedFile: file,
        isFilePicked: true,
        errorMessage: 'Định dạng file không đúng!',
      });
      file['invalid'] = true;
    }
  };

  const fileDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    console.log(files);
    if (files.length) {
      handleFiles(files[0]);
    }
  };

  const validateFile = (file) => {
    const validTypes = ['application/pdf'];
    console.log(file.type);
    if (validTypes.indexOf(file.type) === -1) {
      return false;
    }
    return true;
  };

  const validateFileSize = (file) => {
    console.log(file.size);
    if (file.size >= 20000000) {
      return false;
    }
    return true;
  };

  const fileInputClicked = () => {
    fileInputRef.current.click();
  };

  const filesSelected = () => {
    if (fileInputRef.current.files.length) {
      handleFiles(fileInputRef.current.files[0]);
    }
  };

  const fileSize = (size) => {
    if (size === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(size) / Math.log(k));
    return parseFloat((size / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const removeFile = () => {
    contextService.updateContext({
      ...contextRef.current,
      selectedFile: '',
      isFilePicked: false,
    });
  };

  const empty = () => {
    console.log('Xóa file đi rồi hẵng chọn file khác');
  };

  //-----------------------------------------//

  const paperTypeChange = (event) => {
    contextService.updateContext({
      ...contextRef.current,
      paperType: event,
      isFilePicked: true,
    });
  };

  const continueHandler = async () => {
    history.push('/create-corporate/corporate-info');
  };

  const handleSubmission = () => {
    var dataForm1 = new FormData();
    dataForm1.append('ocrCode', contextRef.current.paperType);
    dataForm1.append('file', contextRef.current.selectedFile);
    dataForm1.append('tocDoOcr', '1');
    console.log(dataForm1);

    var fileToUpload = new FormData();
    fileToUpload.append('file', contextRef.current.selectedFile);
    console.log(fileToUpload);

    contextService.updateContext({
      ...contextRef.current,
      loading: true,
    });
    getOcrCorporateBussiness(dataForm1, fileToUpload);
  };

  const getOcrCorporateBussiness = async (dataForm, fileToUpload) => {
    var config = {
      method: 'post',
      url: process.env.REACT_APP_API_BACKEND + '/ocr/getOcrCorporateBussiness',
      headers: {
        'Content-Type': 'application/json',
      },
      data: dataForm,
      timeout: 300000,
    };
    // uploadFile(dataForm2);
    try {
      let response = await axios(config);
      contextService.updateContext({
        ...contextRef.current,
        loading: false,
      });
      console.log(response);
      if (response.data.data == null || response.data.data == undefined) {
        message.error('File chưa được ký số!');
      } else {
        // var fileData = {};
        let fileData = await uploadFile(fileToUpload);
        console.log(fileData);
        contextService.updateContext({
          ...contextRef.current,
          ocrCorporateBussinessResponse:
            response.data.data.ocrCorporateBussinessResponse,
          ocrCorporateSignatureResponse:
            response.data.data.ocrCorporateSignatureResponse,
        });

        history.push({
          pathname: '/create-corporate/corporate-info',
          state: {
            ocrCorporateBussinessResponse:
              response.data.data.ocrCorporateBussinessResponse,
            ocrCorporateSignatureResponse:
              response.data.data.ocrCorporateSignatureResponse,
            fileData: fileData,
          },
        });
      }
    } catch (err) {
      contextService.updateContext({
        ...contextRef.current,
        loading: false,
      });
      console.log('here like to send the error to the user instead');
      console.log(err?.response?.data);
      message.error('Mã số đăng ký doanh nghiệp đã tồn tại.');
    }
  };

  const uploadFile = async (data) => {
    var config = {
      method: 'post',
      url: process.env.REACT_APP_API_BACKEND + '/corporate/uploadFile',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
      timeout: 300000,
    };

    let response = await axios(config);
    return response.data;
  };

  const exitHandler = async () => {
    history.push('/login');
  };

  const domainInterface = useRef({
    initDomain,
    continueHandler,
    getOcrCorporateBussiness,
    exitHandler,
    changeHandler,
    handleSubmission,
    paperTypeChange,
    showModal,
    handleOk,
    handleCancel,
    dragOver,
    dragEnter,
    dragLeave,
    fileDrop,
    filesSelected,
    fileInputClicked,
    fileSize,
    removeFile,
    empty,
    handleFiles,
  });
  return [context, domainInterface.current];
}

export default CreateCorporateUploadDomain;
