//Am.01.01
import AM010101Routes from 'containers/am/am.01/am.01.01/am.01.01.01_login/AM.01.01.01Routes';
import AM010102Routes from 'containers/am/am.01/am.01.01/am.01.01.02_logout/AM.01.01.02Routes';
import AM010103Routes from 'containers/am/am.01/am.01.01/am.01.01.03_forget-pass/AM.01.01.03Routes';
import AM010104Routes from 'containers/am/am.01/am.01.01/am.01.01.04_change-pass/AM.01.01.04Routes';
//AM01.04
import AM010401Routes from 'containers/am/am.01/am.01.04/am.01.04.01_admin-bank_fpt_admin/AM.01.04.01Routes';
import AM010402Routes from 'containers/am/am.01/am.01.04/am.01.04.02_admin-bank_fpt_admin_user/AM.01.04.02Routes';

//AM0301
import AM030101Routes from 'containers/am/am.03/am.03.01/am.03.01.01_fee_banking_management/AM.03.01.01Routes';
import AM030102Routes from 'containers/am/am.03/am.03.01/am.03.01.02_fee_banking_rule/AM.03.01.02Routes';

//AM01.05
import AM0105ARoutes from 'containers/am/am.01/am.01.05/am.01.05A_admin-corporate_group/AM.01.05ARoutes';
import AM010501Routes from 'containers/am/am.01/am.01.05/am.01.05.01_corporate_customer/AM.01.05.01Routes';
import AM010502Routes from 'containers/am/am.01/am.01.05/am.01.05.02_corporate_user/AM.01.05.02Routes';
import AM010503Routes from 'containers/am/am.01/am.01.05/am.01.05.03_corporate_account/AM.01.05.03Routes';

//Dashboard
import AMDashboardRoutes from 'containers/am/am-dashboard/A1Routes';
//AM01.05
// import AM0105ARoutes from 'containers/am.01.05.01_admin-corporate_group/AM.01.05.01Routes';

//AM.02.13
import AM0213Routes from 'containers/am/am.02/am.02.13_fee-transaction/AM.02.13.Routes';

//CM
import CM01Routes from 'containers/cm/cm.01/CM.01Routes';
import CMDashboard from 'containers/cm/cm.dashboard/CMRoutes';
import CreateCorporateRoutes from 'containers/cm/cm.16.corporate/CreateCorporateRoutes';
import EditCorporateRoutes from 'containers/cm/cm.16.corporate/EditCorporateRoutes';
import ViewCorporateRoutes from 'containers/cm/cm.16.corporate/ViewCorporateRoutes';
import CM1602Routes from 'containers/cm/cm.16.02.corporate-user/CM.16.02Routes';
//CM.04
import CM0401Routes from 'containers/cm/cm.04/cm.04.01.contract_buyer/CM.04.01Routes';
import CM0402Routes from 'containers/cm/cm.04/cm.04.02.contract_seller/CM.04.02Routes';
import CM07Routes from 'containers/cm/cm.07.lc-request/CM07Routes';

//BM
import BM01Routes from 'containers/bm/bm.01/BM.01Routes';
import BMDashboard from 'containers/bm/bm.dashboard/BMRoutes';
import BM010301Routes from 'containers/bm/bm.01.03/bm.01.03.01/BM010301Routes';
import BM010302Routes from 'containers/bm/bm.01.03/bm01.0.3.02/BM010302Routes';
import BM010303Routes from 'containers/bm/bm.01.03/bm.01.03.03/BM010303Routes';
import BM010601Routes from 'containers/bm/bm.01.06/bm.01.06.01/BM010601Routes';
import BM010602Routes from 'containers/bm/bm.01.06/bm.01.06.02/BM010602Routes';
// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config

const routes = [
  ...AM010101Routes,
  ...AM010102Routes,
  ...AM010103Routes,
  ...AM010104Routes,
  ...AM010401Routes,
  ...AM010402Routes,
  ...AM030101Routes,
  ...AM030102Routes,

  ...AM0105ARoutes,
  ...AM010502Routes,
  ...AM010503Routes,

  ...AM010501Routes,
  ...AMDashboardRoutes,
  ...AM0213Routes,
  //CM
  ...CM01Routes,
  ...CMDashboard,
  ...CreateCorporateRoutes,
  ...EditCorporateRoutes,
  ...ViewCorporateRoutes,
  ...CM1602Routes,
  ...CM0401Routes,
  ...CM0402Routes,

  ...CM07Routes,

  //BM
  ...BM01Routes,
  ...BMDashboard,
  ...BM010301Routes,
  ...BM010302Routes,
  ...BM010303Routes,
  ...BM010601Routes,
  ...BM010602Routes
];

export default routes;
