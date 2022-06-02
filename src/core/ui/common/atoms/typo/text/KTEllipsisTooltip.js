import React, { useState, useRef } from 'react';
import { Tooltip } from 'antd';
import PropTypes from 'prop-types';

const KTEllipsisTooltip = ({ children, title }) => {
  const [visible, setVisible] = useState(false);
  const container = useRef(null);

  const handleVisibleChange = (updatedVisible) => {
    if (container.current.clientWidth < container.current.scrollWidth) {
      setVisible(updatedVisible);
    }
  };

  return (
    <Tooltip
      placement="right"
      visible={visible}
      onVisibleChange={handleVisibleChange}
      title={title}
    >
      <div style={{ display: 'grid', placeItems: 'stretch' }}>
        <div
          ref={container}
          style={{
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
          }}
        >
          {children}
        </div>
      </div>
    </Tooltip>
  );
};

KTEllipsisTooltip.propTypes = {
  children: PropTypes.node,
  title: PropTypes.oneOfType([PropTypes.string]),
};

KTEllipsisTooltip.defaultProps = {
  children: null,
  title: null,
};

export default KTEllipsisTooltip;
