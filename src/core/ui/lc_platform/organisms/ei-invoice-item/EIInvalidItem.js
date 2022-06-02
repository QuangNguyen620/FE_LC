import React from 'react';
import PropTypes from 'prop-types';
import logo_light from 'assets/img/brand/logo.png';
import logo_dark from 'assets/img/brand/logo-whitetext.svg';
import logo_dark_collapsed from 'assets/img/brand/logo-empty-dark.svg';
import logo_light_collapsed from 'assets/img/brand/logo-empty-white.svg';

const EIInvalidItem = ({ theme, mode, logo, icon, ...others }) => {
  const { style, className } = others;
  let fallback_src, display_src;
  if (mode == 'icon') {
    fallback_src = theme == 'dark' ? logo_dark_collapsed : logo_light_collapsed;
    display_src = icon ? icon : fallback_src;
  } else {
    fallback_src = theme == 'dark' ? logo_dark : logo_light;
    display_src = logo ? logo : fallback_src;
  }
  return (
    <img alt="..." src={display_src} className={className} style={style} />
  );
};

EIInvalidItem.propTypes = {
  /**
   * Kiểu theme
   */
  theme: PropTypes.oneOf(['light', 'dark']),

  /**
   * Optional: Màu chữ
   */
  mode: PropTypes.oneOf(['logo', 'icon']),
  /**
   * Optional: Url logo
   */
  logo: PropTypes.string,
  /**
   * Optional: Url icon
   */
  icon: PropTypes.string,
};

EIInvalidItem.defaultProps = {
  theme: 'light',
  mode: 'icon',
  logo: '',
  icon: '',
};

export default EIInvalidItem;
