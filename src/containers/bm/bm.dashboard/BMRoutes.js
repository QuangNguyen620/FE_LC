import { lazy } from 'react';
import { LCBMMainLayout } from 'core/ui';

const BMDashboard = lazy(() =>
  import('containers/bm/bm.dashboard/BMDashboard'),
);

const BMRoutes = [
  {
    path: '/bm-home',
    name: 'Dashboard',
    layout: LCBMMainLayout,
    component: BMDashboard,
    isPublic: true,
    exact: true,
  },
];

export default BMRoutes;
