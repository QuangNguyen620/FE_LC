import { lazy } from 'react';
import { LCCMMainLayout } from 'core/ui';

const EditCorporate = lazy(() =>
  import('containers/cm/cm.16.corporate/EditCorporate'),
);

const EditCorporateRoutes = [
  {
    path: '/cm-home/edit-corporate',
    name: 'Edit Corporate',
    layout: LCCMMainLayout,
    component: EditCorporate,
    isPublic: true,
    exact: true,
  },
];

export default EditCorporateRoutes;
