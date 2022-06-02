import React, { useState, useEffect } from 'react';
import AM0213View from 'components/am/am.02/am.02.13_feeing_transaction_category/views/AM.02.13.FeeTransactionCategory';
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
      <AM0213View name="AM.02.13" lang={lang} />
    </>
  );
};

export default A01HomeScreen;
