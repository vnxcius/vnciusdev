import { Dictionary, Locale } from '@/types/locales';
import 'server-only'

const dictionaries = {
  en: () => import('@/locales/en.json').then((module) => module.default),
  br: () => import('@/locales/br.json').then((module) => module.default),
};
 
export const getDictionary = async (locale: Locale): Promise<Dictionary> => {
  if (!dictionaries[locale]) {
    throw new Error(`Locale ${locale} is not supported.`);
  }
  return dictionaries[locale]();
};