"use client";

import { isValidEmail } from "@/helper";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import Image from "next/image";
import { SiApple } from "react-icons/si";
import { FiArrowLeft } from "react-icons/fi";

export default function Register() {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);
  const router = useRouter();

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");

    const form = new FormData(e.currentTarget);
    const name = (form.get("name") as string)?.trim();
    const email = (form.get("email") as string)?.trim();
    const password = form.get("password") as string;
    const confirmPassword = form.get("confirmPassword") as string;

    if (!name || name.length < 2) {
      setErrorMessage("Please enter a valid full name.");
      return;
    }

    if (!email || !isValidEmail(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    if (!password || password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await axios.post("/api/auth/register", {
        name,
        email,
        password,
      });

      if (res.status === 200 || res.status === 201) {
        router.push("/login?registered=true");
      }
    } catch (err: any) {
      setErrorMessage(
        err.response?.data?.message || "Registration failed. Email may already be in use."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-[#fbfbfd]">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 border border-neutral-200/80 shadow-xl space-y-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-neutral-500 hover:text-black transition-colors"
        >
          <FiArrowLeft /> Back to Store
        </Link>

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
            Create Your Cyber Apple ID
          </h1>
          <p className="text-xs text-neutral-500">
            One Cyber ID is all you need to access all Cyber Store services
          </p>
        </div>

        {errorMessage && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-600 text-center font-medium">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              required
              placeholder="e.g. Steve Jobs"
              className="w-full text-xs px-4 py-3 rounded-xl border border-neutral-300 outline-none focus:border-neutral-900 transition-colors"
            />
          </div>

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
            <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              placeholder="Minimum 6 characters"
              className="w-full text-xs px-4 py-3 rounded-xl border border-neutral-300 outline-none focus:border-neutral-900 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              required
              placeholder="Re-enter password"
              className="w-full text-xs px-4 py-3 rounded-xl border border-neutral-300 outline-none focus:border-neutral-900 transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3.5 rounded-full bg-neutral-900 hover:bg-black text-white text-xs font-semibold transition-all duration-200 shadow-md hover:scale-[1.01] active:scale-[0.98] disabled:opacity-50"
          >
            {submitting ? "Creating account..." : "Continue"}
          </button>
        </form>

        <div className="text-center pt-2">
          <p className="text-xs text-neutral-500">
            Already have an Apple ID?{" "}
            <Link
              href="/login"
              className="font-semibold text-blue-600 hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}