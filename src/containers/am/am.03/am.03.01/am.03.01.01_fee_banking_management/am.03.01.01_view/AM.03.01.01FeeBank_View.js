import React, { useState, useEffect } from 'react';
import AM030101View from 'components/am/am.03/am.03.01/am.03.01.01_fee_banking_management/function/am.03.01.01_view/views/AM.03.01.01FeeBank_View';
import useMultiLanguage from 'core/hooks/UseMultiLanguage';

const A030101HomeScreen = (props) => {
  const lang = useMultiLanguage();
  useEffect(() => {
    const componentDidMount = async () => {
      // hàm khởi tạo
    };
    componentDidMount();
  }, []);
  return (
    <>
      <AM030101View name="AM030101View" lang={lang} />
    </>
  );
};

export default A030101HomeScreen;
