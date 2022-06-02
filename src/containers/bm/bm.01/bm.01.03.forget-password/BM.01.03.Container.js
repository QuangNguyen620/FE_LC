import React, { useState, useEffect } from 'react';
import useMultiLanguage from 'core/hooks/UseMultiLanguage';
import BM0103ForgetPass from 'components/bm/bm.01.01/bm.01.01.03.forget-pass/views/BM.01.03ForgetPassView';

const BM0103ForgetPassView = (props) => {
  const lang = useMultiLanguage();
  useEffect(() => {}, []);
  return (
    <>
      <BM0103ForgetPass name="bm-forgetpass" lang={lang} />
    </>
  );
};

export default BM0103ForgetPassView;
