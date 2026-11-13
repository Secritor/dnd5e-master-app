import { HomeCampaigns } from './home-campaigns';
import { HomeFooter } from './home-footer';
import { HomeHero } from './home-hero';
import { HomePaths } from './home-paths';
import { HomeWorkshop } from './home-workshop';

export function ModeSelectPage() {
  return (
    <>
      <main>
        <HomeHero />
        <HomePaths />
        <HomeCampaigns />
        <HomeWorkshop />
      </main>
      <HomeFooter />
    </>
  );
}
