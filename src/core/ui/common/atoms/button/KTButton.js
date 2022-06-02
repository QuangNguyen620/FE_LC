import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { Tooltip, Button } from 'antd';
import './KTButton.less';

const KTButton = (props) => {
  return useMemo(() => {
    const {
      tooltip,
      type,
      tag,
      ghost,
      className,
      children,
      dashed,
      blur,
      ...rest
    } = props;

    if (tooltip) {
      return (
        <Tooltip title={tooltip}>
          <Button
            {...rest}
            type={type}
            ghost={ghost}
            className={[
              'KTButton',
              className,
              type ? `KTButton-type-${type}` : '',
              ghost ? 'KTButton-ghost' : '',
              dashed ? 'KTButton-dashed' : '',
              tag ? 'KTButton-tag' : '',
              blur ? 'KTButton-border-blur' : '',
            ]}
          >
            {children}
          </Button>
        </Tooltip>
      );
    }
    return (
      <Button
        {...rest}
        type={type}
        ghost={ghost}
        className={[
          'KTButton',
          className,
          type ? `KTButton-type-${type}` : '',
          ghost ? 'KTButton-ghost' : '',
          dashed ? 'KTButton-dashed' : '',
          tag ? 'KTButton-tag' : '',
          blur ? 'KTButton-border-blur' : '',
        ]}
      >
        {children}
      </Button>
    );
  }, [props]);
};

const KT_BUTTON_TYPES = [
  'default',
  'primary',
  'secondary',
  'success',
  'danger',
  'warning',
  'info',
  'dashed',
  'link',
  'title',
  'primary-text',
  'text',
  'primary-light',
];

const KT_BUTTON_SIZES = ['small', 'middle', 'large'];

KTButton.propTypes = {
  /**
   * block button
   */
  block: PropTypes.bool,
  ghost: PropTypes.bool,
  dashed: PropTypes.bool, // Dashed only worked with ghost = true
  tag: PropTypes.bool,
  /**
   * Tooltip hiển thị
   */
  tooltip: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  /**
   * Kiểu button
   */
  type: PropTypes.oneOf(KT_BUTTON_TYPES),
  /**
   * Kích thước
   */
  size: PropTypes.oneOf(KT_BUTTON_SIZES),

  /**
   * Optional click handler
   */
  onClick: PropTypes.func,
};

KTButton.defaultProps = {
  tag: false,
  block: false,
  ghost: false,
  dashed: false,
  tooltip: null,
  type: 'default',
  size: 'middle',
  onClick: null,
};

export default KTButton;

export { KT_BUTTON_SIZES, KT_BUTTON_TYPES };
