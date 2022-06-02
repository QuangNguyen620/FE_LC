import React from 'react';
import PropTypes from 'prop-types';
import { Space } from 'antd';
import { KTBodyText, KTCard, KTHeading } from 'core/ui';
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';

const EIVeriyStatus = ({ status, ...others }) => {
  const { children } = others;
  if (status == 'valid') {
    return (
      <KTCard type="success" padding={12}>
        <Space>
          <CheckCircleFilled
            style={{
              color: '#ffffff',
            }}
          />
          {children ?? (
            <KTHeading level={7} simple color="white">
              Tài liệu được ký số hợp lệ
            </KTHeading>
          )}
        </Space>
      </KTCard>
    );
  } else if (status == 'invalid') {
    return (
      <KTCard type={'danger'} padding={12}>
        <Space align={'start'}>
          <CloseCircleFilled
            style={{
              color: '#ffffff',
            }}
          />
          {children ?? (
            <Space size={4} direction={'vertical'}>
              <KTHeading level={7} simple color="white">
                Tài liệu không được ký số hợp lệ
              </KTHeading>
              <KTBodyText size={4} simple color="white">
                Tài liệu chỉnh sửa sau thời điểm ký
              </KTBodyText>
            </Space>
          )}
        </Space>
      </KTCard>
    );
  }
  return null;
};

EIVeriyStatus.propTypes = {
  /**
   * Trạng thái
   */
  status: PropTypes.oneOf(['', 'valid', 'invalid']),
};

EIVeriyStatus.defaultProps = {
  status: '',
};

export default EIVeriyStatus;
