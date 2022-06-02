const DOMAIN_SUCCESS = 1;
const DOMAIN_FAILED = 0;

class DomainResponse {
  constructor(dataObject = {}) {
    this.status = DOMAIN_FAILED;
    this.message_id = '';
    this.errors = {};
    this.data = dataObject;
  }

  isSuccess = () => {
    return this.status === DOMAIN_SUCCESS;
  };

  success = (msg_id, data = null) => {
    this.status = DOMAIN_SUCCESS;
    this.message_id = msg_id;
    if (data != null) {
      this.data = data;
    }
  };

  failed = (msg_id, data = null, errors = null) => {
    this.status = DOMAIN_FAILED;
    this.message_id = msg_id;
    if (data != null) {
      this.data = data;
    }
    if (errors != null) {
      this.errors = errors;
    }
  };
}
export default DomainResponse;
