import React from 'react';

import { withDesign } from 'storybook-addon-designs';
import { KTButton, KT_BUTTON_TYPES } from '../';
import { KT_BUTTON_SIZES } from '../KTButton';

export default {
  title: 'KTDesign/Atoms/KTButton',
  component: KTButton,
  decorators: [withDesign],
  argTypes: {
    children: {
      description: 'Nội dung text',
      defaultValue: 'KTButton',
      control: { type: 'text', required: false },
    },
    tooltip: {
      control: { type: 'text', required: false },
      description: 'Nội dung tooltip',
      defaultValue: KTButton.defaultProps.tooltip,
    },
    theme: {
      description: 'Kiểu theme light|dark của nút',
      options: ['light', 'dark'],
      control: { type: 'select', required: false },
      defaultValue: 'light',
    },
    type: {
      description: 'Kiểu style của nút',
      options: KT_BUTTON_TYPES,
      control: { type: 'select', required: false },
      defaultValue: KTButton.defaultProps.type,
    },
    tag: {
      description: 'Tag',
      name: 'tag',
      control: { required: false },
      defaultValue: KTButton.defaultProps.tag,
    },
    size: {
      description: 'Kích thước của nút',
      options: KT_BUTTON_SIZES,
      control: { type: 'radio', required: false },
      defaultValue: KTButton.defaultProps.size,
    },
    block: {
      description: 'button block type',
      name: 'block',
      control: { required: false },
      defaultValue: KTButton.defaultProps.block,
    },
    ghost: {
      description: 'button ghost type',
      name: 'ghost',
      control: { required: false },
      defaultValue: KTButton.defaultProps.ghost,
    },
    dashed: {
      description: 'button dashed border',
      name: 'dashed',
      control: { required: false },
      defaultValue: KTButton.defaultProps.dashed,
    },
  },
};

const Template = (props) => <KTButton {...props} />;

export const Default = Template.bind({});
Default.parameters = {
  jest: ['KTButton.test.js'],
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/GzqFXu12wtjKBJNBFQI2Zm/Khao-thi?node-id=5311%3A15195',
  },
};

Default.args = KTButton.defaultProps;

const Primary = Template.bind({});
Primary.args = {
  ...KTButton.defaultProps,
  type: 'primary',
};

const PrimaryTag = Template.bind({});
PrimaryTag.args = {
  ...KTButton.defaultProps,
  type: 'primary',
  tag: true,
};

const Secondary = Template.bind({});
Secondary.args = {
  ...KTButton.defaultProps,
  type: 'secondary',
};

const Success = Template.bind({});
Success.args = {
  ...KTButton.defaultProps,
  type: 'success',
};

const Danger = Template.bind({});
Danger.args = {
  ...KTButton.defaultProps,
  type: 'danger',
};

const Warning = Template.bind({});
Warning.args = {
  ...KTButton.defaultProps,
  type: 'warning',
};

const Info = Template.bind({});
Info.args = {
  ...KTButton.defaultProps,
  type: 'info',
};

const Ghost = Template.bind({});
Ghost.args = {
  ...KTButton.defaultProps,
  type: 'primary',
  ghost: true,
};

const Dashed = Template.bind({});
Dashed.args = {
  ...KTButton.defaultProps,
  type: 'dashed',
};

const DashedGhost = Template.bind({});
DashedGhost.args = {
  ...KTButton.defaultProps,
  type: 'primary',
  ghost: true,
  dashed: true,
};

const Link = Template.bind({});
Link.args = {
  ...KTButton.defaultProps,
  type: 'link',
  ghost: true,
};

const Title = Template.bind({});
Title.args = {
  ...KTButton.defaultProps,
  type: 'title',
  ghost: true,
};

const PrimaryText = Template.bind({});
PrimaryText.args = {
  ...KTButton.defaultProps,
  type: 'primary-text',
  ghost: true,
};

export {
  Primary,
  PrimaryTag,
  Secondary,
  Success,
  Info,
  Warning,
  Danger,
  Ghost,
  Dashed,
  Link,
  Title,
  PrimaryText,
};
