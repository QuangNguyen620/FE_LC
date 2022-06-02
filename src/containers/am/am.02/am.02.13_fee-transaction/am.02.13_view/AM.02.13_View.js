import React, { useState, useEffect } from 'react';
import AM010104View from 'components/am/am.02/am.02.13_feeing_transaction_category/function/am.02.13_view/views/AM.02.13_View';
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
      <AM010104View name="AM010104" lang={lang} />
    </>
  );
};

export default A01HomeScreen;
