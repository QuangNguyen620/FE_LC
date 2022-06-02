import { WithTags as HeaderWithTags } from 'core/ui/common/organisms/__specs__/KTPageHeader.stories';
import React from 'react';

import { KTSimpleLayout } from '../';

export default {
  title: 'KTDesign/Templates/KTSimpleLayout',
  component: KTSimpleLayout,
  decorators: [
    (Story, options) => {
      return (
        <div
          style={{
            padding: '0rem !important',
          }}
        >
          <Story {...options} />
        </div>
      );
    },
  ],
};

const Template = (args) => (
  <KTSimpleLayout name="Storybook">
    <KTSimpleLayout.Header {...args.header}></KTSimpleLayout.Header>
    <KTSimpleLayout.Content>
      <span>{args.content}</span>
    </KTSimpleLayout.Content>
  </KTSimpleLayout>
);
export const Default = Template.bind({});
Default.args = {
  content: 'Đây là nội dung bên trong',
  header: { ...HeaderWithTags.args, onBack: true },
};
