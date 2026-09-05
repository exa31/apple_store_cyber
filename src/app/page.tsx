import Banner from "@/components/Home/banner";
import CategorySec from "@/components/Home/CategorySec";
import DiscountSec from "@/components/Home/DiscountSec";
import TabHomeSec from "@/components/Home/TabHomeSec";
import TopSec from "@/components/Home/TopSec";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cyber Apple Store - Premium Authorized Reseller",
  description:
    "Discover authentic Apple products including iPhone, MacBook, iPad, Apple Watch, and AirPods with official warranty.",
  authors: [{ name: "Moh. Eka Syafrino Nazhifan" }],
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between pb-16">
      <TopSec />
      <CategorySec />
      <TabHomeSec />
      <DiscountSec />
      <Banner />
    </main>
  );
}
