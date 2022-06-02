import React, { useState, useEffect } from 'react';
import useMultiLanguage from 'core/hooks/UseMultiLanguage';
import CM0704 from 'components/cm/cm.07.lc-releash-request/function/cm.07.04/views/CM.07.04.edit-lc';

const CM07Screen = (props) => {
  const lang = useMultiLanguage();
  useEffect(() => {}, []);
  return (
    <>
      <CM0704 name="CM0704ew" lang={lang} />
    </>
  );
};

export default CM07Screen;
