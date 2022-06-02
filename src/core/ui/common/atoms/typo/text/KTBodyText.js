import React from 'react';
import KTText from './KTText';

export const KTBodyText = ({
  children,
  theme = 'light',
  color = 'body',
  size = 4,
  ...rest
}) => {
  return (
    <KTText theme={theme} color={color} size={size} {...rest}>
      {children}
    </KTText>
  );
};

KTBodyText.propTypes = KTText.propTypes;

KTBodyText.defaultProps = {
  theme: 'light',
  color: 'body',
  size: 4,
};

export default KTBodyText;
