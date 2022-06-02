import React, { useState, useEffect } from 'react';
import AM010402AddView from 'components/am/am.01/am.01.04/am.01.04.02_admin-bank_fpt_admin_user/function/am.01.04.02_add/views/AM.01.04.02BankAdminUser_Add';
import useMultiLanguage from 'core/hooks/UseMultiLanguage';

const AM010402AddScreen = (props) => {
  const lang = useMultiLanguage();
  useEffect(() => {
    const componentDidMount = async () => {
      // hàm khởi tạo
    };
    componentDidMount();
  }, []);
  return (
    <>
      <AM010402AddView name="AM010402AddView" lang={lang} />
    </>
  );
};

export default AM010402AddScreen;
