"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import { FiArrowLeft } from "react-icons/fi";

export default function Login() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCredentialsSignIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const form = new FormData(e.currentTarget);
    const email = form.get("email") as string;
    const password = form.get("password") as string;

    const response = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (response?.error) {
      setSubmitting(false);
      setError("Invalid email address or password");
      return;
    }

    router.push("/shop");
    router.refresh();
  };

  const handleGoogleSignIn = () => {
    setSubmitting(true);
    signIn("google", { callbackUrl: "/shop" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-[#fbfbfd]">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 border border-neutral-200/80 shadow-xl space-y-6">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-neutral-500 hover:text-black transition-colors"
        >
          <FiArrowLeft /> Back to Store
        </Link>

        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl p-[1.5px] bg-gradient-to-tr from-cyan-400 via-blue-500 to-indigo-600 mx-auto shadow-[0_0_20px_rgba(6,182,212,0.4)] flex items-center justify-center">
            <div className="w-full h-full bg-[#080b11] rounded-[14px] flex items-center justify-center p-2">
              <Image
                src="/logo.png"
                alt="Cyber Apple Logo"
                width={34}
                height={34}
                className="w-full h-full object-contain drop-shadow-[0_0_8px_rgba(6,182,212,0.85)]"
                priority
              />
            </div>
          </div>
          <h1 className="text-2xl font-black tracking-tight text-neutral-900">
            Sign In to Cyber Apple
          </h1>
          <p className="text-xs text-neutral-500">
            Access your shopping bag, order history, and saved wishlist
          </p>
        </div>

        {/* Single NextAuth Google Sign In Button */}
        <div>
          <button
            onClick={handleGoogleSignIn}
            type="button"
            disabled={submitting}
            className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-full border border-neutral-300 hover:bg-neutral-50 text-xs font-semibold text-neutral-700 transition-all duration-200 shadow-sm hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
          >
            <FcGoogle className="text-lg" />
            <span>Continue with Google</span>
          </button>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="border-t border-neutral-200 w-full" />
          <span className="bg-white px-3 text-[11px] text-neutral-400 uppercase tracking-wider absolute">
            Or with email
          </span>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-600 text-center font-medium">
            {error}
          </div>
        )}

        {/* Credentials Form */}
        <form onSubmit={handleCredentialsSignIn} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="name@example.com"
              className="w-full text-xs px-4 py-3 rounded-xl border border-neutral-300 outline-none focus:border-neutral-900 transition-colors"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-semibold text-neutral-700">
                Password
              </label>
            </div>
            <input
              type="password"
              name="password"
              required
              placeholder="••••••••"
              className="w-full text-xs px-4 py-3 rounded-xl border border-neutral-300 outline-none focus:border-neutral-900 transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3.5 rounded-full bg-neutral-900 hover:bg-black text-white text-xs font-semibold transition-all duration-200 shadow-md hover:scale-[1.01] active:scale-[0.98] disabled:opacity-50"
          >
            {submitting ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="text-center pt-2">
          <p className="text-xs text-neutral-500">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-semibold text-blue-600 hover:underline"
            >
              Create yours now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}