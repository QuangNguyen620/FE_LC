import { useEffect, useState } from 'react';
import i18n from 'i18next';

export default function useMultiLanguage() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [lang, setLang] = useState('vi');
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    let langCode = urlParams.get('lang');
    // đổi ngôn ngữ trong danh sách hỗ trợ
    if (['vi', 'en'].includes(langCode)) {
      console.log('Detech url language: ' + langCode);
      i18n.changeLanguage(langCode);
    }
    // nếu không truyền url thì mặc đình falback về ngôn ngữ của trình duyệt
    langCode = i18n.language || window.localStorage.i18nextLng;
    // update thẻ <html lang="" >
    document.documentElement.lang = langCode;
    // update lang property
    setLang(langCode);
    return;
  }, []); // Empty array ensures that effect is only run on mount
  return lang;
}
