import React, { useState, useEffect } from 'react';
import useMultiLanguage from 'core/hooks/UseMultiLanguage';
import EditCorporateContent from 'components/cm/cm.16.corporate/cm.16.corporate.edit/views/EditCorporateContent';

const EditCorporateScreen = (props) => {
  const lang = useMultiLanguage();
  useEffect(() => {}, []);
  return (
    <>
      <EditCorporateContent name="editCorporate" lang={lang} />
    </>
  );
};

export default EditCorporateScreen;
