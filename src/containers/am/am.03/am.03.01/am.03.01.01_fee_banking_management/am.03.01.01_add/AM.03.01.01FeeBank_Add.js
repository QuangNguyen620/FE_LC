import React, { useEffect } from 'react';
import AM010104View from 'components/am/am.03/am.03.01/am.03.01.01_fee_banking_management/function/am.03.01.01_add/views/AM.03.01.01FeeBank_Add';
import useMultiLanguage from 'core/hooks/UseMultiLanguage';

const A01HomeScreen = (props) => {
  const lang = useMultiLanguage();
  useEffect(() => {
    const componentDidMount = async () => {
      // hàm khởi tạo
    };
    componentDidMount();
  }, []);
  return (
    <>
      <AM010104View name="AM010104View" lang={lang} />
    </>
  );
};

export default A01HomeScreen;
