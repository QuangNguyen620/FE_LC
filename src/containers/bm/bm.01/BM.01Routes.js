import { lazy } from 'react';
import { KTPublicLayout } from 'core/ui';

const BM0101LoginView = lazy(() =>
  import('containers/bm/bm.01/bm.01.01.login/BM.01.01.Container'),
);

const BM0102LogoutView = lazy(() =>
  import('containers/bm/bm.01/bm.01.02.logout/BM.01.02.Container'),
);

const BM0103LogoutView = lazy(() =>
  import('containers/bm/bm.01/bm.01.03.forget-password/BM.01.03.Container'),
);
const BM0104ForgetPassView = lazy(() =>
  import('containers/bm/bm.01/bm.01.04.change-password/BM.01.04.Container'),
);

const BM01Routes = [
  {
    path: '/bm-login',
    name: 'BM.01.01-Login',
    layout: KTPublicLayout,
    component: BM0101LoginView,
    isPublic: true,
    exact: true,
  },
  {
    path: '/bm-logout',
    name: 'BM.01.02-Logout',
    layout: KTPublicLayout,
    component: BM0102LogoutView,
    isPublic: true,
    exact: true,
  },
  {
    path: '/bm-forgetpass',
    name: 'BM.01.03-ForgetPass',
    layout: KTPublicLayout,
    component: BM0103LogoutView,
    isPublic: true,
    exact: true,
  },
  {
    path: '/bm-changepass',
    name: 'BM.01.04-ChangePass',
    layout: KTPublicLayout,
    component: BM0104ForgetPassView,
    isPublic: true,
    exact: true,
  },
];

export default BM01Routes;
