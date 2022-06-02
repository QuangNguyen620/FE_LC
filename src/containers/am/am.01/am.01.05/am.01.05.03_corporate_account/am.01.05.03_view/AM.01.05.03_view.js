import React, { useEffect } from 'react';
import AM010503View from 'components/am/am.01/am.01.05/am.01.05.03_corporate_account/function/am.01.05.03_view/views/AM.01.05.03CorporateAccount_View';
import useMultiLanguage from 'core/hooks/UseMultiLanguage';

const AM010503MainScreen = (props) => {
  const lang = useMultiLanguage();
  useEffect(() => {
    const componentDidMount = async () => {
      // hàm khởi tạo
    };
    componentDidMount();
  }, []);
  return (
    <>
      <AM010503View name="AM010503" lang={lang} />
    </>
  );
};

export default AM010503MainScreen;
