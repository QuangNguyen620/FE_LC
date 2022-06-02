import React, { useState, useEffect } from 'react';
import useMultiLanguage from 'core/hooks/UseMultiLanguage';
import CM0101Login from 'components/cm/cm.01/cm.01.01_login/views/CM.01.01LoginView';

const CM0101LoginView = (props) => {
  const lang = useMultiLanguage();
  useEffect(() => {}, []);
  return (
    <>
      <CM0101Login name="cm-login" lang={lang} />
    </>
  );
};

export default CM0101LoginView;
