import React from 'react';
import { Tooltip } from 'antd';
import './KTLevel.less';

const KTLevel = ({ level = 0, name = '', emptyTitle = '', style = {} }) => {
  return (
    <Tooltip title={level ? name : emptyTitle}>
      <span className={`KTLevel KTLevel__level-${level}`} style={style}>
        {new Array(5 - level).fill('').map((_, index) => (
          <span key={index} className="KTLevel__item KTLevel__item-top"></span>
        ))}
        {Array(level)
          .fill('')
          .map((_, index) => (
            <span
              key={index}
              className="KTLevel__item KTLevel__item-bottom"
            ></span>
          ))}
      </span>
    </Tooltip>
  );
};

export default KTLevel;
