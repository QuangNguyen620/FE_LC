import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Col, Row, Form, Card, Spin } from 'antd';
import moment from 'moment';
import {} from '@ant-design/icons';
import { KTTitle } from 'core/ui';
import log from '../ModuleLogger';
import { FUNDING_LIMIT_STATUS } from '../../../../../../../core/common/Constant';
import '../../../common/less/BM010301.less';
import { BM010601Domain } from '../domains/BM010601EditDomain';
import BM010601EditStatus3 from './components/BM010601EditStatus3';
import BM010601EditStatus2 from './components/BM010601EditStatus2';

const BM010601ViewContent = ({ lang = 'vi', ...props }) => {
  const { t } = useTranslation();
  const dateFormatList = 'DD/MM/YYYY';
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

  useEffect(() => {
    form.setFieldsValue({
      bankId: context?.fundingLimit?.releaseBank,
      typeLimit: context?.fundingLimit?.typeLimit,
      contractNumberLimit: context?.fundingLimit?.contractNumberLimit,
      dateRange: moment(context?.fundingLimit?.dateRange, dateFormatList),
      expirationDate: moment(
        context?.fundingLimit?.expirationDate,
        dateFormatList,
      ),
      totalLimit: context?.fundingLimit?.totalLimit,
      moneyType: context?.fundingLimit?.moneyType,
      descriptionOfTransactions:
        context?.fundingLimit?.descriptionOfTransactions,
      requestARefund: context?.fundingLimit?.requestARefund,
    });
  }, [context]);

  return (
    <>
      <div className={'main-container'}>
        <Spin spinning={context?.loading}>
          {context?.fundingLimit?.status ==
            FUNDING_LIMIT_STATUS.TU_CHOI_DUYET && (
            <div>
              <Form form={form} layout="horizontal">
                <BM010601EditStatus3 form={form} />
              </Form>
            </div>
          )}
          {context?.fundingLimit?.status == FUNDING_LIMIT_STATUS.DA_DUYET && (
            <div>
              <Form
                form={form}
                // onFinish={domain.createApplicationOpeningLc}
                layout="horizontal"
              >
                <BM010601EditStatus2 form={form} />
              </Form>
            </div>
          )}
        </Spin>
      </div>
    </>
  );
};

export default BM010601ViewContent;
