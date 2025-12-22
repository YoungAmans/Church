import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServiceTimesSection from "@/components/ServiceTimesSection";
import MinistriesSection from "@/components/MinistriesSection";
import EventsSection from "@/components/EventsSection";
import LocationSection from "@/components/LocationSection";
import ContactSection from "@/components/ContactSection";
import AppDownloadSection from "@/components/AppDownloadSection";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";

export default function Home() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header isDark={isDark} onToggleTheme={toggleTheme} />
      <main>
        <HeroSection />
        <AboutSection />
        <ServiceTimesSection />
        <MinistriesSection />
        <EventsSection />
        <LocationSection />
        <ContactSection />
        <AppDownloadSection />
      </main>
      <Footer />
    </div>
  );
}
