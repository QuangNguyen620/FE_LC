const { override, addLessLoader } = require('customize-cra');

module.exports = override(
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      '@primary-color': '#0043A5',
      '@secondary-color': '#00CCD6',
      '@success-color': '#4DD077',
      '@warning-color': '#FF7A45',
      '@error-color': '#FF4D4F',
      '@menu-dark-item-active-bg': '#00ccd6',
      '@text-color': '#262626',
      '@form-item-margin-bottom': '16px',
      '@border-radius-base': '5px',
      '@table-border-color': '#e8e8e8',
    },
  }),
);
