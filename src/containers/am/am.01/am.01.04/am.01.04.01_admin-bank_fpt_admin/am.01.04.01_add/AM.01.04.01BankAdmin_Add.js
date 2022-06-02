import React, { useState, useEffect } from 'react';
import AM010104AddView from 'components/am/am.01/am.01.04/am.01.04.01_admin-bank_fpt_admin/function/am.01.04.01_add/views/AM.01.04.01BankAdmin_Add';
import useMultiLanguage from 'core/hooks/UseMultiLanguage';

const AM010104AddViewScreen = (props) => {
  const lang = useMultiLanguage();
  useEffect(() => {
    const componentDidMount = async () => {
      // hàm khởi tạo
    };
    componentDidMount();
  }, []);
  return (
    <>
      <AM010104AddView name="AM010104AddView" lang={lang} />
    </>
  );
};

export default AM010104AddViewScreen;
