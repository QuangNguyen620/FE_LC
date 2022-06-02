import { lazy } from 'react';
import { LCBMMainLayout } from 'core/ui';

const BM010302 = lazy(() =>
  import('containers/bm/bm.01.03/bm01.0.3.02/BM01.03.02'),
);

const BM010302Add = lazy(() =>
  import('containers/bm/bm.01.03/bm01.0.3.02/BM.01.03.02_add/BM.01.03.02_add'),
);

const BM010302View = lazy(() =>
  import(
    'containers/bm/bm.01.03/bm01.0.3.02/BM.01.03.02_view/BM.01.03.02_view'
  ),
);

const BM010302Edit = lazy(() =>
  import(
    'containers/bm/bm.01.03/bm01.0.3.02/BM.01.03.02_edit/BM.01.03.02_edit'
  ),
);

const BM010302Authorize = lazy(() =>
  import(
    'containers/bm/bm.01.03/bm01.0.3.02/BM.01.03.02_authorize/BM.01.03.02_authorize'
  ),
);
const BM010301Routes = [
  {
    path: '/bm-home/bank-user-management',
    name: 'Quản lý người dùng ngân hàng',
    layout: LCBMMainLayout,
    component: BM010302,
    isPublic: true,
    exact: true,
  },
  {
    path: '/bm-home/bank-user-management/add',
    name: 'Quản lý người dùng ngân hàng - Thêm mới',
    layout: LCBMMainLayout,
    component: BM010302Add,
    isPublic: true,
    exact: true,
  },
  {
    path: '/bm-home/bank-user-management/view/:id',
    name: 'Quản lý người dùng ngân hàng - Xem chi tiết',
    layout: LCBMMainLayout,
    component: BM010302View,
    isPublic: true,
    exact: true,
  },
  {
    path: '/bm-home/bank-user-management/edit/:id',
    name: 'Quản lý người dùng ngân hàng - Sửa thông tin',
    layout: LCBMMainLayout,
    component: BM010302Edit,
    isPublic: true,
    exact: true,
  },
  {
    path: '/bm-home/bank-user-management/authorize/:id',
    name: 'Quản lý người dùng ngân hàng - Phân quyền',
    layout: LCBMMainLayout,
    component: BM010302Authorize,
    isPublic: true,
    exact: true,
  },
];

export default BM010301Routes;
