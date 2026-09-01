import { LOCAL_COST_OF_LIVING_PROFILES, type LocalCostOfLivingProfile } from './local-cost-of-living';

export type LocalRentVsBuyProfile = LocalCostOfLivingProfile & {
  rentVsBuyPath: string;
  rentVsBuyTitle: string;
  rentVsBuySeoTitle: string;
  rentVsBuyDescription: string;
  rentVsBuyIntro: string;
};

export const LOCAL_RENT_VS_BUY_PROFILES: readonly LocalRentVsBuyProfile[] = LOCAL_COST_OF_LIVING_PROFILES.map((local) => ({
  ...local,
  rentVsBuyPath: `/texas-rent-vs-buy-calculator/${local.slug}`,
  rentVsBuyTitle: `${local.name} rent vs. buy calculator`,
  rentVsBuySeoTitle: `${local.name} Rent vs. Buy Calculator | Texas Defined`,
  rentVsBuyDescription: `Compare renting with buying in ${local.name} using your own rent, home price, mortgage, property-tax, insurance, maintenance, appreciation and time-horizon assumptions instead of citywide averages.`,
  rentVsBuyIntro: `Compare a specific ${local.name} rental with a specific home purchase. Enter the numbers that apply to the lease, property and financing you are actually considering; this planner does not substitute a citywide rent, home-price or property-tax average.`,
}));

export const LOCAL_RENT_VS_BUY_PROFILE_BY_SLUG = new Map(LOCAL_RENT_VS_BUY_PROFILES.map((item) => [item.slug, item] as const));