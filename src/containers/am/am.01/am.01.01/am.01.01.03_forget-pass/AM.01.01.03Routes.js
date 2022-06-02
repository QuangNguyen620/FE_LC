import { lazy } from 'react';
import { KTPublicLayout } from 'core/ui';

const A01HomeScreen = lazy(() =>
  import(
    'containers/am/am.01/am.01.01/am.01.01.03_forget-pass/AM.01.01.03ForgetPassScreen'
  ),
);

const A0Routes = [
  {
    path: '/forgetpassword',
    name: 'Quên mật khẩu',
    layout: KTPublicLayout,
    component: A01HomeScreen,
    isPublic: true,
    exact: true,
  },
];

export default A0Routes;
