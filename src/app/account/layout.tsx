"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { FiUser, FiMapPin, FiPackage } from "react-icons/fi";

export default function LayoutProfile({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { data: session } = useSession();

  const isDetailPage =
    pathname.startsWith("/account/order/") ||
    pathname.startsWith("/account/address/edit-alamat") ||
    pathname.startsWith("/account/address/create-alamat");

  const navLinks = [
    { name: "My Profile", href: "/account", icon: FiUser },
    { name: "Delivery Addresses", href: "/account/address", icon: FiMapPin },
    { name: "Order History", href: "/account/order", icon: FiPackage },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-screen">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {!isDetailPage && (
          <aside className="w-full md:w-64 flex-shrink-0 rounded-3xl bg-white p-6 border border-neutral-200/80 shadow-sm space-y-6">
            {/* User Profile Card */}
            <div className="flex items-center gap-3 pb-6 border-b border-neutral-100">
              <div className="w-12 h-12 rounded-full bg-neutral-900 text-white flex items-center justify-center font-bold text-base uppercase shadow-sm">
                {session?.user?.name?.[0] || "U"}
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold text-sm text-neutral-900 truncate">
                  {session?.user?.name || "Cyber Customer"}
                </h3>
                <p className="text-[11px] text-neutral-400 truncate">
                  {session?.user?.email}
                </p>
              </div>
            </div>

            {/* Nav links */}
            <nav className="space-y-1">
              {navLinks.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-2xl text-xs font-semibold transition-all ${
                      isActive
                        ? "bg-neutral-900 text-white shadow-sm"
                        : "text-neutral-600 hover:bg-neutral-100 hover:text-black"
                    }`}
                  >
                    <Icon className="text-base" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </aside>
        )}

        <div className="flex-1 w-full min-w-0">{children}</div>
      </div>
    </div>
  );
}