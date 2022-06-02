import React, { useEffect } from 'react';
import AM010501View from 'components/am/am.01/am.01.05/am.01.05.01_corporate_customer/function/am.01.05.01_view/views/AM.01.05.01CorporateCustomer_View';
import useMultiLanguage from 'core/hooks/UseMultiLanguage';

const AM010501ViewView = (props) => {
  const lang = useMultiLanguage();
  useEffect(() => {
    const componentDidMount = async () => {
      // hàm khởi tạo
    };
    componentDidMount();
  }, []);
  return (
    <>
      <AM010501View name="AM010501View" lang={lang} />
    </>
  );
};

export default AM010501ViewView;
