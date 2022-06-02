import { lazy } from 'react';
import { LCCMMainLayout } from 'core/ui';

const mainScreen = lazy(() =>
  import('containers/cm/cm.04/cm.04.01.contract_buyer/CM.04.01'),
);

const addScreen = lazy(() =>
  import(
    'containers/cm/cm.04/cm.04.01.contract_buyer/cm.04.01_add/CM.04.01_Add'
  ),
);

const viewScreen = lazy(() =>
  import(
    'containers/cm/cm.04/cm.04.01.contract_buyer/cm.04.01_view/CM.04.01_View'
  ),
);

const editScreen = lazy(() =>
  import(
    'containers/cm/cm.04/cm.04.01.contract_buyer/cm.04.01_edit/CM.04.01_Edit'
  ),
);

const viewSignScreen = lazy(() =>
  import(
    'containers/cm/cm.04/cm.04.01.contract_buyer/cm.04.01_view/CM.04.01_ViewSign'
  ),
);

const A0Routes = [
  {
    path: '/cm-home/contract-buyer/',
    name: 'Ký hợp đồng mua bán',
    layout: LCCMMainLayout,
    component: mainScreen,
    isPublic: true,
    exact: true,
  },
  {
    path: '/cm-home/contract-buyer/add',
    name: 'Ký hợp đồng mua bán',
    layout: LCCMMainLayout,
    component: addScreen,
    isPublic: true,
    exact: true,
  },
  {
    path: '/cm-home/contract-buyer/view/:id',
    name: 'Ký hợp đồng mua bán',
    layout: LCCMMainLayout,
    component: viewScreen,
    isPublic: true,
  },
  {
    path: '/cm-home/contract-buyer/edit/:id',
    name: 'Ký hợp đồng mua bán',
    layout: LCCMMainLayout,
    component: editScreen,
    isPublic: true,
  },
  {
    path: '/cm-home/contract-buyer/sign/:id',
    name: 'Ký hợp đồng mua bán',
    layout: LCCMMainLayout,
    component: viewSignScreen,
    isPublic: true,
  },
];

export default A0Routes;
