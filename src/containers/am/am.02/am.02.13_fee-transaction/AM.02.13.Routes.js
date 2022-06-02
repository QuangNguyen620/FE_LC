import { lazy } from 'react';
import { LCMainLayout } from 'core/ui';

const mainScreen = lazy(() =>
  import('containers/am/am.02/am.02.13_fee-transaction/AM.02.13'),
);

const addScreen = lazy(() =>
  import(
    'containers/am/am.02/am.02.13_fee-transaction/am.02.13_add/AM.02.13_Add'
  ),
);

const viewScreen = lazy(() =>
  import(
    'containers/am/am.02/am.02.13_fee-transaction/am.02.13_view/AM.02.13_View'
  ),
);

const editScreen = lazy(() =>
  import(
    'containers/am/am.02/am.02.13_fee-transaction/am.02.13_edit/AM.02.12_Edit'
  ),
);

const A0Routes = [
  {
    path: '/home/fee-transaction',
    name: 'Danh mục loại giao dịch tính phí',
    layout: LCMainLayout,
    component: mainScreen,
    isPublic: true,
    exact: true,
  },
  {
    path: '/home/fee-transaction/add',
    name: 'Danh mục loại giao dịch tính phí',
    layout: LCMainLayout,
    component: addScreen,
    isPublic: true,
    exact: true,
  },
  {
    path: '/home/fee-transaction/view/:id',
    name: 'Danh mục loại giao dịch tính phí',
    layout: LCMainLayout,
    component: viewScreen,
    isPublic: true,
  },
  {
    path: '/home/fee-transaction/edit/:id',
    name: 'Danh mục loại giao dịch tính phí',
    layout: LCMainLayout,
    component: editScreen,
    isPublic: true,
  },
];

export default A0Routes;
