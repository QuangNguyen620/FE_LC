import React, { useState, useEffect } from 'react';
import AM030101View from 'components/am/am.03/am.03.01/am.03.01.01_fee_banking_management/views/AM.03.01.01FeeBank';
import useMultiLanguage from 'core/hooks/UseMultiLanguage';

const A030101FeeBank = (props) => {
  const lang = useMultiLanguage();
  useEffect(() => {
    const componentDidMount = async () => {
      // hàm khởi tạo
    };
    componentDidMount();
  }, []);
  return (
    <>
      <AM030101View name="AM030101" lang={lang} />
    </>
  );
};

export default A030101FeeBank;
