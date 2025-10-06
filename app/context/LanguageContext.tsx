import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { I18nManager } from 'react-native';
import { I18n } from 'i18n-js';
import * as Localization from 'expo-localization';
import en from '@/constants/translations/en';
import ar from '@/constants/translations/ar';

export type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  isRTL: boolean;
  t: (key: string, params?: any) => string;
  changeLanguage: (lang: Language) => Promise<void>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LANGUAGE_STORAGE_KEY = '@mobile_car_wash_language';

// Initialize i18n
const i18n = new I18n({
  en,
  ar,
});

// Set fallback language
i18n.defaultLocale = 'en';
i18n.enableFallback = true;

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');
  const [isRTL, setIsRTL] = useState(false);

  useEffect(() => {
    loadLanguagePreference();
  }, []);

  const loadLanguagePreference = async () => {
    try {
      const savedLanguage = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (savedLanguage === 'ar' || savedLanguage === 'en') {
        setLanguageState(savedLanguage);
        i18n.locale = savedLanguage;
        setIsRTL(savedLanguage === 'ar');
      } else {
        // Default to device locale if available
        const deviceLocale = Localization.locale;
        const deviceLang = deviceLocale && typeof deviceLocale === 'string' && deviceLocale.startsWith('ar') ? 'ar' : 'en';
        setLanguageState(deviceLang);
        i18n.locale = deviceLang;
        setIsRTL(deviceLang === 'ar');
      }
    } catch (error) {
      console.error('Error loading language preference:', error);
    }
  };

  const saveLanguagePreference = async (lang: Language) => {
    try {
      await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    } catch (error) {
      console.error('Error saving language preference:', error);
    }
  };

  const changeLanguage = async (lang: Language) => {
    try {
      // Save preference
      await saveLanguagePreference(lang);

      // Update i18n locale
      i18n.locale = lang;

      // Update RTL state
      const shouldBeRTL = lang === 'ar';
      setIsRTL(shouldBeRTL);

      // Force RTL layout if Arabic
      if (shouldBeRTL !== I18nManager.isRTL) {
        I18nManager.forceRTL(shouldBeRTL);
        // Note: App needs to be restarted for RTL to take full effect
        // You may want to show an alert to the user or use RNRestart
      }

      // Update state
      setLanguageState(lang);
    } catch (error) {
      console.error('Error changing language:', error);
    }
  };

  const t = (key: string, params?: any): string => {
    return i18n.t(key, params);
  };

  return (
    <LanguageContext.Provider value={{ language, isRTL, t, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
