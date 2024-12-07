import json from '@/locales/br.json';

export const dictionaries = {
  en: () => import('@/locales/en.json').then((module) => module.default),
  br: () => import('@/locales/br.json').then((module) => module.default),
  // TODO: add spanish translation
  // es: () => import('@/locales/es.json').then((module) => module.default),
};

export type Locale = keyof typeof dictionaries;
export type Dictionary = Awaited<ReturnType<(typeof dictionaries)[Locale]>>;
export type DictionaryJSON = typeof json;