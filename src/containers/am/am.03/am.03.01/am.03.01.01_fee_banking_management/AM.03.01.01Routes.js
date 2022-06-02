import { lazy } from 'react';
import { LCMainLayout } from 'core/ui';

const mainScreen = lazy(() =>
  import(
    'containers/am/am.03/am.03.01/am.03.01.01_fee_banking_management/AM.03.01.01Feebank'
  ),
);

const addScreen = lazy(() =>
  import(
    'containers/am/am.03/am.03.01/am.03.01.01_fee_banking_management/am.03.01.01_add/AM.03.01.01FeeBank_Add'
  ),
);

const viewScreen = lazy(() =>
  import(
    'containers/am/am.03/am.03.01/am.03.01.01_fee_banking_management/am.03.01.01_view/AM.03.01.01FeeBank_View'
  ),
);

const editScreen = lazy(() =>
  import(
    'containers/am/am.03/am.03.01/am.03.01.01_fee_banking_management/am.03.01.01_edit/AM.03.01.01FeeBank_Edit'
  ),
);

const A0Routes = [
  {
    path: '/home/fee-bank-manage',
    name: ' Quản lý nhóm người dùng Admin ngân hàng & FPT quản trị',
    layout: LCMainLayout,
    component: mainScreen,
    isPublic: true,
    exact: true,
  },
  {
    path: '/home/fee-bank-manage/add',
    name: ' Quản lý nhóm người dùng Admin ngân hàng & FPT quản trị',
    layout: LCMainLayout,
    component: addScreen,
    isPublic: true,
    exact: true,
  },
  {
    path: '/home/fee-bank-manage/view/:id',
    name: ' Quản lý nhóm người dùng Admin ngân hàng & FPT quản trị',
    layout: LCMainLayout,
    component: viewScreen,
    isPublic: true,
  },
  {
    path: '/home/fee-bank-manage/edit/:id',
    name: ' Quản lý nhóm người dùng Admin ngân hàng & FPT quản trị',
    layout: LCMainLayout,
    component: editScreen,
    isPublic: true,
  },
];

export default A0Routes;
