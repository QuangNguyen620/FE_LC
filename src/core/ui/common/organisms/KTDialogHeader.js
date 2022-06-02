import React from 'react';
import { PageHeader } from 'antd';
import { KTGuideButtons } from 'core/ui/common/molecules/KTGuideButtons';
import KTIconButton from '../atoms/button/KTIconButton';
import { CloseOutlined } from '@ant-design/icons';

export const KTDialogHeader = React.memo(({ title, guides = {}, onClose }) => {
  return (
    <PageHeader
      style={{
        padding: '0px',
        height: '40px',
        backgroundColor: '#ffffff',
      }}
      title={title}
      extra={
        <KTIconButton onClick={onClose}>
          <CloseOutlined />
        </KTIconButton>
      }
      subTitle={<KTGuideButtons {...guides} />}
    ></PageHeader>
  );
});
