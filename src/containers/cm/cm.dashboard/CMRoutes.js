import { lazy } from 'react';
import { LCCMMainLayout } from 'core/ui';

const CMDashboard = lazy(() =>
  import('containers/cm/cm.dashboard/CMDashboard'),
);

const AMRoutes = [
  {
    path: '/cm-home',
    name: 'Dashboard',
    layout: LCCMMainLayout,
    component: CMDashboard,
    isPublic: true,
    exact: true,
  },
];

export default AMRoutes;
