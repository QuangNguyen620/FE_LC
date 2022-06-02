import React from 'react';

import {
  KTText,
  KTTitle,
  KTSubTitle,
  KTPrimaryText,
  KTBodyText,
  KT_TEXT_COLORS,
  KT_TEXT_SIZES,
} from '../index';
import KTEllipsisTooltip from '../KTEllipsisTooltip';

const getArgTypes = (component) => {
  return {
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
      description: 'Màu sắc chữ',
      defaultValue: component.defaultProps.color,
      options: KT_TEXT_COLORS,
      control: { type: 'select' },
    },
    size: {
      description: 'Kích thước chữ',
      defaultValue: component.defaultProps.size,
      options: KT_TEXT_SIZES,
      control: { type: 'select' },
    },
  };
};

// Default
const Default = (args) => <KTText {...args}>This is demo KTText</KTText>;
Default.argTypes = getArgTypes(KTText);
Default.args = KTText.defaultProps;

// Title
const Title = (args) => <KTTitle {...args}>This is demo KTTitle</KTTitle>;
Title.argTypes = getArgTypes(KTTitle);
Title.args = KTTitle.defaultProps;

// Sub Title
const SubTitle = (args) => (
  <KTSubTitle {...args}>This is demo KTSubTitle</KTSubTitle>
);
SubTitle.argTypes = getArgTypes(KTSubTitle);
SubTitle.args = KTSubTitle.defaultProps;

// Primary Text
const PrimaryText = (args) => (
  <KTPrimaryText {...args}>This is demo KTPrimaryText</KTPrimaryText>
);
PrimaryText.argTypes = getArgTypes(KTPrimaryText);
PrimaryText.args = KTPrimaryText.defaultProps;

// Body Text
const BodyText = (args) => (
  <KTBodyText {...args}>This is demo KTBodyText</KTBodyText>
);
BodyText.argTypes = getArgTypes(KTBodyText);
BodyText.args = KTBodyText.defaultProps;

const EllipsisTooltip = (args) => (
  <div
    style={{
      width: 150,
    }}
  >
    <KTEllipsisTooltip title={args.longText}>
      <KTPrimaryText color="primary" size={4}>
        {args.longText}
      </KTPrimaryText>
    </KTEllipsisTooltip>
  </div>
);
EllipsisTooltip.args = {
  longText: 'Đây là đoạn nội dung rất dài',
};

export { Default, Title, PrimaryText, SubTitle, BodyText, EllipsisTooltip };

export default {
  title: 'KTDesign/Atoms/KTText',
  jest: ['KTText.test.js'],
  design: {
    type: 'figma',
    url: '',
  },
};
