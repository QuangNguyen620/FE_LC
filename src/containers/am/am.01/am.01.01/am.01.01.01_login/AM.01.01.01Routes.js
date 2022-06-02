import { lazy } from 'react';
import { KTPublicLayout } from 'core/ui';

const A01HomeScreen = lazy(() =>
  import(
    'containers/am/am.01/am.01.01/am.01.01.01_login/AM.01.01.01LoginScreen'
  ),
);

const A0Routes = [
  {
    path: '/',
    name: 'Tổng quan',
    layout: KTPublicLayout,
    component: A01HomeScreen,
    isPublic: true,
    exact: true,
  },
];

export default A0Routes;
