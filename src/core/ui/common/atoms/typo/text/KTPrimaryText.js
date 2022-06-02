import React from 'react';
import KTText from './KTText';

export const KTPrimaryText = ({ children, ...rest }) => {
  return <KTText {...rest}>{children}</KTText>;
};

KTPrimaryText.propTypes = KTText.propTypes;

KTPrimaryText.defaultProps = {
  theme: 'light',
  color: 'primary-text',
  size: 4,
};

export default KTPrimaryText;
