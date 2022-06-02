import React from 'react';
import KTText from './KTText';

export const KTSubTitle = (props) => {
  return <KTText {...props} />;
};

KTSubTitle.propTypes = KTText.propTypes;

KTSubTitle.defaultProps = {
  theme: 'light',
  color: 'subtitle',
  size: 4,
};

export default KTSubTitle;
