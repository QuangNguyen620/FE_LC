import React from 'react';
import { withDesign } from 'storybook-addon-designs';
import KTTag from '../kt-tag';

export default {
  title: 'KTDesign/Atoms/KTTag',
  component: KTTag,
  decorators: [withDesign],
  argTypes: {
    type: {
      description: 'Kiểu style',
      options: [
        'default',
        'primary',
        'secondary',
        'info',
        'success',
        'danger',
        'warning',
      ],
      control: { type: 'select', required: false },
      defaultValue: 'default',
    },
    bold: {
      description: 'In đậm',
      name: 'bold',
      control: { required: false },
      defaultValue: false,
    },
    simple: {
      description: 'Tag cơ bản',
      name: 'simple',
      control: { required: false },
      defaultValue: false,
    },
  },
};

const Template = (args) => {
  const { text, ...props } = args;
  return <KTTag {...props}>{text}</KTTag>;
};

const Default = Template.bind({});

Default.parameters = {
  // jest: ['KTTag.test.js'],
  // design: {
  //   type: 'figma',
  //   url: 'https://www.figma.com/file/GzqFXu12wtjKBJNBFQI2Zm/Khao-thi?node-id=5311%3A15195',
  // },
};

Default.args = {
  type: 'default',
  bold: false,
  simple: false,
  text: 'Default',
};

const Primary = Template.bind({});

Primary.args = {
  type: 'primary',
  bold: false,
  text: 'Primary',
};

const Secondary = Template.bind({});

Secondary.args = {
  type: 'secondary',
  bold: false,
  text: 'Secondary',
};

const Success = Template.bind({});

Success.args = {
  type: 'success',
  bold: false,
  text: 'Success',
};

const Danger = Template.bind({});

Danger.args = {
  type: 'danger',
  bold: false,
  text: 'Danger',
};

const Warning = Template.bind({});

Warning.args = {
  type: 'warning',
  bold: false,
  text: 'Warning',
};

const Info = Template.bind({});

Info.args = {
  type: 'info',
  bold: false,
  text: 'Info',
};

export { Default, Primary, Secondary, Success, Danger, Warning, Info };
