import React, { useState, useEffect } from 'react';
import AM010103View from 'components/am/am.01/am.01.01/am.01.01.03_forget-pass/views/AM.01.01.03ForgetPassView';
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
      <AM010103View name="AM010103" lang={lang} />
    </>
  );
};

export default A01HomeScreen;
