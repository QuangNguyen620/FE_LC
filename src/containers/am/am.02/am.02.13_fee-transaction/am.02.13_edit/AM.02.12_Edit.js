import React, { useState, useEffect } from 'react';
import AM0213Edit from 'components/am/am.02/am.02.13_feeing_transaction_category/function/am.02.13_edit/views/AM.02.13_Edit';
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
      <AM0213Edit name="AM0213Edit" lang={lang} />
    </>
  );
};

export default A01HomeScreen;
