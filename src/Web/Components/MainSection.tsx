import { Navbar } from "./Navbar/Navbar.tsx";
import { HomeHero } from "./HomeHero/HomeHero.tsx";
function MainSection() {
  return (
    <div className="w-full">
      <Navbar />
      <HomeHero />
    </div>
  );
}

export default MainSection;
