import { lazy } from 'react';
import { LCCMMainLayout } from 'core/ui';

const mainScreen = lazy(() =>
  import('containers/cm/cm.04/cm.04.02.contract_seller/CM.04.02'),
);

const viewSignScreen = lazy(() =>
  import(
    'containers/cm/cm.04/cm.04.02.contract_seller/cm.04.02_view/CM.04.02_ViewSign'
  ),
);
const A0Routes = [
  {
    path: '/cm-home/contract-seller/',
    name: 'Ký hợp đồng mua bán',
    layout: LCCMMainLayout,
    component: mainScreen,
    isPublic: true,
    exact: true,
  },
  {
    path: '/cm-home/contract-seller/sign/:id',
    name: 'Ký hợp đồng mua bán',
    layout: LCCMMainLayout,
    component: viewSignScreen,
    isPublic: true,
  },
];

export default A0Routes;
