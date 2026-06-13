import Hero from "@/components/Hero";
import ProgressDashboard from "@/components/ProgressDashboard";
import QuoteOfTheDay from "@/components/QuoteOfTheDay";
import LockedSection from "@/components/LockedSection";
import Divider from "@/components/Divider";

export default function Home() {
  return (
    <main className="bg-base [-webkit-overflow-scrolling:touch]">
      <Hero />
      <Divider />
      <QuoteOfTheDay />
      <Divider />
      <ProgressDashboard />
      <Divider />
      <LockedSection />
    </main>
  );
}
