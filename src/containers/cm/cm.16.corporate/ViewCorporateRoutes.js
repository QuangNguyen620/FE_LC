import { lazy } from 'react';
import { LCCMMainLayout } from 'core/ui';

const ViewCorporate = lazy(() =>
  import('containers/cm/cm.16.corporate/ViewCorporate'),
);

const ViewCorporateRoutes = [
  {
    path: '/cm-home/view-corporate',
    name: 'View Corporate',
    layout: LCCMMainLayout,
    component: ViewCorporate,
    isPublic: true,
    exact: true,
  },
];

export default ViewCorporateRoutes;
