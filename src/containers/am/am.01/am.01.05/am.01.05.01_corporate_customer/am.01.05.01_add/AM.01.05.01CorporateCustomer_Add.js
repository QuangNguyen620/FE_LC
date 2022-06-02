import React, { useState, useEffect } from 'react';
import AM010501Add from 'components/am/am.01/am.01.05/am.01.05.01_corporate_customer/function/am.01.05.01_add/views/AM.01.05.01CorporateCustomer_Add';
import useMultiLanguage from 'core/hooks/UseMultiLanguage';

const AM010501AddView = (props) => {
  const lang = useMultiLanguage();
  useEffect(() => {
    const componentDidMount = async () => {
      // hàm khởi tạo
    };
    componentDidMount();
  }, []);
  return (
    <>
      <AM010501Add name="AM010501Add" lang={lang} />
    </>
  );
};

export default AM010501AddView;
