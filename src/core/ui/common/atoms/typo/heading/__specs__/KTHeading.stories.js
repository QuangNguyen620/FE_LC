import React from 'react';
import KTHeading, { KT_HEADING_COLORS, KT_HEADING_LEVELS } from '../KTHeading';

export default {
  title: 'KTDesign/Atoms/KTHeading',
  component: KTHeading,
  argTypes: {
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
    color: {
      options: KT_HEADING_COLORS,
      control: { type: 'select' },
      defaultValue: KTHeading.defaultProps.color,
    },
    level: {
      options: KT_HEADING_LEVELS,
      control: { type: 'select' },
      defaultValue: KTHeading.defaultProps.level,
    },
    simple: {
      description: 'No margin, display inline. Use when Heading in a Ant Space',
      name: 'simple',
      control: { required: false },
      defaultValue: KTHeading.defaultProps.simple,
    },
  },
};

const Template = (args) => <KTHeading {...args}>Heading</KTHeading>;

const Default = Template.bind({});

Default.args = KTHeading.defaultProps;

export { Default };
