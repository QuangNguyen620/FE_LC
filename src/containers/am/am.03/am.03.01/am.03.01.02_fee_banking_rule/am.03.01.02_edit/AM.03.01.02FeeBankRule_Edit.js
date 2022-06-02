import React, { useState, useEffect } from 'react';
import AM030102Edit from 'components/am/am.03/am.03.01/am.03.01.02_bank_fee_rules/function/am.03.01.02_edit/views/AM.03.01.02_Edit';
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
      <AM030102Edit name="AM030102Edit" lang={lang} />
    </>
  );
};

export default A01HomeScreen;
