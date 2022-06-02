import { lazy } from 'react';
import { LCBMMainLayout } from 'core/ui';

const BM010602 = lazy(() =>
  import('containers/bm/bm.01.06/bm.01.06.02/BM.01.06.02.js'),
);

const BM010602View = lazy(() =>
  import(
    'containers/bm/bm.01.06/bm.01.06.02/BM.01.06.02_view/BM.01.06.02_view'
  ),
);

const BM010301Routes = [
  {
    path: '/bm-home/funding-limit-management-release-bank',
    name: 'Quản lý hạn mức tài trợ - Ngân hàng phát hành',
    layout: LCBMMainLayout,
    component: BM010602,
    isPublic: true,
    exact: true,
  },

  {
    path: '/bm-home/funding-limit-management-release-bank/view/:id',
    name: 'Quản lý hạn mức tài trợ - Ngân hàng phát hành - Xem chi tiết',
    layout: LCBMMainLayout,
    component: BM010602View,
    isPublic: true,
    exact: true,
  },
];

export default BM010301Routes;
