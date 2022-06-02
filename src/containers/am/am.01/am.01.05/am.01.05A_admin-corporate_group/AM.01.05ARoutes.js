import { lazy } from 'react';
import { LCMainLayout } from 'core/ui';

const mainScreen = lazy(() =>
  import(
    'containers/am/am.01/am.01.05/am.01.05A_admin-corporate_group/AM.01.05ACorporateGroup'
  ),
);

const addScreen = lazy(() =>
  import(
    'containers/am/am.01/am.01.05/am.01.05A_admin-corporate_group/am.01.05A_add/AM.01.05ACorporateGroup_Add'
  ),
);

const viewScreen = lazy(() =>
  import(
    'containers/am/am.01/am.01.05/am.01.05A_admin-corporate_group/am.01.05A_view/AM.01.05ACorporateGroup_View'
  ),
);

const editScreen = lazy(() =>
  import(
    'containers/am/am.01/am.01.05/am.01.05A_admin-corporate_group/am.01.05A_edit/AM.01.05ACorporateGroup_Edit'
  ),
);

const authorizeScreen = lazy(() =>
  import(
    'containers/am/am.01/am.01.05/am.01.05A_admin-corporate_group/am.01.05A_authorize/AM.01.05ACorporateGroup_Authorize'
  ),
);

const A0Routes = [
  {
    path: '/home/admin-corporate-group',
    name: ' Quản lý nhóm người dùng Doanh nghiệp',
    layout: LCMainLayout,
    component: mainScreen,
    isPublic: true,
    exact: true,
  },
  {
    path: '/home/admin-corporate-group/add',
    name: ' Quản lý nhóm người dùng Doanh nghiệp',
    layout: LCMainLayout,
    component: addScreen,
    isPublic: true,
    exact: true,
  },
  {
    path: '/home/admin-corporate-group/view/:id',
    name: ' Quản lý nhóm người dùng Doanh nghiệp',
    layout: LCMainLayout,
    component: viewScreen,
    isPublic: true,
    exact: true,
  },
  {
    path: '/home/admin-corporate-group/edit/:id',
    name: ' Quản lý nhóm người dùng Doanh nghiệp',
    layout: LCMainLayout,
    component: editScreen,
    isPublic: true,
    exact: true,
  },
  {
    path: '/home/admin-corporate-group/authorize/:id',
    name: ' Quản lý nhóm người dùng Doanh nghiệp',
    layout: LCMainLayout,
    component: authorizeScreen,
    isPublic: true,
    exact: true,
  },
];

export default A0Routes;
