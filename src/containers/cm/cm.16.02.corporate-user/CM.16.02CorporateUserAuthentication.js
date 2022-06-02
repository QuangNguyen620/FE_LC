import React, { useState, useEffect } from 'react';
import CM1602AuthenticationContent from 'components/cm/cm.16.2.corporate-user/cm.16.2.corporate-user.authenize/views/CM.16.02ViewAuthenticationContent';
import useMultiLanguage from 'core/hooks/UseMultiLanguage';

const CM1602AuthenticationView = (props) => {
  const lang = useMultiLanguage();
  // useEffect(() => {
  //   const componentDidMount = async () => {
  //     // hàm khởi tạo
  //   };
  //   componentDidMount();
  // }, []);
  return (
    <>
      <CM1602AuthenticationContent name="CM1602-authentication" lang={lang} />
    </>
  );
};

export default CM1602AuthenticationView;
