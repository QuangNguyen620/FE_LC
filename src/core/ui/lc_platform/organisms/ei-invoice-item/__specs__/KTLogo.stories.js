import React from 'react';

import KTLogo from '../KTLogo';

export default {
  title: 'KTDesign/Atoms/KTLogo',
  component: KTLogo,
};

export const Default = (args) => <KTLogo {...args} />;

Default.argTypes = {
  theme: {
    description: 'Theme dark/light',
    defaultValue: 'light',
    options: ['light', 'dark'],
    control: { type: 'select', required: false },
    table: {
      type: {
        summary: 'string',
        detail: 'light | dark',
      },
      defaultValue: {
        summary: 'light',
      },
    },
  },
  mode: {
    description: 'Kiểu hiển thị logo|icon',
    defaultValue: 'logo',
    options: ['logo', 'icon'],
    control: { type: 'select' },
  },
  logo: {
    description: 'Đường dẫn url đến logo',
  },
  icon: {
    description: 'Đường dẫn url đến icon',
  },
};
Default.args = KTLogo.defaultProps;
