import {
  FaSeedling,
  FaLandmark,
  FaMountain,
  FaArrowRight,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const cards = [
  {
    title: "Agri & Rural",
    titleTamil: "விவசாயம் & கிராமப்புறம்",
    desc: "Engage with traditional farming practices and rural experiences.",
    descTamil:
      "பாரம்பரிய விவசாய முறைகள் மற்றும் கிராமப்புற அனுபவங்களை அனுபவியுங்கள்",
    icon: <FaSeedling className="w-8 h-8" />,
  },
  {
    title: "Heritage & Culture",
    titleTamil: "பாரம்பரியம் & கலாச்சாரம்",
    desc: "Journey through ancient temples, local art, and living history.",
    descTamil:
      "பண்டைய கோயில்கள், உள்ளூர் கலை மற்றும் வாழும் வரலாற்றின் வழியாக பயணம்",
    icon: <FaLandmark className="w-8 h-8" />,
  },
  {
    title: "Eco & Adventure",
    titleTamil: "சுற்றுச்சூழல் & சாகசம்",
    desc: "Scenic paths, cycling trails, and eco-friendly adventures.",
    descTamil:
      "இயற்கை பாதைகள், சைக்கிள் பாதைகள் மற்றும் சுற்றுச்சூழல் சாகசங்கள்",
    icon: <FaMountain className="w-8 h-8" />,
  },
];

export default function ExperienceCards() {
  return (
    <section className="bg-[#ce9f49] py-16 relative overflow-hidden">
      {/* Decorative SVGs */}
      <div className="absolute top-8 left-0 w-40 opacity-30">
        <img src="/left.svg" alt="decorative left" className="h-full w-auto" />
      </div>
      <div className="absolute top-8 right-0 w-40 opacity-30">
        <img
          src="/right.svg"
          alt="decorative right"
          className="h-full w-auto"
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#540726] mb-4 jaro">
            Explore Tamil Nadu
          </h2>
          <h3 className="text-3xl font-semibold text-[#540726] mb-2">
            தமிழ்நாட்டை ஆராயுங்கள்
          </h3>
          <p className="text-black/80 max-w-2xl mx-auto">
            Discover authentic experiences across three unique categories
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 px-6">
          {cards.map((c, index) => (
            <div
              key={c.title}
              className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 border-2 border-[#540726]/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
            >
              <div className="flex items-center justify-center w-16 h-16 bg-[#540726]/10 rounded-full mb-6 text-[#540726] group-hover:bg-[#540726]/20 transition-colors">
                {c.icon}
              </div>

              <h3 className="font-bold text-2xl text-[#540726] mb-2 jaro">
                {c.title}
              </h3>
              <h4 className="font-semibold text-lg text-[#540726]/80 mb-4">
                {c.titleTamil}
              </h4>

              <p className="text-black text-sm leading-relaxed mb-2">
                {c.desc}
              </p>
              <p className="text-black/80 text-sm leading-relaxed mb-6">
                {c.descTamil}
              </p>
              <Link to={`/discover`}>
                <button className="flex items-center gap-2 text-[#540726] font-bold text-sm hover:gap-3 transition-all group-hover:text-[#540726]/80">
                  Explore Experiences
                  <FaArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
