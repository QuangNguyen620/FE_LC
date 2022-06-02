import { Typography } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import './KTHeading.less';

const { Text } = Typography;

const KTHeading = ({
  level,
  color,
  simple,
  normal,
  className = '',
  theme,
  children,
  ...rest
}) => {
  return (
    <Text
      className={[
        'KTHeading',
        className,
        level ? `KTHeading-level-${level}` : '',
        color ? `KTHeading-${theme}-${color}` : '',
        simple ? 'KTHeading-simple' : '',
        normal ? 'KTHeading-normal' : '',
      ]}
      {...rest}
    >
      {children}
    </Text>
  );
};

const KT_HEADING_COLORS = [
  'default',
  'title',
  'body',
  'primary-text',
  'subtitle',
  'disabled',
  'primary',
  'secondary',
  'success',
  'info',
  'danger',
  'warning',
  'white',
];

const KT_HEADING_LEVELS = [1, 2, 3, 4, 5, 6, 7, 8, 9];

KTHeading.propTypes = {
  type: PropTypes.oneOf(KT_HEADING_COLORS),
  level: PropTypes.oneOf(KT_HEADING_LEVELS),
  simple: PropTypes.bool,
};

KTHeading.defaultProps = {
  theme: 'light',
  color: 'default',
  level: 1,
  simple: false,
};

export default KTHeading;

export { KT_HEADING_LEVELS, KT_HEADING_COLORS };
