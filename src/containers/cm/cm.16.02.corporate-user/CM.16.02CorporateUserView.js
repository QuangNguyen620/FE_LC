import React, { useState, useEffect } from 'react';
import CM1602ViewContent from 'components/cm/cm.16.2.corporate-user/cm.16.2.corporate-user.view/views/CM.16.02ViewContent';
import useMultiLanguage from 'core/hooks/UseMultiLanguage';

const CM1602ViewView = (props) => {
  const lang = useMultiLanguage();
  // useEffect(() => {
  //   const componentDidMount = async () => {
  //     // hàm khởi tạo
  //   };
  //   componentDidMount();
  // }, []);
  return (
    <>
      <CM1602ViewContent name="CM1602-view" lang={lang} />
    </>
  );
};

export default CM1602ViewView;
