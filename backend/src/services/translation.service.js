// Translation Service using Google Translate API
// Free tier: 500,000 characters/month

const translate = async (text, targetLanguage = 'ta') => {
    if (!text || targetLanguage === 'en') return text;
    
    try {
        // Using Google Translate API (free endpoint)
        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLanguage}&dt=t&q=${encodeURIComponent(text)}`;
        
        const response = await fetch(url);
        const data = await response.json();
        
        // Extract translated text from response
        if (data && data[0]) {
            const translatedText = data[0].map(item => item[0]).join('');
            return translatedText;
        }
        
        return text;
    } catch (error) {
        console.error('Translation error:', error);
        return text; // Return original text on error
    }
};

// Translate multiple fields of an object
const translateObject = async (obj, fields, targetLanguage = 'ta') => {
    if (targetLanguage === 'en') return obj;
    
    const translations = {};
    
    for (const field of fields) {
        if (obj[field]) {
            translations[field] = await translate(obj[field], targetLanguage);
        }
    }
    
    return { ...obj, ...translations };
};

// Translate array of objects
const translateArray = async (array, fields, targetLanguage = 'ta') => {
    if (targetLanguage === 'en') return array;
    
    const promises = array.map(item => translateObject(item, fields, targetLanguage));
    return Promise.all(promises);
};

// Category translations (hardcoded for consistency)
const categoryTranslations = {
    'AgriRural': {
        'ta': 'வேளாண் மற்றும் கிராமப்புறம்',
        'en': 'Farm & Village'
    },
    'HeritageCulture': {
        'ta': 'கலை மற்றும் பாரம்பரியம்',
        'en': 'Art & Heritage'
    },
    'EcoAdventure': {
        'ta': 'காடு மற்றும் இயற்கை',
        'en': 'Wild & Nature'
    }
};

const translateCategory = (category, targetLanguage = 'ta') => {
    return categoryTranslations[category]?.[targetLanguage] || category;
};

export { translate, translateObject, translateArray, translateCategory };
