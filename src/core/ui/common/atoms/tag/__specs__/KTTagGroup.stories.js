import React from 'react';
import { withDesign } from 'storybook-addon-designs';
import KTTag from '../kt-tag';

export default {
  title: 'KTDesign/Atoms/KTTag.Group',
  component: KTTag.Group,
  decorators: [withDesign],
  argTypes: {
    tags: {
      description: 'Mảng các đối tượng tag',
      name: 'tags',
      control: { required: true },
      defaultValue: [],
    },
    maxCount: {
      description: 'Số lượng tag được hiển thị',
      name: 'maxCount',
      control: { required: false },
      defaultValue: 2,
    },
    maxPopoverPlacement: {
      description: 'Vị trí hiển thị tooltip các tag còn lại',
      name: 'maxPopoverPlacement',
      options: ['left', 'top', 'bottom', 'right'],
      control: { type: 'select', required: false },
      defaultValue: 'bottom',
    },
    className: {
      control: { required: false },
    },
  },
};

const Default = (args) => (
  <KTTag.Group tags={args.tags} maxCount={args.maxCount} />
);

Default.args = {
  tags: [
    { label: 'Toán', type: 'secondary', bold: true },
    { label: 'Vật lý', type: 'secondary', bold: true },
    { label: 'GDCD', type: 'secondary', bold: true },
    { label: 'STEM', type: 'secondary', bold: true },
    { label: 'Khối 1', type: 'primary', bold: true },
    { label: 'Khối 2', type: 'primary', bold: true },
    { label: 'Khối 3', type: 'primary', bold: true },
    { label: 'Khối 4', type: 'primary', bold: true },
    { label: 'Khối 5', type: 'primary', bold: true },
    { label: 'Khối 6', type: 'primary', bold: true },
    { label: 'subject_06', type: 'info', bold: true },
    { label: 'subject_07', type: 'info', bold: true },
    { label: 'subject_08', type: 'info', bold: true },
    { label: 'danger_09', type: 'danger', bold: true },
    { label: 'danger_10', type: 'danger', bold: true },
    { label: 'Khối 7', type: 'danger', bold: true },
    { label: 'Khối 8', type: 'primary', bold: true },
    { label: 'Khối 9', type: 'primary', bold: true },
    { label: 'Khối 10', type: 'primary', bold: true },
    { label: 'Khối 11', type: 'primary', bold: true },
    { label: 'Khối 12', type: 'primary', bold: true },
  ],
  maxCount: 2,
};

export { Default };
