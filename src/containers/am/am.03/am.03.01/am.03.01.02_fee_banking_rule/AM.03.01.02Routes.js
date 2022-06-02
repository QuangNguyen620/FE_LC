import { lazy } from 'react';
import { LCMainLayout } from 'core/ui';

const mainScreen = lazy(() =>
  import(
    'containers/am/am.03/am.03.01/am.03.01.02_fee_banking_rule/AM.03.01.02FeeBankRule'
  ),
);

const addScreen = lazy(() =>
  import(
    'containers/am/am.03/am.03.01/am.03.01.02_fee_banking_rule/am.03.01.02_add/AM.03.01.02FeeBankRule_Add'
  ),
);

const viewScreen = lazy(() =>
  import(
    'containers/am/am.03/am.03.01/am.03.01.02_fee_banking_rule/am.03.01.02_view/AM.03.01.02FeeBankRule_View'
  ),
);

const editScreen = lazy(() =>
  import(
    'containers/am/am.03/am.03.01/am.03.01.02_fee_banking_rule/am.03.01.02_edit/AM.03.01.02FeeBankRule_Edit'
  ),
);

const A0Routes = [
  {
    path: '/home/fee-bank-rule',
    name: ' Quản lý nhóm người dùng Admin ngân hàng & FPT quản trị',
    layout: LCMainLayout,
    component: mainScreen,
    isPublic: true,
    exact: true,
  },
  {
    path: '/home/fee-bank-rule/add',
    name: ' Quản lý nhóm người dùng Admin ngân hàng & FPT quản trị',
    layout: LCMainLayout,
    component: addScreen,
    isPublic: true,
    exact: true,
  },
  {
    path: '/home/fee-bank-rule/view/:id',
    name: ' Quản lý nhóm người dùng Admin ngân hàng & FPT quản trị',
    layout: LCMainLayout,
    component: viewScreen,
    isPublic: true,
  },
  {
    path: '/home/fee-bank-rule/edit/:id',
    name: ' Quản lý nhóm người dùng Admin ngân hàng & FPT quản trị',
    layout: LCMainLayout,
    component: editScreen,
    isPublic: true,
  },
];

export default A0Routes;
