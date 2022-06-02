import React, { useState, useEffect } from 'react';
import AM010104View from 'components/am/am.01/am.01.04/am.01.04.01_admin-bank_fpt_admin/function/am.01.04.01_view/views/AM.01.04.01BankAdmin_View';
import useMultiLanguage from 'core/hooks/UseMultiLanguage';

const A01HomeScreen = (props) => {
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

export default A01HomeScreen;
