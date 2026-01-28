import Listing from '../models/Listing.js';

// @desc    Generate AI Trip Itinerary
// @route   POST /api/ai/generate-trip
// @access  Public
export const generateTrip = async (req, res) => {
    try {
        const { interests, duration, budget, location, language } = req.body;

        // 1. Fetch relevant listings based on interests and location
        const query = {
            status: 'approved'
        };

        if (interests && interests.length > 0) {
            query.category = { $in: interests };
        }

        if (location && location !== 'All') {
            query['location.district'] = location;
        }

        const listings = await Listing.find(query).limit(10);

        // 2. Simple AI Logic (Rule-based for now, can be extended to LLM)
        // We simulate "AI" thinking by selecting the best matches for the duration
        const itinerary = [];
        const days = parseInt(duration) || 1;

        let currentDay = 1;
        let listingIndex = 0;

        while (currentDay <= days && listingIndex < listings.length) {
            const dayPlan = {
                day: currentDay,
                activities: []
            };

            // Aim for 2 activities per day
            for (let i = 0; i < 2 && listingIndex < listings.length; i++) {
                dayPlan.activities.push(listings[listingIndex]);
                listingIndex++;
            }

            itinerary.push(dayPlan);
            currentDay++;
        }

        // Generate localized title and summary
        const isTamil = language === 'ta';
        const locationName = location || (isTamil ? 'தமிழ்நாடு' : 'Tamil Nadu');
        const categoryTranslations = {
            'AgriRural': isTamil ? 'பண்ணை மற்றும் கிராமம்' : 'Farm & Village',
            'HeritageCulture': isTamil ? 'கலை மற்றும் பாரம்பரியம்' : 'Art & Heritage',
            'EcoAdventure': isTamil ? 'காடு மற்றும் இயற்கை' : 'Wild & Nature'
        };
        
        const translatedInterests = interests?.map(cat => categoryTranslations[cat] || cat).join(', ') || 
            (isTamil ? 'உண்மையான அனுபவங்கள்' : 'authentic experiences');

        const title = isTamil
            ? `${days}-நாள் பாரம்பரிய வளைவு ${locationName}இல்`
            : `${days}-Day Heritage Arc in ${locationName}`;

        const summary = isTamil
            ? `${days}-நாள் பயணம் ${translatedInterests} மீது கவனம் செலுத்துகிறது.`
            : `A curated ${days}-day journey focusing on ${translatedInterests}.`;

        res.status(200).json({
            success: true,
            data: {
                title,
                itinerary,
                summary
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
