import { Navbar } from "./Navbar/Navbar.tsx";
import { HomeHero } from "./HomeHero/HomeHero.tsx";
import { HowItWorks } from "./HomeHero/HowItWork.tsx";
import { StatsSection } from "./HomeHero/StatsSection.tsx";
function MainSection() {
  return (
    <div className="w-full">
      <Navbar />
      <HomeHero />
      <HowItWorks/>
      <StatsSection/>
    </div>
  );
}

export default MainSection;
