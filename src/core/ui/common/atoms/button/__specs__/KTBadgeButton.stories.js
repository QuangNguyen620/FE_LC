import React from 'react';
import { withDesign } from 'storybook-addon-designs';
import { KT_BUTTON_TYPES } from '../';
import KTBadgeButton, { KT_BUTTON_SIZES } from '../KTBadgeButton';

export default {
  title: 'KTDesign/Atoms/KTBadgeButton',
  component: KTBadgeButton,
  decorators: [withDesign],
  argTypes: {
    children: {
      description: 'Nội dung text',
      defaultValue: 'KTBadgeButton',
      control: { type: 'text', required: false },
    },
    count: {
      description: 'Chỉ số',
      defaultValue: 12,
    },
    active: {
      description: 'button ghost type',
      name: 'active',
      control: { required: false },
      defaultValue: KTBadgeButton.defaultProps.active,
    },
    tooltip: {
      control: { type: 'text', required: false },
      description: 'Nội dung tooltip',
      defaultValue: KTBadgeButton.defaultProps.tooltip,
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
      defaultValue: KTBadgeButton.defaultProps.type,
    },
    size: {
      description: 'Kích thước của nút',
      options: KT_BUTTON_SIZES,
      control: { type: 'radio', required: false },
      defaultValue: KTBadgeButton.defaultProps.size,
    },
    block: {
      description: 'button block type',
      name: 'block',
      control: { required: false },
      defaultValue: KTBadgeButton.defaultProps.block,
    },
    ghost: {
      description: 'button ghost type',
      name: 'ghost',
      control: { required: false },
      defaultValue: KTBadgeButton.defaultProps.ghost,
    },
  },
};

const BadgeButtonTemplate = (props) => <KTBadgeButton {...props} />;

const BadgeButton = BadgeButtonTemplate.bind({});
BadgeButton.args = {
  ...KTBadgeButton.defaultProps,
  type: 'primary',
  count: 12,
  active: false,
};

const BadgeButtonActivate = BadgeButtonTemplate.bind({});
BadgeButtonActivate.args = {
  ...KTBadgeButton.defaultProps,
  type: 'primary',
  count: 12,
  active: true,
};

export { BadgeButton, BadgeButtonActivate };
