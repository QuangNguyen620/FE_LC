import React, { useState, useEffect } from 'react';
import useMultiLanguage from 'core/hooks/UseMultiLanguage';
import BM0104ForgetPass from 'components/bm/bm.01.01/bm.01.01.04.change-pass/views/BM.01.04ChangePassView';

const BM0104ChangePassView = (props) => {
  const lang = useMultiLanguage();
  useEffect(() => {}, []);
  return (
    <>
      <BM0104ForgetPass name="cm-changepass" lang={lang} />
    </>
  );
};

export default BM0104ChangePassView;
