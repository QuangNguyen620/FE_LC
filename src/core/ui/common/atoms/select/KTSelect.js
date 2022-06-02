import React from 'react';
import { Select } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import KTTag from 'core/ui/common/atoms/tag/kt-tag';

const KTSelect = ({ children, ...rest }) => {
  const tagRender = (props) => {
    const { label, onClose } = props;
    const onPreventMouseDown = (event) => {
      event.preventDefault();
      event.stopPropagation();
    };
    return (
      <KTTag
        type="primary"
        onMouseDown={onPreventMouseDown}
        closable
        onClose={onClose}
        style={{ marginRight: 3 }}
      >
        {label}
      </KTTag>
    );
  };

  const clearIcon = <CloseOutlined style={{ color: '#FF4D4F' }} />;

  return (
    <Select {...rest} tagRender={tagRender} clearIcon={clearIcon}>
      {children}
    </Select>
  );
};

export default KTSelect;
