import { lazy } from 'react';
import { LCMainLayout } from 'core/ui';

const mainScreen = lazy(() =>
  import(
    'containers/am/am.01/am.01.05/am.01.05.02_corporate_user/AM.01.05.02CorporateUser'
  ),
);

const addScreen = lazy(() =>
  import(
    'containers/am/am.01/am.01.05/am.01.05.02_corporate_user/am.01.05.02_add/AM.01.05.02_Add'
  ),
);

const viewScreen = lazy(() =>
  import(
    'containers/am/am.01/am.01.05/am.01.05.02_corporate_user/am.01.05.02_view/AM.01.05.02_view'
  ),
);
const editScreen = lazy(() =>
  import(
    'containers/am/am.01/am.01.05/am.01.05.02_corporate_user/am.01.05.02_edit/AM.01.05.02_edit'
  ),
);

const authorizeScreen = lazy(() =>
  import(
    'containers/am/am.01/am.01.05/am.01.05.02_corporate_user/am.01.05.02_authorize/AM.01.05.02_authorize'
  ),
);

const AM010502Routes = [
  {
    path: '/home/corporate-user',
    name: ' Quản lý người dùng doanh nghiệp',
    layout: LCMainLayout,
    component: mainScreen,
    isPublic: true,
    exact: true,
  },
  {
    path: '/home/corporate-user/add',
    name: ' Quản lý người dùng doanh nghiệp - Thêm mới',
    layout: LCMainLayout,
    component: addScreen,
    isPublic: true,
    exact: true,
  },
  {
    path: '/home/corporate-user/view/:id',
    name: ' Quản lý nhóm người dùng Admin ngân hàng & FPT quản trị',
    layout: LCMainLayout,
    component: viewScreen,
    isPublic: true,
  },
  {
    path: '/home/corporate-user/edit/:id',
    name: ' Quản lý nhóm người dùng Admin ngân hàng & FPT quản trị',
    layout: LCMainLayout,
    component: editScreen,
    isPublic: true,
  },
  {
    path: '/home/corporate-user/authorize/:id',
    name: ' Quản lý nhóm người dùng Admin ngân hàng & FPT quản trị',
    layout: LCMainLayout,
    component: authorizeScreen,
    isPublic: true,
  },
];

export default AM010502Routes;
