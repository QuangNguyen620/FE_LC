import { lazy } from 'react';
import { KTPublicLayout } from 'core/ui';

const CM0101LoginView = lazy(() =>
  import('containers/cm/cm.01/cm.01.01.login/CM.01.01.Container'),
);

const CM0102LogoutView = lazy(() =>
  import('containers/cm/cm.01/cm.01.02.logout/CM.01.02.Container'),
);

const CM0103LogoutView = lazy(() =>
  import('containers/cm/cm.01/cm.01.03.forget-password/CM.01.03.Container'),
);
const CM0104LogoutView = lazy(() =>
  import('containers/cm/cm.01/cm.01.04.change-password/CM.01.04.Container'),
);

const CM01Routes = [
  {
    path: '/login',
    name: 'CM.01.01-Login',
    layout: KTPublicLayout,
    component: CM0101LoginView,
    isPublic: true,
    exact: true,
  },
  {
    path: '/logout',
    name: 'CM.01.02-Logout',
    layout: KTPublicLayout,
    component: CM0102LogoutView,
    isPublic: true,
    exact: true,
  },
  {
    path: '/forgetpass',
    name: 'CM.01.03-ForgetPass',
    layout: KTPublicLayout,
    component: CM0103LogoutView,
    isPublic: true,
    exact: true,
  },
  {
    path: '/changepass',
    name: 'CM.01.04-ChangePass',
    layout: KTPublicLayout,
    component: CM0104LogoutView,
    isPublic: true,
    exact: true,
  },
];

export default CM01Routes;
