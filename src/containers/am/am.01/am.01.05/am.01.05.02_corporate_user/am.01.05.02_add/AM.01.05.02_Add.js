import React, { useEffect } from 'react';
import AM010502View from 'components/am/am.01/am.01.05/am.01.05.02_corporate_user/function/am.01.05.02_add/views/AM.01.05.02CorporateUser_Add';
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
      <AM010502View name="AM010502" lang={lang} />
    </>
  );
};

export default AM010502MainScreen;
