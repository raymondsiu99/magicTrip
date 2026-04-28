import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { useTranslation } from 'react-i18next';
import type { BilingualString } from '../data';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
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
