import React, { useState, useEffect } from 'react';
import useMultiLanguage from 'core/hooks/UseMultiLanguage';
import CM0102Logout from 'components/cm/cm.01/cm.01.02.logout/views/CM.01.02LogoutView';

const CM0102LogoutView = (props) => {
  const lang = useMultiLanguage();
  useEffect(() => {}, []);
  return (
    <>
      <CM0102Logout name="cm-logout" lang={lang} />
    </>
  );
};

export default CM0102LogoutView;
