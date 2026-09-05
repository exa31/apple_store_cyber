"use client";

import { useSession } from "next-auth/react";
import { FiUser, FiMail, FiShield } from "react-icons/fi";

export default function Profile() {
  const { data: session } = useSession();

  return (
    <div className="rounded-3xl bg-white p-6 sm:p-8 border border-neutral-200/80 shadow-sm space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
          Personal Information
        </h1>
        <p className="text-xs text-neutral-500 mt-1">
          Manage your personal identity and account settings
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-neutral-100">
        <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/60 space-y-1">
          <div className="flex items-center gap-2 text-xs text-neutral-400 font-semibold uppercase tracking-wider">
            <FiUser /> Full Name
          </div>
          <p className="text-base font-bold text-neutral-900">
            {session?.user?.name || "Not provided"}
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/60 space-y-1">
          <div className="flex items-center gap-2 text-xs text-neutral-400 font-semibold uppercase tracking-wider">
            <FiMail /> Apple ID / Email
          </div>
          <p className="text-base font-bold text-neutral-900">
            {session?.user?.email || "Not provided"}
          </p>
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200/60 flex items-start gap-3">
        <FiShield className="text-emerald-600 text-lg flex-shrink-0 mt-0.5" />
        <div className="text-xs text-emerald-800 space-y-0.5">
          <p className="font-bold">Account Security Active</p>
          <p className="text-emerald-700">
            Your session is secured with JWT encryption. Transactions and billing information are protected by Midtrans secure vault.
          </p>
        </div>
      </div>
    </div>
  );
}