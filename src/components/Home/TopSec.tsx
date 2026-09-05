"use client";

import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

export default function TopSec() {
  return (
    <div className="w-full space-y-6">
      {/* Flagship Hero Section */}
      <section className="relative overflow-hidden rounded-3xl titanium-gradient text-white mx-4 sm:mx-6 lg:mx-8 px-6 sm:px-12 py-16 sm:py-24 shadow-2xl border border-neutral-800">
        {/* Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Hero Content */}
          <div className="max-w-xl text-center lg:text-left space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs text-neutral-300 font-medium">
              <Image src="/logo.png" alt="Cyber Apple" width={16} height={16} className="object-contain drop-shadow-[0_0_8px_rgba(6,182,212,0.9)]" />
              <span>Flagship Cyber Collection</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-none">
              iPhone 15 <span className="font-light text-neutral-400">Pro</span>
            </h1>

            <p className="text-lg sm:text-xl font-normal text-neutral-400 leading-relaxed">
              Titanium. So strong. So light. So Pro. Powered by the groundbreaking A17 Pro chip.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
              <Link
                href="/shop?category=iPhone"
                className="px-7 py-3.5 rounded-full bg-white text-black font-semibold text-sm hover:bg-neutral-200 transition-all duration-200 hover:scale-[1.03] active:scale-[0.98] shadow-lg flex items-center gap-2"
              >
                Shop iPhone <FiArrowRight />
              </Link>
              <Link
                href="/shop"
                className="px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium text-sm border border-white/20 backdrop-blur-md transition-all duration-200"
              >
                Explore All
              </Link>
            </div>

            {/* Spec Highlights */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-4 text-center lg:text-left">
              <div>
                <p className="text-xl sm:text-2xl font-bold text-white">A17 Pro</p>
                <p className="text-[11px] text-neutral-400">Next-gen GPU</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-white">48MP</p>
                <p className="text-[11px] text-neutral-400">Main Camera</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-white">Titanium</p>
                <p className="text-[11px] text-neutral-400">Aerospace-grade</p>
              </div>
            </div>
          </div>

          {/* Hero Device Graphic */}
          <div className="relative w-full max-w-md lg:max-w-lg flex justify-center">
            <Image
              src="/images/ip-home.png"
              alt="iPhone 15 Pro"
              width={480}
              height={640}
              priority
              className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)] hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>
      </section>

      {/* Bento Grid Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: MacBook Air/Pro */}
          <div className="lg:col-span-2 group relative overflow-hidden rounded-3xl bg-neutral-100 p-8 sm:p-10 border border-neutral-200/80 flex flex-col justify-between hover:shadow-xl transition-all duration-300">
            <div className="max-w-md z-10 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                Supercharged by Apple Silicon
              </span>
              <h3 className="text-3xl sm:text-4xl font-bold text-neutral-900">
                MacBook Air 15”
              </h3>
              <p className="text-neutral-600 text-sm leading-relaxed">
                Impressively big. Impossibly thin. With a spacious Liquid Retina display and up to 18 hours of battery life.
              </p>
              <Link
                href="/shop?category=MacBook"
                className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-900 pt-3 hover:gap-3 transition-all"
              >
                Shop MacBook <FiArrowRight />
              </Link>
            </div>
            <div className="relative mt-6 sm:mt-0 flex justify-end">
              <Image
                src="/images/mac-home.png"
                alt="MacBook Air"
                width={500}
                height={350}
                className="object-contain group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Card 2: Apple Vision Pro */}
          <div className="group relative overflow-hidden rounded-3xl bg-neutral-950 text-white p-8 border border-neutral-800 flex flex-col justify-between hover:shadow-xl transition-all duration-300">
            <div className="z-10 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                Spatial Computing
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                Vision Pro
              </h3>
              <p className="text-neutral-400 text-xs leading-relaxed">
                Welcome to the era of spatial computing. You navigate simply by using your eyes, hands, and voice.
              </p>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-200 pt-2 hover:gap-3 transition-all"
              >
                Explore Details <FiArrowRight />
              </Link>
            </div>
            <div className="relative mt-6 flex justify-center">
              <Image
                src="/images/vp-home.png"
                alt="Apple Vision Pro"
                width={260}
                height={200}
                className="object-contain group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Card 3: AirPods Max */}
          <div className="group relative overflow-hidden rounded-3xl bg-neutral-100 p-8 border border-neutral-200/80 flex flex-col justify-between hover:shadow-xl transition-all duration-300">
            <div className="z-10 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                High-Fidelity Audio
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900">
                AirPods Max
              </h3>
              <p className="text-neutral-600 text-xs leading-relaxed">
                Computational audio. An uncompromising symphony of breathtaking audio quality and acoustic design.
              </p>
              <Link
                href="/shop?category=AirPods"
                className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-900 pt-2 hover:gap-3 transition-all"
              >
                Shop Audio <FiArrowRight />
              </Link>
            </div>
            <div className="relative mt-4 flex justify-center">
              <Image
                src="/images/headph-home.png"
                alt="AirPods Max"
                width={260}
                height={220}
                className="object-contain group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Card 4: iMac */}
          <div className="lg:col-span-2 group relative overflow-hidden rounded-3xl bg-neutral-50 p-8 sm:p-10 border border-neutral-200/80 flex flex-col sm:flex-row items-center justify-between gap-8 hover:shadow-xl transition-all duration-300">
            <div className="max-w-md z-10 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                All-in-One Desktop
              </span>
              <h3 className="text-3xl sm:text-4xl font-bold text-neutral-900">
                iMac 24” 4.5K
              </h3>
              <p className="text-neutral-600 text-sm leading-relaxed">
                The world’s best all-in-one desktop. Stunning design, incredible 4.5K Retina display, and peak performance.
              </p>
              <Link
                href="/shop?category=MacBook"
                className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-900 pt-3 hover:gap-3 transition-all"
              >
                Shop Mac Desktops <FiArrowRight />
              </Link>
            </div>
            <div className="relative w-full max-w-sm flex justify-center">
              <Image
                src="/images/imac.webp"
                alt="iMac 24"
                width={380}
                height={320}
                className="object-contain group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}