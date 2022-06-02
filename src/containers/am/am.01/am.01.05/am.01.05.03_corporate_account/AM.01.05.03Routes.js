import { lazy } from 'react';
import { LCMainLayout } from 'core/ui';

const mainScreen = lazy(() =>
  import(
    'containers/am/am.01/am.01.05/am.01.05.03_corporate_account/AM.01.05.03CorporateAccount'
  ),
);

const viewScreen = lazy(() =>
  import(
    'containers/am/am.01/am.01.05/am.01.05.03_corporate_account/am.01.05.03_view/AM.01.05.03_view'
  ),
);

const AM010503Routes = [
  {
    path: '/home/corporate-account',
    name: ' Quản lý tài khoản doanh nghiệp',
    layout: LCMainLayout,
    component: mainScreen,
    isPublic: true,
    exact: true,
  },
  {
    path: '/home/corporate-account/view/:id',
    name: ' Quản lý tài khoản doanh nghiệp',
    layout: LCMainLayout,
    component: viewScreen,
    isPublic: true,
  },
];

export default AM010503Routes;
