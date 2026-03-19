import React from "react";
import { ArrowRight } from "lucide-react";

const storySections = [
  {
    id: 1,
    tag: "The Art of Detail",
    title: "Precision in",
    highlight: "Every Pixel",
    description:
      "Experience clarity that redefines professional standards. Our latest technology brings your vision to life with unmatched accuracy and vibrant color reproduction.",
    image: "/products/image_103.png",
  },
  {
    id: 2,
    tag: "Modern Efficiency",
    title: "Seamless",
    highlight: "Daily Workflow",
    description:
      "Designed for the pace of modern life. Effortless setup, intuitive controls, and reliable performance that keeps you focused on what truly matters.",
    image: "/products/image_112.png",
  },
  {
    id: 3,
    tag: "Eco Innovation",
    title: "Sustainably",
    highlight: "Engineered",
    description:
      "A commitment to the future. High-performance printing that respects the environment through energy-efficient design and conscious materials.",
    image: "/products/image_120.png",
  },
];

const EditorialShowcase = () => {
  return (
    <section className="bg-[#f3f3f3] py-20 md:py-28 overflow-x-hidden">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Heading */}
        <div className="flex flex-col items-center text-center pb-16 md:pb-24">
          <span className="text-[10px] md:text-[11px] font-semibold tracking-[0.35em] uppercase text-[#333330]/45 mb-4">
            Editorial Stories
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-light text-[#333330] tracking-tight leading-[1.1]">
            Designed for{" "}
            <span className="font-medium italic text-[#96968B]">Excellence</span>
          </h2>
        </div>

        {/* Sticky Stack */}
        <div className="relative">
          {storySections.map((section, index) => (
            <div
              key={section.id}
              className="relative h-[110vh] md:h-[120vh]"
              style={{ zIndex: index + 1 }}
            >
              <div className="sticky top-6 md:top-10">
                <div className="bg-white rounded-[32px] md:rounded-[56px] xl:rounded-[72px] border border-black/5 shadow-[0_20px_60px_rgba(0,0,0,0.06)] overflow-hidden min-h-[78vh] md:min-h-[82vh] px-6 py-8 sm:px-8 sm:py-10 md:px-12 md:py-14 xl:px-20 xl:py-20">
                  <div
                    className={`grid grid-cols-1 lg:grid-cols-2 items-center gap-10 md:gap-14 xl:gap-20 h-full ${
                      index % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                    }`}
                  >
                    {/* Image Side */}
                    <div className="relative w-full min-h-[320px] sm:min-h-[420px] md:min-h-[500px] xl:min-h-[620px] rounded-[28px] md:rounded-[48px] xl:rounded-[64px] bg-[#f7f7f4] overflow-hidden flex items-center justify-center">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.95),rgba(243,243,240,0.7),rgba(235,235,230,0.4))]" />
                      <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-black/[0.03]" />
                      <img
                        src={section.image}
                        alt={section.title}
                        className="relative z-10 w-[72%] sm:w-[70%] md:w-[68%] h-auto object-contain drop-shadow-[0_30px_40px_rgba(0,0,0,0.18)]"
                      />
                    </div>

                    {/* Content Side */}
                    <div className="w-full flex flex-col justify-center text-center lg:text-left">
                      <div className="flex items-center justify-center lg:justify-start gap-3 mb-5 md:mb-6">
                        <span className="w-10 md:w-12 h-[1px] bg-[#333330]/20"></span>
                        <span className="text-[10px] md:text-[11px] font-semibold tracking-[0.35em] uppercase text-[#333330]/45">
                          {section.tag}
                        </span>
                      </div>

                      <h3 className="text-[34px] sm:text-[42px] md:text-[56px] xl:text-[72px] font-light text-[#333330] tracking-tight leading-[1.02] uppercase">
                        {section.title}
                        <br />
                        <span className="font-medium italic text-[#96968B]">
                          {section.highlight}
                        </span>
                      </h3>

                      <p className="mt-6 md:mt-8 text-[15px] sm:text-[16px] md:text-[18px] leading-[1.9] text-[#666660] max-w-[560px] mx-auto lg:mx-0">
                        {section.description}
                      </p>

                      <div className="mt-8 md:mt-10">
                        <button className="group inline-flex items-center gap-3 md:gap-4 text-[#333330] text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.25em] border-b border-[#333330]/15 pb-2 hover:text-[#96968B] hover:border-[#96968B] transition-all duration-300">
                          Discover Story
                          <ArrowRight
                            size={14}
                            className="transition-transform duration-300 group-hover:translate-x-1"
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* End spacer so last card gets proper sticky feel */}
          <div className="h-[15vh] md:h-[20vh]" />
        </div>
      </div>
    </section>
  );
};

export default EditorialShowcase;