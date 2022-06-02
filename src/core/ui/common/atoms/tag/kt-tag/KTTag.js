import { Tag } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import './KTTag.less';

const KT_TAG_COLORS = [
  'default',
  'primary',
  'success',
  'secondary',
  'info',
  'success',
  'danger',
  'warning',
];

const KTTag = ({ type, className = '', bold, simple, children, ...rest }) => {
  return (
    <Tag
      className={[
        'KTTag',
        className,
        type ? `KTTag-type-${type}` : '',
        bold ? 'KTTag-bold' : '',
        simple ? 'KTTag-simple' : '',
      ]}
      {...rest}
    >
      {children}
    </Tag>
  );
};

KTTag.propTypes = {
  type: PropTypes.oneOf(KT_TAG_COLORS),
  bold: PropTypes.bool,
  simple: PropTypes.bool,
};

KTTag.defaultProps = {
  type: 'default',
  bold: false,
  simple: false,
};

export { KT_TAG_COLORS };

export default KTTag;
