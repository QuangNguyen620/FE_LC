import { lazy } from 'react';
import { LCMainLayout } from 'core/ui';

const mainScreen = lazy(() =>
  import(
    'containers/am/am.01/am.01.04/am.01.04.01_admin-bank_fpt_admin/AM.01.04.01BankAdmin'
  ),
);

const addScreen = lazy(() =>
  import(
    'containers/am/am.01/am.01.04/am.01.04.01_admin-bank_fpt_admin/am.01.04.01_add/AM.01.04.01BankAdmin_Add'
  ),
);

const viewScreen = lazy(() =>
  import(
    'containers/am/am.01/am.01.04/am.01.04.01_admin-bank_fpt_admin/am.01.04.01_view/AM.01.04.01BankAdmin_View'
  ),
);

const editScreen = lazy(() =>
  import(
    'containers/am/am.01/am.01.04/am.01.04.01_admin-bank_fpt_admin/am.01.04.01_edit/AM.01.04.01BankAdmin_Edit'
  ),
);

const authorizeScreen = lazy(() =>
  import(
    'containers/am/am.01/am.01.04/am.01.04.01_admin-bank_fpt_admin/am.01.04.01_authorize/AM.01.04.01BankAdmin_Authorize'
  ),
);

const A0Routes = [
  {
    path: '/home/bank-fpt-admin-manage',
    name: ' Quản lý nhóm người dùng Admin ngân hàng & FPT quản trị',
    layout: LCMainLayout,
    component: mainScreen,
    isPublic: true,
    exact: true,
  },
  {
    path: '/home/bank-fpt-admin-manage/add',
    name: ' Quản lý nhóm người dùng Admin ngân hàng & FPT quản trị',
    layout: LCMainLayout,
    component: addScreen,
    isPublic: true,
    exact: true,
  },
  {
    path: '/home/bank-fpt-admin-manage/view/:id',
    name: ' Quản lý nhóm người dùng Admin ngân hàng & FPT quản trị',
    layout: LCMainLayout,
    component: viewScreen,
    isPublic: true,
  },
  {
    path: '/home/bank-fpt-admin-manage/edit/:id',
    name: ' Quản lý nhóm người dùng Admin ngân hàng & FPT quản trị',
    layout: LCMainLayout,
    component: editScreen,
    isPublic: true,
  },
  {
    path: '/home/bank-fpt-admin-manage/authorize/:id',
    name: ' Quản lý nhóm người dùng Admin ngân hàng & FPT quản trị',
    layout: LCMainLayout,
    component: authorizeScreen,
    isPublic: true,
  },
];

export default A0Routes;
