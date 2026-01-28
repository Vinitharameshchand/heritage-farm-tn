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
            "explore": "Explore Now",
            
            // Signup page
            "join_collective": "Join the Collective",
            "signup_description": "Create your account to start exploring or hosting authentic experiences",
            "identify_path": "Identify Your Path",
            "tourist": "Tourist",
            "creator": "Creator",
            "discover_experiences": "Discover Experiences",
            "host_earn": "Host & Earn",
            "full_name": "Full Name",
            "full_name_placeholder": "John Doe",
            "email_address": "Email Address",
            "email_placeholder": "your@email.com",
            "choose_secret_phrase": "Choose Secret Phrase",
            "password_placeholder": "••••••••",
            "creating_identity": "Creating Identity...",
            "initialize_account": "Initialize Account",
            "already_member": "Already part of the heritage?",
            "access_dashboard": "Access Dashboard",
            "terms_agreement": "By initializing your account, you agree to our",
            "terms_of_service": "Terms of Service",
            "and": "and",
            "governance_protocol": "Governance Protocol",
            "error_creating_account": "Error creating account",
            
            // Login page
            "welcome_back": "Welcome Back",
            "login_description": "Continue your authentic journey across Tamil Nadu",
            "password": "Password",
            "forgot": "Forgot?",
            "remember_me": "Remember me for 30 days",
            "decrypting_access": "Decrypting Access...",
            "sign_in_dashboard": "Sign In to Dashboard",
            "or_secure_link": "Or Secure Link",
            "explore_google": "Explore with Google",
            "uncharted_territory": "Uncharted territory?",
            "create_new_identity": "Create New Identity",
            "encrypted_session": "End-to-End Encrypted Session",
            "invalid_login": "Invalid login credentials",
            "oauth_failed": "OAuth verification failed"
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
            "explore": "இப்போதே ஆராயுங்கள்",
            
            // Signup page
            "join_collective": "சமூகத்தில் சேருங்கள்",
            "signup_description": "உண்மையான அனுபவங்களை ஆராய அல்லது வழங்க உங்கள் கணக்கை உருவாக்கவும்",
            "identify_path": "உங்கள் பாதையைத் தேர்வு செய்யவும்",
            "tourist": "சுற்றுலா பயணி",
            "creator": "படைப்பாளர்",
            "discover_experiences": "அனுபவங்களைக் கண்டறியுங்கள்",
            "host_earn": "நடத்தி சம்பாதியுங்கள்",
            "full_name": "முழு பெயர்",
            "full_name_placeholder": "உங்கள் பெயர்",
            "email_address": "மின்னஞ்சல் முகவரி",
            "email_placeholder": "உங்கள்@மின்னஞ்சல்.com",
            "choose_secret_phrase": "கடவுச்சொல்லை தேர்வு செய்யவும்",
            "password_placeholder": "••••••••",
            "creating_identity": "அடையாளம் உருவாக்குகிறது...",
            "initialize_account": "கணக்கைத் தொடங்கவும்",
            "already_member": "ஏற்கனவே பாரம்பரியத்தின் பகுதியா?",
            "access_dashboard": "டாஷ்போர்டை அணுகவும்",
            "terms_agreement": "உங்கள் கணக்கை தொடங்குவதன் மூலம், எங்கள்",
            "terms_of_service": "சேவை விதிமுறைகள்",
            "and": "மற்றும்",
            "governance_protocol": "ஆளுகை நெறிமுறை",
            "error_creating_account": "கணக்கை உருவாக்குவதில் பிழை",
            
            // Login page
            "welcome_back": "மீண்டும் வரவேற்கிறோம்",
            "login_description": "தமிழ்நாடு முழுவதும் உங்கள் உண்மையான பயணத்தைத் தொடருங்கள்",
            "password": "கடவுச்சொல்",
            "forgot": "மறந்துவிட்டதா?",
            "remember_me": "30 நாட்களுக்கு என்னை நினைவில் வைத்திருங்கள்",
            "decrypting_access": "அணுகல் மறைகுறியாக்குகிறது...",
            "sign_in_dashboard": "டாஷ்போர்டில் உள்நுழையவும்",
            "or_secure_link": "அல்லது பாதுகாப்பான இணைப்பு",
            "explore_google": "Google உடன் ஆராயுங்கள்",
            "uncharted_territory": "புதிய பயணியா?",
            "create_new_identity": "புதிய அடையாளத்தை உருவாக்கவும்",
            "encrypted_session": "முழுமையாக மறைகுறியாக்கப்பட்ட அமர்வு",
            "invalid_login": "தவறான உள்நுழைவு விவரங்கள்",
            "oauth_failed": "OAuth சரிபார்ப்பு தோல்வியுற்றது"
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
