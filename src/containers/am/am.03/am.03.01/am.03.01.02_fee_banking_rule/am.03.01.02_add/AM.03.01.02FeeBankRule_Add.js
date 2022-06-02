import React, { useState, useEffect } from 'react';
import AM030102View from 'components/am/am.03/am.03.01/am.03.01.02_bank_fee_rules/function/am.03.01.02_add/views/AM.03.01.02_Add';
import useMultiLanguage from 'core/hooks/UseMultiLanguage';

const AM030102ViewAdd = (props) => {
  const lang = useMultiLanguage();
  useEffect(() => {
    const componentDidMount = async () => {
      // hàm khởi tạo
    };
    componentDidMount();
  }, []);
  return (
    <>
      <AM030102View name="AM030102View" lang={lang} />
    </>
  );
};

export default AM030102ViewAdd;
