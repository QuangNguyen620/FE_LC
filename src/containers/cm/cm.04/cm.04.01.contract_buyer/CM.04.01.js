import React, { useState, useEffect } from 'react';
import CM0401View from 'components/cm/cm.04/cm.04.01.contract_buyer/views/CM.04.01ContactBuyer';
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
      <CM0401View name="CM.04.01" lang={lang} />
    </>
  );
};

export default A01HomeScreen;
