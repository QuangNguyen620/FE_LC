import { message } from 'antd';
import { useRef, useEffect } from 'react';
import { useHistory } from 'react-router';
import CM0402ContextService from '../services/CM.04.02ContextService';
import log from '../ModuleLogger';

var axios = require('axios');

export function useCM0402Domain() {
  const history = useHistory();
  const [context, contextService] = CM0402ContextService();
  const contextRef = useRef(context);

  function convert(str) {
    if (str != undefined && str != null && str != '') {
      var date = new Date(str),
        mnth = ('0' + (date.getMonth() + 1)).slice(-2),
        day = ('0' + date.getDate()).slice(-2);
      return [day, mnth, date.getFullYear()].join('/');
    } else {
      return '';
    }
  }

  useEffect(() => {
    contextRef.current = context;
  }, [context]);

  const initDomain = async () => {
    var contextData = {
      list: [],
    };
    await contextService.initContext(contextData);

    await getAllConstract();
  };

  const getAllConstract = async () => {
    var config = {
      method: 'get',
      url: process.env.REACT_APP_API_BACKEND + '/corporate/contract/getAllByCorporateSeller',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('access_token') + '',
        'Content-Type': 'application/json',
        'Accept-Language': 'vi',
      },
    };
    let response = await axios(config);

    if (response?.data?.code == 200) {
      var tempList = [];
      var stt = 1;
      response.data.data.forEach((constract, index) => {
        var pickData = true;
        var status = '';
        switch (constract.status) {
          // case 0:
          //   status = 'Tạo hợp đồng bên mua';
          //   break;
          // case 1:
          //   status = 'Chờ ký số bên mua';
          //   break;
          // case 2:
          //   status = 'Từ chối ký số bên mua';
          //   break;
          case 3:
            status = 'Chờ xác nhận';
            break;
          case 4:
            status = 'Từ chối xác nhận';
            break;
          case 5:
            status = 'Chờ ký số bên bán';
            break;
          case 6:
            status = 'Từ chối ký số bên bán';
            break;
          case 7:
            status = 'Đã ký số';
            break;
          default:
            pickData = false;
            break;
        }
        if (pickData) {
          var contractValue =
            constract.contractValue
              ?.toString()
              ?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') +
            ' ' +
            constract.currency;
          var contract = {
            stt: stt++,
            contractId: constract.contractId,
            contractCode: constract.contractCode,
            contractNo: constract.contractNo,
            buyerName: constract.buyerCorporate?.corporateName,
            sellerName: constract.sellerCorporate?.corporateName,
            commoditiesName: constract.commodity?.commoditiesName,
            currency: constract.currency,
            contractValue: contractValue,
            status: constract.status,
            contractStatus: status,
            createdBy: constract.createdBy,
            createdDate: convert(constract.createdDate),
            contractEstablishmentDate: constract.contractEstablishmentDate,

            buyerDigitalSigningDate: constract.buyerDigitalSigningDate,
            buyerDigitalSignatureId: constract?.buyerDigitalSignature?.id,
            buyerDigitalSignature: constract?.buyerDigitalSignature?.userName,

            sellerConfirmationDate: constract.sellerConfirmationDate,
            sellerVerifierId: constract?.sellerVerifier?.id,
            sellerVerifier: constract?.sellerVerifier?.userName,

            sellerDigitalSigningDate: constract.sellerDigitalSigningDate,
            sellerDigitalSignatureId: constract?.sellerDigitalSignature?.id,
            sellerDigitalSignature: constract?.sellerDigitalSignature?.userName,

            reasonsForRefusingTheSeller: constract.reasonsForRefusingTheSeller,
          };
          tempList.push(contract);
        }
      });

      console.log(tempList);

      contextService.updateContext({
        ...contextRef.current,
        list: tempList,
      });
    }
    return response.data.data;
  };

  const toAddPage = async (values) => {
    history.push('/cm-home/contract-buyer/add');
  };

  const toSignDigitalHandler = async (id) => {
    history.push(`/cm-home/contract-seller/sign/${id}`);
  };

  const domainInterface = useRef({
    getAllConstract,
    initDomain,
    toAddPage,

    toSignDigitalHandler,
  });
  return [context, domainInterface.current];
}

export default useCM0402Domain;
