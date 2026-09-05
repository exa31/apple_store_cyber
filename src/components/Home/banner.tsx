import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

export default function Banner() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
      <div className="relative overflow-hidden rounded-3xl bg-[#080a0f] border border-neutral-800/90 shadow-2xl min-h-[380px] sm:min-h-[420px] flex items-center">
        {/* Background Image: Panoramic Banner (1600x483) */}
        <div className="absolute inset-0 z-0 flex justify-end pointer-events-none">
          <Image
            src="/images/banner.jpg"
            alt="Apple Trade In & Upgrade Banner"
            fill
            priority
            className="object-cover object-right sm:object-right-center"
          />
          {/* Subtle gradient overlay to guarantee 100% contrast for text on all screen sizes */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#080a0f] via-[#080a0f]/90 sm:via-[#080a0f]/75 lg:via-[#080a0f]/50 to-transparent" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-xl p-8 sm:p-14 lg:p-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-cyan-300 text-xs font-semibold backdrop-blur-md border border-white/10 shadow-xs">
            <Image
              src="/logo.png"
              alt="Cyber Apple"
              width={14}
              height={14}
              className="object-contain drop-shadow-[0_0_6px_rgba(6,182,212,0.8)]"
            />
            <span>Apple Trade In & Upgrade</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            Upgrade to the latest Apple devices.{" "}
            <span className="text-cyan-400 font-light">Save more.</span>
          </h2>

          <p className="text-neutral-300 text-sm sm:text-base leading-relaxed max-w-md font-normal">
            Trade in your eligible iPhone, Mac, or iPad for instant credit toward your next purchase. Good for your pocket and the planet.
          </p>

          <div className="pt-3 flex flex-wrap items-center gap-4">
            <Link
              href="/shop"
              className="px-7 py-3.5 rounded-full bg-white text-black font-bold text-sm hover:bg-neutral-200 transition-all hover:scale-105 active:scale-95 shadow-lg flex items-center gap-2"
            >
              Get Your Estimate <FiArrowRight />
            </Link>
            <Link
              href="/shop"
              className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium text-sm border border-white/15 backdrop-blur-md transition-all"
            >
              Learn How It Works
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}