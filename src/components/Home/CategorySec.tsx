import Link from "next/link";
import { CgAppleWatch } from "react-icons/cg";
import { MdLaptopMac, MdOutlinePhoneIphone } from "react-icons/md";
import { TbDeviceAirpods, TbDeviceIpad } from "react-icons/tb";

export default function CategorySec(): JSX.Element {
  const categories = [
    {
      name: "iPhone",
      slug: "iPhone",
      icon: MdOutlinePhoneIphone,
      subtitle: "The ultimate device",
    },
    {
      name: "iPad",
      slug: "iPad",
      icon: TbDeviceIpad,
      subtitle: "Versatility redefined",
    },
    {
      name: "MacBook",
      slug: "MacBook",
      icon: MdLaptopMac,
      subtitle: "Pure performance",
    },
    {
      name: "Apple Watch",
      slug: "Apple Watch",
      icon: CgAppleWatch,
      subtitle: "Health & fitness",
    },
    {
      name: "AirPods",
      slug: "AirPods",
      icon: TbDeviceAirpods,
      subtitle: "Spatial audio",
    },
  ];

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
            Apple Ecosystem
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 mt-1">
            Browse by Product Line
          </h2>
        </div>
        <Link
          href="/shop"
          className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline mt-2 sm:mt-0"
        >
          View all hardware &rarr;
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <Link
              key={cat.name}
              href={`/shop?category=${encodeURIComponent(cat.slug)}`}
              className="group relative flex flex-col items-center justify-center p-6 sm:p-8 rounded-3xl bg-white border border-neutral-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300"
            >
              <div className="p-4 rounded-2xl bg-neutral-50 group-hover:bg-neutral-900 group-hover:text-white text-neutral-800 transition-all duration-300">
                <Icon className="text-4xl sm:text-5xl transition-transform group-hover:scale-110" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-neutral-900 group-hover:text-blue-600 transition-colors">
                {cat.name}
              </h3>
              <p className="text-[11px] text-neutral-400 mt-0.5 text-center">
                {cat.subtitle}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}