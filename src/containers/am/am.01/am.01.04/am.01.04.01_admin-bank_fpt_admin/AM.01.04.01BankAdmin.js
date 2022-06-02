import React, { useState, useEffect } from 'react';
import AM010104View from 'components/am/am.01/am.01.04/am.01.04.01_admin-bank_fpt_admin/views/AM.01.04.01BankAdmin';
import useMultiLanguage from 'core/hooks/UseMultiLanguage';

const AM010104HomeScreen = (props) => {
  const lang = useMultiLanguage();
  useEffect(() => {
    const componentDidMount = async () => {
      // hàm khởi tạo
    };
    componentDidMount();
  }, []);
  return (
    <>
      <AM010104View name="AM010104" lang={lang} />
    </>
  );
};

export default AM010104HomeScreen;
