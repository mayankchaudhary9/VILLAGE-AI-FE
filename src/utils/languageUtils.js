// import { languages } from "../models/languageData";

import { languages } from "../data/languageData";

export const getTranslations = (lang) => {
  return languages[lang] || languages.en;
};
