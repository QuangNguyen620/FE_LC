import React, { useState, useEffect } from 'react';
import useMultiLanguage from 'core/hooks/UseMultiLanguage';
import CreateCorporateContent from 'components/am/am.01/am.01.05/am.01.05.01_corporate_customer/function/am.01.05.01_add/upload/views/CreateCorporateUploadFileContent';
const CreateCorporateScreen = (props) => {
  const lang = useMultiLanguage();
  useEffect(() => {}, []);
  return (
    <>
      <CreateCorporateContent name="CreateCorporate" lang={lang} />
    </>
  );
};

export default CreateCorporateScreen;
