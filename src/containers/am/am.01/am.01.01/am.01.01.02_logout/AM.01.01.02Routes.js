import { lazy } from 'react';
import { KTPublicLayout } from 'core/ui';

const A01HomeScreen = lazy(() =>
  import(
    'containers/am/am.01/am.01.01/am.01.01.02_logout/AM.01.01.02LogoutScreen'
  ),
);
const A0Routes = [
  {
    path: '/logout',
    name: 'Tổng quan',
    layout: KTPublicLayout,
    component: A01HomeScreen,
    isPublic: true,
    exact: true,
  },
];

export default A0Routes;
