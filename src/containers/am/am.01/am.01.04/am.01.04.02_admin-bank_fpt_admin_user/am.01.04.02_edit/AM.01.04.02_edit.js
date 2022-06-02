import React, { useEffect } from 'react';
import AM010402Edit from 'components/am/am.01/am.01.04/am.01.04.02_admin-bank_fpt_admin_user/function/am.01.04.02_edit/views/AM.01.04.02BankAdminUser_Edit';
import useMultiLanguage from 'core/hooks/UseMultiLanguage';

const AM010402EditScreen = (props) => {
  const lang = useMultiLanguage();
  useEffect(() => {
    const componentDidMount = async () => {
      // hàm khởi tạo
    };
    componentDidMount();
  }, []);
  return (
    <>
      <AM010402Edit name="AM010402Edit" lang={lang} />
    </>
  );
};

export default AM010402EditScreen;
