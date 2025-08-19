import { Navbar } from "./Navbar/Navbar.tsx";
import { HomeHero } from "./HomeHero/HomeHero.tsx";
import { HowItWorks } from "./HomeHero/HowItWork.tsx";
import { StatsSection } from "./HomeHero/StatsSection.tsx";
import { RecentItems } from "./HomeHero/RecentItemsSelection.tsx";
import { TopPerformer } from "./HomeHero/TopPerformer.tsx";
function MainSection() {
  return (
    <div className="w-full">
      <Navbar />
      <HomeHero />
      <HowItWorks />
      <StatsSection />
      <RecentItems/>
      <TopPerformer/>
    </div>
  );
}

export default MainSection;
