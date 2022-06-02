import React, { useState, useEffect } from 'react';
import useMultiLanguage from 'core/hooks/UseMultiLanguage';
import CreateCorporateContent from 'components/cm/cm.16.corporate/cm.16.corporate.create.uploadfile/views/CreateCorporateUploadFileContent';

const CreateCorporateScreen = (props) => {
  const lang = useMultiLanguage();
  useEffect(() => {}, []);
  return (
    <>
      <CreateCorporateContent name="reateCorporate" lang={lang} />
    </>
  );
};

export default CreateCorporateScreen;
