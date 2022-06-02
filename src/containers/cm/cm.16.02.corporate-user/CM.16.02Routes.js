import { lazy } from 'react';
import { LCCMMainLayout } from 'core/ui';

const mainScreen = lazy(() =>
  import('containers/cm/cm.16.02.corporate-user/CM.16.02CorporateUser'),
);

const viewScreen = lazy(() =>
  import('containers/cm/cm.16.02.corporate-user/CM.16.02CorporateUserView'),
);

const editScreen = lazy(() =>
  import('containers/cm/cm.16.02.corporate-user/CM.16.02CorporateUserEdit'),
);

const authenticationScreen = lazy(() =>
  import(
    'containers/cm/cm.16.02.corporate-user/CM.16.02CorporateUserAuthentication'
  ),
);

const AM010501Routes = [
  {
    path: '/cm-home/corporate-user-manage',
    name: 'Quản Lý Người Dùng Doanh Nghiệp',
    layout: LCCMMainLayout,
    component: mainScreen,
    isPublic: true,
    exact: true,
  },
  {
    path: '/cm-home/corporate-user-manage/view/:id',
    name: ' Quản lý nhóm người dùng Doanh nghiệp',
    layout: LCCMMainLayout,
    component: viewScreen,
    isPublic: true,
    exact: true,
  },
  {
    path: '/cm-home/corporate-user-manage/edit/:id',
    name: ' Quản lý nhóm người dùng Doanh nghiệp',
    layout: LCCMMainLayout,
    component: editScreen,
    isPublic: true,
    exact: true,
  },
  {
    path: '/cm-home/corporate-user-manage/authentication/:id',
    name: ' Quản lý nhóm người dùng Doanh nghiệp',
    layout: LCCMMainLayout,
    component: authenticationScreen,
    isPublic: true,
    exact: true,
  },
];

export default AM010501Routes;
