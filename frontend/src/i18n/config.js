import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
    en: {
        translation: {
            "welcome": "Welcome to Heritage Farm",
            "discovery": "Discover Tamil Nadu's Hidden Gems",
            "agri_rural": "Agri & Rural",
            "heritage_culture": "Heritage & Culture",
            "eco_adventure": "Eco & Adventure",
            "login": "Login",
            "signup": "Sign Up",
            "become_creator": "Become a Creator",
            "explore": "Explore Now"
        }
    },
    ta: {
        translation: {
            "welcome": "ஹெரிடேஜ் பார்மிற்கு வரவேற்கிறோம்",
            "discovery": "தமிழ்நாட்டின் மறைந்திருக்கும் பொக்கிஷங்களைக் கண்டறியுங்கள்",
            "agri_rural": "வேளாண் மற்றும் கிராமப்புறம்",
            "heritage_culture": "பாரம்பரியம் மற்றும் கலாச்சாரம்",
            "eco_adventure": "சுற்றுச்சூழல் மற்றும் சாகசம்",
            "login": "உள்நுழை",
            "signup": "பதிவு செய்",
            "become_creator": "படைப்பாளராகுங்கள்",
            "explore": "இப்போதே ஆராயுங்கள்"
        }
    }
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: 'en',
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
