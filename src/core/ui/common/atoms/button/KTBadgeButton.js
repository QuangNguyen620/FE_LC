import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import KTButton from './KTButton';

const KTBadgeButton = (props) => {
  return useMemo(() => {
    const { count, active, children, ...rest } = props;
    return (
      <KTButton
        className={['KTBadgeButton', active ? 'KTBadgeButton-active' : '']}
        {...rest}
      >
        {children}&nbsp;
        <span
          className={`KTBadgeButton-count ${
            active ? 'KTBadgeButton-count-active' : ''
          }`}
        >
          {count}
        </span>
      </KTButton>
    );
  }, [props]);
};

KTBadgeButton.propTypes = {
  ...KTButton.propTypes,
  active: PropTypes.bool,
  count: PropTypes.string,
};

KTBadgeButton.defaultProps = {
  ...KTButton.defaultProps,
  active: false,
  count: '',
};

export default KTBadgeButton;
