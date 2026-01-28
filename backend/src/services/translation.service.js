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

// Difficulty level translations (hardcoded for consistency)
const difficultyTranslations = {
    'Easy': {
        'ta': 'எளிது',
        'en': 'Easy'
    },
    'Moderate': {
        'ta': 'மிதமான',
        'en': 'Moderate'
    },
    'Challenging': {
        'ta': 'சவாலானது',
        'en': 'Challenging'
    }
};

// Tamil Nadu Districts translations (all 38 districts)
const districtTranslations = {
    // Northern Districts
    'Chennai': { 'ta': 'சென்னை', 'en': 'Chennai' },
    'Tiruvallur': { 'ta': 'திருவள்ளூர்', 'en': 'Tiruvallur' },
    'Kanchipuram': { 'ta': 'காஞ்சிபுரம்', 'en': 'Kanchipuram' },
    'Chengalpattu': { 'ta': 'செங்கல்பட்டு', 'en': 'Chengalpattu' },
    'Vellore': { 'ta': 'வேலூர்', 'en': 'Vellore' },
    'Ranipet': { 'ta': 'ராணிப்பேட்டை', 'en': 'Ranipet' },
    'Tirupattur': { 'ta': 'திருப்பத்தூர்', 'en': 'Tirupattur' },
    'Tiruvannamalai': { 'ta': 'திருவண்ணாமலை', 'en': 'Tiruvannamalai' },
    'Villupuram': { 'ta': 'விழுப்புரம்', 'en': 'Villupuram' },
    'Kallakurichi': { 'ta': 'கள்ளக்குறிச்சி', 'en': 'Kallakurichi' },
    'Krishnagiri': { 'ta': 'கிருஷ்ணகிரி', 'en': 'Krishnagiri' },
    'Dharmapuri': { 'ta': 'தர்மபுரி', 'en': 'Dharmapuri' },
    
    // Western Districts
    'Salem': { 'ta': 'சேலம்', 'en': 'Salem' },
    'Namakkal': { 'ta': 'நாமக்கல்', 'en': 'Namakkal' },
    'Erode': { 'ta': 'ஈரோடு', 'en': 'Erode' },
    'Coimbatore': { 'ta': 'கோயம்புத்தூர்', 'en': 'Coimbatore' },
    'Tiruppur': { 'ta': 'திருப்பூர்', 'en': 'Tiruppur' },
    'Nilgiris': { 'ta': 'நீலகிரி', 'en': 'Nilgiris' },
    'Karur': { 'ta': 'கரூர்', 'en': 'Karur' },
    
    // Central Districts
    'Tiruchirappalli': { 'ta': 'திருச்சிராப்பள்ளி', 'en': 'Tiruchirappalli' },
    'Trichy': { 'ta': 'திருச்சி', 'en': 'Trichy' },
    'Thanjavur': { 'ta': 'தஞ்சாவூர்', 'en': 'Thanjavur' },
    'Tiruvarur': { 'ta': 'திருவாரூர்', 'en': 'Tiruvarur' },
    'Nagapattinam': { 'ta': 'நாகப்பட்டினம்', 'en': 'Nagapattinam' },
    'Mayiladuthurai': { 'ta': 'மயிலாடுதுறை', 'en': 'Mayiladuthurai' },
    'Ariyalur': { 'ta': 'அரியலூர்', 'en': 'Ariyalur' },
    'Perambalur': { 'ta': 'பெரம்பலூர்', 'en': 'Perambalur' },
    'Pudukkottai': { 'ta': 'புதுக்கோட்டை', 'en': 'Pudukkottai' },
    'Cuddalore': { 'ta': 'கடலூர்', 'en': 'Cuddalore' },
    
    // Southern Districts
    'Madurai': { 'ta': 'மதுரை', 'en': 'Madurai' },
    'Theni': { 'ta': 'தேனி', 'en': 'Theni' },
    'Dindigul': { 'ta': 'திண்டுக்கல்', 'en': 'Dindigul' },
    'Ramanathapuram': { 'ta': 'ராமநாதபுரம்', 'en': 'Ramanathapuram' },
    'Sivaganga': { 'ta': 'சிவகங்கை', 'en': 'Sivaganga' },
    'Virudhunagar': { 'ta': 'விருதுநகர்', 'en': 'Virudhunagar' },
    'Tenkasi': { 'ta': 'தென்காசி', 'en': 'Tenkasi' },
    'Tirunelveli': { 'ta': 'திருநெல்வேலி', 'en': 'Tirunelveli' },
    'Thoothukudi': { 'ta': 'தூத்துக்குடி', 'en': 'Thoothukudi' },
    'Kanyakumari': { 'ta': 'கன்னியாகுமரி', 'en': 'Kanyakumari' },
    'Coonoor': { 'ta': 'குன்னூர்', 'en': 'Coonoor' }
};

const translateCategory = (category, targetLanguage = 'ta') => {
    return categoryTranslations[category]?.[targetLanguage] || category;
};

const translateDifficulty = (difficulty, targetLanguage = 'ta') => {
    return difficultyTranslations[difficulty]?.[targetLanguage] || difficulty;
};

const translateDistrict = (district, targetLanguage = 'ta') => {
    if (!district) return district;
    return districtTranslations[district]?.[targetLanguage] || district;
};

export { translate, translateObject, translateArray, translateCategory, translateDifficulty, translateDistrict };
