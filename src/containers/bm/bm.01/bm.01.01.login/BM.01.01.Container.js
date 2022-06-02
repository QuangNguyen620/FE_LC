import React, { useState, useEffect } from 'react';
import useMultiLanguage from 'core/hooks/UseMultiLanguage';
import BM0101Login from 'components/bm/bm.01.01/bm.01.01.01.login/views/BM.01.01LoginView';

const BM0101LoginView = (props) => {
  const lang = useMultiLanguage();
  useEffect(() => {}, []);
  return (
    <>
      <BM0101Login name="bm-login" lang={lang} />
    </>
  );
};

export default BM0101LoginView;
