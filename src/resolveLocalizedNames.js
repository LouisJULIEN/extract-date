// @flow

import monthsData from './months.json';
import daysData from './days.json';

const stripDiacritics = (text: string) => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

const enMonths = monthsData.en;
const enDays = daysData.en;

// Cache: locale -> Map<lowercaseName, englishName>
const monthLookupCache: {[string]: {[string]: string}} = {};
const dayLookupCache: {[string]: {[string]: string}} = {};

const buildMonthLookup = (locale: string): {[string]: string} => {
  if (monthLookupCache[locale]) {
    return monthLookupCache[locale];
  }

  const localeData = monthsData[locale];

  if (!localeData) {
    monthLookupCache[locale] = {};

    return monthLookupCache[locale];
  }

  const lookup = {};

  for (const monthNum of Object.keys(localeData)) {
    const names = localeData[monthNum];
    const enNames = enMonths[monthNum];

    for (let i = 0; i < names.length; i++) {
      const enName = enNames[i < enNames.length ? i : 0];

      lookup[names[i].toLowerCase()] = enName.charAt(0).toUpperCase() + enName.slice(1);
    }
  }

  monthLookupCache[locale] = lookup;

  return lookup;
};

const buildDayLookup = (locale: string): {[string]: string} => {
  if (dayLookupCache[locale]) {
    return dayLookupCache[locale];
  }

  const localeData = daysData[locale];

  if (!localeData) {
    dayLookupCache[locale] = {};

    return dayLookupCache[locale];
  }

  const lookup = {};

  for (const dayNum of Object.keys(localeData)) {
    const names = localeData[dayNum];
    const enNames = enDays[dayNum];

    for (let i = 0; i < names.length; i++) {
      const enName = enNames[i < enNames.length ? i : 0];

      lookup[names[i].toLowerCase()] = enName.charAt(0).toUpperCase() + enName.slice(1);
    }
  }

  dayLookupCache[locale] = lookup;

  return lookup;
};

export const replaceMonthName = (word: string, locale: string, accentless: boolean): string | null => {
  const lookup = buildMonthLookup(locale);
  const lower = word.toLowerCase();

  if (lookup[lower]) {
    return lookup[lower];
  }

  if (accentless) {
    const strippedWord = stripDiacritics(lower);

    for (const key of Object.keys(lookup)) {
      if (stripDiacritics(key) === strippedWord) {
        return lookup[key];
      }
    }
  }

  return null;
};

export const replaceDayName = (word: string, locale: string, accentless: boolean): string | null => {
  const lookup = buildDayLookup(locale);
  const lower = word.toLowerCase();

  if (lookup[lower]) {
    return lookup[lower];
  }

  if (accentless) {
    const strippedWord = stripDiacritics(lower);

    for (const key of Object.keys(lookup)) {
      if (stripDiacritics(key) === strippedWord) {
        return lookup[key];
      }
    }
  }

  return null;
};
