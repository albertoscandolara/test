import { Language } from "../models/language";

export const englishISOCode: string = "en-GB";
export const frenchISOCode: string = "fr-FR";
export const italianISOCode: string = "it-IT";
export const russianISOCode: string = "ru-RU";

export const defaultLanguage: string = englishISOCode;

export const availableLanguages: Array<string> = [
  englishISOCode,
  italianISOCode,
  frenchISOCode,
  russianISOCode,
];

export const languages: Map<string, Language> = new Map()
  .set(englishISOCode, new Language(englishISOCode, `English`))
  .set(italianISOCode, new Language(italianISOCode, `Italian`))
  .set(frenchISOCode, new Language(frenchISOCode, `French`))
  .set(russianISOCode, new Language(russianISOCode, `Russian`));
