import { lazy } from 'react';
import { LCMainLayout } from 'core/ui';

const mainScreen = lazy(() =>
  import(
    'containers/am/am.01/am.01.04/am.01.04.02_admin-bank_fpt_admin_user/AM.01.04.02BankAdminUser'
  ),
);

const addScreen = lazy(() =>
  import(
    'containers/am/am.01/am.01.04/am.01.04.02_admin-bank_fpt_admin_user/am.01.04.02_add/AM.01.04.02_Add'
  ),
);

const viewScreen = lazy(() =>
  import(
    'containers/am/am.01/am.01.04/am.01.04.02_admin-bank_fpt_admin_user/am.01.04.02_view/AM.01.04.02_view'
  ),
);
const editScreen = lazy(() =>
  import(
    'containers/am/am.01/am.01.04/am.01.04.02_admin-bank_fpt_admin_user/am.01.04.02_edit/AM.01.04.02_edit'
  ),
);

const AM010402Routes = [
  {
    path: '/home/bank-fpt-admin-manage-user',
    name: ' Quản lý nhóm người dùng Admin ngân hàng & FPT quản trị',
    layout: LCMainLayout,
    component: mainScreen,
    isPublic: true,
    exact: true,
  },
  {
    path: '/home/bank-fpt-admin-manage-user/add',
    name: ' Quản lý nhóm người dùng Admin ngân hàng & FPT quản trị',
    layout: LCMainLayout,
    component: addScreen,
    isPublic: true,
    exact: true,
  },
  {
    path: '/home/bank-fpt-admin-manage-user/view/:id',
    name: ' Quản lý nhóm người dùng Admin ngân hàng & FPT quản trị',
    layout: LCMainLayout,
    component: viewScreen,
    isPublic: true,
  },
  {
    path: '/home/bank-fpt-admin-manage-user/edit/:id',
    name: ' Quản lý nhóm người dùng Admin ngân hàng & FPT quản trị',
    layout: LCMainLayout,
    component: editScreen,
    isPublic: true,
  },
];

export default AM010402Routes;
