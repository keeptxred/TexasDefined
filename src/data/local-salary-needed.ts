import { LOCAL_COST_OF_LIVING_PROFILES, type LocalCostOfLivingProfile } from './local-cost-of-living';

export type LocalSalaryNeededProfile = LocalCostOfLivingProfile & {
  salaryPath: string;
  salaryTitle: string;
  salarySeoTitle: string;
  salaryDescription: string;
  salaryIntro: string;
};

export const LOCAL_SALARY_NEEDED_PROFILES: readonly LocalSalaryNeededProfile[] = LOCAL_COST_OF_LIVING_PROFILES.map((local) => ({
  ...local,
  salaryPath: `/texas-salary-needed-calculator/${local.slug}`,
  salaryTitle: `Salary needed to live in ${local.name} calculator`,
  salarySeoTitle: `Salary Needed to Live in ${local.name} Calculator | Texas Defined`,
  salaryDescription: `Estimate the household gross income needed for your own ${local.name} budget, savings target, payroll-tax assumption and deductions without relying on a made-up citywide salary requirement.`,
  salaryIntro: `Build a salary target for a move to ${local.name} from the household budget you actually expect. Enter your monthly spending and savings target, then adjust tax and payroll-deduction assumptions to estimate the gross household income that could support that plan.`,
}));

export const LOCAL_SALARY_NEEDED_PROFILE_BY_SLUG = new Map(LOCAL_SALARY_NEEDED_PROFILES.map((item) => [item.slug, item] as const));