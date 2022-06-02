import { lazy } from 'react';
import { LCCMMainLayout } from 'core/ui';

const CM07Dashboard = lazy(() =>
  import('containers/cm/cm.07.lc-request/CM.07.Dashboard'),
);

const CM0702 = lazy(() => import('containers/cm/cm.07.lc-request/CM.07.02'));

const CM0703 = lazy(() => import('containers/cm/cm.07.lc-request/CM.07.03'));
const CM0704 = lazy(() => import('containers/cm/cm.07.lc-request/CM.07.04'));
const CM0708 = lazy(() => import('containers/cm/cm.07.lc-request/CM.07.08'));

const CreateCorporateRoutes = [
  {
    path: '/cm-home/lc-request-manage',
    name: 'CM.07 Dashboard',
    layout: LCCMMainLayout,
    component: CM07Dashboard,
    isPublic: true,
    exact: true,
  },
  {
    path: '/cm-home/lc-request-manage/add',
    name: 'CM.07.02',
    layout: LCCMMainLayout,
    component: CM0702,
    isPublic: true,
    exact: true,
  },
  {
    path: '/cm-home/lc-request-manage/view/:id',
    name: 'CM.07.03',
    layout: LCCMMainLayout,
    component: CM0703,
    isPublic: true,
    exact: true,
  },
  {
    path: '/cm-home/lc-request-manage/edit/:id',
    name: 'CM.07.03',
    layout: LCCMMainLayout,
    component: CM0704,
    isPublic: true,
    exact: true,
  },
  {
    path: '/cm-home/lc-request-manage/ca/:id',
    name: 'CM.07.03',
    layout: LCCMMainLayout,
    component: CM0708,
    isPublic: true,
    exact: true,
  },
];

export default CreateCorporateRoutes;
