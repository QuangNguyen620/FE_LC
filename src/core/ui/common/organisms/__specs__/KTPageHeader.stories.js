import React from 'react';

import { PlusOutlined } from '@ant-design/icons';
import { KTButton } from 'core/ui/common/atoms/button';
import { KTPageHeader } from '../KTPageHeader';

export default {
  title: 'KTDesign/Organisms/KTPageHeader',
  component: KTPageHeader,
  argTypes: {
    guide_text: {},
    onBack: { action: 'quay lại', control: false },
    onTabChange: { action: 'chuyển tab', control: false },
  },
  // parameters: { actions: { argTypesRegex: '^on.*' } },
};

const Template = (args) => {
  return (
    <KTPageHeader {...args}>
      <KTButton type="primary">
        Nút chức năng
        <PlusOutlined />
      </KTButton>
    </KTPageHeader>
  );
};
export const Default = Template.bind({});
Default.args = {
  onBack: false,
  title: 'Tiêu đề trang',
  guides: {
    guide_text: 'Đây là nội dung hướng dẫn',
    doc_url: 'http://docs.khaothi.online',
    video_url: 'https://youtu.be/My20t19_nyw',
  },
};

export const WithBack = Template.bind({});
WithBack.args = {
  title: 'Trang chi tiết có nút back',
  guides: {
    guide_text: 'Đây là nội dung hướng dẫn',
    doc_url: 'http://docs.khaothi.online',
    video_url: 'https://youtu.be/My20t19_nyw',
  },
  onBack: undefined,
};

export const WithTab = Template.bind({});
WithTab.args = {
  title: 'Trang chi tiết có tab',
  guides: {
    guide_text: <span>Đây là nội dung hướng dẫn</span>,
    doc_url: 'http://docs.khaothi.online',
    video_url: 'https://youtu.be/My20t19_nyw',
  },
  tabs: [
    { key: '1', tab: 'Tổng quan' },
    { key: '2', tab: 'Nội dung' },
    { key: '3', tab: 'Phân quyền' },
  ],
  onTabChange: undefined,
  onBack: undefined,
};

export const WithTags = Template.bind({});
WithTags.args = {
  title: 'Trang chi tiết có tham số tìm kiếm',
  guides: {
    guide_text: <span>Đây là nội dung hướng dẫn</span>,
    doc_url: 'http://docs.khaothi.online',
    video_url: 'https://youtu.be/My20t19_nyw',
  },
  query: [
    { key: 'Khối', value: 'Khối 10' },
    { key: 'Khối', value: 'Khối 11' },
    { key: 'Môn học', value: 'Văn' },
  ],
  tabs: [
    { key: '1', tab: 'Tổng quan' },
    { key: '2', tab: 'Nội dung' },
    { key: '3', tab: 'Phân quyền' },
  ],
  onTabChange: undefined,
  onBack: undefined,
};
