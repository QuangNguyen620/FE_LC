import React, { useState, useEffect } from 'react';
import AM010501Edit from 'components/am/am.01/am.01.05/am.01.05.01_corporate_customer/function/am.01.05.01_edit/views/AM.01.05.01CorporateCustomer_Edit';
import useMultiLanguage from 'core/hooks/UseMultiLanguage';

const AM010501EditView = (props) => {
  const lang = useMultiLanguage();
  useEffect(() => {
    const componentDidMount = async () => {
      // hàm khởi tạo
    };
    componentDidMount();
  }, []);
  return (
    <>
      <AM010501Edit name="AM010501Edit" lang={lang} />
    </>
  );
};

export default AM010501EditView;
