import React from 'react';
import { Space } from 'antd';
import { KTBodyText, KTHeading } from '../../atoms';
import { useTranslation } from 'react-i18next';

const KTCreatedBy = ({ displayName }) => {
  const { t } = useTranslation();

  return (
    <Space wrap size={0} direction="horizontal" align="baseline">
      <KTBodyText size={5}>{t('base.table.fields.createdBy')}</KTBodyText>
      &nbsp;
      <KTHeading simple level={8} color="title">
        {displayName || t('base.table.others.createdByEmpty')}
      </KTHeading>
    </Space>
  );
};

export default KTCreatedBy;
