import React from 'react';
import { Card } from 'antd';
import './KTCard.less';

const KTCard = ({
  type,
  enableHover = false,
  ghost = false,
  borderLight = false,
  padding = 16,
  bodyStyle = {},
  children,
  titleSize = 'middle',
  ...rest
}) => {
  return (
    <Card
      bodyStyle={{ padding, ...bodyStyle }}
      className={[
        'KTCard',
        type ? `KTCard-type-${type}` : '',
        ghost ? 'KTCard-ghost' : '',
        borderLight ? 'KTCard-border-light' : '',
        enableHover ? 'KTCard-hover' : '',
        titleSize ? `KTCard-title-${titleSize}` : '',
      ]}
      {...rest}
    >
      {children}
    </Card>
  );
};

export const KT_CARD_TYPES = [
  'default',
  'primary',
  'secondary',
  'success',
  'danger',
  'warning',
  'info',
  'dashed',
  'gray',
  'error',
];

export const KT_CARD_SIZES = ['large', 'middle', 'small'];

KTCard.defaultProps = {
  type: 'default',
  padding: 16,
  ghost: false,
  borderLight: false,
  enableHover: false,
  titleSize: 'middle',
};

export default KTCard;
