const AXIOS_RESPONSE_SUCCESS = 200;

const ServiceBase = {
  isRequestSuccess(response) {
    return response && response.status === AXIOS_RESPONSE_SUCCESS;
  },
  isSuccess(response) {
    return (
      response && response.data && response.data.code === AXIOS_RESPONSE_SUCCESS
    );
  },
  getErrorMessages(response) {
    let responseData = response?.data || false;
    let errors = false;
    let message = false;
    if (
      responseData &&
      responseData.errors &&
      Object.keys(responseData.errors).length > 0
    ) {
      errors = responseData.errors;
    } else if (typeof responseData.message == 'string') {
      message = responseData.message;
    } else if (typeof responseData == 'object') {
      errors = responseData;
    }
    if (errors) {
      let errorMessages = Object.values(errors);
      return errorMessages.join('\n');
    }
    if (message) {
      return message;
    }
    return '';
  },
};
export default ServiceBase;
