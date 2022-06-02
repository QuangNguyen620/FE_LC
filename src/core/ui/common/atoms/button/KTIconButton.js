import React from 'react';
import PropTypes from 'prop-types';
import { Button, Tooltip } from 'antd';
import './KTIconButton.less';

const KT_ICON_BUTTON_COLORS = [
  'default',
  'success',
  'secondary',
  'info',
  'success',
  'danger',
  'warning',
];

const KTIconButton = ({ tooltip, className, children, color, ...rest }) => {
  if (tooltip) {
    return (
      <Tooltip title={tooltip}>
        <Button
          {...rest}
          type="text"
          icon={children}
          size="small"
          className={[
            'KTIconButton',
            className,
            color ? `KTIconButton-color-${color}` : '',
          ]}
        ></Button>
      </Tooltip>
    );
  }
  return (
    <Button
      {...rest}
      type="text"
      icon={children}
      size="small"
      className={[
        'KTIconButton',
        className,
        color ? `KTIconButton-color-${color}` : '',
      ]}
    ></Button>
  );
};

KTIconButton.propTypes = {
  tooltip: PropTypes.string,
  color: PropTypes.oneOf(KT_ICON_BUTTON_COLORS),
  onClick: PropTypes.func,
};

KTIconButton.defaultProps = {
  tooltip: '',
  color: 'default',
  onClick: undefined,
};

export { KT_ICON_BUTTON_COLORS };

export default KTIconButton;
