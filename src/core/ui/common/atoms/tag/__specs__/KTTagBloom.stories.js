import React from 'react';
// import { withDesign } from 'storybook-addon-designs';
import KTTagBloom from '../kt-tag-bloom/KTTagBloom';

export default {
  title: 'KTDesign/Atoms/KTTagBloom',
  component: KTTagBloom,
  // decorators: [withDesign],
  argTypes: {
    level: {
      description: 'Mức độ nhận thức',
      options: [1, 3, 5, 7],
      control: { type: 'select', required: true },
      defaultValue: 1,
      table: {
        type: {
          summary: 'int',
          detail: '1 | 3 | 5 | 7',
        },
        defaultValue: {
          summary: '1',
        },
      },
    },
  },
};

const Template = (args) => <KTTagBloom {...args} />;

const Default = Template.bind({});

Default.parameters = {};

Default.args = {
  level: 1,
};

const Biet = Template.bind({});

Biet.args = {
  level: 1,
};

const Hieu = Template.bind({});

Hieu.args = {
  level: 3,
};

const VanDung = Template.bind({});

VanDung.args = {
  level: 5,
};

const VanDungCao = Template.bind({});

VanDungCao.args = {
  level: 7,
};

export { Biet, Hieu, VanDung, VanDungCao };
