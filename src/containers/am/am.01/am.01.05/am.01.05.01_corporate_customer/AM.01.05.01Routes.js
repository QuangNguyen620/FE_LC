import { lazy } from 'react';
import { LCMainLayout } from 'core/ui';

const mainScreen = lazy(() =>
  import(
    'containers/am/am.01/am.01.05/am.01.05.01_corporate_customer/AM.01.05.01CorporateCustomer'
  ),
);

const uploadToAddScreen = lazy(() =>
  import(
    'containers/am/am.01/am.01.05/am.01.05.01_corporate_customer/am.01.05.01_add/AM.01.05.01CorporateCustomer_Upload'
  ),
);

const addScreen = lazy(() =>
  import(
    'containers/am/am.01/am.01.05/am.01.05.01_corporate_customer/am.01.05.01_add/AM.01.05.01CorporateCustomer_Add'
  ),
);

const viewScreen = lazy(() =>
  import(
    'containers/am/am.01/am.01.05/am.01.05.01_corporate_customer/am.01.05.01_view/AM.01.05.01CorporateCorporate_View'
  ),
);

const editScreen = lazy(() =>
  import(
    'containers/am/am.01/am.01.05/am.01.05.01_corporate_customer/am.01.05.01_edit/AM.01.05.01CorporateCorporate_Edit'
  ),
);

// const authorizeScreen = lazy(() =>
//   import('containers/am.01.05.01_admin-corporate_group/am.01.05.01_authorize/AM.01.05.01CorporateGroup_Authorize'),
// );

const AM010501Routes = [
  {
    path: '/home/corporate-customer',
    name: 'Quản lý khách hàng Doanh nghiệp',
    layout: LCMainLayout,
    component: mainScreen,
    isPublic: true,
    exact: true,
  },
  {
    path: '/home/corporate-customer/uploadToAdd',
    name: 'Quản lý khách hàng Doanh nghiệp-Upload',
    layout: LCMainLayout,
    component: uploadToAddScreen,
    isPublic: true,
    exact: true,
  },
  {
    path: '/home/corporate-customer/add',
    name: 'Quản lý khách hàng Doanh nghiệp-Thêm mới',
    layout: LCMainLayout,
    component: addScreen,
    isPublic: true,
    exact: true,
  },
  {
    path: '/home/corporate-customer/view/:id',
    name: 'Quản lý khách hàng Doanh nghiệp-Xem',
    layout: LCMainLayout,
    component: viewScreen,
    isPublic: true,
    exact: true,
  },
  {
    path: '/home/corporate-customer/edit/:id',
    name: ' Quản lý nhóm người dùng Doanh nghiệp-Chỉnh sửa',
    layout: LCMainLayout,
    component: editScreen,
    isPublic: true,
    exact: true,
  },
  // {
  //   path: '/home/admin-corporate-group/authorize/:id',
  //   name: ' Quản lý nhóm người dùng Doanh nghiệp',
  //   layout: LCMainLayout,
  //   component: authorizeScreen,
  //   isPublic: true,
  //   exact: true,
  // },
];

export default AM010501Routes;
