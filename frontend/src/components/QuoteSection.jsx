export default function QuoteSection() {
  return (
    <section className="bg-[#46041F] relative py-40 flex align-middle px-6">
      <div className="absolute inset-y-0 top-2 left-0 w-40 ">
        <img src="/left.svg" alt="decorative left" className="h-full" />
      </div>
      <div className="absolute inset-y-0 top-2 right-0 w-40">
        <img src="/right.svg" alt="decorative left" className="h-full" />
      </div>
      <p className="jaro mx-auto text-white text-5xl text-left italic font-serif">
        “Real tourism isn’t just seeing new places,
        <br /> it’s having new eyes. Heritage Farm brings <br /> the authentic
        soul of Tamil Nadu to the
        <br /> modern explorer.”
      </p>
    </section>
  );
}
