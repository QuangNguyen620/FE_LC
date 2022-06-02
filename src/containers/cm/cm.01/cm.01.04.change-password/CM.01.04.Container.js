import React, { useState, useEffect } from 'react';
import useMultiLanguage from 'core/hooks/UseMultiLanguage';
import CM0104ForgetPass from 'components/cm/cm.01/cm.01.04.change-pass/views/CM.01.04ChangePassView';

const CM0104ChangePassView = (props) => {
  const lang = useMultiLanguage();
  useEffect(() => {}, []);
  return (
    <>
      <CM0104ForgetPass name="cm-changepass" lang={lang} />
    </>
  );
};

export default CM0104ChangePassView;
