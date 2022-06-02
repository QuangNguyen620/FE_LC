import { lazy } from 'react';
import { LCMainLayout } from 'core/ui';

const AMDashboard = lazy(() =>
  import('containers/am/am-dashboard/AMDashboard'),
);

const AMRoutes = [
  {
    path: '/home',
    name: 'Dashboard',
    layout: LCMainLayout,
    component: AMDashboard,
    isPublic: true,
    exact: true,
  },
];

export default AMRoutes;
