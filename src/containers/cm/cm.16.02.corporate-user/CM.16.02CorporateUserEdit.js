import React, { useState, useEffect } from 'react';
import CM1602EditContent from 'components/cm/cm.16.2.corporate-user/cm.16.2.corporate-user.edit/views/CM.16.02EditContent';
import useMultiLanguage from 'core/hooks/UseMultiLanguage';

const CM1602EditView = (props) => {
  const lang = useMultiLanguage();
  // useEffect(() => {
  //   const componentDidMount = async () => {
  //     // hàm khởi tạo
  //   };
  //   componentDidMount();
  // }, []);
  return (
    <>
      <CM1602EditContent name="CM1602-edit" lang={lang} />
    </>
  );
};

export default CM1602EditView;
