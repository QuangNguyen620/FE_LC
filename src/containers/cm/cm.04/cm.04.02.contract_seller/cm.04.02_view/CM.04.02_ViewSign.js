import React, { useState, useEffect } from 'react';
import CM0401ViewSign from 'components/cm/cm.04/cm.04.02.contract_seller/fuction/cm.04.02_view/views/ViewFileContractSign';
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
      <CM0401ViewSign name="CM0401ViewSign" lang={lang} />
    </>
  );
};

export default A01HomeScreen;
