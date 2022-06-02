import React, { useState, useEffect } from 'react';
import AM010502Authorize from 'components/am/am.01/am.01.05/am.01.05.02_corporate_user/function/am.01.05.02_authorize/views/AM.01.05.02CorporateUser_Authorize';
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
      <AM010502Authorize name="AM010502" lang={lang} />
    </>
  );
};

export default A01HomeScreen;
