import React, { useState, useEffect } from 'react';
import useMultiLanguage from 'core/hooks/UseMultiLanguage';
import CM0708 from 'components/cm/cm.07.lc-releash-request/function/cm.07.08/views/CM.07.08.ca-lc';

const CM07Screen = (props) => {
  const lang = useMultiLanguage();
  useEffect(() => {}, []);
  return (
    <>
      <CM0708 name="CM0708" lang={lang} />
    </>
  );
};

export default CM07Screen;
