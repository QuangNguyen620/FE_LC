import React, { useState, useEffect } from 'react';
import useMultiLanguage from 'core/hooks/UseMultiLanguage';
import CM0103ForgetPass from 'components/cm/cm.01/cm.01.03.forget-pass/views/CM.01.03ForgetPassView';

const CM0103ForgetPassView = (props) => {
  const lang = useMultiLanguage();
  useEffect(() => {}, []);
  return (
    <>
      <CM0103ForgetPass name="cm-forgetpass" lang={lang} />
    </>
  );
};

export default CM0103ForgetPassView;
