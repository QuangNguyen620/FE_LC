// .storybook/manager.js
// https://storybook.js.org/docs/react/configure/features-and-behavior

import { addons } from '@storybook/addons';
import KTheme from './theme';

addons.setConfig({
  theme: KTheme,
  panelPosition: 'right',
});