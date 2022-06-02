import React, { useState, useEffect } from 'react';
import A00HomeView from 'components/am/am.01/am.01.01/am.01.01.01_login/views/AM.01.01.01LoginView';
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
      <A00HomeView name="A00Home" lang={lang} />
    </>
  );
};

export default A01HomeScreen;
