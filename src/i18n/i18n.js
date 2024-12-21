import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ar from './translations/ar.js';
import en from './translations/en.js';
import fr from './translations/fr.js';
import esp from './translations/esp.js';
import eta from './translations/eta.js';


i18n.use(initReactI18next).init({
  resources: {
    ar: { translation: ar },
    en: { translation: en },
    fr: { translation: fr },
    esp: { translation: esp },
    eta: { translation: eta },
  },
  lng: 'en', // Langue par défaut
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export default i18n;
