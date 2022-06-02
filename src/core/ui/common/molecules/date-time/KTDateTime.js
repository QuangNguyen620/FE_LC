import moment from 'moment';
import { KTBodyText } from 'core/ui';
import React from 'react';

const KTDateTime = ({
  dateTime,
  color = 'body',
  size = 5,
  format = 'DD/MM/YYYY HH:mm:ss',
}) => {
  if (dateTime) {
    const formatDateTime = moment(dateTime, 'YYYY-MM-DD HH:mm:ss').format(
      format,
    );

    return (
      <KTBodyText color={color} size={size}>
        {formatDateTime}
      </KTBodyText>
    );
  }

  return <></>;
};

export default KTDateTime;
