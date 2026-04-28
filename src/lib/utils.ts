import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { useTranslation } from 'react-i18next';
import type { BilingualString } from '../data';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Extracts a plain English string from a BilingualString or passthrough string.
 *  Use this outside of React render context (e.g. URL builders, event handlers). */
export function getString(value: string | BilingualString | undefined): string {
  if (!value) return '';
  return typeof value === 'string' ? value : (value.en || '');
}

/** Hook that returns a resolver for BilingualString values based on the active i18n language. */
export function useLocalise() {
  const { i18n } = useTranslation();
  return (value: BilingualString | string | undefined): string => {
    if (!value) return '';
    if (typeof value === 'string') return value;
    return i18n.language === 'zh' ? value.zh : value.en;
  };
}
