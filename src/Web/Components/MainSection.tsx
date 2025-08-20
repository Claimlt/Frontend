import { Navbar } from "./Navbar/Navbar.tsx";
import { HomeHero } from "./HomeHero/HomeHero.tsx";
import { HowItWorks } from "./HomeHero/HowItWork.tsx";
import { StatsSection } from "./HomeHero/StatsSection.tsx";
import { RecentItems } from "./HomeHero/RecentItemsSelection.tsx";
import { TopPerformer } from "./HomeHero/TopPerformer.tsx";
import { AboutUs } from "./AboutUs/AboutUs.tsx";
import Footer from "./Footer/Footer.tsx";

function MainSection() {
  return (
    <div className="w-full">
      <Navbar />
      <section id="home">
        <HomeHero />
      </section>

      <section id="how-it-works">
        <HowItWorks />
      </section>

      <StatsSection />

      <section id="items">
        <RecentItems/>
      </section>

      <TopPerformer/>

      <section id="contact">
        <AboutUs/>
      </section>

      <Footer/>
    </div>
  );
}

export default MainSection;