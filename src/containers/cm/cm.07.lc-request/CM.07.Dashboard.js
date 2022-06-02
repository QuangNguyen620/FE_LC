import React, { useState, useEffect } from 'react';
import useMultiLanguage from 'core/hooks/UseMultiLanguage';
import CM07Dashboard from 'components/cm/cm.07.lc-releash-request/views/CM.07.Dashboard';

const CM07Screen = (props) => {
  const lang = useMultiLanguage();
  useEffect(() => {}, []);
  return (
    <>
      <CM07Dashboard name="CM07Dashboard" lang={lang} />
    </>
  );
};

export default CM07Screen;
