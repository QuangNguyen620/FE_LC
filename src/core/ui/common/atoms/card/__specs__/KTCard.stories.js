import React from 'react';

import { withDesign } from 'storybook-addon-designs';
import { KTCard, KT_CARD_TYPES } from '../';

export default {
  title: 'KTDesign/Atoms/KTCard',
  component: KTCard,
  decorators: [withDesign],
  argTypes: {
    children: {
      description: 'Nội dung',
      defaultValue: 'KTCard',
    },
    type: {
      description: 'Kiểu style của nút',
      options: KT_CARD_TYPES,
      control: { type: 'select', required: false },
      defaultValue: KTCard.defaultProps.type,
    },
    padding: {
      description: 'Cách lề',
      control: { type: 'number', required: false },
      defaultValue: KTCard.defaultProps.padding,
    },
    enableHover: {
      description: 'Enable hover',
      name: 'enableHover',
      control: { required: false },
      defaultValue: KTCard.defaultProps.enableHover,
    },
    ghost: {
      description: 'Ghost type',
      name: 'ghost',
      control: { required: false },
      defaultValue: KTCard.defaultProps.ghost,
    },
    borderLight: {
      description: 'Only works with GHOST',
      name: 'borderLight',
      control: { required: false },
      defaultValue: KTCard.defaultProps.borderLight,
    },
  },
};

const Template = (props) => <KTCard {...props} />;

const Default = Template.bind({});
Default.args = KTCard.defaultProps;

const Primary = Template.bind({});
Primary.args = {
  ...KTCard.defaultProps,
  type: 'primary',
  children: 'KTCard Primary',
};

const PrimaryGhost = Template.bind({});
PrimaryGhost.args = {
  ...KTCard.defaultProps,
  type: 'primary',
  ghost: true,
  children: 'KTCard Primary Ghost',
};

export { Default, Primary, PrimaryGhost };
