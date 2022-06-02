import React, { useState, useEffect } from 'react';
import useMultiLanguage from 'core/hooks/UseMultiLanguage';
import CM0702 from 'components/cm/cm.07.lc-releash-request/function/cm.07.02/views/CM.07.02.create-lc';

const CM07Screen = (props) => {
  const lang = useMultiLanguage();
  useEffect(() => {}, []);
  return (
    <>
      <CM0702 name="CM0702" lang={lang} />
    </>
  );
};

export default CM07Screen;
