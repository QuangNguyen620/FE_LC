import React, { useState, useEffect } from 'react';
import AM010104Edit from 'components/am/am.01/am.01.04/am.01.04.01_admin-bank_fpt_admin/function/am.01.04.01_edit/views/AM.01.04.01BankAdmin_Edit';
import useMultiLanguage from 'core/hooks/UseMultiLanguage';

const AM010104EditScreen = (props) => {
  const lang = useMultiLanguage();
  useEffect(() => {
    const componentDidMount = async () => {
      // hàm khởi tạo
    };
    componentDidMount();
  }, []);
  return (
    <>
      <AM010104Edit name="AM010104Edit" lang={lang} />
    </>
  );
};

export default AM010104EditScreen;
