import { lazy } from 'react';
import { LCBMMainLayout } from 'core/ui';

const BM010601Dashboard = lazy(() =>
  import('containers/bm/bm.01.06/bm.01.06.01/bm.01.06.01'),
);

const BM010601Add = lazy(() =>
  import('containers/bm/bm.01.06/bm.01.06.01/bm.01.06.01_add/BM.01.06.01_add'),
);


const BM010601View = lazy(() =>
  import('containers/bm/bm.01.06/bm.01.06.01/bm.01.06.01_view/BM.01.06.01_view'),
);

const BM010601Edit = lazy(() =>
  import('containers/bm/bm.01.06/bm.01.06.01/bm.01.06.01_edit/BM.01.06.01_edit'),
);


const BM010301Routes = [
  {
    path: '/bm-home/funding-limit-management-funding-bank',
    name: 'Quản lý hạn mức tài trợ - Ngân hàng tài trợ',
    layout: LCBMMainLayout,
    component: BM010601Dashboard,
    isPublic: true,
    exact: true,
  },
  {
    path: '/bm-home/funding-limit-management-funding-bank/add',
    name: 'Quản lý hạn mức tài trợ - Ngân hàng tài trợ - Thêm mới',
    layout: LCBMMainLayout,
    component: BM010601Add,
    isPublic: true,
    exact: true,
  },
  {
    path: '/bm-home/funding-limit-management-funding-bank/view/:id',
    name: 'Quản lý hạn mức tài trợ - Ngân hàng tài trợ - Xem',
    layout: LCBMMainLayout,
    component: BM010601View,
    isPublic: true,
    exact: true,
  },
  {
    path: '/bm-home/funding-limit-management-funding-bank/edit/:id',
    name: 'Quản lý hạn mức tài trợ - Ngân hàng tài trợ - Sửa',
    layout: LCBMMainLayout,
    component: BM010601Edit,
    isPublic: true,
    exact: true,
  },
];

export default BM010301Routes;
