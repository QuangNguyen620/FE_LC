import React, { useState, useEffect } from 'react';
import AM010104Authorize from 'components/am/am.01/am.01.04/am.01.04.01_admin-bank_fpt_admin/function/am.01.04.01_authorize/views/AM.01.04.01BankAdmin_Authorize';
import useMultiLanguage from 'core/hooks/UseMultiLanguage';

const AM010104AuthorizeScreen = (props) => {
  const lang = useMultiLanguage();
  useEffect(() => {
    const componentDidMount = async () => {
      // hàm khởi tạo
    };
    componentDidMount();
  }, []);
  return (
    <>
      <AM010104Authorize name="AM010104Authorize" lang={lang} />
    </>
  );
};

export default AM010104AuthorizeScreen;
