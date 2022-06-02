import React, { useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';

import { KTButton } from 'core/ui/common/atoms/button';
import { Primary as KTButtonDefault } from 'core/ui/common/atoms/button/__specs__/KTButton.stories';

import { KTListLayout } from '../KTListLayout';
import { Default as KTPageHeaderDefault } from 'core/ui/common/organisms/__specs__/KTPageHeader.stories';
import { StoreProvider } from 'core/store/store';
import useKTListLayout from '../KTListLayoutDomain';

export default {
  title: 'KTDesign/Templates/KTListLayout',
  component: KTListLayout,
  decorators: [
    (Story, options) => {
      console.log(`decorators`);
      return (
        <StoreProvider>
          <div
            style={{
              padding: '0rem !important',
            }}
          >
            <Story {...options} />
          </div>
        </StoreProvider>
      );
    },
  ],
};

// Wrapper component dùng để khởi tạo giá trị store và handle sự kiện thay đổi dữ liệu trên storybook
const KTWrapper = React.memo((args) => {
  const { listLayout, header } = args;
  const domain = useKTListLayout()[1];

  useEffect(() => {
    console.log(`updated listLayout` + JSON.stringify(listLayout));
    if (listLayout) {
      domain.updateLayout(listLayout);
    }
  }, [listLayout, domain]);

  console.log(`render KTWrapper`);
  return (
    <KTListLayout name="Storybook">
      <KTListLayout.Header {...header}></KTListLayout.Header>
      <KTListLayout.Content>
        <span>Đây là nội dung bên trong</span>
      </KTListLayout.Content>
      <KTListLayout.Search>
        <span>Đây là nội dung search</span>
      </KTListLayout.Search>
    </KTListLayout>
  );
});

const Template = (args) => <KTWrapper {...args} />;
export const Default = Template.bind({});
Default.args = {
  listLayout: {
    searchCollapsed: true,
    searchQueries: {},
  },
  header: {
    ...KTPageHeaderDefault.args,
    children: [
      <KTButton {...KTButtonDefault.args}>
        Button
        <PlusOutlined />
      </KTButton>,
    ],
  },
};
