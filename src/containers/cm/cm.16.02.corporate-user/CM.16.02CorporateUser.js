import React, { useState, useEffect } from 'react';
import CM1602 from 'components/cm/cm.16.2.corporate-user/views/CM.16.02MainViewContent';
import useMultiLanguage from 'core/hooks/UseMultiLanguage';

const CM1602View = (props) => {
  const lang = useMultiLanguage();
  // useEffect(() => {
  //   const componentDidMount = async () => {
  //     // hàm khởi tạo
  //   };
  //   componentDidMount();
  // }, []);
  return (
    <>
      <CM1602 name="CM1602" lang={lang} />
    </>
  );
};

export default CM1602View;
