export interface RentVsBuyInputs {
  monthlyRent: number;
  annualRentGrowthRate: number;
  monthlyRentersInsurance: number;
  homePrice: number;
  downPayment: number;
  mortgageRate: number;
  loanTermYears: number;
  propertyTaxRate: number;
  annualHomeInsurance: number;
  annualMaintenanceRate: number;
  monthlyHoa: number;
  buyerClosingCostRate: number;
  sellerClosingCostRate: number;
  comparisonYears: number;
  annualAppreciationRate: number;
}

export interface RentVsBuyEstimate {
  loanAmount: number;
  monthlyPrincipalInterest: number;
  renterCost: number;
  ownerCashOutflow: number;
  ownerNetCost: number;
  futureHomeValue: number;
  remainingLoanBalance: number;
  endingSaleEquity: number;
  sellingCosts: number;
  interestPaid: number;
  principalPaid: number;
  difference: number;
}

const nonNegative = (value: number) => Math.max(0, Number.isFinite(value) ? value : 0);

const monthlyGrowthRate = (annualPercent: number) => {
  const annual = Math.max(-99.9, Number.isFinite(annualPercent) ? annualPercent : 0) / 100;
  return Math.pow(1 + annual, 1 / 12) - 1;
};

export function estimateRentVsBuy(input: RentVsBuyInputs): RentVsBuyEstimate {
  const homePrice = nonNegative(input.homePrice);
  const downPayment = Math.min(homePrice, nonNegative(input.downPayment));
  const loanAmount = Math.max(0, homePrice - downPayment);
  const loanTermMonths = Math.max(1, Math.round(nonNegative(input.loanTermYears) * 12));
  const comparisonMonths = Math.max(1, Math.round(nonNegative(input.comparisonYears) * 12));
  const mortgageMonthlyRate = nonNegative(input.mortgageRate) / 1200;
  const monthlyPrincipalInterest = loanAmount === 0
    ? 0
    : mortgageMonthlyRate > 0
      ? loanAmount * mortgageMonthlyRate * Math.pow(1 + mortgageMonthlyRate, loanTermMonths)
        / (Math.pow(1 + mortgageMonthlyRate, loanTermMonths) - 1)
      : loanAmount / loanTermMonths;

  const rentGrowth = monthlyGrowthRate(input.annualRentGrowthRate);
  const appreciation = monthlyGrowthRate(input.annualAppreciationRate);
  const monthlyHomeInsurance = nonNegative(input.annualHomeInsurance) / 12;
  const monthlyHoa = nonNegative(input.monthlyHoa);
  const propertyTaxRate = nonNegative(input.propertyTaxRate) / 100;
  const maintenanceRate = nonNegative(input.annualMaintenanceRate) / 100;

  let monthlyRent = nonNegative(input.monthlyRent);
  let homeValue = homePrice;
  let remainingLoanBalance = loanAmount;
  let renterCost = 0;
  let ownerRecurringOutflow = 0;
  let interestPaid = 0;
  let principalPaid = 0;

  for (let month = 0; month < comparisonMonths; month += 1) {
    renterCost += monthlyRent + nonNegative(input.monthlyRentersInsurance);

    let interest = 0;
    let principal = 0;
    if (remainingLoanBalance > 0) {
      interest = mortgageMonthlyRate > 0 ? remainingLoanBalance * mortgageMonthlyRate : 0;
      principal = Math.min(
        remainingLoanBalance,
        mortgageMonthlyRate > 0 ? Math.max(0, monthlyPrincipalInterest - interest) : monthlyPrincipalInterest,
      );
      remainingLoanBalance = Math.max(0, remainingLoanBalance - principal);
    }

    const monthlyPropertyTax = homeValue * propertyTaxRate / 12;
    const monthlyMaintenance = homeValue * maintenanceRate / 12;
    ownerRecurringOutflow += interest + principal + monthlyPropertyTax + monthlyHomeInsurance + monthlyMaintenance + monthlyHoa;
    interestPaid += interest;
    principalPaid += principal;

    monthlyRent *= 1 + rentGrowth;
    homeValue *= 1 + appreciation;
  }

  const buyerClosingCosts = homePrice * nonNegative(input.buyerClosingCostRate) / 100;
  const ownerCashOutflow = downPayment + buyerClosingCosts + ownerRecurringOutflow;
  const sellingCosts = homeValue * nonNegative(input.sellerClosingCostRate) / 100;
  const endingSaleEquity = Math.max(0, homeValue - remainingLoanBalance - sellingCosts);
  const ownerNetCost = Math.max(0, ownerCashOutflow - endingSaleEquity);

  return {
    loanAmount,
    monthlyPrincipalInterest,
    renterCost,
    ownerCashOutflow,
    ownerNetCost,
    futureHomeValue: homeValue,
    remainingLoanBalance,
    endingSaleEquity,
    sellingCosts,
    interestPaid,
    principalPaid,
    difference: renterCost - ownerNetCost,
  };
}
