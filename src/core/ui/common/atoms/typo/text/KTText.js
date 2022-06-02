import React from 'react';
import { Typography } from 'antd';
import PropTypes from 'prop-types';
import './KTText.less';

const { Text } = Typography;

const KTText = ({ theme, size, className = '', color, children, ...rest }) => {
  return (
    <Text
      {...rest}
      className={[
        'KTText',
        className,
        color ? `KTText-${theme}-${color}` : '',
        size ? `KTText-size-${size}` : '',
      ]}
    >
      {children}
    </Text>
  );
};

const KT_TEXT_COLORS = [
  'default',
  'body',
  'title',
  'primary-text',
  'subtitle',
  'disabled',
  // Base color
  'primary',
  'secondary',
  'success',
  'info',
  'danger',
  'warning',
  'white',
];

const KT_TEXT_SIZES = [1, 2, 3, 4, 5, 6];

KTText.propTypes = {
  theme: PropTypes.oneOf(['light', 'dark']),
  color: PropTypes.oneOf(KT_TEXT_COLORS),
  size: PropTypes.oneOf(KT_TEXT_SIZES),
};

KTText.defaultProps = {
  theme: 'light',
  color: 'default',
  size: 4,
};

export { KT_TEXT_COLORS, KT_TEXT_SIZES };

export default KTText;
