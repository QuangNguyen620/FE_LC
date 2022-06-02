import React from 'react';
import { Space, Tooltip } from 'antd';
import { KTBodyText, KTEllipsisTooltip, KTTag } from 'core/ui';
import { get } from 'lodash';

const KTTagQuery = ({ query, onClose, ...rest }) => (
  <Space key={query ? query.length : 0} {...rest} wrap={true} size={6}>
    {query.map(({ label, maxWidth, value, closable }, index) => {
      return (
        <KTTag
          onClose={() => {
            onClose && onClose(value);
          }}
          closable={closable}
          key={index}
          type="primary"
        >
          {maxWidth ? (
            <Space direction="horizontal" size={3}>
              <KTBodyText size={5}>{label}: </KTBodyText>
              <div
                style={{
                  maxWidth,
                }}
              >
                <KTEllipsisTooltip title={get(value, 'title', value)}>
                  {get(value, 'title', value)}
                </KTEllipsisTooltip>
              </div>
            </Space>
          ) : get(value, 'fullTitle', '') ? (
            <Tooltip title={get(value, 'fullTitle', '')}>
              <KTBodyText size={5}>{label}: </KTBodyText>
              {get(value, 'title', value)}
            </Tooltip>
          ) : (
            <>
              <KTBodyText size={5}>{label}: </KTBodyText>
              {get(value, 'title', value)}
            </>
          )}
        </KTTag>
      );
    })}
  </Space>
);

export default KTTagQuery;
