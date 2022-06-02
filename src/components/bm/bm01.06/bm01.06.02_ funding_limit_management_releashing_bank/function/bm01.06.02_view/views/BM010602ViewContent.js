/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Form } from 'antd';

import {} from '@ant-design/icons';
import log from '../ModuleLogger';
import { FUNDING_LIMIT_STATUS } from '../../../../../../../core/common/Constant';
import '../../../common/less/BM010301.less';
import { BM010601Domain } from '../domains/BM010602ViewDomain';
import BM010601ViewStatus1Status3 from './components/BM010601ViewStatus1Status3';
import BM010601ViewStatus2 from './components/BM010601ViewStatus2';

const BM010601ViewContent = ({ lang = 'vi', ...props }) => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [context, domain] = BM010601Domain();
  const [form] = Form.useForm();
  useEffect(() => {
    domain.initDomain(id);
    domain.getDetail(id);
  }, []);

  useEffect(() => {
    log.debug('useEffect--', context);
  }, [context]);

  // const cancelHandler = () => {
  //   domain.cancelHandler(id);
  // };

  return (
    <>
      <div className={'main-container'}>
        {/* {(context?.fundingLimit?.status == FUNDING_LIMIT_STATUS.CHO_DUYET ||
          context?.fundingLimit?.status ==
            FUNDING_LIMIT_STATUS.TU_CHOI_DUYET) && (
          <div>
            <Form form={form} layout="horizontal">
              <BM010601ViewStatus1Status3 form={form} />
            </Form>
          </div>
        )} */}
        {context?.fundingLimit?.status == 2 && (
          <div>
            <Form form={form} layout="horizontal">
              <BM010601ViewStatus2 form={form} />
            </Form>
          </div>
        )}
      </div>
    </>
  );
};

export default BM010601ViewContent;
