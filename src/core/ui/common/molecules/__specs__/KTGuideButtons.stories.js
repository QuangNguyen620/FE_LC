import React from 'react';

import { KTGuideButtons } from '../KTGuideButtons';

export default {
  title: 'KTDesign/Molecules/KTGuideButtons',
  component: KTGuideButtons,
  argTypes: {},
};

const Template = (args) => <KTGuideButtons {...args} />;
export const Default = Template.bind({});
Default.args = {
  guide_text: (
    <span>
      - Đây là text hướng dẫn 1
      <br />
      - Đây là text hướng dẫn 1
      <br />
      - Đây là text hướng dẫn 1
      <br />
      - Đây là text hướng dẫn 1
      <br />
    </span>
  ),
  doc_url: 'http://docs.khaothi.online',
  video_url: 'https://youtu.be/My20t19_nyw',
};
