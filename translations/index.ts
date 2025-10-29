import { commonTranslations } from './common';
import { landingPageTranslations } from './landing';
import { reportTranslations } from './report';
import { interactiveTranslations } from './interactive';
import { authTranslations } from './auth';

export type Language = 'en' | 'hi' | 'bn' | 'mr' | 'te';

const combinedTranslations = {
    ...commonTranslations,
    ...landingPageTranslations,
    ...reportTranslations,
    ...interactiveTranslations,
    ...authTranslations,
};

export type TranslationKeys = keyof typeof combinedTranslations;

export const translations = (['en', 'hi', 'bn', 'mr', 'te'] as const).reduce(
  (acc, lang) => {
    acc[lang] = {} as Record<TranslationKeys, string>;
    for (const key in combinedTranslations) {
      const typedKey = key as TranslationKeys;
      const translationObject = combinedTranslations[typedKey] as any;
      if (translationObject) {
        acc[lang][typedKey] = translationObject[lang];
      }
    }
    return acc;
  },
  {} as Record<Language, Record<TranslationKeys, string>>
);