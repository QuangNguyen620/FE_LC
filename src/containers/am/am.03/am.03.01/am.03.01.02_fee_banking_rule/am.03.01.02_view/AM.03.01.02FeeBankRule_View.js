import React, { useState, useEffect } from 'react';
import AM030102View from 'components/am/am.03/am.03.01/am.03.01.02_bank_fee_rules/function/am.03.01.02_view/views/AM.03.01.02_View';
import useMultiLanguage from 'core/hooks/UseMultiLanguage';

const A030102HomeScreen = (props) => {
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

export default A030102HomeScreen;
