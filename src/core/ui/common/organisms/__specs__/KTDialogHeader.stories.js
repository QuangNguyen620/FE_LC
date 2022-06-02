import React from 'react';

import { KTDialogHeader } from '../KTDialogHeader';

export default {
  title: 'KTDesign/Organisms/KTDialogHeader',
  component: KTDialogHeader,
  argTypes: {
    onClose: { action: 'đóng', control: false },
  },
  // parameters: { actions: { argTypesRegex: '^on.*' } },
};

const Template = (args) => <KTDialogHeader {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'Tiêu đề dialog',
  guides: {
    guide_text: 'Đây là nội dung hướng dẫn',
    doc_url: 'http://docs.khaothi.online',
    video_url: 'https://youtu.be/My20t19_nyw',
  },
  onClose: undefined,
};
