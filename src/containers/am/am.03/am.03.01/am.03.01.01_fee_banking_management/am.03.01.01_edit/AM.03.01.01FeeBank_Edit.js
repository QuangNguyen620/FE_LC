import React, { useState, useEffect } from 'react';
import AM030101Edit from 'components/am/am.03/am.03.01/am.03.01.01_fee_banking_management/function/am.03.01.01_edit/views/AM.03.01.01FeeBank_Edit';
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
      <AM030101Edit name="AM030101Edit" lang={lang} />
    </>
  );
};

export default A01HomeScreen;
