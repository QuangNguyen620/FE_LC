import React from 'react';
import KTText from './KTText';

export const KTTitle = ({ children, ...rest }) => {
  return <KTText {...rest}>{children}</KTText>;
};

KTTitle.propTypes = KTText.propTypes;

KTTitle.defaultProps = {
  theme: 'light',
  color: 'title',
  size: 4,
};

export default KTTitle;
