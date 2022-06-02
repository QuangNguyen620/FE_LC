import { lazy } from 'react';
import { LCBMMainLayout } from 'core/ui';

const BM030101 = lazy(() =>
  import('containers/bm/bm.01.03/bm.01.03.01/BM01.03.01'),
);

const BM030101Add = lazy(() =>
  import('containers/bm/bm.01.03/bm.01.03.01/BM.01.03.01_add/BM.01.03.01_add'),
);

const BM030101View = lazy(() =>
  import(
    'containers/bm/bm.01.03/bm.01.03.01/BM.01.03.01_view/BM.01.03.01_view'
  ),
);

const BM030101Edit = lazy(() =>
  import(
    'containers/bm/bm.01.03/bm.01.03.01/BM.01.03.01_edit/BM.01.03.01_edit'
  ),
);

const BM030101Authorize = lazy(() =>
  import(
    'containers/bm/bm.01.03/bm.01.03.01/BM.01.03.01_authorize/BM.01.03.01_authorize'
  ),
);

const BM010301Routes = [
  {
    path: '/bm-home/bank-user-group-management',
    name: 'Quản lý nhóm người dùng ngân hàng',
    layout: LCBMMainLayout,
    component: BM030101,
    isPublic: true,
    exact: true,
  },
  {
    path: '/bm-home/bank-user-group-management/add',
    name: 'Quản lý nhóm người dùng ngân hàng - Thêm mới',
    layout: LCBMMainLayout,
    component: BM030101Add,
    isPublic: true,
    exact: true,
  },
  {
    path: '/bm-home/bank-user-group-management/view/:id',
    name: 'Quản lý nhóm người dùng ngân hàng - Xem chi tiết',
    layout: LCBMMainLayout,
    component: BM030101View,
    isPublic: true,
    exact: true,
  },
  {
    path: '/bm-home/bank-user-group-management/edit/:id',
    name: 'Quản lý nhóm người dùng ngân hàng - Sửa thông tin',
    layout: LCBMMainLayout,
    component: BM030101Edit,
    isPublic: true,
    exact: true,
  },
  {
    path: '/bm-home/bank-user-group-management/authorize/:id',
    name: 'Quản lý nhóm người dùng ngân hàng - Phân quyền',
    layout: LCBMMainLayout,
    component: BM030101Authorize,
    isPublic: true,
    exact: true,
  },
];

export default BM010301Routes;
