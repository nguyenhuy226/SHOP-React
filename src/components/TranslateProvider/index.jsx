import { createContext, useContext, useEffect, useState } from "react";

const Context = createContext({});

export const t = (key) => {
  return _global?.t?.(key) || key;
};
const _global = {};
export const TranslateProvider = ({
  children,
  translate,
  defaultLang = "en",
}) => {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem("lang") || defaultLang;
  });
  const _t = (key) => {
    return translate?.[lang]?.[key] || key;
  };
  useEffect(() => {
    _global.t = _t;
  }, [_t]);
  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);
  return (
    <Context.Provider value={{ t: _t, setLang, lang }}>
      {children}
    </Context.Provider>
  );
};

export const useTranslate = () => useContext(Context);
