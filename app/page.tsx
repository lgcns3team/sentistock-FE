"use client";

import LoginSection from "@/components/login-section";
import HeroSection from "@/components/hero-section";
import InvestmentStyleSection from "@/components/investment-style-section";
import FeaturesSection from "@/components/features-section";
import BrandingSection from "@/components/branding-section";

export default function Home() {
  return (
    <main className="bg-white">
      <LoginSection />
      <HeroSection />
      <InvestmentStyleSection />
      <FeaturesSection />
      <BrandingSection />
    </main>
  );
}