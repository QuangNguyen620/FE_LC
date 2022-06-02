import { lazy } from 'react';
import { LCEmptyLayout } from 'core/ui';

const CreateCorporate = lazy(() =>
  import('containers/cm/cm.16.corporate/CreateCorporate'),
);
const CorporateInfo = lazy(() =>
  import('containers/cm/cm.16.corporate/CreateCorporateCorporateInfo'),
);
const CreateCorporateRoutes = [
  {
    path: '/create-corporate',
    name: 'Create Corporate',
    layout: LCEmptyLayout,
    component: CreateCorporate,
    isPublic: true,
    exact: true,
  },
  {
    path: '/create-corporate/corporate-info',
    name: 'Create Corporate',
    layout: LCEmptyLayout,
    component: CorporateInfo,
    isPublic: true,
    exact: true,
  },
];

export default CreateCorporateRoutes;
