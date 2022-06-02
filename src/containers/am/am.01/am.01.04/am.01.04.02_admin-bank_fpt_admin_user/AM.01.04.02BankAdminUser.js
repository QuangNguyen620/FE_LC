import React, { useState, useEffect } from 'react';
import AM010402View from 'components/am/am.01/am.01.04/am.01.04.02_admin-bank_fpt_admin_user/views/AM.01.04.02BankAdminUser';
import useMultiLanguage from 'core/hooks/UseMultiLanguage';

const AM010402MainScreen = (props) => {
  const lang = useMultiLanguage();
  useEffect(() => {
    const componentDidMount = async () => {
      // hàm khởi tạo
    };
    componentDidMount();
  }, []);
  return (
    <>
      <AM010402View name="AM010402" lang={lang} />
    </>
  );
};

export default AM010402MainScreen;
