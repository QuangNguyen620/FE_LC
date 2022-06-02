import React, { useState, useEffect } from 'react';
import useMultiLanguage from 'core/hooks/UseMultiLanguage';
import BM0102Logout from 'components/bm/bm.01.01/bm.01.01.02.logout/views/BM.01.02LogoutView';

const BM0102LogoutView = (props) => {
  const lang = useMultiLanguage();
  useEffect(() => {}, []);
  return (
    <>
      <BM0102Logout name="bm-logout" lang={lang} />
    </>
  );
};

export default BM0102LogoutView;
