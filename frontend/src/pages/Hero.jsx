import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative">
      <img
        src="/bg.svg"
        alt="Tamil heritage"
        width={1600}
        height={800}
        className="w-full h-[820px] object-cover"
        priority
      />

      <div className="absolute inset-0 bg-black/30" />

      <div className="absolute inset-0 flex items-center">
        <div className="px-10  text-cream">
          <h1 className="font-serif text-white jaro text-[104px] leading-tight font-black">
            Connect with the
            <br />
            Soul of the Soil
          </h1>

          <Link to={`/discover`}>
            <button className="mt-6 bg-[#DAAA61] cursor-pointer jaro text-2xl text-white px-10 py-3 rounded-md font-semibold">
              Explore
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
