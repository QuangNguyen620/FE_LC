import 'antd/dist/antd.less';
import React from 'react';
import { MemoryRouter } from 'react-router';
import { addDecorator } from '@storybook/react';
import { withTests } from '@storybook/addon-jest';
import { MINIMAL_VIEWPORTS } from '@storybook/addon-viewport';
import results from '.jest-test-results.json';
import KTTheme from './theme.js';
// .storybook/preview.js

addDecorator((story) => (
  <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
));

const customViewports = {
  LaptopHD: {
    name: 'Laptop HD(1377x768)',
    styles: {
      width: '1366px',
      height: '768px',
    },
  },
  LaptopHDPlus: {
    name: 'Laptop HD+(1600x900)',
    styles: {
      width: '1600px',
      height: '900px',
    },
  },
  LaptopFullHD: {
    name: 'Laptop Full HD(1920x1080)',
    styles: {
      width: '1920px',
      height: '1080px',
    },
  },
};

export const decorators = [
  withTests({
    results,
  }),
];

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  viewport: {
    viewports: {
      ...customViewports,
      ...MINIMAL_VIEWPORTS,
    },
    // defaultViewport: "LaptopHD"
  },
  viewMode: 'docs',
  docs: {
    theme: KTTheme,
  },
};
