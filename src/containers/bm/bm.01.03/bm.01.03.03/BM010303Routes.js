import { lazy } from 'react';
import { LCBMMainLayout } from 'core/ui';

const BM030103 = lazy(() =>
  import('containers/bm/bm.01.03/bm.01.03.03/BM01.03.03'),
);

const BM030103View = lazy(() =>
  import(
    'containers/bm/bm.01.03/bm.01.03.03/BM.01.03.03_view/BM.01.03.03_view'
  ),
);

const BM030103Edit = lazy(() =>
  import(
    'containers/bm/bm.01.03/bm.01.03.03/BM.01.03.03_edit/BM.01.03.03_edit'
  ),
);

const BM010301Routes = [
  {
    path: '/bm-home/bank-user-authentication-management',
    name: 'Quản lý xác thực người dùng ngân hàng',
    layout: LCBMMainLayout,
    component: BM030103,
    isPublic: true,
    exact: true,
  },
  {
    path: '/bm-home/bank-user-authentication-management/view/:id',
    name: 'Quản lý xác thực người dùng ngân hàng - Xem chi tiết',
    layout: LCBMMainLayout,
    component: BM030103View,
    isPublic: true,
    exact: true,
  },
  {
    path: '/bm-home/bank-user-authentication-management/edit/:id',
    name: 'Quản lý xác thực người dùng ngân hàng - Sửa thông tin',
    layout: LCBMMainLayout,
    component: BM030103Edit,
    isPublic: true,
    exact: true,
  },
];

export default BM010301Routes;
