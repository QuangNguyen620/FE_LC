import React, { useState, useEffect } from 'react';
import useMultiLanguage from 'core/hooks/UseMultiLanguage';
import CM0703 from 'components/cm/cm.07.lc-releash-request/function/cm.07.03/views/CM.07.03.view-lc';

const CM07Screen = (props) => {
  const lang = useMultiLanguage();
  useEffect(() => {}, []);
  return (
    <>
      <CM0703 name="CM0703" lang={lang} />
    </>
  );
};

export default CM07Screen;
