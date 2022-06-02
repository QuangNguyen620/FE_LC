import React, { useEffect } from 'react';
import AM010503View from 'components/am/am.01/am.01.05/am.01.05.03_corporate_account/views/AM.01.05.03.corporate-account-manage.js';
import useMultiLanguage from 'core/hooks/UseMultiLanguage';

const AM010502MainScreen = (props) => {
  const lang = useMultiLanguage();
  useEffect(() => {
    const componentDidMount = async () => {
      // hàm khởi tạo
    };
    componentDidMount();
  }, []);
  return (
    <>
      <AM010503View name="AM010503View" lang={lang} />
    </>
  );
};

export default AM010502MainScreen;
