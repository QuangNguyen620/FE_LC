import React, { useEffect } from 'react';
import AM0105AEdit from 'components/am/am.01/am.01.05/am.01.05A_admin-corporate_group/function/am.01.05A_edit/views/AM.01.05ACorporateGroup_Edit';
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
      <AM0105AEdit name="AM0105A" lang={lang} />
    </>
  );
};

export default A01HomeScreen;
