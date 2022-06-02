import React, { useState, useEffect } from 'react';
import useMultiLanguage from 'core/hooks/UseMultiLanguage';
import ViewCorporateContent from 'components/cm/cm.16.corporate/cm.16.corporate.view/views/ViewCorporateContent';

const ViewCorporateScreen = (props) => {
  const lang = useMultiLanguage();
  useEffect(() => {}, []);
  return (
    <>
      <ViewCorporateContent name="viewCorporate" lang={lang} />
    </>
  );
};

export default ViewCorporateScreen;
