import React, { useEffect } from 'react';
import AM010402View from 'components/am/am.01/am.01.04/am.01.04.02_admin-bank_fpt_admin_user/function/am.01.04.02_view/views/AM.01.04.02BankAdminUser_View';
import useMultiLanguage from 'core/hooks/UseMultiLanguage';

const AM010402ViewScreen = (props) => {
  const lang = useMultiLanguage();
  useEffect(() => {
    const componentDidMount = async () => {
      // hàm khởi tạo
    };
    componentDidMount();
  }, []);
  return (
    <>
      <AM010402View name="AM010402View" lang={lang} />
    </>
  );
};

export default AM010402ViewScreen;
