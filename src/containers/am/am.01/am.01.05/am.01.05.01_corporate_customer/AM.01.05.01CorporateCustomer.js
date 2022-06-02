import React, { useState, useEffect } from 'react';
import AM010501 from 'components/am/am.01/am.01.05/am.01.05.01_corporate_customer/views/AM.01.05.01CorporateCustomer';
import useMultiLanguage from 'core/hooks/UseMultiLanguage';

const AM010501View = (props) => {
  const lang = useMultiLanguage();
  useEffect(() => {
    const componentDidMount = async () => {
      // hàm khởi tạo
    };
    componentDidMount();
  }, []);
  return (
    <>
      <AM010501 name="AM010501" lang={lang} />
    </>
  );
};

export default AM010501View;
